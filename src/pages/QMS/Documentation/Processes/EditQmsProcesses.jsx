import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ChevronDown, Eye } from "lucide-react";
import axios from "axios";
import fileIcon from "../../../../assets/images/Company Documentation/file-icon.svg";
import { BASE_URL } from "../../../../Utils/Config";

const EditQmsProcesses = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  // Define legal requirement options
  const [legalRequirementOptions, setLegalRequirementOptions] = useState([]);

  const [showEditProcessSuccessModal, setShowEditProcessSuccessModal] = useState(false);
  const [showEditQmsProcessErrorModal, setShowEditQmsProcessErrorModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    no: "",
    type: "Stratgic",
    legal_requirements: "",
    custom_legal_requirements: "",
    file: null,
    send_notification: false,
    is_draft: false,
  });
  
  const [dropdownRotation, setDropdownRotation] = useState({
    type: false,
    legal_requirements: false,
  });
  const [fileName, setFileName] = useState("No file chosen");
  const [selectedFile, setSelectedFile] = useState(null);
  const [showCustomField, setShowCustomField] = useState(false);
  const [fileUrl, setFileUrl] = useState(null);

  const getUserCompanyId = () => {
    const storedCompanyId = localStorage.getItem("company_id");
    if (storedCompanyId) return storedCompanyId;

    const userRole = localStorage.getItem("role");
    if (userRole === "user") {
      const userData = localStorage.getItem("user_company_id");
      if (userData) {
        try {
          return JSON.parse(userData);
        } catch (e) {
          console.error("Error parsing user company ID:", e);
          return null;
        }
      }
    }
    return null;
  };

  const companyId = getUserCompanyId();
  
  // Define the fetchComplianceData function
  const fetchComplianceData = () => {
    if (!companyId) {
      console.error("Company ID not found");
      return;
    }

    axios.get(`${BASE_URL}/qms/compliance/${companyId}/`)
      .then(response => {
        setLegalRequirementOptions(response.data || []);
      })
      .catch(error => {
        console.error("Error fetching legal requirements:", error);
      });
  };

  // First useEffect to set company ID and fetch compliance data
  useEffect(() => {
    if (companyId) {
      setFormData(prev => ({
        ...prev,
        company: companyId
      }));
      fetchComplianceData();
    }
  }, [companyId]);
  
  // Second useEffect to fetch process data
  useEffect(() => {
    if (!id) return;

    // Fetch process data
    axios.get(`${BASE_URL}/qms/processes-get/${id}/`)
      .then((res) => {
        const data = res.data;
        setFormData({
          ...data,
          legal_requirements: data.legal_requirements || "",
          custom_legal_requirements: data.custom_legal_requirements || "",
          file: null,
        });
        if (data.legal_requirements === "N/A") {
          setShowCustomField(true);
        }
        if (data.file) {
          setFileName(data.file.split("/").pop());
          setFileUrl(data.file);
        }
      })
      .catch((err) => console.error("Error fetching process data:", err));
  }, [id]);
  
  const toggleDropdown = (field) => {
    setDropdownRotation((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };
  
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    if (name === "legal_requirements") {
      setShowCustomField(value === "N/A");
    }
  };
  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setFileName(file.name);
      setFormData((prev) => ({
        ...prev,
        file: file,
      }));
    }
  };
  
  const handleViewFile = () => {
    if (fileUrl && !selectedFile) {
      window.open(fileUrl, '_blank');
    } else if (selectedFile) {
      // If there's a newly selected file, create a temporary URL to view it
      const tempUrl = URL.createObjectURL(selectedFile);
      window.open(tempUrl, '_blank');
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = new FormData();

    // Only add fields that have values
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        payload.append(key, value);
      }
    });
    
    try {
      await axios.patch(`${BASE_URL}/qms/processes-get/${id}/`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setShowEditProcessSuccessModal(true);
      setTimeout(() => {
        setShowEditProcessSuccessModal(false);
        navigate("/company/qms/processes");
      }, 2000);

    } catch (err) {
      setShowEditQmsProcessErrorModal(true);
      setTimeout(() => {
        setShowEditQmsProcessErrorModal(false);
      }, 3000);
      console.error("Error updating process:", err);
    }
  };
  
  const handleCancel = () => {
    navigate("/company/qms/processes");
  };

  return (
    <div className="bg-[#1C1C24] p-5 rounded-lg text-white">
      <h1 className="add-interested-parties-head px-[122px] border-b border-[#383840] pb-5">
        Edit Process
      </h1>

      <form onSubmit={handleSubmit} className="px-[122px]">
        <div className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block mb-3 add-qms-manual-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="w-full add-qms-intertested-inputs"
                placeholder="Enter Process Name"
              />
            </div>
            <div>
              <label className="block mb-3 add-qms-manual-label">Process Number</label>
              <input
                type="text"
                name="no"
                value={formData.no || ""}
                onChange={handleInputChange}
                className="w-full add-qms-intertested-inputs"
                placeholder="Enter Process Number"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-3 add-qms-manual-label">Type</label>
              <div className="relative">
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleInputChange}
                  onFocus={() => toggleDropdown("type")}
                  onBlur={() => toggleDropdown("type")}
                  className="w-full add-qms-intertested-inputs appearance-none cursor-pointer"
                >
                  <option value="Stratgic">Stratgic</option>
                  <option value="Core">Core</option>
                  <option value="Support">Support</option>
                  <option value="Monitoring/Measurment">Monitoring/Measurment</option>
                  <option value="Outsource">Outsource</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown
                    className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                      dropdownRotation.type ? "rotate-180" : ""
                    }`}
                  />
                </div>
              </div>
            </div>
            <div>
              <label className="block mb-3 add-qms-manual-label">
                Applicable Legal/Regulatory Requirements
              </label>
              <div className="relative">
                <select
                  name="legal_requirements"
                  value={formData.legal_requirements}
                  onChange={handleInputChange}
                  onFocus={() => toggleDropdown('legal_requirements')}
                  onBlur={() => toggleDropdown('legal_requirements')}
                  className="w-full add-qms-intertested-inputs appearance-none cursor-pointer"
                >
                  <option value="">Choose</option>

                  {legalRequirementOptions
                    .filter(option =>
                      !['GDPR', 'HIPAA', 'CCPA', 'SOX'].includes(option.compliance_name))
                    .map((option, index) => (
                      <option key={index} value={option.compliance_name || option.compliance_no}>
                        {option.compliance_name || option.compliance_no}
                      </option>
                    ))}

                  <option value="N/A">N/A</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className={`h-5 w-5 text-gray-500 transform transition-transform duration-300 ${
                    dropdownRotation.legal_requirements ? 'rotate-180' : ''
                  }`} />
                </div>
              </div>
              {showCustomField && (
                <div className="mt-3 transition-all duration-300 ease-in-out">
                  <textarea
                    name="custom_legal_requirements"
                    value={formData.custom_legal_requirements || ""}
                    onChange={handleInputChange}
                    placeholder="Please specify"
                    className="w-full add-qms-intertested-inputs !h-[118px]"
                  />
                </div>
              )}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label className="block mb-3 add-qms-manual-label">Upload File</label>
              <div className="relative">
                <input
                  type="file"
                  id="fileInput"
                  className="hidden"
                  onChange={handleFileChange}
                />
                <button
                  type="button"
                  className="w-full add-qmsmanual-attach"
                  onClick={() => document.getElementById("fileInput").click()}
                >
                  <span className="file-input">{fileName}</span>
                  <img src={fileIcon} alt="File Icon" />
                </button>
                <div className="flex justify-between items-center">
                  {(fileUrl || selectedFile) && (
                    <button
                      type="button"
                      onClick={handleViewFile}
                      className="flex items-center mt-[10.65px] gap-[8px]"
                    >
                      <p className="click-view-file-btn text-[#1E84AF]">Click to view file</p>
                      <Eye size={16} className="text-[#1E84AF]" />
                    </button>
                  )}
                  {!selectedFile && !fileUrl && (
                    <p className="text-right no-file">No file chosen</p>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-end justify-end">
              <div className="flex flex-col space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    name="send_notification"
                    className="mr-2 form-checkboxes"
                    checked={formData.send_notification}
                    onChange={handleInputChange}
                  />
                  <span className="permissions-texts cursor-pointer">Send Notification</span>
                </label>
          
              </div>
            </div>
            
            <div></div>
            <div className="flex justify-end space-x-5">
              <button
                type="button"
                onClick={handleCancel}
                className="cancel-btn duration-200"
              >
                Cancel
              </button>
              <button type="submit" className="save-btn duration-200">
                Save
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditQmsProcesses;