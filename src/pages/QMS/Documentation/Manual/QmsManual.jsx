import React, { useState, useEffect } from 'react';
import { Search} from 'lucide-react';
import plusicon from "../../../../assets/images/Company Documentation/plus icon.svg";
import views from "../../../../assets/images/Companies/view.svg";
import edits from "../../../../assets/images/Company Documentation/edit.svg";
import deletes from "../../../../assets/images/Company Documentation/delete.svg";
import publish from "../../../../assets/images/Modal/publish.svg"
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { BASE_URL } from "../../../../Utils/Config";
import "./qmsmanual.css";

const QmsManual = () => {
  const [manuals, setManuals] = useState([]);
  const [draftCount, setDraftCount] = useState(0);
  const [corrections, setCorrections] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const manualPerPage = 10;

  const [showPublishModal, setShowPublishModal] = useState(false);
  const [publishSuccess, setPublishSuccess] = useState(false);
  const [selectedManualId, setSelectedManualId] = useState(null);
  const [sendNotification, setSendNotification] = useState(false);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).replace(/\//g, '-');
  };

  const getCurrentUser = () => {
    const role = localStorage.getItem('role');

    try {
      if (role === 'company') {
        // Retrieve company user data
        const companyData = {};
        Object.keys(localStorage)
          .filter(key => key.startsWith('company_'))
          .forEach(key => {
            const cleanKey = key.replace('company_', '');
            try {
              companyData[cleanKey] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
              companyData[cleanKey] = localStorage.getItem(key);
            }
          });

        // Add additional fields from localStorage
        companyData.role = role;
        companyData.company_id = localStorage.getItem('company_id');
        companyData.company_name = localStorage.getItem('company_name');
        companyData.email_address = localStorage.getItem('email_address');

        console.log("Company User Data:", companyData);
        return companyData;
      } else if (role === 'user') {
        // Retrieve regular user data
        const userData = {};
        Object.keys(localStorage)
          .filter(key => key.startsWith('user_'))
          .forEach(key => {
            const cleanKey = key.replace('user_', '');
            try {
              userData[cleanKey] = JSON.parse(localStorage.getItem(key));
            } catch (e) {
              userData[cleanKey] = localStorage.getItem(key);
            }
          });

        // Add additional fields from localStorage
        userData.role = role;
        userData.user_id = localStorage.getItem('user_id');

        console.log("Regular User Data:", userData);
        return userData;
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
      return null;
    }
  };

  const getUserCompanyId = () => {
    const role = localStorage.getItem("role");

    if (role === "company") {
      return localStorage.getItem("company_id");
    } else if (role === "user") {
      try {
        const userCompanyId = localStorage.getItem("user_company_id");
        return userCompanyId ? JSON.parse(userCompanyId) : null;
      } catch (e) {
        console.error("Error parsing user company ID:", e);
        return null;
      }
    }

    return null;
  };

  // New function to check if current user is involved with a manual
  const isUserInvolvedWithManual = (manual) => {
    const currentUserId = Number(localStorage.getItem('user_id'));
    
    // Check if user is the writer, checker, or approver of the manual
    return (
      (manual.written_by && manual.written_by.id === currentUserId) ||
      (manual.checked_by && manual.checked_by.id === currentUserId) ||
      (manual.approved_by && manual.approved_by.id === currentUserId)
    );
  };

  // Updated fetchManuals function to apply visibility filtering
  const fetchManuals = async () => {
    try {
      setLoading(true);
      const companyId = getUserCompanyId();
      const response = await axios.get(`${BASE_URL}/qms/manuals/${companyId}/`);
      
      // Get current user ID
      const currentUserId = Number(localStorage.getItem('user_id'));
      const role = localStorage.getItem('role');
      
      // Filter manuals based on status and user involvement
      const filteredManuals = response.data.filter(manual => {
        // If manual is published, show to everyone
        if (manual.status === 'Publish') {
          return true;
        }
        
        // If user is a company admin, show all
        if (role === 'company') {
          return true;
        }
        
        // For other statuses, only show if user is involved with the manual
        return isUserInvolvedWithManual(manual);
      });

      setManuals(filteredManuals);
      console.log("Filtered Manuals Data:", filteredManuals);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching manuals:", err);
      setError("Failed to load manuals. Please try again.");
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // First, fetch manuals with visibility filtering
        const companyId = getUserCompanyId();
        const manualsResponse = await axios.get(`${BASE_URL}/qms/manuals/${companyId}/`);
        
        // Get current user ID
        const currentUserId = Number(localStorage.getItem('user_id'));
        const role = localStorage.getItem('role');
        
        // Filter manuals based on status and user involvement
        const filteredManuals = manualsResponse.data.filter(manual => {
          // If manual is published, show to everyone
          if (manual.status === 'Publish') {
            return true;
          }
          
          // If user is a company admin, show all
          if (role === 'company') {
            return true;
          }
          
          // For other statuses, only show if user is involved with the manual
          return isUserInvolvedWithManual(manual);
        });

        // Set filtered manuals
        setManuals(filteredManuals);

        // Then fetch corrections for visible manuals
        const correctionsPromises = filteredManuals.map(async (manual) => {
          try {
            const correctionResponse = await axios.get(`${BASE_URL}/qms/manuals/${manual.id}/corrections/`);
            return { manualId: manual.id, corrections: correctionResponse.data };
          } catch (correctionError) {
            console.error(`Error fetching corrections for manual ${manual.id}:`, correctionError);
            return { manualId: manual.id, corrections: [] };
          }
        });

        // Process all corrections
        const correctionResults = await Promise.all(correctionsPromises);

        // Transform corrections into the dictionary format
        const correctionsByManual = correctionResults.reduce((acc, result) => {
          acc[result.manualId] = result.corrections;
          return acc;
        }, {});

        setCorrections(correctionsByManual);

        // Set current user and clear loading state
        setCurrentUser(getCurrentUser());
        setLoading(false);
      } catch (error) {
        console.error("Error fetching manuals or corrections:", error);
        setError("Failed to load manuals and corrections. Please try again.");
        setLoading(false);
      }
    };

    fetchAllData();
  }, []);  

  useEffect(() => {
    fetchManuals();
    setCurrentUser(getCurrentUser());
  }, []);

  const handleClickApprove = (id) => {
    navigate(`/company/qms/viewmanual/${id}`);
  };

  // Delete manual
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this manual?")) {
      try {
        await axios.delete(`${BASE_URL}/qms/manual-detail/${id}/`);
        alert("Manual deleted successfully");
        fetchManuals();
      } catch (err) {
        console.error("Error deleting manual:", err);
        alert("Failed to delete manual");
      }
    }
  };

  
  const getRelevantUserId = () => {
    const userRole = localStorage.getItem("role");
    
    if (userRole === "user") {
        const userId = localStorage.getItem("user_id");
        if (userId) return userId;
    }

    const companyId = localStorage.getItem("company_id");
    if (companyId) return companyId;

    return null;
  };

  useEffect(() => {
    const fetchDraftManuals = async () => {
      try {
        const id = getRelevantUserId();
        const response = await axios.get(`${BASE_URL}/qms/manuals/drafts-count/${id}/`);
        setDraftCount(response.data.count);
        console.log("Draft count:", response.data)
      } catch (error) {
        console.error("Error fetching draft manuals:", error);
        setDraftCount(0);
      }
    };

    fetchDraftManuals();
  }, []);

  const filteredManual = manuals.filter(manual =>
    (manual.title?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (manual.no?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (manual.approved_by?.first_name?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (manual.rivision?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
    (formatDate(manual.date)?.replace(/^0+/, '') || '').includes(searchQuery.replace(/^0+/, ''))
  );

  const totalPages = Math.ceil(filteredManual.length / manualPerPage);
  const paginatedManual = filteredManual.slice((currentPage - 1) * manualPerPage, currentPage * manualPerPage);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleQMSAddManual = () => {
    navigate('/company/qms/addmanual');
  };

  const handleEdit = (id) => {
    navigate(`/company/qms/editmanual/${id}`);
  };

  const handleView = (id) => {
    navigate(`/company/qms/viewmanual/${id}`);
  };

  const handleManualDraft = () => {
    navigate('/company/qms/draftmanual')
  }

  const handlePublish = (manual) => {
    setSelectedManualId(manual.id);
    setShowPublishModal(true);
    setPublishSuccess(false);
    setSendNotification(false);
  };

  const closePublishModal = () => {
    if (publishSuccess) {
      fetchManuals();
    }

    setShowPublishModal(false);
    setTimeout(() => {
      setPublishSuccess(false);
    }, 300);
  };

  const handlePublishSave = async () => {
    try {
      if (!selectedManualId) {
        alert("No manual selected for publishing");
        return;
      }
      
      
      const userId = localStorage.getItem('user_id');
      if (!userId) {
        alert("User information not found. Please log in again.");
        return;
      }
      
      
      await axios.post(`${BASE_URL}/qms/manuals/${selectedManualId}/publish-notification/`, {
        company_id: getUserCompanyId(),
        published_by: userId,  
        send_notification: sendNotification
      });
      
      setPublishSuccess(true);
      setTimeout(() => {
        closePublishModal();
        fetchManuals(); // Refresh the list
      }, 1000);
    } catch (error) {
      console.error("Error publishing manual:", error);
      alert("Failed to publish manual. Please try again.");
    }
  };
  const canReview = (manual) => {
    const currentUserId = Number(localStorage.getItem('user_id'));
    const manualCorrections = corrections[manual.id] || [];

    console.log('Reviewing Conditions Debug:', {
      currentUserId,
      checkedById: manual.checked_by?.id,
      status: manual.status,
      corrections: manualCorrections,
      toUserId: manualCorrections.length > 0 ? manualCorrections[0].to_user?.id : null,
    });

    if (manual.status === "Pending for Review/Checking") {
      return currentUserId === manual.checked_by?.id;
    }

    if (manual.status === "Correction Requested") {
      return manualCorrections.some(correction =>
        correction.to_user?.id === currentUserId && currentUserId === correction.to_user?.id
      );
    }

    if (manual.status === "Reviewed,Pending for Approval") {
      return currentUserId === manual.approved_by?.id;
    }

    return false;
  };

  return (
    <div className="bg-[#1C1C24] list-manual-main">
      <div className="flex items-center justify-between px-[14px] pt-[24px]">
        <h1 className="list-manual-head">List Manual Sections</h1>
        <div className="flex space-x-5">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleSearchChange}
              className="serach-input-manual focus:outline-none bg-transparent"
            />
            <div className='absolute right-[1px] top-[2px] text-white bg-[#24242D] p-[10.5px] w-[55px] rounded-tr-[6px] rounded-br-[6px] flex justify-center items-center'>
              <Search size={18} />
            </div>
          </div>
          <button
            className="flex items-center justify-center add-draft-btn gap-[10px] duration-200 border border-[#858585] text-[#858585] hover:bg-[#858585] hover:text-white"
            onClick={handleManualDraft}
          >
            <span>Drafts</span>
            {draftCount > 0 && (
              <span className="bg-red-500 text-white rounded-full text-xs flex justify-center items-center w-[20px] h-[20px] absolute top-[120px] right-56">
                {draftCount}
              </span>
            )}
          </button>
          <button
            className="flex items-center justify-center add-manual-btn gap-[10px] duration-200 border border-[#858585] text-[#858585] hover:bg-[#858585] hover:text-white"
            onClick={handleQMSAddManual}
          >
            <span>Add Manual Sections</span>
            <img src={plusicon} alt="Add Icon" className='w-[18px] h-[18px] qms-add-plus' />
          </button>
        </div>
      </div>

      <div className="p-5 overflow-hidden">
        {loading ? (
          <div className="text-center py-4 text-white">Loading manuals...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="w-full">
            <thead className='bg-[#24242D]'>
              <tr className="h-[48px]">
                <th className="pl-4 pr-2 text-left add-manual-theads">No</th>
                <th className="px-2 text-left add-manual-theads">Section Title</th>
                <th className="px-2 text-left add-manual-theads">Section No</th>
                <th className="px-2 text-left add-manual-theads">Approved by</th>
                <th className="px-2 text-left add-manual-theads">Revision</th>
                <th className="px-2 text-left add-manual-theads">Date</th>
                <th className="px-2 text-left add-manual-theads">Status</th>
                <th className="px-2 text-left add-manual-theads">Action</th>
                <th className="px-2 text-center add-manual-theads">View</th>
                <th className="px-2 text-center add-manual-theads">Edit</th>
                <th className="pl-2 pr-4 text-center add-manual-theads">Delete</th>
              </tr>
            </thead>
            <tbody key={currentPage}>
              {paginatedManual.length > 0 ? (
                paginatedManual.map((manual, index) => {
                  const canApprove = canReview(manual);

                  return (
                    <tr key={manual.id} className="border-b border-[#383840] hover:bg-[#1a1a20] h-[46px]">
                      <td className="pl-5 pr-2 add-manual-datas">{(currentPage - 1) * manualPerPage + index + 1}</td>
                      <td className="px-2 add-manual-datas">{manual.title || 'N/A'}</td>
                      <td className="px-2 add-manual-datas">{manual.no || 'N/A'}</td>
                      <td className="px-2 add-manual-datas">
                        {manual.approved_by ?
                          `${manual.approved_by.first_name} ${manual.approved_by.last_name}` :
                          'N/A'}
                      </td>
                      <td className="px-2 add-manual-datas">{manual.rivision || 'N/A'}</td>
                      <td className="px-2 add-manual-datas">{formatDate(manual.date)}</td>
                      <td className="px-2 add-manual-datas">
                        {manual.status}
                      </td>
                      <td className='px-2 add-manual-datas'>
                        {manual.status === 'Pending for Publish' ? (
                          <button className="text-[#36DDAE]" onClick={() => handlePublish(manual)}>Click to Publish</button>
                        ) : canApprove ? (
                          <button
                            onClick={() => handleClickApprove(manual.id,
                              manual.status === 'Pending for Review/Checking'
                                ? 'Reviewed,Pending for Approval'
                                : (manual.status === 'Correction Requested'
                                  ? 'Pending for Publish'
                                  : 'Pending for Publish')
                            )}
                            className="text-[#1E84AF]"
                          >
                            {manual.status === 'Pending for Review/Checking'
                              ? 'Review'
                              : (manual.status === 'Correction Requested'
                                ? 'Click to Approve'
                                : 'Click to Approve')}
                          </button>
                        ) : (
                          <span className="text-[#858585]">Not Authorized</span>
                        )}
                      </td>
                      <td className="px-2 add-manual-datas text-center">
                        <button
                          onClick={() => handleView(manual.id)}
                          title="View"
                        >
                          <img src={views} alt="" />
                        </button>
                      </td>
                      <td className="px-2 add-manual-datas text-center">
                        <button
                          onClick={() => handleEdit(manual.id)}
                          title="Edit"
                        >
                          <img src={edits} alt="" />
                        </button>
                      </td>

                      <td className="pl-2 pr-4 add-manual-datas text-center">
                        <button
                          onClick={() => handleDelete(manual.id)}
                          title="Delete"
                        >
                          <img src={deletes} alt="" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td colSpan="11" className="text-center py-4 not-found">No Manuals found.</td></tr>
              )}
              <tr>
                <td colSpan="11" className="pt-[15px] border-t border-[#383840]">
                  <div className="flex items-center justify-between w-full">
                    <div className="text-white total-text">Total-{filteredManual.length}</div>
                    <div className="flex items-center gap-5">
                      <button
                        onClick={handlePrevious}
                        disabled={currentPage === 1}
                        className={`cursor-pointer swipe-text ${currentPage === 1 ? 'opacity-50' : ''}`}
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <button
                          key={page}
                          onClick={() => handlePageClick(page)}
                          className={`${currentPage === page ? 'pagin-active' : 'pagin-inactive'}`}
                        >
                          {page}
                        </button>
                      ))}
                      <button
                        onClick={handleNext}
                        disabled={currentPage === totalPages || totalPages === 0}
                        className={`cursor-pointer swipe-text ${currentPage === totalPages || totalPages === 0 ? 'opacity-50' : ''}`}
                      >
                        Next
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        )}
      </div>
      <AnimatePresence>
        {showPublishModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Overlay with animation */}
            <motion.div
              className="absolute inset-0 bg-black bg-opacity-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            />

            {/* Modal with animation */}
            <motion.div
              className="bg-[#1C1C24] rounded-md shadow-xl w-auto h-auto relative"
              initial={{ opacity: 0, scale: 0.95, y: -20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{
                duration: 0.3,
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
            >
              <div className="p-6">
                <div className='flex flex-col justify-center items-center space-y-7'>
                  <img src={publish} alt="Publish Icon" className='mt-3' />
                  <div className='flex gap-[113px] mb-5'>
                    <div className="flex items-center">
                      <span className="mr-3 add-qms-manual-label">Send Notification?</span>
                      <input
                        type="checkbox"
                        className="qms-manual-form-checkbox"
                        checked={sendNotification}
                        onChange={() => setSendNotification(!sendNotification)}
                      />
                    </div>
                  </div>
                  {publishSuccess && (
                    <div className="text-green-500 mb-3">Manual published successfully!</div>
                  )}
                  <div className='flex gap-5'>
                    <button onClick={closePublishModal} className='cancel-btn duration-200 text-white'>Cancel</button>
                    <button onClick={handlePublishSave} className='save-btn duration-200 text-white'>Save</button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default QmsManual;