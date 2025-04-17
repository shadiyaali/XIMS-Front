import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import axios from 'axios';
import plusicon from '../../../../assets/images/Company Documentation/plus icon.svg';
import edits from '../../../../assets/images/Company Documentation/edit.svg';
import deletes from '../../../../assets/images/Company Documentation/delete.svg';
import view from '../../../../assets/images/Company Documentation/view.svg';
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../../../../Utils/Config";

const QmsListManagementChange = () => {
    const [managementChanges, setManagementChanges] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const [itemsPerPage] = useState(10);

    const getUserCompanyId = () => {
        // First check if company_id is stored directly
        const storedCompanyId = localStorage.getItem("company_id");
        if (storedCompanyId) return storedCompanyId;
    
        // If user data exists with company_id
        const userRole = localStorage.getItem("role");
        if (userRole === "user") {
            // Try to get company_id from user data that was stored during login
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

    const formatDate = (dateString) => {
        if (!dateString) return "-";
        
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return dateString; // Return as is if invalid date
        
        return date.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric'
        }).replace(/\//g, '-');
    };

    useEffect(() => {
        const fetchManagementChanges = async () => {
            setIsLoading(true);
            try {
                const companyId = getUserCompanyId();
                if (!companyId) {
                    throw new Error('Company ID not found');
                }
                
                const response = await axios.get(`${BASE_URL}/qms/changes/${companyId}/`);
                
                const formattedData = response.data.map(item => ({
                    id: item.id,
                    title: item.moc_title || "-",
                    mocNo: item.moc_no || "-",
                    revision: item.rivision || "Revision",
                    date: formatDate(item.date),
                    mocType: item.moc_type,
                    attachDocument: item.attach_document,
                    relatedRecordFormat: item.related_record_format,
                    purposeOfChange: item.purpose_of_chnage,
                    potentialConsequences: item.potential_cosequences,
                    mocRemarks: item.moc_remarks,
                    resourcesRequired: item.resources_required,
                    impactOnProcess: item.impact_on_process,
                    sendNotification: item.send_notification,
                    isDraft: item.is_draft
                }));
                
                // Filter out drafts for the main list
                setManagementChanges(formattedData.filter(item => !item.isDraft));
                setError(null);
            } catch (err) {
                setError('Failed to load management changes data');
                console.error('Error fetching management changes data:', err);
            } finally {
                setIsLoading(false);
            }
        };

        fetchManagementChanges();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this management change?')) {
            try {
                await axios.delete(`${BASE_URL}/qms/changes-get/${id}/`);
                setManagementChanges(managementChanges.filter(item => item.id !== id));
            } catch (err) {
                alert('Failed to delete management change');
                console.error('Error deleting management change:', err);
            }
        }
    };

    const handleAddManagementChange = () => {
        navigate('/company/qms/add-management-change');
    };

    const handleDraftManagementChange = () => {
        navigate('/company/qms/draft-management-change');
    };

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1);
    };

    const handleEditManagementChange = (id) => {
        navigate(`/company/qms/edit-management-change/${id}`);
    };

    const handleViewManagementChange = (id) => {
        navigate(`/company/qms/view-management-change/${id}`);
    };

    // Filter and pagination
    const filteredData = managementChanges.filter(item =>
        (item.title && item.title.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.mocNo && item.mocNo.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (item.revision && item.revision.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredData.length / itemsPerPage);

    return (
        <div className="bg-[#1C1C24] text-white p-5 rounded-lg">
            <div>
                <div className="flex justify-between items-center mb-6">
                    <h1 className="list-compliance-head">List Management of Change</h1>
                    <div className="flex gap-4">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search..."
                                value={searchQuery}
                                onChange={handleSearch}
                                className="serach-input-manual focus:outline-none bg-transparent !w-[230px]"
                            />
                            <div className='absolute right-[1px] top-[2px] text-white bg-[#24242D] p-[10.5px] w-[55px] rounded-tr-[6px] rounded-br-[6px] flex justify-center items-center'>
                                <Search size={18} />
                            </div>
                        </div>
                        <button
                            className="flex items-center justify-center !px-5 add-manual-btn gap-[10px] duration-200 border border-[#858585] text-[#858585] hover:bg-[#858585] hover:text-white"
                            onClick={handleDraftManagementChange}
                        >
                            <span>Drafts</span>
                        </button>
                        <button
                            className="flex items-center justify-center add-manual-btn gap-[10px] duration-200 border border-[#858585] text-[#858585] hover:bg-[#858585] hover:text-white"
                            onClick={handleAddManagementChange}
                        >
                            <span>Add Management of Change</span>
                            <img src={plusicon} alt="Add Icon" className='w-[18px] h-[18px] qms-add-plus' />
                        </button>
                    </div>
                </div>

                <div className="overflow-hidden">
                    {isLoading ? (
                        <div className="text-center py-4">Loading...</div>
                    ) : error ? (
                        <div className="text-center py-4 text-red-500">{error}</div>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className='bg-[#24242D]'>
                                    <tr className="h-[48px]">
                                        <th className="px-4 qms-list-compliance-thead text-left w-24">No</th>
                                        <th className="px-4 qms-list-compliance-thead text-left">Title</th>
                                        <th className="px-4 qms-list-compliance-thead text-left">MOC No</th>
                                        <th className="px-4 qms-list-compliance-thead text-left">Revision</th>
                                        <th className="px-4 qms-list-compliance-thead text-left">Date</th>
                                        <th className="px-4 qms-list-compliance-thead text-center">View</th>
                                        <th className="px-4 qms-list-compliance-thead text-center">Edit</th>
                                        <th className="px-4 qms-list-compliance-thead text-center">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.length > 0 ? (
                                        currentItems.map((item, index) => (
                                            <tr key={item.id} className="border-b border-[#383840] hover:bg-[#1a1a20] h-[50px] cursor-pointer">
                                                <td className="px-4 qms-list-compliance-data">{indexOfFirstItem + index + 1}</td>
                                                <td className="px-4 qms-list-compliance-data">{item.title}</td>
                                                <td className="px-4 qms-list-compliance-data">{item.mocNo}</td>
                                                <td className="px-4 qms-list-compliance-data">
                                                    <span className="text-[#1E84AF]">{item.revision}</span>
                                                </td>
                                                <td className="px-4 qms-list-compliance-data">{item.date}</td>
                                                <td className="px-4 qms-list-compliance-data text-center">
                                                    <button onClick={() => handleViewManagementChange(item.id)}>
                                                        <img src={view} alt="View Icon" className='w-[16px] h-[16px] mt-1' />
                                                    </button>
                                                </td>
                                                <td className="px-4 qms-list-compliance-data text-center">
                                                    <button onClick={() => handleEditManagementChange(item.id)}>
                                                        <img src={edits} alt="Edit icon" className='w-[16px] h-[16px]' />
                                                    </button>
                                                </td>
                                                <td className="px-4 qms-list-compliance-data text-center">
                                                    <button onClick={() => handleDelete(item.id)}>
                                                        <img src={deletes} alt="Delete icon" className='w-[16px] h-[16px]' />
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    ) : (
                                        <tr>
                                            <td colSpan="8" className="text-center py-4">No management changes found</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    )}

                    {!isLoading && !error && (
                        <div className="px-4 pt-3 flex items-center justify-between">
                            <div className="text-white total-text">
                                Total-{filteredData.length}
                            </div>
                            <div className="flex items-center gap-5">
                                <button
                                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                    disabled={currentPage === 1}
                                    className={`cursor-pointer swipe-text ${currentPage === 1 ? 'opacity-50' : ''}`}
                                >
                                    Previous
                                </button>

                                {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                    const pageNum = i + 1;
                                    return (
                                        <button
                                            key={pageNum}
                                            onClick={() => setCurrentPage(pageNum)}
                                            className={`${currentPage === pageNum ? 'pagin-active' : 'pagin-inactive'}`}
                                        >
                                            {pageNum}
                                        </button>
                                    );
                                })}

                                <button
                                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                    disabled={currentPage === totalPages || totalPages === 0}
                                    className={`cursor-pointer swipe-text ${currentPage === totalPages || totalPages === 0 ? 'opacity-50' : ''}`}
                                >
                                    Next
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default QmsListManagementChange;