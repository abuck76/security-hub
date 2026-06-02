import React, { useState, useMemo, useCallback } from 'react';
import { ChevronRight, ChevronDown, Upload, Search, Download, X, FileText } from 'lucide-react';
import * as Papa from 'papaparse';

export default function RoleGapAnalysisTool() {
  const [rawData, setRawData] = useState([]);
  const [allRoles, setAllRoles] = useState([]);
  const [roleGroups, setRoleGroups] = useState({});
  const [targetRole, setTargetRole] = useState('Voyager 8 Residential - Accounting');
  const [selectedSourceRoles, setSelectedSourceRoles] = useState(new Set());
  const [expandedGroups, setExpandedGroups] = useState(new Set());
  const [sourceRoleSectionExpanded, setSourceRoleSectionExpanded] = useState(true);
  const [currentView, setCurrentView] = useState('gaps');
  const [searchTerm, setSearchTerm] = useState('');
  const [productFilter, setProductFilter] = useState('all');
  const [showEmptyRoutes, setShowEmptyRoutes] = useState(false);
  const [dedupMode, setDedupMode] = useState('route');
  const [exclusions, setExclusions] = useState({
    reports: true,
    dashboards: true,
    analytics: true,
    ysr: false
  });
  const [importedRoutes, setImportedRoutes] = useState(null);
  const [importFileName, setImportFileName] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const [consolidateByRoute, setConsolidateByRoute] = useState(true);
  const [sourceRoleSearch, setSourceRoleSearch] = useState('');

  // Pattern matchers for exclusions
  const isReport = (item) => /report/i.test(item.name) || /report/i.test(item.route);
  const isDashboard = (item) => /dashboard/i.test(item.name) || /dashboard/i.test(item.route);
  const isAnalytics = (item) => /analytics/i.test(item.name) || /analytics/i.test(item.route);
  const isYSR = (item) => /\bysr\b/i.test(item.name) || /\bysr\b/i.test(item.route);

  const shouldExclude = (item) => {
    if (exclusions.reports && isReport(item)) return true;
    if (exclusions.dashboards && isDashboard(item)) return true;
    if (exclusions.analytics && isAnalytics(item)) return true;
    if (exclusions.ysr && isYSR(item)) return true;
    return false;
  };

  // Group roles by category
  const groupRoles = (roles) => {
    const groups = {};
    roles.forEach(role => {
      let group = 'Other';
      const lowerRole = role.toLowerCase();
      
      // Check for specific manager types first (more specific patterns)
      if (lowerRole.includes('ar manager')) group = 'AR Manager';
      else if (lowerRole.includes('gl manager')) group = 'GL Manager';
      else if (lowerRole.includes('ap manager')) group = 'AP Manager';
      else if (lowerRole.includes('voyager 8')) group = 'Voyager 8';
      else if (lowerRole.includes('voyager 7')) group = 'Voyager 7';
      else if (lowerRole.includes('crmiq')) group = 'CRMIQ';
      // Break out admins by their product/type
      else if (lowerRole.includes('admin')) {
        // Try to identify what kind of admin
        if (lowerRole.includes('commercial')) group = 'Commercial Admin';
        else if (lowerRole.includes('residential')) group = 'Residential Admin';
        else if (lowerRole.includes('affordable')) group = 'Affordable Admin';
        else if (lowerRole.includes('senior')) group = 'Senior Admin';
        else if (lowerRole.includes('pha')) group = 'PHA Admin';
        else if (lowerRole.includes('hap')) group = 'HAP Admin';
        else if (lowerRole.includes('system')) group = 'System Admin';
        else if (lowerRole.includes('super')) group = 'Super Admin';
        else if (lowerRole.includes('property')) group = 'Property Admin';
        else if (lowerRole.includes('site')) group = 'Site Admin';
        else if (lowerRole.includes('corporate')) group = 'Corporate Admin';
        else if (lowerRole.includes('regional')) group = 'Regional Admin';
        else if (lowerRole.includes('portfolio')) group = 'Portfolio Admin';
        else if (lowerRole.includes('accounting')) group = 'Accounting Admin';
        else if (lowerRole.includes('maintenance')) group = 'Maintenance Admin';
        else if (lowerRole.includes('leasing')) group = 'Leasing Admin';
        else {
          // Extract the word before "admin" to use as group name
          const match = role.match(/(\w+)\s+admin/i);
          if (match) {
            group = match[1].charAt(0).toUpperCase() + match[1].slice(1) + ' Admin';
          } else {
            group = 'Admin (Other)';
          }
        }
      }
      else if (lowerRole.includes('commercial')) group = 'Commercial';
      else if (lowerRole.includes('residential')) group = 'Residential';
      else if (lowerRole.includes('affordable')) group = 'Affordable';
      else if (lowerRole.includes('super')) group = 'Super';
      else {
        const firstWord = role.split(' ')[0];
        group = firstWord;
      }
      
      if (!groups[group]) groups[group] = [];
      groups[group].push(role);
    });
    return groups;
  };

  // Handle main CSV file upload
  const handleFileUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const data = results.data;
        setRawData(data);
        
        const roles = [...new Set(data.map(r => r.Role).filter(Boolean))].sort();
        setAllRoles(roles);
        setRoleGroups(groupRoles(roles));
        setDataLoaded(true);
      }
    });
  };

  // Handle import of gaps CSV
  const handleImportUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        const routes = new Set();
        results.data.forEach(row => {
          const route = (row['Menu Item Route'] || '').toLowerCase().trim();
          if (route) routes.add(route);
        });
        setImportedRoutes(routes);
        setImportFileName(file.name);
      }
    });
  };

  const clearImport = () => {
    setImportedRoutes(null);
    setImportFileName('');
  };

  // Get target role items
  const targetRoleItems = useMemo(() => {
    if (!targetRole) return [];
    return rawData.filter(r => r.Role === targetRole);
  }, [rawData, targetRole]);

  // Run gap analysis
  const analysisResults = useMemo(() => {
    if (!targetRole || selectedSourceRoles.size === 0) return [];

    // Build target keys
    const targetKeys = new Set();
    targetRoleItems.forEach(item => {
      const name = (item['Menu Item Name'] || '').toLowerCase().trim();
      const route = (item['Menu Item Route'] || '').toLowerCase().trim();
      const product = (item['Menu Item Product'] || '').toLowerCase().trim();
      if (name) targetKeys.add(`name:${name}`);
      if (route) {
        targetKeys.add(`route:${route}`);
        targetKeys.add(`routeproduct:${route}||${product}`);
      }
    });

    // Get source items
    const sourceItems = rawData.filter(r => selectedSourceRoles.has(r.Role));

    // Helper functions
    const getKey = (name, route, product) => {
      if (dedupMode === 'name') {
        if (name?.trim()) return `name:${name.toLowerCase().trim()}`;
        return route ? `route:${route.toLowerCase()}` : `__empty__${product}`;
      } else if (dedupMode === 'route') {
        if (route?.trim()) return `route:${route.toLowerCase().trim()}`;
        return `__empty__${name}__${product}`;
      } else {
        if (route?.trim()) return `routeproduct:${route.toLowerCase().trim()}||${product.toLowerCase().trim()}`;
        return `__empty__${name}__${product}`;
      }
    };

    const existsInTarget = (name, route, product) => {
      if (dedupMode === 'name') {
        if (name && targetKeys.has(`name:${name.toLowerCase().trim()}`)) return true;
        if (route && targetKeys.has(`route:${route.toLowerCase().trim()}`)) return true;
        return false;
      } else if (dedupMode === 'route') {
        return route && targetKeys.has(`route:${route.toLowerCase().trim()}`);
      } else {
        return route && targetKeys.has(`routeproduct:${route.toLowerCase().trim()}||${product.toLowerCase().trim()}`);
      }
    };

    // Consolidate source items
    const sourceMap = new Map();
    sourceItems.forEach(item => {
      const name = (item['Menu Item Name'] || '').trim();
      const route = (item['Menu Item Route'] || '').trim();
      const product = (item['Menu Item Product'] || '').trim();
      const key = getKey(name, route, product);

      if (!sourceMap.has(key)) {
        sourceMap.set(key, {
          name,
          route,
          routes: new Set(route ? [route] : []),
          product,
          products: new Set([product]),
          pageUrl: item['Menu Item Page URL'] || '',
          sourceRoles: new Set()
        });
      } else {
        const entry = sourceMap.get(key);
        entry.products.add(product);
        if (route) entry.routes.add(route);
        if (!entry.name && name) entry.name = name;
        if (!entry.route && route) entry.route = route;
        if (!entry.pageUrl && item['Menu Item Page URL']) entry.pageUrl = item['Menu Item Page URL'];
      }
      sourceMap.get(key).sourceRoles.add(item.Role);
    });

    // Build results
    const results = [];
    sourceMap.forEach((item) => {
      const exists = existsInTarget(item.name, item.route, item.product);
      results.push({
        ...item,
        routeList: [...item.routes].join(' | '),
        productList: [...item.products].join(', '),
        isGap: !exists
      });
    });

    // Sort: gaps first, then by name
    results.sort((a, b) => {
      if (a.isGap !== b.isGap) return a.isGap ? -1 : 1;
      return a.name.localeCompare(b.name);
    });

    return results;
  }, [targetRole, selectedSourceRoles, rawData, targetRoleItems, dedupMode]);

  // Filter results for display
  const filteredResults = useMemo(() => {
    let filtered = analysisResults;

    // Apply import filter
    if (importedRoutes) {
      filtered = filtered.filter(item => {
        const route = (item.route || '').toLowerCase().trim();
        return importedRoutes.has(route);
      });
    }

    // View filter
    if (currentView === 'gaps') filtered = filtered.filter(r => r.isGap);
    else if (currentView === 'exists') filtered = filtered.filter(r => !r.isGap);

    // Apply exclusions
    if (currentView === 'gaps' || currentView === 'all') {
      filtered = filtered.filter(item => !item.isGap || !shouldExclude(item));
    }

    // Search
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.name.toLowerCase().includes(term) ||
        r.route.toLowerCase().includes(term)
      );
    }

    // Product filter
    if (productFilter !== 'all') {
      filtered = filtered.filter(r => r.product === productFilter);
    }

    // Empty routes
    if (!showEmptyRoutes) {
      filtered = filtered.filter(r => r.route);
    }

    // Consolidate by route - merge items with same route but different names
    if (consolidateByRoute) {
      const routeMap = new Map();
      filtered.forEach(item => {
        const routeKey = (item.route || '').toLowerCase().trim();
        if (!routeKey) {
          // Keep items without routes as-is
          const uniqueKey = `__noroute__${item.name}`;
          routeMap.set(uniqueKey, item);
          return;
        }
        
        if (!routeMap.has(routeKey)) {
          routeMap.set(routeKey, {
            ...item,
            names: new Set([item.name]),
            routes: item.routes ? new Set(item.routes) : new Set([item.route]),
            products: item.products ? new Set(item.products) : new Set([item.product]),
            sourceRoles: new Set(item.sourceRoles)
          });
        } else {
          const existing = routeMap.get(routeKey);
          existing.names.add(item.name);
          if (item.routes) {
            item.routes.forEach(r => existing.routes.add(r));
          } else if (item.route) {
            existing.routes.add(item.route);
          }
          if (item.products) {
            item.products.forEach(p => existing.products.add(p));
          } else if (item.product) {
            existing.products.add(item.product);
          }
          item.sourceRoles.forEach(r => existing.sourceRoles.add(r));
        }
      });
      
      filtered = Array.from(routeMap.values()).map(item => ({
        ...item,
        name: item.names ? (item.names.size > 1 ? `${[...item.names][0]} (+${item.names.size - 1} more)` : [...item.names][0]) : item.name,
        allNames: item.names ? [...item.names] : [item.name],
        routeList: item.routes ? [...item.routes].join(' | ') : item.route,
        productList: item.products ? [...item.products].join(', ') : item.product
      }));
    }

    return filtered;
  }, [analysisResults, currentView, searchTerm, productFilter, showEmptyRoutes, exclusions, importedRoutes, consolidateByRoute]);

  // Get unique products for filter
  const products = useMemo(() => {
    return [...new Set(analysisResults.map(r => r.product).filter(Boolean))].sort();
  }, [analysisResults]);

  // Stats
  const stats = useMemo(() => {
    const gaps = analysisResults.filter(r => r.isGap);
    const exists = analysisResults.filter(r => !r.isGap);
    const excluded = gaps.filter(shouldExclude);
    const gapsAfterExclusion = gaps.filter(item => !shouldExclude(item));

    return {
      targetItems: targetRoleItems.length,
      sourceItems: analysisResults.length,
      gaps: gapsAfterExclusion.length,
      exists: exists.length,
      excluded: excluded.length
    };
  }, [analysisResults, targetRoleItems, exclusions]);

  // Toggle functions
  const toggleGroup = (groupId) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const toggleAllInGroup = (group, checked) => {
    const roles = roleGroups[group]?.filter(r => r !== targetRole) || [];
    setSelectedSourceRoles(prev => {
      const next = new Set(prev);
      roles.forEach(role => {
        if (checked) next.add(role);
        else next.delete(role);
      });
      return next;
    });
  };

  const toggleSourceRole = (role) => {
    setSelectedSourceRoles(prev => {
      const next = new Set(prev);
      if (next.has(role)) next.delete(role);
      else next.add(role);
      return next;
    });
  };

  const expandAllGroups = () => {
    setExpandedGroups(new Set(Object.keys(roleGroups)));
  };

  const collapseAllGroups = () => {
    setExpandedGroups(new Set());
  };

  const selectAllRoles = () => {
    const all = allRoles.filter(r => r !== targetRole);
    setSelectedSourceRoles(new Set(all));
  };

  const clearAllRoles = () => {
    setSelectedSourceRoles(new Set());
  };

  // Get selected count per group
  const getGroupSelectedCount = (group) => {
    const roles = roleGroups[group]?.filter(r => r !== targetRole) || [];
    return roles.filter(r => selectedSourceRoles.has(r)).length;
  };

  // Filter role groups based on search
  const filteredRoleGroups = useMemo(() => {
    if (!sourceRoleSearch.trim()) return roleGroups;
    
    const searchLower = sourceRoleSearch.toLowerCase();
    const filtered = {};
    
    Object.keys(roleGroups).forEach(group => {
      const matchingRoles = roleGroups[group].filter(role => 
        role !== targetRole && role.toLowerCase().includes(searchLower)
      );
      if (matchingRoles.length > 0) {
        filtered[group] = matchingRoles;
      }
    });
    
    return filtered;
  }, [roleGroups, sourceRoleSearch, targetRole]);

  // Select all visible (filtered) roles
  const selectAllVisibleRoles = () => {
    const visibleRoles = Object.values(filteredRoleGroups).flat().filter(r => r !== targetRole);
    setSelectedSourceRoles(prev => {
      const next = new Set(prev);
      visibleRoles.forEach(role => next.add(role));
      return next;
    });
  };

  // Clear all visible (filtered) roles
  const clearAllVisibleRoles = () => {
    const visibleRoles = Object.values(filteredRoleGroups).flat().filter(r => r !== targetRole);
    setSelectedSourceRoles(prev => {
      const next = new Set(prev);
      visibleRoles.forEach(role => next.delete(role));
      return next;
    });
  };

  // Export function
  const exportData = (data, filename) => {
    const csvRows = [
      ['Status', 'Menu Item Name', 'Menu Item Route', 'All Routes', 'Menu Item Product', 'All Products', 'Page URL', 'Source Roles'].join(',')
    ];

    data.forEach(item => {
      // Handle sourceRoles which could be a Set or undefined
      let sourceRolesStr = '';
      if (item.sourceRoles) {
        if (item.sourceRoles instanceof Set) {
          sourceRolesStr = [...item.sourceRoles].join('; ');
        } else if (Array.isArray(item.sourceRoles)) {
          sourceRolesStr = item.sourceRoles.join('; ');
        }
      }
      
      // Handle routes which could be a Set
      let routeListStr = item.routeList || item.route || '';
      if (item.routes instanceof Set) {
        routeListStr = [...item.routes].join(' | ');
      }
      
      // Handle products which could be a Set
      let productListStr = item.productList || item.product || '';
      if (item.products instanceof Set) {
        productListStr = [...item.products].join(', ');
      }
      
      // Handle allNames if present (from consolidation)
      let nameStr = item.name || '';
      if (item.allNames && Array.isArray(item.allNames)) {
        nameStr = item.allNames.join(' | ');
      }
      
      const row = [
        item.isGap ? 'GAP' : 'EXISTS',
        `"${nameStr.replace(/"/g, '""')}"`,
        `"${(item.route || '').replace(/"/g, '""')}"`,
        `"${routeListStr.replace(/"/g, '""')}"`,
        `"${(item.product || '').replace(/"/g, '""')}"`,
        `"${productListStr.replace(/"/g, '""')}"`,
        `"${(item.pageUrl || '').replace(/"/g, '""')}"`,
        `"${sourceRolesStr}"`
      ];
      csvRows.push(row.join(','));
    });

    const csv = csvRows.join('\r\n');
    const blob = new Blob(['\uFEFF' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-indigo-950 text-slate-200 p-5">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold text-white mb-1">🔍 Role Gap Analysis Tool</h1>
        <p className="text-slate-400 mb-6">
          Compare any role against selected source roles to find <span className="text-yellow-400 font-semibold">missing</span> menu items
        </p>

        {/* Upload Section */}
        <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-2xl p-6 mb-6 border border-indigo-600">
          <label className={`block border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all ${dataLoaded ? 'border-emerald-500 bg-emerald-500/10' : 'border-indigo-500 hover:border-indigo-400 hover:bg-indigo-500/10'}`}>
            <input type="file" accept=".csv" onChange={handleFileUpload} className="hidden" />
            {dataLoaded ? (
              <p className="text-lg">✅ Loaded {rawData.length.toLocaleString()} menu items</p>
            ) : (
              <>
                <p className="text-lg mb-2">📂 Upload GlobalMenuItems.csv</p>
                <p className="text-slate-400 text-sm">Click or drag & drop to begin</p>
              </>
            )}
          </label>
        </div>

        {/* Target Role Selection */}
        {dataLoaded && (
          <div className="bg-gradient-to-r from-slate-800 to-emerald-900 rounded-2xl p-6 mb-6 border border-emerald-600">
            <div className="text-emerald-400 text-lg mb-4 flex items-center gap-2">
              🎯 Select Target Role for Comparison
            </div>
            <div className="flex gap-4 flex-wrap items-end">
              <div className="flex-1 min-w-[300px]">
                <label className="block text-slate-400 text-sm mb-2">Target Role (check for gaps in this role)</label>
                <select
                  value={targetRole}
                  onChange={(e) => {
                    setTargetRole(e.target.value);
                    setSelectedSourceRoles(new Set());
                  }}
                  className="w-full bg-slate-900 border border-slate-600 rounded-lg px-4 py-3 text-slate-200 focus:border-emerald-500 focus:outline-none"
                >
                  <option value="">-- Select a role --</option>
                  {Object.keys(roleGroups).sort().map(group => (
                    <optgroup key={group} label={group}>
                      {roleGroups[group].sort().map(role => (
                        <option key={role} value={role}>{role}</option>
                      ))}
                    </optgroup>
                  ))}
                </select>
              </div>
            </div>
            <p className="text-slate-500 text-sm mt-3">
              💡 The analysis will show which items from the selected source roles are missing from the target role.
            </p>
          </div>
        )}

        {/* Import Section */}
        {targetRole && (
          <div className="bg-gradient-to-r from-slate-800 to-purple-900 rounded-2xl p-6 mb-6 border border-purple-600">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-purple-400 text-lg">📥 Import Gaps List (Optional)</span>
              <span className="text-slate-400 text-sm">Filter results to only show items from a previous export</span>
            </div>
            <div className="flex gap-4 flex-wrap items-center">
              {!importedRoutes ? (
                <label className="flex-1 min-w-[250px] border-2 border-dashed border-purple-600 rounded-xl p-5 text-center cursor-pointer hover:border-purple-400 hover:bg-purple-500/10 transition-all">
                  <input type="file" accept=".csv" onChange={handleImportUpload} className="hidden" />
                  <p className="text-sm mb-1">📂 Upload exported gaps CSV</p>
                  <p className="text-slate-400 text-xs">Click to import a previously exported gaps list</p>
                </label>
              ) : (
                <div className="flex-1 flex items-center gap-4 bg-purple-500/20 border border-purple-500 rounded-xl p-4">
                  <FileText className="text-purple-400" size={24} />
                  <div className="flex-1">
                    <p className="text-purple-300 font-medium">{importFileName}</p>
                    <p className="text-slate-400 text-sm">{importedRoutes.size} routes imported</p>
                  </div>
                  <button
                    onClick={clearImport}
                    className="px-4 py-2 bg-slate-700 hover:bg-slate-600 rounded-lg flex items-center gap-2 text-sm"
                  >
                    <X size={16} /> Clear
                  </button>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Results Section */}
        {targetRole && (
          <>
            {/* Summary Box */}
            <div className="bg-gradient-to-r from-slate-900 to-indigo-950 border-2 border-yellow-500 rounded-xl p-5 mb-6">
              <div className="text-yellow-400 text-lg mb-3">📊 Gap Analysis Summary</div>
              <div className="text-slate-200 leading-relaxed">
                {selectedSourceRoles.size === 0 ? (
                  <>
                    <strong>{targetRole}</strong> has <strong>{targetRoleItems.length}</strong> menu items.<br /><br />
                    <span className="text-slate-400">👆 Select source roles below to compare against, then the analysis will run automatically.</span>
                  </>
                ) : (
                  <>
                    <strong>{targetRole}</strong> currently has <strong>{stats.targetItems}</strong> menu items.<br />
                    Across {selectedSourceRoles.size} selected source roles, there are <strong>{stats.sourceItems}</strong> unique menu items.
                    {importedRoutes && <span className="text-purple-400"> (filtered to {importedRoutes.size} imported routes)</span>}
                    <br /><br />
                    <span className="text-yellow-400">⚠️ <strong>{stats.gaps} items</strong> are MISSING</span> from {targetRole}.<br />
                    <span className="text-purple-400">📊 <strong>{stats.excluded} items</strong> excluded</span> (reports/dashboards/analytics).<br />
                    <span className="text-emerald-400">✓ <strong>{stats.exists} items</strong> already exist</span> in the target role.
                  </>
                )}
              </div>
            </div>

            {/* Stats Grid */}
            {selectedSourceRoles.size > 0 && (
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 border-l-4 border-l-emerald-500 text-center">
                  <div className="text-3xl font-bold text-emerald-400">{stats.targetItems}</div>
                  <div className="text-slate-400 text-sm mt-1">{targetRole.length > 20 ? targetRole.substring(0, 18) + '...' : targetRole}</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 border-l-4 border-l-blue-500 text-center">
                  <div className="text-3xl font-bold text-blue-400">{stats.sourceItems}</div>
                  <div className="text-slate-400 text-sm mt-1">Source Roles Items</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 border-l-4 border-l-yellow-500 text-center">
                  <div className="text-3xl font-bold text-yellow-400">{stats.gaps}</div>
                  <div className="text-slate-400 text-sm mt-1">⚠️ Missing (Gaps)</div>
                </div>
                <div className="bg-slate-800 rounded-xl p-5 border border-slate-700 border-l-4 border-l-cyan-500 text-center">
                  <div className="text-3xl font-bold text-cyan-400">{stats.exists}</div>
                  <div className="text-slate-400 text-sm mt-1">✓ Already Exists</div>
                </div>
              </div>
            )}

            {/* Source Role Selection */}
            <div className="bg-slate-800 rounded-xl p-6 mb-6 border border-slate-700">
              <div
                className="flex items-center gap-2 cursor-pointer select-none mb-4"
                onClick={() => setSourceRoleSectionExpanded(!sourceRoleSectionExpanded)}
              >
                {sourceRoleSectionExpanded ? <ChevronDown size={20} /> : <ChevronRight size={20} />}
                <span className="text-lg font-semibold">⚙️ Source Role Selection</span>
                <span className="text-blue-400 text-sm ml-auto">{selectedSourceRoles.size} role{selectedSourceRoles.size !== 1 ? 's' : ''} selected</span>
              </div>

              {sourceRoleSectionExpanded && (
                <div>
                  <p className="text-slate-400 text-sm mb-4">Select which roles to compare against the target role</p>

                  {/* Search and Quick Actions */}
                  <div className="flex gap-3 mb-4 flex-wrap items-center">
                    <div className="relative flex-1 min-w-[250px]">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                      <input
                        type="text"
                        placeholder="Search roles..."
                        value={sourceRoleSearch}
                        onChange={(e) => setSourceRoleSearch(e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2 text-sm focus:border-blue-500 focus:outline-none"
                      />
                      {sourceRoleSearch && (
                        <button 
                          onClick={() => setSourceRoleSearch('')}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>
                    <span className="text-slate-400 text-sm">Quick actions:</span>
                    <button onClick={expandAllGroups} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs">Expand All</button>
                    <button onClick={collapseAllGroups} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs">Collapse All</button>
                    <button onClick={sourceRoleSearch ? selectAllVisibleRoles : selectAllRoles} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs">
                      {sourceRoleSearch ? 'Select Filtered' : 'Select All'}
                    </button>
                    <button onClick={sourceRoleSearch ? clearAllVisibleRoles : clearAllRoles} className="px-3 py-1.5 bg-slate-700 hover:bg-slate-600 rounded-lg text-xs">
                      {sourceRoleSearch ? 'Clear Filtered' : 'Clear All'}
                    </button>
                  </div>

                  {sourceRoleSearch && (
                    <div className="text-sm text-slate-400 mb-3">
                      Showing {Object.values(filteredRoleGroups).flat().length} roles matching "{sourceRoleSearch}"
                    </div>
                  )}

                  {/* Role Groups */}
                  <div className="space-y-2">
                    {Object.keys(filteredRoleGroups).sort().map(group => {
                      const roles = filteredRoleGroups[group].filter(r => r !== targetRole);
                      if (roles.length === 0) return null;

                      const isExpanded = expandedGroups.has(group);
                      const selectedCount = getGroupSelectedCount(group);

                      return (
                        <div key={group} className={`bg-slate-900 rounded-lg border ${selectedCount > 0 ? 'border-blue-500' : 'border-slate-700'}`}>
                          <div
                            className="flex items-center gap-3 p-3 cursor-pointer hover:bg-slate-800/50"
                            onClick={() => toggleGroup(group)}
                          >
                            <span className="text-slate-500">
                              {isExpanded ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
                            </span>
                            <span className="bg-blue-600 text-xs px-2 py-1 rounded font-semibold">{group}</span>
                            <span className="text-slate-500 text-xs">{roles.length} role{roles.length !== 1 ? 's' : ''}</span>
                            {selectedCount > 0 && (
                              <span className="bg-blue-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold">{selectedCount}</span>
                            )}
                            <div className="ml-auto flex gap-1" onClick={e => e.stopPropagation()}>
                              <button onClick={() => toggleAllInGroup(group, true)} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs">All</button>
                              <button onClick={() => toggleAllInGroup(group, false)} className="px-2 py-1 bg-slate-700 hover:bg-slate-600 rounded text-xs">None</button>
                            </div>
                          </div>

                          {isExpanded && (
                            <div className="px-3 pb-3">
                              <div className="flex flex-wrap gap-1.5">
                                {roles.map(role => (
                                  <label
                                    key={role}
                                    className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded cursor-pointer text-xs transition-colors ${selectedSourceRoles.has(role) ? 'bg-blue-600' : 'bg-slate-700 hover:bg-slate-600'}`}
                                    title={role}
                                  >
                                    <input
                                      type="checkbox"
                                      checked={selectedSourceRoles.has(role)}
                                      onChange={() => toggleSourceRole(role)}
                                      className="sr-only"
                                    />
                                    {role.length > 35 ? role.substring(0, 33) + '...' : role}
                                  </label>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Results Table Section */}
            {selectedSourceRoles.size > 0 && (
              <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
                <div className="text-lg font-semibold mb-4">📑 Detailed Results</div>

                {/* Tabs */}
                <div className="flex gap-1 mb-4 bg-slate-900 p-1 rounded-lg w-fit">
                  {[
                    { id: 'gaps', label: '⚠️ Gaps Only', activeClass: 'bg-yellow-500 text-slate-900' },
                    { id: 'exists', label: '✓ Already Exists', activeClass: 'bg-emerald-600 text-white' },
                    { id: 'all', label: 'All Items', activeClass: 'bg-indigo-600 text-white' }
                  ].map(tab => (
                    <button
                      key={tab.id}
                      onClick={() => setCurrentView(tab.id)}
                      className={`px-4 py-2 rounded-lg text-sm transition-colors ${currentView === tab.id ? tab.activeClass : 'text-slate-400 hover:bg-slate-800'}`}
                    >
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Deduplication Mode */}
                <div className="bg-slate-900 rounded-lg p-4 mb-4 border border-cyan-600">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-cyan-400 font-semibold">🔧 Deduplication Mode</span>
                    <span className="text-slate-400 text-sm">(How to handle duplicate items)</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'name', label: 'Menu Item Name', desc: 'Treat same name as same item (most aggressive)' },
                      { id: 'route', label: 'Route Only', desc: 'Treat same route as same item (recommended)' },
                      { id: 'routeproduct', label: 'Route + Product', desc: 'Keep different product versions separate' }
                    ].map(mode => (
                      <label
                        key={mode.id}
                        className={`flex-1 min-w-[200px] p-3 rounded-lg border cursor-pointer transition-colors ${dedupMode === mode.id ? 'bg-cyan-500/20 border-cyan-500' : 'bg-slate-800 border-slate-700 hover:border-cyan-600'}`}
                      >
                        <input
                          type="radio"
                          name="dedupMode"
                          checked={dedupMode === mode.id}
                          onChange={() => setDedupMode(mode.id)}
                          className="sr-only"
                        />
                        <div className="font-semibold text-sm">{mode.label}</div>
                        <div className="text-slate-400 text-xs mt-1">{mode.desc}</div>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Exclusion Filters */}
                <div className="bg-slate-900 rounded-lg p-4 mb-4 border border-yellow-600">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-yellow-400 font-semibold">🚫 Exclusion Filters</span>
                    <span className="text-slate-400 text-sm">(Exclude from gap count)</span>
                  </div>
                  <div className="flex flex-wrap gap-3">
                    {[
                      { id: 'reports', label: 'Exclude Reports' },
                      { id: 'dashboards', label: 'Exclude Dashboards' },
                      { id: 'analytics', label: 'Exclude Analytics' },
                      { id: 'ysr', label: 'Exclude YSR' }
                    ].map(exc => (
                      <label
                        key={exc.id}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${exclusions[exc.id] ? 'bg-yellow-500/20 border-yellow-500 text-yellow-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-yellow-600'}`}
                      >
                        <input
                          type="checkbox"
                          checked={exclusions[exc.id]}
                          onChange={() => setExclusions(prev => ({ ...prev, [exc.id]: !prev[exc.id] }))}
                          className="accent-yellow-500"
                        />
                        {exc.label}
                      </label>
                    ))}
                  </div>
                  <div className="text-slate-500 text-xs mt-3">{stats.excluded} items excluded</div>
                </div>

                {/* Consolidate by Route */}
                <div className="bg-slate-900 rounded-lg p-4 mb-4 border border-emerald-600">
                  <div className="flex items-center gap-3">
                    <label className={`flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors ${consolidateByRoute ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-emerald-600'}`}>
                      <input
                        type="checkbox"
                        checked={consolidateByRoute}
                        onChange={() => setConsolidateByRoute(!consolidateByRoute)}
                        className="accent-emerald-500"
                      />
                      Consolidate by Route
                    </label>
                    <span className="text-slate-400 text-sm">
                      Merge items with same route but different names (e.g., "Find Journal Batch" + "Find Journal Batches")
                    </span>
                  </div>
                </div>

                {/* Filters */}
                <div className="flex gap-3 mb-4 flex-wrap items-center">
                  <div className="relative flex-1 min-w-[200px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                    <input
                      type="text"
                      placeholder="Search name or route..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded-lg pl-10 pr-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                    />
                  </div>
                  <select
                    value={productFilter}
                    onChange={(e) => setProductFilter(e.target.value)}
                    className="bg-slate-900 border border-slate-700 rounded-lg px-4 py-2.5 text-sm focus:border-indigo-500 focus:outline-none"
                  >
                    <option value="all">All Products</option>
                    {products.map(p => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                  <label className="flex items-center gap-2 text-slate-400 text-sm">
                    <input
                      type="checkbox"
                      checked={showEmptyRoutes}
                      onChange={(e) => setShowEmptyRoutes(e.target.checked)}
                    />
                    Include parent menus
                  </label>
                  <span className="text-slate-400 text-sm ml-auto">{filteredResults.length} items</span>
                </div>

                {/* Table */}
                <div className="border border-slate-700 rounded-lg overflow-hidden">
                  <div className="max-h-[500px] overflow-y-auto">
                    <table className="w-full text-sm">
                      <thead className="bg-slate-900 sticky top-0">
                        <tr>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold w-10">#</th>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold w-20">Status</th>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold">Menu Item Name</th>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold">Route</th>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold">Product</th>
                          <th className="px-3 py-3 text-left text-slate-400 font-semibold">Source Roles</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredResults.map((item, idx) => (
                          <tr key={idx} className={`border-t border-slate-800 ${item.isGap ? 'bg-yellow-500/5 hover:bg-yellow-500/10' : 'bg-emerald-500/5 hover:bg-emerald-500/10'}`}>
                            <td className="px-3 py-2.5 text-slate-500">{idx + 1}</td>
                            <td className="px-3 py-2.5">
                              <span className={`text-xs px-2 py-1 rounded font-semibold ${item.isGap ? 'bg-yellow-500 text-slate-900' : 'bg-emerald-500 text-slate-900'}`}>
                                {item.isGap ? 'GAP' : 'EXISTS'}
                              </span>
                            </td>
                            <td className="px-3 py-2.5">
                              {item.allNames && item.allNames.length > 1 ? (
                                <span title={item.allNames.join('\n')} className="cursor-help">
                                  {item.allNames[0]} <span className="text-emerald-400 text-xs">(+{item.allNames.length - 1} names)</span>
                                </span>
                              ) : (
                                item.name
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              {item.routes?.size > 1 ? (
                                <span className="text-cyan-400 text-xs font-mono" title={[...item.routes].join('\n')}>{item.routes.size} routes</span>
                              ) : item.route ? (
                                <span className="text-slate-400 text-xs font-mono truncate block max-w-[250px]" title={item.route}>{item.route}</span>
                              ) : (
                                <span className="text-slate-600 text-xs italic">— parent menu —</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              {item.products?.size > 1 ? (
                                <span className="text-cyan-400 text-xs" title={[...item.products].join(', ')}>{item.products.size} products</span>
                              ) : (
                                <span className="text-slate-400 text-xs">{item.product || '—'}</span>
                              )}
                            </td>
                            <td className="px-3 py-2.5">
                              <div className="flex flex-wrap gap-1 max-w-[250px]">
                                {[...item.sourceRoles].slice(0, 3).map(r => (
                                  <span key={r} className="bg-blue-600 text-xs px-1.5 py-0.5 rounded" title={r}>
                                    {r.length > 15 ? r.substring(0, 13) + '...' : r}
                                  </span>
                                ))}
                                {item.sourceRoles.size > 3 && (
                                  <span className="bg-slate-600 text-xs px-1.5 py-0.5 rounded">+{item.sourceRoles.size - 3}</span>
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Export Buttons */}
                <div className="flex gap-3 mt-4 flex-wrap">
                  <button
                    onClick={() => {
                      let data = analysisResults.filter(r => r.isGap && r.route && !shouldExclude(r));
                      if (importedRoutes) data = data.filter(r => importedRoutes.has((r.route || '').toLowerCase().trim()));
                      exportData(data, `${targetRole.replace(/[^a-zA-Z0-9]/g, '_')}_GAPS.csv`);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-yellow-500 to-orange-500 text-slate-900 rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
                  >
                    <Download size={18} /> Export Gaps
                  </button>
                  <button
                    onClick={() => {
                      let data = analysisResults.filter(r => r.isGap && r.route && shouldExclude(r));
                      if (importedRoutes) data = data.filter(r => importedRoutes.has((r.route || '').toLowerCase().trim()));
                      exportData(data, `${targetRole.replace(/[^a-zA-Z0-9]/g, '_')}_EXCLUDED.csv`);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
                  >
                    <Download size={18} /> Export Excluded
                  </button>
                  <button
                    onClick={() => {
                      let data = analysisResults.filter(r => !r.isGap && r.route);
                      if (importedRoutes) data = data.filter(r => importedRoutes.has((r.route || '').toLowerCase().trim()));
                      exportData(data, `${targetRole.replace(/[^a-zA-Z0-9]/g, '_')}_EXISTS.csv`);
                    }}
                    className="px-4 py-2.5 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 rounded-lg font-medium flex items-center gap-2 hover:opacity-90"
                  >
                    <Download size={18} /> Export Existing
                  </button>
                  <button
                    onClick={() => {
                      let data = analysisResults.filter(r => r.route);
                      if (importedRoutes) data = data.filter(r => importedRoutes.has((r.route || '').toLowerCase().trim()));
                      exportData(data, `${targetRole.replace(/[^a-zA-Z0-9]/g, '_')}_FULL.csv`);
                    }}
                    className="px-4 py-2.5 bg-slate-700 hover:bg-slate-600 rounded-lg font-medium flex items-center gap-2"
                  >
                    <Download size={18} /> Export Full Analysis
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
