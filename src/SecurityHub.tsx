import { useState } from 'react';
import { Search, X, Users, Shield, Plus, Trash2, Check, FileText, BarChart3, Star, User, Settings, Eye, Clock, Database } from 'lucide-react';

// ════ ROLE CATALOG ════════════════════════════════════════════════════
// Mirrors the actual Elevate role table structure: role, menu, product, licensed, type
const ROLE_CATALOG = [
  { id: 1, name: "Condo Board Member", menu: "Voyager 8 Board Member", product: "Voyager 8 Condo", licensed: true, type: "Global" },
  { id: 2, name: "Voyager 8 Commercial", menu: "Voyager 8 Commercial", product: "Voyager 8 Commercial", licensed: true, type: "Global" },
  { id: 3, name: "Voyager 8 Commercial - Accounting", menu: "Voyager 8 Commercial", product: "Voyager 8 Commercial", licensed: true, type: "Global" },
  { id: 4, name: "Voyager 8 Commercial - Lease Admin", menu: "Voyager 8 Commercial", product: "Voyager 8 Commercial", licensed: true, type: "Global" },
  { id: 5, name: "Voyager 8 Condo", menu: "Voyager 8 Condo new", product: "Voyager 8 Condo", licensed: true, type: "Global" },
  { id: 6, name: "Voyager 8 CRM IQ - Admin", menu: "Voyager 8 CRM IQ - Admin", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 7, name: "Voyager 8 CRM IQ - Community Manager", menu: "Voyager 8 CRM IQ - Community Manager", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 8, name: "Voyager 8 CRM IQ - Leasing", menu: "Voyager 8 CRM IQ - Leasing", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 9, name: "Voyager 8 CRM IQ - Prospecting", menu: "Voyager 8 CRM IQ - Prospecting", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 10, name: "Voyager 8 CRM IQ - Renewal Manager", menu: "Voyager 8 CRM IQ - Renewal Manager", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 11, name: "Voyager 8 New York", menu: "Voyager 8 New York", product: "CRM IQ New York Net", licensed: true, type: "Global" },
  { id: 12, name: "Voyager 8 Residential", menu: "Voyager 8 Residential", product: "Res Manager", licensed: true, type: "Global" },
  { id: 13, name: "Voyager 8 Residential - Accounting", menu: "Voyager 8 Residential - Accounting", product: "Res Manager", licensed: true, type: "Global" },
  { id: 14, name: "Voyager 8 Residential - Accounts Payable", menu: "Voyager 8 Res - AP", product: "Res Manager", licensed: true, type: "Global" },
  { id: 15, name: "Voyager 8 Residential - Community Manager", menu: "Voyager 8 Res - CM", product: "Res Manager", licensed: true, type: "Global" },
  { id: 16, name: "Voyager 8 Residential - Leasing", menu: "Voyager 8 Res - Leasing", product: "Res Manager", licensed: true, type: "Global" },
  { id: 17, name: "Voyager 8 Residential - Maintenance", menu: "Voyager 8 Res - Maintenance", product: "Res Manager", licensed: true, type: "Global" },
  { id: 18, name: "Voyager 8 - Finance", menu: "Voyager 8 Finance", product: "Voyager 8 Finance", licensed: true, type: "Global" },
  { id: 19, name: "Voyager 8 - Reporting Only", menu: "Voyager 8 Reporting", product: "Voyager 8 Base", licensed: false, type: "Global" },
  { id: 20, name: "Voyager 8 Affordable Housing", menu: "Voyager 8 Affordable Housing", product: "Affordable Housing", licensed: false, type: "Global" },
  { id: 21, name: "crmiqnet", menu: "CRM IQ Net", product: "CRM IQ NET", licensed: true, type: "Global" },
  { id: 22, name: "Revenue IQ - Manager", menu: "Revenue IQ Manager", product: "Revenue IQ", licensed: true, type: "Global" },
  { id: 23, name: "Revenue IQ - Executive", menu: "Revenue IQ Executive", product: "Revenue IQ", licensed: true, type: "Global" },
  { id: 24, name: "Forecast IQ - Admin", menu: "Forecast IQ Admin", product: "Forecast IQ", licensed: true, type: "Global" },
  { id: 25, name: "Forecast IQ - Leasing", menu: "Forecast IQ Leasing", product: "Forecast IQ", licensed: true, type: "Global" },
  { id: 26, name: "AR Manager", menu: "AR Manager", product: "AR IQ", licensed: true, type: "Global" },
  { id: 27, name: "P2P - Accounts Payable", menu: "P2P AP", product: "P2P", licensed: true, type: "Global" },
];

// Helper to get role ID by name
const getRoleIdByName = (name: string) => ROLE_CATALOG.find(r => r.name === name)?.id;

// ════ SECURITY GROUPS ════════════════════════════════════════════════════
const securityGroups = [
  { id: 1, name: "Residential Manager", code: "resmgr", description: "Property management staff", userCount: 42, properties: "All", lastModified: "2024-01-15",
    existingElevateRoles: ["Revenue IQ - Manager", "Forecast IQ - Admin", "AR Manager"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential"), enabled: true, isDefault: true },
      { roleId: getRoleIdByName("Voyager 8 Residential - Accounting"), enabled: true, isDefault: false },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Admin"), enabled: true, isDefault: false },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Leasing"), enabled: true, isDefault: false },
    ]
  },
  { id: 2, name: "Accounting", code: "acctg", description: "Financial operations", userCount: 18, properties: "All", lastModified: "2024-01-14",
    existingElevateRoles: ["AR Manager", "P2P - Accounts Payable"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential - Accounting"), enabled: true, isDefault: true },
      { roleId: getRoleIdByName("Voyager 8 Residential - Accounts Payable"), enabled: true, isDefault: false },
      { roleId: getRoleIdByName("Voyager 8 - Finance"), enabled: true, isDefault: false },
    ]
  },
  { id: 3, name: "Leasing Agent", code: "lease", description: "Tenant applications & leases", userCount: 35, properties: "12", lastModified: "2024-01-13",
    existingElevateRoles: ["Forecast IQ - Leasing"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential - Leasing"), enabled: true, isDefault: true },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Leasing"), enabled: true, isDefault: false },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Prospecting"), enabled: true, isDefault: false },
    ]
  },
  { id: 4, name: "Maintenance Tech", code: "maint", description: "Work order management", userCount: 27, properties: "15", lastModified: "2024-01-12",
    existingElevateRoles: [],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential - Maintenance"), enabled: true, isDefault: true },
    ]
  },
  { id: 5, name: "Community Manager", code: "comgr", description: "Community operations", userCount: 14, properties: "8", lastModified: "2024-01-11",
    existingElevateRoles: ["Revenue IQ - Manager"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential - Community Manager"), enabled: true, isDefault: true },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Community Manager"), enabled: true, isDefault: false },
    ]
  },
  { id: 6, name: "Accounts Payable", code: "ap", description: "AP processing", userCount: 9, properties: "All", lastModified: "2024-01-10",
    existingElevateRoles: ["P2P - Accounts Payable", "AR Manager"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 Residential - Accounts Payable"), enabled: true, isDefault: true },
    ]
  },
  { id: 7, name: "CRM Admin", code: "crmadm", description: "CRM administration", userCount: 6, properties: "All", lastModified: "2024-01-09",
    existingElevateRoles: ["Forecast IQ - Admin"],
    roles: [
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Admin"), enabled: true, isDefault: true },
      { roleId: getRoleIdByName("Voyager 8 CRM IQ - Renewal Manager"), enabled: true, isDefault: false },
    ]
  },
  { id: 8, name: "Executive", code: "exec", description: "Executive leadership", userCount: 5, properties: "All", lastModified: "2024-01-08",
    existingElevateRoles: ["Revenue IQ - Executive", "Forecast IQ - Admin"],
    roles: []
  },
  { id: 9, name: "Read Only", code: "readonly", description: "Read-only access", userCount: 21, properties: "3", lastModified: "2024-01-07",
    existingElevateRoles: [],
    roles: []
  },
  { id: 10, name: "Commercial Manager", code: "comml", description: "Commercial property management", userCount: 11, properties: "5", lastModified: "2024-01-06",
    existingElevateRoles: ["Voyager 8 Commercial"],
    roles: []
  },
];

// ════ USERS ════════════════════════════════════════════════════
const users = [
  // Residential Manager (group 1)
  { id: 101, name: 'Alice Chen', email: 'achen@acme.com', group: 'Residential Manager', properties: 'All', status: 'Active', lastLogin: '3/1/2026 09:12 AM', existingRoles: ['Revenue IQ - Manager', 'AR Manager'] },
  { id: 102, name: 'Brian Torres', email: 'btorres@acme.com', group: 'Residential Manager', properties: 'All', status: 'Active', lastLogin: '3/2/2026 11:30 AM', existingRoles: ['Revenue IQ - Manager', 'Forecast IQ - Admin'] },
  { id: 103, name: 'Carol Smith', email: 'csmith@acme.com', group: 'Residential Manager', properties: 'All', status: 'Active', lastLogin: '2/28/2026 03:45 PM', existingRoles: ['AR Manager'] },
  { id: 104, name: 'David Kim', email: 'dkim@acme.com', group: 'Residential Manager', properties: 'All', status: 'Active', lastLogin: '3/3/2026 08:00 AM', existingRoles: ['Revenue IQ - Manager', 'AR Manager', 'P2P - Accounts Payable'] },
  { id: 105, name: 'Evelyn Park', email: 'epark@acme.com', group: 'Residential Manager', properties: 'All', status: 'Active', lastLogin: '3/1/2026 02:15 PM', existingRoles: [] },
  // Accounting (group 2)
  { id: 201, name: 'Frank Lee', email: 'flee@acme.com', group: 'Accounting', properties: 'All', status: 'Active', lastLogin: '3/2/2026 10:00 AM', existingRoles: ['AR Manager', 'P2P - Accounts Payable'] },
  { id: 202, name: 'Grace Huang', email: 'ghuang@acme.com', group: 'Accounting', properties: 'All', status: 'Active', lastLogin: '3/1/2026 04:30 PM', existingRoles: ['P2P - Accounts Payable'] },
  { id: 203, name: 'Henry Wu', email: 'hwu@acme.com', group: 'Accounting', properties: 'All', status: 'Active', lastLogin: '2/27/2026 09:00 AM', existingRoles: ['AR Manager'] },
  // Leasing Agent (group 3)
  { id: 301, name: 'Iris Nakamura', email: 'inakamura@acme.com', group: 'Leasing Agent', properties: '12', status: 'Active', lastLogin: '3/3/2026 10:45 AM', existingRoles: ['Forecast IQ - Leasing'] },
  { id: 302, name: 'James Ortiz', email: 'jortiz@acme.com', group: 'Leasing Agent', properties: '12', status: 'Active', lastLogin: '3/2/2026 01:00 PM', existingRoles: [] },
  { id: 303, name: 'Karen Patel', email: 'kpatel@acme.com', group: 'Leasing Agent', properties: '12', status: 'Active', lastLogin: '3/1/2026 11:20 AM', existingRoles: ['Forecast IQ - Leasing'] },
  { id: 304, name: 'Liam Brown', email: 'lbrown@acme.com', group: 'Leasing Agent', properties: '12', status: 'Active', lastLogin: '3/3/2026 08:30 AM', existingRoles: [] },
  // Maintenance Tech (group 4)
  { id: 401, name: 'Mike Johnson', email: 'mjohnson@acme.com', group: 'Maintenance Tech', properties: '15', status: 'Active', lastLogin: '3/2/2026 07:00 AM', existingRoles: [] },
  { id: 402, name: 'Nancy Davis', email: 'ndavis@acme.com', group: 'Maintenance Tech', properties: '15', status: 'Active', lastLogin: '3/1/2026 06:45 AM', existingRoles: [] },
  { id: 403, name: 'Oscar Reyes', email: 'oreyes@acme.com', group: 'Maintenance Tech', properties: '15', status: 'Inactive', lastLogin: '2/25/2026 08:00 AM', existingRoles: [] },
  // Community Manager (group 5)
  { id: 501, name: 'Paula White', email: 'pwhite@acme.com', group: 'Community Manager', properties: '8', status: 'Active', lastLogin: '3/3/2026 09:00 AM', existingRoles: ['Revenue IQ - Manager'] },
  { id: 502, name: 'Quinn Hall', email: 'qhall@acme.com', group: 'Community Manager', properties: '8', status: 'Active', lastLogin: '3/2/2026 03:00 PM', existingRoles: ['Revenue IQ - Manager', 'Forecast IQ - Admin'] },
  // Accounts Payable (group 6)
  { id: 601, name: 'Rachel Green', email: 'rgreen@acme.com', group: 'Accounts Payable', properties: 'All', status: 'Active', lastLogin: '3/3/2026 10:00 AM', existingRoles: ['P2P - Accounts Payable', 'AR Manager'] },
  { id: 602, name: 'Sam Carter', email: 'scarter@acme.com', group: 'Accounts Payable', properties: 'All', status: 'Active', lastLogin: '3/1/2026 02:00 PM', existingRoles: ['P2P - Accounts Payable'] },
  // CRM Admin (group 7)
  { id: 701, name: 'Tina Lewis', email: 'tlewis@acme.com', group: 'CRM Admin', properties: 'All', status: 'Active', lastLogin: '3/2/2026 01:30 PM', existingRoles: ['Forecast IQ - Admin'] },
  { id: 702, name: 'Uma Singh', email: 'usingh@acme.com', group: 'CRM Admin', properties: 'All', status: 'Active', lastLogin: '3/3/2026 11:00 AM', existingRoles: ['Forecast IQ - Admin', 'Revenue IQ - Manager'] },
  // Executive (group 8)
  { id: 801, name: 'Victor Ross', email: 'vross@acme.com', group: 'Executive', properties: 'All', status: 'Active', lastLogin: '3/3/2026 12:00 PM', existingRoles: ['Revenue IQ - Executive', 'Forecast IQ - Admin'] },
  { id: 802, name: 'Wendy Chang', email: 'wchang@acme.com', group: 'Executive', properties: 'All', status: 'Active', lastLogin: '3/2/2026 09:45 AM', existingRoles: ['Revenue IQ - Executive'] },
  // Read Only (group 9)
  { id: 901, name: 'Xander Reed', email: 'xreed@acme.com', group: 'Read Only', properties: '3', status: 'Active', lastLogin: '3/1/2026 10:00 AM', existingRoles: [] },
  { id: 902, name: 'Yara Pinto', email: 'ypinto@acme.com', group: 'Read Only', properties: '3', status: 'Active', lastLogin: '3/2/2026 08:00 AM', existingRoles: [] },
  { id: 903, name: 'Zoe Adams', email: 'zadams@acme.com', group: 'Read Only', properties: '3', status: 'Inactive', lastLogin: '2/28/2026 04:00 PM', existingRoles: [] },
  // Commercial Manager (group 10)
  { id: 1001, name: 'Aaron Hill', email: 'ahill@acme.com', group: 'Commercial Manager', properties: '5', status: 'Active', lastLogin: '3/3/2026 07:30 AM', existingRoles: ['Voyager 8 Commercial'] },
  { id: 1002, name: 'Beth Moore', email: 'bmoore@acme.com', group: 'Commercial Manager', properties: '5', status: 'Active', lastLogin: '3/2/2026 10:30 AM', existingRoles: ['Voyager 8 Commercial'] },
];

