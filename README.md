# Arena 2026 Website (DTU Sports Fest)

Official web application for **Arena 2026** (Delhi Technological University Annual Inter Departmental Sports Tournament), organised by the **DTU Department of Physical Education & Sports**.

- **Tournament Dates:** 16, 17 and 18 October 2026
- **Venue:** DTU Sports Complex
- **Start Time:** 8:30 AM IST (16 October 2026)
- **Tagline:** *Hustle, Hit, Never Quit*

---

## Architecture & Master Principles

1. **Zero Fake Data**: Only verifiable facts printed on the official poster are pre-filled in seed templates. All rosters, fixtures, and results originate exclusively from the organizer's Google Sheet.
2. **Single Source of Truth**: All dynamic content is managed via a single Google Spreadsheet.
3. **Resilient Google Sheets Integration**:
   - Primary: Google Sheets API v4 or Public Google Sheets CSV Export.
   - 60-second Incremental Static Regeneration (`revalidate: 60`).
   - Memory & local fallback cache ensures the site never crashes or blanks out if Google Sheets is unreachable.
4. **Zod Validation**: Every row is strictly validated against tab schemas. Malformed entries are logged and skipped safely.
5. **Always IST**: All date calculations and countdown timers operate strictly in Indian Standard Time (`Asia/Kolkata`).

---

## Getting Started

### 1. Prerequisites
- Node.js 18+ (tested on Node v24)
- npm 9+

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```
Add your Google Sheet ID:
```env
NEXT_PUBLIC_SHEET_ID=your_google_sheet_id_here
```
*(If no sheet ID is provided, the app runs in fallback mode using the poster seed data in `/data-template/`).*

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Google Sheets Template & Dropdowns
See [`/data-template/README.md`](./data-template/README.md) for full instructions on setting up tabs, plain text formatting, and data validation rules in Google Sheets.
