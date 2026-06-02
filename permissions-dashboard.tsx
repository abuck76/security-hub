import React, { useState, useMemo } from 'react';
import { RotateCcw, X, Users, Shield, Building, Search, Save } from 'lucide-react';

// Sample data
const securityGroups = [
  { id: 1, name: 'Super User', propertyIds: [1, 2], userCount: 12 },
  { id: 2, name: 'Regional Manager', propertyIds: [1, 3], userCount: 45 },
  { id: 3, name: 'Property Manager', propertyIds: [2, 4], userCount: 28 },
  { id: 4, name: 'Maintenance Team', propertyIds: [1, 2, 3], userCount: 18 },
  { id: 5, name: 'Marketing Team', propertyIds: [2, 5], userCount: 15 }
];

const userGroups = [
  { id: 1, groupName: 'Super User', groupCode: 'ADM-001', userCount: 12, securityGroupIds: [1], propertyIds: [1, 2] },
  { id: 2, groupName: 'Regional Manager', groupCode: 'REG-001', userCount: 45, securityGroupIds: [2], propertyIds: [1, 3] },
  { id: 3, groupName: 'Property Manager', groupCode: 'PRP-001', userCount: 28, securityGroupIds: [3], propertyIds: [2, 4] },
  { id: 4, groupName: 'Maintenance Team', groupCode: 'MNT-001', userCount: 18, securityGroupIds: [4], propertyIds: [1, 2, 3] },
  { id: 5, groupName: 'Marketing Team', groupCode: 'MKT-001', userCount: 15, securityGroupIds: [5], propertyIds: [2, 5] }
];

const propertyLists = [
  { id: 1, name: 'Atlanta Properties', userCount: 75, type: 'list', groupIds: [1, 2, 4] },
  { id: 2, name: 'All Properties', userCount: 61, type: 'list', groupIds: [1, 2, 3, 4, 5] },
  { id: 3, name: 'Development Properties', userCount: 63, type: 'list', groupIds: [2, 4] }
];

const individualProperties = [
  { id: 101, name: 'Building A', userCount: 45, type: 'individual', groupIds: [1, 2, 4] },
  { id: 102, name: 'Building B', userCount: 40, type: 'individual', groupIds: [1, 3, 4, 5] },
  { id: 103, name: 'Building C', userCount: 38, type: 'individual', groupIds: [2, 4] },
  { id: 104, name: 'Building D', userCount: 28, type: 'individual', groupIds: [3] },
  { id: 105, name: 'Building E', userCount: 15, type: 'individual', groupIds: [5] }
];

// Master permission list (not tied to specific groups)
const masterPermissions = [
  { id: 1, description: 'User Management', programType: 'Core', isNew: false },
  { id: 2, description: 'Report Generation', programType: 'Analytics', isNew: true },
  { id: 3, description: 'Data Export', programType: 'Core', isNew: false },
  { id: 4, description: 'System Configuration', programType: 'Admin', isNew: false },
  { id: 5, description: 'Regional Oversight', programType: 'Management', isNew: false },
  { id: 6, description: 'Multi-Property Dashboard', programType: 'Management', isNew: true },
  { id: 7, description: 'Lease Management', programType: 'Property', isNew: false },
  { id: 8, description: 'Tenant Communications', programType: 'Property', isNew: false },
  { id: 9, description: 'Work Order System', programType: 'Maintenance', isNew: false },
  { id: 10, description: 'Vendor Management', programType: 'Maintenance', isNew: true },
  { id: 11, description: 'Campaign Manager', programType: 'Marketing', isNew: false },
  { id: 12, description: 'Analytics Dashboard', programType: 'Analytics', isNew: true },
  { id: 13, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 14, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Post Bank Reconciliation Button', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 15, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Adjust Bank Reconciliation Button', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 16, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Bank Reconciliation Upload', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 17, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Reconciliation Report', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 18, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Add Attachment', programType: 'Role - Voyager 8 Residential Accounting', isNew: false },
  { id: 19, description: 'Accounting>G/L>Bank Reconciliation>Bank Reconciliation>Delete Attachment', programType: 'Role - Voyager 8 Residential Accounting', isNew: false }
];

// Permission access mapping: permissionId -> { groupId: access }
const permissionAccess = {
  1: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'no access' },
  2: { 1: 'no access', 2: 'access', 3: 'access', 4: 'access', 5: 'access' },
  3: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'access' },
  4: { 1: 'access', 2: 'no access', 3: 'no access', 4: 'no access', 5: 'no access' },
  5: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'no access' },
  6: { 1: 'access', 2: 'access', 3: 'no access', 4: 'access', 5: 'access' },
  7: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'no access' },
  8: { 1: 'access', 2: 'access', 3: 'access', 4: 'access', 5: 'access' },
  9: { 1: 'access', 2: 'access', 3: 'access', 4: 'access', 5: 'no access' },
  10: { 1: 'access', 2: 'access', 3: 'no access', 4: 'access', 5: 'no access' },
  11: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'access' },
  12: { 1: 'access', 2: 'access', 3: 'access', 4: 'access', 5: 'access' },
  13: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'no access' },
  14: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'no access' },
  15: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'no access' },
  16: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'no access' },
  17: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'no access' },
  18: { 1: 'access', 2: 'access', 3: 'access', 4: 'no access', 5: 'no access' },
  19: { 1: 'access', 2: 'access', 3: 'no access', 4: 'no access', 5: 'no access' }
};

