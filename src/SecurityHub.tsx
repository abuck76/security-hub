import { useState } from 'react';
import { Search, X, Users, Shield, Plus, Trash2, Check, FileText, BarChart3, Star } from 'lucide-react';

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
  { id: 1, name: 'AR Manager', enabled: true, isDefault: false },
  { id: 2, name: 'AR Manager - Payments', enabled: false, isDefault: false },
  { id: 3, name: 'AR Manager - Payments Admin', enabled: false, isDefault: false },
  { id: 4, name: 'CRM IQ', enabled: true, isDefault: false },
  { id: 5, name: 'Procure to Pay v2', enabled: false, isDefault: false },
  { id: 6, name: 'System Administration', enabled: true, isDefault: false },
  { id: 7, name: 'Voyager 8 Residential', enabled: true, isDefault: true },
  { id: 8, name: 'Voyager 8 Residential - Leasing', enabled: false, isDefault: false },
];

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
  const [drawer, setDrawer] = useState({ open: false, type: null, data: null });
  const [drawerTab, setDrawerTab] = useState('users');
  const [drawerLayer, setDrawerLayer] = useState(1); // 1: Roles/Users, 2: Database Selection, 3: DB-specific settings
  const [selectedDatabase, setSelectedDatabase] = useState(null);
  const [databaseSearch, setDatabaseSearch] = useState('');
  const [databaseAccess, setDatabaseAccess] = useState([1, 3, 5]); // IDs of databases with access (default: Blue Moon, Live, Yardi Test)
  const [selectedAccessDbs, setSelectedAccessDbs] = useState([]);
  const [selectedNoAccessDbs, setSelectedNoAccessDbs] = useState([]);

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

      <div className={`fixed right-0 top-0 h-full w-[1400px] min-w-[1400px] max-w-[1400px] bg-white shadow-2xl z-50 transform transition-transform duration-300 overflow-hidden ${drawer.open ? 'translate-x-0' : 'translate-x-full'}`}>
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
              <button onClick={() => { setDrawer({ open: false, type: null, data: null }); setDrawerLayer(1); setSelectedDatabase(null); }} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>

            {drawer.type === 'group' ? (
              <>
                {/* Layer Navigation Breadcrumb */}
                <div className="px-6 py-2 bg-gray-50 border-b flex items-center gap-2 text-sm">
                  <button
                    onClick={() => { setDrawerLayer(1); setSelectedDatabase(null); setDrawerTab('users'); }}
                    className={`${drawerLayer === 1 ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                  >
                    Multitenant
                  </button>
                  {drawerLayer >= 2 && (
                    <>
                      <span className="text-gray-400">/</span>
                      <button
                        onClick={() => { setDrawerLayer(2); setSelectedDatabase(null); }}
                        className={`${drawerLayer === 2 ? 'text-blue-600 font-medium' : 'text-gray-500 hover:text-gray-700'}`}
                      >
                        Databases
                      </button>
                    </>
                  )}
                  {drawerLayer === 3 && selectedDatabase && (
                    <>
                      <span className="text-gray-400">/</span>
                      <span className="text-blue-600 font-medium">{selectedDatabase.name}</span>
                    </>
                  )}
                </div>

                {/* Layer 1: Multitenant - Users & Roles */}
                {drawerLayer === 1 && (
                  <div className="px-6 border-b">
                    <div className="flex gap-1">
                      {['users', 'roles'].map(tab => (
                        <button key={tab} onClick={() => setDrawerTab(tab)} className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${drawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                          {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                      <div className="flex-1" />
                      <button
                        onClick={() => setDrawerLayer(2)}
                        className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-sm font-medium rounded-lg hover:from-blue-700 hover:to-indigo-700 flex items-center gap-2 shadow-md hover:shadow-lg transition-all"
                      >
                        <Shield className="w-4 h-4" />
                        Configure Database Settings
                        <span className="ml-1">→</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* Layer 2: Database Selection */}
                {drawerLayer === 2 && (
                  <div className="px-6 border-b">
                    <div className="flex items-center gap-4 py-3">
                      <button onClick={() => { setDrawerLayer(1); setDrawerTab('users'); }} className="text-sm text-gray-500 hover:text-gray-700">← Back to Roles & Users</button>
                      <span className="text-sm text-gray-700 font-medium">Select a database to configure permissions and settings</span>
                    </div>
                  </div>
                )}

                {/* Layer 3: Database-specific Settings */}
                {drawerLayer === 3 && (
                  <div className="px-6 border-b">
                    <div className="flex gap-1">
                      <button onClick={() => { setDrawerLayer(2); setSelectedDatabase(null); }} className="px-3 py-3 text-sm text-gray-500 hover:text-gray-700">← Back</button>
                      {['permissions', 'accounts', 'accountTrees', 'chargeCodes', 'displayTypes', 'book', 'reports'].map(tab => (
                        <button key={tab} onClick={() => setDrawerTab(tab)} className={`px-2 py-3 text-xs font-medium border-b-2 transition-colors whitespace-nowrap ${drawerTab === tab ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500'}`}>
                          {tab === 'chargeCodes' ? 'Charge Codes' : tab === 'accountTrees' ? 'Acct Trees' : tab === 'displayTypes' ? 'Display Types' : tab === 'book' ? 'Book' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex-1 overflow-auto p-6 w-full min-h-0" style={{height: 'calc(100vh - 200px)'}}>
                  {/* Layer 2: Database Selection Content */}
                  {drawerLayer === 2 && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Users className="w-4 h-4" />
                        Managing database access for <span className="font-semibold text-gray-900">{isMultiGroup ? `${drawerGroups.length} groups` : drawerGroups[0]?.name}</span>
                      </div>

                      <div className="relative mb-4">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search databases..."
                          value={databaseSearch}
                          onChange={(e) => setDatabaseSearch(e.target.value)}
                          className="w-full pl-10 pr-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>

                      <div className="flex gap-4">
                        {/* Access Column */}
                        <div className="flex-1">
                          <div className="bg-teal-600 text-white text-sm font-medium px-3 py-2 rounded-t flex items-center justify-between">
                            <span>Access</span>
                            <span className="bg-teal-500 px-2 py-0.5 rounded text-xs">{databasesData.filter(db => databaseAccess.includes(db.id)).length}</span>
                          </div>
                          <div className="border border-t-0 rounded-b h-64 overflow-auto">
                            {databasesData
                              .filter(db => databaseAccess.includes(db.id) && db.name.toLowerCase().includes(databaseSearch.toLowerCase()))
                              .map(db => (
                              <div
                                key={db.id}
                                className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 ${selectedAccessDbs.includes(db.id) ? 'bg-blue-50' : ''}`}
                                onClick={() => setSelectedAccessDbs(prev => prev.includes(db.id) ? prev.filter(id => id !== db.id) : [...prev, db.id])}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedAccessDbs.includes(db.id)}
                                  onChange={() => {}}
                                  className="w-4 h-4 rounded border-gray-300"
                                />
                                <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-semibold">
                                  {db.code}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium">{db.name}</div>
                                  <div className="text-xs text-gray-500">{db.type}</div>
                                </div>
                                <button
                                  onClick={(e) => { e.stopPropagation(); setSelectedDatabase(db); setDrawerLayer(3); setDrawerTab('permissions'); }}
                                  className="px-2 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                  Configure
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Transfer Buttons */}
                        <div className="flex flex-col justify-center gap-2">
                          <button
                            onClick={() => {
                              setDatabaseAccess(prev => prev.filter(id => !selectedAccessDbs.includes(id)));
                              setSelectedAccessDbs([]);
                            }}
                            disabled={selectedAccessDbs.length === 0}
                            className="px-3 py-2 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            →
                          </button>
                          <button
                            onClick={() => {
                              setDatabaseAccess(prev => [...prev, ...selectedNoAccessDbs]);
                              setSelectedNoAccessDbs([]);
                            }}
                            disabled={selectedNoAccessDbs.length === 0}
                            className="px-3 py-2 border rounded text-sm font-medium hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            ←
                          </button>
                        </div>

                        {/* No Access Column */}
                        <div className="flex-1">
                          <div className="bg-gray-500 text-white text-sm font-medium px-3 py-2 rounded-t flex items-center justify-between">
                            <span>No Access</span>
                            <span className="bg-gray-400 px-2 py-0.5 rounded text-xs">{databasesData.filter(db => !databaseAccess.includes(db.id)).length}</span>
                          </div>
                          <div className="border border-t-0 rounded-b h-64 overflow-auto">
                            {databasesData
                              .filter(db => !databaseAccess.includes(db.id) && db.name.toLowerCase().includes(databaseSearch.toLowerCase()))
                              .map(db => (
                              <div
                                key={db.id}
                                className={`flex items-center gap-2 px-3 py-2 cursor-pointer hover:bg-gray-50 ${selectedNoAccessDbs.includes(db.id) ? 'bg-blue-50' : ''}`}
                                onClick={() => setSelectedNoAccessDbs(prev => prev.includes(db.id) ? prev.filter(id => id !== db.id) : [...prev, db.id])}
                              >
                                <input
                                  type="checkbox"
                                  checked={selectedNoAccessDbs.includes(db.id)}
                                  onChange={() => {}}
                                  className="w-4 h-4 rounded border-gray-300"
                                />
                                <div className="w-8 h-8 rounded-full bg-gray-200 text-gray-600 flex items-center justify-center text-xs font-semibold">
                                  {db.code}
                                </div>
                                <div className="flex-1">
                                  <div className="text-sm font-medium text-gray-600">{db.name}</div>
                                  <div className="text-xs text-gray-400">{db.type}</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between mt-4 pt-4 border-t">
                        <p className="text-xs text-gray-500">
                          Select databases and use the arrows to grant or revoke access. Check databases in the Access column, then click "Configure Selected" to manage settings for multiple databases at once.
                        </p>
                        <button
                          onClick={() => { setSelectedDatabase({ id: 'selected', name: `${selectedAccessDbs.length} Selected Databases`, code: 'SEL', selectedIds: selectedAccessDbs }); setDrawerLayer(3); setDrawerTab('permissions'); }}
                          disabled={selectedAccessDbs.length === 0}
                          className="px-4 py-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                        >
                          Configure Selected ({selectedAccessDbs.length})
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Layer 1: Users Tab */}
                  {drawerLayer === 1 && drawerTab === 'users' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-gray-500">{groupUsers.length} users in {isMultiGroup ? 'these groups' : 'this group'}</span>
                        <button
                          onClick={() => { setAddUserModalOpen(true); setSelectedUsersToAdd([]); setAddUserPropertyFilter('All'); setAddUserGroupFilter('All'); setAddUserSearch(''); }}
                          className="px-3 py-1.5 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 flex items-center gap-1"
                        ><Plus className="w-3 h-3" /> Add User</button>
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

                  {/* Layer 1: Roles Tab */}
                  {drawerLayer === 1 && drawerTab === 'roles' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Editing roles for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
                      <p className="text-sm text-gray-500 mb-4">Assign roles to {isMultiGroup ? 'these security groups' : 'this security group'}. Click the <Star className="w-3 h-3 inline text-amber-500 fill-amber-500" /> to set the default role used upon login.</p>
                      
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
                        <div key={role.id} className={`flex items-center justify-between p-3 rounded-lg ${role.isDefault ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50'} hover:bg-gray-100`}>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => setRolesList(prev => prev.map(r => ({ ...r, isDefault: r.id === role.id })))}
                              className={`p-1 rounded transition-colors ${role.isDefault ? 'text-amber-500' : 'text-gray-300 hover:text-amber-400'}`}
                              title={role.isDefault ? 'Default role on login' : 'Set as default role'}
                            >
                              <Star className={`w-4 h-4 ${role.isDefault ? 'fill-amber-500' : ''}`} />
                            </button>
                            <span className="text-sm">{role.name}</span>
                            {role.isDefault && <span className="text-xs bg-amber-100 text-amber-700 px-2 py-0.5 rounded-full font-medium">Default</span>}
                          </div>
                          <div onClick={() => setRolesList(prev => prev.map(r => r.id === role.id ? {...r, enabled: !r.enabled} : r))} className={`w-10 h-6 rounded-full p-1 transition-colors cursor-pointer ${role.enabled ? 'bg-blue-600' : 'bg-gray-300'}`}>
                            <div className={`w-4 h-4 bg-white rounded-full transition-transform ${role.enabled ? 'translate-x-4' : ''}`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Layer 3: Permissions Tab */}
                  {drawerLayer === 3 && drawerTab === 'permissions' && (
                    <div className="space-y-4">
                      <div className="flex items-center gap-2 text-sm text-gray-600"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Affecting <span className="font-semibold text-gray-900">{totalUsersInDrawer}</span> users across <span className="font-semibold text-gray-900">{drawerGroups.length}</span> group{drawerGroups.length > 1 ? 's' : ''}</div>
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
                  {drawerLayer === 3 && drawerTab === 'accounts' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing accounts for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                  {drawerLayer === 3 && drawerTab === 'accountTrees' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing account trees for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                  {drawerLayer === 3 && drawerTab === 'chargeCodes' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing charge codes for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                  {drawerLayer === 3 && drawerTab === 'displayTypes' && (
                    <div className="space-y-3">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing display types for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                  {drawerLayer === 3 && drawerTab === 'book' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing books for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                  {drawerLayer === 3 && drawerTab === 'reports' && (
                    <div className="space-y-2">
                      {isMultiGroup && <div className="flex items-center gap-2 text-sm text-gray-600 mb-2"><Users className="w-4 h-4" />Database: <span className="font-semibold text-blue-600">{selectedDatabase?.name}</span> • Editing reports for <span className="font-semibold text-gray-900">{drawerGroups.length}</span> groups</div>}
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
                    <option value="All">All</option>
                    <option value="2">2 Properties</option>
                    <option value="3">3 Properties</option>
                    <option value="4">4 Properties</option>
                    <option value="5">5 Properties</option>
                    <option value="8">8 Properties</option>
                    <option value="10">10 Properties</option>
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
