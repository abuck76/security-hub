import React, { useState } from "react";
import { Shield } from "lucide-react";

// ─── Design Tokens ────────────────────────────────────────────────────────────
const c = {
  bg: "#f9fafb", surface: "#ffffff", border: "#e5e7eb", borderLight: "#f3f4f6",
  text: "#111827", textMuted: "#6b7280", textLight: "#9ca3af",
  primary: "#2563eb", primaryHover: "#1d4ed8", primaryLight: "#eff6ff",
  navBg: "#1e3a5f", navText: "#ffffff",
  success: "#16a34a", successBg: "#f0fdf4", successBorder: "#bbf7d0",
  danger: "#dc2626", dangerBg: "#fef2f2", dangerBorder: "#fecaca",
  warning: "#d97706", warningBg: "#fffbeb",
  amber: "#b45309", amberBg: "#fef3c7",
};

const st = {
  page: { background: c.bg, minHeight: "100vh", color: c.text },
  nav: { background: c.navBg, color: c.navText, padding: "0 20px", display: "flex", alignItems: "center", height: 44, gap: 24, fontSize: 13 },
  navLogo: { fontWeight: 700, fontSize: 15, color: "#fff", marginRight: 8 },
  navItem: { color: "rgba(255,255,255,0.75)", cursor: "pointer", padding: "12px 0", borderBottom: "2px solid transparent" },
  navItemActive: { color: "#fff", borderBottom: "2px solid #5b9bd5" },
  pageHeader: { background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "16px 24px", display: "flex", alignItems: "center", gap: 12 },
  pageTitle: { fontSize: 24, fontWeight: 600, color: c.text },
  pageSubtitle: { fontSize: 14, color: c.textMuted, marginTop: 2 },
  tabBar: { background: c.surface, borderBottom: `1px solid ${c.border}`, display: "flex", padding: "0 24px" },
  tab: { padding: "12px 16px", cursor: "pointer", fontSize: 14, fontWeight: 500, color: c.textMuted, borderBottom: "2px solid transparent", marginBottom: -1 },
  tabActive: { color: c.primary, borderBottom: `2px solid ${c.primary}` },
  content: { padding: 24 },
  toolbarStrip: { background: c.surface, borderBottom: `1px solid ${c.border}`, padding: "16px 24px", margin: "-24px -24px 24px -24px", display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" },
  toolbar: { display: "flex", gap: 10, marginBottom: 16, alignItems: "center", flexWrap: "wrap" },
  input: { border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, outline: "none", background: c.surface },
  select: { border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, background: c.surface },
  btn: { background: c.primary, color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", fontSize: 14, cursor: "pointer", fontWeight: 500 },
  btnOutline: { background: c.surface, color: c.primary, border: `1px solid ${c.primary}`, borderRadius: 8, padding: "6px 16px", fontSize: 14, cursor: "pointer" },
  btnSmall: { background: c.surface, color: c.primary, border: `1px solid ${c.border}`, borderRadius: 6, padding: "4px 10px", fontSize: 12, cursor: "pointer" },
  btnDanger: { background: c.danger, color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontSize: 14, cursor: "pointer" },
  btnSuccess: { background: c.success, color: "#fff", border: "none", borderRadius: 8, padding: "6px 16px", fontSize: 14, cursor: "pointer" },
  table: { width: "100%", borderCollapse: "collapse", background: c.surface, borderRadius: 12, overflow: "hidden", border: `1px solid ${c.border}` },
  th: { background: "#f9fafb", borderBottom: `1px solid ${c.border}`, padding: "10px 16px", textAlign: "left", fontSize: 12, fontWeight: 600, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.04em" },
  td: { padding: "12px 16px", borderBottom: `1px solid ${c.borderLight}`, fontSize: 14 },
  pill: { background: "#f3f4f6", color: c.textMuted, borderRadius: 9999, padding: "2px 10px", fontSize: 12, display: "inline-block" },
  drawer: { position: "fixed", right: 0, top: 0, bottom: 0, width: 800, background: c.surface, boxShadow: "-4px 0 24px rgba(0,0,0,0.15)", zIndex: 100, display: "flex", flexDirection: "column" },
  drawerHeader: { padding: "16px 24px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "flex-start" },
  drawerTitle: { fontSize: 16, fontWeight: 600 },
  drawerTabBar: { borderBottom: `1px solid ${c.border}`, display: "flex", padding: "0 24px", flexWrap: "wrap", background: c.surface },
  drawerTab: { padding: "10px 14px", cursor: "pointer", fontSize: 12, fontWeight: 500, color: c.textMuted, borderBottom: "2px solid transparent", marginBottom: -1 },
  drawerTabActive: { color: c.primary, borderBottom: `2px solid ${c.primary}` },
  drawerContent: { flex: 1, overflowY: "auto", padding: 24 },
  formRow: { display: "flex", gap: 16, marginBottom: 14 },
  formGroup: { flex: 1 },
  label: { display: "block", fontSize: 12, fontWeight: 500, color: c.textMuted, marginBottom: 4 },
  inputFull: { width: "100%", border: `1px solid ${c.border}`, borderRadius: 8, padding: "8px 12px", fontSize: 14, boxSizing: "border-box" },
  overlay: { position: "fixed", inset: 0, background: "rgba(0,0,0,0.3)", zIndex: 90 },
  modal: { position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", background: c.surface, borderRadius: 12, zIndex: 110, width: 560, maxHeight: "80vh", display: "flex", flexDirection: "column", boxShadow: "0 8px 40px rgba(0,0,0,0.2)" },
  modalHeader: { padding: "16px 24px", borderBottom: `1px solid ${c.border}`, display: "flex", justifyContent: "space-between", alignItems: "center" },
  modalBody: { padding: 24, overflowY: "auto", flex: 1 },
  modalFooter: { padding: "14px 24px", borderTop: `1px solid ${c.border}`, display: "flex", justifyContent: "flex-end", gap: 10 },
  badge: (color, bg) => ({ background: bg, color, borderRadius: 9999, padding: "2px 10px", fontSize: 12, fontWeight: 600, display: "inline-block" }),
  sectionTitle: { fontSize: 13, fontWeight: 600, marginBottom: 10, marginTop: 16, color: c.text },
  transferBox: { border: `1px solid ${c.border}`, borderRadius: "0 0 8px 8px", height: 208, overflowY: "auto", padding: 4 },
  transferItem: { padding: "6px 8px", fontSize: 12, cursor: "pointer", borderRadius: 4 },
};

// ─── Sample Data ─────────────────────────────────────────────────────────────
const groups = [
  { id: 1, code: "ADMIN", description: "Administrators", users: 12, status: "Active" },
  { id: 2, code: "ACCT", description: "Accounting Team", users: 8, status: "Active" },
  { id: 3, code: "LEASING", description: "Leasing Staff", users: 24, status: "Active" },
  { id: 4, code: "MAINT", description: "Maintenance", users: 6, status: "Active" },
  { id: 5, code: "MGMT", description: "Property Management", users: 15, status: "Active" },
  { id: 6, code: "READONLY", description: "Read Only Access", users: 3, status: "Inactive" },
];

const users = [
  { id: 1, username: "jsmith", name: "Jane Smith", email: "j.smith@example.com", group: "ADMIN", lastLogin: "5/28/2026", status: "Active" },
  { id: 2, username: "bjones", name: "Bob Jones", email: "b.jones@example.com", group: "ACCT", lastLogin: "5/27/2026", status: "Active" },
  { id: 3, username: "mlee", name: "Maria Lee", email: "m.lee@example.com", group: "LEASING", lastLogin: "5/29/2026", status: "Active" },
  { id: 4, username: "tdavis", name: "Tom Davis", email: "t.davis@example.com", group: "MAINT", lastLogin: "5/20/2026", status: "Inactive" },
  { id: 5, username: "kwilson", name: "Karen Wilson", email: "k.wilson@example.com", group: "MGMT", lastLogin: "5/28/2026", status: "Active" },
];

const reports = [
  { id: 1, name: "Balance Sheet", type: "SQL", menu: "Financials", roles: 4 },
  { id: 2, name: "Rent Roll", type: "YSR", menu: "Leasing", roles: 6 },
  { id: 3, name: "AR Aging", type: "SQL", menu: "Financials", roles: 5 },
  { id: 4, name: "Trial Balance", type: "SQL", menu: "Financials", roles: 3 },
  { id: 5, name: "Occupancy Report", type: "YSR", menu: "Operations", roles: 7 },
  { id: 6, name: "Delinquency Report", type: "SQL", menu: "Leasing", roles: 2 },
];

const permissionCategories = [
  { cat: "Residents", items: ["View Residents", "Edit Residents", "Move-In", "Move-Out", "Eviction"] },
  { cat: "Leasing", items: ["View Prospects", "Edit Applications", "Approve Leases", "Cancel Leases"] },
  { cat: "Financials", items: ["View GL", "Post Charges", "Post Payments", "Void Transactions", "Run Reports"] },
  { cat: "Maintenance", items: ["View Work Orders", "Create Work Orders", "Close Work Orders", "Purchase Orders"] },
];

const glAccounts = Array.from({ length: 40 }, (_, i) => `${5000 + i * 10} - Account ${i + 1}`);
const acctTrees = Array.from({ length: 12 }, (_, i) => `Tree ${i + 1}`);
const chargeCodes = Array.from({ length: 18 }, (_, i) => `CC-${100 + i} Charge Code ${i + 1}`);

const archivedProperties = [
  { id: 1,  name: "[Archived] Alaska Trails Assisted Living & Memory Care", code: "bv0020" },
  { id: 2,  name: "[Archived] Barclay House of Carrollton",                 code: "cv0000c" },
  { id: 3,  name: "[Archived] Bay Pointe Assisted Living & Marine Courte Memory Care", code: "dln0040" },
  { id: 4,  name: "[Archived] Bayside Terrace",                             code: "ca0000c" },
  { id: 5,  name: "[Archived] Brandywine Branded Estates",                  code: "nv0000" },
  { id: 6,  name: "[Archived] Brandywine Haverford Terrace Island",         code: "pe0000c" },
  { id: 7,  name: "[Archived] Brandywine Governors Crossing",               code: "lang0060" },
  { id: 8,  name: "[Archived] Brandywine Haddonfield",                      code: "nf0020" },
  { id: 9,  name: "[Archived] Brandywine Haverford Terrace",                code: "pe0040" },
  { id: 10, name: "[Archived] Brandywine Huntington Terrace",               code: "lh0000" },
  { id: 11, name: "[Archived] Brandywine Litchfield",                       code: "fh0001" },
  { id: 12, name: "[Archived] Brandywine Senior Living at Dresher Estate",  code: "dr0000" },
];

// ─── Helpers ─────────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const map = { Active: [c.success, c.successBg], Inactive: [c.textMuted, "#f3f4f6"], Locked: [c.danger, c.dangerBg] };
  const [col, bg] = map[status] || [c.textMuted, "#f3f4f6"];
  return <span style={st.badge(col, bg)}>{status}</span>;
}

function AccessBadge({ access, onClick }) {
  const styles = {
    Access:        { background: "#dcfce7", color: "#15803d", border: "1px solid #bbf7d0" },
    "Read & Write":{ background: "#fef9c3", color: "#854d0e", border: "1px solid #fde047" },
    Read:          { background: "#eff6ff", color: "#1d4ed8", border: "1px solid #bfdbfe" },
    "No Access":   { background: "#f3f4f6", color: "#6b7280", border: "1px solid #e5e7eb" },
  };
  const s = styles[access] || styles["No Access"];
  return (
    <span onClick={onClick} style={{ ...s, borderRadius: 6, padding: "3px 10px", fontSize: 12, fontWeight: 600, display: "inline-block", cursor: onClick ? "pointer" : "default", whiteSpace: "nowrap" }}>
      {access}
    </span>
  );
}

function TypeBadge({ type }) {
  if (type === "SQL") return <span style={st.badge(c.primary, c.primaryLight)}>SQL</span>;
  return <span style={st.badge(c.amber, c.amberBg)}>YSR</span>;
}

function CloseBtn({ onClick }) {
  return (
    <button onClick={onClick} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 20, color: c.textMuted, lineHeight: 1 }}>×</button>
  );
}

function TransferList({ label, items, selected, onSelect }) {
  const available = items.filter(i => !selected.includes(i));
  const [selAvail, setSelAvail] = useState([]);
  const [selRight, setSelRight] = useState([]);

  return (
    <div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500, background: "#0d9488", color: "#fff", padding: "6px 10px", borderRadius: "6px 6px 0 0" }}>No Access ({available.length})</div>
          <div style={st.transferBox}>
            {available.map(item => (
              <div key={item} style={{ ...st.transferItem, background: selAvail.includes(item) ? c.primaryLight : "transparent" }}
                onClick={() => setSelAvail(p => p.includes(item) ? p.filter(x => x !== item) : [...p, item])}>
                {item}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 4, paddingTop: 32 }}>
          <button style={st.btnSmall} onClick={() => { onSelect([...items]); setSelAvail([]); }}>← ALL</button>
          <button style={st.btnSmall} onClick={() => { onSelect([...selected, ...selAvail]); setSelAvail([]); }}>←</button>
          <button style={st.btnSmall} onClick={() => { onSelect(selected.filter(i => !selRight.includes(i))); setSelRight([]); }}>→</button>
          <button style={st.btnSmall} onClick={() => { onSelect([]); setSelRight([]); }}>ALL →</button>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 500, background: "#0d9488", color: "#fff", padding: "6px 10px", borderRadius: "6px 6px 0 0" }}>Access ({selected.length})</div>
          <div style={st.transferBox}>
            {selected.map(item => (
              <div key={item} style={{ ...st.transferItem, background: selRight.includes(item) ? c.primaryLight : "transparent" }}
                onClick={() => setSelRight(p => p.includes(item) ? p.filter(x => x !== item) : [...p, item])}>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Toggle ───────────────────────────────────────────────────────────────────
function Toggle({ defaultChecked = false, onChange }) {
  const [on, setOn] = useState(defaultChecked);
  const handleClick = () => { const next = !on; setOn(next); if (onChange) onChange(next); };
  return (
    <div onClick={handleClick} style={{ width: 40, height: 24, borderRadius: 9999, background: on ? c.primary : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s", flexShrink: 0 }}>
      <div style={{ width: 16, height: 16, borderRadius: "50%", background: "#fff", position: "absolute", top: 4, left: on ? 20 : 4, transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
    </div>
  );
}

// ─── Permissions Drawer Tab ───────────────────────────────────────────────────
function PermissionsDrawerTab({ permRows, userCount }) {
  const accessLevels = ["Access", "Read & Write", "Read", "No Access"];
  const [progType, setProgType] = useState("Any");
  const [descFilter, setDescFilter] = useState("");
  const [accessFilter, setAccessFilter] = useState("Any");
  const [newOnly, setNewOnly] = useState(false);
  const [rows, setRows] = useState(permRows);
  const [activeFilter, setActiveFilter] = useState(null);
  const [sortDesc, setSortDesc] = useState("asc");
  const [sortAccess, setSortAccess] = useState(null);

  const filtered = rows.filter(r =>
    (progType === "Any" || r.type === progType) &&
    (accessFilter === "Any" || r.access === accessFilter) &&
    r.desc.toLowerCase().includes(descFilter.toLowerCase())
  );

  const sorted = [...filtered].sort((a, b) => {
    if (sortAccess) {
      const order = ["Access", "Read & Write", "Read", "No Access"];
      const diff = order.indexOf(a.access) - order.indexOf(b.access);
      return sortAccess === "asc" ? diff : -diff;
    }
    return sortDesc === "asc" ? a.desc.localeCompare(b.desc) : b.desc.localeCompare(a.desc);
  });

  const cycleAccess = (rowDesc) => {
    setRows(prev => prev.map(r => {
      if (r.desc !== rowDesc) return r;
      const idx = accessLevels.indexOf(r.access);
      return { ...r, access: accessLevels[(idx + 1) % accessLevels.length] };
    }));
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
      {/* "Affecting N users" */}
      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 12, fontSize: 13, color: c.textMuted }}>
        <svg width="15" height="15" viewBox="0 0 16 16" fill="none"><circle cx="6" cy="5" r="3" stroke="#6b7280" strokeWidth="1.4"/><path d="M1 14c0-3 2-5 5-5s5 2 5 5" stroke="#6b7280" strokeWidth="1.4" strokeLinecap="round"/><circle cx="12" cy="5" r="2.5" stroke="#6b7280" strokeWidth="1.2"/><path d="M14.5 13c0-2-1.3-3.5-3-4" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round"/></svg>
        Affecting <strong style={{ color: c.text }}>{userCount} users</strong>
      </div>

      {/* Filter bar */}
      <div style={{ display: "flex", gap: 8, marginBottom: 14, alignItems: "flex-end", flexWrap: "wrap" }}>
        {/* Program Type */}
        <div>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Program Type</div>
          <div style={{ display: "flex", alignItems: "center", border: `1px solid ${c.border}`, borderRadius: 4, background: c.surface, overflow: "hidden" }}>
            <select value={progType} onChange={e => setProgType(e.target.value)}
              style={{ border: "none", padding: "5px 8px", fontSize: 13, background: "transparent", outline: "none", minWidth: 90 }}>
              <option value="Any">Any</option>
              <option>Core</option><option>PHA</option><option>Adhoc</option>
            </select>
            <div style={{ width: 1, background: c.border, height: 22 }} />
            <button style={{ border: "none", background: "none", padding: "0 8px", cursor: "pointer", color: c.textMuted, fontSize: 14 }}>⋮</button>
          </div>
        </div>

        {/* Description */}
        <div>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Description</div>
          <input value={descFilter} onChange={e => setDescFilter(e.target.value)} placeholder="Description"
            style={{ border: `1px solid ${c.border}`, borderRadius: 4, padding: "6px 10px", fontSize: 13, outline: "none", width: 160 }} />
        </div>

        {/* Access */}
        <div>
          <div style={{ fontSize: 11, color: c.textMuted, marginBottom: 3 }}>Access</div>
          <select value={accessFilter} onChange={e => setAccessFilter(e.target.value)}
            style={{ border: `1px solid ${c.border}`, borderRadius: 4, padding: "6px 24px 6px 8px", fontSize: 13, background: c.surface, outline: "none" }}>
            <option value="Any">Any</option>
            {accessLevels.map(a => <option key={a}>{a}</option>)}
          </select>
        </div>

        {/* New Only */}
        <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, paddingBottom: 6, cursor: "pointer" }}>
          <input type="checkbox" checked={newOnly} onChange={e => setNewOnly(e.target.checked)} /> New Only
        </label>

        {/* Search / Clear */}
        <button style={{ ...st.btn, paddingLeft: 18, paddingRight: 18, alignSelf: "flex-end" }}>Search</button>
        <button onClick={() => { setProgType("Any"); setDescFilter(""); setAccessFilter("Any"); setNewOnly(false); }}
          style={{ background: "none", border: "none", color: c.primary, fontSize: 13, cursor: "pointer", alignSelf: "flex-end", paddingBottom: 8 }}>
          Clear
        </button>
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflowY: "auto", border: `1px solid ${c.border}`, borderRadius: 4 }}>
        <table style={{ width: "100%", borderCollapse: "collapse" }}>
          <thead style={{ position: "sticky", top: 0, zIndex: 2 }}>
            <tr style={{ background: c.surface, borderBottom: `1px solid ${c.border}` }}>
              <th style={{ ...st.th, fontWeight: 500, textTransform: "none", fontSize: 13, letterSpacing: 0, cursor: "pointer", width: "55%" }}
                onClick={() => setSortDesc(p => p === "asc" ? "desc" : "asc")}>
                Description <span style={{ color: c.textLight }}>{sortDesc === "asc" ? "↑" : "↓"}</span>
              </th>
              <th style={{ ...st.th, fontWeight: 500, textTransform: "none", fontSize: 13, letterSpacing: 0, cursor: "pointer", width: "25%" }}
                onClick={() => setSortAccess(p => p === "asc" ? "desc" : p === "desc" ? null : "asc")}>
                Access <span style={{ color: c.primary, fontSize: 14 }}>✎</span>
                {sortAccess && <span style={{ color: c.textLight }}> {sortAccess === "asc" ? "↑" : "↓"}</span>}
              </th>
              <th style={{ ...st.th, fontWeight: 500, textTransform: "none", fontSize: 13, letterSpacing: 0, cursor: "pointer", width: "20%" }}>
                Program Type <span style={{ color: c.textLight }}>↕</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {sorted.map((r, i) => (
              <tr key={r.desc} style={{ background: i % 2 === 0 ? c.surface : "#fafafa" }}>
                <td style={{ ...st.td, color: c.text }}>{r.desc}</td>
                <td style={st.td}>
                  <AccessBadge access={r.access} onClick={() => cycleAccess(r.desc)} />
                </td>
                <td style={{ ...st.td, color: c.textMuted }}>{r.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div style={{ borderTop: `1px solid ${c.border}`, padding: "12px 0 0", display: "flex", justifyContent: "flex-end", gap: 10, marginTop: 12 }}>
        <button style={{ ...st.btnOutline, padding: "6px 20px" }}>Cancel</button>
        <button style={{ ...st.btn, padding: "6px 20px" }}>Save</button>
      </div>
    </div>
  );
}

// ─── Security Group Drawer ────────────────────────────────────────────────────
function SecurityGroupDrawer({ group, onClose }) {
  const [tab, setTab] = useState("Security Group");
  const [accounts, setAccounts] = useState(glAccounts.slice(0, 36));
  const [trees, setTrees] = useState(acctTrees.slice(0, 11));
  const [codes, setCodes] = useState(chargeCodes.slice(0, 14));
  const tabs = ["Security Group", "Users", "Permissions", "Accounts", "Acct Trees", "Charge Codes", "Display Types", "Expense Type Restrictions", "Books", "Voyager 7s Menus"];

  const permRows = [
    { desc: "1098: Electronic File Generation for 1098", access: "Read & Write", type: "Core" },
    { desc: "1099: Combined Federal/State Filing Setup", access: "Read & Write", type: "Core" },
    { desc: "1099: Software Supplier Information", access: "Read", type: "Core" },
    { desc: "1toMany-Add", access: "Access", type: "Core" },
    { desc: "1toMany-Delete", access: "Access", type: "Core" },
    { desc: "50058 Override Maximum Occupancy Standard", access: "Access", type: "PHA" },
    { desc: "50058 Override Minimum Occupancy Standard", access: "No Access", type: "PHA" },
    { desc: "50058 Override TTP Baseline", access: "No Access", type: "PHA" },
    { desc: "58 All Cond - SSRS Report", access: "No Access", type: "PHA" },
    { desc: "58 All Full Report", access: "No Access", type: "PHA" },
    { desc: "Account Tree - Edit", access: "Access", type: "Core" },
    { desc: "Account Tree - View", access: "Access", type: "Core" },
    { desc: "Aged Receivables Report", access: "Read", type: "Adhoc" },
    { desc: "Approve Vendor Invoices", access: "Read & Write", type: "Core" },
    { desc: "Budget Entry", access: "Access", type: "Core" },
    { desc: "Charge Resident", access: "Read & Write", type: "Core" },
    { desc: "GL Batch Post", access: "No Access", type: "Core" },
    { desc: "Lease Approval", access: "Access", type: "Core" },
    { desc: "Move In", access: "Access", type: "Core" },
    { desc: "Move Out", access: "Access", type: "Core" },
    { desc: "NSF Processing", access: "No Access", type: "Core" },
    { desc: "PHA Inspection Entry", access: "No Access", type: "PHA" },
    { desc: "Prospect - Add", access: "Access", type: "Core" },
    { desc: "Reports - Run Ad Hoc", access: "Read", type: "Adhoc" },
    { desc: "Vendor Setup", access: "No Access", type: "Core" },
    { desc: "Void Payment", access: "No Access", type: "Core" },
    { desc: "Work Order - Close", access: "Access", type: "Core" },
    { desc: "Work Order - Create", access: "Access", type: "Core" },
  ];

  const groupUsers = [
    { name: "Jane Smith", email: "j.smith@example.com", propSec: "All Properties", status: "Active" },
    { name: "Tom Davis", email: "t.davis@example.com", propSec: "Portfolio A", status: "Inactive" },
  ];

  return (
    <>
      <div style={st.overlay} onClick={onClose} />
      <div style={st.drawer}>
        <div style={st.drawerHeader}>
          <div>
            <div style={st.drawerTitle}>{group.code} — {group.description}</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>Security Group Details</div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={st.drawerTabBar}>
          {tabs.map(t => (
            <div key={t} style={{ ...st.drawerTab, ...(tab === t ? st.drawerTabActive : {}) }} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>
        <div style={st.drawerContent}>
          {tab === "Security Group" && (
            <div>
              <div style={st.sectionTitle}>General</div>
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={st.label}>Description</label><input style={st.inputFull} defaultValue={group.description} /></div>
                <div style={st.formGroup}><label style={st.label}>Code</label><input style={st.inputFull} defaultValue={group.code} /></div>
              </div>
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={st.label}>Notes</label><textarea style={{ ...st.inputFull, height: 60, resize: "vertical" }} /></div>
              </div>
              <div style={st.sectionTitle}>Journal Entry Restrictions</div>
              <div style={{ display: "flex", gap: 20 }}>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><input type="checkbox" /> No cash JE</label>
                <label style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13 }}><input type="checkbox" /> No accrual JE</label>
              </div>
              <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button style={st.btnOutline} onClick={onClose}>Cancel</button>
                <button style={st.btn}>Save</button>
              </div>
            </div>
          )}
          {tab === "Users" && (
            <div>
              <div style={{ ...st.toolbar, justifyContent: "space-between" }}>
                <input style={st.input} placeholder="Search users..." />
                <button style={st.btn}>+ Add User(s)</button>
              </div>
              <table style={st.table}>
                <thead><tr>
                  <th style={st.th}>Name</th><th style={st.th}>Email</th><th style={st.th}>Property Security</th><th style={st.th}>Status</th><th style={st.th}></th>
                </tr></thead>
                <tbody>{groupUsers.map((u, i) => (
                  <tr key={i}>
                    <td style={{ ...st.td, color: c.primary, fontWeight: 500 }}>{u.name}</td>
                    <td style={{ ...st.td, color: c.textMuted }}>{u.email}</td>
                    <td style={st.td}><span style={st.pill}>{u.propSec}</span></td>
                    <td style={st.td}><StatusBadge status={u.status} /></td>
                    <td style={st.td}><button style={st.btnSmall}>Deactivate</button></td>
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {tab === "Permissions" && (
            <PermissionsDrawerTab permRows={permRows} userCount={6} />
          )}
          {tab === "Accounts" && <TransferList label="GL Accounts" items={glAccounts} selected={accounts} onSelect={setAccounts} />}
          {tab === "Acct Trees" && <TransferList label="Account Trees" items={acctTrees} selected={trees} onSelect={setTrees} />}
          {tab === "Charge Codes" && <TransferList label="Charge Codes" items={chargeCodes} selected={codes} onSelect={setCodes} />}
          {tab === "Display Types" && (
            <div>
              <div style={st.toolbar}><select style={st.select}><option>All Types</option><option>Charge</option></select><input style={st.input} placeholder="Search..." /></div>
              <table style={st.table}>
                <thead><tr><th style={st.th}>Display Type</th><th style={st.th}>Type</th><th style={st.th}>Restrict</th></tr></thead>
                <tbody>{["Standard Charge", "Late Fee", "Utility Charge", "Pet Fee"].map((d, i) => (
                  <tr key={i}><td style={st.td}>{d}</td><td style={st.td}><span style={st.pill}>Charge</span></td><td style={st.td}><input type="checkbox" /></td></tr>
                ))}</tbody>
              </table>
            </div>
          )}
          {tab === "Expense Type Restrictions" && (
            <div>
              {["Operating", "Capital", "Maintenance"].map((et, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" id={`et${i}`} />
                  <label htmlFor={`et${i}`} style={{ fontSize: 13 }}>{et}</label>
                </div>
              ))}
            </div>
          )}
          {tab === "Books" && (
            <div>
              {["Accrual (A)", "Cash (C)", "Tax (T)", "Budget (B)"].map((b, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", alignItems: "center", gap: 10 }}>
                  <input type="checkbox" defaultChecked={i < 2} />
                  <span style={{ fontSize: 13 }}>{b}</span>
                </div>
              ))}
            </div>
          )}
          {tab === "Voyager 7s Menus" && (
            <div style={{ color: c.textMuted, fontSize: 13, padding: 20, textAlign: "center" }}>No Voyager 7 menu items configured for this group.</div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── User Drawer ──────────────────────────────────────────────────────────────
function UserDrawer({ user, onClose }) {
  const [tab, setTab] = useState("Roles");
  const [roleSubTab, setRoleSubTab] = useState("Access");
  const [ehrOpen, setEhrOpen] = useState(true);
  const [ehrTab, setEhrTab] = useState("Login Setup");
  const [crmOpen, setCrmOpen] = useState(false);
  const [crmTab, setCrmTab] = useState("Roles");
  const [isSalesCounselor, setIsSalesCounselor] = useState(false);
  const [roleSearch, setRoleSearch] = useState("");
  const [selectedRoles, setSelectedRoles] = useState([0, 1, 2, 3, 4]);
  const [scSearch, setScSearch] = useState("");
  const tabs = ["Roles", "Details", "Settings", "Program Rights", "Regional Settings", "Page Access", "Element Access", "Voyager Access", "Voyager Plus Program Rights", "Senior"];

  const accessRoles = ["Administrator", "Accounting Manager", "Leasing Agent", "Property Manager"];
  const noAccessRoles = ["Maintenance Tech", "Read Only", "Vendor Portal"];

  return (
    <>
      <div style={st.overlay} onClick={onClose} />
      <div style={st.drawer}>
        <div style={st.drawerHeader}>
          <div>
            <div style={st.drawerTitle}>{user.name} ({user.username})</div>
            <div style={{ fontSize: 12, color: c.textMuted, marginTop: 2 }}>{user.email} · <StatusBadge status={user.status} /></div>
          </div>
          <CloseBtn onClick={onClose} />
        </div>
        <div style={st.drawerTabBar}>
          {tabs.map(t => (
            <div key={t} style={{ ...st.drawerTab, ...(tab === t ? st.drawerTabActive : {}) }} onClick={() => setTab(t)}>{t}</div>
          ))}
        </div>
        <div style={st.drawerContent}>
          {tab === "Roles" && (
            <div>
              <div style={{ display: "flex", gap: 0, marginBottom: 16, borderBottom: `1px solid ${c.border}` }}>
                {["Access", "No Access"].map(s => (
                  <div key={s} style={{ ...st.drawerTab, ...(roleSubTab === s ? st.drawerTabActive : {}) }} onClick={() => setRoleSubTab(s)}>{s}</div>
                ))}
              </div>
              {(roleSubTab === "Access" ? accessRoles : noAccessRoles).map((r, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13 }}>{r}</span>
                  <button style={st.btnSmall}>{roleSubTab === "Access" ? "Remove" : "Add"}</button>
                </div>
              ))}
            </div>
          )}
          {tab === "Details" && (
            <div style={{ display: "flex", gap: 20 }}>
              <div style={{ flex: 2 }}>
                <div style={st.formRow}>
                  <div style={st.formGroup}><label style={st.label}>First Name</label><input style={st.inputFull} defaultValue={user.name.split(" ")[0]} /></div>
                  <div style={st.formGroup}><label style={st.label}>Last Name</label><input style={st.inputFull} defaultValue={user.name.split(" ")[1]} /></div>
                </div>
                <div style={st.formRow}>
                  <div style={st.formGroup}><label style={st.label}>Email</label><input style={st.inputFull} defaultValue={user.email} /></div>
                </div>
                <div style={st.formRow}>
                  <div style={st.formGroup}><label style={st.label}>Username</label><input style={st.inputFull} defaultValue={user.username} /></div>
                  <div style={st.formGroup}><label style={st.label}>Security Group</label><select style={{ ...st.inputFull }}><option>{user.group}</option></select></div>
                </div>
                <div style={st.formRow}>
                  <div style={st.formGroup}><label style={st.label}>Phone</label><input style={st.inputFull} placeholder="555-555-5555" /></div>
                  <div style={st.formGroup}><label style={st.label}>Title</label><input style={st.inputFull} placeholder="Job Title" /></div>
                </div>
              </div>
              <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ border: `1px solid ${c.border}`, borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 8, color: c.textMuted }}>STATUS</div>
                  <StatusBadge status={user.status} />
                  <div style={{ marginTop: 10 }}><button style={st.btnSmall}>Reset Password</button></div>
                </div>
                <div style={{ border: `1px solid ${c.border}`, borderRadius: 6, padding: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, marginBottom: 6, color: c.textMuted }}>LAST LOGIN</div>
                  <div style={{ fontSize: 13 }}>{user.lastLogin}</div>
                </div>
              </div>
            </div>
          )}
          {tab === "Settings" && (
            <div>
              {[["Default Property", "Select..."], ["Default Property List", "Select..."], ["Default Book", "Accrual (A)"], ["Default Period", "Current"]].map(([lbl, def], i) => (
                <div key={i} style={st.formRow}>
                  <div style={st.formGroup}><label style={st.label}>{lbl}</label><select style={st.inputFull}><option>{def}</option></select></div>
                </div>
              ))}
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={{ display: "flex", gap: 8, alignItems: "center", fontSize: 13 }}><input type="checkbox" /> Require property security on all searches</label></div>
              </div>
            </div>
          )}
          {tab === "Program Rights" && (
            <div>
              {["Accounts Payable", "Accounts Receivable", "General Ledger", "Leasing", "Maintenance", "Purchasing"].map((m, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13 }}>{m}</span>
                  <select style={st.select}><option>Full Access</option><option>Read Only</option><option>No Access</option></select>
                </div>
              ))}
            </div>
          )}
          {tab === "Regional Settings" && (
            <div>
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={st.label}>Date Format</label><select style={st.inputFull}><option>MM/DD/YYYY</option><option>DD/MM/YYYY</option></select></div>
                <div style={st.formGroup}><label style={st.label}>Number Format</label><select style={st.inputFull}><option>1,234.56</option><option>1.234,56</option></select></div>
              </div>
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={st.label}>Currency</label><select style={st.inputFull}><option>USD ($)</option><option>EUR (€)</option></select></div>
                <div style={st.formGroup}><label style={st.label}>Language</label><select style={st.inputFull}><option>English</option><option>Spanish</option></select></div>
              </div>
            </div>
          )}
          {tab === "Page Access" && (
            <div>
              <input style={{ ...st.input, marginBottom: 12, width: "100%", boxSizing: "border-box" }} placeholder="Search pages..." />
              {["Dashboard", "Residents", "Leasing", "Accounts Receivable", "Accounts Payable", "General Ledger", "Maintenance", "Reports"].map((p, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 13 }}>{p}</span>
                  <select style={st.select}><option>Allow</option><option>Deny</option></select>
                </div>
              ))}
            </div>
          )}
          {tab === "Element Access" && (
            <div style={{ color: c.textMuted, fontSize: 13, padding: 20, textAlign: "center" }}>Element-level access overrides are configured per page. Select a page to view elements.</div>
          )}
          {tab === "Voyager Access" && (
            <div>
              {["Voyager Residential", "Voyager Commercial", "Voyager PHA", "Voyager Senior"].map((v, i) => (
                <div key={i} style={{ padding: "10px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13 }}>{v}</span>
                  <label style={{ display: "flex", alignItems: "center", gap: 6 }}><input type="checkbox" defaultChecked={i === 0} /> Enabled</label>
                </div>
              ))}
            </div>
          )}
          {tab === "Voyager Plus Program Rights" && (() => {
            const vpRights = [
              "Residential Leasing Pad", "SFH Leasing Pad", "Cash Management",
              "Commercial Leasing Pad", "Concierge Plus", "Energy",
              "Orion BI", "LOBOS FDD", "Condo CRM Plus",
              "EHRX", "P2P Plus", "RENTCafe CRM (International)",
              "Investor Plus", "Facilities Manager", "EnergyTStat",
              "Data Aggregation Services", "Student Leasing Pad", "RentCafe EDocs",
              "Senior CRM", "Yes Plus", "Unit Sales CRM",
              "Compliance Manager", "Orion Document Management", "Claims Manager",
              "Construction Management", "Admin Utilities",
            ];
            const cols = [vpRights.filter((_, i) => i % 3 === 0), vpRights.filter((_, i) => i % 3 === 1), vpRights.filter((_, i) => i % 3 === 2)];
            return (
              <div style={{ display: "flex", gap: 0 }}>
                {cols.map((col, ci) => (
                  <div key={ci} style={{ flex: 1 }}>
                    {col.map(name => (
                      <div key={name} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 10px", borderBottom: `1px solid ${c.borderLight}`, fontSize: 13 }}>
                        <span>{name}</span>
                        <input type="checkbox" />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
            );
          })()}
          {tab === "Senior" && (
            <div>
              {/* Basic Information */}
              <div style={st.sectionTitle}>Basic Information</div>
              <div style={st.formRow}>
                <div style={st.formGroup}>
                  <label style={st.label}>Initials <span style={{ color: c.danger }}>*</span></label>
                  <input style={st.inputFull} placeholder="e.g. KAB" maxLength={3} />
                </div>
                <div style={st.formGroup}>
                  <label style={st.label}>4 Character PIN <span style={{ color: c.danger }}>*</span></label>
                  <input style={st.inputFull} type="password" placeholder="••••" maxLength={4} />
                </div>
              </div>
              <div style={st.formRow}>
                <div style={st.formGroup}>
                  <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                    <input type="checkbox" />
                    <span>Force PIN Reset</span>
                  </label>
                  <div style={{ fontSize: 12, color: c.textMuted, marginTop: 4 }}>Require user to set a new PIN on next login</div>
                </div>
              </div>

              {/* EHR Setup accordion */}
              <div style={{ marginTop: 24, border: `1px solid ${c.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div onClick={() => setEhrOpen(!ehrOpen)} style={{ background: ehrOpen ? c.primaryLight : "#f9fafb", borderBottom: ehrOpen ? `1px solid ${c.border}` : "none", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: ehrOpen ? c.primary : c.text }}>EHR Setup</span>
                  <span style={{ fontSize: 11, color: c.textMuted, transform: ehrOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>▼</span>
                </div>

                {ehrOpen && (
                  <div>
                    {/* EHR sub-tabs */}
                    <div style={{ borderBottom: `1px solid ${c.border}`, display: "flex", padding: "0 16px", background: "#fafafa", flexWrap: "wrap" }}>
                      {["Login Setup", "Discipline", "Shift", "Zone"].map(t => (
                        <div key={t} style={{ ...st.drawerTab, ...(ehrTab === t ? st.drawerTabActive : {}) }} onClick={() => setEhrTab(t)}>{t}</div>
                      ))}
                    </div>

                    <div style={{ padding: 16 }}>

                      {/* Login Setup */}
                      {ehrTab === "Login Setup" && (
                        <div style={{ maxWidth: 480 }}>
                          <div style={st.formRow}>
                            <div style={st.formGroup}>
                              <label style={st.label}>Global Contact</label>
                              <select style={st.inputFull}><option>choose...</option></select>
                            </div>
                          </div>
                          <div style={st.formRow}>
                            <div style={st.formGroup}>
                              <label style={st.label}>EHR Title</label>
                              <select style={st.inputFull}><option>choose...</option></select>
                            </div>
                          </div>
                          <div style={st.formRow}>
                            <div style={st.formGroup}>
                              <label style={st.label}>EHR Certification</label>
                              <select style={st.inputFull}><option>choose...</option></select>
                            </div>
                          </div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingTop: 4 }}>
                            <label style={{ ...st.label, marginBottom: 0 }}>Allow EHR Login</label>
                            <Toggle defaultChecked={true} />
                          </div>
                        </div>
                      )}

                      {/* Discipline */}
                      {ehrTab === "Discipline" && (
                        <div>
                          <div style={{ ...st.toolbar, marginBottom: 12 }}>
                            <input style={st.input} placeholder="Search disciplines..." />
                          </div>
                          <table style={st.table}>
                            <thead><tr>
                              <th style={st.th}></th>
                              <th style={st.th}>Discipline</th>
                              <th style={st.th}>Code</th>
                            </tr></thead>
                            <tbody>
                              {[
                                ["CNA", "Certified Nursing Assistant", true],
                                ["RN",  "Registered Nurse",            true],
                                ["LPN", "Licensed Practical Nurse",    false],
                                ["PT",  "Physical Therapist",          false],
                                ["OT",  "Occupational Therapist",      false],
                                ["SLP", "Speech-Language Pathologist", false],
                                ["ACT", "Activities",                  false],
                                ["DET", "Dietary",                     false],
                                ["SS",  "Social Services",             false],
                                ["ADM", "Administrative",              false],
                              ].map(([code, name, checked]) => (
                                <tr key={code}>
                                  <td style={st.td}><input type="checkbox" defaultChecked={checked} /></td>
                                  <td style={st.td}>{name}</td>
                                  <td style={st.td}><span style={st.pill}>{code}</span></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Shift */}
                      {ehrTab === "Shift" && (
                        <div>
                          <div style={{ background: c.primaryLight, border: `1px solid #bfdbfe`, borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
                            Shifts must be selected in order for the user to view residents. For ySupport, set this to <strong>All Shifts</strong>. The client sets this based on the user's work schedule.
                          </div>
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 8 }}>Allow access to</div>
                            <div style={{ display: "flex", gap: 20 }}>
                              {["All shifts", "Specified shifts"].map(opt => (
                                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                                  <input type="radio" name="shiftAccess" defaultChecked={opt === "All shifts"} /> {opt}
                                </label>
                              ))}
                            </div>
                          </div>
                          <table style={st.table}>
                            <thead><tr>
                              <th style={st.th}>Name</th>
                              <th style={st.th}>Selected</th>
                              <th style={st.th}>Primary</th>
                            </tr></thead>
                            <tbody>
                              {[["Day Shift (7–12)", true, false], ["Morning", true, false], ["Evening (3–9)", true, false]].map(([name, sel, primary]) => (
                                <tr key={name}>
                                  <td style={st.td}>{name}</td>
                                  <td style={st.td}><Toggle defaultChecked={sel} /></td>
                                  <td style={st.td}><Toggle defaultChecked={primary} /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                      {/* Zone */}
                      {ehrTab === "Zone" && (
                        <div>
                          <div style={{ background: c.primaryLight, border: `1px solid #bfdbfe`, borderRadius: 6, padding: "10px 14px", marginBottom: 16, fontSize: 13, color: "#1e40af" }}>
                            Zones must be selected in order for the user to view residents. For ySupport, set this to <strong>All Zones</strong>. The client sets this based on the user's responsibility area.
                          </div>
                          <div style={{ marginBottom: 14 }}>
                            <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 8 }}>Allow access to</div>
                            <div style={{ display: "flex", gap: 20 }}>
                              {["All zones", "Specified zones"].map(opt => (
                                <label key={opt} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, cursor: "pointer" }}>
                                  <input type="radio" name="zoneAccess" defaultChecked={opt === "All zones"} /> {opt}
                                </label>
                              ))}
                            </div>
                          </div>
                          <table style={st.table}>
                            <thead><tr>
                              <th style={st.th}>Name</th>
                              <th style={st.th}>Community</th>
                              <th style={st.th}>Selected</th>
                            </tr></thead>
                            <tbody>
                              {[["Zone A", "Sunrise Gardens", true], ["Zone B", "Sunrise Gardens", true], ["Zone C", "Maple Creek", true]].map(([name, community, sel]) => (
                                <tr key={name}>
                                  <td style={st.td}>{name}</td>
                                  <td style={st.td}>{community}</td>
                                  <td style={st.td}><Toggle defaultChecked={sel} /></td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>

              {/* CRM Setup accordion */}
              <div style={{ marginTop: 16, border: `1px solid ${c.border}`, borderRadius: 8, overflow: "hidden" }}>
                <div onClick={() => setCrmOpen(!crmOpen)} style={{ background: crmOpen ? c.primaryLight : "#f9fafb", borderBottom: crmOpen ? `1px solid ${c.border}` : "none", padding: "12px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                  <span style={{ fontSize: 14, fontWeight: 600, color: crmOpen ? c.primary : c.text }}>CRM Setup</span>
                  <span style={{ fontSize: 11, color: c.textMuted, transform: crmOpen ? "rotate(180deg)" : "none", display: "inline-block", transition: "transform 0.2s" }}>▼</span>
                </div>

                {crmOpen && (
                  <div>
                    {/* CRM sub-tabs */}
                    <div style={{ borderBottom: `1px solid ${c.border}`, display: "flex", padding: "0 16px", background: "#fafafa" }}>
                      {["Roles", "Sales Counselor"].map(t => (
                        <div key={t} style={{ ...st.drawerTab, ...(crmTab === t ? st.drawerTabActive : {}) }} onClick={() => setCrmTab(t)}>{t}</div>
                      ))}
                    </div>

                    <div style={{ padding: 16 }}>

                      {/* Roles */}
                      {crmTab === "Roles" && (
                        <div>
                          {(() => {
                            const crmRoles = [
                              "CRM Activity Role - Executive Director",
                              "Incentive Approver - Incentive Approver",
                              "Proposal Approver - Corporate",
                              "Proposal Approver - Executive Director",
                              "Proposal Approver - Regional Vice President",
                              "Proposal Approver - Sales Director",
                              "Sales Counselor",
                              "Leasing Manager",
                              "Outreach Coordinator",
                            ];
                            const filtered = crmRoles.filter(r => r.toLowerCase().includes(roleSearch.toLowerCase()));
                            const toggleRole = i => setSelectedRoles(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i]);
                            return (
                              <>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                  <span style={{ fontSize: 13, color: c.textMuted }}>{selectedRoles.length} item{selectedRoles.length !== 1 ? "s" : ""} selected</span>
                                  <input style={{ ...st.input, width: 200 }} placeholder="Search..." value={roleSearch} onChange={e => setRoleSearch(e.target.value)} />
                                </div>
                                <table style={st.table}>
                                  <thead><tr>
                                    <th style={st.th}></th>
                                    <th style={st.th}>Role</th>
                                  </tr></thead>
                                  <tbody>
                                    {filtered.map(role => {
                                      const origIdx = crmRoles.indexOf(role);
                                      const checked = selectedRoles.includes(origIdx);
                                      return (
                                        <tr key={role} style={{ background: checked ? c.primaryLight : "transparent" }}>
                                          <td style={{ ...st.td, width: 40 }}>
                                            <input type="checkbox" checked={checked} onChange={() => toggleRole(origIdx)} />
                                          </td>
                                          <td style={{ ...st.td, fontSize: 13 }}>{role}</td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </>
                            );
                          })()}
                        </div>
                      )}

                      {/* Sales Counselor */}
                      {crmTab === "Sales Counselor" && (
                        <div>
                          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
                            <label style={{ ...st.label, marginBottom: 0 }}>Is Sales Counselor</label>
                            <Toggle defaultChecked={isSalesCounselor} onChange={v => setIsSalesCounselor(v)} />
                          </div>
                          {isSalesCounselor && (() => {
                            const filtered = archivedProperties.filter(p =>
                              p.name.toLowerCase().includes(scSearch.toLowerCase()) ||
                              p.code.toLowerCase().includes(scSearch.toLowerCase())
                            );
                            return (
                              <>
                                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                                  <span style={{ fontSize: 13, color: c.textMuted }}>{filtered.length} propert{filtered.length !== 1 ? "ies" : "y"}</span>
                                  <input style={{ ...st.input, width: 220 }} placeholder="Search properties..." value={scSearch} onChange={e => setScSearch(e.target.value)} />
                                </div>
                                <table style={st.table}>
                                  <thead><tr>
                                    <th style={st.th}>Community</th>
                                    <th style={st.th}>Code</th>
                                    <th style={st.th}>Inactive Date</th>
                                  </tr></thead>
                                  <tbody>
                                    {filtered.map(p => (
                                      <tr key={p.id}>
                                        <td style={{ ...st.td, fontSize: 13 }}>{p.name}</td>
                                        <td style={st.td}><span style={st.pill}>{p.code}</span></td>
                                        <td style={st.td}><input type="date" style={{ ...st.input, padding: "4px 8px", fontSize: 12 }} /></td>
                                      </tr>
                                    ))}
                                  </tbody>
                                </table>
                              </>
                            );
                          })()}
                          {!isSalesCounselor && (
                            <div style={{ fontSize: 13, color: c.textMuted, padding: "8px 0" }}>
                              Enable "Is Sales Counselor" to configure community assignments.
                            </div>
                          )}
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>

              <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end", gap: 10 }}>
                <button style={st.btnOutline} onClick={onClose}>Cancel</button>
                <button style={st.btn}>Save</button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ─── Reports Tab ──────────────────────────────────────────────────────────────
function ReportsTab() {
  const [search, setSearch] = useState("");
  const [menuFilter, setMenuFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const [selected, setSelected] = useState([]);
  const [drillReport, setDrillReport] = useState(null);
  const [showAssignModal, setShowAssignModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [assignStep, setAssignStep] = useState(1);
  const [toast, setToast] = useState(false);

  const filtered = reports.filter(r =>
    (menuFilter === "All" || r.menu === menuFilter) &&
    (typeFilter === "All" || r.type === typeFilter) &&
    r.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleSel = id => setSelected(p => p.includes(id) ? p.filter(x => x !== id) : [...p, id]);

  const handleAssignConfirm = () => {
    setShowAssignModal(false);
    setAssignStep(1);
    setSelected([]);
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  return (
    <div>
      {toast && (
        <div style={{ position: "fixed", bottom: 16, right: 16, background: c.success, color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 200, fontSize: 13, fontWeight: 500 }}>
          ✓ Roles assigned successfully
        </div>
      )}
      <div style={st.toolbar}>
        <input style={st.input} placeholder="Search reports..." value={search} onChange={e => setSearch(e.target.value)} />
        <select style={st.select} value={menuFilter} onChange={e => setMenuFilter(e.target.value)}>
          <option>All</option><option>Financials</option><option>Leasing</option><option>Operations</option>
        </select>
        <select style={st.select} value={typeFilter} onChange={e => setTypeFilter(e.target.value)}>
          <option>All</option><option>SQL</option><option>YSR</option>
        </select>
        <div style={{ flex: 1 }} />
        {selected.length > 0 && (
          <button style={st.btn} onClick={() => setShowAssignModal(true)}>Assign to Roles ({selected.length})</button>
        )}
        <button style={st.btn} onClick={() => setShowAddModal(true)}>+ Add Report</button>
      </div>
      <table style={st.table}>
        <thead><tr>
          <th style={st.th}><input type="checkbox" onChange={e => setSelected(e.target.checked ? filtered.map(r => r.id) : [])} /></th>
          <th style={st.th}>Report Name</th><th style={st.th}>Type</th><th style={st.th}>Menu</th><th style={st.th}>Roles</th>
        </tr></thead>
        <tbody>{filtered.map(r => (
          <tr key={r.id}>
            <td style={st.td}><input type="checkbox" checked={selected.includes(r.id)} onChange={() => toggleSel(r.id)} /></td>
            <td style={{ ...st.td, color: c.primary, fontWeight: 500, cursor: "pointer" }} onClick={() => setDrillReport(r)}>{r.name}</td>
            <td style={st.td}><TypeBadge type={r.type} /></td>
            <td style={st.td}><span style={st.pill}>{r.menu}</span></td>
            <td style={st.td}>
              <span style={{ ...st.badge(c.success, c.successBg), cursor: "pointer" }} onClick={() => setDrillReport(r)}>{r.roles}</span>
            </td>
          </tr>
        ))}</tbody>
      </table>

      {/* Role Drill-Down Panel */}
      {drillReport && (
        <>
          <div style={st.overlay} onClick={() => setDrillReport(null)} />
          <div style={{ ...st.drawer, width: 420 }}>
            <div style={st.drawerHeader}>
              <div><div style={st.drawerTitle}>{drillReport.name}</div><div style={{ fontSize: 12, color: c.textMuted }}><TypeBadge type={drillReport.type} /> · {drillReport.menu}</div></div>
              <CloseBtn onClick={() => setDrillReport(null)} />
            </div>
            <div style={st.drawerContent}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 10 }}>ASSIGNED ROLES ({drillReport.roles})</div>
              {Array.from({ length: drillReport.roles }, (_, i) => (
                <div key={i} style={{ padding: "8px 0", borderBottom: `1px solid ${c.borderLight}`, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span style={{ fontSize: 13 }}>Role {i + 1}</span>
                  <button style={st.btnSmall}>Remove</button>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Assign to Roles Modal */}
      {showAssignModal && (
        <>
          <div style={{ ...st.overlay, zIndex: 105 }} />
          <div style={st.modal}>
            <div style={st.modalHeader}>
              <div style={{ fontWeight: 600 }}>Assign to Roles — Step {assignStep} of 2</div>
              <CloseBtn onClick={() => { setShowAssignModal(false); setAssignStep(1); }} />
            </div>
            <div style={st.modalBody}>
              {assignStep === 1 && (
                <div>
                  <div style={{ fontSize: 13, marginBottom: 12, color: c.textMuted }}>Select roles to assign the {selected.length} selected report(s) to:</div>
                  {groups.map(g => (
                    <label key={g.id} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 0", borderBottom: `1px solid ${c.borderLight}`, fontSize: 13 }}>
                      <input type="checkbox" /> {g.code} — {g.description}
                    </label>
                  ))}
                </div>
              )}
              {assignStep === 2 && (
                <div>
                  <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 12 }}>Confirm assigning {selected.length} report(s) to selected roles?</div>
                  <div style={{ background: c.successBg, border: `1px solid ${c.successBorder}`, borderRadius: 6, padding: 12, fontSize: 13 }}>
                    This will grant access to the selected reports for all users in the chosen roles.
                  </div>
                </div>
              )}
            </div>
            <div style={st.modalFooter}>
              <button style={st.btnOutline} onClick={() => assignStep === 1 ? setShowAssignModal(false) : setAssignStep(1)}>
                {assignStep === 1 ? "Cancel" : "Back"}
              </button>
              <button style={st.btn} onClick={() => assignStep === 1 ? setAssignStep(2) : handleAssignConfirm()}>
                {assignStep === 1 ? "Next →" : "Confirm"}
              </button>
            </div>
          </div>
        </>
      )}

      {/* Add Report Modal */}
      {showAddModal && (
        <>
          <div style={{ ...st.overlay, zIndex: 105 }} />
          <div style={{ ...st.modal, width: 640 }}>
            <div style={st.modalHeader}>
              <div style={{ fontWeight: 600 }}>Add Report</div>
              <CloseBtn onClick={() => setShowAddModal(false)} />
            </div>
            <div style={st.modalBody}>
              <div style={st.formRow}>
                <div style={st.formGroup}><label style={st.label}>Report Name</label><input style={st.inputFull} placeholder="Report name" /></div>
                <div style={st.formGroup}><label style={st.label}>Menu</label><select style={st.inputFull}><option>Financials</option><option>Leasing</option><option>Operations</option></select></div>
              </div>
              <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
                <div style={{ flex: 1, border: `2px dashed ${c.border}`, borderRadius: 8, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6 }}>SQL Report</div>
                  <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 10 }}>Upload .txt or .sql file</div>
                  <button style={st.btnOutline}>Browse File</button>
                </div>
                <div style={{ flex: 1, border: `2px dashed ${c.amber}`, borderRadius: 8, padding: 20, textAlign: "center" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 6, color: c.amber }}>YSR Report</div>
                  <div style={{ fontSize: 12, color: c.textMuted, marginBottom: 4 }}>Upload .pkg file</div>
                  <div style={{ fontSize: 11, color: c.warning, marginBottom: 8 }}>⚠ YSR packages include templates</div>
                  <button style={{ ...st.btnOutline, borderColor: c.amber, color: c.amber }}>Browse .pkg</button>
                </div>
              </div>
            </div>
            <div style={st.modalFooter}>
              <button style={st.btnOutline} onClick={() => setShowAddModal(false)}>Cancel</button>
              <button style={st.btn}>Add Report</button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Permissions Tab (Top-Level — mirrors Security Group drawer Permissions tab) ──
const topLevelPermRows = [
  { desc: "1098: Electronic File Generation for 1098", access: "Read & Write", type: "Core" },
  { desc: "1099: Combined Federal/State Filing Setup", access: "Read & Write", type: "Core" },
  { desc: "1099: Software Supplier Information", access: "Read", type: "Core" },
  { desc: "1toMany-Add", access: "Access", type: "Core" },
  { desc: "1toMany-Delete", access: "Access", type: "Core" },
  { desc: "50058 Override Maximum Occupancy Standard", access: "Access", type: "PHA" },
  { desc: "50058 Override Minimum Occupancy Standard", access: "No Access", type: "PHA" },
  { desc: "50058 Override TTP Baseline", access: "No Access", type: "PHA" },
  { desc: "58 All Cond - SSRS Report", access: "No Access", type: "PHA" },
  { desc: "58 All Full Report", access: "No Access", type: "PHA" },
  { desc: "Account Tree - Edit", access: "Access", type: "Core" },
  { desc: "Account Tree - View", access: "Access", type: "Core" },
  { desc: "Aged Receivables Report", access: "Read", type: "Adhoc" },
  { desc: "Approve Vendor Invoices", access: "Read & Write", type: "Core" },
  { desc: "Budget Entry", access: "Access", type: "Core" },
  { desc: "Charge Resident", access: "Read & Write", type: "Core" },
  { desc: "GL Batch Post", access: "No Access", type: "Core" },
  { desc: "Lease Approval", access: "Access", type: "Core" },
  { desc: "Move In", access: "Access", type: "Core" },
  { desc: "Move Out", access: "Access", type: "Core" },
  { desc: "NSF Processing", access: "No Access", type: "Core" },
  { desc: "PHA Inspection Entry", access: "No Access", type: "PHA" },
  { desc: "Prospect - Add", access: "Access", type: "Core" },
  { desc: "Reports - Run Ad Hoc", access: "Read", type: "Adhoc" },
  { desc: "Vendor Setup", access: "No Access", type: "Core" },
  { desc: "Void Payment", access: "No Access", type: "Core" },
  { desc: "Work Order - Close", access: "Access", type: "Core" },
  { desc: "Work Order - Create", access: "Access", type: "Core" },
];

function BulkPermissionsStepper({ onBack }) {
  const [step, setStep] = useState(1);
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [action, setAction] = useState("grant");
  const [done, setDone] = useState(false);

  const toggleGroup = g => setSelectedGroups(prev => prev.includes(g) ? prev.filter(x => x !== g) : [...prev, g]);

  const handleApply = () => setDone(true);

  const StepIndicator = () => (
    <div style={{ display: "flex", alignItems: "center", marginBottom: 24, background: c.surface, borderRadius: 8, padding: "14px 20px", border: `1px solid ${c.border}` }}>
      {[1, 2, 3].map((s, i) => (
        <div key={s} style={{ display: "flex", alignItems: "center", flex: s < 3 ? 1 : undefined }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: step >= s ? c.primary : "#e5e7eb", color: step >= s ? "#fff" : c.textMuted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600 }}>{s}</div>
            <span style={{ fontSize: 13, fontWeight: step === s ? 600 : 400, color: step === s ? c.text : c.textMuted }}>
              {["Select Permissions", "Select Groups", "Review & Apply"][i]}
            </span>
          </div>
          {s < 3 && <div style={{ flex: 1, height: 2, background: step > s ? c.primary : "#e5e7eb", margin: "0 16px" }} />}
        </div>
      ))}
    </div>
  );

  if (done) return (
    <div style={{ background: c.surface, borderRadius: 6, border: `1px solid ${c.border}`, padding: 40, textAlign: "center" }}>
      <div style={{ fontSize: 40, marginBottom: 12 }}>✓</div>
      <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 8 }}>
        Permissions {action === "grant" ? "granted" : "revoked"} successfully
      </div>
      <div style={{ fontSize: 13, color: c.textMuted, marginBottom: 24 }}>
        {selectedPerms.length} permission(s) {action === "grant" ? "granted to" : "revoked from"} {selectedGroups.length} group(s)
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <button style={st.btnOutline} onClick={onBack}>← Back to Permissions</button>
        <button style={st.btn} onClick={() => { setStep(1); setSelectedPerms([]); setSelectedGroups([]); setAction("grant"); setDone(false); }}>
          New Bulk Operation
        </button>
      </div>
    </div>
  );

  return (
    <div style={{ background: c.surface, borderRadius: 6, border: `1px solid ${c.border}`, padding: 20 }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <button onClick={onBack} style={{ background: "none", border: "none", cursor: "pointer", color: c.primary, fontSize: 13, padding: 0, display: "flex", alignItems: "center", gap: 4 }}>
            ← Back to Permissions
          </button>
          <span style={{ color: c.border }}>|</span>
          <span style={{ fontSize: 14, fontWeight: 600 }}>Bulk Permission Edit</span>
        </div>
      </div>

      <StepIndicator />

      {/* Step 1 — Select Permissions */}
      {step === 1 && (
        <div>
          {selectedPerms.length > 0 && (
            <div style={{ marginBottom: 14, display: "flex", flexWrap: "wrap", gap: 6 }}>
              {selectedPerms.map(p => (
                <span key={p} style={{ background: c.primaryLight, color: c.primary, borderRadius: 14, padding: "3px 10px", fontSize: 12, display: "flex", alignItems: "center", gap: 6 }}>
                  {p} <span style={{ cursor: "pointer", fontWeight: 700 }} onClick={() => setSelectedPerms(prev => prev.filter(x => x !== p))}>×</span>
                </span>
              ))}
            </div>
          )}
          <input style={{ ...st.input, marginBottom: 16, width: 280 }} placeholder="Search permissions..." />
          {permissionCategories.map(cat => (
            <div key={cat.cat} style={{ marginBottom: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.05em" }}>{cat.cat}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {cat.items.map(item => {
                  const sel = selectedPerms.includes(item);
                  return (
                    <div key={item} onClick={() => setSelectedPerms(prev => sel ? prev.filter(x => x !== item) : [...prev, item])}
                      style={{ border: `1px solid ${sel ? c.primary : c.border}`, background: sel ? c.primaryLight : c.surface, color: sel ? c.primary : c.text, borderRadius: 4, padding: "6px 12px", fontSize: 13, cursor: "pointer" }}>
                      {item}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
          <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
            <button style={st.btn} onClick={() => setStep(2)} disabled={selectedPerms.length === 0}>
              Next: Select Groups →
            </button>
          </div>
        </div>
      )}

      {/* Step 2 — Select Groups */}
      {step === 2 && (
        <div>
          <input style={{ ...st.input, marginBottom: 16, width: 280 }} placeholder="Search security groups..." />
          <table style={st.table}>
            <thead><tr>
              <th style={st.th}></th><th style={st.th}>Group Code</th><th style={st.th}>Description</th><th style={st.th}>Members</th><th style={st.th}>Status</th>
            </tr></thead>
            <tbody>{groups.map(g => (
              <tr key={g.id}>
                <td style={st.td}><input type="checkbox" checked={selectedGroups.includes(g.id)} onChange={() => toggleGroup(g.id)} /></td>
                <td style={{ ...st.td, fontWeight: 500 }}>{g.code}</td>
                <td style={st.td}>{g.description}</td>
                <td style={st.td}><span style={st.badge(c.textMuted, "#f3f4f6")}>{g.users}</span></td>
                <td style={st.td}><StatusBadge status={g.status} /></td>
              </tr>
            ))}</tbody>
          </table>
          <div style={{ marginTop: 20, display: "flex", justifyContent: "space-between" }}>
            <button style={st.btnOutline} onClick={() => setStep(1)}>← Back</button>
            <button style={st.btn} onClick={() => setStep(3)} disabled={selectedGroups.length === 0}>
              Next: Review & Apply →
            </button>
          </div>
        </div>
      )}

      {/* Step 3 — Review & Apply */}
      {step === 3 && (
        <div>
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <div style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 10 }}>SELECTED PERMISSIONS ({selectedPerms.length})</div>
              {selectedPerms.map(p => <div key={p} style={{ fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${c.borderLight}` }}>{p}</div>)}
            </div>
            <div style={{ flex: 1, border: `1px solid ${c.border}`, borderRadius: 8, padding: 16 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: c.textMuted, marginBottom: 10 }}>SELECTED GROUPS ({selectedGroups.length})</div>
              {groups.filter(g => selectedGroups.includes(g.id)).map(g => (
                <div key={g.id} style={{ fontSize: 13, padding: "4px 0", borderBottom: `1px solid ${c.borderLight}` }}>{g.code} — {g.description}</div>
              ))}
            </div>
          </div>
          <div style={{ background: "#f9fafb", border: `1px solid ${c.border}`, borderRadius: 8, padding: 16, marginBottom: 20 }}>
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 12 }}>Action</div>
            <div style={{ display: "flex", gap: 12 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                <input type="radio" name="action" value="grant" checked={action === "grant"} onChange={() => setAction("grant")} />
                <span style={{ color: c.success, fontWeight: 600 }}>Grant Access</span>
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, cursor: "pointer" }}>
                <input type="radio" name="action" value="revoke" checked={action === "revoke"} onChange={() => setAction("revoke")} />
                <span style={{ color: c.danger, fontWeight: 600 }}>Revoke Access</span>
              </label>
            </div>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <button style={st.btnOutline} onClick={() => setStep(2)}>← Back</button>
            <button style={action === "revoke" ? st.btnDanger : st.btnSuccess} onClick={handleApply}>
              {action === "grant" ? "✓ Grant Access" : "✗ Revoke Access"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function PermissionsTab() {
  const [selectedPerms, setSelectedPerms] = useState([]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [search, setSearch] = useState("");
  const [groupSearch, setGroupSearch] = useState("");
  const [programTypeFilter, setProgramTypeFilter] = useState([]);
  const [accessFilter, setAccessFilter] = useState("All");
  const [expandedCategories, setExpandedCategories] = useState({});
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showQuickActionWarning, setShowQuickActionWarning] = useState(null);
  const [toast, setToast] = useState(null);

  // Group permissions by category (extracted from first part of description)
  const categorizedPerms = topLevelPermRows.reduce((acc, perm) => {
    const category = perm.desc.includes(":") ? perm.desc.split(":")[0] :
                     perm.desc.includes("-") ? perm.desc.split("-")[0].trim() :
                     "General";
    if (!acc[category]) acc[category] = [];
    acc[category].push(perm);
    return acc;
  }, {});

  // Get unique program types
  const programTypes = [...new Set(topLevelPermRows.map(p => p.type))];

  // Filter permissions
  const filterPerms = (perms) => perms.filter(p =>
    (programTypeFilter.length === 0 || programTypeFilter.includes(p.type)) &&
    (accessFilter === "All" || p.access === accessFilter) &&
    p.desc.toLowerCase().includes(search.toLowerCase())
  );

  // Toggle selection
  const togglePerm = (perm) => {
    setSelectedPerms(prev =>
      prev.find(p => p.desc === perm.desc)
        ? prev.filter(p => p.desc !== perm.desc)
        : [...prev, perm]
    );
  };

  const toggleGroup = (groupId) => {
    setSelectedGroups(prev =>
      prev.includes(groupId) ? prev.filter(id => id !== groupId) : [...prev, groupId]
    );
  };

  // Quick actions
  const handleQuickAction = (newAccess) => {
    setShowQuickActionWarning({ newAccess });
  };

  const confirmQuickAction = () => {
    const newAccess = showQuickActionWarning.newAccess;
    setSelectedPerms(prev => prev.map(p => ({ ...p, access: newAccess })));
    setShowQuickActionWarning(null);
    showToast(`${selectedPerms.length} permissions set to ${newAccess}`);
  };

  // Apply changes
  const handleApply = () => {
    setShowConfirmModal(true);
  };

  const confirmApply = () => {
    setShowConfirmModal(false);
    showToast(`Successfully applied ${selectedPerms.length} permission changes to ${selectedGroups.length} security groups`);
    setSelectedPerms([]);
    setSelectedGroups([]);
  };

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const totalUsers = groups.filter(g => selectedGroups.includes(g.id)).reduce((sum, g) => sum + g.users, 0);

  return (
    <div style={{ display: "flex", gap: 20, minHeight: "70vh" }}>
      {/* Toast */}
      {toast && (
        <div style={{ position: "fixed", bottom: 16, right: 16, background: c.success, color: "#fff", padding: "12px 20px", borderRadius: 8, zIndex: 200, fontSize: 13, fontWeight: 500, boxShadow: "0 4px 12px rgba(0,0,0,0.15)" }}>
          ✓ {toast}
        </div>
      )}

      {/* Quick Action Warning Modal */}
      {showQuickActionWarning && (
        <>
          <div style={st.overlay} onClick={() => setShowQuickActionWarning(null)} />
          <div style={st.modal}>
            <div style={st.modalHeader}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>⚠️ Confirm Quick Action</div>
              <CloseBtn onClick={() => setShowQuickActionWarning(null)} />
            </div>
            <div style={st.modalBody}>
              <p style={{ margin: 0, fontSize: 13, lineHeight: 1.6 }}>
                You are about to change <strong>{selectedPerms.length} selected permissions</strong> to <strong>{showQuickActionWarning.newAccess}</strong>.
              </p>
              <p style={{ margin: "12px 0 0 0", fontSize: 13, lineHeight: 1.6, color: c.textMuted }}>
                This will overwrite any individual access level changes you've made. Continue?
              </p>
            </div>
            <div style={st.modalFooter}>
              <button style={st.btnOutline} onClick={() => setShowQuickActionWarning(null)}>Cancel</button>
              <button style={st.btn} onClick={confirmQuickAction}>Yes, Set All to {showQuickActionWarning.newAccess}</button>
            </div>
          </div>
        </>
      )}

      {/* Confirm Apply Modal */}
      {showConfirmModal && (
        <>
          <div style={st.overlay} onClick={() => setShowConfirmModal(false)} />
          <div style={st.modal}>
            <div style={st.modalHeader}>
              <div style={{ fontSize: 15, fontWeight: 600 }}>Confirm Permission Changes</div>
              <CloseBtn onClick={() => setShowConfirmModal(false)} />
            </div>
            <div style={st.modalBody}>
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>You are about to apply:</div>
                <ul style={{ margin: 0, paddingLeft: 20, fontSize: 13, lineHeight: 1.8 }}>
                  <li><strong>{selectedPerms.length}</strong> permission changes</li>
                  <li>To <strong>{selectedGroups.length}</strong> security groups</li>
                  <li>Affecting <strong>{totalUsers}</strong> users</li>
                </ul>
              </div>
              <div style={{ background: c.amberBg, border: `1px solid ${c.warning}`, borderRadius: 6, padding: 12, fontSize: 12, marginBottom: 12 }}>
                <strong>⚠️ Warning:</strong> This will overwrite existing permissions for the selected groups.
              </div>
              <div style={{ background: c.primaryLight, border: `1px solid ${c.primary}`, borderRadius: 6, padding: 12, fontSize: 12 }}>
                <strong>ℹ️ Note:</strong> All permission changes will be logged in the <strong>Permissions Change Log</strong> within the Security Hub Analytics page for audit and compliance purposes.
              </div>
            </div>
            <div style={st.modalFooter}>
              <button style={st.btnOutline} onClick={() => setShowConfirmModal(false)}>Cancel</button>
              <button style={st.btn} onClick={confirmApply}>Apply Changes</button>
            </div>
          </div>
        </>
      )}

      {/* LEFT PANEL - Permissions */}
      <div style={{ flex: "0 0 60%", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Edit Permissions</div>

        {/* Filters & Search */}
        <div style={{ display: "flex", gap: 10, marginBottom: 16, flexWrap: "wrap" }}>
          <input
            style={{ ...st.input, flex: 1, minWidth: 200 }}
            placeholder="🔍 Search permissions..."
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          <select
            multiple
            style={{ ...st.select, width: 150 }}
            value={programTypeFilter}
            onChange={e => setProgramTypeFilter([...e.target.selectedOptions].map(o => o.value))}
          >
            <option value="" disabled>Program Type (multi)</option>
            {programTypes.map(type => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          <select style={st.select} value={accessFilter} onChange={e => setAccessFilter(e.target.value)}>
            <option>All</option>
            <option>Access</option>
            <option>Read & Write</option>
            <option>Read</option>
            <option>No Access</option>
          </select>
          {(programTypeFilter.length > 0 || accessFilter !== "All" || search) && (
            <button
              style={{ ...st.btnSmall, fontSize: 11 }}
              onClick={() => { setProgramTypeFilter([]); setAccessFilter("All"); setSearch(""); }}
            >
              Clear Filters
            </button>
          )}
        </div>

        {/* Quick Actions */}
        {selectedPerms.length > 0 && (
          <div style={{ background: c.primaryLight, border: `1px solid ${c.primary}`, borderRadius: 6, padding: 12, marginBottom: 16, display: "flex", alignItems: "center", gap: 12, flexWrap: "wrap" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: c.primary }}>{selectedPerms.length} selected</span>
            <div style={{ flex: 1, display: "flex", gap: 6, flexWrap: "wrap" }}>
              <button style={{ ...st.btnSmall, fontSize: 11 }} onClick={() => handleQuickAction("Access")}>Set to Access</button>
              <button style={{ ...st.btnSmall, fontSize: 11 }} onClick={() => handleQuickAction("Read & Write")}>Set to Read & Write</button>
              <button style={{ ...st.btnSmall, fontSize: 11 }} onClick={() => handleQuickAction("Read")}>Set to Read</button>
              <button style={{ ...st.btnSmall, fontSize: 11 }} onClick={() => handleQuickAction("No Access")}>Set to No Access</button>
            </div>
            <button style={{ ...st.btnSmall, fontSize: 11 }} onClick={() => setSelectedPerms([])}>Clear Selection</button>
          </div>
        )}

        {/* Permissions Table */}
        <div style={{ flex: 1, overflow: "auto", border: `1px solid ${c.border}`, borderRadius: 6 }}>
          <table style={{ ...st.table, border: "none" }}>
            <thead style={{ position: "sticky", top: 0, zIndex: 10 }}>
              <tr>
                <th style={{ ...st.th, width: 40 }}>
                  <input
                    type="checkbox"
                    checked={selectedPerms.length > 0 && selectedPerms.length === Object.values(categorizedPerms).flat().filter(p => filterPerms([p]).length > 0).length}
                    onChange={e => {
                      if (e.target.checked) {
                        setSelectedPerms(Object.values(categorizedPerms).flat().filter(p => filterPerms([p]).length > 0));
                      } else {
                        setSelectedPerms([]);
                      }
                    }}
                  />
                </th>
                <th style={{ ...st.th, textAlign: "left" }}>Description</th>
                <th style={{ ...st.th, width: 180 }}>Access</th>
                <th style={{ ...st.th, width: 100 }}>Program Type</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(categorizedPerms).map(([category, perms]) => {
                const filteredCatPerms = filterPerms(perms);
                if (filteredCatPerms.length === 0) return null;

                const isExpanded = expandedCategories[category] !== false; // default expanded

                return (
                  <React.Fragment key={category}>
                    <tr style={{ background: "#f9fafb", cursor: "pointer" }} onClick={() => setExpandedCategories(prev => ({ ...prev, [category]: !isExpanded }))}>
                      <td colSpan={4} style={{ ...st.td, fontWeight: 600, fontSize: 12, color: c.textMuted, textTransform: "uppercase", letterSpacing: "0.05em" }}>
                        <span style={{ display: "inline-block", marginRight: 8 }}>{isExpanded ? "▼" : "▶"}</span>
                        {category} ({filteredCatPerms.length})
                      </td>
                    </tr>
                    {isExpanded && filteredCatPerms.map(perm => {
                      const isSelected = selectedPerms.find(p => p.desc === perm.desc);
                      return (
                        <tr key={perm.desc} style={{ background: isSelected ? c.primaryLight : "transparent" }}>
                          <td style={st.td}>
                            <input
                              type="checkbox"
                              checked={!!isSelected}
                              onChange={() => togglePerm(perm)}
                            />
                          </td>
                          <td style={{ ...st.td, fontSize: 13 }}>{perm.desc}</td>
                          <td style={st.td}>
                            <select
                              style={{ ...st.select, padding: "4px 8px", fontSize: 12, width: "100%" }}
                              value={isSelected ? isSelected.access : perm.access}
                              onChange={e => {
                                const newAccess = e.target.value;
                                if (isSelected) {
                                  setSelectedPerms(prev => prev.map(p =>
                                    p.desc === perm.desc ? { ...p, access: newAccess } : p
                                  ));
                                } else {
                                  togglePerm({ ...perm, access: newAccess });
                                }
                              }}
                            >
                              <option>Access</option>
                              <option>Read & Write</option>
                              <option>Read</option>
                              <option>No Access</option>
                            </select>
                          </td>
                          <td style={st.td}>
                            <span style={{ fontSize: 11, color: c.textMuted }}>{perm.type}</span>
                          </td>
                        </tr>
                      );
                    })}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* RIGHT PANEL - Security Groups */}
      <div style={{ flex: "0 0 38%", background: c.surface, border: `1px solid ${c.border}`, borderRadius: 6, padding: 20, display: "flex", flexDirection: "column" }}>
        <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 16 }}>Apply to Security Groups</div>

        {/* Summary */}
        <div style={{ background: "#f9fafb", border: `1px solid ${c.border}`, borderRadius: 6, padding: 16, marginBottom: 16 }}>
          <div style={{ display: "flex", gap: 16 }}>
            {/* Left side - Summary stats */}
            <div style={{ flex: "0 0 45%" }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: c.textMuted }}>SUMMARY</div>
              <div style={{ fontSize: 13, lineHeight: 1.8 }}>
                <div><strong>{selectedPerms.length}</strong> permissions selected</div>
                <div><strong>{selectedGroups.length}</strong> groups selected</div>
                <div><strong>{totalUsers}</strong> users affected</div>
              </div>
            </div>

            {/* Right side - Affected Users */}
            {selectedGroups.length > 0 && (() => {
              const affectedUsers = users.filter(u => {
                const userGroup = groups.find(g => g.code === u.group);
                return userGroup && selectedGroups.includes(userGroup.id);
              });

              return (
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>AFFECTED USERS</div>
                  <div style={{ maxHeight: 120, overflow: "auto", border: `1px solid ${c.borderLight}`, borderRadius: 4, background: c.surface }}>
                    {affectedUsers.length === 0 ? (
                      <div style={{ padding: 12, fontSize: 11, color: c.textMuted, textAlign: "center" }}>No users in selected groups</div>
                    ) : (
                      affectedUsers.map(user => (
                        <div key={user.id} style={{ padding: "8px 10px", borderBottom: `1px solid ${c.borderLight}`, fontSize: 11 }}>
                          <div style={{ fontWeight: 600, marginBottom: 2 }}>{user.name}</div>
                          <div style={{ color: c.textMuted, fontSize: 10 }}>{user.email}</div>
                          <div style={{ display: "flex", gap: 6, marginTop: 3, alignItems: "center" }}>
                            <span style={{ fontSize: 10, color: c.textMuted }}>{user.group}</span>
                            <span>•</span>
                            <span style={{ ...st.badge(user.status === "Active" ? c.success : c.textMuted, user.status === "Active" ? c.successBg : "#f3f4f6"), fontSize: 9, padding: "1px 6px" }}>
                              {user.status}
                            </span>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })()}
          </div>

          {selectedPerms.length > 0 && (
            <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${c.border}` }}>
              <div style={{ fontSize: 11, fontWeight: 600, color: c.textMuted, marginBottom: 6 }}>CHANGES TO APPLY</div>
              <div style={{ maxHeight: 100, overflow: "auto", fontSize: 11, lineHeight: 1.6 }}>
                {selectedPerms.map(p => (
                  <div key={p.desc} style={{ marginBottom: 4 }}>
                    <span style={{ color: c.textMuted }}>{p.desc.substring(0, 30)}...</span>
                    <span style={{ fontWeight: 600, marginLeft: 4 }}>→ {p.access}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Apply Button */}
        <button
          style={{ ...st.btn, width: "100%", padding: "10px 14px", marginBottom: 16 }}
          disabled={selectedPerms.length === 0 || selectedGroups.length === 0}
          onClick={handleApply}
        >
          Apply to {selectedGroups.length} Group{selectedGroups.length !== 1 ? "s" : ""}
        </button>

        {/* Group Search */}
        <div style={{ marginBottom: 12 }}>
          <input
            style={{ ...st.input, width: "100%" }}
            placeholder="🔍 Search groups..."
            value={groupSearch}
            onChange={e => setGroupSearch(e.target.value)}
          />
        </div>

        {/* Select All/None */}
        <div style={{ marginBottom: 12, display: "flex", gap: 8 }}>
          <button style={st.btnSmall} onClick={() => setSelectedGroups(groups.filter(g =>
            g.code.toLowerCase().includes(groupSearch.toLowerCase()) ||
            g.description.toLowerCase().includes(groupSearch.toLowerCase())
          ).map(g => g.id))}>Select All</button>
          <button style={st.btnSmall} onClick={() => setSelectedGroups([])}>Deselect All</button>
        </div>

        {/* Groups List */}
        <div style={{ flex: 1, overflow: "auto" }}>
          {groups.filter(g =>
            g.code.toLowerCase().includes(groupSearch.toLowerCase()) ||
            g.description.toLowerCase().includes(groupSearch.toLowerCase())
          ).map(group => (
            <label
              key={group.id}
              style={{
                display: "flex",
                alignItems: "center",
                padding: "10px 12px",
                background: selectedGroups.includes(group.id) ? c.primaryLight : "transparent",
                border: `1px solid ${selectedGroups.includes(group.id) ? c.primary : c.borderLight}`,
                borderRadius: 6,
                marginBottom: 8,
                cursor: "pointer",
                transition: "all 0.15s"
              }}
            >
              <input
                type="checkbox"
                checked={selectedGroups.includes(group.id)}
                onChange={() => toggleGroup(group.id)}
                style={{ marginRight: 10 }}
              />
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 13 }}>{group.code}</div>
                <div style={{ fontSize: 12, color: c.textMuted }}>{group.description}</div>
              </div>
              <span style={st.badge(c.textMuted, "#f3f4f6")}>{group.users}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Main App ────────────────────────────────────────────────────────────────
export default function SecurityHub() {
  const [activeTab, setActiveTab] = useState("Security Groups");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);

  const tabs = ["Security Groups", "Users", "Roles", "Reports", "Permissions"];

  const filteredGroups = groups.filter(g =>
    (statusFilter === "All" || g.status === statusFilter) &&
    (g.code.toLowerCase().includes(search.toLowerCase()) || g.description.toLowerCase().includes(search.toLowerCase()))
  );
  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) || u.username.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={st.page}>
      {/* Nav */}
      <div style={st.nav}>
        <span style={st.navLogo}>Voyager 8</span>
        {["Dashboard", "Residents", "Leasing", "Financials", "Maintenance", "Admin"].map(n => (
          <span key={n} style={n === "Admin" ? { ...st.navItem, ...st.navItemActive } : st.navItem}>{n}</span>
        ))}
      </div>

      {/* Page Header */}
      <div style={st.pageHeader}>
        <div style={{ width: 40, height: 40, borderRadius: 8, background: "#eff6ff", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
          <Shield size={20} color="#2563eb" />
        </div>
        <div>
          <div style={st.pageTitle}>Security Hub</div>
          <div style={st.pageSubtitle}>Manage security groups and user access • Ctrl+S to save • Esc to close</div>
        </div>
      </div>

      {/* Tab Bar */}
      <div style={st.tabBar}>
        {tabs.map(t => (
          <div key={t} style={{ ...st.tab, ...(activeTab === t ? st.tabActive : {}) }} onClick={() => { setActiveTab(t); setSearch(""); setStatusFilter("All"); }}>{t}</div>
        ))}
      </div>

      {/* Tab Content */}
      <div style={st.content}>
        {activeTab === "Security Groups" && (
          <div>
            <div style={st.toolbarStrip}>
              <input style={st.input} placeholder="Search groups..." value={search} onChange={e => setSearch(e.target.value)} />
              <select style={st.select} value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
                <option>All</option><option>Active</option><option>Inactive</option>
              </select>
              <div style={{ flex: 1 }} />
              <button style={st.btn}>+ New Group</button>
            </div>
            <table style={st.table}>
              <thead><tr>
                <th style={st.th}>Code</th><th style={st.th}>Description</th><th style={st.th}>Users</th><th style={st.th}>Status</th><th style={st.th}></th>
              </tr></thead>
              <tbody>{filteredGroups.map(g => (
                <tr key={g.id}>
                  <td style={{ ...st.td, color: c.primary, fontWeight: 500, cursor: "pointer" }} onClick={() => setSelectedGroup(g)}>{g.code}</td>
                  <td style={st.td}>{g.description}</td>
                  <td style={st.td}><span style={st.pill}>{g.users} users</span></td>
                  <td style={st.td}><StatusBadge status={g.status} /></td>
                  <td style={st.td}><button style={st.btnSmall} onClick={() => setSelectedGroup(g)}>Edit</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {activeTab === "Users" && (
          <div>
            <div style={st.toolbarStrip}>
              <input style={st.input} placeholder="Search users..." value={search} onChange={e => setSearch(e.target.value)} />
              <select style={st.select}><option>All Groups</option>{groups.map(g => <option key={g.id}>{g.code}</option>)}</select>
              <div style={{ flex: 1 }} />
              <button style={st.btn}>+ New User</button>
            </div>
            <table style={st.table}>
              <thead><tr>
                <th style={st.th}>Username</th><th style={st.th}>Name</th><th style={st.th}>Email</th><th style={st.th}>Group</th><th style={st.th}>Last Login</th><th style={st.th}>Status</th><th style={st.th}></th>
              </tr></thead>
              <tbody>{filteredUsers.map(u => (
                <tr key={u.id}>
                  <td style={{ ...st.td, color: c.primary, fontWeight: 500, cursor: "pointer" }} onClick={() => setSelectedUser(u)}>{u.username}</td>
                  <td style={st.td}>{u.name}</td>
                  <td style={{ ...st.td, color: c.textMuted }}>{u.email}</td>
                  <td style={st.td}><span style={st.pill}>{u.group}</span></td>
                  <td style={{ ...st.td, color: c.textMuted }}>{u.lastLogin}</td>
                  <td style={st.td}><StatusBadge status={u.status} /></td>
                  <td style={st.td}><button style={st.btnSmall} onClick={() => setSelectedUser(u)}>Edit</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {activeTab === "Roles" && (
          <div>
            <div style={st.toolbarStrip}>
              <input style={st.input} placeholder="Search roles..." />
              <div style={{ flex: 1 }} />
              <button style={st.btn}>+ New Role</button>
            </div>
            <table style={st.table}>
              <thead><tr><th style={st.th}>Role Name</th><th style={st.th}>Description</th><th style={st.th}>Users</th><th style={st.th}></th></tr></thead>
              <tbody>{[["Administrator", "Full system access", 3], ["Accounting Manager", "GL and AP access", 5], ["Leasing Agent", "Leasing module", 18], ["Read Only", "View only", 2]].map(([name, desc, cnt], i) => (
                <tr key={i}>
                  <td style={{ ...st.td, color: c.primary, fontWeight: 500 }}>{name}</td>
                  <td style={{ ...st.td, color: c.textMuted }}>{desc}</td>
                  <td style={st.td}><span style={st.pill}>{cnt}</span></td>
                  <td style={st.td}><button style={st.btnSmall}>Edit</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {activeTab === "Reports" && <ReportsTab />}
        {activeTab === "Permissions" && <PermissionsTab />}
      </div>

      {selectedGroup && <SecurityGroupDrawer group={selectedGroup} onClose={() => setSelectedGroup(null)} />}
      {selectedUser && <UserDrawer user={selectedUser} onClose={() => setSelectedUser(null)} />}
    </div>
  );
}