const users = [
  { id: 1, groupCode: 'ADM-001', userCode: 'U001', userName: 'jsmith', fullName: 'John Smith', property: 'Building A', groupId: 1 },
  { id: 2, groupCode: 'ADM-001', userCode: 'U002', userName: 'mjones', fullName: 'Mary Jones', property: 'Building B', groupId: 1 },
  { id: 3, groupCode: 'REG-001', userCode: 'U003', userName: 'bwilson', fullName: 'Bob Wilson', property: 'Building A', groupId: 2 },
  { id: 4, groupCode: 'REG-001', userCode: 'U004', userName: 'sdavis', fullName: 'Sarah Davis', property: 'Building C', groupId: 2 },
  { id: 5, groupCode: 'PRP-001', userCode: 'U005', userName: 'rgarcia', fullName: 'Robert Garcia', property: 'Building B', groupId: 3 },
  { id: 6, groupCode: 'PRP-001', userCode: 'U006', userName: 'lmartinez', fullName: 'Lisa Martinez', property: 'Building D', groupId: 3 },
  { id: 7, groupCode: 'MNT-001', userCode: 'U007', userName: 'kanderson', fullName: 'Kevin Anderson', property: 'Building A', groupId: 4 },
  { id: 8, groupCode: 'MNT-001', userCode: 'U008', userName: 'jthomas', fullName: 'Jennifer Thomas', property: 'Building B', groupId: 4 },
  { id: 9, groupCode: 'MKT-001', userCode: 'U009', userName: 'dtaylor', fullName: 'David Taylor', property: 'Building E', groupId: 5 },
  { id: 10, groupCode: 'MKT-001', userCode: 'U010', userName: 'amoore', fullName: 'Ashley Moore', property: 'Building B', groupId: 5 }
];

function StatCard({ icon: Icon, label, value, percentage, color = "text-blue-600" }) {
  return (
    <div className="flex items-center justify-between py-2">
      <div className="flex items-center gap-2">
        <Icon size={18} className={color} />
        <span className="text-gray-700 text-sm">{label}</span>
      </div>
      <div className="flex items-center gap-3">
        <span className="font-semibold text-gray-900">{value}</span>
        {percentage && <span className="text-gray-500 text-sm">{percentage}</span>}
      </div>
    </div>
  );
}

