# Arena 2026: Google Sheet Setup Guide

This guide explains how to set up the single source of truth Google Spreadsheet ("Arena Data") using the template CSV files in this directory.

---

## 1. Create the Google Spreadsheet

1. Go to [Google Sheets](https://sheets.new) and create a new blank spreadsheet.
2. Name it **"Arena 2026 Data"**.
3. Click the **Share** button in the top right:
   - Under *General access*, select **"Anyone with the link"** and set role to **"Viewer"**.
   - Copy the Spreadsheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/YOUR_SPREADSHEET_ID_HERE/edit`
   - Paste this ID into your `.env.local` file as `NEXT_PUBLIC_SHEET_ID=YOUR_SPREADSHEET_ID_HERE`.

---

## 2. Import CSVs as Tabs

For each CSV file in `/data-template/`:
1. In Google Sheets, click **File > Import**.
2. Click **Upload** and drag the CSV file.
3. Import location: choose **"Insert new sheet(s)"**.
4. Rename each sheet tab to match the exact tab name:
   - `Config.csv` -> Tab Name: **`Config`**
   - `Departments.csv` -> Tab Name: **`Departments`**
   - `Sports.csv` -> Tab Name: **`Sports`**
   - `Players.csv` -> Tab Name: **`Players`**
   - `Matches.csv` -> Tab Name: **`Matches`**
   - `Coordinators.csv` -> Tab Name: **`Coordinators`**
   - `Gallery.csv` -> Tab Name: **`Gallery`**
   - `Announcements.csv` -> Tab Name: **`Announcements`**
   - `Check.csv` -> Tab Name: **`Check`**
5. Delete the default blank `Sheet1`.

---

## 3. Critical Formatting Rules

> [!IMPORTANT]
> **Always format Roll Number and Phone columns as Plain text!**
> Otherwise, Google Sheets will strip leading zeroes or corrupt formats containing slashes (e.g., `2K22/CO/123`).

1. In tab **`Players`**:
   - Select Column E (`roll_no`), click **Format > Number > Plain text**.
2. In tab **`Coordinators`**:
   - Select Column D (`phone`), click **Format > Number > Plain text**.

---

## 4. Configure Data Validation (Dropdowns)

Applying dropdown validations prevents typos that would break team groupings and match links:

### A. Tab: `Players`
- **Column A (`dept_id`)**:
  - Select column range `A2:A`.
  - Click **Data > Data validation > Add rule**.
  - Criteria: **Dropdown (from a range)** -> `=Departments!$A$2:$A`.
- **Column B (`sport_id`)**:
  - Select column range `B2:B`.
  - Criteria: **Dropdown (from a range)** -> `=Sports!$A$2:$A`.
- **Column C (`category`)**:
  - Select column range `C2:C`.
  - Criteria: **Dropdown** -> Enter items: `Boys`, `Girls`.

### B. Tab: `Matches`
- **Column E (`sport_id`)**:
  - Select range `E2:E`.
  - Criteria: **Dropdown (from a range)** -> `=Sports!$A$2:$A`.
- **Column F (`category`)**:
  - Select range `F2:F`.
  - Criteria: **Dropdown** -> Enter items: `Boys`, `Girls`.
- **Column H (`team_a`)**:
  - Select range `H2:H`.
  - Criteria: **Dropdown (from a range)** -> `=Departments!$A$2:$A`.
- **Column I (`team_b`)**:
  - Select range `I2:I`.
  - Criteria: **Dropdown (from a range)** -> `=Departments!$A$2:$A`.
- **Column L (`winner`)**:
  - Select range `L2:L`.
  - Criteria: **Dropdown** -> Enter items: `A`, `B`, `Draw`, `No result`.

### C. Tab: `Coordinators`
- **Column C (`sport_id`)**:
  - Select range `C2:C`.
  - Criteria: **Dropdown (from a range)** -> `=Sports!$A$2:$A` (leave blank for general fest coordinators).

---

## 5. Result Entry Workflow

When a match concludes:
1. Filter the **`Matches`** tab by today's date or sport.
2. Fill **`score_a`** and **`score_b`** (e.g. `21-18, 21-16` or `145/6`).
3. Set **`winner`** (`A`, `B`, `Draw`, or `No result`).
4. That's it! Within 60 seconds, the match automatically moves from **Schedule** to **Results** on the live website.
