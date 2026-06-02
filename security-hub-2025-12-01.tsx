import { useState, useEffect, useCallback } from 'react';
import { Search, X, Users, Shield, Plus, Trash2, Edit2, Undo2, ChevronUp, ChevronDown, ChevronRight, Check, AlertCircle } from 'lucide-react';

const usersData = [
  { id: 1, name: 'Sarah Chen', email: 'schen@company.com', group: 'Admin', properties: 'All', status: 'Active', lastLogin: '2024-01-15' },
  { id: 2, name: 'Mike Johnson', email: 'mjohnson@company.com', group: 'Property Manager', properties: '5', status: 'Active', lastLogin: '2024-01-14' },
  { id: 3, name: 'Emily Davis', email: 'edavis@company.com', group: 'Accountant', properties: '8', status: 'Active', lastLogin: '2024-01-15' },
  { id: 4, name: 'James Wilson', email: 'jwilson@company.com', group: 'Maintenance', properties: '10', status: 'Active', lastLogin: '2024-01-13' },
  { id: 5, name: 'Lisa Anderson', email: 'landerson@company.com', group: 'Property Manager', properties: '3', status: 'Inactive', lastLogin: '2024-01-01' },
  { id: 6, name: 'Robert Brown', email: 'rbrown@company.com', group: 'Leasing Agent', properties: '4', status: 'Active', lastLogin: '2024-01-15' },
  { id: 7, name: 'Amanda White', email: 'awhite@company.com', group: 'Admin', properties: 'All', status: 'Active', lastLogin: '2024-01-14' },
  { id: 8, name: 'David Lee', email: 'dlee@company.com', group: 'View Only', properties: '2', status: 'Active', lastLogin: '2024-01-10' },
];

const securityGroupsData = [
  { id: 1, name: 'Admin', description: 'Full system access', properties: 'All', lastModified: '2024-01-15' },
  { id: 2, name: 'Property Manager', description: 'Manage assigned properties', properties: '12', lastModified: '2024-01-10' },
  { id: 3, name: 'Accountant', description: 'Financial operations', properties: '8', lastModified: '2024-01-08' },
  { id: 4, name: 'Maintenance', description: 'Work order management', properties: '15', lastModified: '2024-01-12' },
  { id: 5, name: 'Leasing Agent', description: 'Tenant applications & leases', properties: '6', lastModified: '2024-01-14' },
  { id: 6, name: 'View Only', description: 'Read-only access', properties: '3', lastModified: '2024-01-05' },
].map(g => ({ ...g, userCount: usersData.filter(u => u.group === g.name).length }));

const initialRoles = [
  { id: 1, name: 'AR Manager', enabled: true }, { id: 2, name: 'AR Manager - Payments', enabled: false },
  { id: 3, name: 'AR Manager - Payments Admin', enabled: false }, { id: 4, name: 'CRM IQ', enabled: true },
  { id: 5, name: 'Procure to Pay v2', enabled: false }, { id: 6, name: 'System Administration', enabled: true },
  { id: 7, name: 'Voyager 8 Residential', enabled: true }, { id: 8, name: 'Voyager 8 Residential - Leasing', enabled: false },
];

const initialAccounts = {
  access: [
    { code: '00100000', name: 'ASSETS' }, { code: '00300000', name: 'CASH' }, { code: '10000000', name: 'Cash - Operating' },
    { code: '10010000', name: 'Cash - Operating 1' }, { code: '10020000', name: 'Cash - Operating 2' }, { code: '10030000', name: 'Cash - Maintenance Reserve' },
    { code: '10040000', name: 'Cash - Corporate Operating' }, { code: '10040100', name: 'Cash - Corporate Payroll' }, { code: '10050000', name: 'Cash - Security Deposits' },
  ],
  noAccess: [{ code: '10091000', name: 'Cash - Rent Collection' }, { code: '10092000', name: 'Cash - CMA' }, { code: '20000000', name: 'Accounts Receivable' }],
};

const initialAccountTrees = {
  access: [{ code: '4d_bs', name: 'Historical 4 Digit Balance Sheet' }, { code: 'corp_bs', name: 'YSI Standard Balance Sheet' }, { code: 'gw_bs', name: 'GW Balance Sheet' }],
  noAccess: [{ code: 'owner_bs', name: 'Owner Balance Sheet' }, { code: 'std_tb', name: 'Standard Trial Balance' }],
};

const initialChargeCodes = {
  access: [{ code: 'a59-clr', name: '50059 HAP Overpayment' }, { code: 'admin', name: 'Administration Fee' }, { code: 'amenity', name: 'Amenity Fees' }],
  noAccess: [{ code: '4-rent', name: 'DO NOT USE - Bad Rent Code' }, { code: 'rc-amex', name: 'RAM Corp - AMEX reimb' }],
};

const initialPermissions = [
  { id: 1, description: 'Accounting>G/L>Bank Reconciliation', access: 'No Access', programType: 'Role - Voyager 8', isNew: false, parentId: null },
  { id: 2, description: 'Accounting>G/L>Bank Reconciliation>Add Attachment', access: 'No Access', programType: 'Role - Voyager 8', isNew: false, parentId: 1 },
  { id: 8, description: 'Analytics Dashboard', access: 'Access', programType: 'Analytics', isNew: true, parentId: null },
  { id: 9, description: 'Campaign Manager', access: 'Access', programType: 'Marketing', isNew: false, parentId: null },
  { id: 10, description: 'Data Export', access: 'No Access', programType: 'Core', isNew: false, parentId: null },
  { id: 12, description: 'Resident Portal>Payments', access: 'Access', programType: 'Core', isNew: true, parentId: null },
];

const initialDisplayTypes = {
  Charge: [{ name: 'Condo - Condo Domestic', restricted: false }, { name: 'Standard - Standard Charge', restricted: false }],
  Payable: [{ name: 'Standard - Standard Payable', restricted: false }, { name: 'JobCost - JobCost Payable', restricted: false }],
  Receipt: [{ name: 'Standard - Standard Receipt', restricted: false }, { name: 'Cash - Cash Receipt', restricted: false }],
};

const reportsData = {
  'Standard Reports': ['Financial Summary', 'Occupancy Report', 'Rent Roll', 'Aging Report', 'Budget Variance'],
  'YSR Reports': ['AR Aging Summary Report', 'Resident Rent Bill', 'Residential Unit Availability'],
  'SQL Reports': [{ name: 'CO Renewal Lease Doc', fileName: 'rs_sql_BPCO_Renewal.txt' }, { name: 'Billingsley Application', fileName: 'rs_sql_Billingsley.txt' }],
};

