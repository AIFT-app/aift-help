# AI Finance Team — Roles & Permissions

AI Finance Team has two distinct types of users: **accountants** and **clients**. They see different parts of the product and have different responsibilities.

---

## Accountants

Accountants work at an accounting firm. They manage all the workspaces (client engagements) within their organization and are the primary day-to-day users of the product.

### What accountants can do

- Access the cross-workspace **dashboard** — a mission control view showing all client workspaces, sorted by how much attention each one needs
- Open any workspace their organization manages
- Review and **approve** AI-suggested transaction categorizations
- **Override** categorizations when the AI gets it wrong (this also trains the system for future transactions)
- Review extracted invoice data and correct errors
- **Match** invoices to bank transactions, or approve AI-suggested matches
- View and annotate **missing documents** — transactions that have no corresponding invoice
- Export clean data to accounting software at month-end

### What accountants cannot do

- Connect bank accounts on behalf of a client — bank authorization must happen in the client's own session (this is a deliberate trust boundary)
- Access workspaces outside their organization

### Accountant roles

There is one permission level within the accountant side: **Accountant Admin**. All accountants currently have the same capabilities. Finer-grained permissions (read-only accountant, limited access) are not yet built.

---

## Clients

Clients are the accountant's end customers — business owners or their office staff. Each client is invited to one workspace (their company's engagement).

### What clients can do

- **Upload invoices** — drag and drop PDF or image files, or use the upload button on the dashboard or invoices page
- View their invoices and the AI-extracted data (counterparty, amounts, dates)
- See the categorization that accountants have applied — read-only
- Connect their company's bank accounts via GoCardless (open banking)
- View a simplified financial overview of their own company

### What clients cannot do

- See other clients' data
- Override categorizations or approve matches — that is the accountant's responsibility
- Access the cross-workspace dashboard

### Client roles

There is one permission level on the client side: **Client Owner**. A client owner is the primary contact for their workspace. Multi-user client access (e.g., an accountant at the client company plus a director) is not yet built.

---

## Workspace membership

Every user is a member of one or more **workspaces**. A workspace represents one client engagement — one company (or group of related companies) being managed.

| | Accountant Admin | Client Owner |
|---|---|---|
| Cross-workspace dashboard | Yes | No |
| Invite new members | Yes | Yes (to their own workspace) |
| Upload invoices | Yes | Yes |
| View invoices | Yes | Yes |
| Categorize / correct | Yes | No |
| Approve matches | Yes | No |
| Connect bank accounts | No | Yes |
| Export to accounting software | Yes | No |

---

## What's not yet built

The following are planned but not yet available:

- **Automated invitation emails** — invitations are generated and the link must be shared manually today
- **Read-only accountant role** — for trainee accountants or auditors who should view but not edit
- **Multi-user client access** — currently one client owner per workspace
- **Granular per-feature permissions** — all accountants in an organization currently have identical access
