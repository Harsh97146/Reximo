"use client";
import React, { useEffect, useState } from "react";
import CommonButton from "../../../../components/ul/Button";
import { CheckCircle, XCircle, Eye, FileText, X } from "lucide-react";
import Swal from "sweetalert2";

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null); // For viewing details
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    fetchUsers();
  }, [refreshKey]);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`$(process.env.NEXT_PUBLIC_API_URL)/admin/users");
      const data = await response.json();
      if (Array.isArray(data)) {
        setUsers(data);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["Tiling Solution", "Waterproofing", "Repairs", "Maintenance", "Stonecare"];

  const handleApprove = async (id) => {
    const { value: selectedCategories } = await Swal.fire({
      title: 'Select Categories',
      html: `
        <div style="text-align: left;">
            <p style="margin-bottom: 10px;">Assign categories to this dealer:</p>
            ${categories.map(cat => `
                <div style="margin-bottom: 5px;">
                    <input type="checkbox" id="cat_${cat}" value="${cat}" class="swal2-checkbox" style="margin-right: 8px;">
                    <label for="cat_${cat}">${cat}</label>
                </div>
            `).join('')}
        </div>
      `,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Approve & Assign',
      focusConfirm: false,
      preConfirm: () => {
        const checkboxes = document.querySelectorAll('input[id^="cat_"]:checked');
        const values = Array.from(checkboxes).map(cb => cb.value);
        if (values.length === 0) {
            Swal.showValidationMessage('You need to select at least one category!');
        }
        return values;
      }
    });

    if (selectedCategories) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/users/${id}/approve`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ categories: selectedCategories }),
        });
        
        const data = await response.json();

        if (response.ok) {
          Swal.fire(
            'Approved!',
            `User has been approved and assigned to: ${selectedCategories.join(', ')}.`,
            'success'
          );
          setRefreshKey((prev) => prev + 1);
        } else {
          Swal.fire(
            'Error!',
            data.message || 'Failed to approve user.',
            'error'
          );
        }
      } catch (error) {
        console.error("Error approving user:", error);
        Swal.fire(
          'Error!',
          'Something went wrong.',
          'error'
        );
      }
    }
  };

  const handleReject = async (user) => {
    const { value: text } = await Swal.fire({
      title: 'Reject User',
      input: 'textarea',
      inputLabel: 'Please provide a reason for rejecting this user',
      inputPlaceholder: 'Type your reason here...',
      inputAttributes: {
        'aria-label': 'Type your reason here'
      },
      showCancelButton: true,
      confirmButtonText: 'Reject',
      confirmButtonColor: '#d33',
      showLoaderOnConfirm: true,
      preConfirm: async (reason) => {
        if (!reason) {
            Swal.showValidationMessage('Reason is required');
            return false;
        }
        try {
            const response = await fetch(`http://localhost:8000/api/admin/users/${user._id}/reject`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ reason: reason }),
            });
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            return response.json();
        } catch (error) {
            Swal.showValidationMessage(
                `Request failed: ${error}`
            );
        }
      },
      allowOutsideClick: () => !Swal.isLoading()
    });

    if (text) {
      Swal.fire({
        title: 'Rejected!',
        text: 'User has been rejected.',
        icon: 'success'
      });
      setRefreshKey((prev) => prev + 1);
    }
  };

  const [pointsModalOpen, setPointsModalOpen] = useState(false);
  const [pointsUser, setPointsUser] = useState(null);
  const [pointsData, setPointsData] = useState({ points: 0, type: 'add' });

  const openPointsModal = (user) => {
      setPointsUser(user);
      setPointsData({ points: 0, type: 'add' });
      setPointsModalOpen(true);
  };

  const handleUpdatePoints = async () => {
      if(!pointsUser) return;
      if(pointsData.points < 0) return Swal.fire('Error', 'Points cannot be negative', 'error');

      try {
          const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api"}/admin/users/${pointsUser._id}/points`, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(pointsData)
          });
          const data = await res.json();
          if(res.ok) {
              Swal.fire('Success', 'Points updated successfully', 'success');
              setPointsModalOpen(false);
              setPointsUser(null);
              setRefreshKey(prev => prev + 1);
          } else {
              Swal.fire('Error', data.message || 'Failed to update points', 'error');
          }
      } catch (error) {
          console.error(error);
          Swal.fire('Error', 'Server error', 'error');
      }
  };

  const getStatusBadge = (user) => {
    if (user.isApproved) {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 flex items-center gap-1 w-fit"><CheckCircle size={12}/> Approved</span>;
    } else if (user.rejectionReason) {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 flex items-center gap-1 w-fit"><XCircle size={12}/> Rejected</span>;
    } else {
      return <span className="px-3 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800 flex items-center gap-1 w-fit">Pending</span>;
    }
  };

  const getImageUrl = (path) => {
    if (!path) return '';
    if (path.startsWith('http')) {
        // Handle Google Drive links to ensure they load in img tags
        if (path.includes('drive.google.com') && path.includes('id=')) {
            const idMatch = path.match(/id=([^&]+)/);
            if (idMatch && idMatch[1]) {
                // Use the thumbnail endpoint which is often more reliable/permissive for embedding
                return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
            }
        }
        return path;
    } 
    return `http://localhost:8000${path}`;
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">User Management</h1>
      
      {loading ? (
        <p>Loading users...</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email/Mobile</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State/City</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {user.documents?.liveImage && (
                         <img src={getImageUrl(user.documents.liveImage)} referrerPolicy="no-referrer" alt="profile" className="h-8 w-8 rounded-full mr-3 object-cover border"/>
                      )}
                      <div className="text-sm font-medium text-gray-900">{user.name}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.email}</div>
                    <div className="text-sm text-gray-500">{user.mobileNumber}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {user.category || "-"}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{user.address?.state}</div>
                    <div className="text-sm text-gray-500">{user.address?.city}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(user)}
                    {user.rejectionReason && <p className="text-xs text-red-500 mt-1 max-w-[150px] truncate" title={user.rejectionReason}>{user.rejectionReason}</p>}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium space-x-2">
                    <button 
                      onClick={() => setSelectedUser(user)}
                      className="text-blue-600 hover:text-blue-900" title="View Details"
                    >
                      <Eye size={18}/>
                    </button>
                    {!user.isApproved && !user.rejectionReason && (
                        <>
                            <button 
                            onClick={() => handleApprove(user._id)} 
                            className="text-green-600 hover:text-green-900" title="Approve"
                            >
                            <CheckCircle size={18}/>
                            </button>
                            <button 
                            onClick={() => handleReject(user)} 
                            className="text-red-600 hover:text-red-900" title="Reject"
                            >
                            <XCircle size={18}/>
                            </button>
                        </>
                    )}
                    <button
                        onClick={() => openPointsModal(user)}
                        className="text-purple-600 hover:text-purple-900" title="Manage Points"
                    >
                        <span className="font-bold border px-1 rounded text-xs">PTS</span>
                    </button>
                    
                  </td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                    <td colSpan="6" className="text-center py-6 text-gray-500">No users found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* User Details Modal */}
      {selectedUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
             <div className="flex justify-between items-center p-6 border-b">
                <h3 className="text-xl font-bold">User Details</h3>
                <button onClick={() => setSelectedUser(null)}><X size={24}/></button>
             </div>
             <div className="p-6 grid grid-cols-2 gap-6">
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Personal Info</h4>
                    <p><strong>Name:</strong> {selectedUser.name}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Mobile:</strong> {selectedUser.mobileNumber}</p>
                    <p><strong>Category:</strong> {selectedUser.category || "N/A"}</p>
                    <p><strong>Auth Person:</strong> {selectedUser.documents?.authorizedCompanyPerson}</p>
                </div>
                <div>
                    <h4 className="font-semibold text-gray-700 mb-2">Address</h4>
                    <p>{selectedUser.address?.line1}</p>
                    <p>{selectedUser.address?.line2}</p>
                    <p>{selectedUser.address?.landmark}</p>
                    <p>{selectedUser.address?.city}, {selectedUser.address?.state}</p>
                    <p>{selectedUser.address?.pincode}, {selectedUser.address?.country}</p>
                </div>
                <div className="col-span-2">
                     <h4 className="font-semibold text-gray-700 mb-4">Documents</h4>
                     <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Object.entries(selectedUser.documents || {}).map(([key, value]) => {
                           if(key === 'authorizedCompanyPerson') return null;
                           if(!value) return null;
                           return (
                               <div key={key} className="border p-2 rounded">
                                   <p className="text-xs font-bold uppercase mb-2">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                                   <a href={getImageUrl(value)} target="_blank" rel="noopener noreferrer">
                                      <img src={getImageUrl(value)} referrerPolicy="no-referrer" alt={key} className="w-full h-32 object-cover rounded hover:opacity-75 transition-opacity"/>
                                   </a>
                               </div>
                           )
                        })}
                     </div>
                </div>
             </div>
             <div className="p-6 border-t flex justify-end gap-3">
                 <button onClick={() => setSelectedUser(null)} className="px-4 py-2 border rounded hover:bg-gray-50">Close</button>
             </div>
          </div>
        </div>
      )}

       {/* Points Modal */}
      {pointsModalOpen && pointsUser && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-sm p-6">
                <h3 className="text-xl font-bold mb-4">Manage Points</h3>
                <p className="mb-4 text-sm text-gray-600">User: <strong>{pointsUser.name}</strong> <br/> Current: {pointsUser.currentPoints || 0} pts ({pointsUser.currentRank || 'Bronze'})</p>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium mb-1">Action</label>
                    <div className="flex gap-2">
                         <button 
                            type="button"
                            onClick={() => setPointsData({...pointsData, type: 'add'})}
                            className={`flex-1 py-2 rounded text-sm font-medium border ${pointsData.type === 'add' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-gray-50 border-gray-200'}`}
                         >
                            Add (+)
                         </button>
                         <button 
                            type="button"
                            onClick={() => setPointsData({...pointsData, type: 'subtract'})}
                            className={`flex-1 py-2 rounded text-sm font-medium border ${pointsData.type === 'subtract' ? 'bg-red-100 border-red-500 text-red-700' : 'bg-gray-50 border-gray-200'}`}
                         >
                            Subtract (-)
                         </button>
                    </div>
                </div>

                <div className="mb-6">
                    <label className="block text-sm font-medium mb-1">Points</label>
                    <input 
                        type="number" 
                        min="0"
                        value={pointsData.points}
                        onChange={(e) => setPointsData({...pointsData, points: parseInt(e.target.value) || 0})}
                        className="w-full border rounded p-2"
                    />
                </div>

                <div className="flex justify-end gap-3">
                    <button onClick={() => setPointsModalOpen(false)} className="px-4 py-2 text-gray-600 hover:text-gray-800">Cancel</button>
                    <button onClick={handleUpdatePoints} className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">Update</button>
                </div>
            </div>
        </div>
      )}

    </div>
  );
};

export default UsersPage;
