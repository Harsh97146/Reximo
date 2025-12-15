"use client";
import React, { useState, useEffect } from "react";
import CommonButton from "../../components/ul/Button";
import { useRouter } from "next/navigation";
import { CheckCircle, XCircle, Check, X } from "lucide-react";

const InputField = ({ label, name, value, onChange, type = "text", required = false, placeholder, className = "" }) => (
  <div className={`flex flex-col gap-1 ${className}`}>
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      placeholder={placeholder}
      className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
    />
  </div>
);

const FileInput = ({ label, name, file, onChange, required = false, accept = "image/*" }) => {
  const [preview, setPreview] = useState(null);

  useEffect(() => {
    if (file && file.type.startsWith("image/")) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreview(null);
    }
  }, [file]);

  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={name} className="text-sm font-medium text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type="file"
        id={name}
        name={name}
        onChange={onChange}
        required={required}
        accept={accept}
        className="block w-full text-sm text-gray-500
          file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-[var(--primary)] file:text-white
          hover:file:bg-blue-600
          file:cursor-pointer cursor-pointer border border-gray-200 rounded-lg"
      />
      {preview && (
        <div className="mt-2">
           <img src={preview} alt="Preview" className="h-32 w-auto object-cover rounded border" />
        </div>
      )}
      {file && <span className="text-xs text-green-600 mt-1">Selected: {file.name}</span>}
    </div>
  );
};

const ToastNotification = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`fixed top-4 right-4 z-50 flex items-center p-4 rounded-md shadow-lg transition-all duration-300 transform translate-y-0 min-w-[300px] ${
      type === 'success' ? 'bg-[#4CAF50] text-white' : 'bg-[#F44336] text-white'
    }`}>
      <div className="mr-3 bg-white rounded-full p-0.5">
        {type === 'success' ? <CheckCircle className="w-5 h-5 text-[#4CAF50]" fill="white" /> : <XCircle className="w-5 h-5 text-[#F44336]" fill="white" />}
      </div>
      <div className="flex-1">
        {/* <p className="font-bold text-lg">{type === 'success' ? 'Success' : 'Error'}</p> */} 
        {/* User image shows just the message nicely centered or near the icon. Let's keep it simple. */}
        <p className="font-medium text-white text-base">{message}</p>
      </div>
      <button onClick={onClose} className="ml-4 text-white hover:text-gray-200">
        <span className="sr-only">Close</span>
        <svg className="w-5 h-5 font-bold" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>
      {/* Optional progress bar visual at bottom if desired, but sticking to solid block first */}
    </div>
  );
};

