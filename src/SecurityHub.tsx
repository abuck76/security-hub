import { useState } from 'react';
import { Search, X, Users, Shield, Plus, Trash2, Check } from 'lucide-react';

const securityGroups = [
  { id: 1, name: 'Admin', description: 'Full system access', userCount: 2, properties: 'All', lastModified: '2024-01-15' },
  { id: 2, name: 'Property Manager', description: 'Manage assigned properties', userCount: 5, properties: '12', lastModified: '2024-01-10' },
  { id: 3, name: 'Accountant', description: 'Financial operations', userCount: 3, properties: '8', lastModified: '2024-01-08' },
  { id: 4, name: 'Maintenance', description: 'Work order management', userCount: 8, properties: '15', lastModified: '2024-01-12' },
  { id: 5, name: 'Leasing Agent', description: 'Tenant applications & leases', userCount: 4, properties: '6', lastModified: '2024-01-14' },
  { id: 6, name: 'View Only', description: 'Read-only access', userCount: 2, properties: '3', lastModified: '2024-01-05' },
];

const users = [
  { id: 1, name: 'Sarah Chen', email: 'schen@company.com', group: 'Admin', properties: 'All', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Mike Johnson', email: 'mjohnson@company.com', group: 'Property Manager', properties: '5', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Emily Davis', email: 'edavis@company.com', group: 'Accountant', properties: '8', status: 'Active', lastLogin: '2024-01-15' },
  { id: 4, name: 'James Wilson', email: 'jwilson@company.com', group: 'Maintenance', properties: '10', status: 'Active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Lisa Anderson', email: 'landerson@company.com', group: 'Property Manager', properties: '3', status: 'Inactive', lastLogin: '2024-01-01' },
  { id: 6, name: 'Robert Brown', email: 'rbrown@company.com', group: 'Leasing Agent', properties: '4', status: 'Active', lastLogin: '2024-01-15' },
  { id: 7, name: 'Amanda White', email: 'awhite@company.com', group: 'Admin', properties: 'All', status: 'Active', lastLogin: '2024-01-14' },
  { id: 8, name: 'David Lee', email: 'dlee@company.com', group: 'View Only', properties: '2', status: 'Active', lastLogin: '2024-01-10' },
];

const roles = [
  { id: 1, name: 'AR Manager', enabled: true },
  { id: 2, name: 'AR Manager - Payments', enabled: false },
  { id: 3, name: 'AR Manager - Payments Admin', enabled: false },
  { id: 4, name: 'CRM IQ', enabled: true },
  { id: 5, name: 'Procure to Pay v2', enabled: false },
  { id: 6, name: 'System Administration', enabled: true },
  { id: 7, name: 'Voyager 8 Residential', enabled: true },
  { id: 8, name: 'Voyager 8 Residential - Leasing', enabled: false },
];

