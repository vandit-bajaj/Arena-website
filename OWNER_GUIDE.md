# Arena 2026: Website Owner's Operational Guide

This document is the official operational guide for the DTU Sports Council and organizers of **Arena 2026**. 
All website content is driven dynamically by your single Google Spreadsheet.

---

## 1. Quick Setup & Spreadsheet Connection

1. Open [Google Sheets](https://sheets.new) and create a spreadsheet named **"Arena 2026 Data"**.
2. Click **Share** (top right) > Set General Access to **"Anyone with the link can view"**.
3. Copy the Spreadsheet ID from the URL:
   `https://docs.google.com/spreadsheets/d/`**`YOUR_SPREADSHEET_ID`**`/edit`
4. In your production hosting environment (Vercel) or `.env.local`, set:
   ```env
   NEXT_PUBLIC_SHEET_ID=YOUR_SPREADSHEET_ID
   ```
5. Import each template from `/data-template/` (**File > Import > Insert new sheet(s)**):
   - `Config`, `Departments`, `Sports`, `Players`, `Matches`, `Coordinators`, `Gallery`, `Announcements`, `Check`.
6. **Critical Format Rule**: In `Players`, select Column E (`roll_no`), click **Format > Number > Plain text**. In `Coordinators`, select Column D (`phone`), click **Format > Number > Plain text**.

---

## 2. Day-to-Day Workflows

### A. Entering a Department Roster
1. Go to the **`Players`** tab.
2. Paste your department participant list:
   - `dept_id`: Short department code (e.g., `CSE`, `ME`, `ECE`) matching the `Departments` tab.
   - `sport_id`: Kebab-case sport ID (`cricket`, `football`, `basketball`, `volleyball`, `kabaddi`, `lawn-tennis`, `athletics`, `badminton`, `chess`, `table-tennis`, `carom`).
   - `category`: `Boys` or `Girls` (or `Mixed` for Carom).
   - `player_name`: Full name of the student.
   - `roll_no`: Exact DTU roll number (e.g. `2K22/CO/123`).
3. **Official Squad Requirements (DTU Notification)**:
   | Ser No | Sport | Sport ID | Required Players |
   | :--- | :--- | :--- | :--- |
   | 1. | Cricket | `cricket` | Man-15, Women-8 |
   | 2. | Football | `football` | Man-15, Women-8 |
   | 3. | Basketball | `basketball` | Man-8, Women-6 |
   | 4. | Volleyball | `volleyball` | Man-10, Women-(6-8) |
   | 5. | Kabaddi | `kabaddi` | Man-8, Women-6 |
   | 6. | Lawn Tennis | `lawn-tennis` | Open to all |
   | 7. | Athletics | `athletics` | Open to all |
   | 8. | Badminton | `badminton` | Open to all |
   | 9. | Chess | `chess` | Open to all |
   | 10. | Table Tennis | `table-tennis` | Open to all |
   | 11. | Carom (Mixed) | `carom` | Open to all |
4. The site's `/teams` page updates automatically. Players can search by name or roll number immediately.

---

### B. Scheduling a Match (Fixtures)
1. Go to the **`Matches`** tab.
2. Enter a new row:
   - `match_id`: Unique identifier (e.g., `M-01`, `CRIC-01`).
   - `date`: Match date (e.g., `16 October 2026`).
   - `time`: Time (e.g., `09:30 AM`).
   - `venue_ground`: Court/ground (e.g., `Outdoor Court 1`, `Main Cricket Ground`).
   - `sport_id`: Sport ID (e.g., `cricket`).
   - `category`: `Boys` or `Girls`.
   - `round`: Stage (e.g., `Round 1`, `Quarterfinal`, `Semi Final`, `Final`).
   - `team_a`: Department ID (e.g., `CSE`).
   - `team_b`: Department ID (e.g., `ME`).
   - Leave `score_a`, `score_b`, and `winner` **blank**.
3. The match immediately appears in the `/schedule` tab under the selected day.

---

### C. Entering Match Results (During the Fest)
When a match finishes at the venue:
1. Open the **`Matches`** tab on your phone or laptop.
2. Find the match row.
3. Enter:
   - `score_a`: Score of Team A (e.g., `21-18, 21-16` or `142/6`).
   - `score_b`: Score of Team B (e.g., `19-21, 15-21` or `138/9`).
   - `winner`: Select `A`, `B`, `Draw`, or `No result` from the dropdown.
   - `result_note` *(optional)*: E.g., `Won by 4 wickets` or `Walkover`.
4. **Done!** The site caches for 60 seconds; within a minute, the match automatically moves from **Schedule** to **Results** with the winning department highlighted.

---

### D. Announcement Ribbon (Top of All Pages)
You have two easy ways to show an announcement in the top ribbon bar across the entire website:

**Option 1: Quick Sticky Announcement (`Config` Tab - Recommended)**
1. Go to the **`Config`** tab.
2. In Column A, find (or add) **`announcement_ribbon_text`**.
3. In Column B, type your announcement message (e.g., `⚡ Badminton semi-finals shifted to Indoor Hall at 2:00 PM!`).
4. To hide the ribbon bar, simply clear Column B or set it to `off`.

**Option 2: Timestamped Announcements Log (`Announcements` Tab)**
1. Go to the **`Announcements`** tab.
2. Add a new row:
   - `date_time`: e.g., `16 Oct, 11:30 AM` (optional)
   - `text`: Your announcement message
3. The latest row automatically appears in the top ribbon bar with its timestamp.

- **Updating Links**: In the **`Config`** tab, you can update `instagram_url`, `doubts_form_url`, or `gallery_drive_url`.

---

## 3. Data Integrity & The `Check` Tab

To avoid mistakes while entering results under pressure, open the **`Check`** tab:
1. **Invalid Department**: Verifies that every `dept_id` entered in `Players` exists in `Departments`.
2. **Invalid Sport**: Verifies that every `sport_id` matches one of the 9 official sports.
3. **Duplicate Roll Numbers**: Alerts if the same student roll number is entered twice in the same sport and category.
4. **Team A vs Team A**: Flags any match where a department plays itself.
5. **Winner Missing Score**: Alerts if a winner was declared without recording the match score.

---

## 4. How to Confirm the Site Updated
1. Open the website on your phone or computer.
2. Visit `/results` or the relevant sport page.
3. Wait up to 60 seconds (revalidation period) and refresh. The updated scores and rosters will be live.
