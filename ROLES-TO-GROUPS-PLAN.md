# Plan: Attach Roles to Security Groups

## Overview
Move role configuration from user-level (in a separate program) to security group-level within Security Hub v2. Users will inherit roles through their group membership.

---

## Current State

**Data Model:**
```typescript
// Security Groups - no role association
{ id: 1, name: 'Admin', description: '...', userCount: 2, properties: [...] }

// Users - belong to a single group, no direct role link
{ id: 1, name: 'Sarah Chen', group: 'Admin', ... }

// Roles - global list, NOT connected to groups or users
{ id: 1, name: 'AR Manager', enabled: true, isDefault: false }
```

**Current UI Behavior:**
- The Roles tab in the group drawer shows a single global `rolesList`
- Toggling a role's enabled/default state affects it globally
- There's no actual connection between which roles belong to which groups

---

## Proposed Changes

### 1. Data Model

**Security Groups - add roles array:**
```typescript
{
  id: 1,
  name: 'Admin',
  description: 'Full system access',
  userCount: 2,
  properties: ['All Properties'],
  roles: [  // NEW - roles configured for this group
    { roleId: 1, enabled: true, isDefault: false },
    { roleId: 6, enabled: true, isDefault: true },  // System Administration as default
    { roleId: 7, enabled: true, isDefault: false },
  ]
}
```

**Roles - becomes a reference/master list:**
```typescript
// Available roles (master list)
{ id: 1, name: 'AR Manager' }
{ id: 6, name: 'System Administration' }
// No enabled/isDefault here - that's per-group now
```

**Users - no change needed:**
```typescript
// Users inherit roles through their group membership
{ id: 1, name: 'Sarah Chen', group: 'Admin', ... }
// Sarah gets AR Manager, System Administration, Voyager 8 because she's in Admin group
```

### 2. UI Changes

| Area | Current | After |
|------|---------|-------|
| Roles tab in drawer | Shows global role list | Shows roles for selected group(s) |
| Toggle role enabled | Affects all groups | Only affects selected group(s) |
| Set default role | Global default | Per-group default |
| Multi-group edit | Same UI, same data | Shows comparison/merge UI |
| User details | No role display | Shows "Inherited from [Group]" |

### 3. State Management

```typescript
// Current - single global state
const [rolesList, setRolesList] = useState(roles);

// After - roles stored within groups
const [groupsList, setGroupsList] = useState(securityGroups);
// When editing, modify groupsList[x].roles instead
```

---

## What Stays the Same

- Security Groups tab layout
- Users tab in drawer (users still belong to groups)
- Database selection flow (layer 2)
- Permissions, Accounts, Reports tabs (layer 3)
- Clone group modal (would also clone role assignments)

---

## Summary of Code Changes

1. **Data structures** (~20 lines) - Add `roles` array to each security group
2. **State management** (~10 lines) - Update how roles are read/written
3. **Roles tab UI** (~30 lines) - Pull from selected group's roles instead of global
4. **Multi-group editing** (~20 lines) - Handle comparing/merging role configs
5. **Optional: User details** (~15 lines) - Show inherited roles

Roughly **~100 lines** of changes to the existing file.

---

## Benefits of This Approach

1. **Simplified administration** - Configure roles once per group instead of per user
2. **Consistency** - Everyone in a group has the same role access
3. **Easier auditing** - "What can Property Managers do?" becomes a single lookup
4. **Faster onboarding/offboarding** - Group membership controls everything
5. **Centralized management** - All security config in one place (Security Hub v2)

## Considerations

1. **User-level exceptions** - If needed, options include:
   - Add user to an additional group
   - Allow user-level role overrides (adds complexity)
   - Create more granular groups

2. **Multiple group membership** - If a user is in multiple groups, roles combine (union)

3. **Migration path** - Transition existing user-role assignments by:
   - Analyzing current user-role patterns to identify natural groupings
   - Mapping existing roles to groups
   - Handling outliers