const permissionsData = [
  { id: 1, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: null },
  { id: 2, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Add Attachment', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 3, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Adjust Bank Reconciliation Button', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 4, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Bank Reconciliation Upload', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 5, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Delete Attachment', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 6, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Post Bank Reconciliation Button', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 7, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Reconciliation Report', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1 },
  { id: 8, description: 'Analytics Dashboard', access: 'Access', programType: 'Analytics', isNew: true, parentId: null },
  { id: 9, description: 'Campaign Manager', access: 'Access', programType: 'Marketing', isNew: false, parentId: null },
  { id: 10, description: 'Data Export', access: 'No Access', programType: 'Core', isNew: false, parentId: null },
  { id: 11, description: 'Resident Portal>Messages', access: 'Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: null },
  { id: 12, description: 'Resident Portal>Payments', access: 'Access', programType: 'Core', isNew: true, parentId: null },
];

const accountsData = {
  access: [
    { code: '00100000', name: 'ASSETS' },
    { code: '00300000', name: 'CASH' },
    { code: '10000000', name: 'Cash - Operating' },
    { code: '10010000', name: 'Cash - Operating 1' },
    { code: '10020000', name: 'Cash - Operating 2' },
    { code: '10030000', name: 'Cash - Maintenance Reserve' },
    { code: '10040000', name: 'Cash - Corporate Operating' },
    { code: '10040100', name: 'Cash - Corporate Payroll' },
    { code: '10050000', name: 'Cash - Security Deposits' },
    { code: '10060000', name: 'Cash - Escrow' },
    { code: '10070000', name: "Cash - Owner's Account" },
  ],
  noAccess: [
    { code: '10091000', name: 'Cash - Rent Collection Account' },
    { code: '10092000', name: 'Cash - Cash Management Account (CMA)' },
    { code: '10100000', name: 'Restricted Cash - Taxes' },
    { code: '20000000', name: 'Accounts Receivable' },
  ],
};

const accountTreesData = {
  access: [
    { code: '4d_bs', name: 'Historical 4 Digit Balance Sheet' },
    { code: '4d_is', name: 'Historical 4d Tree' },
    { code: 'blr_bs', name: 'BS for Blackrock' },
    { code: 'corp_bs', name: 'YSI Standard Balance Sheet' },
    { code: 'gw_bs', name: 'GW Balance Sheet' },
    { code: 'gw_cf', name: 'GW CASH FLOW' },
  ],
  noAccess: [
    { code: 'owner_bs', name: 'Owner Balance Sheet' },
    { code: 'std_tb', name: 'Standard Trial Balance' },
  ],
};

const chargeCodesData = {
  access: [
    { code: 'a59-clr', name: '50059 HAP Overpayment' },
    { code: 'a59-rent', name: '50059 Hap Rent' },
    { code: 'admin', name: 'Administration Fee' },
    { code: 'amenity', name: 'Amenity Fees' },
    { code: 'bd-coll', name: 'Bad Debt - Collections' },
  ],
  noAccess: [
    { code: '4-rent', name: 'DO NOT USE - Bad Rent Code' },
    { code: 'rc-amex', name: 'RAM Corp - AMEX reimb' },
  ],
};

const displayTypesData = {
  Charge: [
    { name: 'Condo - Condo Domestic', restricted: false },
    { name: 'Standard - Standard Charge Display Type', restricted: false },
  ],
  Payable: [
    { name: 'Standard - Standard Payable Display Type', restricted: false },
    { name: 'JobCost - JobCost Payable Display Type', restricted: false },
  ],
  Receipt: [
    { name: 'Standard - Standard Receipt Display Type', restricted: false },
    { name: 'Cash - Cash Receipt Display Type', restricted: false },
  ],
  Journal: [
    { name: 'Standard - Standard Journal Display Type', restricted: false },
    { name: 'Adjusting - Adjusting Journal Display Type', restricted: false },
  ],
  PO: [
    { name: 'Standard - Standard PO Display Type', restricted: false },
    { name: 'Blanket - Blanket PO Display Type', restricted: false },
  ],
  'Service Contract': [
    { name: 'Standard - Standard Service Contract Display Type', restricted: false },
    { name: 'Maintenance - Maintenance Service Contract', restricted: false },
  ],
};

export default function SecurityHub() {
  const [activeTab, setActiveTab] = useState('groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [drawer, setDrawer] = useState({ open: false, type: null, data: null });
  const [drawerTab, setDrawerTab] = useState('users');
  const [userDrawerTab, setUserDrawerTab] = useState('details');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [accountCodeFilter, setAccountCodeFilter] = useState('');
  const [accountDescFilter, setAccountDescFilter] = useState('');
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedNoAccess, setSelectedNoAccess] = useState([]);
  const [chargeCodeFilter, setChargeCodeFilter] = useState('');
  const [chargeCodeDescFilter, setChargeCodeDescFilter] = useState('');
  const [selectedChargeAccess, setSelectedChargeAccess] = useState([]);
  const [selectedChargeNoAccess, setSelectedChargeNoAccess] = useState([]);
  const [accountTreeCodeFilter, setAccountTreeCodeFilter] = useState('');
  const [accountTreeDescFilter, setAccountTreeDescFilter] = useState('');
  const [selectedTreeAccess, setSelectedTreeAccess] = useState([]);
  const [selectedTreeNoAccess, setSelectedTreeNoAccess] = useState([]);
  const [displayTypeCategory, setDisplayTypeCategory] = useState('All');
  const [displayTypeSearch, setDisplayTypeSearch] = useState('');
  const [permProgramType, setPermProgramType] = useState('All');
  const [permAccessFilter, setPermAccessFilter] = useState('All');
  const [permSearch, setPermSearch] = useState('');
  const [permNewOnly, setPermNewOnly] = useState(false);
  const [permBulkAction, setPermBulkAction] = useState('');
  const [permissionsList, setPermissionsList] = useState(permissionsData);
  const [rolesList, setRolesList] = useState(roles);
  const [rolesSearch, setRolesSearch] = useState('');
  const [booksList, setBooksList] = useState([
    { id: 1, name: 'All', enabled: true },
    { id: 2, name: 'Cash', enabled: true },
    { id: 3, name: 'Accrual', enabled: true },
    { id: 4, name: 'Elim', enabled: false },
    { id: 5, name: 'Adjust', enabled: false },
    { id: 6, name: 'History', enabled: true },
    { id: 7, name: 'TAX', enabled: false },
    { id: 8, name: 'GAAP', enabled: true },
  ]);
  const [reportType, setReportType] = useState('Standard Reports');
  const [reportSearch, setReportSearch] = useState('');
  const [selectedReports, setSelectedReports] = useState({});

  const [propertySearch, setPropertySearch] = useState('');

  const reportsData = {
    'Standard Reports': ['Financial Summary', 'Occupancy Report', 'Rent Roll', 'Aging Report', 'Maintenance Log', 'Budget Variance', 'Cash Flow Statement'],
    'YSR Reports': ['AR Aging Summary Report (AgingSum)', 'Resident Rent Bill (NYRentBill)', 'Residential Unit Availability (ResUnitAvlbl)'],
    'SQL Reports': [
      { name: '__CO Renewal Lease Doc - Working Title', fileName: 'rs_sql_BPCO_Renewal_LEASE.txt' },
      { name: '_Billingsley_Application_agreement_71218', fileName: 'rs_sql_Billingsley_Application_Combined.txt' },
      { name: '_CAS Parking Addenda One-Off', fileName: 'rs_sql_CAS_Parking_Addenda_OneOff.txt' },
      { name: '_Daley and Garfield', fileName: 'rs_sql_LeaseAgreement_Combined.txt' },
      { name: '_First Pacific Group', fileName: 'rs_sql_First_Pacific_Group_Lease.txt' },
    ],
  };

  const filteredPermissions = permissionsList.filter(p => {
    const matchesType = permProgramType === 'All' || p.programType === permProgramType;
    const matchesAccess = permAccessFilter === 'All' || p.access === permAccessFilter;
    const matchesSearch = p.description.toLowerCase().includes(permSearch.toLowerCase());
    const matchesNew = !permNewOnly || p.isNew;
    return matchesType && matchesAccess && matchesSearch && matchesNew;
  });

  const programTypes = [...new Set(permissionsData.map(p => p.programType))];

  const filteredGroups = securityGroups.filter(g =>
    g.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    g.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredUsers = users.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGroup = filterGroup === 'All' || u.group === filterGroup;
    const matchesStatus = filterStatus === 'All' || u.status === filterStatus;
    return matchesSearch && matchesGroup && matchesStatus;
  });

  const groupUsers = drawer.data ? users.filter(u => {
    const groups = Array.isArray(drawer.data) ? drawer.data : [drawer.data];
    return groups.some(g => g.name === u.group);
  }) : [];

  const isMultiGroup = drawer.data && Array.isArray(drawer.data) && drawer.data.length > 1;
  const isMultiUser = drawer.type === 'user' && drawer.data && Array.isArray(drawer.data) && drawer.data.length > 1;
  const drawerGroups = drawer.data ? (Array.isArray(drawer.data) ? drawer.data : [drawer.data]) : [];
  const drawerUsers = drawer.type === 'user' && drawer.data ? (Array.isArray(drawer.data) ? drawer.data : [drawer.data]) : [];
  const totalUsersInDrawer = drawerGroups.reduce((sum, g) => sum + g.userCount, 0);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div>
            <h1 className="text-2xl font-semibold text-gray-900">Security Hub</h1>
            <p className="text-sm text-gray-500">Manage security groups and user access</p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b px-6">
        <div className="flex gap-1">
          <button onClick={() => { setActiveTab('groups'); setSearchTerm(''); }} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" />Security Groups</div>
          </button>
          <button onClick={() => { setActiveTab('users'); setSearchTerm(''); }} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" />Users</div>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-white border-b">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder={activeTab === 'groups' ? 'Search security groups...' : 'Search users...'} value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
          </div>
          {activeTab === 'users' && (
            <>
              <select value={filterGroup} onChange={(e) => setFilterGroup(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="All">All Groups</option>
                {securityGroups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
              <select value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option value="All">All Statuses</option>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2">
            <Plus className="w-4 h-4" />{activeTab === 'groups' ? 'Add Group' : 'Add User'}
          </button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'groups' ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            {selectedGroups.length > 0 && (
              <div className="px-4 py-3 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">{selectedGroups.length} group{selectedGroups.length > 1 ? 's' : ''} selected</span>
                <div className="flex gap-2">
                  <button onClick={() => { const selectedGroupData = securityGroups.filter(g => selectedGroups.includes(g.id)); setDrawer({ open: true, type: 'group', data: selectedGroupData }); setDrawerTab('users'); }} className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded">Open Drawer</button>
                  <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded">Delete</button>
                  <button onClick={() => setSelectedGroups([])} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded">Clear Selection</button>
                </div>
              </div>
            )}
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0} onChange={(e) => { if (e.target.checked) { setSelectedGroups(filteredGroups.map(g => g.id)); } else { setSelectedGroups([]); } }} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Group Name</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Description</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Users</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Properties</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Modified</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGroups.map(group => (
                  <tr key={group.id} className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedGroups.includes(group.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedGroups.includes(group.id)} onChange={(e) => { if (e.target.checked) { setSelectedGroups([...selectedGroups, group.id]); } else { setSelectedGroups(selectedGroups.filter(id => id !== group.id)); } }} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Shield className="w-4 h-4 text-blue-600" /></div>
                        <span className="font-medium text-gray-900">{group.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>{group.description}</td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}><span className="px-2 py-1 bg-gray-100 rounded-full text-xs font-medium">{group.userCount} users</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>{group.properties}</td>
                    <td className="px-4 py-3 text-sm text-gray-500" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>{group.lastModified}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            {selectedUsers.length > 0 && (
              <div className="px-4 py-3 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">{selectedUsers.length} user{selectedUsers.length > 1 ? 's' : ''} selected</span>
                <div className="flex gap-2">
                  <button 
                    onClick={() => {
                      const selectedUserData = users.filter(u => selectedUsers.includes(u.id));
                      setDrawer({ open: true, type: 'user', data: selectedUserData });
                      setUserDrawerTab('settings');
                    }}
                    className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 rounded"
                  >
                    Open Drawer
                  </button>
                  <button className="px-3 py-1.5 text-sm font-medium text-red-600 hover:bg-red-50 rounded">Delete</button>
                  <button 
                    onClick={() => setSelectedUsers([])}
                    className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded"
                  >
                    Clear Selection
                  </button>
                </div>
              </div>
            )}
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-4 py-3 w-10">
                    <input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={(e) => { if (e.target.checked) { setSelectedUsers(filteredUsers.map(u => u.id)); } else { setSelectedUsers([]); } }} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  </th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">User</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Security Group</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Properties</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Login</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map(user => (
                  <tr key={user.id} className={`hover:bg-blue-50 cursor-pointer transition-colors ${selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                      <input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={(e) => { if (e.target.checked) { setSelectedUsers([...selectedUsers, user.id]); } else { setSelectedUsers(selectedUsers.filter(id => id !== user.id)); } }} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">{user.name.split(' ').map(n => n[0]).join('')}</div>
                        <div><div className="font-medium text-gray-900">{user.name}</div><div className="text-xs text-gray-500">{user.email}</div></div>
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">{user.group}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}>{user.properties}</td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}><span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{user.status}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-500" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}>{user.lastLogin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {drawer.open && <div className="fixed inset-0 bg-black/30 z-40" onClick={() => setDrawer({ open: false, type: null, data: null })} />}

      <div className={`fixed right-0 top-0 h-full w-[800px] min-w-[800px] max-w-[800px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden ${drawer.open ? 'translate-x-0' : 'translate-x-full'}`}>
        {drawer.data && (
          <div className="h-full flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {drawer.type === 'group' ? (
                  <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Shield className="w-5 h-5 text-blue-600" /></div>
                ) : (
                  isMultiUser ? (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">{drawerUsers.length}</div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">{drawerUsers[0]?.name?.split(' ').map(n => n[0]).join('') || ''}</div>
                  )
                )}
                <div>
                  {drawer.type === 'group' ? (
                    isMultiGroup ? (
                      <><h2 className="font-semibold text-gray-900">{drawerGroups.length} Security Groups Selected</h2><p className="text-sm text-gray-500">{drawerGroups.map(g => g.name).join(', ')}</p></>
                    ) : (
                      <><h2 className="font-semibold text-gray-900">{drawerGroups[0]?.name}</h2><p className="text-sm text-gray-500">{drawerGroups[0]?.description}</p></>
                    )
                  ) : (
                    isMultiUser ? (
                      <><h2 className="font-semibold text-gray-900">{drawerUsers.length} Users Selected</h2><p className="text-sm text-gray-500">{drawerUsers.map(u => u.name).join(', ')}</p></>
                    ) : (
                      <><h2 className="font-semibold text-gray-900">{drawerUsers[0]?.name}</h2><p className="text-sm text-gray-500">{drawerUsers[0]?.email}</p></>
                    )
                  )}
                </div>
              </div>
              <button onClick={() => setDrawer({ open: false, type: null, data: null })} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            {drawer.type === 'group' ? (
              <>
                <div className="px-6 border-b">
                  <div className="flex gap-1">
                    {['users', 'roles', 'permissions', 'accounts', 'accountTrees', 'chargeCodes', 'displayTypes', 'book', 'reports'].map(tab => (
                      <button key={tab} onClick={() => setDrawerTab(tab)} className={`px-2 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${drawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                        {tab === 'chargeCodes' ? 'Charge Codes' : tab === 'accountTrees' ? 'Acct Trees' : tab === 'displayTypes' ? 'Display Types' : tab === 'book' ? 'Book' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                  {drawerTab === 'users' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">{groupUsers.length} users in {isMultiGroup ? 'these groups' : 'this group'}</span>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1"><Plus className="w-3 h-3" /> Add User</button>
                      </div>
                      {groupUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div 
                            className="flex items-center gap-3 cursor-pointer hover:opacity-80"
                            onClick={() => {
                              setDrawer({ open: true, type: 'user', data: user });
                              setUserDrawerTab('details');
                            }}
                          >
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">{user.name.split(' ').map(n => n[0]).join('')}</div>
                            <div>
                              <div className="font-medium text-sm text-blue-600 hover:underline">{user.name}</div>
                              <div className="text-xs text-gray-500">{user.email}</div>
                            </div>
                            {isMultiGroup && <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{user.group}</span>}
                          </div>
                          <button className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}

                  {drawerTab === 'roles' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing roles for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <p className="text-sm text-gray-500 mb-4">Assign roles to {isMultiGroup ? 'these security groups' : 'this security group'}.</p>
                      
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search roles..."
                          value={rolesSearch}
                          onChange={(e) => setRolesSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      {rolesList
                        .filter(role => role.name.toLowerCase().includes(rolesSearch.toLowerCase()))
                        .map(role => (
                        <label key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm">{role.name}</span>
                          <div onClick={() => setRolesList(prev => prev.map(r => r.id === role.id ? {...r, enabled: !r.enabled} : r))} className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${role.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${role.enabled ? 'translate-x-4' : ''}`} />
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {drawerTab === 'permissions' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" />Affecting <span className="font-semibold text-gray-900">{totalUsersInDrawer}</span> users across <span className="font-semibold text-gray-900">{drawerGroups.length}</span> group{drawerGroups.length > 1 ? 's' : ''}</div>
                      <div className="flex flex-wrap gap-2 items-center">
                        <select value={permProgramType} onChange={(e) => setPermProgramType(e.target.value)} className="px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="All">All Program Types</option>
                          {programTypes.map(t => <option key={t} value={t}>{t}</option>)}
                        </select>
                        <select value={permAccessFilter} onChange={(e) => setPermAccessFilter(e.target.value)} className="px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="All">All Access</option>
                          <option value="Access">Access</option>
                          <option value="No Access">No Access</option>
                        </select>
                        <div className="relative flex-1 min-w-32">
                          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" />
                          <input type="text" placeholder="Search..." value={permSearch} onChange={(e) => setPermSearch(e.target.value)} className="w-full pl-7 pr-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">Apply ({filteredPermissions.length})</button>
                      </div>
                      <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={permNewOnly} onChange={(e) => setPermNewOnly(e.target.checked)} className="w-4 h-4 rounded border-gray-300" />New Only</label>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase">Description</th>
                              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase w-28">Access</th>
                              <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 uppercase w-36">Program Type</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {filteredPermissions.map(perm => {
                              const parent = perm.parentId ? permissionsList.find(p => p.id === perm.parentId) : null;
                              const isDisabled = parent && parent.access === 'No Access';
                              const isChild = perm.parentId !== null;
                              return (
                                <tr key={perm.id} className={`${isDisabled ? 'bg-gray-50' : 'hover:bg-gray-50'}`}>
                                  <td className={`px-3 py-2 text-xs ${isDisabled ? 'text-gray-400' : 'text-gray-700'}`}>
                                    <div className={`flex items-center gap-2 ${isChild ? 'pl-6' : ''}`}>
                                      <span className="break-all">{perm.description}</span>
                                      {perm.isNew && <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded text-xs font-medium whitespace-nowrap">NEW</span>}
                                    </div>
                                  </td>
                                  <td className="px-3 py-2">
                                    <select value={isDisabled ? 'No Access' : perm.access} disabled={isDisabled} onChange={(e) => setPermissionsList(prev => prev.map(p => p.id === perm.id ? {...p, access: e.target.value} : p))} className={`w-full px-2 py-1 border rounded text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 ${isDisabled ? 'bg-gray-100 text-gray-400 cursor-not-allowed' : perm.access === 'Access' ? 'bg-white' : 'bg-gray-50'}`}>
                                      <option value="Access">Access</option>
                                      <option value="No Access">No Access</option>
                                    </select>
                                  </td>
                                  <td className={`px-3 py-2 text-xs truncate ${isDisabled ? 'text-gray-400' : 'text-gray-600'}`}>{perm.programType}</td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {drawerTab === 'accounts' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing accounts for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Account Code</label><input type="text" value={accountCodeFilter} onChange={(e) => setAccountCodeFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Account Description</label><input type="text" value={accountDescFilter} onChange={(e) => setAccountDescFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      </div>
                      <div className="flex gap-2"><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Filter</button><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Clear</button></div>
                      <div className="flex gap-2 mt-4">
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {accountsData.access.filter(a => a.code.includes(accountCodeFilter) && a.name.toLowerCase().includes(accountDescFilter.toLowerCase())).map(account => (
                              <div key={account.code} onClick={() => setSelectedAccess(prev => prev.includes(account.code) ? prev.filter(c => c !== account.code) : [...prev, account.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedAccess.includes(account.code) ? 'bg-blue-100' : ''}`}>({account.code}){account.name}</div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt; ALL</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&gt;&gt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">ALL &gt;&gt;</button>
                        </div>
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">No Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {accountsData.noAccess.filter(a => a.code.includes(accountCodeFilter) && a.name.toLowerCase().includes(accountDescFilter.toLowerCase())).map(account => (
                              <div key={account.code} onClick={() => setSelectedNoAccess(prev => prev.includes(account.code) ? prev.filter(c => c !== account.code) : [...prev, account.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedNoAccess.includes(account.code) ? 'bg-blue-100' : ''}`}>({account.code}){account.name}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {drawerTab === 'accountTrees' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing account trees for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Account Tree Code</label><input type="text" value={accountTreeCodeFilter} onChange={(e) => setAccountTreeCodeFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Account Tree Description</label><input type="text" value={accountTreeDescFilter} onChange={(e) => setAccountTreeDescFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      </div>
                      <div className="flex gap-2"><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Filter</button><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Clear</button></div>
                      <div className="flex gap-2 mt-4">
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {accountTreesData.access.filter(a => a.code.toLowerCase().includes(accountTreeCodeFilter.toLowerCase()) && a.name.toLowerCase().includes(accountTreeDescFilter.toLowerCase())).map(tree => (
                              <div key={tree.code} onClick={() => setSelectedTreeAccess(prev => prev.includes(tree.code) ? prev.filter(c => c !== tree.code) : [...prev, tree.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedTreeAccess.includes(tree.code) ? 'bg-blue-100' : ''}`}>({tree.code}){tree.name}</div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt; ALL</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&gt;&gt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">ALL &gt;&gt;</button>
                        </div>
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">No Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {accountTreesData.noAccess.filter(a => a.code.toLowerCase().includes(accountTreeCodeFilter.toLowerCase()) && a.name.toLowerCase().includes(accountTreeDescFilter.toLowerCase())).map(tree => (
                              <div key={tree.code} onClick={() => setSelectedTreeNoAccess(prev => prev.includes(tree.code) ? prev.filter(c => c !== tree.code) : [...prev, tree.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedTreeNoAccess.includes(tree.code) ? 'bg-blue-100' : ''}`}>({tree.code}){tree.name}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {drawerTab === 'chargeCodes' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing charge codes for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <div className="grid grid-cols-2 gap-3">
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Charge Code</label><input type="text" value={chargeCodeFilter} onChange={(e) => setChargeCodeFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                        <div><label className="block text-xs font-medium text-gray-600 mb-1">Charge Code Description</label><input type="text" value={chargeCodeDescFilter} onChange={(e) => setChargeCodeDescFilter(e.target.value)} className="w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                      </div>
                      <div className="flex gap-2"><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Filter</button><button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Clear</button></div>
                      <div className="flex gap-2 mt-4">
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {chargeCodesData.access.filter(a => a.code.toLowerCase().includes(chargeCodeFilter.toLowerCase()) && a.name.toLowerCase().includes(chargeCodeDescFilter.toLowerCase())).map(charge => (
                              <div key={charge.code} onClick={() => setSelectedChargeAccess(prev => prev.includes(charge.code) ? prev.filter(c => c !== charge.code) : [...prev, charge.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedChargeAccess.includes(charge.code) ? 'bg-blue-100' : ''}`}>({charge.code}){charge.name}</div>
                            ))}
                          </div>
                        </div>
                        <div className="flex flex-col justify-center gap-1">
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt; ALL</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&lt;&lt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">&gt;&gt;</button>
                          <button className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50">ALL &gt;&gt;</button>
                        </div>
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t">No Access</div>
                          <div className="border border-t-0 rounded-b h-52 overflow-auto">
                            {chargeCodesData.noAccess.filter(a => a.code.toLowerCase().includes(chargeCodeFilter.toLowerCase()) && a.name.toLowerCase().includes(chargeCodeDescFilter.toLowerCase())).map(charge => (
                              <div key={charge.code} onClick={() => setSelectedChargeNoAccess(prev => prev.includes(charge.code) ? prev.filter(c => c !== charge.code) : [...prev, charge.code])} className={`px-2 py-1 text-xs cursor-pointer hover:bg-blue-50 ${selectedChargeNoAccess.includes(charge.code) ? 'bg-blue-100' : ''}`}>({charge.code}){charge.name}</div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {drawerTab === 'displayTypes' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing display types for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <div><label className="block text-xs font-medium text-gray-600 mb-1">Display Type</label>
                        <select value={displayTypeCategory} onChange={(e) => setDisplayTypeCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                          <option value="All">All</option>
                          <option value="Charge">Charge</option>
                          <option value="Payable">Payable</option>
                          <option value="Receipt">Receipt</option>
                          <option value="Journal">Journal</option>
                          <option value="PO">PO</option>
                          <option value="Service Contract">Service Contract</option>
                        </select>
                      </div>
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search display types..." value={displayTypeSearch} onChange={(e) => setDisplayTypeSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 border-b">
                            <tr>
                              <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600">Display Type</th>
                              {displayTypeCategory === 'All' && <th className="text-left px-4 py-2 text-xs font-semibold text-gray-600 w-32">Type</th>}
                              <th className="text-center px-4 py-2 text-xs font-semibold text-gray-600 w-20">Restrict</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {(displayTypeCategory === 'All' ? Object.entries(displayTypesData).flatMap(([type, items]) => items.map(item => ({ ...item, type }))) : displayTypesData[displayTypeCategory].map(item => ({ ...item, type: displayTypeCategory }))).filter(item => item.name.toLowerCase().includes(displayTypeSearch.toLowerCase())).map((item, idx) => (
                              <tr key={`${item.type}-${item.name}`} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-2 text-sm text-gray-700">{item.name}</td>
                                {displayTypeCategory === 'All' && <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs font-medium">{item.type}</span></td>}
                                <td className="px-4 py-2 text-center"><input type="checkbox" defaultChecked={item.restricted} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {drawerTab === 'book' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing books for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <p className="text-sm text-gray-500 mb-4">Assign book access to {isMultiGroup ? 'these security groups' : 'this security group'}.</p>
                      {booksList.map(book => (
                        <label key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm">{book.name}</span>
                          <div onClick={() => {
                            if (book.name === 'All') {
                              const newEnabled = !book.enabled;
                              setBooksList(prev => prev.map(b => ({...b, enabled: newEnabled})));
                            } else {
                              setBooksList(prev => {
                                const updated = prev.map(b => b.id === book.id ? {...b, enabled: !b.enabled} : b);
                                const allOthersEnabled = updated.filter(b => b.name !== 'All').every(b => b.enabled);
                                return updated.map(b => b.name === 'All' ? {...b, enabled: allOthersEnabled} : b);
                              });
                            }
                          }} className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${book.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${book.enabled ? 'translate-x-4' : ''}`} />
                          </div>
                        </label>
                      ))}
                    </div>
                  )}

                  {drawerTab === 'reports' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing reports for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <p className="text-sm text-gray-500 mb-4">Select reports accessible to {isMultiGroup ? 'these groups' : 'this group'}.</p>
                      <select value={reportType} onChange={(e) => setReportType(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-3">
                        <option value="Standard Reports">Standard Reports</option>
                        <option value="YSR Reports">YSR Reports</option>
                        <option value="SQL Reports">SQL Reports</option>
                      </select>
                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Search reports..." value={reportSearch} onChange={(e) => setReportSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                      <div className="flex gap-2 mb-4">
                        <button onClick={() => { const reports = reportsData[reportType]; const newSelected = { ...selectedReports }; reports.forEach(r => { const key = reportType === 'SQL Reports' ? r.name : r; newSelected[`${reportType}-${key}`] = true; }); setSelectedReports(newSelected); }} className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Select All</button>
                        <button onClick={() => { const reports = reportsData[reportType]; const newSelected = { ...selectedReports }; reports.forEach(r => { const key = reportType === 'SQL Reports' ? r.name : r; newSelected[`${reportType}-${key}`] = false; }); setSelectedReports(newSelected); }} className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-50">Deselect All</button>
                      </div>
                      {reportType === 'SQL Reports' ? (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm">
                            <thead className="bg-gray-100 border-b">
                              <tr>
                                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600 w-12">Select</th>
                                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Report Name</th>
                                <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">File Name</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y">
                              {reportsData[reportType].filter(report => report.name.toLowerCase().includes(reportSearch.toLowerCase()) || report.fileName.toLowerCase().includes(reportSearch.toLowerCase())).map((report, idx) => (
                                <tr key={report.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                  <td className="px-3 py-2"><input type="checkbox" checked={selectedReports[`${reportType}-${report.name}`] || false} onChange={(e) => setSelectedReports({...selectedReports, [`${reportType}-${report.name}`]: e.target.checked})} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></td>
                                  <td className="px-3 py-2 text-sm text-gray-700">{report.name}</td>
                                  <td className="px-3 py-2 text-sm text-gray-500">{report.fileName}</td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      ) : (
                        reportsData[reportType].filter(report => report.toLowerCase().includes(reportSearch.toLowerCase())).map(report => (
                          <label key={report} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                            <input type="checkbox" checked={selectedReports[`${reportType}-${report}`] || false} onChange={(e) => setSelectedReports({...selectedReports, [`${reportType}-${report}`]: e.target.checked})} className="w-5 h-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                            <span className="text-sm">{report}</span>
                          </label>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="px-6 border-b">
                  <div className="flex gap-1">
                    {(isMultiUser ? ['settings', 'programRights'] : ['details', 'settings', 'programRights']).map(tab => (
                      <button key={tab} onClick={() => setUserDrawerTab(tab)} className={`px-3 py-3 text-sm font-medium border-b-2 transition-colors ${userDrawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                        {tab === 'programRights' ? 'Program Rights' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>

                {userDrawerTab === 'details' && !isMultiUser && drawerUsers[0] && (
                  <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Code</label>
                          <input type="text" defaultValue="ysu03784" className="col-span-2 px-2 py-1.5 border rounded text-sm bg-teal-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Lastname</label>
                          <input type="text" defaultValue={drawerUsers[0].name.split(' ')[1] || ''} className="col-span-2 px-2 py-1.5 border rounded text-sm bg-teal-100 focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Firstname</label>
                          <input type="text" defaultValue={drawerUsers[0].name.split(' ')[0] || ''} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Email</label>
                          <input type="email" defaultValue={drawerUsers[0].email} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Dear</label>
                          <input type="text" className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Address</label>
                          <input type="text" defaultValue="430 S Fairview Ave" className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">City</label>
                          <input type="text" defaultValue="Goleta" className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">State-Zip</label>
                          <div className="col-span-2 flex gap-2">
                            <select defaultValue="CA" className="px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                              <option>CA</option><option>NY</option><option>TX</option><option>FL</option>
                            </select>
                            <input type="text" defaultValue="93117" className="flex-1 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                          </div>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Country</label>
                          <select defaultValue="us" className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="us">us</option><option value="ca">ca</option><option value="uk">uk</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Phone</label>
                          <input type="text" className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Department</label>
                          <select className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value=""></option><option>Accounting</option><option>Operations</option><option>IT</option>
                          </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Title</label>
                          <select className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value=""></option><option>Manager</option><option>Director</option><option>Analyst</option>
                          </select>
                        </div>
                        <div className="flex gap-6">
                          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />Employee Only</label>
                          <label className="flex items-center gap-2 text-sm text-gray-600"><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" />Inactivate User/Employee</label>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-start">
                          <label className="text-sm text-gray-600 pt-2">Notes</label>
                          <textarea className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 h-24 resize-none"></textarea>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Security Group</label>
                          <select defaultValue={drawer.data.group} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {securityGroups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                          </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Status</label>
                          <select defaultValue={drawer.data.status} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option>Active</option><option>Inactive</option>
                          </select>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 flex items-center justify-between">
                            <span>Property Access</span>
                            <div className="relative">
                              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal-300" />
                              <input 
                                type="text" 
                                placeholder="Search..." 
                                value={propertySearch}
                                onChange={(e) => setPropertySearch(e.target.value)}
                                className="w-32 pl-7 pr-2 py-1 rounded text-xs text-gray-800 focus:outline-none focus:ring-2 focus:ring-white"
                              />
                            </div>
                          </div>
                          <div className="p-3 space-y-2 max-h-32 overflow-auto">
                            {['Sunset Apartments', 'Oak Grove Complex', 'Marina View', 'Downtown Lofts', 'Park Place', 'Riverside Commons']
                              .filter(prop => prop.toLowerCase().includes(propertySearch.toLowerCase()))
                              .map(prop => (
                              <label key={prop} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /><span className="text-sm">{prop}</span></label>
                            ))}
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2">Include in List</div>
                          <div className="p-3 space-y-2">
                            <label className="flex items-center justify-between"><span className="text-sm text-gray-600">Work Order Labor</span><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" /></label>
                            <label className="flex items-center justify-between"><span className="text-sm text-gray-600">Inspector</span><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" /></label>
                            <label className="flex items-center justify-between"><span className="text-sm text-gray-600">Caseworker</span><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600" /></label>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2">User defined fields</div>
                          <div className="p-3 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <label className="text-sm text-gray-600 whitespace-nowrap">Action Date (*Valid Date)</label>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <label className="text-sm text-gray-600">Action Notes</label>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <label className="text-sm text-gray-600">Client Name</label>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <label className="text-sm text-gray-600">Employee ID</label>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                          </div>
                        </div>

                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2">G/L Accounts</div>
                          <div className="p-3 space-y-2">
                            <div className="flex items-center justify-between gap-2">
                              <a href="#" className="text-sm text-blue-600 underline">Pay Acct</a>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                            <div className="flex items-center justify-between gap-2">
                              <a href="#" className="text-sm text-blue-600 underline">Charge Code</a>
                              <input type="text" className="w-32 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'settings' && (
                  <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                    <div className="space-y-5">
                      {isMultiUser && (
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                          <Users className="w-4 h-4" />
                          Editing settings for <span className="font-semibold text-gray-900">{drawerUsers.length}</span> users
                        </div>
                      )}
                      <h4 className="text-sm font-medium text-gray-700">User Settings</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Access to Past Periods</label><input type="number" defaultValue="999" className="w-16 px-2 py-1 border rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">User can bypass Leasing Week security</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Access to Future Periods</label><input type="number" defaultValue="999" className="w-16 px-2 py-1 border rounded text-sm text-center focus:outline-none focus:ring-2 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Receive License Messages BEFORE expiration</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View payroll trans</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Receive License Messages After expiration</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View all financial batches</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Receive Stack/SQL Trace Messages</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View all conductor reports</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">VoyagerPlus Only User</label><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View secured attachments</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="col-span-2 border-t pt-3 mt-1"></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Post to control accounts</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Override Property Account Security</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Post to Intercompany Segment</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Interface User</label><input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" /></div>
                      </div>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'programRights' && (
                  <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                    {isMultiUser && (
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
                        <Users className="w-4 h-4" />
                        Editing program rights for <span className="font-semibold text-gray-900">{drawerUsers.length}</span> users
                      </div>
                    )}
                    <div className="space-y-1">
                      {[
                        { name: 'Property Mgmt.', checked: true },
                        { name: 'Construction', checked: false },
                        { name: 'Maintenance', checked: true },
                        { name: 'Affordable', checked: true },
                        { name: 'B&F or Advanced Budget', checked: false },
                        { name: 'International Module', checked: false },
                        { name: 'Investment Management', checked: true },
                        { name: 'Commercial', checked: true },
                        { name: 'PortfolioVMF', checked: false },
                      ].map((item, idx) => (
                        <div key={item.name} className={`flex items-center justify-between p-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}>
                          <span className="text-sm text-gray-700">{item.name}</span>
                          <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            )}

            <div className="px-6 py-4 border-t flex gap-3">
              <button onClick={() => setDrawer({ open: false, type: null, data: null })} className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
