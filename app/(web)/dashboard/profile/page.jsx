"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Mail, Phone, MapPin, FileText, X } from "lucide-react";

const ProfilePage = () => {
  const router = useRouter();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  const BASE_API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem("token");
      
      if (!token) {
        router.push("/login");
        return;
      }

      const response = await fetch(`${BASE_API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 401 || response.status === 403) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        router.push("/login?error=Session expired");
        return;
      }

      const data = await response.json();
      if (response.ok) {
        setProfile(data.user);
      } else {
        setError(data.message || "Failed to fetch profile");
      }
    } catch (error) {
      console.error("Error fetching profile:", error);
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };



  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 px-4 py-3 rounded-lg">
        No profile data available
      </div>
    );
  }

  const getDocumentUrl = (url) => {
    if (!url) return null;
    if (url.startsWith('http')) {
        // Handle Google Drive links to ensure they load in img tags
        if (url.includes('drive.google.com') && url.includes('id=')) {
            const idMatch = url.match(/id=([^&]+)/);
            if (idMatch && idMatch[1]) {
                // Use the thumbnail endpoint which is often more reliable/permissive for embedding
                return `https://drive.google.com/thumbnail?id=${idMatch[1]}&sz=w1000`;
            }
        }
        return url;
    }
    return `${BACKEND_URL}${url}`;
  };

  const documents = [
    { key: 'liveImage', label: 'Live Image', url: getDocumentUrl(profile.documents?.liveImage) },
    { key: 'adharCardFront', label: 'Aadhar Card (Front)', url: getDocumentUrl(profile.documents?.adharCardFront) },
    { key: 'adharCardBack', label: 'Aadhar Card (Back)', url: getDocumentUrl(profile.documents?.adharCardBack) },
    { key: 'panCard', label: 'PAN Card', url: getDocumentUrl(profile.documents?.panCard) },
    { key: 'addressDoc', label: 'Address Proof', url: getDocumentUrl(profile.documents?.addressDoc) },
  ];

  console.log('Profile documents:', profile.documents);
  console.log('Processed document URLs:', documents);

  return (
    <div className="font-dm-sans">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900">My Profile</h2>
        <p className="text-gray-500 mt-1">View your account information and documents</p>
      </div>

      {/* Profile Information */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Personal Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <User size={24} className="text-blue-600" />
            Personal Information
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium text-gray-500">Full Name</label>
              <p className="text-base text-gray-900 font-medium">{profile.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Mail size={16} />
                Email Address
              </label>
              <p className="text-base text-gray-900">{profile.email}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500 flex items-center gap-1">
                <Phone size={16} />
                Mobile Number
              </label>
              <p className="text-base text-gray-900">{profile.mobileNumber}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-gray-500">Role</label>
              <p className="text-base text-gray-900 capitalize">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  {profile.role}
                </span>
              </p>
            </div>
            {profile.assignedCategory && (
              <div>
                <label className="text-sm font-medium text-gray-500">Assigned Category</label>
                <p className="text-base text-gray-900">
                  {Array.isArray(profile.assignedCategory) 
                    ? profile.assignedCategory.join(", ") 
                    : profile.assignedCategory}
                </p>
              </div>
            )}
            <div>
              <label className="text-sm font-medium text-gray-500">Account Status</label>
              <p className="text-base">
                {profile.isApproved ? (
                  <span className="inline-block px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    ✓ Approved
                  </span>
                ) : (
                  <span className="inline-block px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                    ⏳ Pending Approval
                  </span>
                )}
              </p>
            </div>
          </div>
        </div>

        {/* Address Information Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
            <MapPin size={24} className="text-blue-600" />
            Address Information
          </h3>
          {profile.address ? (
            <div className="space-y-4">
              {profile.address.line1 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Address Line 1</label>
                  <p className="text-base text-gray-900">{profile.address.line1}</p>
                </div>
              )}
              {profile.address.line2 && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Address Line 2</label>
                  <p className="text-base text-gray-900">{profile.address.line2}</p>
                </div>
              )}
              {profile.address.landmark && (
                <div>
                  <label className="text-sm font-medium text-gray-500">Landmark</label>
                  <p className="text-base text-gray-900">{profile.address.landmark}</p>
                </div>
              )}
              <div className="grid grid-cols-2 gap-4">
                {profile.address.city && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">City</label>
                    <p className="text-base text-gray-900">{profile.address.city}</p>
                  </div>
                )}
                {profile.address.state && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">State</label>
                    <p className="text-base text-gray-900">{profile.address.state}</p>
                  </div>
                )}
              </div>
              <div className="grid grid-cols-2 gap-4">
                {profile.address.pincode && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Pincode</label>
                    <p className="text-base text-gray-900">{profile.address.pincode}</p>
                  </div>
                )}
                {profile.address.country && (
                  <div>
                    <label className="text-sm font-medium text-gray-500">Country</label>
                    <p className="text-base text-gray-900">{profile.address.country}</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <p className="text-gray-500">No address information available</p>
          )}
        </div>

        {/* Documents Card */}
        {profile.documents && (
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 lg:col-span-2">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FileText size={24} className="text-blue-600" />
              Uploaded Documents
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {documents.map((doc) => doc.url && (
                <div key={doc.key} className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-3">{doc.label}</p>
                  <div className="relative h-48 bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={doc.url}
                      referrerPolicy="no-referrer"
                      alt={doc.label}
                      className="w-full h-full object-contain cursor-pointer hover:opacity-90 transition-opacity"
                      onClick={() => setPreviewImage({ url: doc.url, label: doc.label })}
                      onError={(e) => {
                        console.error(`Failed to load image: ${doc.label}`, doc.url);
                        e.target.style.display = 'none';
                        e.target.nextElementSibling.style.display = 'flex';
                      }}
                      onLoad={(e) => {
                        console.log(`Successfully loaded: ${doc.label}`, doc.url);
                      }}
                    />
                    <div className="absolute inset-0 bg-red-50 hidden items-center justify-center flex-col p-4">
                      <p className="text-red-600 text-sm text-center">Failed to load image</p>
                      <p className="text-xs text-gray-500 mt-2 break-all">{doc.url}</p>
                    </div>
                  </div>
                </div>
              ))}
              {profile.documents.authorizedCompanyPerson && (
                <div className="border border-gray-200 rounded-lg p-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Authorized Person</p>
                  <p className="text-gray-900">{profile.documents.authorizedCompanyPerson}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Image Preview Modal */}
      {previewImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div 
            className="relative max-w-5xl max-h-[90vh] bg-white rounded-lg shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setPreviewImage(null)}
              className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100 transition-colors"
              aria-label="Close preview"
            >
              <X size={24} className="text-gray-700" />
            </button>

            {/* Image Label */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
              <h3 className="text-xl font-bold text-white">{previewImage.label}</h3>
            </div>

            {/* Image Container */}
            <div className="p-6 bg-gray-50">
              <img
                src={previewImage.url}
                referrerPolicy="no-referrer"
                alt={previewImage.label}
                className="max-w-full max-h-[70vh] mx-auto object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