function ToastContainer({ toasts, removeToast }) {
  return (
    <div className="fixed bottom-4 right-4 space-y-2" style={{ zIndex: 100000 }}>
      {toasts.map(toast => (
        <div key={toast.id} className={`flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg text-white text-sm ${toast.type === 'success' ? 'bg-green-600' : toast.type === 'error' ? 'bg-red-600' : 'bg-blue-600'}`}>
          {toast.type === 'success' && <Check className="w-4 h-4" />}
          {toast.type === 'error' && <AlertCircle className="w-4 h-4" />}
          {toast.message}
          <button onClick={() => removeToast(toast.id)} className="ml-2 hover:opacity-70"><X className="w-4 h-4" /></button>
        </div>
      ))}
    </div>
  );
}

function useToast() {
  const [toasts, setToasts] = useState([]);
  const addToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => setToasts(prev => prev.filter(t => t.id !== id)), 3000);
  }, []);
  const removeToast = useCallback((id) => setToasts(prev => prev.filter(t => t.id !== id)), []);
  return { toasts, addToast, removeToast };
}

function ConfirmDialog({ open, title, message, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center" style={{ zIndex: 100001 }} onClick={onCancel}>
      <div className="bg-white rounded-xl shadow-2xl p-6 max-w-md mx-4" onClick={e => e.stopPropagation()}>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-4">{message}</p>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel} className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700">Discard Changes</button>
        </div>
      </div>
    </div>
  );
}

function TransferList({ accessItems, noAccessItems, onUpdate, onUndo, canUndo, codeLabel = "Code", descLabel = "Description" }) {
  const [selectedAccess, setSelectedAccess] = useState([]);
  const [selectedNoAccess, setSelectedNoAccess] = useState([]);
  const [accessFilter, setAccessFilter] = useState({ code: '', desc: '' });
  const [noAccessFilter, setNoAccessFilter] = useState({ code: '', desc: '' });
  const [lastClickedAccess, setLastClickedAccess] = useState(null);
  const [lastClickedNoAccess, setLastClickedNoAccess] = useState(null);

  const filteredAccess = accessItems.filter(a => a.code.toLowerCase().includes(accessFilter.code.toLowerCase()) && a.name.toLowerCase().includes(accessFilter.desc.toLowerCase()));
  const filteredNoAccess = noAccessItems.filter(a => a.code.toLowerCase().includes(noAccessFilter.code.toLowerCase()) && a.name.toLowerCase().includes(noAccessFilter.desc.toLowerCase()));

  const handleClick = (e, item, isAccess) => {
    const selected = isAccess ? selectedAccess : selectedNoAccess;
    const setSelected = isAccess ? setSelectedAccess : setSelectedNoAccess;
    const lastClicked = isAccess ? lastClickedAccess : lastClickedNoAccess;
    const setLastClicked = isAccess ? setLastClickedAccess : setLastClickedNoAccess;
    const filtered = isAccess ? filteredAccess : filteredNoAccess;
    if (e.shiftKey && lastClicked) {
      const lastIdx = filtered.findIndex(i => i.code === lastClicked);
      const currIdx = filtered.findIndex(i => i.code === item.code);
      if (lastIdx !== -1 && currIdx !== -1) {
        const [start, end] = [Math.min(lastIdx, currIdx), Math.max(lastIdx, currIdx)];
        const range = filtered.slice(start, end + 1).map(i => i.code);
        setSelected(prev => [...new Set([...prev, ...range])]);
        return;
      }
    }
    setLastClicked(item.code);
    setSelected(prev => prev.includes(item.code) ? prev.filter(c => c !== item.code) : [...prev, item.code]);
  };

  const handleDoubleClick = (item, fromAccess) => {
    if (fromAccess) {
      onUpdate({ access: accessItems.filter(i => i.code !== item.code), noAccess: [...noAccessItems, item].sort((a, b) => a.code.localeCompare(b.code)) });
    } else {
      onUpdate({ access: [...accessItems, item].sort((a, b) => a.code.localeCompare(b.code)), noAccess: noAccessItems.filter(i => i.code !== item.code) });
    }
    setSelectedAccess([]); setSelectedNoAccess([]);
  };

  const handleTransfer = (action) => {
    let newAccess = [...accessItems], newNoAccess = [...noAccessItems];
    if (action === 'toAccess') {
      const items = newNoAccess.filter(i => selectedNoAccess.includes(i.code));
      newNoAccess = newNoAccess.filter(i => !selectedNoAccess.includes(i.code));
      newAccess = [...newAccess, ...items].sort((a, b) => a.code.localeCompare(b.code));
      setSelectedNoAccess([]);
    } else if (action === 'toNoAccess') {
      const items = newAccess.filter(i => selectedAccess.includes(i.code));
      newAccess = newAccess.filter(i => !selectedAccess.includes(i.code));
      newNoAccess = [...newNoAccess, ...items].sort((a, b) => a.code.localeCompare(b.code));
      setSelectedAccess([]);
    } else if (action === 'allToAccess') {
      newAccess = [...newAccess, ...newNoAccess].sort((a, b) => a.code.localeCompare(b.code));
      newNoAccess = []; setSelectedNoAccess([]);
    } else if (action === 'allToNoAccess') {
      newNoAccess = [...newNoAccess, ...newAccess].sort((a, b) => a.code.localeCompare(b.code));
      newAccess = []; setSelectedAccess([]);
    }
    onUpdate({ access: newAccess, noAccess: newNoAccess });
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-4">
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input type="text" placeholder={`Filter ${codeLabel.toLowerCase()}...`} value={accessFilter.code} onChange={e => setAccessFilter(p => ({...p, code: e.target.value}))} className="px-2 py-1 border rounded text-xs" />
          <input type="text" placeholder={`Filter ${descLabel.toLowerCase()}...`} value={accessFilter.desc} onChange={e => setAccessFilter(p => ({...p, desc: e.target.value}))} className="px-2 py-1 border rounded text-xs" />
        </div>
        <div className="w-16" />
        <div className="flex-1 grid grid-cols-2 gap-2">
          <input type="text" placeholder={`Filter ${codeLabel.toLowerCase()}...`} value={noAccessFilter.code} onChange={e => setNoAccessFilter(p => ({...p, code: e.target.value}))} className="px-2 py-1 border rounded text-xs" />
          <input type="text" placeholder={`Filter ${descLabel.toLowerCase()}...`} value={noAccessFilter.desc} onChange={e => setNoAccessFilter(p => ({...p, desc: e.target.value}))} className="px-2 py-1 border rounded text-xs" />
        </div>
      </div>
      <div className="flex gap-2">
        <div className="flex-1">
          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t flex justify-between"><span>Access</span><span className="text-xs bg-teal-700 px-2 py-0.5 rounded">{filteredAccess.length}</span></div>
          <div className="border border-t-0 rounded-b h-52 overflow-auto">
            {filteredAccess.map(item => (
              <div key={item.code} onClick={e => handleClick(e, item, true)} onDoubleClick={() => handleDoubleClick(item, true)} className={`px-2 py-1 text-xs cursor-pointer select-none ${selectedAccess.includes(item.code) ? 'bg-blue-100' : 'hover:bg-blue-50'}`}>({item.code}) {item.name}</div>
            ))}
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1">
          <button onClick={() => handleTransfer('allToAccess')} disabled={noAccessItems.length === 0} className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50 disabled:opacity-50">&lt;&lt; ALL</button>
          <button onClick={() => handleTransfer('toAccess')} disabled={selectedNoAccess.length === 0} className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50 disabled:opacity-50">&lt;&lt;</button>
          <button onClick={() => handleTransfer('toNoAccess')} disabled={selectedAccess.length === 0} className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50 disabled:opacity-50">&gt;&gt;</button>
          <button onClick={() => handleTransfer('allToNoAccess')} disabled={accessItems.length === 0} className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50 disabled:opacity-50">ALL &gt;&gt;</button>
          {canUndo && <button onClick={onUndo} className="px-2 py-1 border rounded text-xs font-medium hover:bg-gray-50 mt-2"><Undo2 className="w-3 h-3" /></button>}
        </div>
        <div className="flex-1">
          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t flex justify-between"><span>No Access</span><span className="text-xs bg-teal-700 px-2 py-0.5 rounded">{filteredNoAccess.length}</span></div>
          <div className="border border-t-0 rounded-b h-52 overflow-auto">
            {filteredNoAccess.map(item => (
              <div key={item.code} onClick={e => handleClick(e, item, false)} onDoubleClick={() => handleDoubleClick(item, false)} className={`px-2 py-1 text-xs cursor-pointer select-none ${selectedNoAccess.includes(item.code) ? 'bg-blue-100' : 'hover:bg-blue-50'}`}>({item.code}) {item.name}</div>
            ))}
          </div>
        </div>
      </div>
      <div className="text-xs text-gray-500">Shift+click for range • Double-click to transfer</div>
    </div>
  );
}