// Use ROLE_CATALOG as the master list (replacing old rolesMaster)
const rolesMaster = ROLE_CATALOG;

const permissionsData = [
  { id: 1, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: null, licensed: true, shared: false },
  { id: 2, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Add Attachment', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 3, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Adjust Bank Reconciliation Button', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 4, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Bank Reconciliation Upload', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 5, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Delete Attachment', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 6, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Post Bank Reconciliation Button', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 7, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Reconciliation Report', access: 'No Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: 1, licensed: true, shared: false },
  { id: 8, description: 'Analytics Dashboard', access: 'Access', programType: 'Analytics', isNew: true, parentId: null, licensed: true, shared: false },
  { id: 9, description: 'Campaign Manager', access: 'Access', programType: 'Marketing', isNew: false, parentId: null, licensed: true, shared: false },
  { id: 10, description: 'Data Export', access: 'No Access', programType: 'Core', isNew: false, parentId: null, licensed: true, shared: false },
  { id: 11, description: 'Resident Portal>Messages', access: 'Access', programType: 'Role - Voyager 8 Residential Accounting', isNew: false, parentId: null, licensed: true, shared: false },
  { id: 12, description: 'Resident Portal>Payments', access: 'Access', programType: 'Core', isNew: true, parentId: null, licensed: true, shared: false },
  // Element Access permissions
  { id: 13, description: 'Hold Charge toggle on Unpaid Charges screen on payers', access: 'Access', programType: 'Element Access - ARManagerNET A13', isNew: false, parentId: null, licensed: true, shared: true },
  { id: 14, description: 'Ability to add marketing accounts', access: 'Access', programType: 'Element Access - Marketing IQ', isNew: false, parentId: null, licensed: true, shared: true },
  { id: 15, description: 'Ability to add marketing accounts from CPD', access: 'Access', programType: 'Element Access - Marketing IQ', isNew: false, parentId: null, licensed: true, shared: true },
  { id: 16, description: 'Ability to map a marketing source to a vendor', access: 'Access', programType: 'Element Access - Marketing IQ', isNew: false, parentId: null, licensed: true, shared: true },
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

const auditTablesData = ['Property', 'Tenant', 'Bank', 'Vendor', 'Owner', 'AchData', 'Exchange Rate', 'Customer', 'Unit', 'Lease'];

const auditLogData = [
  { id: 1, auditTable: 'property', code: 'sunset', auditField: 'Code', oldValue: '', newValue: 'sunset', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 2, auditTable: 'property', code: 'sunset', auditField: 'Address1', oldValue: '', newValue: 'Sunset Apartments', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 3, auditTable: 'property', code: 'sunset', auditField: 'Address2', oldValue: '', newValue: '123 Main Street', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 4, auditTable: 'property', code: 'sunset', auditField: 'City', oldValue: '', newValue: 'Los Angeles', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 5, auditTable: 'property', code: 'sunset', auditField: 'State', oldValue: '', newValue: 'CA', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 6, auditTable: 'property', code: 'sunset', auditField: 'ZipCode', oldValue: '', newValue: '90001', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 7, auditTable: 'property', code: 'sunset', auditField: 'Residential', oldValue: '', newValue: '1', date: '02/02/2026', time: '10:43AM', action: 'Created', user: 'schen@company.com' },
  { id: 8, auditTable: 'property', code: 'oakgrove', auditField: 'Code', oldValue: '', newValue: 'oakgrove', date: '02/01/2026', time: '02:30PM', action: 'Created', user: 'mjohnson@company.com' },
  { id: 9, auditTable: 'property', code: 'oakgrove', auditField: 'Address1', oldValue: '', newValue: 'Oak Grove Complex', date: '02/01/2026', time: '02:30PM', action: 'Created', user: 'mjohnson@company.com' },
  { id: 10, auditTable: 'property', code: 'oakgrove', auditField: 'City', oldValue: '', newValue: 'San Diego', date: '02/01/2026', time: '02:30PM', action: 'Created', user: 'mjohnson@company.com' },
  { id: 11, auditTable: 'tenant', code: 't001', auditField: 'Name', oldValue: 'John Smith', newValue: 'John A. Smith', date: '02/01/2026', time: '09:15AM', action: 'Modified', user: 'mjohnson@company.com' },
  { id: 12, auditTable: 'tenant', code: 't002', auditField: 'Email', oldValue: '', newValue: 'tenant@email.com', date: '02/01/2026', time: '11:30AM', action: 'Created', user: 'rbrown@company.com' },
  { id: 13, auditTable: 'tenant', code: 't001', auditField: 'Phone', oldValue: '555-1234', newValue: '555-5678', date: '01/31/2026', time: '03:20PM', action: 'Modified', user: 'rbrown@company.com' },
  { id: 14, auditTable: 'bank', code: 'bnk001', auditField: 'AccountNumber', oldValue: '****1234', newValue: '****5678', date: '01/31/2026', time: '02:45PM', action: 'Modified', user: 'edavis@company.com' },
  { id: 15, auditTable: 'bank', code: 'bnk001', auditField: 'RoutingNumber', oldValue: '****4321', newValue: '****8765', date: '01/31/2026', time: '02:46PM', action: 'Modified', user: 'edavis@company.com' },
  { id: 16, auditTable: 'vendor', code: 'v100', auditField: 'Status', oldValue: 'Active', newValue: 'Inactive', date: '01/30/2026', time: '04:20PM', action: 'Modified', user: 'jwilson@company.com' },
  { id: 17, auditTable: 'vendor', code: 'v101', auditField: 'Name', oldValue: '', newValue: 'ABC Maintenance Co', date: '01/30/2026', time: '10:15AM', action: 'Created', user: 'jwilson@company.com' },
  { id: 18, auditTable: 'owner', code: 'own001', auditField: 'Email', oldValue: 'old@email.com', newValue: 'new@email.com', date: '01/29/2026', time: '11:00AM', action: 'Modified', user: 'awhite@company.com' },
];

// Security Analytics Report Data
const securityAnalyticsReports = ['Menus By Group', 'Login Attempt', 'Permission Descriptions', 'Permission Exception', 'SOX Users', 'User Monitor'];

const loginAttemptData = [
  { id: 1, userName: 'schen', ipAddress: '192.168.1.100', webserver: 'WEB01', loginDate: '01/15/2026 08:30:00 AM', result: 'SUCCESS' },
  { id: 2, userName: 'schen', ipAddress: '192.168.1.100', webserver: 'WEB01', loginDate: '01/14/2026 09:15:22 AM', result: 'SUCCESS' },
  { id: 3, userName: 'mjohnson', ipAddress: '192.168.1.101', webserver: 'WEB01', loginDate: '01/14/2026 08:45:00 AM', result: 'SUCCESS' },
  { id: 4, userName: 'mjohnson', ipAddress: '192.168.1.101', webserver: 'WEB01', loginDate: '01/14/2026 08:44:30 AM', result: 'FAILED' },
  { id: 5, userName: 'edavis', ipAddress: '192.168.1.102', webserver: 'WEB01', loginDate: '01/15/2026 07:55:11 AM', result: 'SUCCESS' },
  { id: 6, userName: 'jwilson', ipAddress: '192.168.1.103', webserver: 'WEB02', loginDate: '01/13/2026 10:48:36 AM', result: 'SUCCESS' },
  { id: 7, userName: 'landerson', ipAddress: '192.168.1.104', webserver: 'WEB02', loginDate: '01/01/2026 02:30:25 PM', result: 'SUCCESS' },
  { id: 8, userName: 'rbrown', ipAddress: '192.168.1.105', webserver: 'WEB01', loginDate: '01/15/2026 09:20:00 AM', result: 'SUCCESS' },
  { id: 9, userName: 'awhite', ipAddress: '192.168.1.106', webserver: 'WEB01', loginDate: '01/14/2026 08:00:00 AM', result: 'SUCCESS' },
  { id: 10, userName: 'dlee', ipAddress: '192.168.1.107', webserver: 'WEB02', loginDate: '01/10/2026 11:30:00 AM', result: 'SUCCESS' },
  { id: 11, userName: 'unknown', ipAddress: '10.0.0.55', webserver: 'WEB01', loginDate: '01/12/2026 03:45:00 AM', result: 'FAILED' },
  { id: 12, userName: 'schen', ipAddress: '10.0.0.55', webserver: 'WEB01', loginDate: '01/12/2026 03:45:30 AM', result: 'FAILED' },
];

const permissionDescriptionsData = [
  { id: 1, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation', programType: 'Role - Voyager 8 Residential Accounting', description: 'Access to Bank Reconciliation screen' },
  { id: 2, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Add Attachment', programType: 'Role - Voyager 8 Residential Accounting', description: 'Ability to add attachments to bank reconciliation' },
  { id: 3, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Adjust Bank Reconciliation Button', programType: 'Role - Voyager 8 Residential Accounting', description: 'Ability to adjust bank reconciliation entries' },
  { id: 4, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Bank Reconciliation Upload', programType: 'Role - Voyager 8 Residential Accounting', description: 'Ability to upload bank reconciliation files' },
  { id: 5, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Delete Attachment', programType: 'Role - Voyager 8 Residential Accounting', description: 'Ability to delete attachments from bank reconciliation' },
  { id: 6, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Post Bank Reconciliation Button', programType: 'Role - Voyager 8 Residential Accounting', description: 'Ability to post bank reconciliation entries' },
  { id: 7, securityToken: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Reconciliation Report', programType: 'Role - Voyager 8 Residential Accounting', description: 'Access to reconciliation report' },
  { id: 8, securityToken: 'Analytics Dashboard', programType: 'Analytics', description: 'Access to Analytics Dashboard' },
  { id: 9, securityToken: 'Campaign Manager', programType: 'Marketing', description: 'Access to Campaign Manager for marketing campaigns' },
  { id: 10, securityToken: 'Data Export', programType: 'Core', description: 'Ability to export data from the system' },
  { id: 11, securityToken: 'Resident Portal>Messages', programType: 'Role - Voyager 8 Residential Accounting', description: 'Access to resident portal messaging' },
  { id: 12, securityToken: 'Resident Portal>Payments', programType: 'Core', description: 'Access to resident portal payment processing' },
  { id: 13, securityToken: 'Hold Charge toggle on Unpaid Charges screen on payers', programType: 'Element Access - ARManagerNET A13', description: 'Ability to toggle hold charge on unpaid charges' },
  { id: 14, securityToken: 'Ability to add marketing accounts', programType: 'Element Access - Marketing IQ', description: 'Ability to add new marketing accounts' },
  { id: 15, securityToken: 'Ability to add marketing accounts from CPD', programType: 'Element Access - Marketing IQ', description: 'Ability to add marketing accounts from CPD' },
  { id: 16, securityToken: 'Ability to map a marketing source to a vendor', programType: 'Element Access - Marketing IQ', description: 'Ability to map marketing sources to vendors' },
];

const soxUsersData = [
  { id: 1, modifiedBy: 'schen', modified: 'mjohnson', action: 'Modify', dateModified: '01/30/2026', columnName: 'sEmail', columnDescription: 'Email', oldValue: 'mike.j@company.com', newValue: 'mjohnson@company.com' },
  { id: 2, modifiedBy: 'schen', modified: 'mjohnson', action: 'Modify', dateModified: '01/30/2026', columnName: 'hGroup', columnDescription: 'Security Group ID', oldValue: '3', newValue: '2' },
  { id: 3, modifiedBy: 'schen', modified: 'landerson', action: 'Modify', dateModified: '01/25/2026', columnName: 'bActive', columnDescription: 'Active Status', oldValue: 'true', newValue: 'false' },
  { id: 4, modifiedBy: 'awhite', modified: 'edavis', action: 'Modify', dateModified: '01/23/2026', columnName: 'hGroup', columnDescription: 'Security Group ID', oldValue: '4', newValue: '3' },
  { id: 5, modifiedBy: 'awhite', modified: 'jwilson', action: 'Modify', dateModified: '01/22/2026', columnName: 'hPropList', columnDescription: 'Property List', oldValue: '5', newValue: '10' },
  { id: 6, modifiedBy: 'schen', modified: 'rbrown', action: 'Modify', dateModified: '01/21/2026', columnName: 'bReadOnly', columnDescription: 'Readonly User', oldValue: 'true', newValue: 'false' },
  { id: 7, modifiedBy: 'schen', modified: 'dlee', action: 'Add', dateModified: '01/20/2026', columnName: 'N/A', columnDescription: 'New User', oldValue: 'n/a', newValue: 'n/a' },
  { id: 8, modifiedBy: 'awhite', modified: 'dlee', action: 'Modify', dateModified: '01/20/2026', columnName: 'hGroup', columnDescription: 'Security Group ID', oldValue: '1', newValue: '6' },
  { id: 9, modifiedBy: 'schen', modified: 'awhite', action: 'Modify', dateModified: '01/18/2026', columnName: 'bBat', columnDescription: 'View All financial batches', oldValue: 'false', newValue: 'true' },
];

const userMonitorData = [
  { id: 1, userCode: 'schen', userName: 'Sarah Chen', ipAddress: '192.168.1.100', webserver: 'WEB01', loginDate: '01/15/2026 08:30 AM', logoutDate: '01/15/2026 05:45 PM' },
  { id: 2, userCode: 'schen', userName: 'Sarah Chen', ipAddress: '192.168.1.100', webserver: 'WEB01', loginDate: '01/14/2026 09:15 AM', logoutDate: '01/14/2026 06:30 PM' },
  { id: 3, userCode: 'mjohnson', userName: 'Mike Johnson', ipAddress: '192.168.1.101', webserver: 'WEB01', loginDate: '01/14/2026 08:45 AM', logoutDate: '01/14/2026 04:30 PM' },
  { id: 4, userCode: 'edavis', userName: 'Emily Davis', ipAddress: '192.168.1.102', webserver: 'WEB01', loginDate: '01/15/2026 07:55 AM', logoutDate: '01/15/2026 05:00 PM' },
  { id: 5, userCode: 'jwilson', userName: 'James Wilson', ipAddress: '192.168.1.103', webserver: 'WEB02', loginDate: '01/13/2026 10:48 AM', logoutDate: '01/13/2026 06:15 PM' },
  { id: 6, userCode: 'rbrown', userName: 'Robert Brown', ipAddress: '192.168.1.105', webserver: 'WEB01', loginDate: '01/15/2026 09:20 AM', logoutDate: '01/15/2026 05:30 PM' },
  { id: 7, userCode: 'awhite', userName: 'Amanda White', ipAddress: '192.168.1.106', webserver: 'WEB01', loginDate: '01/14/2026 08:00 AM', logoutDate: '01/14/2026 06:00 PM' },
  { id: 8, userCode: 'dlee', userName: 'David Lee', ipAddress: '192.168.1.107', webserver: 'WEB02', loginDate: '01/10/2026 11:30 AM', logoutDate: '01/10/2026 03:45 PM' },
  { id: 9, userCode: 'landerson', userName: 'Lisa Anderson', ipAddress: '192.168.1.104', webserver: 'WEB02', loginDate: '01/01/2026 02:30 PM', logoutDate: '01/01/2026 04:00 PM' },
];

const databasesData = [
  { id: 1, code: 'B', name: 'Blue Moon V3 Temp', type: 'Temp' },
  { id: 2, code: 'F', name: 'Flex Temp', type: 'Temp' },
  { id: 3, code: 'L', name: 'Live', type: 'Production' },
  { id: 4, code: 'T', name: 'Test', type: 'Test' },
  { id: 5, code: 'Y', name: 'Yardi Test', type: 'Test' },
];

const menusByGroupData = [
  { id: 1, menuCaption: 'Dashboard', menuUrl: '/dashboard', menuSet: 'Main' },
  { id: 2, menuCaption: 'Properties', menuUrl: '/properties', menuSet: 'Main' },
  { id: 3, menuCaption: 'Tenants', menuUrl: '/tenants', menuSet: 'Main' },
  { id: 4, menuCaption: 'Leasing', menuUrl: '/leasing', menuSet: 'Main' },
  { id: 5, menuCaption: 'Maintenance', menuUrl: '/maintenance', menuSet: 'Main' },
  { id: 6, menuCaption: 'Accounting', menuUrl: '/accounting', menuSet: 'Finance' },
  { id: 7, menuCaption: 'Accounts Payable', menuUrl: '/ap', menuSet: 'Finance' },
  { id: 8, menuCaption: 'Accounts Receivable', menuUrl: '/ar', menuSet: 'Finance' },
  { id: 9, menuCaption: 'Reports', menuUrl: '/reports', menuSet: 'Reports' },
  { id: 10, menuCaption: 'Financial Reports', menuUrl: '/reports/financial', menuSet: 'Reports' },
  { id: 11, menuCaption: 'User Management', menuUrl: '/admin/users', menuSet: 'Admin' },
  { id: 12, menuCaption: 'Security Groups', menuUrl: '/admin/groups', menuSet: 'Admin' },
];

const permissionExceptionData = [
  { id: 1, progName: 'propertylist.aspx', securityToken: 'PR-Admin-Admin', permissionType: 'PR-Admin-Access', userCode: 'schen@company.com', userName: 'Sarah Chen', securityGroup: 'Admin', permissionException: 'Access to Admin Section' },
  { id: 2, progName: 'propertylist.aspx', securityToken: 'PR-Admin-Admin', permissionType: 'PR-Admin-Access', userCode: 'awhite@company.com', userName: 'Amanda White', securityGroup: 'Admin', permissionException: 'Access to Admin Section' },
  { id: 3, progName: 'financials.aspx', securityToken: 'FIN-Reports', permissionType: 'FIN-Access', userCode: 'mjohnson@company.com', userName: 'Mike Johnson', securityGroup: 'Property Manager', permissionException: 'Access to Financial Reports' },
  { id: 4, progName: 'residentportal.aspx', securityToken: 'Resident-Admin', permissionType: 'Resident-Access', userCode: 'rbrown@company.com', userName: 'Robert Brown', securityGroup: 'Leasing Agent', permissionException: 'Access to Resident Admin' },
  { id: 5, progName: 'workorders.aspx', securityToken: 'WO-Create', permissionType: 'WO-Access', userCode: 'jwilson@company.com', userName: 'James Wilson', securityGroup: 'Maintenance', permissionException: 'Create Work Orders' },
  { id: 6, progName: 'accounting.aspx', securityToken: 'ACC-GL', permissionType: 'ACC-Access', userCode: 'edavis@company.com', userName: 'Emily Davis', securityGroup: 'Accountant', permissionException: 'Access to G/L Entries' },
  { id: 7, progName: 'reports.aspx', securityToken: 'RPT-View', permissionType: 'RPT-Access', userCode: 'dlee@company.com', userName: 'David Lee', securityGroup: 'View Only', permissionException: 'View Reports Only' },
];

export default function SecurityHub() {
  const [activeTab, setActiveTab] = useState('groups');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterGroup, setFilterGroup] = useState('All');
  const [filterStatus, setFilterStatus] = useState('All');
  const [groupsStatFilter, setGroupsStatFilter] = useState('All'); // For stats dashboard: 'All', 'Configured', 'NoRoles'
  const [bulkDefaultRole, setBulkDefaultRole] = useState(''); // For bulk actions toolbar
  const [groupSearchTerm, setGroupSearchTerm] = useState(''); // Search within groups table
  const [userSearchTerm, setUserSearchTerm] = useState(''); // Global user search
  const [userSearchFocused, setUserSearchFocused] = useState(false); // Track if user search is focused
  const [drawer, setDrawer] = useState({ open: false, type: null, data: null });
  const [previousDrawer, setPreviousDrawer] = useState<{ open: boolean; type: string | null; data: any; tab?: string } | null>(null);
  const [drawerTab, setDrawerTab] = useState('users');
  const [drawerLayer, setDrawerLayer] = useState(1); // 1: Roles/Users, 2: Settings (Permissions, Accounts, etc.)

  // Database connection state
  const [isProductionDb, setIsProductionDb] = useState(true);
  const [connectedDbName, setConnectedDbName] = useState('PROD_NORTHEAST_01');

  // Clone Group Modal state
  const [cloneModalOpen, setCloneModalOpen] = useState(false);
  const [cloneSourceGroup, setCloneSourceGroup] = useState('');
  const [cloneType, setCloneType] = useState('New Group');
  const [cloneTargetGroup, setCloneTargetGroup] = useState('');

  // Add User Modal state
  const [addUserModalOpen, setAddUserModalOpen] = useState(false);
  const [addUserPropertyFilter, setAddUserPropertyFilter] = useState('All');
  const [addUserGroupFilter, setAddUserGroupFilter] = useState('All');
  const [addUserSearch, setAddUserSearch] = useState('');
  const [selectedUsersToAdd, setSelectedUsersToAdd] = useState<number[]>([]);
  const [clonePermissions, setClonePermissions] = useState(true);
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
  const [originalPermissions] = useState(() => JSON.parse(JSON.stringify(permissionsData))); // Deep copy for change tracking
  const [groupsList, setGroupsList] = useState(securityGroups);
  const [originalGroups] = useState(() => JSON.parse(JSON.stringify(securityGroups))); // Deep copy for change tracking
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [rolesSearch, setRolesSearch] = useState('');
  const initialBooks = [
    { id: 1, name: 'All', enabled: true },
    { id: 2, name: 'Cash', enabled: true },
    { id: 3, name: 'Accrual', enabled: true },
    { id: 4, name: 'Elim', enabled: false },
    { id: 5, name: 'Adjust', enabled: false },
    { id: 6, name: 'History', enabled: true },
    { id: 7, name: 'TAX', enabled: false },
    { id: 8, name: 'GAAP', enabled: true },
  ];
  const [booksList, setBooksList] = useState(initialBooks);
  const [originalBooks] = useState(() => JSON.parse(JSON.stringify(initialBooks)));
  const [reportType, setReportType] = useState('Standard Reports');
  const [reportSearch, setReportSearch] = useState('');
  const [selectedReports, setSelectedReports] = useState({});

  const [propertySearch, setPropertySearch] = useState('');

  // Audit Analytics state
  const [selectedAuditTable, setSelectedAuditTable] = useState('Property');
  const [auditPropertyFilter, setAuditPropertyFilter] = useState('');
  const [auditTenantFilter, setAuditTenantFilter] = useState('');
  const [auditBankFilter, setAuditBankFilter] = useState('');
  const [auditVendorFilter, setAuditVendorFilter] = useState('');
  const [auditOwnerFilter, setAuditOwnerFilter] = useState('');
  const [auditCustomerFilter, setAuditCustomerFilter] = useState('');
  const [auditFromDate, setAuditFromDate] = useState('2026-02-01');
  const [auditToDate, setAuditToDate] = useState('2026-02-04');
  const [auditFromTime, setAuditFromTime] = useState('');
  const [auditToTime, setAuditToTime] = useState('');
  const [auditSortOn, setAuditSortOn] = useState('TranGroup');
  const [auditResults, setAuditResults] = useState(auditLogData);

  // Security Analytics state
  const [securityReport, setSecurityReport] = useState('Login Attempt');
  const [securityGroup, setSecurityGroup] = useState('admin');
  const [securityMenuSet, setSecurityMenuSet] = useState('');
  const [securityMenuCaption, setSecurityMenuCaption] = useState('');
  const [securityMenuUrl, setSecurityMenuUrl] = useState('');
  const [securityShowGrid, setSecurityShowGrid] = useState(false);
  const [securityShowUrl, setSecurityShowUrl] = useState(false);
  const [securityLoginDateFrom, setSecurityLoginDateFrom] = useState('');
  const [securityLoginDateTo, setSecurityLoginDateTo] = useState('');
  const [securityProgramType, setSecurityProgramType] = useState('');
  const [securitySort, setSecuritySort] = useState('Security Token');
  const [securityShowDescOnly, setSecurityShowDescOnly] = useState(false);
  const [securityModifiedBy, setSecurityModifiedBy] = useState('');
  const [securityDateModifiedFrom, setSecurityDateModifiedFrom] = useState('');
  const [securityDateModifiedTo, setSecurityDateModifiedTo] = useState('');
  const [securityUserCode, setSecurityUserCode] = useState('');
  const [securityContact, setSecurityContact] = useState('');

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

  const filteredGroups = groupsList.filter(g => {
    const searchLower = groupSearchTerm.toLowerCase();
    const matchesSearch = groupSearchTerm === '' ||
      g.name.toLowerCase().includes(searchLower) ||
      g.code.toLowerCase().includes(searchLower) ||
      g.description.toLowerCase().includes(searchLower);
    const roleCount = g.roles?.filter(r => r.enabled).length || 0;
    const matchesStatFilter = groupsStatFilter === 'All' ||
      (groupsStatFilter === 'Configured' && roleCount > 0) ||
      (groupsStatFilter === 'NoRoles' && roleCount === 0);
    return matchesSearch && matchesStatFilter;
  });

  // Calculate pending changes by comparing current state to original
  const pendingChanges = groupsList.map(group => {
    const original = originalGroups.find(g => g.id === group.id);
    if (!original) return null;

    const originalRoles = original.roles || [];
    const currentRoles = group.roles || [];

    // Check if roles have changed
    const originalEnabled = originalRoles.filter(r => r.enabled).map(r => r.roleId).sort();
    const currentEnabled = currentRoles.filter(r => r.enabled).map(r => r.roleId).sort();
    const rolesChanged = JSON.stringify(originalEnabled) !== JSON.stringify(currentEnabled);

    // Check if default role changed
    const originalDefault = originalRoles.find(r => r.isDefault)?.roleId;
    const currentDefault = currentRoles.find(r => r.isDefault)?.roleId;
    const defaultChanged = originalDefault !== currentDefault;

    if (rolesChanged || defaultChanged) {
      const addedRoles = currentEnabled.filter(id => !originalEnabled.includes(id));
      const removedRoles = originalEnabled.filter(id => !currentEnabled.includes(id));
      return {
        group,
        addedRoles: addedRoles.map(id => rolesMaster.find(r => r.id === id)?.name).filter(Boolean),
        removedRoles: removedRoles.map(id => rolesMaster.find(r => r.id === id)?.name).filter(Boolean),
        defaultChanged: defaultChanged ? {
          from: rolesMaster.find(r => r.id === originalDefault)?.name || 'None',
          to: rolesMaster.find(r => r.id === currentDefault)?.name || 'None'
        } : null,
        usersAffected: group.userCount
      };
    }
    return null;
  }).filter(Boolean);

  const hasPendingChanges = pendingChanges.length > 0;
  const totalUsersAffected = pendingChanges.reduce((sum, c) => sum + c.usersAffected, 0);

  // Reset all changes
  const resetAllChanges = () => {
    setGroupsList(JSON.parse(JSON.stringify(originalGroups)));
  };

  // Calculate pending permission changes
  const pendingPermissionChanges = permissionsList.filter((perm, idx) => {
    const original = originalPermissions[idx];
    return perm.enabled !== original.enabled;
  });

  // Calculate pending books changes
  const pendingBooksChanges = booksList.filter((book, idx) => {
    const original = originalBooks[idx];
    return book.enabled !== original.enabled;
  });

  const hasPendingPermissionChanges = pendingPermissionChanges.length > 0 || pendingBooksChanges.length > 0;

  // Reset permission changes
  const resetPermissionChanges = () => {
    setPermissionsList(JSON.parse(JSON.stringify(originalPermissions)));
    setBooksList(JSON.parse(JSON.stringify(originalBooks)));
  };

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
          <button onClick={() => { setActiveTab('audit'); }} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'audit' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <div className="flex items-center gap-2"><FileText className="w-4 h-4" />Audit Analytics</div>
          </button>
          <button onClick={() => { setActiveTab('securityAnalytics'); }} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${activeTab === 'securityAnalytics' ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700'}`}>
            <div className="flex items-center gap-2"><BarChart3 className="w-4 h-4" />Security Analytics</div>
          </button>
        </div>
      </div>

      {(activeTab !== 'audit' && activeTab !== 'securityAnalytics') && <div className="px-6 py-4 bg-white border-b">
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
          {activeTab === 'groups' && (
            <button
              onClick={() => setCloneModalOpen(true)}
              className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 flex items-center gap-2"
            >
              <Shield className="w-4 h-4" />Clone Group
            </button>
          )}
        </div>
      </div>}

      <div className="p-6">
        {activeTab === 'audit' ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Audit Table Analytic</h2>
              <div className="flex gap-6">
                {/* Audit Tables List */}
                <div className="w-40">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Audit Tables</label>
                  <select
                    multiple
                    size={8}
                    value={[selectedAuditTable]}
                    onChange={(e) => setSelectedAuditTable(e.target.value)}
                    className="w-full border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {auditTablesData.map(table => (
                      <option key={table} value={table} className="px-2 py-1">{table}</option>
                    ))}
                  </select>
                </div>

                {/* Filter Fields */}
                <div className="flex-1 grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Property</label>
                    <input type="text" value={auditPropertyFilter} onChange={(e) => setAuditPropertyFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-20">From Date</label>
                    <input type="date" value={auditFromDate} onChange={(e) => setAuditFromDate(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="text-sm text-gray-500">to</span>
                    <input type="date" value={auditToDate} onChange={(e) => setAuditToDate(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Tenant</label>
                    <input type="text" value={auditTenantFilter} onChange={(e) => setAuditTenantFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-20">From Time</label>
                    <input type="time" value={auditFromTime} onChange={(e) => setAuditFromTime(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                    <span className="text-sm text-gray-500">to</span>
                    <input type="time" value={auditToTime} onChange={(e) => setAuditToTime(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Bank</label>
                    <input type="text" value={auditBankFilter} onChange={(e) => setAuditBankFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-gray-600 w-20">Sort On</label>
                    <select value={auditSortOn} onChange={(e) => setAuditSortOn(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option value="TranGroup">TranGroup</option>
                      <option value="Date">Date</option>
                      <option value="User">User</option>
                      <option value="Action">Action</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Vendor</label>
                    <input type="text" value={auditVendorFilter} onChange={(e) => setAuditVendorFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-blue-600 underline cursor-pointer">User</span>
                    <span className="text-sm text-blue-600 underline cursor-pointer ml-4">Group</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Owner</label>
                    <input type="text" value={auditOwnerFilter} onChange={(e) => setAuditOwnerFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                  <div></div>
                  <div className="flex items-center gap-2">
                    <label className="text-sm text-blue-600 underline cursor-pointer w-20">Customer</label>
                    <input type="text" value={auditCustomerFilter} onChange={(e) => setAuditCustomerFilter(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500" />
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-2 w-24">
                  <button onClick={() => {
                    setAuditPropertyFilter(''); setAuditTenantFilter(''); setAuditBankFilter('');
                    setAuditVendorFilter(''); setAuditOwnerFilter(''); setAuditCustomerFilter('');
                    setAuditFromDate('2026-02-01'); setAuditToDate('2026-02-04');
                    setAuditFromTime(''); setAuditToTime('');
                  }} className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">Clear</button>
                  <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">Excel</button>
                  <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">PDF</button>
                  <button onClick={() => {
                    const filtered = auditLogData.filter(log =>
                      log.auditTable.toLowerCase() === selectedAuditTable.toLowerCase()
                    );
                    setAuditResults(filtered);
                  }} className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">Display</button>
                </div>
              </div>
            </div>

            {/* Results Table */}
            <div className="overflow-auto max-h-[500px]">
              <table className="w-full text-sm">
                <thead className="bg-gray-100 border-b sticky top-0">
                  <tr>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Audit Table</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Code</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Audit Field</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Old Value</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">New Value</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Date</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Time</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Action</th>
                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">User</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {auditResults.filter(log => log.auditTable.toLowerCase() === selectedAuditTable.toLowerCase()).map((log, idx) => (
                    <tr key={log.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                      <td className="px-3 py-2 text-gray-700">{log.auditTable}</td>
                      <td className="px-3 py-2 text-gray-700">{log.code}</td>
                      <td className="px-3 py-2 text-gray-700">{log.auditField}</td>
                      <td className="px-3 py-2 text-gray-500">{log.oldValue}</td>
                      <td className="px-3 py-2 text-blue-600">{log.newValue}</td>
                      <td className="px-3 py-2 text-gray-700">{log.date}</td>
                      <td className="px-3 py-2 text-gray-700">{log.time}</td>
                      <td className="px-3 py-2 text-gray-700">{log.action}</td>
                      <td className="px-3 py-2 text-gray-700">{log.user}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : activeTab === 'securityAnalytics' ? (
          <div className="bg-white rounded-xl border overflow-hidden">
            <div className="p-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Security Analytics</h2>
              <div className="flex gap-6">
                {/* Left side filters */}
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-gray-600 w-20">Report</label>
                      <select value={securityReport} onChange={(e) => setSecurityReport(e.target.value)} className="flex-1 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                        {securityAnalyticsReports.map(report => (
                          <option key={report} value={report}>{report}</option>
                        ))}
                      </select>
                    </div>

                    {/* Dynamic filters based on report type */}
                    {securityReport === 'Menus By Group' && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600 w-24">Menu Caption</label>
                          <input type="text" value={securityMenuCaption} onChange={(e) => setSecurityMenuCaption(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        </div>
                      </>
                    )}

                    {(securityReport === 'Login Attempt' || securityReport === 'User Monitor') && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-gray-600 w-24">Login Date</label>
                          <input type="date" value={securityLoginDateFrom} onChange={(e) => setSecurityLoginDateFrom(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                          <span className="text-sm text-gray-500">To</span>
                          <input type="date" value={securityLoginDateTo} onChange={(e) => setSecurityLoginDateTo(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        </div>
                      </>
                    )}

                    {securityReport === 'Permission Descriptions' && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-blue-600 underline cursor-pointer w-24">Program Type</label>
                          <input type="text" value={securityProgramType} onChange={(e) => setSecurityProgramType(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        </div>
                      </>
                    )}

                    {securityReport === 'SOX Users' && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-blue-600 underline cursor-pointer w-24">Modified By</label>
                          <input type="text" value={securityModifiedBy} onChange={(e) => setSecurityModifiedBy(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        </div>
                      </>
                    )}

                    {securityReport === 'Permission Exception' && (
                      <>
                        <div className="flex items-center gap-2">
                          <label className="text-sm text-blue-600 underline cursor-pointer w-24">Contact</label>
                          <input type="text" value={securityContact} onChange={(e) => setSecurityContact(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        </div>
                      </>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center gap-2">
                      <label className="text-sm text-blue-600 underline cursor-pointer w-20">Group</label>
                      <input type="text" value={securityGroup} onChange={(e) => setSecurityGroup(e.target.value)} className="flex-1 px-2 py-1.5 border rounded text-sm bg-blue-50" />
                    </div>

                    {securityReport === 'Menus By Group' && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 w-24">Menu URL</label>
                        <input type="text" value={securityMenuUrl} onChange={(e) => setSecurityMenuUrl(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                      </div>
                    )}

                    {securityReport === 'Permission Descriptions' && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 w-24">Sort</label>
                        <select value={securitySort} onChange={(e) => setSecuritySort(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm">
                          <option value="Security Token">Security Token</option>
                          <option value="Program Type">Program Type</option>
                          <option value="Description">Description</option>
                        </select>
                      </div>
                    )}

                    {securityReport === 'SOX Users' && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-gray-600 w-32">Date Modified From</label>
                        <input type="date" value={securityDateModifiedFrom} onChange={(e) => setSecurityDateModifiedFrom(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                        <span className="text-sm text-gray-500">To</span>
                        <input type="date" value={securityDateModifiedTo} onChange={(e) => setSecurityDateModifiedTo(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                      </div>
                    )}

                    {securityReport === 'User Monitor' && (
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-blue-600 underline cursor-pointer w-24">UserCode</label>
                        <input type="text" value={securityUserCode} onChange={(e) => setSecurityUserCode(e.target.value)} className="flex-1 px-2 py-1 border rounded text-sm" />
                      </div>
                    )}
                  </div>

                  {(securityReport === 'Menus By Group' || securityReport === 'Permission Descriptions') && (
                    <div className="grid grid-cols-2 gap-3 mt-3">
                      <div className="flex items-center gap-2">
                        <label className="text-sm text-blue-600 underline cursor-pointer w-20">Menu Set</label>
                        <input type="text" value={securityMenuSet} onChange={(e) => setSecurityMenuSet(e.target.value)} className="flex-1 px-2 py-1.5 border rounded text-sm" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Right side checkboxes and buttons */}
                <div className="flex flex-col gap-2">
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={securityShowGrid} onChange={(e) => setSecurityShowGrid(e.target.checked)} className="w-4 h-4 rounded" />
                    Show Grid
                  </label>
                  {securityReport === 'Menus By Group' && (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={securityShowUrl} onChange={(e) => setSecurityShowUrl(e.target.checked)} className="w-4 h-4 rounded" />
                      Show URL
                    </label>
                  )}
                  {securityReport === 'Permission Descriptions' && (
                    <label className="flex items-center gap-2 text-sm">
                      <input type="checkbox" checked={securityShowDescOnly} onChange={(e) => setSecurityShowDescOnly(e.target.checked)} className="w-4 h-4 rounded" />
                      Show Descriptions Only
                    </label>
                  )}
                </div>

                {/* Action buttons */}
                <div className="flex flex-col gap-2 w-24">
                  <button onClick={() => {
                    setSecurityGroup('admin'); setSecurityMenuSet(''); setSecurityMenuCaption('');
                    setSecurityMenuUrl(''); setSecurityShowGrid(false); setSecurityShowUrl(false);
                    setSecurityLoginDateFrom(''); setSecurityLoginDateTo('');
                    setSecurityProgramType(''); setSecuritySort('Security Token');
                    setSecurityShowDescOnly(false); setSecurityModifiedBy('');
                    setSecurityDateModifiedFrom(''); setSecurityDateModifiedTo('');
                    setSecurityUserCode(''); setSecurityContact('');
                  }} className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">Clear</button>
                  <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">PDF</button>
                  <button className="px-3 py-1.5 border rounded text-sm font-medium hover:bg-gray-100">Excel</button>
                  <button className="px-3 py-1.5 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700">Display</button>
                </div>
              </div>
            </div>

            {/* Results Table - changes based on report type */}
            <div className="overflow-auto max-h-[500px]">
              {securityReport === 'Login Attempt' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">UserName</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">IP Address</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Webserver</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Login Date</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Result</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {loginAttemptData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.userName}</td>
                        <td className="px-3 py-2">{row.ipAddress}</td>
                        <td className="px-3 py-2">{row.webserver}</td>
                        <td className="px-3 py-2">{row.loginDate}</td>
                        <td className="px-3 py-2">{row.result}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {securityReport === 'Permission Descriptions' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Security Token</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Program Type</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {permissionDescriptionsData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.securityToken}</td>
                        <td className="px-3 py-2">{row.programType}</td>
                        <td className="px-3 py-2">{row.description}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {securityReport === 'SOX Users' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Modified By</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Modified</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Action</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Date Modified</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Column Name</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Column Description</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Old Value</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">New Value</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {soxUsersData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.modifiedBy}</td>
                        <td className="px-3 py-2">{row.modified}</td>
                        <td className="px-3 py-2">{row.action}</td>
                        <td className="px-3 py-2">{row.dateModified}</td>
                        <td className="px-3 py-2">{row.columnName}</td>
                        <td className="px-3 py-2">{row.columnDescription}</td>
                        <td className="px-3 py-2 text-gray-500">{row.oldValue}</td>
                        <td className="px-3 py-2 text-blue-600">{row.newValue}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {securityReport === 'User Monitor' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">UserCode</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">UserName</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">IP Address</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Webserver</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Login Date</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Logout Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {userMonitorData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.userCode}</td>
                        <td className="px-3 py-2">{row.userName}</td>
                        <td className="px-3 py-2">{row.ipAddress}</td>
                        <td className="px-3 py-2">{row.webserver}</td>
                        <td className="px-3 py-2">{row.loginDate}</td>
                        <td className="px-3 py-2">{row.logoutDate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {securityReport === 'Menus By Group' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Menu Caption</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Menu URL</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Menu Set</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {menusByGroupData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.menuCaption}</td>
                        <td className="px-3 py-2">{row.menuUrl}</td>
                        <td className="px-3 py-2">{row.menuSet}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}

              {securityReport === 'Permission Exception' && (
                <table className="w-full text-sm">
                  <thead className="bg-gray-100 border-b sticky top-0">
                    <tr>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Prog Name</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Security Token</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Permission Type</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">UserCode</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">UserName</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Security Group</th>
                      <th className="text-left px-3 py-2 text-xs font-semibold text-gray-600">Permission Exception</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {permissionExceptionData.map((row, idx) => (
                      <tr key={row.id} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                        <td className="px-3 py-2">{row.progName}</td>
                        <td className="px-3 py-2">{row.securityToken}</td>
                        <td className="px-3 py-2">{row.permissionType}</td>
                        <td className="px-3 py-2">{row.userCode}</td>
                        <td className="px-3 py-2">{row.userName}</td>
                        <td className="px-3 py-2">{row.securityGroup}</td>
                        <td className="px-3 py-2">{row.permissionException}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        ) : activeTab === 'groups' ? (
          <>
            {/* Stats Dashboard */}
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:border-purple-400 ${groupsStatFilter === 'All' ? 'border-purple-600 bg-purple-50' : ''}`}
                onClick={() => setGroupsStatFilter('All')}
              >
                <div className="text-3xl font-bold text-purple-600">{groupsList.length}</div>
                <div className="text-sm text-gray-500">Total Security Groups</div>
              </div>
              <div
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:border-green-400 ${groupsStatFilter === 'Configured' ? 'border-green-600 bg-green-50' : ''}`}
                onClick={() => setGroupsStatFilter('Configured')}
              >
                <div className="text-3xl font-bold text-green-600">{groupsList.filter(g => (g.roles?.filter(r => r.enabled).length || 0) > 0).length}</div>
                <div className="text-sm text-gray-500">Configured</div>
              </div>
              <div
                className={`bg-white border rounded-lg p-4 cursor-pointer transition-all hover:border-red-400 ${groupsStatFilter === 'NoRoles' ? 'border-red-600 bg-red-50' : ''}`}
                onClick={() => setGroupsStatFilter('NoRoles')}
              >
                <div className="text-3xl font-bold text-red-600">{groupsList.filter(g => (g.roles?.filter(r => r.enabled).length || 0) === 0).length}</div>
                <div className="text-sm text-gray-500">No Roles Assigned</div>
              </div>
            </div>

          {/* Bulk Actions Toolbar */}
            <div className="bg-white rounded-xl border mb-4 p-4">
              <div className="flex items-center justify-between gap-4">
                {/* Left side - Search and Filter */}
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search groups..."
                      value={groupSearchTerm}
                      onChange={(e) => setGroupSearchTerm(e.target.value)}
                      className="pl-9 pr-4 py-2 border rounded-lg text-sm w-64 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <select
                    value={groupsStatFilter}
                    onChange={(e) => setGroupsStatFilter(e.target.value)}
                    className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="All">All Status</option>
                    <option value="Configured">Configured</option>
                    <option value="NoRoles">No Roles</option>
                  </select>

                  {/* Divider */}
                  <div className="w-px h-8 bg-gray-300" />

                  {/* Global User Search */}
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search users..."
                      value={userSearchTerm}
                      onChange={(e) => setUserSearchTerm(e.target.value)}
                      onFocus={() => setUserSearchFocused(true)}
                      onBlur={() => setTimeout(() => setUserSearchFocused(false), 200)}
                      className="pl-9 pr-4 py-2 border rounded-lg text-sm w-56 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    {/* User Search Results Dropdown */}
                    {userSearchFocused && userSearchTerm.length >= 2 && (() => {
                      const allUsers = groupsList.flatMap(g =>
                        (users.filter(u => u.group === g.name) || []).map(u => ({ ...u, groupId: g.id, groupName: g.name }))
                      );
                      const matchingUsers = allUsers.filter(u =>
                        u.name.toLowerCase().includes(userSearchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(userSearchTerm.toLowerCase())
                      ).slice(0, 8);

                      return matchingUsers.length > 0 ? (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50 max-h-80 overflow-auto">
                          <div className="px-3 py-2 bg-gray-50 border-b text-xs font-medium text-gray-500">
                            {matchingUsers.length} user{matchingUsers.length !== 1 ? 's' : ''} found
                          </div>
                          {matchingUsers.map(user => (
                            <div
                              key={`${user.groupId}-${user.id}`}
                              onClick={() => {
                                const group = groupsList.find(g => g.id === user.groupId);
                                if (group) {
                                  setPreviousDrawer(null);
                                  setDrawer({ open: true, type: 'group', data: group });
                                  setDrawerTab('users');
                                  setUserSearchTerm('');
                                }
                              }}
                              className="px-3 py-2 hover:bg-blue-50 cursor-pointer border-b last:border-b-0"
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                  {user.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">{user.name}</div>
                                  <div className="text-xs text-gray-500 truncate">{user.email}</div>
                                </div>
                                <div className="flex items-center gap-1 text-xs text-gray-400">
                                  <Shield className="w-3 h-3" />
                                  <span className="truncate max-w-24">{user.groupName}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="absolute top-full left-0 right-0 mt-1 bg-white border rounded-lg shadow-lg z-50">
                          <div className="px-3 py-4 text-center text-sm text-gray-500">
                            No users found matching "{userSearchTerm}"
                          </div>
                        </div>
                      );
                    })()}
                  </div>
                </div>

                {/* Right side - Bulk Actions */}
                <div className="flex items-center gap-3">
                  {selectedGroups.length > 0 ? (
                    <>
                      <span className="text-sm text-purple-700 font-medium">{selectedGroups.length} selected</span>
                      <select
                        value={bulkDefaultRole}
                        onChange={(e) => setBulkDefaultRole(e.target.value)}
                        className="px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 min-w-48"
                      >
                        <option value="">Set Default Role...</option>
                        {rolesMaster.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                      <button
                        onClick={() => {
                          if (bulkDefaultRole) {
                            const roleId = parseInt(bulkDefaultRole);
                            setGroupsList(prev => prev.map(g => {
                              if (!selectedGroups.includes(g.id)) return g;
                              let updatedRoles = g.roles?.map(r => ({ ...r, isDefault: r.roleId === roleId })) || [];
                              if (!updatedRoles.some(r => r.roleId === roleId)) {
                                updatedRoles.push({ roleId, enabled: true, isDefault: true });
                              }
                              return { ...g, roles: updatedRoles };
                            }));
                            setBulkDefaultRole('');
                          }
                        }}
                        disabled={!bulkDefaultRole}
                        className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Apply
                      </button>
                      <button
                        onClick={() => setSelectedGroups([])}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
                      >
                        Clear
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => setSelectedGroups(filteredGroups.map(g => g.id))}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
                      >
                        Select All
                      </button>
                      <button
                        onClick={() => {
                          const csv = [
                            ['Security Group', 'Code', 'Users', 'New V8 Roles', 'Default Role', 'Status'].join(','),
                            ...filteredGroups.map(g => {
                              const enabledRoles = g.roles?.filter(r => r.enabled) || [];
                              const defaultRoleConfig = enabledRoles.find(r => r.isDefault);
                              const defaultRole = defaultRoleConfig ? rolesMaster.find(rm => rm.id === defaultRoleConfig.roleId) : null;
                              return [
                                g.name,
                                g.code,
                                g.userCount,
                                enabledRoles.length,
                                defaultRole?.name || '',
                                enabledRoles.length > 0 ? 'Configured' : 'No Roles'
                              ].join(',');
                            })
                          ].join('\n');
                          const blob = new Blob([csv], { type: 'text/csv' });
                          const url = URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = 'security-groups.csv';
                          a.click();
                        }}
                        className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50 flex items-center gap-2"
                      >
                        <FileText className="w-4 h-4" />
                        Export CSV
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>

          <div className="bg-white rounded-xl border overflow-hidden">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="px-3 py-3 w-10">
                    <input
                      type="checkbox"
                      checked={selectedGroups.length === filteredGroups.length && filteredGroups.length > 0}
                      onChange={(e) => {
                        if (e.target.checked) {
                          setSelectedGroups(filteredGroups.map(g => g.id));
                        } else {
                          setSelectedGroups([]);
                        }
                      }}
                      className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                    />
                  </th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Security Group</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Code</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Users</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">New V8 Roles</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase" style={{minWidth: '200px'}}>Default Role</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                  <th className="text-left px-3 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredGroups.map(group => {
                  const enabledRoles = group.roles?.filter(r => r.enabled) || [];
                  const defaultRoleConfig = enabledRoles.find(r => r.isDefault);
                  const defaultRole = defaultRoleConfig ? rolesMaster.find(rm => rm.id === defaultRoleConfig.roleId) : null;
                  const hasRoles = enabledRoles.length > 0;

                  return (
                  <tr key={group.id} className={`hover:bg-purple-50 transition-colors ${selectedGroups.includes(group.id) ? 'bg-purple-50' : ''}`}>
                    <td className="px-3 py-3">
                      <input
                        type="checkbox"
                        checked={selectedGroups.includes(group.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedGroups([...selectedGroups, group.id]);
                          } else {
                            setSelectedGroups(selectedGroups.filter(id => id !== group.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                      />
                    </td>
                    <td className="px-3 py-3">
                      <span className="font-semibold text-gray-900">{group.name}</span>
                    </td>
                    <td className="px-3 py-3">
                      <code className="bg-gray-100 px-2 py-1 rounded text-xs text-gray-600">{group.code}</code>
                    </td>
                    <td className="px-3 py-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-gray-400" />
                        {group.userCount}
                      </span>
                    </td>
                    <td className="px-3 py-3">
                      {hasRoles ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 border border-green-300 rounded-full text-xs font-medium">
                          +{enabledRoles.length} roles
                        </span>
                      ) : (
                        <span className="text-sm text-gray-400">None</span>
                      )}
                    </td>
                    <td className="px-3 py-3" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={defaultRole?.id || ''}
                        onChange={(e) => {
                          const newDefaultId = e.target.value ? parseInt(e.target.value) : null;
                          setGroupsList(prev => prev.map(g => {
                            if (g.id !== group.id) return g;
                            let updatedRoles = g.roles?.map(r => ({ ...r, isDefault: r.roleId === newDefaultId })) || [];
                            // If selecting a role that isn't enabled yet, enable it
                            if (newDefaultId && !updatedRoles.some(r => r.roleId === newDefaultId)) {
                              updatedRoles.push({ roleId: newDefaultId, enabled: true, isDefault: true });
                            }
                            return { ...g, roles: updatedRoles };
                          }));
                        }}
                        className={`w-full px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 ${defaultRole ? 'border-gray-300 bg-white' : 'border-gray-200 bg-gray-50 text-gray-400'}`}
                      >
                        <option value="">— No default —</option>
                        {rolesMaster.map(role => (
                          <option key={role.id} value={role.id}>{role.name}</option>
                        ))}
                      </select>
                    </td>
                    <td className="px-3 py-3">
                      {hasRoles ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium flex items-center gap-1 w-fit">
                          <Check className="w-3 h-3" /> Configured
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium w-fit">
                          No Roles
                        </span>
                      )}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => { setDrawer({ open: true, type: 'group', data: group }); setDrawerTab('general'); }}
                        className="px-3 py-1.5 text-xs font-medium border border-purple-600 text-purple-600 rounded hover:bg-purple-50 transition-colors"
                      >
                        Edit Group
                      </button>
                    </td>
                  </tr>
                );})}
              </tbody>
            </table>
          </div>

          {/* Sticky Footer - Pending Changes */}
          {hasPendingChanges && (
            <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-30">
              <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 bg-amber-500 rounded-full animate-pulse" />
                  <span className="text-sm font-medium text-gray-700">
                    {pendingChanges.length} group{pendingChanges.length > 1 ? 's' : ''} with pending changes
                  </span>
                  <span className="text-sm text-gray-500">
                    ({totalUsersAffected} user{totalUsersAffected > 1 ? 's' : ''} will be affected)
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={resetAllChanges}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-50"
                  >
                    Reset All
                  </button>
                  <button
                    onClick={() => setSaveModalOpen(true)}
                    className="px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 flex items-center gap-2"
                  >
                    Save All Changes
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Save Confirmation Modal */}
          {saveModalOpen && (
            <>
              <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setSaveModalOpen(false)} />
              <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-xl shadow-2xl z-50 w-[600px] max-h-[80vh] overflow-hidden">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                  <h2 className="text-lg font-semibold text-gray-900">Confirm Changes</h2>
                  <button onClick={() => setSaveModalOpen(false)} className="p-2 hover:bg-gray-100 rounded-lg">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="p-6 overflow-auto max-h-[50vh]">
                  {/* Summary */}
                  <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{pendingChanges.length}</div>
                        <div className="text-xs text-purple-600">Groups</div>
                      </div>
                      <div className="w-px h-10 bg-purple-200" />
                      <div className="text-center">
                        <div className="text-2xl font-bold text-purple-600">{totalUsersAffected}</div>
                        <div className="text-xs text-purple-600">Users Affected</div>
                      </div>
                    </div>
                  </div>

                  {/* Changes List */}
                  <div className="space-y-4">
                    {pendingChanges.map((change, idx) => (
                      <div key={idx} className="border rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-semibold text-gray-900">{change.group.name}</span>
                          <span className="text-xs text-gray-500">{change.usersAffected} users</span>
                        </div>
                        <div className="space-y-1 text-sm">
                          {change.addedRoles.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-green-600">+ Added:</span>
                              <span className="text-gray-600">{change.addedRoles.join(', ')}</span>
                            </div>
                          )}
                          {change.removedRoles.length > 0 && (
                            <div className="flex items-center gap-2">
                              <span className="text-red-600">− Removed:</span>
                              <span className="text-gray-600">{change.removedRoles.join(', ')}</span>
                            </div>
                          )}
                          {change.defaultChanged && (
                            <div className="flex items-center gap-2">
                              <span className="text-blue-600">★ Default:</span>
                              <span className="text-gray-600">{change.defaultChanged.from} → {change.defaultChanged.to}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Warning */}
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mt-6 flex gap-3">
                    <span className="text-lg">⚠️</span>
                    <div className="text-sm text-amber-800">
                      <strong>Warning:</strong> This will immediately update role assignments in the Elevate / Voyager 8 platform for all affected users. This action cannot be automatically undone.
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 border-t bg-gray-50 flex items-center justify-end gap-3">
                  <button
                    onClick={() => setSaveModalOpen(false)}
                    className="px-4 py-2 border border-gray-300 text-sm font-medium rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => {
                      // In production, this would save to backend
                      // For now, we'll just close the modal and show success
                      setSaveModalOpen(false);
                      alert('Changes saved successfully! (In production, this would sync to Elevate)');
                    }}
                    className="px-6 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700"
                  >
                    Confirm & Save
                  </button>
                </div>
              </div>
            </>
          )}
          </>
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

      <div className={`fixed right-0 top-0 h-full w-[1400px] min-w-[1400px] max-w-[1400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden ${drawer.open ? 'translate-x-0' : 'translate-x-full'}`}>
        {drawer.data && (
          <div className="h-full flex flex-col">
            <div className="px-6 py-4 border-b flex items-center justify-between">
              <div className="flex items-center gap-3">
                {drawer.type === 'user' && previousDrawer && (
                  <button
                    onClick={() => {
                      setDrawer(previousDrawer);
                      if (previousDrawer.tab) setDrawerTab(previousDrawer.tab);
                      setPreviousDrawer(null);
                    }}
                    className="p-2 hover:bg-gray-100 rounded-lg mr-1"
                    title="Back to group"
                  >
                    <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                  </button>
                )}
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
                      <>
                        {previousDrawer?.data && (
                          <div className="flex items-center gap-1.5 text-xs text-gray-500 mb-0.5">
                            <Shield className="w-3 h-3" />
                            <span>{Array.isArray(previousDrawer.data) ? previousDrawer.data[0]?.name : previousDrawer.data?.name}</span>
                            <span className="text-gray-400">→</span>
                          </div>
                        )}
                        <h2 className="font-semibold text-gray-900">{drawerUsers[0]?.name}</h2>
                        <p className="text-sm text-gray-500">{drawerUsers[0]?.email}</p>
                      </>
                    )
                  )}
                </div>
              </div>
              <button onClick={() => { setDrawer({ open: false, type: null, data: null }); setDrawerLayer(1); }} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            {drawer.type === 'group' ? (
              <>
                {/* Database Indicator Bar */}
                <div className="px-6 py-2 bg-white border-b flex items-center gap-3 text-sm">
                  <div className={`w-2.5 h-2.5 rounded-full ${isProductionDb ? 'bg-green-500' : 'bg-amber-500'}`} />
                  <span className="text-gray-500">Connected Database:</span>
                  <span className="font-semibold text-gray-900">{connectedDbName}</span>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${isProductionDb ? 'bg-green-100 text-green-700 border border-green-300' : 'bg-amber-100 text-amber-700 border border-amber-300'}`}>
                    {isProductionDb ? 'Production' : 'Test / Dev'}
                  </span>
                  <div className="ml-auto flex gap-1">
                    <button
                      onClick={() => { setIsProductionDb(true); setConnectedDbName('PROD_NORTHEAST_01'); }}
                      className={`px-3 py-1 text-xs rounded border ${isProductionDb ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      Production
                    </button>
                    <button
                      onClick={() => { setIsProductionDb(false); setConnectedDbName('TEST_NORTHEAST_01'); }}
                      className={`px-3 py-1 text-xs rounded border ${!isProductionDb ? 'border-purple-600 bg-purple-50 text-purple-700 font-semibold' : 'border-gray-300 bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
                    >
                      Test / Dev
                    </button>
                  </div>
                </div>

                {/* Layer Navigation Breadcrumb */}
                <div className="px-6 py-2 bg-gray-50 border-b flex items-center gap-2 text-sm">
                  <button
                    onClick={() => { setDrawerLayer(1); setDrawerTab('general'); }}
                    className={`${drawerLayer === 1 ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Group Settings
                  </button>
                  {drawerLayer === 2 && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-blue-600 font-medium">Permissions & Access</span>
                    </>
                  )}
                </div>

                {/* Layer 1: Group Settings - General, Users & Roles */}
                {drawerLayer === 1 && (
                  <div className="px-6 border-b">
                    <div className="flex gap-1">
                      {['general', 'users', 'v7menus', 'conversion', 'roles'].map(tab => (
                        <button key={tab} onClick={() => setDrawerTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${drawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                          {tab === 'roles' ? 'Voyager 8 Roles' : tab === 'conversion' ? 'V7 → V8 Mapper' : tab === 'v7menus' ? 'Voyager 7 Menus' : tab === 'general' ? 'General' : 'Users'}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        onClick={() => { setDrawerLayer(2); setDrawerTab('permissions'); }}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <Shield className="w-4 h-4" />
                        Configure Permissions & Access
                        <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Layer 2: Permissions & Access Settings */}
                {drawerLayer === 2 && (
                  <div className="px-6 border-b">
                    <div className="flex gap-1">
                      <button onClick={() => { setDrawerLayer(1); setDrawerTab('users'); }} className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">← Back</button>
                      {['permissions', 'accounts', 'accountTrees', 'chargeCodes', 'displayTypes', 'book', 'reports'].map(tab => (
                        <button key={tab} onClick={() => setDrawerTab(tab)} className={`px-2 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${drawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                          {tab === 'chargeCodes' ? 'Charge Codes' : tab === 'accountTrees' ? 'Acct Trees' : tab === 'displayTypes' ? 'Display Types' : tab === 'book' ? 'Book' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                  {/* Layer 1: General Tab */}
                  {drawerLayer === 1 && drawerTab === 'general' && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-3 gap-6">
                        {/* General Section */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-4">General</h3>
                          <div className="space-y-3">
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Description</label>
                              <input type="text" defaultValue={drawerGroups[0]?.description || ''} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">Code <span className="text-red-500">*</span></label>
                              <input type="text" defaultValue={drawerGroups[0]?.name?.toLowerCase().replace(/\s+/g, '') || ''} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-500 mb-1">URL</label>
                              <input type="text" defaultValue="" className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm" />
                            </div>
                          </div>
                        </div>

                        {/* Other Section */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-4">Other</h3>
                          <div>
                            <label className="block text-xs text-gray-500 mb-1">Notes</label>
                            <textarea rows={4} className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm resize-none" placeholder="Enter notes about this security group..." />
                          </div>
                        </div>

                        {/* Journal Entry Restrictions */}
                        <div>
                          <h3 className="text-sm font-bold text-gray-900 mb-4">Journal Entry Restrictions</h3>
                          <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                              No cash JE
                            </label>
                            <label className="flex items-center gap-2 text-sm text-gray-700">
                              <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                              No accrual JE
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Layer 1: Users Tab */}
                  {drawerLayer === 1 && drawerTab === 'users' && (() => {
                    const currentGroup = groupsList.find(g => g.id === drawerGroups[0]?.id);
                    const existingElevateRoles = currentGroup?.existingElevateRoles || [];
                    const newRoles = currentGroup?.roles?.filter(r => r.enabled) || [];
                    const getRoleName = (roleId: number) => rolesMaster.find(r => r.id === roleId)?.name || '';
                    const groupNetNewRoles = newRoles
                      .filter(r => !existingElevateRoles.includes(getRoleName(r.roleId)))
                      .map(r => getRoleName(r.roleId));

                    return (
                    <div className="space-y-4">
                      {/* Header with search and stats */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                              type="text"
                              placeholder="Search users..."
                              className="pl-9 pr-4 py-2 border rounded-lg text-sm w-52 focus:outline-none focus:ring-2 focus:ring-purple-500"
                            />
                          </div>
                          <span className="text-sm text-gray-500">{groupUsers.length} users in group</span>
                          {groupNetNewRoles.length > 0 && (
                            <span className="text-xs bg-purple-100 text-purple-700 border border-purple-300 px-2 py-1 rounded-full">
                              {groupNetNewRoles.length} group role(s) will be added
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => { setAddUserModalOpen(true); setSelectedUsersToAdd([]); setAddUserPropertyFilter('All'); setAddUserGroupFilter('All'); setAddUserSearch(''); }}
                          className="px-3 py-1.5 bg-purple-600 text-white rounded-lg text-sm font-medium hover:bg-purple-700 flex items-center gap-1"
                        >
                          <Plus className="w-3 h-3" /> Add User
                        </button>
                      </div>

                      {/* Users Table */}
                      <div className="bg-white border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-gray-50 border-b">
                            <tr>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Name</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Email</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Existing Elevate Roles</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Roles Being Added</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Last Login</th>
                              <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Actions</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {groupUsers.map(user => {
                              const userExistingRoles = user.existingRoles || [];
                              // Roles being added = group net-new roles that user doesn't already have
                              const rolesBeingAdded = groupNetNewRoles.filter(r => !userExistingRoles.includes(r));
                              const duplicateRoles = groupNetNewRoles.filter(r => userExistingRoles.includes(r));

                              return (
                                <tr key={user.id} className="hover:bg-gray-50">
                                  <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center text-white text-xs font-medium">
                                        {user.name.split(' ').map(n => n[0]).join('')}
                                      </div>
                                      <span className="font-medium text-gray-900">{user.name}</span>
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-gray-500">{user.email}</td>
                                  <td className="px-4 py-3">
                                    {userExistingRoles.length > 0 ? (
                                      <div className="flex flex-wrap gap-1 max-w-xs">
                                        {userExistingRoles.slice(0, 3).map((role, idx) => (
                                          <span key={idx} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full">
                                            {role}
                                          </span>
                                        ))}
                                        {userExistingRoles.length > 3 && (
                                          <span className="text-xs text-gray-400">+{userExistingRoles.length - 3} more</span>
                                        )}
                                      </div>
                                    ) : (
                                      <span className="text-xs text-gray-400">None</span>
                                    )}
                                  </td>
                                  <td className="px-4 py-3">
                                    <div className="flex flex-wrap gap-1 max-w-xs">
                                      {rolesBeingAdded.map((role, idx) => (
                                        <span key={idx} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded-full">
                                          +{role}
                                        </span>
                                      ))}
                                      {duplicateRoles.map((role, idx) => (
                                        <span key={idx} className="text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full">
                                          ✕ {role}
                                        </span>
                                      ))}
                                      {rolesBeingAdded.length === 0 && duplicateRoles.length === 0 && (
                                        <span className="text-xs text-gray-400">None</span>
                                      )}
                                    </div>
                                  </td>
                                  <td className="px-4 py-3 text-xs text-gray-500">{user.lastLogin}</td>
                                  <td className="px-4 py-3">
                                    <button
                                      onClick={() => {
                                        setPreviousDrawer({ open: true, type: 'group', data: drawer.data, tab: drawerTab });
                                        setDrawer({ open: true, type: 'user', data: user });
                                        setUserDrawerTab('details');
                                      }}
                                      className="px-3 py-1.5 text-xs font-medium border border-purple-600 text-purple-600 rounded hover:bg-purple-50"
                                    >
                                      View Details →
                                    </button>
                                  </td>
                                </tr>
                              );
                            })}
                            {groupUsers.length === 0 && (
                              <tr>
                                <td colSpan={6} className="px-4 py-8 text-center text-gray-400 italic">
                                  No users in this group.
                                </td>
                              </tr>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  );})()}

                  {/* Layer 1: Voyager 7 Menus Tab */}
                  {drawerLayer === 1 && drawerTab === 'v7menus' && (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 border rounded-full text-sm w-40" />
                          </div>
                          <span className="bg-purple-700 text-white text-xs font-bold px-2 py-1 rounded-full">6</span>
                          <span className="font-semibold text-sm text-gray-700">Menusets</span>
                        </div>
                      </div>

                      <table className="w-full">
                        <thead>
                          <tr className="text-left text-xs text-gray-500 border-b">
                            <th className="pb-2 font-medium">Name</th>
                            <th className="pb-2 font-medium">Configurations</th>
                          </tr>
                        </thead>
                        <tbody className="text-sm">
                          {[
                            { name: 'Res_Demo', checked: true },
                            { name: 'acctq', checked: false },
                            { name: 'iData', checked: false },
                            { name: '--- Select ---', checked: false },
                            { name: '--- Select ---', checked: false },
                            { name: '--- Select ---', checked: false },
                          ].map((item, idx) => (
                            <tr key={idx} className="border-b border-gray-100">
                              <td className="py-2">
                                <select className="w-full border border-gray-300 rounded px-2 py-1.5 text-sm bg-white">
                                  <option>{item.name}</option>
                                  <option>Res_Demo</option>
                                  <option>acctq</option>
                                  <option>iData</option>
                                  <option>Commercial_Main</option>
                                  <option>Affordable_Housing</option>
                                </select>
                              </td>
                              <td className="py-2">
                                <input type="checkbox" defaultChecked={item.checked} className="w-4 h-4 rounded border-gray-300" />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Layer 1: V7 to V8 Conversion/Mapper Tab */}
                  {drawerLayer === 1 && drawerTab === 'conversion' && (
                    <div className="space-y-4">
                      {/* Info Banner */}
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 flex gap-3">
                        <span className="text-lg">💡</span>
                        <div className="text-sm text-blue-800">
                          <strong>Menu to Role Mapper:</strong> This tool helps you convert Voyager 7 menu assignments to Voyager 8 roles.
                          Select V7 menus on the left to see recommended V8 role mappings. Click "Apply Mapping" to automatically assign the suggested roles.
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-6">
                        {/* V7 Menus Column */}
                        <div>
                          <div className="bg-gray-700 text-white text-sm font-semibold px-3 py-2 rounded-t flex items-center justify-between">
                            <span>Voyager 7 Menus (Source)</span>
                            <span className="bg-gray-600 px-2 py-0.5 rounded text-xs">3 assigned</span>
                          </div>
                          <div className="border border-t-0 rounded-b max-h-64 overflow-auto">
                            {[
                              { name: 'Res_Demo', mapped: true, roles: ['Voyager 8 Residential', 'Voyager 8 Residential - Leasing'] },
                              { name: 'acctq', mapped: true, roles: ['AR Manager', 'AR Manager - Payments'] },
                              { name: 'iData', mapped: false, roles: [] },
                            ].map((menu, idx) => (
                              <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 border-b border-gray-100 ${menu.mapped ? 'bg-green-50' : 'bg-white'}`}>
                                <input type="checkbox" defaultChecked={menu.mapped} className="w-4 h-4 rounded border-gray-300" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{menu.name}</div>
                                  {menu.mapped && (
                                    <div className="text-xs text-green-600">→ {menu.roles.length} role(s) mapped</div>
                                  )}
                                </div>
                                {menu.mapped && <span className="text-green-500">✓</span>}
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* V8 Roles Column */}
                        <div>
                          <div className="bg-purple-700 text-white text-sm font-semibold px-3 py-2 rounded-t flex items-center justify-between">
                            <span>Voyager 8 Roles (Target)</span>
                            <span className="bg-purple-600 px-2 py-0.5 rounded text-xs">4 suggested</span>
                          </div>
                          <div className="border border-t-0 rounded-b max-h-64 overflow-auto">
                            {[
                              { name: 'Voyager 8 Residential', source: 'Res_Demo', auto: true },
                              { name: 'Voyager 8 Residential - Leasing', source: 'Res_Demo', auto: true },
                              { name: 'AR Manager', source: 'acctq', auto: true },
                              { name: 'AR Manager - Payments', source: 'acctq', auto: true },
                              { name: 'CRM IQ', source: null, auto: false },
                              { name: 'System Administration', source: null, auto: false },
                              { name: 'Procure to Pay v2', source: null, auto: false },
                            ].map((role, idx) => (
                              <div key={idx} className={`flex items-center gap-3 px-3 py-2.5 border-b border-gray-100 ${role.auto ? 'bg-purple-50' : 'bg-white'}`}>
                                <input type="checkbox" defaultChecked={role.auto} className="w-4 h-4 rounded border-gray-300" />
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{role.name}</div>
                                  {role.source && (
                                    <div className="text-xs text-purple-600">← from {role.source}</div>
                                  )}
                                </div>
                                {role.auto && <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded">Auto</span>}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Mapping Rules Info */}
                      <div className="bg-gray-50 border rounded-lg p-4">
                        <h4 className="text-sm font-semibold text-gray-700 mb-2">Mapping Rules Applied:</h4>
                        <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            Res_Demo → Voyager 8 Residential, Leasing
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-green-500"></span>
                            acctq → AR Manager, AR Manager - Payments
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-gray-300"></span>
                            iData → No mapping defined
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center justify-between pt-2">
                        <button className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800">
                          Reset to Defaults
                        </button>
                        <div className="flex gap-2">
                          <button className="px-4 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50">
                            Preview Changes
                          </button>
                          <button className="px-4 py-2 text-sm bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium">
                            Apply Mapping to V8 Roles
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Layer 1: Group Roles Tab (replaces Voyager 8 Roles) */}
                  {drawerLayer === 1 && drawerTab === 'roles' && (() => {
                    // Get the current group(s) from groupsList (stateful) using IDs from drawerGroups
                    const currentGroupIds = drawerGroups.map(g => g.id);
                    const currentGroups = groupsList.filter(g => currentGroupIds.includes(g.id));
                    const currentGroup = currentGroups[0];

                    // Get existing Elevate roles (locked, cannot be modified)
                    const existingElevateRoles = currentGroup?.existingElevateRoles || [];

                    // Get new V8 roles being added (from roles array)
                    const newRoles = currentGroup?.roles?.filter(r => r.enabled) || [];

                    // Helper to get role name from ID
                    const getRoleName = (roleId: number) => rolesMaster.find(r => r.id === roleId)?.name || '';
                    const getRoleProduct = (roleId: number) => rolesMaster.find(r => r.id === roleId)?.product || '';

                    // Check if a new role is a duplicate of existing Elevate role
                    const isDuplicate = (roleId: number) => {
                      const roleName = getRoleName(roleId);
                      return existingElevateRoles.includes(roleName);
                    };

                    // Calculate net-new and duplicates
                    const netNewRoles = newRoles.filter(r => !isDuplicate(r.roleId));
                    const duplicateRoles = newRoles.filter(r => isDuplicate(r.roleId));
                    const defaultRole = newRoles.find(r => r.isDefault && !isDuplicate(r.roleId));

                    // Add a new role
                    const addRole = () => {
                      const usedRoleIds = newRoles.map(r => r.roleId);
                      const availableRole = rolesMaster.find(r => !usedRoleIds.includes(r.id));
                      if (!availableRole) {
                        alert('All roles already added.');
                        return;
                      }
                      setGroupsList(prev => prev.map(g => {
                        if (g.id !== currentGroup?.id) return g;
                        return {
                          ...g,
                          roles: [...(g.roles || []), { roleId: availableRole.id, enabled: true, isDefault: false }]
                        };
                      }));
                    };

                    // Remove a role
                    const removeRole = (roleId: number) => {
                      setGroupsList(prev => prev.map(g => {
                        if (g.id !== currentGroup?.id) return g;
                        const wasDefault = g.roles?.find(r => r.roleId === roleId)?.isDefault;
                        let updatedRoles = g.roles?.filter(r => r.roleId !== roleId) || [];
                        // If removed role was default, make first remaining role the default
                        if (wasDefault && updatedRoles.length > 0) {
                          updatedRoles = updatedRoles.map((r, i) => ({ ...r, isDefault: i === 0 }));
                        }
                        return { ...g, roles: updatedRoles };
                      }));
                    };

                    // Update role selection
                    const updateRole = (oldRoleId: number, newRoleId: number) => {
                      setGroupsList(prev => prev.map(g => {
                        if (g.id !== currentGroup?.id) return g;
                        return {
                          ...g,
                          roles: g.roles?.map(r => r.roleId === oldRoleId ? { ...r, roleId: newRoleId } : r) || []
                        };
                      }));
                    };

                    // Set default role
                    const setDefault = (roleId: number) => {
                      setGroupsList(prev => prev.map(g => {
                        if (g.id !== currentGroup?.id) return g;
                        return {
                          ...g,
                          roles: g.roles?.map(r => ({ ...r, isDefault: r.roleId === roleId })) || []
                        };
                      }));
                    };

                    return (
                    <div className="space-y-4">
                      {/* Locked State for Test/Dev DB */}
                      {!isProductionDb && (
                        <div className="bg-gray-100 border border-gray-300 rounded-lg p-8 text-center text-gray-500">
                          <div className="text-4xl mb-3">🔒</div>
                          <p className="font-semibold text-gray-700 mb-2">Voyager 8 Role assignments are only available on a Production database.</p>
                          <p className="text-sm">You are currently connected to a Test / Dev database. Please switch to your Production database to manage Elevate role assignments for this Security Group.</p>
                        </div>
                      )}

                      {/* Active State for Production DB */}
                      {isProductionDb && (
                        <>
                          {/* General Section (Read-only) */}
                          <div className="bg-white border rounded-lg">
                            <div className="px-4 py-2 border-b bg-gray-50 flex items-center justify-between">
                              <span className="font-semibold text-sm text-gray-700">General</span>
                              <span className="text-xs text-gray-400">Read-only</span>
                            </div>
                            <div className="p-4 grid grid-cols-2 gap-4">
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Description</label>
                                <input type="text" readOnly value={currentGroup?.name || ''} className="w-full px-3 py-2 border rounded bg-gray-50 text-sm text-gray-600" />
                              </div>
                              <div>
                                <label className="block text-xs text-gray-500 mb-1">Code</label>
                                <input type="text" readOnly value={currentGroup?.code || ''} className="w-full px-3 py-2 border rounded bg-gray-50 text-sm text-gray-600" />
                              </div>
                            </div>
                          </div>

                          {/* Existing Elevate Roles Section (Locked) */}
                          <div className="bg-white border rounded-lg">
                            <div className="px-4 py-2 border-b bg-blue-50 flex items-center justify-between">
                              <span className="font-semibold text-sm text-blue-700">🔒 Existing Elevate Roles</span>
                              <span className="text-xs text-blue-500">Will not be modified</span>
                            </div>
                            <div className="p-4">
                              {existingElevateRoles.length > 0 ? (
                                <div className="flex flex-wrap gap-2">
                                  {existingElevateRoles.map((role, idx) => (
                                    <div key={idx} className="bg-blue-50 border border-blue-200 rounded px-3 py-1.5 text-xs font-medium text-blue-700 flex items-center gap-1">
                                      🔒 {role}
                                    </div>
                                  ))}
                                </div>
                              ) : (
                                <p className="text-sm text-gray-400 italic">No existing Elevate roles.</p>
                              )}
                            </div>
                          </div>

                          {/* Voyager 8 Roles to Add Section */}
                          <div className="bg-white border rounded-lg">
                            <div className="px-4 py-2 border-b flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <span className="font-semibold text-sm text-gray-700">Voyager 8 Roles to Add</span>
                                <span className="text-xs bg-green-100 text-green-700 border border-green-300 rounded-full px-2 py-0.5 font-medium">
                                  API · {connectedDbName}
                                </span>
                              </div>
                            </div>
                            <div className="p-4">
                              {/* Header with count and add button */}
                              <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-2">
                                  <div className="w-6 h-6 bg-purple-600 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                    {newRoles.length}
                                  </div>
                                  <span className="text-sm font-medium text-gray-700">Roles to Add</span>
                                </div>
                                <button
                                  onClick={addRole}
                                  className="px-3 py-1.5 text-xs font-medium bg-purple-600 text-white rounded hover:bg-purple-700"
                                >
                                  + Add Role
                                </button>
                              </div>

                              {/* Roles Table */}
                              <table className="w-full text-sm">
                                <thead className="bg-gray-50 border-y">
                                  <tr>
                                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500" style={{width: '40%'}}>Elevate Role</th>
                                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500" style={{width: '25%'}}>Product</th>
                                    <th className="text-left px-3 py-2 text-xs font-semibold text-gray-500" style={{width: '20%'}}>Default Role</th>
                                    <th className="text-center px-3 py-2 text-xs font-semibold text-gray-500" style={{width: '15%'}}>Remove</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y">
                                  {newRoles.length === 0 ? (
                                    <tr>
                                      <td colSpan={4} className="px-3 py-6 text-center text-gray-400 italic">
                                        No roles added yet.
                                      </td>
                                    </tr>
                                  ) : (
                                    newRoles.map(role => {
                                      const roleName = getRoleName(role.roleId);
                                      const roleProduct = getRoleProduct(role.roleId);
                                      const dup = isDuplicate(role.roleId);
                                      const isDefaultRole = role.isDefault && !dup;

                                      return (
                                        <tr key={role.roleId} className={isDefaultRole ? 'bg-purple-50' : ''}>
                                          <td className="px-3 py-2">
                                            <div className="flex items-center gap-2">
                                              <select
                                                value={role.roleId}
                                                onChange={(e) => updateRole(role.roleId, parseInt(e.target.value))}
                                                className="flex-1 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
                                              >
                                                {rolesMaster.map(r => (
                                                  <option key={r.id} value={r.id}>{r.name}</option>
                                                ))}
                                              </select>
                                              {isDefaultRole && (
                                                <span className="text-xs bg-purple-600 text-white px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                                                  Default
                                                </span>
                                              )}
                                            </div>
                                          </td>
                                          <td className="px-3 py-2">
                                            <span className={`text-xs px-2 py-1 rounded-full font-medium ${dup ? 'bg-red-100 text-red-700 border border-red-300' : 'bg-purple-100 text-purple-700'}`}>
                                              {dup ? '⚠ Duplicate' : roleProduct || 'Residential'}
                                            </span>
                                          </td>
                                          <td className="px-3 py-2">
                                            {dup ? (
                                              <span className="text-xs text-gray-400">N/A</span>
                                            ) : (
                                              <label className="flex items-center gap-2 cursor-pointer">
                                                <input
                                                  type="radio"
                                                  name="defaultRole"
                                                  checked={role.isDefault}
                                                  onChange={() => setDefault(role.roleId)}
                                                  className="w-4 h-4 text-purple-600"
                                                />
                                                <span className={`text-xs ${role.isDefault ? 'text-purple-600 font-medium' : 'text-gray-400'}`}>
                                                  {role.isDefault ? 'Default' : 'Set'}
                                                </span>
                                              </label>
                                            )}
                                          </td>
                                          <td className="px-3 py-2 text-center">
                                            <button
                                              onClick={() => removeRole(role.roleId)}
                                              className="w-6 h-6 text-red-500 hover:bg-red-50 rounded flex items-center justify-center"
                                            >
                                              ✕
                                            </button>
                                          </td>
                                        </tr>
                                      );
                                    })
                                  )}
                                </tbody>
                              </table>

                              {/* Info Line */}
                              {newRoles.length > 0 && (
                                <div className="mt-3 text-xs text-gray-500 italic">
                                  <strong>{netNewRoles.length}</strong> net-new role(s)
                                  {duplicateRoles.length > 0 && (
                                    <> · <span className="text-red-600">{duplicateRoles.length} dup(s) skipped</span></>
                                  )}
                                  {' · '}
                                  {defaultRole ? (
                                    <>Default: <strong className="text-purple-600">{getRoleName(defaultRole.roleId)}</strong></>
                                  ) : (
                                    <span className="text-red-600">⚠ No default set</span>
                                  )}
                                </div>
                              )}
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  );})()}

                  {/* Layer 3: Permissions Tab */}
                  {drawerLayer === 2 && drawerTab === 'permissions' && (
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
                              <th className="text-center px-3 py-2 text-xs font-semibold text-gray-500 uppercase w-20">Licensed</th>
                              <th className="text-center px-3 py-2 text-xs font-semibold text-gray-500 uppercase w-16">Shared</th>
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
                                  <td className="px-3 py-2 text-center">
                                    {perm.licensed && <Check className="w-4 h-4 text-teal-600 mx-auto" />}
                                  </td>
                                  <td className="px-3 py-2 text-center">
                                    {perm.shared && <Check className="w-4 h-4 text-teal-600 mx-auto" />}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  )}

                  {/* Layer 3: Accounts Tab */}
                  {drawerLayer === 2 && drawerTab === 'accounts' && (
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

                  {/* Layer 3: Account Trees Tab */}
                  {drawerLayer === 2 && drawerTab === 'accountTrees' && (
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

                  {/* Layer 3: Charge Codes Tab */}
                  {drawerLayer === 2 && drawerTab === 'chargeCodes' && (
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

                  {/* Layer 3: Display Types Tab */}
                  {drawerLayer === 2 && drawerTab === 'displayTypes' && (
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

                  {/* Layer 3: Book Tab */}
                  {drawerLayer === 2 && drawerTab === 'book' && (
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

                  {/* Layer 3: Reports Tab */}
                  {drawerLayer === 2 && drawerTab === 'reports' && (
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

                {/* Drawer Sticky Footer - Pending Changes for Open Group(s) */}
                {(() => {
                  // Layer 1: Role changes
                  if (drawerLayer === 1) {
                    const drawerGroupIds = drawerGroups.map(g => g.id);
                    const drawerPendingChanges = pendingChanges.filter(c => drawerGroupIds.includes(c.group.id));
                    if (drawerPendingChanges.length === 0) return null;
                    const drawerUsersAffected = drawerPendingChanges.reduce((sum, c) => sum + c.usersAffected, 0);
                    return (
                      <div className="border-t bg-amber-50 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-amber-800">
                            Unsaved role changes
                          </span>
                          <span className="text-sm text-amber-700">
                            ({drawerUsersAffected} user{drawerUsersAffected > 1 ? 's' : ''} will be affected)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setGroupsList(prev => prev.map(g => {
                                if (!drawerGroupIds.includes(g.id)) return g;
                                const original = originalGroups.find(og => og.id === g.id);
                                return original ? JSON.parse(JSON.stringify(original)) : g;
                              }));
                            }}
                            className="px-3 py-1.5 text-xs font-medium border border-amber-600 text-amber-700 rounded hover:bg-amber-100"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => setSaveModalOpen(true)}
                            className="px-3 py-1.5 text-xs font-medium bg-amber-600 text-white rounded hover:bg-amber-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    );
                  }

                  // Layer 2: Permission/Books changes
                  if (drawerLayer === 2 && hasPendingPermissionChanges) {
                    const permCount = pendingPermissionChanges.length;
                    const bookCount = pendingBooksChanges.length;
                    const totalChanges = permCount + bookCount;
                    return (
                      <div className="border-t bg-amber-50 px-6 py-3 flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-2.5 h-2.5 bg-amber-500 rounded-full animate-pulse" />
                          <span className="text-sm font-medium text-amber-800">
                            Unsaved permission changes
                          </span>
                          <span className="text-sm text-amber-700">
                            ({totalChanges} setting{totalChanges > 1 ? 's' : ''} modified)
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={resetPermissionChanges}
                            className="px-3 py-1.5 text-xs font-medium border border-amber-600 text-amber-700 rounded hover:bg-amber-100"
                          >
                            Reset
                          </button>
                          <button
                            onClick={() => {
                              alert('Permission changes saved! (In production, this would sync to the database)');
                            }}
                            className="px-3 py-1.5 text-xs font-medium bg-amber-600 text-white rounded hover:bg-amber-700"
                          >
                            Save Changes
                          </button>
                        </div>
                      </div>
                    );
                  }

                  return null;
                })()}
              </>
            ) : (
              <div className="flex flex-1 min-h-0">
                {/* Left Navigation Column */}
                <div className="w-48 bg-gray-50 border-r flex flex-col">
                  <div className="p-3 border-b bg-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">V7 Settings</span>
                  </div>
                  <nav className="flex-1 py-2">
                    {(isMultiUser ? ['settings', 'programRights'] : ['details', 'settings', 'programRights']).map(tab => (
                      <button
                        key={tab}
                        onClick={() => setUserDrawerTab(tab)}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                          userDrawerTab === tab
                            ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {tab === 'details' && <User className="w-4 h-4" />}
                        {tab === 'settings' && <Settings className="w-4 h-4" />}
                        {tab === 'programRights' && <Shield className="w-4 h-4" />}
                        {tab === 'programRights' ? 'Program Rights' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                      </button>
                    ))}
                  </nav>
                  <div className="p-3 border-t bg-gray-100">
                    <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Elevate</span>
                  </div>
                  <nav className="py-2">
                    {['userInfo', 'voyagerAccess', 'roles', 'pageAccess', 'elementAccess', 'changeLog'].map(tab => (
                      <button
                        key={tab}
                        onClick={() => setUserDrawerTab(tab)}
                        className={`w-full px-4 py-2.5 text-left text-sm font-medium transition-colors flex items-center gap-2 ${
                          userDrawerTab === tab
                            ? 'bg-purple-100 text-purple-700 border-r-2 border-purple-600'
                            : 'text-gray-600 hover:bg-gray-100'
                        }`}
                      >
                        {tab === 'userInfo' && <User className="w-4 h-4" />}
                        {tab === 'voyagerAccess' && <Database className="w-4 h-4" />}
                        {tab === 'roles' && <Shield className="w-4 h-4" />}
                        {tab === 'pageAccess' && <FileText className="w-4 h-4" />}
                        {tab === 'elementAccess' && <Eye className="w-4 h-4" />}
                        {tab === 'changeLog' && <Clock className="w-4 h-4" />}
                        {tab === 'userInfo' && 'User Information'}
                        {tab === 'voyagerAccess' && 'Voyager Access'}
                        {tab === 'roles' && 'Roles'}
                        {tab === 'pageAccess' && 'Page Access'}
                        {tab === 'elementAccess' && 'Element Access'}
                        {tab === 'changeLog' && 'Change Log'}
                      </button>
                    ))}
                  </nav>
                </div>

                {/* Right Content Area */}
                <div className="flex-1 flex flex-col min-w-0">
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
                          <select defaultValue={drawerUsers[0]?.group || ''} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                            {securityGroups.map(g => <option key={g.id} value={g.name}>{g.name}</option>)}
                          </select>
                        </div>
                        <div className="grid grid-cols-3 gap-2 items-center">
                          <label className="text-sm text-gray-600">Status</label>
                          <select defaultValue={drawerUsers[0]?.status || 'Active'} className="col-span-2 px-2 py-1.5 border rounded text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
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

                {/* Elevate Tabs Content */}
                {userDrawerTab === 'userInfo' && (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Information</h3>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Full Name</label>
                          <input type="text" value={drawerUsers[0]?.name || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-50 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Email</label>
                          <input type="text" value={drawerUsers[0]?.email || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-50 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Security Group</label>
                          <input type="text" value={drawerUsers[0]?.group || ''} readOnly className="w-full px-3 py-2 border rounded bg-gray-50 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Status</label>
                          <span className={`inline-flex px-2 py-1 text-xs font-medium rounded ${drawerUsers[0]?.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {drawerUsers[0]?.status || 'Unknown'}
                          </span>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Last Login</label>
                          <input type="text" value={drawerUsers[0]?.lastLogin || 'Never'} readOnly className="w-full px-3 py-2 border rounded bg-gray-50 text-sm" />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-600 mb-1">Created Date</label>
                          <input type="text" value="2024-01-15" readOnly className="w-full px-3 py-2 border rounded bg-gray-50 text-sm" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'voyagerAccess' && (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Voyager Access</h3>
                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-purple-600 text-white px-4 py-2 text-sm font-medium">Database Access</div>
                        <div className="p-4 space-y-2">
                          {['Production', 'Training', 'Development'].map(db => (
                            <label key={db} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
                              <span className="text-sm">{db}</span>
                              <input type="checkbox" defaultChecked={db === 'Production'} className="w-4 h-4 rounded border-gray-300 text-purple-600" />
                            </label>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'roles' && (() => {
                  const userExistingRoles = drawerUsers[0]?.existingRoles || [];
                  const groupData = previousDrawer?.data ? (Array.isArray(previousDrawer.data) ? previousDrawer.data[0] : previousDrawer.data) : null;
                  const groupFromList = groupData ? groupsList.find(g => g.id === groupData.id) : null;
                  const groupRoles = groupFromList?.roles?.filter(r => r.enabled) || [];
                  const rolesBeingAdded = groupRoles.map(r => {
                    const roleName = getRoleName(r.roleId);
                    const isDuplicate = userExistingRoles.includes(roleName);
                    const isDefault = r.isDefault;
                    return { ...r, name: roleName, isDuplicate, isDefault };
                  });
                  const netNewRoles = rolesBeingAdded.filter(r => !r.isDuplicate);
                  const duplicateRoles = rolesBeingAdded.filter(r => r.isDuplicate);

                  return (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">User Roles</h3>

                    {/* Summary Stats */}
                    <div className="grid grid-cols-3 gap-3 mb-4">
                      <div className="bg-purple-50 border border-purple-200 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-purple-700">{userExistingRoles.length}</div>
                        <div className="text-xs text-purple-600">Existing Roles</div>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-green-700">{netNewRoles.length}</div>
                        <div className="text-xs text-green-600">New from Group</div>
                      </div>
                      <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-center">
                        <div className="text-2xl font-bold text-amber-700">{duplicateRoles.length}</div>
                        <div className="text-xs text-amber-600">Duplicates</div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-purple-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-between">
                          <span>Existing Elevate Roles</span>
                          <span className="bg-purple-500 px-2 py-0.5 rounded text-xs">{userExistingRoles.length}</span>
                        </div>
                        <div className="p-4">
                          {userExistingRoles.length > 0 ? (
                            <div className="space-y-2">
                              {userExistingRoles.map((role: string) => (
                                <div key={role} className="flex items-center gap-2 p-2 bg-gray-50 rounded">
                                  <span className="text-gray-400">🔒</span>
                                  <span className="text-sm">{role}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No existing Elevate roles</p>
                          )}
                        </div>
                      </div>

                      <div className="border rounded-lg overflow-hidden">
                        <div className="bg-green-600 text-white px-4 py-2 text-sm font-medium flex items-center justify-between">
                          <span>Roles Being Added from "{groupFromList?.name || 'Group'}"</span>
                          <span className="bg-green-500 px-2 py-0.5 rounded text-xs">{rolesBeingAdded.length}</span>
                        </div>
                        <div className="p-4">
                          {rolesBeingAdded.length > 0 ? (
                            <div className="space-y-2">
                              {rolesBeingAdded.map((role) => (
                                <div key={role.roleId} className={`flex items-center justify-between p-2 rounded ${role.isDuplicate ? 'bg-amber-50 border border-amber-200' : 'bg-green-50 border border-green-200'}`}>
                                  <div className="flex items-center gap-2">
                                    {role.isDuplicate ? (
                                      <span className="text-amber-500" title="Duplicate - user already has this role">⚠️</span>
                                    ) : (
                                      <span className="text-green-500">✓</span>
                                    )}
                                    <span className="text-sm">{role.name}</span>
                                    {role.isDefault && (
                                      <span className="px-1.5 py-0.5 bg-blue-100 text-blue-700 text-xs rounded">Default</span>
                                    )}
                                  </div>
                                  {role.isDuplicate && (
                                    <span className="text-xs text-amber-600">Already has role</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-sm text-gray-500 italic">No roles configured for this group</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  );
                })()}

                {userDrawerTab === 'pageAccess' && (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Page Access</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Page</th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600 w-20">View</th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600 w-20">Edit</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {['Dashboard', 'Properties', 'Tenants', 'Financials', 'Reports', 'Settings'].map((page, idx) => (
                            <tr key={page} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-2">{page}</td>
                              <td className="px-4 py-2 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600" /></td>
                              <td className="px-4 py-2 text-center"><input type="checkbox" defaultChecked={idx < 4} className="w-4 h-4 rounded border-gray-300 text-purple-600" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'elementAccess' && (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Element Access</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Element</th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600 w-20">Visible</th>
                            <th className="text-center px-4 py-2 font-medium text-gray-600 w-20">Enabled</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          {['Delete Button', 'Export Button', 'Bulk Actions', 'Admin Panel', 'API Keys'].map((elem, idx) => (
                            <tr key={elem} className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}>
                              <td className="px-4 py-2">{elem}</td>
                              <td className="px-4 py-2 text-center"><input type="checkbox" defaultChecked className="w-4 h-4 rounded border-gray-300 text-purple-600" /></td>
                              <td className="px-4 py-2 text-center"><input type="checkbox" defaultChecked={idx < 3} className="w-4 h-4 rounded border-gray-300 text-purple-600" /></td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {userDrawerTab === 'changeLog' && (
                  <div className="flex-1 overflow-auto p-6">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Change Log</h3>
                    <div className="border rounded-lg overflow-hidden">
                      <table className="w-full text-sm">
                        <thead className="bg-gray-100">
                          <tr>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Date</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Changed By</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Action</th>
                            <th className="text-left px-4 py-2 font-medium text-gray-600">Details</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="bg-white">
                            <td className="px-4 py-2 text-gray-500">2024-01-15 09:30</td>
                            <td className="px-4 py-2">System Admin</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">Created</span></td>
                            <td className="px-4 py-2 text-gray-600">User account created</td>
                          </tr>
                          <tr className="bg-gray-50">
                            <td className="px-4 py-2 text-gray-500">2024-01-20 14:15</td>
                            <td className="px-4 py-2">System Admin</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Modified</span></td>
                            <td className="px-4 py-2 text-gray-600">Added to Residential Manager group</td>
                          </tr>
                          <tr className="bg-white">
                            <td className="px-4 py-2 text-gray-500">2024-02-01 11:00</td>
                            <td className="px-4 py-2">System Admin</td>
                            <td className="px-4 py-2"><span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">Modified</span></td>
                            <td className="px-4 py-2 text-gray-600">Role added: Revenue IQ - Manager</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}
                </div>
              </div>
            )}

            <div className="px-6 py-4 border-t flex gap-3">
              <button onClick={() => setDrawer({ open: false, type: null, data: null })} className="flex-1 px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50">Cancel</button>
              <button className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700">Save Changes</button>
            </div>
          </div>
        )}
      </div>

      {/* Clone Group Modal */}
      {cloneModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-2xl w-[500px] overflow-hidden">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Clone Group with Menu and Permissions</h2>
            </div>
            <div className="p-6 space-y-4">
              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-blue-600 underline cursor-pointer">Group (Source)</label>
                <div className="col-span-2">
                  <select
                    value={cloneSourceGroup}
                    onChange={(e) => setCloneSourceGroup(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select a group...</option>
                    {securityGroups.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-700">Clone Type</label>
                <div className="col-span-2">
                  <select
                    value={cloneType}
                    onChange={(e) => setCloneType(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New Group">New Group</option>
                    <option value="Existing Group">Existing Group</option>
                  </select>
                </div>
              </div>

              {cloneType === 'Existing Group' && (
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">Target Group</label>
                  <div className="col-span-2">
                    <select
                      value={cloneTargetGroup}
                      onChange={(e) => setCloneTargetGroup(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select a group...</option>
                      {securityGroups.filter(g => g.name !== cloneSourceGroup).map(g => (
                        <option key={g.id} value={g.name}>{g.name}</option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {cloneType === 'New Group' && (
                <div className="grid grid-cols-3 gap-4 items-center">
                  <label className="text-sm text-gray-700">New Group Name</label>
                  <div className="col-span-2">
                    <input
                      type="text"
                      value={cloneTargetGroup}
                      onChange={(e) => setCloneTargetGroup(e.target.value)}
                      placeholder="Enter new group name..."
                      className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm text-gray-700">Clone Permissions?</label>
                <div className="col-span-2">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={clonePermissions}
                      onChange={(e) => setClonePermissions(e.target.checked)}
                      className="w-4 h-4 rounded border-gray-300"
                    />
                    <span className="text-sm text-gray-600">Include all permissions and settings</span>
                  </label>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-end gap-3">
              <button
                onClick={() => { setCloneModalOpen(false); setCloneSourceGroup(''); setCloneTargetGroup(''); setCloneType('New Group'); }}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => { setCloneModalOpen(false); setCloneSourceGroup(''); setCloneTargetGroup(''); setCloneType('New Group'); }}
                className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100"
              >
                Help
              </button>
              <button
                onClick={() => { setCloneModalOpen(false); setCloneSourceGroup(''); setCloneTargetGroup(''); setCloneType('New Group'); }}
                disabled={!cloneSourceGroup || !cloneTargetGroup}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Clone
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add User Modal */}
      {addUserModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60]">
          <div className="bg-white rounded-xl shadow-2xl w-[700px] max-h-[80vh] overflow-hidden flex flex-col">
            <div className="px-6 py-4 border-b bg-gray-50">
              <h2 className="text-lg font-semibold text-gray-900">Add Users to {isMultiGroup ? 'Groups' : drawerGroups[0]?.name}</h2>
            </div>

            {/* Filters */}
            <div className="px-6 py-4 border-b bg-gray-50 space-y-3">
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Property</label>
                  <select
                    value={addUserPropertyFilter}
                    onChange={(e) => setAddUserPropertyFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Properties</option>
                    {[...new Set(users.map(u => u.properties))].sort((a, b) => {
                      if (a === 'All') return -1;
                      if (b === 'All') return 1;
                      return parseInt(a) - parseInt(b);
                    }).map(prop => (
                      <option key={prop} value={prop}>{prop === 'All' ? 'All Properties Assigned' : `${prop} Properties`}</option>
                    ))}
                  </select>
                </div>
                <div className="flex-1">
                  <label className="block text-xs font-medium text-gray-600 mb-1">Group</label>
                  <select
                    value={addUserGroupFilter}
                    onChange={(e) => setAddUserGroupFilter(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="All">All Groups</option>
                    {securityGroups.map(g => (
                      <option key={g.id} value={g.name}>{g.name}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={addUserSearch}
                  onChange={(e) => setAddUserSearch(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* User List */}
            <div className="flex-1 overflow-auto p-4">
              <div className="flex items-center justify-between mb-3 pb-2 border-b">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={
                      users
                        .filter(u => !groupUsers.some(gu => gu.id === u.id))
                        .filter(u => addUserPropertyFilter === 'All' || u.properties === addUserPropertyFilter)
                        .filter(u => addUserGroupFilter === 'All' || u.group === addUserGroupFilter)
                        .filter(u => addUserSearch === '' || u.name.toLowerCase().includes(addUserSearch.toLowerCase()) || u.email.toLowerCase().includes(addUserSearch.toLowerCase()))
                        .length > 0 &&
                      users
                        .filter(u => !groupUsers.some(gu => gu.id === u.id))
                        .filter(u => addUserPropertyFilter === 'All' || u.properties === addUserPropertyFilter)
                        .filter(u => addUserGroupFilter === 'All' || u.group === addUserGroupFilter)
                        .filter(u => addUserSearch === '' || u.name.toLowerCase().includes(addUserSearch.toLowerCase()) || u.email.toLowerCase().includes(addUserSearch.toLowerCase()))
                        .every(u => selectedUsersToAdd.includes(u.id))
                    }
                    onChange={(e) => {
                      const filteredUsers = users
                        .filter(u => !groupUsers.some(gu => gu.id === u.id))
                        .filter(u => addUserPropertyFilter === 'All' || u.properties === addUserPropertyFilter)
                        .filter(u => addUserGroupFilter === 'All' || u.group === addUserGroupFilter)
                        .filter(u => addUserSearch === '' || u.name.toLowerCase().includes(addUserSearch.toLowerCase()) || u.email.toLowerCase().includes(addUserSearch.toLowerCase()));
                      if (e.target.checked) {
                        setSelectedUsersToAdd(filteredUsers.map(u => u.id));
                      } else {
                        setSelectedUsersToAdd([]);
                      }
                    }}
                    className="w-4 h-4 rounded border-gray-300"
                  />
                  <span className="text-sm font-medium text-gray-700">Select All</span>
                </label>
                <span className="text-sm text-gray-500">
                  {selectedUsersToAdd.length} selected
                </span>
              </div>

              <div className="space-y-2">
                {users
                  .filter(u => !groupUsers.some(gu => gu.id === u.id))
                  .filter(u => addUserPropertyFilter === 'All' || u.properties === addUserPropertyFilter)
                  .filter(u => addUserGroupFilter === 'All' || u.group === addUserGroupFilter)
                  .filter(u => addUserSearch === '' || u.name.toLowerCase().includes(addUserSearch.toLowerCase()) || u.email.toLowerCase().includes(addUserSearch.toLowerCase()))
                  .map(user => (
                    <label
                      key={user.id}
                      className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${selectedUsersToAdd.includes(user.id) ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50 hover:bg-gray-100'}`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedUsersToAdd.includes(user.id)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedUsersToAdd(prev => [...prev, user.id]);
                          } else {
                            setSelectedUsersToAdd(prev => prev.filter(id => id !== user.id));
                          }
                        }}
                        className="w-4 h-4 rounded border-gray-300"
                      />
                      <div className="w-10 h-10 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-semibold">
                        {user.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                        <div className="text-xs text-gray-500">{user.email}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs text-gray-500">{user.group}</div>
                        <div className="text-xs text-gray-400">{user.properties === 'All' ? 'All Properties' : `${user.properties} Properties`}</div>
                      </div>
                      <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                        {user.status}
                      </span>
                    </label>
                  ))}
                {users
                  .filter(u => !groupUsers.some(gu => gu.id === u.id))
                  .filter(u => addUserPropertyFilter === 'All' || u.properties === addUserPropertyFilter)
                  .filter(u => addUserGroupFilter === 'All' || u.group === addUserGroupFilter)
                  .filter(u => addUserSearch === '' || u.name.toLowerCase().includes(addUserSearch.toLowerCase()) || u.email.toLowerCase().includes(addUserSearch.toLowerCase()))
                  .length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
                      <p className="text-sm">No users found matching your filters</p>
                    </div>
                  )}
              </div>
            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t bg-gray-50 flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {selectedUsersToAdd.length} user{selectedUsersToAdd.length !== 1 ? 's' : ''} will be added to {isMultiGroup ? `${drawerGroups.length} groups` : drawerGroups[0]?.name}
              </span>
              <div className="flex gap-3">
                <button
                  onClick={() => { setAddUserModalOpen(false); setSelectedUsersToAdd([]); }}
                  className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  onClick={() => { setAddUserModalOpen(false); setSelectedUsersToAdd([]); }}
                  disabled={selectedUsersToAdd.length === 0}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Add {selectedUsersToAdd.length} User{selectedUsersToAdd.length !== 1 ? 's' : ''}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
