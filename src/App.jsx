import React, { useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./index.css";
import { ThemeProvider, useTheme } from "./ThemeContext";
import AdminLogin from "./pages/AdminLogin/AdminLogin";
import Password from "./pages/ForgotPassword/Password";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";
import Companies from "./pages/Companies/Companies";
import AddCompany from "./pages/AddCompany/AddCompany";
import ViewCompany from "./pages/ViewCompany/ViewCompany";
import EditCompany from "./pages/EditCompany/EditCompany";
import AddSubscriber from "./pages/Subscribers/AddSubscriber/AddSubscriber";
import ManageSubscriber from "./pages/Subscribers/ManageSubscriber/ManageSubscriber";
import ChangeSubscription from "./pages/Subscribers/ChangeSubscription/ChangeSubscription";
import AddSubscriptionPlan from "./pages/Subscriptions/AddSubscriptionPlan/AddSubscriptionPlan";
import ManageSubscription from "./pages/Subscriptions/ManageSubscription/ManageSubscription";
import EditSubscription from "./pages/Subscriptions/EditSubscription.jsx/EditSubscription";
import ChangePassword from "./pages/ChangePassowrd/ChangePassword";
import CompanyLogin from "./pages/CompanyLogin/CompanyLogin";
import CompanyLayout from "./pages/CompanyLayout";
import CompanyDashboard from "./pages/Company Dashboard/CompanyDashboard";
import CompanyBackup from "./pages/Company Backup/CompanyBackup";
import QmsPolicy from "./pages/QMS/Documentation/Policy/QmsPolicy";
import QmsManual from "./pages/QMS/Documentation/Manual/QmsManual";
import QmsProcedure from "./pages/QMS/Documentation/Procedure/QmsProcedure";
import QmsRecordFormat from "./pages/QMS/Documentation/Record Format/QmsRecordFormat";
import DraftQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/DraftQmsInterestedParties";
import EditDraftQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/EditDraftQmsInterestedParties";
import QmsProcesses from "./pages/QMS/Documentation/Processes/QmsProcesses";
import QmsScopeStatements from "./pages/QMS/Documentation/Scope Statements/QmsScopeStatements";
import EmsPolicy from "./pages/EMS/Documentation/Policy/EmsPolicy";
import AddQmsPolicy from "./pages/QMS/Documentation/Policy/AddQmsPolicy";
import AddQmsManual from "./pages/QMS/Documentation/Manual/AddQmsManual";
import AddQmsProcedure from "./pages/QMS/Documentation/Procedure/AddQmsProcedure";
import AddQmsRecordFormat from "./pages/QMS/Documentation/Record Format/AddQmsRecordFormat";
import AddEmspolicy from "./pages/EMS/Documentation/Policy/AddEmspolicy";
import EmsManual from "./pages/EMS/Documentation/Manual/EmsManual";
import AddEmsManual from "./pages/EMS/Documentation/Manual/AddEmsManual";
import EmsProcedure from "./pages/EMS/Documentation/Procedure/EmsProcedure";
import AddEmsProcedure from "./pages/EMS/Documentation/Procedure/AddEmsProcedure";
import EmsRecordFormat from "./pages/EMS/Documentation/Record Format/EmsRecordFormat";
import AddEmsRecordFormat from "./pages/EMS/Documentation/Record Format/AddEmsRecordFormat";
import OhsPolicy from "./pages/OHS/Documentation/Policy/OhsPolicy";
import AddOhsPolicy from "./pages/OHS/Documentation/Policy/AddOhsPolicy";
import OhsManual from "./pages/OHS/Documentation/Manual/OhsManual";
import AddOhsManual from "./pages/OHS/Documentation/Manual/AddOhsManual";
import OhsProcedure from "./pages/OHS/Documentation/Procedure/OhsProcedure";
import AddOhsProcedure from "./pages/OHS/Documentation/Procedure/AddOhsProcedure";
import OhsRecordFormat from "./pages/OHS/Documentation/Record Format/OhsRecordFormat";
import AddOhsRecordFormat from "./pages/OHS/Documentation/Record Format/AddOhsRecordFormat";
import EnMSPolicy from "./pages/EnMS/Documentation/Policy/EnMSPolicy";
import AddEnMSPolicy from "./pages/EnMS/Documentation/Policy/AddEnMSPolicy";
import EnMSManual from "./pages/EnMS/Documentation/Manual/EnMSManual";
import AddEnMSManual from "./pages/EnMS/Documentation/Manual/AddEnMSManual";
import EnMSProcedure from "./pages/EnMS/Documentation/Procedure/EnMSProcedure";
import AddEnMSProcedure from "./pages/EnMS/Documentation/Procedure/AddEnMSProcedure";
import EnMSRecordFormat from "./pages/EnMS/Documentation/Record Format/EnMSRecordFormat";
import AddEnMSRecordFormat from "./pages/EnMS/Documentation/Record Format/AddEnMSRecordFormat";
import BMSPolicy from "./pages/BMS/Documentation/Policy/BMSPolicy";
import AddBMSPolicy from "./pages/BMS/Documentation/Policy/AddBMSPolicy";
import BmsManual from "./pages/BMS/Documentation/Manual/BmsManual";
import AddBmsManual from "./pages/BMS/Documentation/Manual/AddBmsManual";
import BmsProcedure from "./pages/BMS/Documentation/Procedure/BmsProcedure";
import AddBmsProcedure from "./pages/BMS/Documentation/Procedure/AddBmsProcedure";
import BmsRecordFormat from "./pages/BMS/Documentation/Record Format/BmsRecordFormat";
import AddBmsRecordFormat from "./pages/BMS/Documentation/Record Format/AddBmsRecordFormat";
import AMSPolicy from "./pages/AMS/Documentation/Policy/AMSPolicy";
import AddAMSPolicy from "./pages/AMS/Documentation/Policy/AddAMSPolicy";
import AmsManual from "./pages/AMS/Documentation/Manual/AmsManual";
import AddAmsManual from "./pages/AMS/Documentation/Manual/AddAmsManual";
import AmsProcedure from "./pages/AMS/Documentation/Procedure/AmsProcedure";
import AddAmsProcedure from "./pages/AMS/Documentation/Procedure/AddAmsProcedure";
import AmsRecordFormat from "./pages/AMS/Documentation/Record Format/AmsRecordFormat";
import AddAmsRecordFormat from "./pages/AMS/Documentation/Record Format/AddAmsRecordFormat";
import QMSAddUser from "./pages/QMS/UserManagement/AddUser/QMSAddUser";
import QMSListUser from "./pages/QMS/UserManagement/ListUser/QMSListUser";
import EMSAddUser from "./pages/EMS/UserManagement/AddUser/EMSAddUser";
import EMSListUser from "./pages/EMS/UserManagement/ListUser/EMSListUser";
import OHSAddUser from "./pages/OHS/UserManagement/AddUser/OHSAddUser"
import OHSListUser from "./pages/OHS/UserManagement/ListUser/OHSListUser";
import EnMSAddUser from "./pages/EnMS/UserManagement/AddUser/EnMSAddUser"
import EnMSListUser from "./pages/EnMS/UserManagement/ListUser/EnMSListUser";
import BMSAddUser from "./pages/BMS/UserManagement/AddUser/BMSAddUser";
import BMSListUser from "./pages/BMS/UserManagement/ListUser/BMSListUser";
import AMSAddUser from "./pages/AMS/UserManagement/AddUser/AMSAddUser";
import AMSListUser from "./pages/AMS/UserManagement/ListUser/AMSListUser";
import EditQmsPolicy from "./pages/QMS/Documentation/Policy/EditQmsPolicy";
import ViewQmsManual from "./pages/QMS/Documentation/Manual/ViewQmsManual";
import EditQmsmanual from "./pages/QMS/Documentation/Manual/EditQmsmanual";
import ViewAllNotifications from "./components/Company_Navbar/ViewAllNotifications";
import DraftQmsManual from "./pages/QMS/Documentation/Manual/DraftQmsManual";
import EditDraftQmsManual from "./pages/QMS/Documentation/Manual/EditDraftQmsManual";
import QMSEditUser from "./pages/QMS/UserManagement/EditUser/QMSEditUser";
import AddQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/AddQmsInterestedParties";
// import EditQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/EditQmsInterestedParties";
// import ViewQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/ViewQmsInterestedParties";
import QmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/QmsInterestedParties";
import EditQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/EditQmsInterestedParties";
import ViewQmsInterestedParties from "./pages/QMS/Documentation/InterestedParties/ViewQmsInterestedParties";
import AddQmsProcesses from "./pages/QMS/Documentation/Processes/AddQmsProcesses";
import ViewQmsProcesses from "./pages/QMS/Documentation/Processes/ViewQmsProcesses";
import EditQmsProcesses from "./pages/QMS/Documentation/Processes/EditQmsProcesses";
import DraftQmsProcesses from "./pages/QMS/Documentation/Processes/DraftQmsProcesses";
import EditQmsDraftProcesses from "./pages/QMS/Documentation/Processes/EditQmsDraftProcesses";
import QmsAddCompliance from "./pages/QMS/Compliance/Compliance/QmsAddCompliance";
import QmsListCompliance from "./pages/QMS/Compliance/Compliance/QmsListCompliance";
import QmsEditCompliance from "./pages/QMS/Compliance/Compliance/QmsEditCompliance";
import QmsDraftCompliance from "./pages/QMS/Compliance/Compliance/QmsDraftCompliance";
import QmsViewCompliance from "./pages/QMS/Compliance/Compliance/QmsViewCompliance";
import QmsEditDraftCompliance from "./pages/QMS/Compliance/Compliance/QmsEditDraftCompliance";
import QmsDraftViewCompliance from "./pages/QMS/Compliance/Compliance/QmsDraftViewCompliance";
import QmsListLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsListLegalRequirements";
import QmsAddLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsAddLegalRequirements";
import QmsEditLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsEditLegalRequirements";
import QmsViewLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsViewLegalRequirements";
import QmsDraftLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsDraftLegalRequirements";
import QmsDraftViewLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsDraftViewLegalRequirements";
import QmsDraftEditLegalRequirements from "./pages/QMS/Compliance/LegalAndOtherRequirements/QmsDraftEditLegalRequirements";
import QmsListEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsListEvaluationCompliance";
import QmsAddEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsAddEvaluationCompliance";
import QmsEditEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsEditEvaluationCompliance";
import QmsViewEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsViewEvaluationCompliance";
import QmsDraftEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsDraftEvaluationCompliance";
import QmsViewDraftEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsViewDraftEvaluationCompliance";
import QmsEditDraftEvaluationCompliance from "./pages/QMS/Compliance/EvaluationOfCompliance/QmsEditDraftEvaluationCompliance";
import QmsListManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsListManagementChange";
import QmsAddmanagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsAddmanagementChange";
import QmsEditManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsEditManagementChange";
import QmsViewManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsViewManagementChange";
import QmsDraftManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsDraftManagementChange";
import QmsEditDraftManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsEditDraftManagementChange";
import QmsViewDraftManagementChange from "./pages/QMS/Compliance/ManagementOfChange/QmsViewDraftManagementChange";

const ThemedApp = () => {
  const { theme } = useTheme();

  // Apply the theme class to the body
  useEffect(() => {
    document.body.className = theme;
  }, [theme]);

  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/">
          <Route index element={<AdminLogin />} />
          <Route path="forgotpassword" element={<Password />} />
          <Route path="changepassword" element={<ChangePassword />} />
        </Route>


        <Route path="/company-login">
          <Route index element={<CompanyLogin />} />
        </Route>

        <Route path="/company" element={<CompanyLayout />}>
          <Route path="dashboard" element={<CompanyDashboard />} />

          {/* QMS Documentation */}
          <Route path="qms/policy" element={<QmsPolicy />} />
          <Route path="qms/addpolicy" element={<AddQmsPolicy />} />
          <Route path="qms/editpolicy/:id" element={<EditQmsPolicy />} />

          <Route path="qms/manual" element={<QmsManual />} />
          <Route path="qms/addmanual" element={<AddQmsManual />} />
          <Route path="qms/viewmanual/:id" element={<ViewQmsManual />} />
          <Route path="qms/editmanual/:id" element={<EditQmsmanual />} />
          <Route path="qms/draftmanual" element={<DraftQmsManual />} />
          <Route path="notifications" element={<ViewAllNotifications />} />
          <Route path="qms/editdraftmanual/:id" element={<EditDraftQmsManual />} />


          <Route path="qms/procedure" element={<QmsProcedure />} />
          <Route path="qms/addprocedure" element={<AddQmsProcedure />} />

          <Route path="qms/record-format" element={<QmsRecordFormat />} />
          <Route path="qms/addrecordformat" element={<AddQmsRecordFormat />} />

          <Route path="qms/interested-parties" element={<QmsInterestedParties />} />
          <Route path="qms/add-interested-parties" element={<AddQmsInterestedParties />} />
          <Route path="qms/edit-interested-parties/:id" element={<EditQmsInterestedParties />} />
          <Route path="qms/view-interested-parties/:id" element={<ViewQmsInterestedParties />} />



          <Route path="qms/processes" element={<QmsProcesses />} />
          <Route path="qms/add-processes" element={<AddQmsProcesses />} />
          <Route path="qms/view-processes" element={<ViewQmsProcesses />} />
          <Route path="qms/edit-processes" element={<EditQmsProcesses />} />
          <Route path="qms/draft-processes" element={<DraftQmsProcesses />} />
          <Route path="qms/edit-draft-processes/:id" element={<EditQmsDraftProcesses />} />
          <Route path="qms/processes" element={<QmsProcesses />} />
          <Route path="qms/scope-statements" element={<QmsScopeStatements />} />


          <Route path="qms/list-compliance" element={<QmsListCompliance />} />
          <Route path="qms/add-compliance" element={<QmsAddCompliance />} />
          <Route path="qms/edit-compliance/:id" element={<QmsEditCompliance />} />
          <Route path="qms/draft-compliance" element={<QmsDraftCompliance />} />
          <Route path="qms/view-compliance/:id" element={<QmsViewCompliance />} />
          <Route path="qms/edit-draft-compliance/:id" element={<QmsEditDraftCompliance />} />
          <Route path="qms/view-draft-compliance/:id" element={<QmsDraftViewCompliance />} />

          <Route path="qms/list-legal-requirements" element={<QmsListLegalRequirements/>} />
           <Route path="qms/add-legal-requirements" element={<QmsAddLegalRequirements/>} />
           <Route path="qms/edit-legal-requirements/:id" element={<QmsEditLegalRequirements/>} />
           <Route path="qms/view-legal-requirements/:id" element={<QmsViewLegalRequirements/>} />
           <Route path="qms/draft-legal-requirements" element={<QmsDraftLegalRequirements/>} />
           <Route path="qms/view-draft-legal-requirements/:id" element={<QmsDraftViewLegalRequirements/>} />
           <Route path="qms/edit-draft-legal-requirements/:id" element={<QmsDraftEditLegalRequirements/>} />


          <Route path="qms/list-evaluation-compliance" element={<QmsListEvaluationCompliance />} />
          <Route path="qms/add-evaluation-compliance" element={<QmsAddEvaluationCompliance />} />
          <Route path="qms/edit-evaluation-compliance" element={<QmsEditEvaluationCompliance />} />
          <Route path="qms/view-evaluation-compliance" element={<QmsViewEvaluationCompliance />} />
          <Route path="qms/draft-evaluation-compliance" element={<QmsDraftEvaluationCompliance />} />
          <Route path="qms/edit-draft-evaluation-compliance" element={<QmsEditDraftEvaluationCompliance />} />
          <Route path="qms/view-draft-evaluation-compliance" element={<QmsViewDraftEvaluationCompliance />} />



          <Route path="qms/list-management-change" element={<QmsListManagementChange />} />
          <Route path="qms/add-management-change" element={<QmsAddmanagementChange />} />
          <Route path="qms/edit-management-change/:id" element={<QmsEditManagementChange />} />
          <Route path="qms/view-management-change/:id" element={<QmsViewManagementChange />} />
          <Route path="qms/draft-management-change" element={<QmsDraftManagementChange />} />
          <Route path="qms/edit-draft-management-change/:id" element={<QmsEditDraftManagementChange />} />
          <Route path="qms/view-draft-management-change/:id" element={<QmsViewDraftManagementChange />} />

          {/* QMS User Management */}
          <Route path="qms/adduser" element={<QMSAddUser />} />
          <Route path="qms/listuser" element={<QMSListUser />} />





          {/* EMS Documentation */}
          <Route path="ems/policy" element={<EmsPolicy />} />
          <Route path="ems/addpolicy" element={<AddEmspolicy />} />

          <Route path="ems/manual" element={<EmsManual />} />
          <Route path="ems/addmanual" element={<AddEmsManual />} />

          <Route path="ems/procedure" element={<EmsProcedure />} />
          <Route path="ems/addprocedure" element={<AddEmsProcedure />} />

          <Route path="ems/record-format" element={<EmsRecordFormat />} />
          <Route path="ems/addrecordformat" element={<AddEmsRecordFormat />} />


          {/* EMS User Management */}
          <Route path="ems/adduser" element={<EMSAddUser />} />
          <Route path="ems/listuser" element={<EMSListUser />} />




          {/* OHS Documentation */}
          <Route path="ohs/policy" element={<OhsPolicy />} />
          <Route path="ohs/addpolicy" element={<AddOhsPolicy />} />

          <Route path="ohs/manual" element={<OhsManual />} />
          <Route path="ohs/addmanual" element={<AddOhsManual />} />

          <Route path="ohs/procedure" element={<OhsProcedure />} />
          <Route path="ohs/addprocedure" element={<AddOhsProcedure />} />

          <Route path="ohs/record-format" element={<OhsRecordFormat />} />
          <Route path="ohs/addrecordformat" element={<AddOhsRecordFormat />} />


          {/* OHS User Management */}
          <Route path="ohs/adduser" element={<OHSAddUser />} />
          <Route path="ohs/listuser" element={<OHSListUser />} />
          <Route path="qms/draft-interested-parties" element={<DraftQmsInterestedParties />} />
          <Route path="qms/edit-draft-interested-parties/:id" element={<EditDraftQmsInterestedParties />} />
          <Route path="qms/view-interested-parties/:id" element={<ViewQmsInterestedParties />} />


          {/* EnMS Documentation */}
          <Route path="enms/policy" element={<EnMSPolicy />} />
          <Route path="enms/addpolicy" element={<AddEnMSPolicy />} />

          <Route path="enms/manual" element={<EnMSManual />} />
          <Route path="enms/addmanual" element={<AddEnMSManual />} />

          <Route path="enms/procedure" element={<EnMSProcedure />} />
          <Route path="enms/addprocedure" element={<AddEnMSProcedure />} />

          <Route path="enms/record-format" element={<EnMSRecordFormat />} />
          <Route path="enms/addrecordformat" element={<AddEnMSRecordFormat />} />


          {/* EnMS User Management */}
          <Route path="enms/adduser" element={<EnMSAddUser />} />
          <Route path="enms/listuser" element={<EnMSListUser />} />
          <Route path="qms/edituser/:id" element={<QMSEditUser />} />



          {/* BMS Documentation */}
          <Route path="bms/policy" element={<BMSPolicy />} />
          <Route path="bms/addpolicy" element={<AddBMSPolicy />} />

          <Route path="bms/manual" element={<BmsManual />} />
          <Route path="bms/addmanual" element={<AddBmsManual />} />

          <Route path="bms/procedure" element={<BmsProcedure />} />
          <Route path="bms/addprocedure" element={<AddBmsProcedure />} />

          <Route path="bms/record-format" element={<BmsRecordFormat />} />
          <Route path="bms/addrecordformat" element={<AddBmsRecordFormat />} />


          {/* BMS User Management */}
          <Route path="bms/adduser" element={<BMSAddUser />} />
          <Route path="bms/listuser" element={<BMSListUser />} />

          <Route path="qms/processes" element={<QmsProcesses />} />
          <Route path="qms/draft-processes" element={<DraftQmsProcesses />} />
          <Route path="qms/add-processes" element={<AddQmsProcesses />} />
          <Route path="qms/view-processes/:id" element={<ViewQmsProcesses />} />
          <Route path="qms/edit-processes/:id" element={<EditQmsProcesses />} />

          <Route path="qms/edit-draft-processes/:id" element={<EditQmsDraftProcesses />} />



          {/* AMS Documentation */}
          <Route path="ams/policy" element={<AMSPolicy />} />
          <Route path="ams/addpolicy" element={<AddAMSPolicy />} />

          <Route path="ams/manual" element={<AmsManual />} />
          <Route path="ams/addmanual" element={<AddAmsManual />} />

          <Route path="ams/procedure" element={<AmsProcedure />} />
          <Route path="ams/addprocedure" element={<AddAmsProcedure />} />

          <Route path="ams/record-format" element={<AmsRecordFormat />} />
          <Route path="ams/addrecordformat" element={<AddAmsRecordFormat />} />


          {/* AMS User Management */}
          <Route path="ams/adduser" element={<AMSAddUser />} />
          <Route path="ams/listuser" element={<AMSListUser />} />






          <Route path="backup" element={<CompanyBackup />} />
        </Route>

        {/* Admin Routes with Layout */}
        <Route path="/admin" element={<Layout />}>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="companies" element={<Companies />} />

          <Route path="add-subscriber" element={<AddSubscriber />} />
          <Route path="manage-subscriber" element={<ManageSubscriber />} />
          <Route path="change-subscriber/:id" element={<ChangeSubscription />} />

          <Route path="add-subscription-plan" element={<AddSubscriptionPlan />} />
          <Route path="manage-subscription" element={<ManageSubscription />} />
          <Route path="edit-subscription/:id" element={<EditSubscription />} />

          <Route path="qms/interested-parties" element={<QmsInterestedParties />} />
          <Route path="qms/add-interested-parties" element={<AddQmsInterestedParties />} />
          <Route path="qms/edit-interested-parties" element={<EditQmsInterestedParties />} />
          <Route path="qms/view-interested-parties" element={<ViewQmsInterestedParties />} />




          <Route path="addcompany" element={<AddCompany />} />
          <Route path="viewcompany/:companyId" element={<ViewCompany />} />
          <Route path="editcompany/:companyId" element={<EditCompany />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

const App = () => (
  <ThemeProvider>
    <ThemedApp />
  </ThemeProvider>
);

export default App;