function SortableHeader({ label, sortKey, currentSort, onSort }) {
  const isActive = currentSort.key === sortKey;
  return (
    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase cursor-pointer hover:bg-gray-100 select-none" onClick={() => onSort(sortKey)}>
      <div className="flex items-center gap-1">{label}{isActive && (currentSort.dir === 'asc' ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />)}</div>
    </th>
  );
}

export default function SecurityHub() {
  const { toasts, addToast, removeToast } = useToast();
  const [activeTab, setActiveTab] = useState('groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [drawer, setDrawer] = useState({ open: false, type: null, data: null });
  const [drawerTab, setDrawerTab] = useState('users');
  const [userDrawerTab, setUserDrawerTab] = useState('details');
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [groupSort, setGroupSort] = useState({ key: 'name', dir: 'asc' });
  const [userSort, setUserSort] = useState({ key: 'name', dir: 'asc' });
  const [confirmDialog, setConfirmDialog] = useState({ open: false, onConfirm: null });
  const [breadcrumbs, setBreadcrumbs] = useState([]);
  const [originalState, setOriginalState] = useState(null);
  const [accountsData, setAccountsData] = useState(initialAccounts);
  const [accountsHistory, setAccountsHistory] = useState([]);
  const [accountTreesData, setAccountTreesData] = useState(initialAccountTrees);
  const [accountTreesHistory, setAccountTreesHistory] = useState([]);
  const [chargeCodesData, setChargeCodesData] = useState(initialChargeCodes);
  const [chargeCodesHistory, setChargeCodesHistory] = useState([]);
  const [rolesList, setRolesList] = useState(initialRoles);
  const [booksList, setBooksList] = useState([
    { id: 1, name: 'All', enabled: true }, { id: 2, name: 'Cash', enabled: true }, { id: 3, name: 'Accrual', enabled: true },
    { id: 4, name: 'Elim', enabled: false }, { id: 5, name: 'Adjust', enabled: false }, { id: 6, name: 'GAAP', enabled: true },
  ]);
  const [permissionsList, setPermissionsList] = useState(initialPermissions);
  const [displayTypesData, setDisplayTypesData] = useState(initialDisplayTypes);
  const [selectedReports, setSelectedReports] = useState({});
  const [rolesSearch, setRolesSearch] = useState('');
  const [propertySearch, setPropertySearch] = useState('');
  const [permProgramType, setPermProgramType] = useState('All');
  const [permAccessFilter, setPermAccessFilter] = useState('All');
  const [permSearch, setPermSearch] = useState('');
  const [permNewOnly, setPermNewOnly] = useState(false);
  const [displayTypeCategory, setDisplayTypeCategory] = useState('All');
  const [displayTypeSearch, setDisplayTypeSearch] = useState('');
  const [reportType, setReportType] = useState('Standard Reports');
  const [reportSearch, setReportSearch] = useState('');

  const programTypes = [...new Set(initialPermissions.map(p => p.programType))];
  const hasChanges = originalState && (
    JSON.stringify(accountsData) !== JSON.stringify(originalState.accounts) ||
    JSON.stringify(accountTreesData) !== JSON.stringify(originalState.accountTrees) ||
    JSON.stringify(chargeCodesData) !== JSON.stringify(originalState.chargeCodes) ||
    JSON.stringify(rolesList) !== JSON.stringify(originalState.roles) ||
    JSON.stringify(booksList) !== JSON.stringify(originalState.books) ||
    JSON.stringify(permissionsList) !== JSON.stringify(originalState.permissions) ||
    JSON.stringify(selectedReports) !== JSON.stringify(originalState.reports)
  );

  const enabledRoles = rolesList.filter(r => r.enabled).length;
  const enabledBooks = booksList.filter(b => b.enabled && b.name !== 'All').length;
  const accessPermissions = permissionsList.filter(p => p.access === 'Access').length;
  const selectedReportsCount = Object.values(selectedReports).filter(Boolean).length;

  const filteredPermissions = permissionsList.filter(p => {
    const matchesType = permProgramType === 'All' || p.programType === permProgramType;
    const matchesAccess = permAccessFilter === 'All' || p.access === permAccessFilter;
    const matchesSearch = p.description.toLowerCase().includes(permSearch.toLowerCase());
    const matchesNew = !permNewOnly || p.isNew;
    return matchesType && matchesAccess && matchesSearch && matchesNew;
  });

  useEffect(() => {
    if (drawer.open) {
      setOriginalState({
        accounts: JSON.parse(JSON.stringify(accountsData)), accountTrees: JSON.parse(JSON.stringify(accountTreesData)),
        chargeCodes: JSON.parse(JSON.stringify(chargeCodesData)), roles: JSON.parse(JSON.stringify(rolesList)),
        books: JSON.parse(JSON.stringify(booksList)), permissions: JSON.parse(JSON.stringify(permissionsList)),
        reports: JSON.parse(JSON.stringify(selectedReports)),
      });
      setAccountsHistory([]); setAccountTreesHistory([]); setChargeCodesHistory([]);
    }
  }, [drawer.open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && drawer.open) {
        if (hasChanges) setConfirmDialog({ open: true, onConfirm: () => { forceCloseDrawer(); setConfirmDialog({ open: false }); } });
        else forceCloseDrawer();
      }
      if ((e.metaKey || e.ctrlKey) && e.key === 's' && drawer.open) { e.preventDefault(); handleSave(); }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [drawer.open, hasChanges]);

  const forceCloseDrawer = () => { setDrawer({ open: false, type: null, data: null }); setBreadcrumbs([]); setOriginalState(null); };
  const closeDrawer = () => { if (hasChanges) setConfirmDialog({ open: true, onConfirm: () => { forceCloseDrawer(); setConfirmDialog({ open: false }); } }); else forceCloseDrawer(); };

  const handleSave = () => {
    addToast('Changes saved successfully', 'success');
    setOriginalState({ accounts: JSON.parse(JSON.stringify(accountsData)), accountTrees: JSON.parse(JSON.stringify(accountTreesData)), chargeCodes: JSON.parse(JSON.stringify(chargeCodesData)), roles: JSON.parse(JSON.stringify(rolesList)), books: JSON.parse(JSON.stringify(booksList)), permissions: JSON.parse(JSON.stringify(permissionsList)), reports: JSON.parse(JSON.stringify(selectedReports)) });
  };

  const handleReset = () => {
    if (originalState) {
      setAccountsData(JSON.parse(JSON.stringify(originalState.accounts))); setAccountTreesData(JSON.parse(JSON.stringify(originalState.accountTrees)));
      setChargeCodesData(JSON.parse(JSON.stringify(originalState.chargeCodes))); setRolesList(JSON.parse(JSON.stringify(originalState.roles)));
      setBooksList(JSON.parse(JSON.stringify(originalState.books))); setPermissionsList(JSON.parse(JSON.stringify(originalState.permissions)));
      setSelectedReports(JSON.parse(JSON.stringify(originalState.reports)));
      setAccountsHistory([]); setAccountTreesHistory([]); setChargeCodesHistory([]);
      addToast('Changes reverted', 'info');
    }
  };

  const updateWithHistory = (setData, setHistory, newData) => { setData(prev => { setHistory(h => [...h, prev]); return newData; }); };
  const undo = (setData, history, setHistory) => { if (history.length > 0) { setData(history[history.length - 1]); setHistory(h => h.slice(0, -1)); addToast('Action undone', 'info'); } };
  const handleSort = (key, sort, setSort) => { setSort(prev => ({ key, dir: prev.key === key && prev.dir === 'asc' ? 'desc' : 'asc' })); };

  const sortItems = (items, sort) => [...items].sort((a, b) => {
    let aVal = a[sort.key], bVal = b[sort.key];
    if (sort.key === 'userCount' || sort.key === 'properties') { aVal = aVal === 'All' ? 999 : parseInt(aVal) || 0; bVal = bVal === 'All' ? 999 : parseInt(bVal) || 0; }
    if (typeof aVal === 'string') { aVal = aVal.toLowerCase(); bVal = bVal.toLowerCase(); }
    return aVal < bVal ? (sort.dir === 'asc' ? -1 : 1) : aVal > bVal ? (sort.dir === 'asc' ? 1 : -1) : 0;
  });

  const openUserFromGroup = (user) => { setBreadcrumbs(prev => [...prev, { type: 'group', data: drawer.data, tab: drawerTab }]); setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); };
  const navigateBack = () => { if (breadcrumbs.length > 0) { const prev = breadcrumbs[breadcrumbs.length - 1]; setBreadcrumbs(b => b.slice(0, -1)); setDrawer({ open: true, type: prev.type, data: prev.data }); if (prev.type === 'group') setDrawerTab(prev.tab); } };

  const filteredGroups = sortItems(securityGroupsData.filter(g => g.name.toLowerCase().includes(searchTerm.toLowerCase()) || g.description.toLowerCase().includes(searchTerm.toLowerCase())), groupSort);
  const filteredUsers = sortItems(usersData.filter(u => {
    const matchesSearch = u.name.toLowerCase().includes(searchTerm.toLowerCase()) || u.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSearch && (filterGroup === 'All' || u.group === filterGroup) && (filterStatus === 'All' || u.status === filterStatus);
  }), userSort);

  const groupUsers = drawer.data ? usersData.filter(u => { const groups = Array.isArray(drawer.data) ? drawer.data : [drawer.data]; return groups.some(g => g.name === u.group); }) : [];
  const isMultiGroup = drawer.data && Array.isArray(drawer.data) && drawer.data.length > 1;
  const isMultiUser = drawer.type === 'user' && drawer.data && Array.isArray(drawer.data) && drawer.data.length > 1;
  const drawerGroups = drawer.data && drawer.type === 'group' ? (Array.isArray(drawer.data) ? drawer.data : [drawer.data]) : [];
  const drawerUsers = drawer.type === 'user' && drawer.data ? (Array.isArray(drawer.data) ? drawer.data : [drawer.data]) : [];

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer toasts={toasts} removeToast={removeToast} />
      <ConfirmDialog open={confirmDialog.open} title="Unsaved Changes" message="You have unsaved changes. Are you sure you want to close without saving?" onConfirm={confirmDialog.onConfirm} onCancel={() => setConfirmDialog({ open: false })} />

      <div className="bg-white border-b px-6 py-4">
        <div className="flex items-center gap-3">
          <Shield className="w-8 h-8 text-blue-600" />
          <div><h1 className="text-2xl font-semibold text-gray-900">Security Hub</h1><p className="text-sm text-gray-500">Manage security groups and user access • Ctrl+S to save • Esc to close</p></div>
        </div>
      </div>

      <div className="bg-white border-b px-6">
        <div className="flex gap-1">
          <button onClick={() => { setActiveTab('groups'); setSearchTerm(''); }} className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'groups' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
            <div className="flex items-center gap-2"><Shield className="w-4 h-4" />Security Groups <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{securityGroupsData.length}</span></div>
          </button>
          <button onClick={() => { setActiveTab('users'); setSearchTerm(''); }} className={`px-4 py-3 text-sm font-medium border-b-2 ${activeTab === 'users' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
            <div className="flex items-center gap-2"><Users className="w-4 h-4" />Users <span className="text-xs bg-gray-100 px-1.5 py-0.5 rounded">{usersData.length}</span></div>
          </button>
        </div>
      </div>

      <div className="px-6 py-4 bg-white border-b">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder={activeTab === 'groups' ? 'Search security groups...' : 'Search users...'} value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" />
          </div>
          {activeTab === 'users' && (
            <>
              <select value={filterGroup} onChange={e => setFilterGroup(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
                <option value="All">All Groups</option>
                {securityGroupsData.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
              </select>
              <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} className="px-3 py-2 border rounded-lg text-sm">
                <option value="All">All Statuses</option><option value="Active">Active</option><option value="Inactive">Inactive</option>
              </select>
            </>
          )}
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-2"><Plus className="w-4 h-4" />{activeTab === 'groups' ? 'Add Group' : 'Add User'}</button>
        </div>
      </div>

      <div className="p-6">
        {activeTab === 'groups' ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            {selectedGroups.length > 0 && (
              <div className="px-4 py-3 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">{selectedGroups.length} selected</span>
                <div className="flex gap-2">
                  <button onClick={() => { setDrawer({ open: true, type: 'group', data: securityGroupsData.filter(g => selectedGroups.includes(g.id)) }); setDrawerTab('users'); }} className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded">Edit</button>
                  <button onClick={() => setSelectedGroups([])} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded">Clear</button>
                </div>
              </div>
            )}
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0} onChange={e => setSelectedGroups(e.target.checked ? filteredGroups.map(g => g.id) : [])} className="w-4 h-4 rounded" /></th>
                  <SortableHeader label="Group Name" sortKey="name" currentSort={groupSort} onSort={k => handleSort(k, groupSort, setGroupSort)} />
                  <SortableHeader label="Description" sortKey="description" currentSort={groupSort} onSort={k => handleSort(k, groupSort, setGroupSort)} />
                  <SortableHeader label="Users" sortKey="userCount" currentSort={groupSort} onSort={k => handleSort(k, groupSort, setGroupSort)} />
                  <SortableHeader label="Properties" sortKey="properties" currentSort={groupSort} onSort={k => handleSort(k, groupSort, setGroupSort)} />
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGroups.map(group => (
                  <tr key={group.id} className={`hover:bg-blue-50 cursor-pointer group ${selectedGroups.includes(group.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedGroups.includes(group.id)} onChange={e => setSelectedGroups(e.target.checked ? [...selectedGroups, group.id] : selectedGroups.filter(id => id !== group.id))} className="w-4 h-4 rounded" /></td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>
                      <div className="flex items-center gap-2"><div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center"><Shield className="w-4 h-4 text-blue-600" /></div><span className="font-medium">{group.name}</span></div>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>{group.description}</td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}><span className="px-2 py-1 bg-gray-100 rounded-full text-xs">{group.userCount}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }}>{group.properties}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                        <button onClick={e => { e.stopPropagation(); setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('users'); }} className="p-1.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="bg-white rounded-xl border overflow-hidden">
            {selectedUsers.length > 0 && (
              <div className="px-4 py-3 bg-blue-50 border-b flex items-center justify-between">
                <span className="text-sm text-blue-700 font-medium">{selectedUsers.length} selected</span>
                <div className="flex gap-2">
                  <button onClick={() => { setDrawer({ open: true, type: 'user', data: usersData.filter(u => selectedUsers.includes(u.id)) }); setUserDrawerTab('settings'); }} className="px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded">Edit</button>
                  <button onClick={() => setSelectedUsers([])} className="px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded">Clear</button>
                </div>
              </div>
            )}
            <table className="w-full">
              <thead className="bg-gray-50 border-b sticky top-0">
                <tr>
                  <th className="px-4 py-3 w-10"><input type="checkbox" checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0} onChange={e => setSelectedUsers(e.target.checked ? filteredUsers.map(u => u.id) : [])} className="w-4 h-4 rounded" /></th>
                  <SortableHeader label="User" sortKey="name" currentSort={userSort} onSort={k => handleSort(k, userSort, setUserSort)} />
                  <SortableHeader label="Group" sortKey="group" currentSort={userSort} onSort={k => handleSort(k, userSort, setUserSort)} />
                  <SortableHeader label="Properties" sortKey="properties" currentSort={userSort} onSort={k => handleSort(k, userSort, setUserSort)} />
                  <SortableHeader label="Status" sortKey="status" currentSort={userSort} onSort={k => handleSort(k, userSort, setUserSort)} />
                  <th className="px-4 py-3 w-20"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredUsers.map(user => (
                  <tr key={user.id} className={`hover:bg-blue-50 cursor-pointer group ${selectedUsers.includes(user.id) ? 'bg-blue-50' : ''}`}>
                    <td className="px-4 py-3" onClick={e => e.stopPropagation()}><input type="checkbox" checked={selectedUsers.includes(user.id)} onChange={e => setSelectedUsers(e.target.checked ? [...selectedUsers, user.id] : selectedUsers.filter(id => id !== user.id))} className="w-4 h-4 rounded" /></td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}>
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-sm font-medium">{user.name.split(' ').map(n => n[0]).join('')}</div>
                        <div><div className="font-medium">{user.name}</div><div className="text-xs text-gray-500">{user.email}</div></div>
                      </div>
                    </td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}><span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs">{user.group}</span></td>
                    <td className="px-4 py-3 text-sm text-gray-600" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}>{user.properties}</td>
                    <td className="px-4 py-3" onClick={() => { setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }}><span className={`px-2 py-1 rounded-full text-xs ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>{user.status}</span></td>
                    <td className="px-4 py-3">
                      <div className="flex gap-1 opacity-0 group-hover:opacity-100">
                        <button onClick={e => { e.stopPropagation(); setDrawer({ open: true, type: 'user', data: user }); setUserDrawerTab('details'); }} className="p-1.5 hover:bg-blue-100 rounded text-gray-400 hover:text-blue-600"><Edit2 className="w-4 h-4" /></button>
                        <button onClick={e => e.stopPropagation()} className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {drawer.open && <div className="fixed inset-0 bg-black/30" style={{ zIndex: 40 }} onClick={closeDrawer} />}

      <div className={`fixed right-0 top-0 h-full w-[800px] bg-white shadow-2xl transform transition-transform duration-300 flex flex-col ${drawer.open ? 'translate-x-0' : 'translate-x-full'}`} style={{ zIndex: 50 }}>
        {drawer.data && (
          <>
            <div className="px-6 py-4 border-b flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                {breadcrumbs.length > 0 && <button onClick={navigateBack} className="p-1 hover:bg-gray-100 rounded"><ChevronRight className="w-5 h-5 rotate-180" /></button>}
                {drawer.type === 'group' ? <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center"><Shield className="w-5 h-5 text-blue-600" /></div> : <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white font-medium">{isMultiUser ? drawerUsers.length : drawerUsers[0]?.name?.split(' ').map(n => n[0]).join('')}</div>}
                <div>
                  {drawer.type === 'group' ? (isMultiGroup ? <h2 className="font-semibold">{drawerGroups.length} Groups Selected</h2> : <><h2 className="font-semibold">{drawerGroups[0]?.name}</h2><p className="text-sm text-gray-500">{drawerGroups[0]?.description}</p></>) : (isMultiUser ? <h2 className="font-semibold">{drawerUsers.length} Users Selected</h2> : <><h2 className="font-semibold">{drawerUsers[0]?.name}</h2><p className="text-sm text-gray-500">{drawerUsers[0]?.email}</p></>)}
                </div>
                {hasChanges && <span className="w-2 h-2 bg-orange-500 rounded-full" title="Unsaved changes" />}
              </div>
              <button onClick={closeDrawer} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            {drawer.type === 'group' ? (
              <>
                <div className="px-6 border-b shrink-0">
                  <div className="flex gap-1 overflow-x-auto">
                    {[{ key: 'users', label: 'Users', badge: groupUsers.length }, { key: 'roles', label: 'Roles', badge: enabledRoles }, { key: 'permissions', label: 'Permissions', badge: accessPermissions }, { key: 'accounts', label: 'Accounts', badge: accountsData.access.length }, { key: 'accountTrees', label: 'Acct Trees', badge: accountTreesData.access.length }, { key: 'chargeCodes', label: 'Charge Codes', badge: chargeCodesData.access.length }, { key: 'displayTypes', label: 'Display Types', badge: null }, { key: 'book', label: 'Book', badge: enabledBooks }, { key: 'reports', label: 'Reports', badge: selectedReportsCount || null }].map(tab => (
                      <button key={tab.key} onClick={() => setDrawerTab(tab.key)} className={`px-2 py-3 text-xs font-medium border-b-2 whitespace-nowrap flex items-center gap-1 ${drawerTab === tab.key ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                        {tab.label} {tab.badge !== null && <span className={`text-xs px-1.5 py-0.5 rounded ${drawerTab === tab.key ? 'bg-blue-100' : 'bg-gray-100'}`}>{tab.badge}</span>}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  {drawerTab === 'users' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4"><span className="text-sm text-gray-500">{groupUsers.length} users</span><button className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-1"><Plus className="w-3 h-3" /> Add User</button></div>
                      {groupUsers.map(user => (
                        <div key={user.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg group">
                          <div className="flex items-center gap-3 cursor-pointer" onClick={() => openUserFromGroup(user)}>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs">{user.name.split(' ').map(n => n[0]).join('')}</div>
                            <div><div className="font-medium text-sm text-blue-600 hover:underline">{user.name}</div><div className="text-xs text-gray-500">{user.email}</div></div>
                          </div>
                          <button className="p-1.5 hover:bg-red-100 rounded text-gray-400 hover:text-red-600 opacity-0 group-hover:opacity-100"><Trash2 className="w-4 h-4" /></button>
                        </div>
                      ))}
                    </div>
                  )}
                  {drawerTab === 'roles' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 mb-4">Assign roles to this security group.</p>
                      <div className="relative mb-4"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search roles..." value={rolesSearch} onChange={e => setRolesSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" /></div>
                      {rolesList.filter(r => r.name.toLowerCase().includes(rolesSearch.toLowerCase())).map(role => (
                        <label key={role.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm">{role.name}</span>
                          <div onClick={() => setRolesList(prev => prev.map(r => r.id === role.id ? {...r, enabled: !r.enabled} : r))} className={`w-10 h-6 rounded-full p-1 cursor-pointer ${role.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${role.enabled ? 'translate-x-4' : ''}`} /></div>
                        </label>
                      ))}
                    </div>
                  )}
                  {drawerTab === 'permissions' && (
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2 items-center">
                        <select value={permProgramType} onChange={e => setPermProgramType(e.target.value)} className="px-2 py-1.5 border rounded text-sm"><option value="All">All Types</option>{programTypes.map(t => <option key={t} value={t}>{t}</option>)}</select>
                        <select value={permAccessFilter} onChange={e => setPermAccessFilter(e.target.value)} className="px-2 py-1.5 border rounded text-sm"><option value="All">All Access</option><option value="Access">Access</option><option value="No Access">No Access</option></select>
                        <div className="relative flex-1 min-w-32"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-gray-400" /><input type="text" placeholder="Search..." value={permSearch} onChange={e => setPermSearch(e.target.value)} className="w-full pl-7 pr-2 py-1.5 border rounded text-sm" /></div>
                      </div>
                      <label className="flex items-center gap-2 text-sm cursor-pointer"><input type="checkbox" checked={permNewOnly} onChange={e => setPermNewOnly(e.target.checked)} className="w-4 h-4 rounded" />New Only</label>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b"><tr><th className="text-left px-3 py-2 text-xs font-semibold text-gray-500">Description</th><th className="text-left px-3 py-2 text-xs font-semibold text-gray-500 w-28">Access</th></tr></thead>
                          <tbody className="divide-y">
                            {filteredPermissions.map(perm => {
                              const parent = perm.parentId ? permissionsList.find(p => p.id === perm.parentId) : null;
                              const isDisabled = parent && parent.access === 'No Access';
                              return (
                                <tr key={perm.id} className={isDisabled ? 'bg-gray-50' : 'hover:bg-gray-50'}>
                                  <td className={`px-3 py-2 text-xs ${isDisabled ? 'text-gray-400' : ''}`}><div className={`flex items-center gap-2 ${perm.parentId ? 'pl-6' : ''}`}>{perm.description}{perm.isNew && <span className="px-1.5 py-0.5 bg-teal-100 text-teal-700 rounded text-xs">NEW</span>}</div></td>
                                  <td className="px-3 py-2"><select value={isDisabled ? 'No Access' : perm.access} disabled={isDisabled} onChange={e => setPermissionsList(prev => prev.map(p => p.id === perm.id ? {...p, access: e.target.value} : p))} className={`w-full px-2 py-1 border rounded text-xs ${isDisabled ? 'bg-gray-100 text-gray-400' : ''}`}><option value="Access">Access</option><option value="No Access">No Access</option></select></td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {drawerTab === 'accounts' && <TransferList accessItems={accountsData.access} noAccessItems={accountsData.noAccess} onUpdate={data => updateWithHistory(setAccountsData, setAccountsHistory, data)} onUndo={() => undo(setAccountsData, accountsHistory, setAccountsHistory)} canUndo={accountsHistory.length > 0} codeLabel="Account Code" descLabel="Description" />}
                  {drawerTab === 'accountTrees' && <TransferList accessItems={accountTreesData.access} noAccessItems={accountTreesData.noAccess} onUpdate={data => updateWithHistory(setAccountTreesData, setAccountTreesHistory, data)} onUndo={() => undo(setAccountTreesData, accountTreesHistory, setAccountTreesHistory)} canUndo={accountTreesHistory.length > 0} codeLabel="Tree Code" descLabel="Description" />}
                  {drawerTab === 'chargeCodes' && <TransferList accessItems={chargeCodesData.access} noAccessItems={chargeCodesData.noAccess} onUpdate={data => updateWithHistory(setChargeCodesData, setChargeCodesHistory, data)} onUndo={() => undo(setChargeCodesData, chargeCodesHistory, setChargeCodesHistory)} canUndo={chargeCodesHistory.length > 0} codeLabel="Charge Code" descLabel="Description" />}
                  {drawerTab === 'displayTypes' && (
                    <div className="space-y-3">
                      <select value={displayTypeCategory} onChange={e => setDisplayTypeCategory(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option value="All">All Categories</option>{Object.keys(initialDisplayTypes).map(t => <option key={t} value={t}>{t}</option>)}</select>
                      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={displayTypeSearch} onChange={e => setDisplayTypeSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" /></div>
                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-100 border-b"><tr><th className="text-left px-4 py-2 text-xs font-semibold">Display Type</th>{displayTypeCategory === 'All' && <th className="text-left px-4 py-2 text-xs font-semibold w-28">Category</th>}<th className="text-center px-4 py-2 text-xs font-semibold w-20">Restrict</th></tr></thead>
                          <tbody className="divide-y">
                            {(displayTypeCategory === 'All' ? Object.entries(displayTypesData).flatMap(([type, items]) => items.map(item => ({ ...item, type }))) : (displayTypesData[displayTypeCategory] || []).map(item => ({ ...item, type: displayTypeCategory }))).filter(item => item.name.toLowerCase().includes(displayTypeSearch.toLowerCase())).map((item, idx) => (
                              <tr key={item.name} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                                <td className="px-4 py-2 text-sm">{item.name}</td>
                                {displayTypeCategory === 'All' && <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">{item.type}</span></td>}
                                <td className="px-4 py-2 text-center"><input type="checkbox" checked={item.restricted} onChange={e => setDisplayTypesData(prev => ({...prev, [item.type]: prev[item.type].map(i => i.name === item.name ? {...i, restricted: e.target.checked} : i)}))} className="w-4 h-4 rounded" /></td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}
                  {drawerTab === 'book' && (
                    <div className="space-y-2">
                      <p className="text-sm text-gray-500 mb-4">Assign book access.</p>
                      {booksList.map(book => (
                        <label key={book.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100">
                          <span className="text-sm">{book.name}</span>
                          <div onClick={() => { if (book.name === 'All') setBooksList(prev => prev.map(b => ({...b, enabled: !book.enabled}))); else setBooksList(prev => { const updated = prev.map(b => b.id === book.id ? {...b, enabled: !b.enabled} : b); const allOn = updated.filter(b => b.name !== 'All').every(b => b.enabled); return updated.map(b => b.name === 'All' ? {...b, enabled: allOn} : b); }); }} className={`w-10 h-6 rounded-full p-1 cursor-pointer ${book.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}><div className={`w-4 h-4 bg-white rounded-full transition-transform ${book.enabled ? 'translate-x-4' : ''}`} /></div>
                        </label>
                      ))}
                    </div>
                  )}
                  {drawerTab === 'reports' && (
                    <div className="space-y-3">
                      <select value={reportType} onChange={e => setReportType(e.target.value)} className="w-full px-3 py-2 border rounded-lg text-sm"><option>Standard Reports</option><option>YSR Reports</option><option>SQL Reports</option></select>
                      <div className="relative"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="text" placeholder="Search..." value={reportSearch} onChange={e => setReportSearch(e.target.value)} className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm" /></div>
                      <div className="flex gap-2">
                        <button onClick={() => { const rpts = reportsData[reportType]; const ns = {...selectedReports}; rpts.forEach(r => { ns[`${reportType}-${typeof r === 'string' ? r : r.name}`] = true; }); setSelectedReports(ns); }} className="px-3 py-1.5 border rounded text-sm">Select All</button>
                        <button onClick={() => { const rpts = reportsData[reportType]; const ns = {...selectedReports}; rpts.forEach(r => { ns[`${reportType}-${typeof r === 'string' ? r : r.name}`] = false; }); setSelectedReports(ns); }} className="px-3 py-1.5 border rounded text-sm">Deselect All</button>
                      </div>
                      {reportType === 'SQL Reports' ? (
                        <div className="border rounded-lg overflow-hidden">
                          <table className="w-full text-sm"><thead className="bg-gray-100 border-b"><tr><th className="text-left px-3 py-2 text-xs w-12">Select</th><th className="text-left px-3 py-2 text-xs">Report</th><th className="text-left px-3 py-2 text-xs">File</th></tr></thead>
                            <tbody className="divide-y">{reportsData[reportType].filter(r => r.name.toLowerCase().includes(reportSearch.toLowerCase())).map((r, i) => (<tr key={r.name} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50'}><td className="px-3 py-2"><input type="checkbox" checked={selectedReports[`${reportType}-${r.name}`] || false} onChange={e => setSelectedReports({...selectedReports, [`${reportType}-${r.name}`]: e.target.checked})} className="w-4 h-4 rounded" /></td><td className="px-3 py-2">{r.name}</td><td className="px-3 py-2 text-gray-500">{r.fileName}</td></tr>))}</tbody>
                          </table>
                        </div>
                      ) : (
                        <div className="space-y-2">{reportsData[reportType].filter(r => r.toLowerCase().includes(reportSearch.toLowerCase())).map(r => (<label key={r} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100"><input type="checkbox" checked={selectedReports[`${reportType}-${r}`] || false} onChange={e => setSelectedReports({...selectedReports, [`${reportType}-${r}`]: e.target.checked})} className="w-5 h-5 rounded" /><span className="text-sm">{r}</span></label>))}</div>
                      )}
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <div className="px-6 border-b shrink-0">
                  <div className="flex gap-1">
                    {(isMultiUser ? ['settings', 'programRights'] : ['details', 'settings', 'programRights']).map(tab => (
                      <button key={tab} onClick={() => setUserDrawerTab(tab)} className={`px-3 py-3 text-sm font-medium border-b-2 ${userDrawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>{tab === 'programRights' ? 'Program Rights' : tab.charAt(0).toUpperCase() + tab.slice(1)}</button>
                    ))}
                  </div>
                </div>
                <div className="flex-1 overflow-auto p-6">
                  {userDrawerTab === 'details' && !isMultiUser && drawerUsers[0] && (
                    <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                        {[['Code', 'ysu03784', true], ['Lastname', drawerUsers[0].name.split(' ')[1] || '', true], ['Firstname', drawerUsers[0].name.split(' ')[0] || ''], ['Email', drawerUsers[0].email], ['Dear', ''], ['Address', '430 S Fairview Ave'], ['City', 'Goleta'], ['Phone', '']].map(([label, val, teal]) => (
                          <div key={label} className="grid grid-cols-3 gap-2 items-center"><label className="text-sm text-gray-600">{label}</label><input type="text" defaultValue={val} className={`col-span-2 px-2 py-1.5 border rounded text-sm ${teal ? 'bg-teal-100' : ''}`} /></div>
                        ))}
                        <div className="grid grid-cols-3 gap-2 items-center"><label className="text-sm text-gray-600">State-Zip</label><div className="col-span-2 flex gap-2"><select defaultValue="CA" className="px-2 py-1.5 border rounded text-sm"><option>CA</option><option>NY</option><option>TX</option></select><input type="text" defaultValue="93117" className="flex-1 px-2 py-1.5 border rounded text-sm" /></div></div>
                        <div className="flex gap-6"><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="w-4 h-4 rounded" />Employee Only</label><label className="flex items-center gap-2 text-sm"><input type="checkbox" className="w-4 h-4 rounded" />Inactivate</label></div>
                        <div className="grid grid-cols-3 gap-2 items-start"><label className="text-sm text-gray-600 pt-2">Notes</label><textarea className="col-span-2 px-2 py-1.5 border rounded text-sm h-24 resize-none"></textarea></div>
                      </div>
                      <div className="space-y-4">
                        <div className="grid grid-cols-3 gap-2 items-center"><label className="text-sm text-gray-600">Security Group</label><select defaultValue={drawerUsers[0].group} className="col-span-2 px-2 py-1.5 border rounded text-sm">{securityGroupsData.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}</select></div>
                        <div className="grid grid-cols-3 gap-2 items-center"><label className="text-sm text-gray-600">Status</label><select defaultValue={drawerUsers[0].status} className="col-span-2 px-2 py-1.5 border rounded text-sm"><option>Active</option><option>Inactive</option></select></div>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 flex justify-between"><span>Property Access</span><div className="relative"><Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3 h-3 text-teal-300" /><input type="text" placeholder="Search..." value={propertySearch} onChange={e => setPropertySearch(e.target.value)} className="w-28 pl-7 pr-2 py-1 rounded text-xs text-gray-800" /></div></div>
                          <div className="p-3 space-y-2 max-h-32 overflow-auto">{['Sunset Apartments', 'Oak Grove Complex', 'Marina View', 'Downtown Lofts'].filter(p => p.toLowerCase().includes(propertySearch.toLowerCase())).map(prop => (<label key={prop} className="flex items-center gap-2 cursor-pointer"><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /><span className="text-sm">{prop}</span></label>))}</div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2">Include in List</div>
                          <div className="p-3 space-y-2">{['Work Order Labor', 'Inspector', 'Caseworker'].map(item => (<label key={item} className="flex items-center justify-between"><span className="text-sm text-gray-600">{item}</span><input type="checkbox" className="w-4 h-4 rounded" /></label>))}</div>
                        </div>
                        <div className="border rounded-lg overflow-hidden">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2">User Defined Fields</div>
                          <div className="p-3 space-y-2">{['Action Date', 'Action Notes', 'Client Name', 'Employee ID'].map(field => (<div key={field} className="flex items-center justify-between gap-2"><label className="text-sm text-gray-600">{field}</label><input type="text" className="w-32 px-2 py-1 border rounded text-sm" /></div>))}</div>
                        </div>
                      </div>
                    </div>
                  )}
                  {userDrawerTab === 'settings' && (
                    <div className="space-y-5">
                      {isMultiUser && <div className="flex items-center gap-2 text-sm text-gray-600 mb-4"><Users className="w-4 h-4" />Editing {drawerUsers.length} users</div>}
                      <h4 className="text-sm font-medium">User Settings</h4>
                      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Access to Past Periods</label><input type="number" defaultValue="999" className="w-16 px-2 py-1 border rounded text-sm text-center" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Bypass Leasing Week security</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Access to Future Periods</label><input type="number" defaultValue="999" className="w-16 px-2 py-1 border rounded text-sm text-center" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View payroll trans</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View all financial batches</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View all conductor reports</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">View secured attachments</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Post to control accounts</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Override Property Account Security</label><input type="checkbox" defaultChecked className="w-4 h-4 rounded" /></div>
                        <div className="flex items-center justify-between"><label className="text-xs text-gray-600">Interface User</label><input type="checkbox" className="w-4 h-4 rounded" /></div>
                      </div>
                    </div>
                  )}
                  {userDrawerTab === 'programRights' && (
                    <div>
                      {isMultiUser && <div className="flex items-center gap-2 text-sm text-gray-600 mb-4"><Users className="w-4 h-4" />Editing {drawerUsers.length} users</div>}
                      <div className="space-y-1">{[{ name: 'Property Mgmt.', checked: true }, { name: 'Construction', checked: false }, { name: 'Maintenance', checked: true }, { name: 'Affordable', checked: true }, { name: 'B&F or Advanced Budget', checked: false }, { name: 'Investment Management', checked: true }, { name: 'Commercial', checked: true }].map((item, idx) => (<div key={item.name} className={`flex items-center justify-between p-3 ${idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}><span className="text-sm">{item.name}</span><input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded" /></div>))}</div>
                    </div>
                  )}
                </div>
              </>
            )}
            <div className="px-6 py-4 border-t flex gap-3 shrink-0">
              {hasChanges && <button onClick={handleReset} className="px-4 py-2 border rounded-lg text-sm flex items-center gap-2"><Undo2 className="w-4 h-4" />Reset</button>}
              <div className="flex-1" />
              <button onClick={closeDrawer} className="px-4 py-2 border rounded-lg text-sm">Cancel</button>
              <button onClick={handleSave} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm flex items-center gap-2">{hasChanges && <span className="w-2 h-2 bg-white rounded-full" />}Save Changes</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
