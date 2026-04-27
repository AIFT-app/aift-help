# AI Finance Team — Roles & Permissions

This guide describes how access works in AI Finance Team today. It covers what users can do based on their role and how membership is granted.

## How the Platform Is Organized

AI Finance Team supports collaboration between accounting firms and their clients. The structure is:

- **Accounting organizations** are firms or practices that prepare financial records for their clients.
- **Client organizations** are the businesses whose books are being kept.
- A **workspace** represents one client engagement. The accounting firm manages the workspace; the client uses it. Accountants typically work across multiple workspaces; client users see only their own.

A user's permissions are determined by their role within a workspace, not by which organization they belong to.

## The Four Workspace Roles

Every member of a workspace has one of these four roles. This determines what they can see and do in that workspace.

| Role | Side | Typical user |
|---|---|---|
| Accountant admin | Firm | Lead accountant on the engagement |
| Accountant | Firm | Supporting accountant or staff |
| Client owner | Client | Founder, CEO, or senior decision-maker at the client |
| Client member | Client | Bookkeeper, controller, or assistant at the client |

### Accountant Admin

The lead accountant on the client engagement.

Can do:

- Everything an accountant can do
- Invite new members to the workspace (other accountants or client users)
- Revoke pending invitations
- See the workspace's full member list
- See the firm's full team in addition to the workspace members (the "Your team at [Firm Name]" section in workspace settings)

### Accountant

A supporting accountant from the firm.

Can do:

- View the workspace dashboard, invoices, bank transactions, closing, and reports
- Upload invoices on behalf of the client
- Edit invoice headers (direction, entity, counterparty)
- Edit invoice line item categories
- Approve or override AI-generated categorizations
- Match invoices to bank transactions
- Add internal notes on transactions (visible only to accountants)
- Access bank transaction details

Cannot:

- Invite or remove workspace members
- See the firm's full team list (only sees members of this specific workspace)

### Client Owner

The senior person at the client company.

Can do:

- See the workspace dashboard and invoices
- Upload invoices and receipts
- View the workspace member list
- Invite other client users to join the workspace as client members

Cannot:

- Edit invoice headers or line item categories
- Access bank transactions
- See accountant-only notes
- Access closing or reports
- Invite accountants

### Client Member

Other users at the client company who interact with the platform.

Can do:

- See the workspace dashboard and invoices
- Upload invoices and receipts
- View the workspace member list

Cannot:

- Edit invoice headers or line item categories
- Access bank transactions
- See accountant-only notes
- Access closing or reports
- Invite anyone

## What Each Role Sees

### Sidebar Navigation

| Section | Accountant admin | Accountant | Client owner | Client member |
|---|---|---|---|---|
| Home | ✓ | ✓ | ✓ | ✓ |
| Invoices | ✓ | ✓ | ✓ | ✓ |
| Bank transactions | ✓ | ✓ | — | — |
| Closing | ✓ | ✓ | — | — |
| Reports | ✓ | ✓ | — | — |
| Settings | ✓ | ✓ | ✓ | ✓ |

### Settings → Team Section

| Component | Accountant admin | Accountant | Client owner | Client member |
|---|---|---|---|---|
| Workspace members list | ✓ | ✓ | ✓ | ✓ |
| "Your team at [Firm Name]" section | ✓ | — | — | — |
| Invite new member form | ✓ | — | ✓ (client roles only) | — |
| Pending invitations list | ✓ | — | ✓ | — |
| Revoke pending invitation | ✓ | — | ✓ (own invites) | — |

The client owner's invite form is restricted: they can invite other client members, but cannot invite accountants or other client owners.

### Invoices

| Action | Accountant admin | Accountant | Client owner | Client member |
|---|---|---|---|---|
| Upload an invoice | ✓ | ✓ | ✓ | ✓ |
| View invoice details | ✓ | ✓ | ✓ | ✓ |
| Edit header (direction, entity, counterparty) | ✓ | ✓ | — | — |
| Edit line item categories | ✓ | ✓ | — | — |

Clients submit raw documents; accountants do the categorization and verification.

## How Membership Works

### Inviting Someone to a Workspace

An accountant admin or a client owner can send an invitation. The form takes:

- An email address
- A role to assign on acceptance

The system creates an invitation record and shows the inviter a URL. The inviter shares this URL with the recipient through their own channels (email, chat, etc.). Automated invitation emails are not yet sent by the platform.

The invitation:

- Expires seven days after creation
- Can be revoked by the inviter at any time before acceptance
- Is bound to the specific email address provided

### Accepting an Invitation

When the recipient clicks the URL:

- If they're not signed in, they're directed to log in or sign up. The invitation token is preserved through the auth flow.
- If they sign up, an account is created with the email they enter.
- If they sign in with a different email than the invitation was sent to, acceptance is blocked with a clear error message.
- On successful acceptance, they're added to the workspace with the assigned role and redirected to the workspace.

### After Acceptance

A new member sees the workspace immediately. Their role determines what's visible according to the tables above. Their account exists at the platform level, so if they later leave the workspace (or are added to another), their account persists.

## What's Not Yet Built

A few capabilities the data model supports but the user interface doesn't yet expose:

- **Removing existing members from a workspace.** Today, only pending invitations can be revoked. Once someone accepts, removing them requires a database operation by an administrator.
- **Bank connection management UI.** Bank account data exists but the UI for clients to connect, disconnect, or manage their bank link is not yet built.
- **Organization-level administration.** Firms can't currently manage their full team from a single page (the "Your team at [Firm Name]" view shows the team but doesn't include add/remove actions yet).
- **Export to accounting software.** The export feature is not yet built.
- **Automated invitation emails.** Inviters currently copy and share the accept URL manually.
- **Approval workflows.** Such as requiring senior approval before an invoice is finalized.
- **Audit trail.** Visibility into who did what and when.

These are planned but not part of the current release.

---

This represents the platform as it exists today. As features ship, this document gets updated to reflect new capabilities.
