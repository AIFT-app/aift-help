# Uploading Invoices

Any workspace member — accountants and clients alike — can upload invoices. Once uploaded, AI Finance Team extracts the data automatically and makes the invoice available for review and categorization.

---

## Where to upload

There are two places to start an upload:

- **Workspace dashboard** — the "Add invoice" button in the top area of the workspace overview
- **Invoices page** — the "Upload invoice" button in the top-right corner of the invoices list

Both open the same upload dialog.

---

## Supported formats

AI Finance Team accepts **PDF files** and common **image formats** (JPEG, PNG, and similar). These are the standard formats that invoices and receipts typically come in. Scanned documents work as long as the scan is legible.

If you have a multi-page PDF invoice, upload it as a single file — the system reads all pages.

---

## What happens after upload

After you submit the file, extraction begins automatically. You will see the invoice appear in the list with a status that progresses through three stages:

| Status | What it means |
|---|---|
| **Pending** | The file has been received and is queued for processing |
| **Processing** | The AI is reading the document and extracting data (counterparty, amounts, dates, line items) |
| **Completed** | Extraction is done — the invoice is ready for review |

Extraction typically completes within a few seconds for a standard invoice. Large or complex documents may take longer.

---

## After extraction

Once an invoice reaches **Completed** status, it has structured data: counterparty, invoice number, issue date, due date, line items, net amount, VAT, and gross total.

**Accountants** then review the extracted data and apply the correct category. If the AI has already suggested a category based on past patterns, accountants approve or override it.

**Clients** can see the invoice and its categorization in their workspace, but categorization is read-only for clients — it is the accountant's responsibility to finalize it.

---

## Tips

- Upload invoices as soon as you receive them. The sooner they are in the system, the sooner they can be matched to bank transactions.
- If an invoice failed extraction (status shows an error), try uploading a cleaner scan or a higher-resolution image.
- Receipts count as invoices — upload them the same way.