const RegisterPage = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobileNumber: "",
    password: "",
    address_1: "",
    address_2: "",
    landmark: "",
    city: "",
    state: "",
    pincode: "",
    country: "India",
    authorizedCompanyPerson: "",
  });

  const [files, setFiles] = useState({
    liveImage: null,
    adharCardFront: null,
    adharCardBack: null,
    panCard: null,
    addressDoc: null,
  });

  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ type: "", text: "", visible: false });
  const [otpSent, setOtpSent] = useState(false);
  const [otpSending, setOtpSending] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [passwordValidation, setPasswordValidation] = useState({
    minLength: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false
  });

  const showToast = (type, text) => {
    setToast({ type, text, visible: true });
    // Auto hide after 3 seconds if not redirecting immediately
    if (type === 'error') {
       setTimeout(() => setToast(prev => ({ ...prev, visible: false })), 3000);
    }
  };

  const handleSendOtp = async () => {
    if (!formData.email) return showToast("error", "Please enter email first");
    setOtpSending(true);
    try {
        const response = await fetch("https://api.rexinochemical.com/api/auth/send-otp", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: formData.email }),
        });
        const data = await response.json();
        if (response.ok) {
            showToast("success", "OTP sent to your email!");
            setOtpSent(true);
        } else {
            showToast("error", data.message || "Failed to send OTP");
        }
    } catch (error) {
        console.error(error);
        showToast("error", "Failed to send OTP");
    } finally {
        setOtpSending(false);
    }
  };

  const validatePassword = (password) => {
    return {
      minLength: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /[0-9]/.test(password),
      hasSpecialChar: /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password)
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    
    // Validate password in real-time
    if (name === 'password') {
      setPasswordValidation(validatePassword(value));
    }
  };

  const handleFileChange = (e) => {
    const { name, files: selectedFiles } = e.target;
    if (selectedFiles && selectedFiles[0]) {
      setFiles((prev) => ({ ...prev, [name]: selectedFiles[0] }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpSent) {
        showToast("error", "Please verify your email address first by clicking 'Send OTP'.");
        return;
    }
    if (!formData.otp) {
        showToast("error", "Please enter the OTP sent to your email.");
        return;
    }

    // Validate password before submission
    const allPasswordRequirementsMet = Object.values(passwordValidation).every(val => val === true);
    if (!allPasswordRequirementsMet) {
        showToast("error", "Please ensure your password meets all the requirements.");
        return;
    }

    setLoading(true);
    setToast({ text: "", type: "", visible: false });

    // ... existing submission logic ...
    const submissionData = new FormData();
    Object.keys(formData).forEach((key) => {
      submissionData.append(key, formData[key]);
    });
    Object.keys(files).forEach((key) => {
      if (files[key]) {
        submissionData.append(key, files[key]);
      }
    });

    try {
      // Assuming backend is running on localhost:8000
      const response = await fetch(process.env.NEXT_PUBLIC_API_URL + "/auth/register", {
        method: "POST",
        body: submissionData,
      });

      const data = await response.json();

      if (response.ok) {
        showToast("success", data.message || "Registration successful! Redirecting to login...");
        
        // Reset form
        setFormData({
            name: "",
            email: "",
            mobileNumber: "",
            password: "",
            address_1: "",
            address_2: "",
            landmark: "",
            city: "",
            state: "",
            pincode: "",
            country: "India",
            authorizedCompanyPerson: "",
            otp: ""
        });
        setFiles({
            liveImage: null,
            adharCardFront: null,
            adharCardBack: null,
            panCard: null,
            addressDoc: null,
        });
        setOtpSent(false);
        // Clear file inputs visually
        document.querySelectorAll('input[type="file"]').forEach(input => input.value = '');

        // Redirect after 2 seconds
        setTimeout(() => {
            router.push('/login');
        }, 2000);

      } else {
        showToast("error", data.message || "Registration failed.");
      }
    } catch (error) {
      console.error("Error registering:", error);
      showToast("error", "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 font-dm-sans relative">
      {toast.visible && (
        <ToastNotification 
            message={toast.text} 
            type={toast.type} 
            onClose={() => setToast({ ...toast, visible: false })} 
        />
      )}

      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden pt-[56px]">
        <div className="bg-[var(--primary)] px-8 py-6">
            <h2 className="text-3xl font-bold text-white text-center">Dealer Registration</h2>
            <p className="text-blue-100 text-center mt-2">Join our network of authorized dealers</p>
        </div>
        
        <div className="p-8 md:p-12">
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Personal & Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Full Name" name="name" value={formData.name} onChange={handleChange} required placeholder="John Doe" />
                
                {/* Email with OTP */}
                <div className="flex flex-col gap-1">
                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <div className="flex gap-2">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                        readOnly={otpSent}
                        />
                        <button 
                            type="button" 
                            onClick={handleSendOtp}
                            disabled={otpSending || otpSent || !formData.email}
                            className={`px-4 py-2 bg-blue-600 text-white rounded-lg whitespace-nowrap ${otpSending || otpSent || !formData.email ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'}`}
                        >
                            {otpSending ? "Sending..." : otpSent ? "OTP Sent" : "Send OTP"}
                        </button>
                    </div>
                </div>

                {/* OTP Input with Accordion Effect */}
                <InputField label="Mobile Number" name="mobileNumber" value={formData.mobileNumber} onChange={handleChange} type="tel" required placeholder="+91 9876543210" />
                <div className={`transition-all duration-300 ease-in-out overflow-hidden ${otpSent ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <InputField label="Enter OTP" name="otp" value={formData.otp || ""} onChange={handleChange} required={otpSent} placeholder="123456" />
                </div>

                {/* Password with Validation */}
                <div className="flex flex-col gap-1 md:col-span-2">
                  <label htmlFor="password" className="text-sm font-medium text-gray-700">
                    Password <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    required
                    placeholder="••••••••"
                    className="px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--primary)] focus:border-transparent transition-all"
                  />
                  
                  {/* Password Requirements */}
                  {(passwordFocused || formData.password) && (
                    <div className="mt-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                      <p className="text-xs font-semibold text-gray-700 mb-2">Password must contain:</p>
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.minLength ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <X size={14} className="text-red-500" />
                          )}
                          <span className={passwordValidation.minLength ? "text-green-600" : "text-gray-600"}>
                            At least 8 characters
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasUpperCase ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <X size={14} className="text-red-500" />
                          )}
                          <span className={passwordValidation.hasUpperCase ? "text-green-600" : "text-gray-600"}>
                            At least 1 uppercase letter (A-Z)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasLowerCase ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <X size={14} className="text-red-500" />
                          )}
                          <span className={passwordValidation.hasLowerCase ? "text-green-600" : "text-gray-600"}>
                            At least 1 lowercase letter (a-z)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasNumber ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <X size={14} className="text-red-500" />
                          )}
                          <span className={passwordValidation.hasNumber ? "text-green-600" : "text-gray-600"}>
                            At least 1 number (0-9)
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          {passwordValidation.hasSpecialChar ? (
                            <Check size={14} className="text-green-600" />
                          ) : (
                            <X size={14} className="text-red-500" />
                          )}
                          <span className={passwordValidation.hasSpecialChar ? "text-green-600" : "text-gray-600"}>
                            At least 1 special character (!@#$%^&*...)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                <InputField label="Authorized Company Person" name="authorizedCompanyPerson" value={formData.authorizedCompanyPerson} onChange={handleChange} required placeholder="Name of auth person" />
              </div>
            </section>

             {/* Address Details */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Address Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField label="Address Line 1" name="address_1" value={formData.address_1} onChange={handleChange} required placeholder="Street / Building" />
                <InputField label="Address Line 2" name="address_2" value={formData.address_2} onChange={handleChange} placeholder="Suite / Unit (Optional)" />
                <InputField label="Landmark" name="landmark" value={formData.landmark} onChange={handleChange} placeholder="Near..." />
                <InputField label="City" name="city" value={formData.city} onChange={handleChange} required placeholder="Mumbai" />
                <InputField label="State" name="state" value={formData.state} onChange={handleChange} required placeholder="Maharashtra" />
                <InputField label="Pincode" name="pincode" value={formData.pincode} onChange={handleChange} required placeholder="400001" />
                <InputField label="Country" name="country" value={formData.country} onChange={handleChange} required readOnly />
              </div>
            </section>

            {/* Document Uploads */}
            <section>
              <h3 className="text-xl font-semibold text-gray-800 mb-4 border-b pb-2">Documents (Images Only)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FileInput label="Live Photo" name="liveImage" file={files.liveImage} onChange={handleFileChange} required />
                <FileInput label="Aadhar Card Front" name="adharCardFront" file={files.adharCardFront} onChange={handleFileChange} required />
                <FileInput label="Aadhar Card Back" name="adharCardBack" file={files.adharCardBack} onChange={handleFileChange} required />
                <FileInput label="PAN Card" name="panCard" file={files.panCard} onChange={handleFileChange} required />
                <FileInput label="Address Proof Document" name="addressDoc" file={files.addressDoc} onChange={handleFileChange} required />
              </div>
            </section>

            <div className="flex justify-center pt-6">
              <CommonButton
                type="submit"
                label={loading ? "Registering..." : "Submit Registration"}
                disabled={loading}
                className={`w-full md:w-auto ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
              />
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account? <a href="/login" className="text-[var(--primary)] font-semibold hover:underline">Login here</a>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