function SelectableCard({ title, icon: Icon, items, selectedIds, onToggle, allItems = [], limitMessage }) {
  const visibleCount = items.length;
  const totalCount = allItems.length || items.length;

  return (
    <div className="bg-white rounded border border-gray-200 overflow-hidden">
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {Icon && <Icon size={18} className="text-gray-600" />}
            <h2 className="font-semibold text-gray-800">{title}</h2>
          </div>
          <div className="text-sm text-gray-500">
            {visibleCount !== totalCount ? `${visibleCount} of ${totalCount}` : totalCount}
          </div>
        </div>
        {limitMessage && (
          <div className="mt-2 text-xs text-amber-700 bg-amber-50 px-2 py-1 rounded">
            {limitMessage}
          </div>
        )}
      </div>
      <div className="p-3 max-h-72 overflow-y-auto bg-gray-50">
        <div className="space-y-1">
          {(allItems.length > 0 ? allItems : items).map(item => {
            const isVisible = allItems.length > 0 ? items.some(i => i.id === item.id) : true;
            const isSelected = selectedIds.includes(item.id);
            const hasZeroUsers = item.userCount === 0;
            
            return (
              <div
                key={item.id}
                onClick={() => isVisible && !hasZeroUsers && onToggle(item.id)}
                className={`px-3 py-2 rounded text-sm transition-colors ${
                  !isVisible
                    ? 'opacity-40 cursor-not-allowed bg-white'
                    : hasZeroUsers
                    ? 'opacity-50 cursor-not-allowed bg-gray-100'
                    : isSelected
                    ? 'bg-blue-100 border border-blue-300 cursor-pointer font-medium'
                    : 'bg-white border border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50'
                }`}
                title={hasZeroUsers ? 'No users available' : (!isVisible ? 'Filtered by selections' : '')}
              >
                <div className="flex justify-between items-center">
                  <span className={`text-gray-700 ${hasZeroUsers ? 'text-gray-400' : ''}`}>{item.name || item.groupName}</span>
                  {item.userCount !== undefined && (
                    <span className={`text-xs px-2 py-0.5 rounded ${
                      hasZeroUsers
                        ? 'bg-gray-200 text-gray-400' 
                        : 'bg-gray-100 text-gray-500'
                    }`}>
                      {item.userCount}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function PermissionsTable({ permissions, selectedGroups, editedPermissions, onPermissionChange }) {
  // Sort permissions to maintain hierarchy order
  const sortedPermissions = useMemo(() => {
    return [...permissions].sort((a, b) => {
      return a.description.localeCompare(b.description);
    });
  }, [permissions]);

  // Helper function to get current access value
  // Since we update all selected groups at once, check the first group
  const getCurrentAccess = (permissionId) => {
    const firstGroupId = selectedGroups[0];
    const editKey = `${permissionId}-${firstGroupId}`;
    
    // If edited, return edited value
    if (editedPermissions[editKey] !== undefined) {
      return editedPermissions[editKey];
    }
    
    // Otherwise return default value
    return permissionAccess[permissionId]?.[firstGroupId] || 'no access';
  };

  // Helper function to find parent permission
  const findParent = (permission) => {
    return sortedPermissions.find(p => 
      p.id !== permission.id && 
      permission.description.startsWith(p.description + '>') &&
      !sortedPermissions.some(other => 
        other.id !== p.id && 
        other.id !== permission.id &&
        permission.description.startsWith(other.description + '>') &&
        other.description.startsWith(p.description + '>')
      )
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Description</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Access</th>
            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Program Type</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {sortedPermissions.map(permission => {
            // Find direct parent
            const parent = findParent(permission);
            const hasParentInList = parent !== undefined;
            const indent = hasParentInList ? 24 : 0;
            
            // Check if parent has no access
            const parentHasNoAccess = parent && getCurrentAccess(parent.id) === 'no access';
            const isDisabled = parentHasNoAccess;
            const effectiveAccess = isDisabled ? 'no access' : getCurrentAccess(permission.id);
            
            return (
              <tr key={permission.id} className={`hover:bg-gray-50 ${isDisabled ? 'opacity-50' : ''}`}>
                <td className="px-4 py-3 text-sm text-gray-800">
                  <div className="flex items-center gap-2" style={{ paddingLeft: `${indent}px` }}>
                    <span className="flex-1">{permission.description}</span>
                    {permission.isNew && (
                      <span className="px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded font-medium whitespace-nowrap">NEW</span>
                    )}
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select
                    value={effectiveAccess}
                    onChange={(e) => onPermissionChange(permission.id, e.target.value)}
                    disabled={isDisabled}
                    className={`px-3 py-1 border border-gray-300 rounded text-sm ${isDisabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white'}`}
                  >
                    <option value="access">Access</option>
                    <option value="no access">No Access</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">{permission.programType}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function UsersTable({ users, editedUsers, onUserEdit, onSave }) {
  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Security Group</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User Code</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">User Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Full Name</th>
              <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase">Property</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {users.map(user => {
              const userGroup = userGroups.find(ug => ug.id === user.groupId);
              const userSecurityGroups = userGroup 
                ? securityGroups.filter(sg => userGroup.securityGroupIds.includes(sg.id))
                : [];
              const securityGroupName = userSecurityGroups.map(sg => sg.name).join(', ') || 'None';
              
              return (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <select
                      value={editedUsers[user.id]?.groupId ?? user.groupId}
                      onChange={(e) => onUserEdit(user.id, 'groupId', parseInt(e.target.value))}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                    >
                      {userGroups.map(ug => {
                        const sgNames = securityGroups
                          .filter(sg => ug.securityGroupIds.includes(sg.id))
                          .map(sg => sg.name)
                          .join(', ');
                        return (
                          <option key={ug.id} value={ug.id}>
                            {sgNames || ug.groupName}
                          </option>
                        );
                      })}
                    </select>
                  </td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.userCode}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.userName}</td>
                  <td className="px-4 py-3 text-sm text-gray-800">{user.fullName}</td>
                  <td className="px-4 py-3">
                    <input
                      type="text"
                      value={editedUsers[user.id]?.property ?? user.property}
                      onChange={(e) => onUserEdit(user.id, 'property', e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-gray-300 rounded bg-white"
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="mt-4 flex justify-end">
        <button onClick={onSave} className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700">
          Save User Changes
        </button>
      </div>
    </>
  );
}

export default function PermissionsDashboard() {
  const [selections, setSelections] = useState({
    securityGroups: [],
    userGroups: [],
    properties: []
  });
  
  const [edits, setEdits] = useState({
    permissions: {},
    users: {}
  });
  
  const [filters, setFilters] = useState({
    programType: '',
    accessType: '',
    description: '',
    showNewOnly: false
  });
  
  const [bulkAction, setBulkAction] = useState('');
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const enhancedPropertyLists = useMemo(() => {
    return propertyLists.map(prop => {
      let userCount = 0;
      prop.groupIds.forEach(gId => {
        userCount += users.filter(u => u.groupId === gId).length;
      });
      return { ...prop, userCount };
    });
  }, []);

  const enhancedIndividualProperties = useMemo(() => {
    return individualProperties.map(prop => {
      const userCount = users.filter(u => u.property === prop.name).length;
      return { ...prop, userCount };
    });
  }, []);

  const enhancedSecurityGroups = useMemo(() => {
    return securityGroups.map(sg => {
      const relatedUserGroups = userGroups.filter(ug => 
        ug.securityGroupIds.includes(sg.id)
      );
      
      const usersInSecurityGroup = users.filter(u => 
        relatedUserGroups.some(ug => ug.id === u.groupId)
      );
      
      let userCount = usersInSecurityGroup.length;
      
      if (selections.properties.length > 0) {
        const selectedPropertyLists = enhancedPropertyLists.filter(p => 
          selections.properties.includes(p.id)
        );
        const selectedIndividualProps = enhancedIndividualProperties.filter(p => 
          selections.properties.includes(p.id)
        );
        
        const filteredUsersList = usersInSecurityGroup.filter(user => {
          const inPropertyList = selectedPropertyLists.some(prop => 
            prop.groupIds.includes(user.groupId)
          );
          
          const inIndividualProperty = selectedIndividualProps.some(prop => 
            user.property === prop.name
          );
          
          return inPropertyList || inIndividualProperty;
        });
        
        userCount = filteredUsersList.length;
      }
      
      return { ...sg, userCount };
    });
  }, [selections.properties, enhancedPropertyLists, enhancedIndividualProperties]);

  const enhancedUserGroups = useMemo(() => {
    return userGroups.map(ug => {
      const usersInGroup = users.filter(u => u.groupId === ug.id);
      let actualUserCount = usersInGroup.length;
      
      if (selections.properties.length > 0) {
        const selectedPropertyLists = enhancedPropertyLists.filter(p => 
          selections.properties.includes(p.id)
        );
        const selectedIndividualProps = enhancedIndividualProperties.filter(p => 
          selections.properties.includes(p.id)
        );
        
        const filteredUsersList = usersInGroup.filter(user => {
          const inPropertyList = selectedPropertyLists.some(prop => 
            prop.groupIds.includes(user.groupId)
          );
          
          const inIndividualProperty = selectedIndividualProps.some(prop => 
            user.property === prop.name
          );
          
          return inPropertyList || inIndividualProperty;
        });
        
        actualUserCount = filteredUsersList.length;
      }
      
      return { ...ug, userCount: actualUserCount };
    });
  }, [selections.properties, enhancedPropertyLists, enhancedIndividualProperties]);

  const filteredSecurityGroups = useMemo(() => {
    let filtered = [...enhancedSecurityGroups];
    
    if (selections.userGroups.length > 0) {
      filtered = filtered.filter(sg => 
        selections.userGroups.some(ugId => {
          const ug = userGroups.find(g => g.id === ugId);
          return ug && ug.securityGroupIds.includes(sg.id);
        })
      );
    }
    
    return filtered;
  }, [selections.userGroups, enhancedSecurityGroups]);

  const filteredUserGroups = useMemo(() => {
    let filtered = [...enhancedUserGroups];
    
    if (selections.securityGroups.length > 0) {
      const visibleSgIds = filteredSecurityGroups.map(sg => sg.id);
      filtered = filtered.filter(ug => visibleSgIds.some(sgId => ug.securityGroupIds.includes(sgId)));
    }
    
    if (selections.properties.length > 0 && selections.securityGroups.length === 0) {
      const selectedProperties = [...enhancedPropertyLists, ...enhancedIndividualProperties].filter(p => 
        selections.properties.includes(p.id)
      );
      const propertyGroupIds = new Set();
      selectedProperties.forEach(prop => {
        prop.groupIds.forEach(gId => propertyGroupIds.add(gId));
      });
      filtered = filtered.filter(ug => propertyGroupIds.has(ug.id));
    }
    
    return filtered;
  }, [selections.securityGroups, selections.properties, filteredSecurityGroups, enhancedUserGroups, enhancedPropertyLists, enhancedIndividualProperties]);

  const filteredProperties = useMemo(() => {
    const filterByGroups = (props) => {
      if (selections.userGroups.length === 0) return props;
      
      return props.filter(prop => {
        return prop.groupIds.some(gId => selections.userGroups.includes(gId));
      });
    };

    return {
      lists: filterByGroups(enhancedPropertyLists),
      individual: filterByGroups(enhancedIndividualProperties)
    };
  }, [selections.userGroups, enhancedPropertyLists, enhancedIndividualProperties]);

  const resetAll = () => {
    setSelections({ securityGroups: [], userGroups: [], properties: [] });
    setFilters({ programType: '', accessType: '', description: '', showNewOnly: false });
    setEdits({ permissions: {}, users: {} });
    setBulkAction('');
  };

  const toggleSelection = (type, id) => {
    setSelections(prev => {
      const current = prev[type];
      
      const updated = Array.isArray(current)
        ? current.includes(id) ? current.filter(i => i !== id) : [...current, id]
        : current === id ? null : id;
      
      if (type === 'userGroups') return { ...prev, [type]: updated, securityGroups: [] };
      
      return { ...prev, [type]: updated };
    });
  };

  const removeSelection = (type, id = null) => {
    setSelections(prev => {
      if (Array.isArray(prev[type])) {
        return { ...prev, [type]: id === null ? [] : prev[type].filter(i => i !== id) };
      }
      return { ...prev, [type]: null };
    });
  };

  const displayPermissions = useMemo(() => {
    if (selections.securityGroups.length === 0) return [];
    
    let filtered = [...masterPermissions];
    if (filters.programType) filtered = filtered.filter(p => p.programType === filters.programType);
    if (filters.description) filtered = filtered.filter(p => p.description.toLowerCase().includes(filters.description.toLowerCase()));
    if (filters.showNewOnly) filtered = filtered.filter(p => p.isNew);
    
    // Filter by access type if selected - check if ANY selected group matches
    if (filters.accessType) {
      filtered = filtered.filter(p => {
        return selections.securityGroups.some(groupId => {
          const editKey = `${p.id}-${groupId}`;
          const access = edits.permissions[editKey] || permissionAccess[p.id]?.[groupId] || 'no access';
          return access === filters.accessType;
        });
      });
    }
    
    return filtered;
  }, [selections.securityGroups, filters, edits.permissions]);

  const affectedUserInfo = useMemo(() => {
    if (selections.securityGroups.length === 0) return null;
    
    const relevantUserGroups = userGroups.filter(ug => 
      ug.securityGroupIds.some(sgId => selections.securityGroups.includes(sgId))
    );
    
    let totalUsers = 0;
    relevantUserGroups.forEach(ug => {
      totalUsers += users.filter(u => u.groupId === ug.id).length;
    });
    
    let filteredUsers = totalUsers;
    let filterApplied = false;
    
    if (selections.properties.length > 0) {
      const usersInSelectedSecurityGroups = users.filter(u => 
        relevantUserGroups.some(ug => ug.id === u.groupId)
      );
      
      const selectedPropertyLists = enhancedPropertyLists.filter(p => 
        selections.properties.includes(p.id)
      );
      const selectedIndividualProps = enhancedIndividualProperties.filter(p => 
        selections.properties.includes(p.id)
      );
      
      const filteredUsersList = usersInSelectedSecurityGroups.filter(user => {
        const inPropertyList = selectedPropertyLists.some(prop => 
          prop.groupIds.includes(user.groupId)
        );
        
        const inIndividualProperty = selectedIndividualProps.some(prop => 
          user.property === prop.name
        );
        
        return inPropertyList || inIndividualProperty;
      });
      
      filteredUsers = filteredUsersList.length;
      filterApplied = true;
    }
    
    return {
      totalUsers,
      filteredUsers,
      filterApplied,
      affectedGroups: relevantUserGroups.length,
      propertyCount: selections.properties.length
    };
  }, [selections.securityGroups, selections.properties, enhancedPropertyLists, enhancedIndividualProperties]);

  const displayUsers = useMemo(() => {
    if (selections.userGroups.length > 0) {
      return users.filter(u => selections.userGroups.includes(u.groupId));
    }
    if (selections.properties.length > 0 && selections.securityGroups.length === 0) {
      const selectedProperties = [...enhancedPropertyLists, ...enhancedIndividualProperties].filter(p => 
        selections.properties.includes(p.id)
      );
      
      const userSet = new Set();
      selectedProperties.forEach(property => {
        if (property.type === 'list') {
          users.filter(u => property.groupIds.includes(u.groupId)).forEach(u => userSet.add(u.id));
        } else {
          users.filter(u => u.property === property.name).forEach(u => userSet.add(u.id));
        }
      });
      
      return users.filter(u => userSet.has(u.id));
    }
    return [];
  }, [selections, enhancedPropertyLists, enhancedIndividualProperties]);

  const handleBulkAction = () => {
    if (!bulkAction) return;
    setShowBulkConfirm(true);
  };

  const confirmBulkAction = () => {
    const newAccess = bulkAction === 'grant' ? 'access' : 'no access';
    const updates = {};
    displayPermissions.forEach(p => {
      selections.securityGroups.forEach(groupId => {
        const editKey = `${p.id}-${groupId}`;
        updates[editKey] = newAccess;
      });
    });
    setEdits(prev => ({ ...prev, permissions: { ...prev.permissions, ...updates } }));
    setShowBulkConfirm(false);
    setBulkAction('');
    alert(`${displayPermissions.length} permissions updated for ${selections.securityGroups.length} security group${selections.securityGroups.length !== 1 ? 's' : ''}`);
  };

  const programTypes = [...new Set(masterPermissions.map(p => p.programType))];
  const hasActiveSelections = selections.securityGroups.length > 0 || selections.userGroups.length > 0 || selections.properties.length > 0;
  const viewMode = selections.securityGroups.length > 0 ? 'permissions' : 
                   (selections.userGroups.length > 0 || (selections.properties.length > 0 && selections.securityGroups.length === 0)) ? 'users' : 'none';

  const totalUsers = users.length;
  
  // Count access granted/denied across all groups and permissions
  let accessGranted = 0;
  let accessDenied = 0;
  Object.keys(permissionAccess).forEach(permId => {
    Object.keys(permissionAccess[permId]).forEach(groupId => {
      if (permissionAccess[permId][groupId] === 'access') accessGranted++;
      else accessDenied++;
    });
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-blue-600 text-white px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h1 className="text-xl font-semibold">Permissions Dashboard</h1>
          {hasActiveSelections && (
            <div className="flex items-center gap-2">
              {selections.securityGroups.map(id => (
                <span key={id} className="bg-blue-700 px-3 py-1 rounded text-sm flex items-center gap-1">
                  {securityGroups.find(g => g.id === id)?.name}
                  <button onClick={() => removeSelection('securityGroups', id)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              {selections.userGroups.map(id => (
                <span key={id} className="bg-blue-700 px-3 py-1 rounded text-sm flex items-center gap-1">
                  {userGroups.find(g => g.id === id)?.groupName}
                  <button onClick={() => removeSelection('userGroups', id)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
              {selections.properties.map(id => (
                <span key={id} className="bg-blue-700 px-3 py-1 rounded text-sm flex items-center gap-1">
                  {[...enhancedPropertyLists, ...enhancedIndividualProperties].find(p => p.id === id)?.name}
                  <button onClick={() => removeSelection('properties', id)}>
                    <X size={14} />
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={resetAll} className="flex items-center gap-2 px-4 py-2 bg-blue-700 hover:bg-blue-800 rounded text-sm">
            <RotateCcw size={16} />
            Clear
          </button>
        </div>
      </div>

      <div className="p-6">
        <div className="grid grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Security Groups</h3>
            <StatCard icon={Shield} label="Total Groups" value={securityGroups.length} color="text-blue-600" />
            <StatCard icon={Users} label="Total Users" value={totalUsers} color="text-green-600" />
          </div>

          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Permissions</h3>
            <StatCard icon={Shield} label="Access Granted" value={accessGranted} color="text-green-600" />
            <StatCard icon={Shield} label="Access Denied" value={accessDenied} color="text-red-600" />
          </div>

          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Properties</h3>
            <StatCard icon={Building} label="Property Lists" value={enhancedPropertyLists.length} color="text-purple-600" />
            <StatCard icon={Building} label="Individual" value={enhancedIndividualProperties.length} color="text-orange-600" />
          </div>

          <div className="bg-white rounded border border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-700 mb-3">Current View</h3>
            <div className="text-center py-4">
              <div className="text-2xl font-bold text-blue-600 capitalize">{viewMode}</div>
              <div className="text-sm text-gray-500 mt-1">
                {viewMode === 'permissions' ? (
                  <>
                    {displayPermissions.length} items
                    {affectedUserInfo && affectedUserInfo.filterApplied && (
                      <div className="text-xs text-blue-600 mt-1">
                        {affectedUserInfo.filteredUsers} users (filtered)
                      </div>
                    )}
                  </>
                ) : viewMode === 'users' ? `${displayUsers.length} users` : 'No selection'}
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <SelectableCard
            title="Security Groups"
            icon={Shield}
            items={filteredSecurityGroups}
            allItems={enhancedSecurityGroups}
            selectedIds={selections.securityGroups}
            onToggle={(id) => toggleSelection('securityGroups', id)}
          />

          <div className="bg-white rounded border border-gray-200 overflow-hidden">
            <div className="bg-white border-b border-gray-200 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Building size={18} className="text-gray-600" />
                  <h2 className="font-semibold text-gray-800">Properties & Lists</h2>
                  {selections.properties.length > 0 && (
                    <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded font-medium">
                      {selections.properties.length} selected
                    </span>
                  )}
                </div>
                <div className="text-sm text-gray-500">
                  {filteredProperties.lists.length + filteredProperties.individual.length} of {enhancedPropertyLists.length + enhancedIndividualProperties.length}
                </div>
              </div>
            </div>
            <div className="p-3 max-h-80 overflow-y-auto bg-gray-50">
              <div className="space-y-3">
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-1">Property Lists</div>
                  <div className="space-y-1">
                    {enhancedPropertyLists.map(prop => {
                      const isVisible = filteredProperties.lists.some(p => p.id === prop.id);
                      const isSelected = selections.properties.includes(prop.id);
                      const hasZeroUsers = prop.userCount === 0;
                      
                      // Count how many individual properties are in this list
                      const propertiesInList = enhancedIndividualProperties.filter(indProp => 
                        indProp.groupIds.some(gId => prop.groupIds.includes(gId))
                      );
                      const propertyCount = propertiesInList.length;
                      const tooltipText = `${propertyCount} ${propertyCount === 1 ? 'property' : 'properties'} in this list:\n${propertiesInList.map(p => p.name).join('\n')}`;
                      
                      return (
                        <div
                          key={prop.id}
                          onClick={() => isVisible && !hasZeroUsers && toggleSelection('properties', prop.id)}
                          title={hasZeroUsers ? 'No users available' : tooltipText}
                          className={`px-3 py-2 rounded text-sm transition-colors ${
                            !isVisible
                              ? 'opacity-40 cursor-not-allowed bg-white'
                              : hasZeroUsers
                              ? 'opacity-50 cursor-not-allowed bg-gray-100'
                              : isSelected
                              ? 'bg-blue-100 border border-blue-300 cursor-pointer font-medium'
                              : 'bg-white border border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50'
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-gray-700 ${hasZeroUsers ? 'text-gray-400' : ''}`}>{prop.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              hasZeroUsers
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {prop.userCount} {prop.userCount === 1 ? 'User' : 'Users'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="text-xs font-semibold text-gray-500 uppercase mb-2 px-1">Individual Properties</div>
                  <div className="space-y-1">
                    {enhancedIndividualProperties.map(prop => {
                      const isVisible = filteredProperties.individual.some(p => p.id === prop.id);
                      const isSelected = selections.properties.includes(prop.id);
                      const hasZeroUsers = prop.userCount === 0;
                      
                      // Check if this individual property is part of a selected property list
                      const selectedPropertyLists = enhancedPropertyLists.filter(pl => 
                        selections.properties.includes(pl.id)
                      );
                      const isHighlighted = selectedPropertyLists.some(list => {
                        // Property is highlighted if it shares any groupIds with the selected list
                        return list.groupIds.some(gId => prop.groupIds.includes(gId));
                      });
                      
                      return (
                        <div
                          key={prop.id}
                          onClick={() => isVisible && !hasZeroUsers && toggleSelection('properties', prop.id)}
                          className={`px-3 py-2 rounded text-sm transition-colors ${
                            !isVisible
                              ? 'opacity-40 cursor-not-allowed bg-white'
                              : hasZeroUsers
                              ? 'opacity-50 cursor-not-allowed bg-gray-100'
                              : isSelected
                              ? 'bg-blue-100 border border-blue-300 cursor-pointer font-medium'
                              : isHighlighted
                              ? 'bg-yellow-50 border-2 border-yellow-400 cursor-pointer'
                              : 'bg-white border border-gray-200 cursor-pointer hover:border-blue-300 hover:bg-blue-50'
                          }`}
                          title={hasZeroUsers ? 'No users available' : ''}
                        >
                          <div className="flex justify-between items-center">
                            <span className={`text-gray-700 ${isHighlighted && !hasZeroUsers ? 'font-medium' : ''} ${hasZeroUsers ? 'text-gray-400' : ''}`}>{prop.name}</span>
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              hasZeroUsers
                                ? 'bg-gray-200 text-gray-400'
                                : 'bg-gray-100 text-gray-500'
                            }`}>
                              {prop.userCount} {prop.userCount === 1 ? 'User' : 'Users'}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <SelectableCard
            title="Users in Group"
            icon={Users}
            items={filteredUserGroups}
            allItems={enhancedUserGroups}
            selectedIds={selections.userGroups}
            onToggle={(id) => toggleSelection('userGroups', id)}
          />
        </div>

        <div className="bg-white rounded border border-gray-200">
          {selections.securityGroups.length > 0 && (
            <>
              <div className="border-b border-gray-200 px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="font-semibold text-gray-800">
                    Permissions for {selections.securityGroups.map(id => securityGroups.find(g => g.id === id)?.name).join(', ')}
                    {selections.properties.length > 0 && (
                      <span className="text-sm font-normal text-gray-600 ml-2">
                        (filtered by {selections.properties.length} {selections.properties.length === 1 ? 'property' : 'properties'})
                      </span>
                    )}
                  </h2>
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                      <Save size={16} />
                      Save Changes
                    </button>
                  </div>
                </div>
                {affectedUserInfo && (
                  <div className="flex items-center gap-2 text-sm">
                    {affectedUserInfo.filterApplied ? (
                      <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3 py-1.5 rounded">
                        <Users size={14} className="inline mr-1" />
                        Affecting <strong>{affectedUserInfo.filteredUsers}</strong> of {affectedUserInfo.totalUsers} users
                        {affectedUserInfo.propertyCount > 0 && (
                          <span className="ml-1 text-blue-600">
                            (filtered by {affectedUserInfo.propertyCount} {affectedUserInfo.propertyCount === 1 ? 'property' : 'properties'})
                          </span>
                        )}
                      </div>
                    ) : (
                      <div className="bg-gray-50 border border-gray-200 text-gray-700 px-3 py-1.5 rounded">
                        <Users size={14} className="inline mr-1" />
                        Affecting <strong>{affectedUserInfo.totalUsers}</strong> users across {affectedUserInfo.affectedGroups} groups
                      </div>
                    )}
                  </div>
                )}
              </div>
              
              <div className="p-4 bg-gray-50 border-b border-gray-200">
                <div className="grid grid-cols-6 gap-3">
                  <select 
                    value={filters.programType} 
                    onChange={(e) => setFilters(prev => ({ ...prev, programType: e.target.value }))} 
                    className="px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="">All Program Types</option>
                    {programTypes.map(type => <option key={type} value={type}>{type}</option>)}
                  </select>
                  
                  <select 
                    value={filters.accessType} 
                    onChange={(e) => setFilters(prev => ({ ...prev, accessType: e.target.value }))} 
                    className="px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="">All Access</option>
                    <option value="access">Access</option>
                    <option value="no access">No Access</option>
                  </select>
                  
                  <div className="col-span-2 relative">
                    <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      value={filters.description}
                      onChange={(e) => setFilters(prev => ({ ...prev, description: e.target.value }))}
                      placeholder="Search..."
                      className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded text-sm bg-white"
                    />
                  </div>
                  
                  <select 
                    value={bulkAction} 
                    onChange={(e) => setBulkAction(e.target.value)} 
                    className="px-3 py-2 border border-gray-300 rounded text-sm bg-white"
                  >
                    <option value="">Bulk Action</option>
                    <option value="grant">Grant All</option>
                    <option value="revoke">Revoke All</option>
                  </select>
                  
                  <button 
                    onClick={handleBulkAction} 
                    disabled={!bulkAction} 
                    className="px-3 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Apply ({displayPermissions.length})
                  </button>
                </div>
                
                <div className="mt-3 flex items-center gap-4">
                  <label className="flex items-center gap-2 text-sm">
                    <input 
                      type="checkbox" 
                      checked={filters.showNewOnly} 
                      onChange={(e) => setFilters(prev => ({ ...prev, showNewOnly: e.target.checked }))}
                      className="rounded"
                    />
                    <span className="text-gray-700">New Only</span>
                  </label>
                </div>
              </div>
              
              <PermissionsTable
                permissions={displayPermissions}
                selectedGroups={selections.securityGroups}
                editedPermissions={edits.permissions}
                onPermissionChange={(permId, access) => {
                  // Update permission for ALL selected groups
                  const updates = {};
                  selections.securityGroups.forEach(groupId => {
                    const editKey = `${permId}-${groupId}`;
                    updates[editKey] = access;
                  });
                  setEdits(prev => ({ ...prev, permissions: { ...prev.permissions, ...updates } }));
                }}
              />
            </>
          )}
          
          {(selections.userGroups.length > 0 || selections.properties.length > 0) && selections.securityGroups.length === 0 && (
            <>
              <div className="border-b border-gray-200 px-4 py-3 flex items-center justify-between">
                <h2 className="font-semibold text-gray-800">
                  {selections.userGroups.length > 0 
                    ? `Users in ${selections.userGroups.map(id => userGroups.find(g => g.id === id)?.groupName).join(', ')}`
                    : `Users in ${selections.properties.map(id => [...enhancedPropertyLists, ...enhancedIndividualProperties].find(p => p.id === id)?.name).join(', ')}`
                  }
                </h2>
                <button className="flex items-center gap-2 px-3 py-1.5 bg-green-600 text-white rounded text-sm hover:bg-green-700">
                  <Save size={16} />
                  Save Changes
                </button>
              </div>
              <UsersTable
                users={displayUsers}
                editedUsers={edits.users}
                onUserEdit={(id, field, value) => setEdits(prev => ({ ...prev, users: { ...prev.users, [id]: { ...prev.users[id], [field]: value } } }))}
                onSave={() => alert('User changes saved!')}
              />
            </>
          )}
          
          {selections.securityGroups.length === 0 && selections.userGroups.length === 0 && selections.properties.length === 0 && (
            <div className="text-center py-16 px-4">
              <div className="text-gray-400 mb-4">
                <Shield size={64} className="mx-auto" />
              </div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Select an item to begin</h3>
              <p className="text-sm text-gray-500 mb-4">Choose Security Groups to manage permissions or User Groups/Properties to view users</p>
            </div>
          )}
        </div>
      </div>

      {showBulkConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded border border-gray-300 p-6 max-w-md shadow-xl">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">Confirm Bulk Action</h3>
            <p className="text-gray-700 mb-6">
              This will {bulkAction === 'grant' ? 'grant access' : 'revoke access'} for{' '}
              <strong>{displayPermissions.length} permission{displayPermissions.length !== 1 ? 's' : ''}</strong>
              {' '}across {selections.securityGroups.length} security group{selections.securityGroups.length !== 1 ? 's' : ''}.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowBulkConfirm(false)}
                className="px-4 py-2 border border-gray-300 rounded text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmBulkAction}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}