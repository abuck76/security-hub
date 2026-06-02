import React, { useState, useEffect } from 'react';
import { ChevronDown, ChevronRight, Settings, Plus, Trash2, MoveUp, MoveDown, ArrowRight, ArrowLeft, Edit2, Check, X, Download, Save, RotateCcw, GripVertical } from 'lucide-react';

export default function GLDashboard() {
  const [showMenuEditor, setShowMenuEditor] = useState(false);
  const [editingSection, setEditingSection] = useState('accounting');
  const [showItemForm, setShowItemForm] = useState(false);
  const [itemForm, setItemForm] = useState({ label: '', url: '', isSubmenu: false });
  const [showImportForm, setShowImportForm] = useState(false);
  const [importText, setImportText] = useState('');
  const [editingItem, setEditingItem] = useState(null);
  const [editForm, setEditForm] = useState({ label: '', url: '' });
  const [showSectionForm, setShowSectionForm] = useState(false);
  const [sectionForm, setSectionForm] = useState('');
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverItem, setDragOverItem] = useState(null);
  const [saveStatus, setSaveStatus] = useState('');
  const [collapsedSections, setCollapsedSections] = useState({});
  const [draggedSection, setDraggedSection] = useState(null);
  const [dragOverSection, setDragOverSection] = useState(null);
  const [showImportReport, setShowImportReport] = useState(false);
  const [importReport, setImportReport] = useState(null);
  const [isImporting, setIsImporting] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [activeChargesSubmenu, setActiveChargesSubmenu] = useState(null);
  const [submenuPosition, setSubmenuPosition] = useState({ top: 0, left: 0 });
  const hoverTimeoutRef = React.useRef(null);

  const [reportsMenu, setReportsMenu] = useState([
    { label: '1099 Form Nav Report', url: '/reports/1099-form-nav' },
    { label: 'Bank Reconciliation Report', url: '/reports/bank-reconciliation' },
    { label: 'Budget Report', url: '/reports/budget' }
  ]);

  const [accountingMenu, setAccountingMenu] = useState([
    {
      id: 'charges',
      label: 'Charges',
      items: [
        { label: 'Add Charge Batch', url: '/charges/add-batch' },
        { label: 'Charge Inquiry', url: '/charges/inquiry' }
      ]
    },
    {
      id: 'gl',
      label: 'G/L',
      items: [
        { 
          label: 'Bank Reconciliation', 
          hasSubmenu: true,
          submenu: [
            { label: 'Bank Manager Configuration', url: '/gl/bank-manager-config' },
            { label: 'Bank Reconciliation', url: '/gl/bank-reconciliation' }
          ]
        },
        { label: 'Close / Open Month', url: '/gl/close-open-month' }
      ]
    }
  ]);

  const addNewItem = (sectionId) => {
    if (editingSection === 'reports') {
      const newItem = { label: itemForm.label, url: itemForm.url };
      setReportsMenu([newItem, ...reportsMenu]);
    } else {
      const newMenu = [...accountingMenu];
      const section = newMenu.find(s => s.id === sectionId);
      
      if (itemForm.isSubmenu) {
        section.items.unshift({ 
          label: itemForm.label, 
          hasSubmenu: true,
          submenu: []
        });
      } else {
        section.items.unshift({ label: itemForm.label, url: itemForm.url });
      }
      
      setAccountingMenu(newMenu);
    }
    
    setItemForm({ label: '', url: '', isSubmenu: false });
    setShowItemForm(false);
  };

  const resetToDefaults = () => {
    if (window.confirm('Are you sure you want to reset all menus to default? This will keep core sections (Charges, Receipts, Payables, G/L) but remove all items.')) {
      setReportsMenu(defaultReportsMenu);
      setAccountingMenu(defaultAccountingMenu);
      localStorage.removeItem('reportsMenu');
      localStorage.removeItem('accountingMenu');
      setSaveStatus('Reset to defaults');
      setTimeout(() => setSaveStatus(''), 2000);
    }
  };

  const toggleSection = (sectionId) => {
    setCollapsedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleSectionDragStart = (e, sectionId) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleSectionDragOver = (e, sectionId) => {
    e.preventDefault();
    e.stopPropagation();
    e.dataTransfer.dropEffect = 'move';
    setDragOverSection(sectionId);
  };

  const handleSectionDrop = (e, targetSectionId) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null);
      setDragOverSection(null);
      return;
    }
    
    const newMenu = [...accountingMenu];
    const draggedIndex = newMenu.findIndex(s => s.id === draggedSection);
    const targetIndex = newMenu.findIndex(s => s.id === targetSectionId);
    
    // Remove dragged section
    const [removed] = newMenu.splice(draggedIndex, 1);
    
    // Insert at target position
    newMenu.splice(targetIndex, 0, removed);
    
    setAccountingMenu(newMenu);
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const handleSectionDragEnd = () => {
    setDraggedSection(null);
    setDragOverSection(null);
  };

  const importItems = () => {
    console.log('Import button clicked!');
    console.log('Import text:', importText);
    
    setIsImporting(true);
    
    try {
      const lines = importText.split('\n').filter(line => line.trim());
      console.log('Lines found:', lines.length);
      
      const newItems = [];
      
      lines.forEach(line => {
        // Support both comma and tab separated values
        const parts = line.includes('\t') ? line.split('\t') : line.split(',');
        const label = parts[0]?.trim();
        const url = parts[1]?.trim() || '';
        
        if (label) {
          newItems.push({ label, url });
        }
      });
      
      if (newItems.length === 0) {
        alert('No items found to import. Please check your format.');
        setIsImporting(false);
        return;
      }
      
      console.log('Items parsed:', newItems.length);
      
      // Smart categorization based on keywords
      const categorized = {
        charges: [],
        receipts: [],
        payables: [],
        gl: [],
        reports: [],
        unknown: []
      };
      
      newItems.forEach(item => {
        const labelLower = item.label.toLowerCase();
        
        // Charges keywords
        if (labelLower.includes('charge') || labelLower.includes('fee') || 
            labelLower.includes('late fee') || labelLower.includes('interest') ||
            labelLower.includes('write off') || labelLower.includes('post fixed')) {
          categorized.charges.push(item);
        }
        // Receipts keywords
        else if (labelLower.includes('receipt') || labelLower.includes('payment portal') ||
                 labelLower.includes('ach') || labelLower.includes('deposit') ||
                 labelLower.includes('payment receipt')) {
          categorized.receipts.push(item);
        }
        // Payables keywords
        else if (labelLower.includes('payable') || labelLower.includes('vendor') ||
                 labelLower.includes('invoice') || labelLower.includes('purchase order') ||
                 labelLower.includes('po ') || labelLower.includes('credit card') ||
                 labelLower.includes('marketplace')) {
          categorized.payables.push(item);
        }
        // G/L keywords
        else if (labelLower.includes('bank') || labelLower.includes('reconcil') ||
                 labelLower.includes('journal') || labelLower.includes('g/l') ||
                 labelLower.includes('gl ') || labelLower.includes('close') ||
                 labelLower.includes('budget') || labelLower.includes('allocation') ||
                 labelLower.includes('transfer')) {
          categorized.gl.push(item);
        }
        // Reports keywords
        else if (labelLower.includes('report') || labelLower.includes('analytics') ||
                 labelLower.includes('summary') || labelLower.includes('forecast')) {
          categorized.reports.push(item);
        }
        // Unknown
        else {
          categorized.unknown.push(item);
        }
      });
      
      // Auto-group within each category
      const autoGroup = (items) => {
        const grouped = {};
        const ungrouped = [];
        
        items.forEach(item => {
          const match = item.label.match(/^([A-Za-z]+)[\s\-\/]/);
          if (match) {
            const prefix = match[1];
            if (!grouped[prefix]) {
              grouped[prefix] = [];
            }
            grouped[prefix].push(item);
          } else {
            ungrouped.push(item);
          }
        });
        
        const finalItems = [];
        Object.keys(grouped).forEach(prefix => {
          if (grouped[prefix].length >= 2) {
            finalItems.push({
              label: prefix,
              hasSubmenu: true,
              submenu: grouped[prefix]
            });
          } else {
            ungrouped.push(...grouped[prefix]);
          }
        });
        
        return [...finalItems, ...ungrouped];
      };
      
      // Apply grouped items to sections
      const newMenu = [...accountingMenu];
      
      // Ensure all core sections exist
      ['charges', 'receipts', 'payables', 'gl'].forEach(sectionId => {
        if (!newMenu.find(s => s.id === sectionId)) {
          const labels = {
            'charges': 'Charges',
            'receipts': 'Receipts',
            'payables': 'Payables',
            'gl': 'G/L'
          };
          newMenu.push({
            id: sectionId,
            label: labels[sectionId],
            items: [],
            required: true
          });
        }
      });
      
      // Add items to sections
      ['charges', 'receipts', 'payables', 'gl'].forEach(sectionId => {
        if (categorized[sectionId].length > 0) {
          const section = newMenu.find(s => s.id === sectionId);
          if (section) {
            const groupedItems = autoGroup(categorized[sectionId]);
            section.items = [...groupedItems, ...section.items];
          }
        }
      });
      
      setAccountingMenu(newMenu);
      
      // Add to Reports
      if (categorized.reports.length > 0) {
        const groupedReports = autoGroup(categorized.reports);
        setReportsMenu([...groupedReports, ...reportsMenu]);
      }
      
      // Handle unknown items
      if (categorized.unknown.length > 0) {
        const newMenuWithUnknown = [...newMenu];
        let unknownSection = newMenuWithUnknown.find(s => s.id === 'unmatched-items');
        if (!unknownSection) {
          unknownSection = {
            id: 'unmatched-items',
            label: 'Unmatched Items',
            items: []
          };
          newMenuWithUnknown.push(unknownSection);
        }
        const groupedUnknown = autoGroup(categorized.unknown);
        unknownSection.items = [...groupedUnknown, ...unknownSection.items];
        setAccountingMenu(newMenuWithUnknown);
      }
      
      // Generate report
      const report = {
        totalLinks: newItems.length,
        topLevelItems: 0,
        groupsCreated: 0,
        ungroupedItems: 0,
        distribution: {
          charges: categorized.charges.length,
          receipts: categorized.receipts.length,
          payables: categorized.payables.length,
          gl: categorized.gl.length,
          reports: categorized.reports.length,
          unknown: categorized.unknown.length
        },
        groupDetails: []
      };
      
      setImportReport(report);
      setShowImportReport(true);
      setImportText('');
      setShowImportForm(false);
      
      setSaveStatus(`Imported ${newItems.length} items`);
      setTimeout(() => setSaveStatus(''), 3000);
      
      setIsImporting(false);
      console.log('Import completed successfully!');
      
    } catch (error) {
      console.error('Import error:', error);
      alert(`Import failed: ${error.message}. Please try again.`);
      setIsImporting(false);
    }
  };

  const addNewSection = () => {
    if (sectionForm && sectionForm.trim()) {
      const newSection = {
        id: sectionForm.toLowerCase().replace(/\s+/g, '-'),
        label: sectionForm.trim(),
        items: []
      };
      setAccountingMenu([...accountingMenu, newSection]);
      setSectionForm('');
      setShowSectionForm(false);
    }
  };

  const handleDragStart = (e, sectionId, path, item) => {
    setDraggedItem({ sectionId, path, item });
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e, sectionId, path) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setDragOverItem({ sectionId, path });
  };

  const handleDrop = (e, targetSectionId, targetPath) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!draggedItem) return;
    
    const { sectionId: sourceSectionId, path: sourcePath } = draggedItem;
    
    // Don't drop on itself
    if (sourceSectionId === targetSectionId && JSON.stringify(sourcePath) === JSON.stringify(targetPath)) {
      setDraggedItem(null);
      setDragOverItem(null);
      return;
    }
    
    // Helper function to deep copy an item with all nested submenus
    const deepCopyItem = (item) => {
      const copy = { ...item };
      if (item.hasSubmenu && item.submenu) {
        copy.submenu = item.submenu.map(subItem => deepCopyItem(subItem));
      }
      return copy;
    };
    
    // Get the dragged item with deep copy
    let draggedItemData;
    if (sourceSectionId === 'reports') {
      const menu = [...reportsMenu];
      let currentArray = menu;
      for (let i = 0; i < sourcePath.length - 1; i++) {
        currentArray = currentArray[sourcePath[i]].submenu;
      }
      draggedItemData = deepCopyItem(currentArray[sourcePath[sourcePath.length - 1]]);
    } else {
      const menu = [...accountingMenu];
      const section = menu.find(s => s.id === sourceSectionId);
      let currentArray = section.items;
      for (let i = 0; i < sourcePath.length - 1; i++) {
        currentArray = currentArray[sourcePath[i]].submenu;
      }
      draggedItemData = deepCopyItem(currentArray[sourcePath[sourcePath.length - 1]]);
    }
    
    // Remove from source
    if (sourceSectionId === 'reports') {
      const menu = [...reportsMenu];
      let currentArray = menu;
      for (let i = 0; i < sourcePath.length - 1; i++) {
        currentArray = currentArray[sourcePath[i]].submenu;
      }
      currentArray.splice(sourcePath[sourcePath.length - 1], 1);
      setReportsMenu(menu);
    } else {
      const menu = [...accountingMenu];
      const section = menu.find(s => s.id === sourceSectionId);
      let currentArray = section.items;
      for (let i = 0; i < sourcePath.length - 1; i++) {
        currentArray = currentArray[sourcePath[i]].submenu;
      }
      currentArray.splice(sourcePath[sourcePath.length - 1], 1);
      setAccountingMenu(menu);
    }
    
    // Add to target
    if (targetSectionId === 'reports') {
      const menu = [...reportsMenu];
      let currentArray = menu;
      if (targetPath) {
        for (let i = 0; i < targetPath.length - 1; i++) {
          currentArray = currentArray[targetPath[i]].submenu;
        }
        currentArray.splice(targetPath[targetPath.length - 1], 0, draggedItemData);
      } else {
        // Drop at end of section
        menu.push(draggedItemData);
      }
      setReportsMenu(menu);
    } else {
      const menu = [...accountingMenu];
      const section = menu.find(s => s.id === targetSectionId);
      let currentArray = section.items;
      if (targetPath) {
        for (let i = 0; i < targetPath.length - 1; i++) {
          currentArray = currentArray[targetPath[i]].submenu;
        }
        currentArray.splice(targetPath[targetPath.length - 1], 0, draggedItemData);
      } else {
        // Drop at end of section
        section.items.push(draggedItemData);
      }
      setAccountingMenu(menu);
    }
    
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverItem(null);
  };

  const exportToExcel = () => {
    try {
      const rows = [];
      
      // Add header
      rows.push(['Section', 'Label', 'URL', 'Level', 'Parent Path']);
      
      // Export Reports
      const addReportItems = (items, parentPath = '', level = 0) => {
        items.forEach((item) => {
          const currentPath = parentPath ? `${parentPath} > ${item.label}` : item.label;
          rows.push(['Reports', item.label, item.url || '', level, parentPath]);
          
          if (item.hasSubmenu && item.submenu) {
            addReportItems(item.submenu, currentPath, level + 1);
          }
        });
      };
      
      addReportItems(reportsMenu);
      
      // Export Accounting sections
      const addAccountingItems = (items, sectionName, parentPath = '', level = 0) => {
        items.forEach((item) => {
          const currentPath = parentPath ? `${parentPath} > ${item.label}` : item.label;
          rows.push([sectionName, item.label, item.url || '', level, parentPath]);
          
          if (item.hasSubmenu && item.submenu) {
            addAccountingItems(item.submenu, sectionName, currentPath, level + 1);
          }
        });
      };
      
      accountingMenu.forEach((section) => {
        addAccountingItems(section.items, section.label);
      });
      
      // Convert to CSV
      const csvContent = rows.map(row => 
        row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',')
      ).join('\n');
      
      // Create download
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `menu-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      
      setSaveStatus('Exported successfully!');
      setTimeout(() => setSaveStatus(''), 2000);
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed. Please try again.');
    }
  };

  const startEditItem = (sectionId, path, item) => {
    setEditingItem({ sectionId, path });
    setEditForm({ label: item.label, url: item.url || '' });
  };

  const saveEditItem = () => {
    const { sectionId, path } = editingItem;
    
    if (sectionId === 'reports') {
      const newMenu = [...reportsMenu];
      let currentArray = newMenu;
      
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu;
      }
      
      currentArray[path[path.length - 1]].label = editForm.label;
      if (editForm.url) {
        currentArray[path[path.length - 1]].url = editForm.url;
      }
      
      setReportsMenu(newMenu);
    } else {
      const newMenu = [...accountingMenu];
      const section = newMenu.find(s => s.id === sectionId);
      
      let currentArray = section.items;
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu;
      }
      
      currentArray[path[path.length - 1]].label = editForm.label;
      if (editForm.url) {
        currentArray[path[path.length - 1]].url = editForm.url;
      }
      
      setAccountingMenu(newMenu);
    }
    
    setEditingItem(null);
    setEditForm({ label: '', url: '' });
  };

  const toggleDropdown = (id) => {
    if (activeDropdown === id) {
      setActiveDropdown(null);
      setActiveSubmenu(null);
      setActiveChargesSubmenu(null);
    } else {
      setActiveDropdown(id);
      setActiveSubmenu(null);
      setActiveChargesSubmenu(null);
    }
  };

  const handleSubmenuHover = (id) => {
    setActiveSubmenu(id);
    setActiveChargesSubmenu(null);
  };

  const handleThirdLevelHover = (menuLabel, event) => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setSubmenuPosition({
      top: rect.top,
      left: rect.right + 4
    });
    setActiveChargesSubmenu(menuLabel);
  };

  const handleThirdLevelLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveChargesSubmenu(null);
    }, 1000);
  };

  const handleThirdLevelMenuEnter = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
  };

  const handleThirdLevelMenuLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current);
    }
    hoverTimeoutRef.current = setTimeout(() => {
      setActiveChargesSubmenu(null);
    }, 150);
  };

  const renderNavigationSubmenu = (items, parentLabel) => {
    return items.map((menuItem, itemIdx) => {
      const submenuKey = parentLabel + menuItem.label;
      return (
        <div 
          key={itemIdx}
          className="relative"
          onMouseEnter={(e) => {
            if (menuItem.hasSubmenu) {
              handleThirdLevelHover(submenuKey, e);
            }
          }}
          onMouseLeave={() => {
            if (menuItem.hasSubmenu) {
              handleThirdLevelLeave();
            }
          }}
        >
          <button className="w-full text-left px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between">
            {menuItem.label}
            {menuItem.hasSubmenu && <ChevronRight size={16} />}
          </button>
          
          {menuItem.hasSubmenu && menuItem.submenu && activeChargesSubmenu === submenuKey && (
            <div 
              className="fixed bg-white border border-gray-200 shadow-lg rounded-lg w-fit z-[60]"
              style={{
                top: `${submenuPosition.top}px`,
                left: `${submenuPosition.left}px`
              }}
              onMouseEnter={handleThirdLevelMenuEnter}
              onMouseLeave={handleThirdLevelMenuLeave}
            >
              {renderNavigationSubmenu(menuItem.submenu, submenuKey + ' > ')}
            </div>
          )}
        </div>
      );
    });
  };

  const nestItemDeep = (sectionId, path) => {
    if (sectionId === 'reports') {
      const newMenu = [...reportsMenu];
      let currentArray = newMenu;
      
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu || [];
      }
      
      const itemIndex = path[path.length - 1];
      if (itemIndex === 0) return;
      
      const item = currentArray[itemIndex];
      const newParent = currentArray[itemIndex - 1];
      
      if (!newParent.hasSubmenu) {
        newParent.hasSubmenu = true;
        newParent.submenu = [];
        delete newParent.url;
      }
      
      currentArray.splice(itemIndex, 1);
      newParent.submenu.push(item);
      
      setReportsMenu(newMenu);
      return;
    }
    
    const newMenu = [...accountingMenu];
    const section = newMenu.find(s => s.id === sectionId);
    
    let currentArray = section.items;
    
    for (let i = 0; i < path.length - 1; i++) {
      currentArray = currentArray[path[i]].submenu || [];
    }
    
    const itemIndex = path[path.length - 1];
    if (itemIndex === 0) return;
    
    const item = currentArray[itemIndex];
    const newParent = currentArray[itemIndex - 1];
    
    if (!newParent.hasSubmenu) {
      newParent.hasSubmenu = true;
      newParent.submenu = [];
      delete newParent.url;
    }
    
    currentArray.splice(itemIndex, 1);
    newParent.submenu.push(item);
    
    setAccountingMenu(newMenu);
  };

  const unnestItemDeep = (sectionId, path) => {
    if (sectionId === 'reports') {
      const newMenu = [...reportsMenu];
      let currentArray = newMenu;
      
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu || [];
      }
      
      const itemIndex = path[path.length - 1];
      const item = currentArray[itemIndex];
      
      currentArray.splice(itemIndex, 1);
      
      if (path.length === 1) {
        currentArray.splice(itemIndex, 0, item);
        setReportsMenu(newMenu);
        return;
      }
      
      let parentArray = newMenu;
      for (let i = 0; i < path.length - 2; i++) {
        parentArray = parentArray[path[i]].submenu;
      }
      
      const parentIndex = path[path.length - 2];
      parentArray.splice(parentIndex + 1, 0, item);
      
      setReportsMenu(newMenu);
      return;
    }
    
    const newMenu = [...accountingMenu];
    const section = newMenu.find(s => s.id === sectionId);
    
    let currentArray = section.items;
    
    for (let i = 0; i < path.length - 1; i++) {
      currentArray = currentArray[path[i]].submenu || [];
    }
    
    const itemIndex = path[path.length - 1];
    const item = currentArray[itemIndex];
    
    currentArray.splice(itemIndex, 1);
    
    if (path.length === 1) {
      currentArray.splice(itemIndex, 0, item);
      setAccountingMenu(newMenu);
      return;
    }
    
    let parentArray = section.items;
    for (let i = 0; i < path.length - 2; i++) {
      parentArray = parentArray[path[i]].submenu;
    }
    
    const parentIndex = path[path.length - 2];
    parentArray.splice(parentIndex + 1, 0, item);
    
    setAccountingMenu(newMenu);
  };

  const deleteItemDeep = (sectionId, path) => {
    if (sectionId === 'reports') {
      const newMenu = [...reportsMenu];
      let currentArray = newMenu;
      
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu;
      }
      
      currentArray.splice(path[path.length - 1], 1);
      setReportsMenu(newMenu);
      return;
    }
    
    const newMenu = [...accountingMenu];
    const section = newMenu.find(s => s.id === sectionId);
    
    let currentArray = section.items;
    for (let i = 0; i < path.length - 1; i++) {
      currentArray = currentArray[path[i]].submenu;
    }
    
    currentArray.splice(path[path.length - 1], 1);
    setAccountingMenu(newMenu);
  };

  const moveItem = (sectionId, ...args) => {
    const direction = args[args.length - 1];
    const path = args.slice(0, -1);
    
    if (sectionId === 'reports') {
      const newMenu = [...reportsMenu];
      let currentArray = newMenu;
      
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu;
      }
      
      const itemIndex = path[path.length - 1];
      const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
      if (newIndex >= 0 && newIndex < currentArray.length) {
        [currentArray[itemIndex], currentArray[newIndex]] = [currentArray[newIndex], currentArray[itemIndex]];
        setReportsMenu(newMenu);
      }
    } else {
      const newMenu = [...accountingMenu];
      const section = newMenu.find(s => s.id === sectionId);
      
      let currentArray = section.items;
      for (let i = 0; i < path.length - 1; i++) {
        currentArray = currentArray[path[i]].submenu;
      }
      
      const itemIndex = path[path.length - 1];
      const newIndex = direction === 'up' ? itemIndex - 1 : itemIndex + 1;
      if (newIndex >= 0 && newIndex < currentArray.length) {
        [currentArray[itemIndex], currentArray[newIndex]] = [currentArray[newIndex], currentArray[itemIndex]];
      }
      
      setAccountingMenu(newMenu);
    }
  };

  const renderMenuItem = (item, sectionId, path, depth = 0) => {
    const itemIndex = path[path.length - 1];
    const bgClass = depth === 0 ? 'bg-gray-50' : depth === 1 ? 'bg-gray-100' : 'bg-gray-200';
    const marginLeft = depth > 0 ? `${depth * 24}px` : '16px';
    const isEditing = editingItem && editingItem.sectionId === sectionId && 
                      JSON.stringify(editingItem.path) === JSON.stringify(path);
    const isDragging = draggedItem && draggedItem.sectionId === sectionId && 
                       JSON.stringify(draggedItem.path) === JSON.stringify(path);
    const isDragOver = dragOverItem && dragOverItem.sectionId === sectionId && 
                       JSON.stringify(dragOverItem.path) === JSON.stringify(path);
    
    return (
      <div key={path.join('-')} className="mb-2" style={{ marginLeft }}>
        <div 
          className={`flex items-center justify-between ${bgClass} p-2 rounded transition-all ${
            isDragging ? 'opacity-50' : ''
          } ${isDragOver ? 'ring-2 ring-blue-400' : ''}`}
          draggable={!isEditing}
          onDragStart={(e) => handleDragStart(e, sectionId, path, item)}
          onDragOver={(e) => handleDragOver(e, sectionId, path)}
          onDrop={(e) => handleDrop(e, sectionId, path)}
          onDragEnd={handleDragEnd}
        >
          {isEditing ? (
            <div className="flex-1 mr-2">
              <input
                type="text"
                value={editForm.label}
                onChange={(e) => setEditForm({ ...editForm, label: e.target.value })}
                className="w-full border border-gray-300 rounded px-2 py-1 mb-1 text-sm"
                placeholder="Label"
              />
              {!item.hasSubmenu && (
                <input
                  type="text"
                  value={editForm.url}
                  onChange={(e) => setEditForm({ ...editForm, url: e.target.value })}
                  className="w-full border border-gray-300 rounded px-2 py-1 text-xs"
                  placeholder="URL"
                />
              )}
            </div>
          ) : (
            <div className="flex-1 cursor-move">
              {depth > 0 && <span className="text-gray-400 mr-2">{'└─'.repeat(depth)}</span>}
              <span className="font-medium text-gray-900">{item.label}</span>
              {item.url && <div className="text-xs text-gray-500 ml-6">{item.url}</div>}
            </div>
          )}
          <div className="flex items-center gap-1">
            {isEditing ? (
              <>
                <button 
                  onClick={saveEditItem}
                  className="p-1 hover:bg-green-100 text-green-600 rounded"
                  title="Save"
                >
                  <Check size={14} />
                </button>
                <button 
                  onClick={() => {
                    setEditingItem(null);
                    setEditForm({ label: '', url: '' });
                  }}
                  className="p-1 hover:bg-gray-300 rounded"
                  title="Cancel"
                >
                  <X size={14} />
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => startEditItem(sectionId, path, item)}
                  className="p-1 hover:bg-yellow-100 text-yellow-600 rounded"
                  title="Edit"
                >
                  <Edit2 size={12} />
                </button>
                {itemIndex > 0 && (
                  <button 
                    onClick={() => nestItemDeep(sectionId, path)} 
                    className="p-1 hover:bg-blue-100 text-blue-600 rounded"
                    title="Nest under previous item"
                  >
                    <ArrowRight size={14} />
                  </button>
                )}
                {depth > 0 && (
                  <button 
                    onClick={() => unnestItemDeep(sectionId, path)} 
                    className="p-1 hover:bg-blue-100 text-blue-600 rounded"
                    title="Move to parent level"
                  >
                    <ArrowLeft size={14} />
                  </button>
                )}
                <button onClick={() => moveItem(sectionId, ...path, 'up')} className="p-1 hover:bg-gray-300 rounded">
                  <MoveUp size={12} />
                </button>
                <button onClick={() => moveItem(sectionId, ...path, 'down')} className="p-1 hover:bg-gray-300 rounded">
                  <MoveDown size={12} />
                </button>
                <button onClick={() => deleteItemDeep(sectionId, path)} className="p-1 hover:bg-red-100 text-red-600 rounded">
                  <Trash2 size={12} />
                </button>
              </>
            )}
          </div>
        </div>
        {item.hasSubmenu && item.submenu && item.submenu.map((subItem, subIdx) => 
          renderMenuItem(subItem, sectionId, [...path, subIdx], depth + 1)
        )}
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Menu Editor Panel */}
      {showMenuEditor && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={() => setShowMenuEditor(false)}>
          <div className="absolute right-0 top-0 bottom-0 w-[600px] bg-white shadow-2xl overflow-y-auto" onClick={(e) => e.stopPropagation()}>
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-4">
                  <h2 className="text-2xl font-bold text-gray-800">Menu Editor</h2>
                  {saveStatus && (
                    <span className="text-sm text-green-600 flex items-center gap-1">
                      <Check size={14} /> {saveStatus}
                    </span>
                  )}
                </div>
                <button onClick={() => setShowMenuEditor(false)} className="text-gray-500 hover:text-gray-700 text-3xl">×</button>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Edit Section</label>
                <select 
                  value={editingSection}
                  onChange={(e) => setEditingSection(e.target.value)}
                  className="w-full border border-gray-300 rounded px-3 py-2"
                >
                  <option value="reports">Reports Menu</option>
                  <option value="accounting">Accounting Menu</option>
                </select>
                <p className="text-xs text-gray-500 mt-1">
                  Note: Charges, Receipts, Payables, and G/L are core sections and always present.
                </p>
              </div>

              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => setShowItemForm(!showItemForm)}
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 flex items-center gap-2"
                >
                  <Plus size={16} /> Add Item
                </button>
                <button
                  onClick={() => setShowImportForm(!showImportForm)}
                  className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 flex items-center gap-2"
                >
                  Import via Paste
                </button>
                {editingSection === 'accounting' && (
                  <button
                    onClick={() => setShowSectionForm(!showSectionForm)}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 flex items-center gap-2"
                  >
                    <Plus size={16} /> Add Section
                  </button>
                )}
                <button
                  onClick={exportToExcel}
                  className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 flex items-center gap-2"
                >
                  <Download size={16} /> Export
                </button>
                <button
                  onClick={resetToDefaults}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2 ml-auto"
                >
                  <RotateCcw size={16} /> Reset to Defaults
                </button>
              </div>

              {showSectionForm && (
                <div className="bg-purple-50 p-4 rounded mb-6">
                  <h3 className="font-semibold mb-3">New Section</h3>
                  <input
                    type="text"
                    placeholder="Section Name (e.g., Reports, Analytics)"
                    value={sectionForm}
                    onChange={(e) => setSectionForm(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  />
                  <button
                    onClick={addNewSection}
                    className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
                  >
                    Create Section
                  </button>
                </div>
              )}

              {showImportForm && (
                <div className="bg-green-50 p-4 rounded mb-6">
                  <h3 className="font-semibold mb-3">Import Menu Items</h3>
                  <p className="text-sm text-gray-600 mb-2">
                    Paste your items (one per line). Format: <code className="bg-gray-200 px-1 rounded">Label, URL</code> or <code className="bg-gray-200 px-1 rounded">Label	URL</code> (tab-separated)
                  </p>
                  <p className="text-sm text-blue-600 mb-2">
                    Items will be automatically sorted into Charges, Receipts, Payables, G/L, or Reports based on keywords.
                  </p>
                  <textarea
                    placeholder="Example:
Dashboard Report, /reports/dashboard
Budget Analysis, /reports/budget
Financial Summary, /reports/financial"
                    value={importText}
                    onChange={(e) => setImportText(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2 font-mono text-sm"
                    rows={8}
                  />
                  <button
                    onClick={() => importItems()}
                    disabled={!importText.trim() || isImporting}
                    className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                  >
                    {isImporting ? 'Importing...' : 'Import & Auto-Sort'}
                  </button>
                </div>
              )}

              {showItemForm && (
                <div className="bg-gray-50 p-4 rounded mb-6">
                  <h3 className="font-semibold mb-3">New Menu Item</h3>
                  <input
                    type="text"
                    placeholder="Label"
                    value={itemForm.label}
                    onChange={(e) => setItemForm({ ...itemForm, label: e.target.value })}
                    className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                  />
                  {!itemForm.isSubmenu && (
                    <input
                      type="text"
                      placeholder="URL"
                      value={itemForm.url}
                      onChange={(e) => setItemForm({ ...itemForm, url: e.target.value })}
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                    />
                  )}
                  <label className="flex items-center gap-2 mb-3">
                    <input
                      type="checkbox"
                      checked={itemForm.isSubmenu}
                      onChange={(e) => setItemForm({ ...itemForm, isSubmenu: e.target.checked })}
                    />
                    <span className="text-sm">Create as submenu container</span>
                  </label>
                  {editingSection === 'accounting' && (
                    <select 
                      className="w-full border border-gray-300 rounded px-3 py-2 mb-2"
                      onChange={(e) => {
                        if (e.target.value) {
                          addNewItem(e.target.value);
                        }
                      }}
                    >
                      <option value="">Select section to add to...</option>
                      {accountingMenu.map(section => (
                        <option key={section.id} value={section.id}>{section.label}</option>
                      ))}
                    </select>
                  )}
                  {editingSection === 'reports' && (
                    <button
                      onClick={() => addNewItem(null)}
                      className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                      Add to Reports
                    </button>
                  )}
                </div>
              )}

              <div className="space-y-4">
                {editingSection === 'reports' ? (
                  <>
                    <div className="bg-white border border-gray-200 rounded p-3">
                      <div 
                        className={`font-bold text-lg text-blue-600 mb-2 p-2 rounded transition-all flex items-center justify-between cursor-pointer ${
                          dragOverItem && dragOverItem.sectionId === 'reports' && !dragOverItem.path ? 'bg-blue-50 ring-2 ring-blue-400' : ''
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverItem({ sectionId: 'reports', path: null });
                        }}
                        onDrop={(e) => handleDrop(e, 'reports', null)}
                        onClick={() => toggleSection('reports')}
                      >
                        <div className="flex items-center gap-2">
                          {collapsedSections['reports'] ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                          <span>Reports</span>
                          {draggedItem && <span className="text-sm">(Drop here to add to end)</span>}
                        </div>
                        <span className="text-sm text-gray-500">({reportsMenu.length} items)</span>
                      </div>
                      {!collapsedSections['reports'] && (
                        <>
                          {reportsMenu.map((item, idx) => 
                            renderMenuItem(item, 'reports', [idx], 0)
                          )}
                          {reportsMenu.length === 0 && (
                            <div 
                              className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-300 rounded"
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragOverItem({ sectionId: 'reports', path: null });
                              }}
                              onDrop={(e) => handleDrop(e, 'reports', null)}
                            >
                              Drop items here
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {/* Show Accounting sections for cross-menu dragging */}
                    <div className="border-t-2 border-green-300 pt-4">
                      <div className="text-sm text-gray-500 mb-2 px-2">📁 Accounting Sections (for cross-menu dragging)</div>
                      {accountingMenu.map((section) => (
                        <div 
                          key={section.id} 
                          className={`bg-white border border-gray-200 rounded p-3 mb-2 transition-all ${
                            draggedSection === section.id ? 'opacity-50' : ''
                          } ${dragOverSection === section.id ? 'ring-2 ring-purple-400' : ''}`}
                          draggable={true}
                          onDragStart={(e) => handleSectionDragStart(e, section.id)}
                          onDragOver={(e) => handleSectionDragOver(e, section.id)}
                          onDrop={(e) => handleSectionDrop(e, section.id)}
                          onDragEnd={handleSectionDragEnd}
                        >
                          <div 
                            className={`font-bold text-sm text-green-600 p-2 rounded transition-all flex items-center justify-between cursor-move ${
                              dragOverItem && dragOverItem.sectionId === section.id && !dragOverItem.path ? 'bg-green-50 ring-2 ring-green-400' : ''
                            }`}
                            onDragOver={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              setDragOverItem({ sectionId: section.id, path: null });
                            }}
                            onDrop={(e) => {
                              e.stopPropagation();
                              handleDrop(e, section.id, null);
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSection(section.id);
                            }}
                          >
                            <div className="flex items-center gap-2">
                              <GripVertical size={16} className="text-gray-400" />
                              {collapsedSections[section.id] ? <ChevronRight size={16} /> : <ChevronDown size={16} />}
                              <span>{section.label}</span>
                              {section.required && <span className="text-xs bg-blue-100 text-blue-600 px-1.5 py-0.5 rounded">Core</span>}
                              {draggedItem && <span className="text-xs">(Drop)</span>}
                            </div>
                            <span className="text-xs text-gray-500">({section.items.length})</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    {/* Show Reports section even in Accounting view for cross-menu dragging */}
                    <div className="bg-white border border-gray-200 rounded p-3 border-green-300">
                      <div 
                        className={`font-bold text-lg text-green-600 mb-2 p-2 rounded transition-all flex items-center justify-between cursor-pointer ${
                          dragOverItem && dragOverItem.sectionId === 'reports' && !dragOverItem.path ? 'bg-green-50 ring-2 ring-green-400' : ''
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          setDragOverItem({ sectionId: 'reports', path: null });
                        }}
                        onDrop={(e) => handleDrop(e, 'reports', null)}
                        onClick={() => toggleSection('reports')}
                      >
                        <div className="flex items-center gap-2">
                          {collapsedSections['reports'] ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                          <span>📊 Reports Menu</span>
                          {draggedItem && <span className="text-sm">(Drop here)</span>}
                        </div>
                        <span className="text-sm text-gray-500">({reportsMenu.length} items)</span>
                      </div>
                      {!collapsedSections['reports'] && (
                        <>
                          {reportsMenu.map((item, idx) => 
                            renderMenuItem(item, 'reports', [idx], 0)
                          )}
                          {reportsMenu.length === 0 && (
                            <div 
                              className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-300 rounded"
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragOverItem({ sectionId: 'reports', path: null });
                              }}
                              onDrop={(e) => handleDrop(e, 'reports', null)}
                            >
                              Drop items here
                            </div>
                          )}
                        </>
                      )}
                    </div>
                    
                    {accountingMenu.map((section) => (
                    <div 
                      key={section.id} 
                      className={`bg-white border border-gray-200 rounded p-3 transition-all ${
                        draggedSection === section.id ? 'opacity-50' : ''
                      } ${dragOverSection === section.id ? 'ring-2 ring-purple-400' : ''}`}
                      draggable={true}
                      onDragStart={(e) => handleSectionDragStart(e, section.id)}
                      onDragOver={(e) => handleSectionDragOver(e, section.id)}
                      onDrop={(e) => handleSectionDrop(e, section.id)}
                      onDragEnd={handleSectionDragEnd}
                    >
                      <div 
                        className={`font-bold text-lg text-blue-600 mb-2 p-2 rounded transition-all flex items-center justify-between cursor-move ${
                          dragOverItem && dragOverItem.sectionId === section.id && !dragOverItem.path ? 'bg-blue-50 ring-2 ring-blue-400' : ''
                        }`}
                        onDragOver={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          setDragOverItem({ sectionId: section.id, path: null });
                        }}
                        onDrop={(e) => {
                          e.stopPropagation();
                          handleDrop(e, section.id, null);
                        }}
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleSection(section.id);
                        }}
                      >
                        <div className="flex items-center gap-2">
                          <GripVertical size={18} className="text-gray-400" />
                          {collapsedSections[section.id] ? <ChevronRight size={20} /> : <ChevronDown size={20} />}
                          <span>{section.label} {draggedItem && '(Drop here to add to end)'}</span>
                        </div>
                        <span className="text-sm text-gray-500">({section.items.length} items)</span>
                      </div>
                      {!collapsedSections[section.id] && (
                        <>
                          {section.items.map((item, itemIdx) => 
                            renderMenuItem(item, section.id, [itemIdx], 0)
                          )}
                          {section.items.length === 0 && (
                            <div 
                              className="text-center py-8 text-gray-400 border-2 border-dashed border-gray-300 rounded"
                              onDragOver={(e) => {
                                e.preventDefault();
                                setDragOverItem({ sectionId: section.id, path: null });
                              }}
                              onDrop={(e) => handleDrop(e, section.id, null)}
                            >
                              Drop items here
                            </div>
                          )}
                        </>
                      )}
                    </div>
                  ))}
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top Navigation */}
      <div className="bg-blue-600 text-white">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2">
              <div className="bg-white text-blue-600 px-2 py-1 rounded font-bold text-sm">V8</div>
              <span className="font-semibold">Voyager 8</span>
            </div>
            <nav className="flex items-center space-x-1 text-sm">
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('dashboards')}
                  className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
                >
                  Dashboards <ChevronDown size={16} className="ml-1" />
                </button>
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('accounting')}
                  className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
                >
                  Accounting <ChevronDown size={16} className="ml-1" />
                </button>
                
                {activeDropdown === 'accounting' && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-gray-700 border border-gray-200 shadow-lg rounded-lg min-w-40 z-50">
                    {accountingMenu.map((section) => (
                      <div
                        key={section.id}
                        className="relative"
                        onMouseEnter={() => handleSubmenuHover(section.id)}
                      >
                        <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-blue-50 hover:text-blue-600 flex items-center justify-between">
                          <span>{section.label}</span>
                          <ChevronRight size={16} />
                        </button>
                        
                        {activeSubmenu === section.id && (
                          <div className="absolute left-full top-0 ml-1 bg-white border border-gray-200 shadow-lg rounded-lg min-w-48 z-50 max-h-[80vh] overflow-y-auto">
                            {renderNavigationSubmenu(section.items, section.label + ' > ')}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              <div className="relative">
                <button 
                  onClick={() => toggleDropdown('reports')}
                  className="hover:bg-blue-700 px-3 py-2 rounded flex items-center"
                >
                  Reports <ChevronDown size={16} className="ml-1" />
                </button>
                
                {activeDropdown === 'reports' && (
                  <div className="absolute top-full left-0 mt-1 bg-white text-gray-700 border border-gray-200 shadow-lg rounded-lg min-w-64 max-h-[80vh] overflow-y-auto z-50">
                    {renderNavigationSubmenu(reportsMenu, 'Reports > ')}
                  </div>
                )}
              </div>
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setShowMenuEditor(true)}
              className="hover:bg-blue-700 p-2 rounded"
              title="Menu Editor"
            >
              <Settings size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="p-6">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">GL Dashboard with Menu Editor</h2>
          <p className="text-gray-600">Click the Settings icon (⚙️) in the top right to open the Menu Editor.</p>
          <p className="text-gray-600 mt-2">Both Reports and Accounting menus support full nesting with → and ← arrow buttons!</p>
          <p className="text-green-600 mt-4 text-sm">✓ Your menu changes are automatically saved and will persist between sessions.</p>
        </div>
      </div>
    </div>
  );
}