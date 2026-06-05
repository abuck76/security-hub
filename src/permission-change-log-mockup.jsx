import { useState } from "react";
import { Search, Download, Calendar, ChevronDown, ChevronRight } from "lucide-react";

// Design tokens matching Voyager 8 / Yardi style
const colors = {
  primary: "#0066cc",
  primaryHover: "#0052a3",
  headerBg: "#1e3a5f",
  border: "#e0e0e0",
  lightBg: "#f9fafb",
  text: "#1a1a1a",
  textMuted: "#6b7280",
  success: "#16a34a",
  warning: "#d97706",
  danger: "#dc2626",
};

// Sample data - flattened for columnar report (each permission change is a row)
const mockChangeLogData = [
  { id: 1, timestamp: "2026-06-02 10:15:23 AM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Bank Reconciliation", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 2, timestamp: "2026-06-02 10:15:23 AM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Post Charges", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 3, timestamp: "2026-06-02 10:15:23 AM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "View GL", programType: "Core", previousAccess: "No Access", newAccess: "Read", securityGroup: "ACCT", affectedUsers: ["Karen White", "Steven Harris", "Michelle Clark", "Daniel Lewis", "Laura Robinson", "Brian Walker", "Amanda Hall", "Kevin Young"] },
  { id: 4, timestamp: "2026-06-02 10:15:23 AM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Budget Entry", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "ACCT", affectedUsers: ["Karen White", "Steven Harris", "Michelle Clark", "Daniel Lewis", "Laura Robinson", "Brian Walker", "Amanda Hall", "Kevin Young"] },
  { id: 5, timestamp: "2026-06-02 10:15:23 AM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Approve Vendor Invoices", programType: "Core", previousAccess: "No Access", newAccess: "Read & Write", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 6, timestamp: "2026-06-01 03:42:15 PM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Prospect - Add", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "LEASING", affectedUsers: ["Thomas King", "Donna Scott", "Jason Green", "Melissa Adams", "Ryan Baker", "Ashley Nelson", "Justin Carter", "Stephanie Mitchell", "Eric Roberts", "Nicole Turner", "Brandon Phillips", "Rachel Campbell", "Tyler Parker", "Rebecca Evans", "Kyle Edwards", "Samantha Collins", "Aaron Stewart", "Lauren Sanchez", "Jordan Morris", "Kayla Rogers", "Dylan Reed", "Taylor Cook", "Cameron Bailey", "Morgan Rivera"] },
  { id: 7, timestamp: "2026-06-01 03:42:15 PM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Lease Approval", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "LEASING", affectedUsers: ["Thomas King", "Donna Scott", "Jason Green", "Melissa Adams", "Ryan Baker", "Ashley Nelson", "Justin Carter", "Stephanie Mitchell", "Eric Roberts", "Nicole Turner", "Brandon Phillips", "Rachel Campbell", "Tyler Parker", "Rebecca Evans", "Kyle Edwards", "Samantha Collins", "Aaron Stewart", "Lauren Sanchez", "Jordan Morris", "Kayla Rogers", "Dylan Reed", "Taylor Cook", "Cameron Bailey", "Morgan Rivera"] },
  { id: 8, timestamp: "2026-06-01 03:42:15 PM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Move In", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "MGMT", affectedUsers: ["Gregory Hughes", "Angela Price", "Timothy Bennett", "Heather Wood", "Frank Barnes", "Christina Ross", "Raymond Henderson", "Kimberly Coleman", "Donald Jenkins", "Deborah Perry", "Gary Powell", "Cynthia Long", "Kenneth Patterson", "Pamela Hughes", "Jeremy Foster"] },
  { id: 9, timestamp: "2026-06-01 03:42:15 PM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Move Out", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "MGMT", affectedUsers: ["Gregory Hughes", "Angela Price", "Timothy Bennett", "Heather Wood", "Frank Barnes", "Christina Ross", "Raymond Henderson", "Kimberly Coleman", "Donald Jenkins", "Deborah Perry", "Gary Powell", "Cynthia Long", "Kenneth Patterson", "Pamela Hughes", "Jeremy Foster"] },
  { id: 10, timestamp: "2026-06-01 03:42:15 PM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Aged Receivables Report", programType: "Adhoc", previousAccess: "No Access", newAccess: "Read", securityGroup: "LEASING", affectedUsers: ["Thomas King", "Donna Scott", "Jason Green", "Melissa Adams", "Ryan Baker", "Ashley Nelson", "Justin Carter", "Stephanie Mitchell", "Eric Roberts", "Nicole Turner", "Brandon Phillips", "Rachel Campbell", "Tyler Parker", "Rebecca Evans", "Kyle Edwards", "Samantha Collins", "Aaron Stewart", "Lauren Sanchez", "Jordan Morris", "Kayla Rogers", "Dylan Reed", "Taylor Cook", "Cameron Bailey", "Morgan Rivera"] },
  { id: 11, timestamp: "2026-05-30 09:28:47 AM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Work Order - Create", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "MAINT", affectedUsers: ["Victor Ramirez", "Gloria Sanders", "Albert Myers", "Teresa Ford", "Willie Hamilton", "Dorothy Graham"] },
  { id: 12, timestamp: "2026-05-30 09:28:47 AM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Work Order - Close", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "MAINT", affectedUsers: ["Victor Ramirez", "Gloria Sanders", "Albert Myers", "Teresa Ford", "Willie Hamilton", "Dorothy Graham"] },
  { id: 13, timestamp: "2026-05-30 09:28:47 AM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Vendor Setup", programType: "Core", previousAccess: "No Access", newAccess: "Read", securityGroup: "MAINT", affectedUsers: ["Victor Ramirez", "Gloria Sanders", "Albert Myers", "Teresa Ford", "Willie Hamilton", "Dorothy Graham"] },
  { id: 14, timestamp: "2026-05-30 09:28:47 AM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Approve Vendor Invoices", programType: "Core", previousAccess: "No Access", newAccess: "Read", securityGroup: "MAINT", affectedUsers: ["Victor Ramirez", "Gloria Sanders", "Albert Myers", "Teresa Ford", "Willie Hamilton", "Dorothy Graham"] },
  { id: 15, timestamp: "2026-05-29 11:05:12 AM", changedBy: "Amanda White", userEmail: "awhite@company.com", permission: "1098: Electronic File Generation", programType: "Core", previousAccess: "Read", newAccess: "Read & Write", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 16, timestamp: "2026-05-29 11:05:12 AM", changedBy: "Amanda White", userEmail: "awhite@company.com", permission: "Account Tree - Edit", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 17, timestamp: "2026-05-29 11:05:12 AM", changedBy: "Amanda White", userEmail: "awhite@company.com", permission: "GL Batch Post", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 18, timestamp: "2026-05-29 11:05:12 AM", changedBy: "Amanda White", userEmail: "awhite@company.com", permission: "NSF Processing", programType: "Core", previousAccess: "No Access", newAccess: "Access", securityGroup: "ADMIN", affectedUsers: ["John Smith", "Maria Garcia", "David Lee", "Jennifer Brown", "Robert Taylor", "Lisa Anderson", "Michael Wilson", "Susan Martinez", "James Davis", "Patricia Moore", "Christopher Jackson", "Nancy Thomas"] },
  { id: 19, timestamp: "2026-05-29 11:05:12 AM", changedBy: "Amanda White", userEmail: "awhite@company.com", permission: "Void Payment", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "ACCT", affectedUsers: ["Karen White", "Steven Harris", "Michelle Clark", "Daniel Lewis", "Laura Robinson", "Brian Walker", "Amanda Hall", "Kevin Young"] },
  { id: 20, timestamp: "2026-05-28 02:15:30 PM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Charge Resident", programType: "Core", previousAccess: "Read & Write", newAccess: "Access", securityGroup: "ACCT", affectedUsers: ["Karen White", "Steven Harris", "Michelle Clark", "Daniel Lewis", "Laura Robinson", "Brian Walker", "Amanda Hall", "Kevin Young"] },
  { id: 21, timestamp: "2026-05-28 02:15:30 PM", changedBy: "Sarah Chen", userEmail: "schen@company.com", permission: "Post Payments", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "ACCT", affectedUsers: ["Karen White", "Steven Harris", "Michelle Clark", "Daniel Lewis", "Laura Robinson", "Brian Walker", "Amanda Hall", "Kevin Young"] },
  { id: 22, timestamp: "2026-05-27 10:42:18 AM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Reports - Run Ad Hoc", programType: "Adhoc", previousAccess: "No Access", newAccess: "Read", securityGroup: "LEASING", affectedUsers: ["Thomas King", "Donna Scott", "Jason Green", "Melissa Adams", "Ryan Baker", "Ashley Nelson", "Justin Carter", "Stephanie Mitchell", "Eric Roberts", "Nicole Turner", "Brandon Phillips", "Rachel Campbell", "Tyler Parker", "Rebecca Evans", "Kyle Edwards", "Samantha Collins", "Aaron Stewart", "Lauren Sanchez", "Jordan Morris", "Kayla Rogers", "Dylan Reed", "Taylor Cook", "Cameron Bailey", "Morgan Rivera"] },
  { id: 23, timestamp: "2026-05-27 10:42:18 AM", changedBy: "Mike Johnson", userEmail: "mjohnson@company.com", permission: "Work Order - Create", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "LEASING", affectedUsers: ["Thomas King", "Donna Scott", "Jason Green", "Melissa Adams", "Ryan Baker", "Ashley Nelson", "Justin Carter", "Stephanie Mitchell", "Eric Roberts", "Nicole Turner", "Brandon Phillips", "Rachel Campbell", "Tyler Parker", "Rebecca Evans", "Kyle Edwards", "Samantha Collins", "Aaron Stewart", "Lauren Sanchez", "Jordan Morris", "Kayla Rogers", "Dylan Reed", "Taylor Cook", "Cameron Bailey", "Morgan Rivera"] },
  { id: 24, timestamp: "2026-05-26 04:22:45 PM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Budget Entry", programType: "Core", previousAccess: "No Access", newAccess: "Read", securityGroup: "MAINT", affectedUsers: ["Victor Ramirez", "Gloria Sanders", "Albert Myers", "Teresa Ford", "Willie Hamilton", "Dorothy Graham"] },
  { id: 25, timestamp: "2026-05-26 04:22:45 PM", changedBy: "Emily Davis", userEmail: "edavis@company.com", permission: "Vendor Setup", programType: "Core", previousAccess: "Read", newAccess: "Access", securityGroup: "READONLY", affectedUsers: ["Sharon Cooper", "Carl Richardson", "Joyce Cox"] },
];

function AccessBadge({ level }) {
  const styles = {
    "Access": { bg: "#dcfce7", color: "#15803d" },
    "Read & Write": { bg: "#fef9c3", color: "#854d0e" },
    "Read": { bg: "#eff6ff", color: "#1d4ed8" },
    "No Access": { bg: "#f3f4f6", color: "#6b7280" },
  };
  const style = styles[level] || styles["No Access"];
  return (
    <span style={{
      background: style.bg,
      color: style.color,
      padding: "2px 8px",
      borderRadius: 4,
      fontSize: 11,
      fontWeight: 600,
      whiteSpace: "nowrap",
      display: "inline-block"
    }}>
      {level}
    </span>
  );
}

export default function PermissionChangeLogMockup() {
  const [searchTerm, setSearchTerm] = useState("");
  const [dateFilter, setDateFilter] = useState("All Time");
  const [userFilter, setUserFilter] = useState("All Users");
  const [groupFilter, setGroupFilter] = useState("All Groups");
  const [programTypeFilter, setProgramTypeFilter] = useState("All Types");
  const [affectedUserFilter, setAffectedUserFilter] = useState("");
  const [expandedRows, setExpandedRows] = useState(new Set());

  const filteredData = mockChangeLogData.filter(row => {
    const matchesSearch =
      row.permission.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.changedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.securityGroup.toLowerCase().includes(searchTerm.toLowerCase()) ||
      row.affectedUsers.some(user => user.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesUser = userFilter === "All Users" || row.changedBy === userFilter;
    const matchesGroup = groupFilter === "All Groups" || row.securityGroup === groupFilter;
    const matchesProgType = programTypeFilter === "All Types" || row.programType === programTypeFilter;
    const matchesAffectedUser = !affectedUserFilter || row.affectedUsers.some(user =>
      user.toLowerCase().includes(affectedUserFilter.toLowerCase())
    );

    return matchesSearch && matchesUser && matchesGroup && matchesProgType && matchesAffectedUser;
  });

  const toggleRowExpansion = (rowId) => {
    setExpandedRows(prev => {
      const newSet = new Set(prev);
      if (newSet.has(rowId)) {
        newSet.delete(rowId);
      } else {
        newSet.add(rowId);
      }
      return newSet;
    });
  };

  const handleExport = () => {
    // Flatten data: one row per affected user per permission change
    const flattenedData = [];
    filteredData.forEach(row => {
      row.affectedUsers.forEach(user => {
        flattenedData.push({
          Timestamp: row.timestamp,
          "Changed By": row.changedBy,
          "Changed By Email": row.userEmail,
          Permission: row.permission,
          "Program Type": row.programType,
          "Previous Access": row.previousAccess,
          "New Access": row.newAccess,
          "Security Group": row.securityGroup,
          "Affected User": user
        });
      });
    });

    // Convert to CSV
    const headers = Object.keys(flattenedData[0] || {});
    const csvContent = [
      headers.join(","),
      ...flattenedData.map(row =>
        headers.map(header => {
          const value = row[header] || "";
          // Escape values that contain commas or quotes
          if (value.includes(",") || value.includes('"')) {
            return `"${value.replace(/"/g, '""')}"`;
          }
          return value;
        }).join(",")
      )
    ].join("\n");

    // Download file
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `permission_change_log_${new Date().toISOString().slice(0, 10)}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Get unique values for filters
  const uniqueUsers = [...new Set(mockChangeLogData.map(r => r.changedBy))];
  const uniqueGroups = [...new Set(mockChangeLogData.map(r => r.securityGroup))];
  const uniqueProgTypes = [...new Set(mockChangeLogData.map(r => r.programType))];
  const allAffectedUsers = [...new Set(mockChangeLogData.flatMap(r => r.affectedUsers))].sort();

  return (
    <div style={{ fontFamily: "'Segoe UI', system-ui, sans-serif", background: "#f5f5f5", minHeight: "100vh" }}>
      {/* Voyager 8 Header */}
      <div style={{
        background: colors.headerBg,
        color: "#fff",
        padding: "0 20px",
        height: 44,
        display: "flex",
        alignItems: "center",
        gap: 24,
        fontSize: 13
      }}>
        <div style={{ fontWeight: 700, fontSize: 15 }}>Voyager 8</div>
        <div style={{ color: "rgba(255,255,255,0.75)" }}>Home</div>
        <div style={{ color: "rgba(255,255,255,0.75)" }}>Setup</div>
        <div style={{ color: "rgba(255,255,255,0.75)" }}>Reports</div>
        <div style={{ color: "#fff", borderBottom: "2px solid #5b9bd5", paddingBottom: 12 }}>Security</div>
        <div style={{ color: "rgba(255,255,255,0.75)" }}>Analytics</div>
        <div style={{ flex: 1 }} />
        <div style={{ color: "rgba(255,255,255,0.75)" }}>Help</div>
      </div>

      {/* Page Header */}
      <div style={{ background: "#fff", borderBottom: `1px solid ${colors.border}`, padding: "16px 24px" }}>
        <div style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>Security Hub Analytics</div>
        <div style={{ fontSize: 13, color: colors.textMuted, marginTop: 4 }}>
          Permission Change Log - Detailed audit report of all permission modifications
        </div>
      </div>

      <div style={{ display: "flex" }}>
        {/* Left Sidebar Navigation */}
        <div style={{
          width: 240,
          background: "#fff",
          borderRight: `1px solid ${colors.border}`,
          minHeight: "calc(100vh - 105px)",
          padding: "20px 0"
        }}>
          <div style={{ padding: "0 20px", marginBottom: 16 }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
              Reports
            </div>
          </div>

          <div>
            <div style={{
              padding: "10px 20px",
              fontSize: 13,
              background: colors.lightBg,
              borderLeft: `3px solid ${colors.primary}`,
              color: colors.primary,
              fontWeight: 500
            }}>
              Permission Change Log
            </div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>User Access Report</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>Login Attempt History</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>Failed Login Report</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>User Activity Monitor</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>Permission Exceptions</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>SOX Compliance Report</div>
            <div style={{ padding: "10px 20px", fontSize: 13, color: colors.text, cursor: "pointer" }}>Audit Trail Export</div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ flex: 1, padding: 24 }}>
          {/* Filters Bar */}
          <div style={{ background: "#fff", border: `1px solid ${colors.border}`, borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", marginBottom: 16 }}>
              {/* Search */}
              <div style={{ position: "relative", flex: 1, minWidth: 250 }}>
                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: colors.textMuted }} />
                <input
                  type="text"
                  placeholder="Search by permission, user, or group..."
                  value={searchTerm}
                  onChange={e => setSearchTerm(e.target.value)}
                  style={{
                    width: "100%",
                    padding: "8px 12px 8px 36px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 6,
                    fontSize: 13,
                    outline: "none"
                  }}
                />
              </div>

              {/* Export Button */}
              <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end" }}>
                <button
                  onClick={handleExport}
                  style={{
                    padding: "8px 16px",
                    background: colors.primary,
                    color: "#fff",
                    border: "none",
                    borderRadius: 6,
                    fontSize: 13,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 6
                  }}
                >
                  <Download size={14} />
                  Export to CSV
                </button>
                <div style={{ fontSize: 10, color: colors.textMuted, marginTop: 2 }}>
                  One row per affected user
                </div>
              </div>
            </div>

            <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap" }}>
              {/* Date Range */}
              <select
                value={dateFilter}
                onChange={e => setDateFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                <option>All Time</option>
                <option>Today</option>
                <option>Last 7 Days</option>
                <option>Last 30 Days</option>
                <option>Last 90 Days</option>
                <option>Custom Range</option>
              </select>

              {/* Changed By User Filter */}
              <select
                value={userFilter}
                onChange={e => setUserFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                <option>All Users (Changed By)</option>
                {uniqueUsers.map(user => (
                  <option key={user}>{user}</option>
                ))}
              </select>

              {/* Group Filter */}
              <select
                value={groupFilter}
                onChange={e => setGroupFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                <option>All Groups</option>
                {uniqueGroups.map(group => (
                  <option key={group}>{group}</option>
                ))}
              </select>

              {/* Program Type Filter */}
              <select
                value={programTypeFilter}
                onChange={e => setProgramTypeFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer"
                }}
              >
                <option>All Types</option>
                {uniqueProgTypes.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>

              {/* Affected User Filter */}
              <select
                value={affectedUserFilter}
                onChange={e => setAffectedUserFilter(e.target.value)}
                style={{
                  padding: "7px 12px",
                  border: `1px solid ${colors.border}`,
                  borderRadius: 6,
                  fontSize: 13,
                  background: "#fff",
                  cursor: "pointer",
                  minWidth: 200
                }}
              >
                <option value="">All Affected Users</option>
                {allAffectedUsers.map(user => (
                  <option key={user} value={user}>{user}</option>
                ))}
              </select>
            </div>

            {/* Summary Stats */}
            <div style={{ display: "flex", gap: 24, marginTop: 16, paddingTop: 16, borderTop: `1px solid ${colors.border}` }}>
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                  Total Records
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>
                  {filteredData.length}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                  Unique Permissions
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>
                  {new Set(filteredData.map(r => r.permission)).size}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                  Groups Modified
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>
                  {new Set(filteredData.map(r => r.securityGroup)).size}
                </div>
              </div>
              <div>
                <div style={{ fontSize: 11, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 4 }}>
                  Unique Users Affected
                </div>
                <div style={{ fontSize: 20, fontWeight: 600, color: colors.text }}>
                  {new Set(filteredData.flatMap(r => r.affectedUsers)).size}
                </div>
              </div>
            </div>
          </div>

          {/* Columnar Report Table */}
          <div style={{ background: "#fff", border: `1px solid ${colors.border}`, borderRadius: 8, overflow: "hidden" }}>
            <div style={{ overflowX: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1200 }}>
                <thead>
                  <tr style={{ background: "#f9fafb", borderBottom: `2px solid ${colors.border}` }}>
                    <th style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Timestamp
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Changed By
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "left", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                      Permission
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "center", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Program Type
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "center", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Previous Access
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "center", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      New Access
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "center", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Security Group
                    </th>
                    <th style={{ padding: "12px 14px", textAlign: "center", fontSize: 11, fontWeight: 600, color: colors.textMuted, textTransform: "uppercase", letterSpacing: "0.05em", whiteSpace: "nowrap" }}>
                      Users Affected
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((row, idx) => {
                    const isExpanded = expandedRows.has(row.id);
                    return (
                      <>
                        <tr key={row.id} style={{
                          borderBottom: isExpanded ? "none" : `1px solid ${colors.border}`,
                          background: idx % 2 === 0 ? "#fff" : "#fafafa"
                        }}>
                          <td style={{ padding: "10px 14px", fontSize: 12, whiteSpace: "nowrap" }}>
                            {row.timestamp}
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 12 }}>
                            <div style={{ fontWeight: 500 }}>{row.changedBy}</div>
                            <div style={{ fontSize: 11, color: colors.textMuted }}>{row.userEmail}</div>
                          </td>
                          <td style={{ padding: "10px 14px", fontSize: 12 }}>
                            {row.permission}
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 11 }}>
                            <span style={{
                              background: "#f3f4f6",
                              padding: "3px 8px",
                              borderRadius: 4,
                              color: colors.textMuted,
                              fontWeight: 500
                            }}>
                              {row.programType}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <AccessBadge level={row.previousAccess} />
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <AccessBadge level={row.newAccess} />
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center", fontSize: 12 }}>
                            <span style={{
                              background: "#e0f2fe",
                              color: "#0369a1",
                              padding: "3px 10px",
                              borderRadius: 12,
                              fontSize: 11,
                              fontWeight: 600
                            }}>
                              {row.securityGroup}
                            </span>
                          </td>
                          <td style={{ padding: "10px 14px", textAlign: "center" }}>
                            <button
                              onClick={() => toggleRowExpansion(row.id)}
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                margin: "0 auto",
                                padding: "4px 8px",
                                background: "transparent",
                                border: "none",
                                cursor: "pointer",
                                fontSize: 13,
                                fontWeight: 600,
                                color: colors.primary,
                                transition: "background 0.2s"
                              }}
                              onMouseEnter={e => e.currentTarget.style.background = colors.lightBg}
                              onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                            >
                              {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
                              {row.affectedUsers.length} users
                            </button>
                          </td>
                        </tr>
                        {isExpanded && (
                          <tr key={`${row.id}-expanded`} style={{
                            borderBottom: `1px solid ${colors.border}`,
                            background: idx % 2 === 0 ? "#fff" : "#fafafa"
                          }}>
                            <td colSpan={8} style={{ padding: "0 14px 14px 14px" }}>
                              <div style={{
                                background: "#f9fafb",
                                border: `1px solid ${colors.border}`,
                                borderRadius: 6,
                                padding: 12
                              }}>
                                <div style={{
                                  fontSize: 11,
                                  fontWeight: 600,
                                  color: colors.textMuted,
                                  textTransform: "uppercase",
                                  letterSpacing: "0.05em",
                                  marginBottom: 8
                                }}>
                                  Affected Users ({row.affectedUsers.length})
                                </div>
                                <div style={{
                                  display: "grid",
                                  gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                                  gap: 6
                                }}>
                                  {row.affectedUsers.map(user => (
                                    <div
                                      key={user}
                                      style={{
                                        fontSize: 12,
                                        padding: "6px 10px",
                                        background: "#fff",
                                        border: `1px solid ${colors.border}`,
                                        borderRadius: 4,
                                        color: colors.text
                                      }}
                                    >
                                      {user}
                                    </div>
                                  ))}
                                </div>
                              </div>
                            </td>
                          </tr>
                        )}
                      </>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filteredData.length === 0 && (
              <div style={{ padding: 60, textAlign: "center", color: colors.textMuted }}>
                No permission changes found matching your filters
              </div>
            )}

            {/* Pagination footer */}
            {filteredData.length > 0 && (
              <div style={{
                padding: "12px 16px",
                borderTop: `1px solid ${colors.border}`,
                background: colors.lightBg,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 12,
                color: colors.textMuted
              }}>
                <div>
                  Showing {filteredData.length} of {mockChangeLogData.length} records
                </div>
                <div style={{ display: "flex", gap: 8 }}>
                  <button style={{
                    padding: "4px 12px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 4,
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: 12
                  }}>
                    Previous
                  </button>
                  <button style={{
                    padding: "4px 12px",
                    border: `1px solid ${colors.border}`,
                    borderRadius: 4,
                    background: "#fff",
                    cursor: "pointer",
                    fontSize: 12
                  }}>
                    Next
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
