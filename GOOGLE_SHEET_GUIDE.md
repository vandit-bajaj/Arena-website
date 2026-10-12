# 📊 Arena 2026: Official Google Sheet Operations Guide

> **Official Live Spreadsheet**: [Arena 2026 Google Sheet](https://docs.google.com/spreadsheets/d/1mHxYu1MICHtplfmvbngldo8QADHBvOPgPAL9Zj7Kk4g/edit)  
> **Offline Master File**: [`/Users/1dit/Downloads/Arena_2026_Data.xlsx`](file:///Users/1dit/Downloads/Arena_2026_Data.xlsx)  
> **Live Website**: [https://arena-2026-dtu.vercel.app](https://arena-2026-dtu.vercel.app)

---

## 📌 Table of Contents
1. [Core Rules & Architecture](#1-core-rules--architecture)
2. [Tab 1: Config (Site Settings & Ribbon Bar)](#2-tab-1-config-site-settings--ribbon-bar)
3. [Tab 2: Departments (Academic Branches)](#3-tab-2-departments-academic-branches)
4. [Tab 3: Sports (The 11 Official Disciplines)](#4-tab-3-sports-the-11-official-disciplines)
5. [Tab 4: Players (Department Rosters)](#5-tab-4-players-department-rosters)
6. [Tab 5: Matches (Fixtures & Live Results)](#6-tab-5-matches-fixtures--live-results)
7. [Tab 6: Coordinators (Contact Directory)](#7-tab-6-coordinators-contact-directory)
8. [Tab 7: Gallery (Photo Highlights)](#8-tab-7-gallery-photo-highlights)
9. [Tab 8: Announcements (Timestamped Log)](#9-tab-8-announcements-timestamped-log)
10. [Tab 9: Check (Automatic Validation Formulas)](#10-tab-9-check-automatic-validation-formulas)
11. [Troubleshooting & Common Mistakes](#11-troubleshooting--common-mistakes)

---

## 1. Core Rules & Architecture

1. **Single Source of Truth**: The entire website reads directly from this one Google Spreadsheet.
2. **60-Second Auto-Sync**: The website caches data for **60 seconds**. After entering changes in the sheet, wait up to 1 minute and refresh the website to see the update live.
3. **Sharing Permissions**: General access must be set to **"Anyone with the link can view"** so the website can fetch updates.
4. **Zero-Crash Resilience**: If a cell or tab is blank, the website automatically displays clean *"To be announced"* badges. It will never crash or look broken.
5. **Format Columns as Plain Text**:
   - `roll_no` in **Players** (Column E): Set to **Format > Number > Plain text** (prevents `2K22/CO/123` from becoming dates).
   - `phone` in **Coordinators** (Column D): Set to **Format > Number > Plain text** (prevents leading zeros like `098...` from dropping).

---

## 2. Tab 1: `Config` (Site Settings & Ribbon Bar)

Two-column table with headers **`key`** (Column A) and **`value`** (Column B). Controls site-wide banners, URLs, and metadata.

### All Config Keys & Sample Values

| Column A (`key`) | Column B (`value`) | Description |
| :--- | :--- | :--- |
| `site_name` | `Arena 2026` | Main title shown in header, footer, hero section. |
| `subtitle` | `Annual Inter Departmental Sports Tournament` | Subheading under main title. |
| `organiser` | `DTU Department of Physical Education & Sports` | Organiser badge on the home page. |
| `tagline` | `Hustle, Hit, Never Quit` | Official festival motto shown in hero section. |
| `event_start_datetime`| `2026-10-16T08:30:00+05:30` | Target time for the live countdown clock (IST format). |
| `event_dates_text` | `16, 17 and 18 October 2026` | Dates string shown in cards and footer. |
| `venue` | `DTU Sports Complex` | Location info badge. |
| `instagram_url` | `https://www.instagram.com/sc_dtu` | Link for the Instagram button in navbar and quick actions. |
| `doubts_form_url` | `https://forms.gle/eJR4xUL5RV4ratG57` | Link for the Google Doubt Form button. |
| `gallery_drive_url` | `https://drive.google.com/...` | Google Drive link for full tournament photo albums. |
| `contact_email` | `sports@dtu.ac.in` | Support email displayed in footer and contacts page. |
| `footer_note` | `Delhi Technological University` | Institutional credit line. |
| `announcement_ribbon_text` | `⚡ Cricket finals moved to Main Oval at 3:30 PM!` | **Announcement Ribbon Text**. Displayed globally right below the navigation bar. |

### 📢 How to Control the Announcement Ribbon
- **To show an urgent notice**: In row `announcement_ribbon_text`, type your message in Column B.
- **To hide the ribbon**: Clear Column B, or type `off`.

---

## 3. Tab 2: `Departments` (Academic Branches)

List of participating DTU academic departments competing in Arena.

### Columns
- `dept_id` *(required)*: Unique uppercase identifier (e.g., `CSE`, `ME`, `ECE`).
- `name` *(required)*: Full department name.
- `short_name`: Abbreviation used on mobile cards.

### Example Rows
| dept_id | name | short_name |
| :--- | :--- | :--- |
| `CSE` | Computer Science & Engineering | CSE |
| `IT` | Information Technology | IT |
| `SE` | Software Engineering | SE |
| `ECE` | Electronics & Communication Engineering | ECE |
| `EE` | Electrical Engineering | EE |
| `ME` | Mechanical Engineering | ME |
| `CE` | Civil Engineering | CE |
| `EP` | Engineering Physics | EP |
| `MCE` | Mathematics & Computing | MCE |
| `BT` | Biotechnology | BT |
| `CHE` | Chemical Engineering | CHE |
| `ENE` | Environmental Engineering | ENE |
| `PIE` | Production & Industrial Engineering | PIE |
| `DSM` | Delhi School of Management | DSM |
| `USDI`| University School of Design & Innovation | USDI |

---

## 4. Tab 3: `Sports` (The 11 Official Disciplines)

Defines the 11 sanctioned sports per the official DTU tournament notification.

### Columns
- `sport_id` *(required)*: Kebab-case identifier used in URLs (e.g. `cricket`, `lawn-tennis`).
- `name` *(required)*: Display name.
- `has_boys`: `TRUE` or `FALSE`.
- `has_girls`: `TRUE` or `FALSE`.
- `nos_of_players`: Squad requirements (e.g., `Man-15, Women-8` or `Open to all`).
- `display_order`: Numerical sorting (1 to 11).

### The Official 11 Disciplines Reference
| sport_id | name | has_boys | has_girls | nos_of_players | display_order |
| :--- | :--- | :---: | :---: | :--- | :---: |
| `cricket` | Cricket | TRUE | TRUE | `Man-15, Women-8` | 1 |
| `football` | Football | TRUE | TRUE | `Man-15, Women-8` | 2 |
| `basketball` | Basketball | TRUE | TRUE | `Man-8, Women-6` | 3 |
| `volleyball` | Volleyball | TRUE | TRUE | `Man-10, Women-(6-8)` | 4 |
| `kabaddi` | Kabaddi | TRUE | TRUE | `Man-8, Women-6` | 5 |
| `lawn-tennis` | Lawn Tennis | TRUE | TRUE | `Open to all` | 6 |
| `athletics` | Athletics | TRUE | TRUE | `Open to all` | 7 |
| `badminton` | Badminton | TRUE | TRUE | `Open to all` | 8 |
| `chess` | Chess | TRUE | TRUE | `Open to all` | 9 |
| `table-tennis` | Table Tennis | TRUE | TRUE | `Open to all` | 10 |
| `carom` | Carom (Mixed) | TRUE | TRUE | `Open to all` | 11 |

---

## 5. Tab 4: `Players` (Department Rosters)

Contains individual student rosters for each department team.

### Columns
- `dept_id` *(required)*: Department code matching Tab 2 (e.g., `CSE`, `ME`).
- `sport_id` *(required)*: Sport slug matching Tab 3 (e.g., `cricket`, `football`).
- `category` *(required)*: `Boys`, `Girls`, or `Mixed`.
- `player_name` *(required)*: Full student name.
- `roll_no`: DTU roll number. *(Must format column as Plain Text!)*

### Example Rows
| dept_id | sport_id | category | player_name | roll_no |
| :--- | :--- | :--- | :--- | :--- |
| `CSE` | `football` | `Boys` | Rahul Sharma | `2K22/CO/145` |
| `CSE` | `football` | `Boys` | Aman Verma | `2K22/CO/034` |
| `ME` | `cricket` | `Boys` | Rohit Kumar | `2K21/ME/210` |
| `ECE` | `badminton` | `Girls` | Priya Singh | `2K23/EC/089` |
| `IT` | `carom` | `Mixed` | Sneha Patel | `2K22/IT/102` |

> 🔍 **Instant Search Feature**: The website's [`/teams`](https://arena-2026-dtu.vercel.app/teams) page has an instant live search bar that allows players and staff to search by either **Student Name** or **Roll Number**.

---

## 6. Tab 5: `Matches` (Fixtures & Live Results)

Controls both the **Schedule page** and the **Live Results page**.

### Columns
- `match_id` *(required)*: Unique match ID (e.g., `CRIC-01`, `FB-02`, `BB-03`).
- `date`: Date of the game (e.g., `16 October 2026`).
- `time`: Time in IST (e.g., `09:30 AM`, `02:00 PM`).
- `venue_ground`: Specific pitch/court (e.g., `Main Ground`, `Court 1`, `Indoor Complex`).
- `sport_id`: Slug matching Tab 3 (e.g., `cricket`, `basketball`).
- `category`: `Boys` or `Girls` or `Mixed`.
- `round`: Stage (e.g., `Round 1`, `Quarterfinal`, `Semi Final`, `Final`).
- `team_a`: Department ID (e.g., `CSE`).
- `team_b`: Department ID (e.g., `ME`).
- `score_a`: Team A score *(leave blank until completed)*.
- `score_b`: Team B score *(leave blank until completed)*.
- `winner`: Winner code *(leave blank until completed)*. Options:
  - `A` = Team A won
  - `B` = Team B won
  - `Draw` = Tie / Draw
  - `No result` = Abandoned / Rain
- `result_note`: Extra context (e.g., `Won by 3 wickets`, `Won 21-18, 21-16`, `Penalties 4-2`).

### ⚙️ How Match Status & Points Table Work
- **Upcoming Fixture (Shown on `/schedule`)**: Leave `winner` **blank**.
- **Completed Match (Moved to `/results`)**: Enter `score_a`, `score_b`, and select `winner` (`A`, `B`, `Draw`, or `No result`). Within 60 seconds, the website automatically moves the game from Schedule to Results and highlights the winning department!
- **Automatic Points Table ([`/points`](https://arena-2026-dtu.vercel.app/points))**:
  - **Win**: +2 points (and +1 win for the victorious department)
  - **Draw / Tie**: +1 point each
  - **Loss**: 0 points (+1 loss)
  - The live points table automatically ranks all 15 departments for the **Overall Championship Trophy** as well as individual **Discipline-specific Standings** (e.g., Football Points Table, Cricket Points Table)!

### Example Rows
| match_id | date | time | venue_ground | sport_id | category | round | team_a | team_b | score_a | score_b | winner | result_note |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `CRIC-01` | 16 Oct 2026 | 09:00 AM | Main Cricket Ground | `cricket` | `Boys` | Round 1 | `CSE` | `ME` | `148/5` | `132/9` | `A` | Won by 16 runs |
| `FB-01` | 16 Oct 2026 | 11:30 AM | Football Ground 1 | `football` | `Boys` | Round 1 | `ECE` | `IT` | | | | |

---

## 7. Tab 6: `Coordinators` (Contact Directory)

Displayed on the [`/contacts`](https://arena-2026-dtu.vercel.app/contacts) page.

### Columns
- `name` *(required)*: Full name of faculty, student coordinator, or convenor.
- `role`: Role title (e.g., `Sports Secretary`, `Faculty Advisor`, `Football Coordinator`).
- `sport_id`: Associated sport slug (or blank for General Council).
- `phone`: Mobile number. *(Format column as Plain Text!)*
- `email`: Contact email address.

### Example Rows
| name | role | sport_id | phone | email |
| :--- | :--- | :--- | :--- | :--- |
| Dr. Rajeev Sharma | Faculty Advisor | | `+91 98765 43210` | `rajeev@dtu.ac.in` |
| Aryan Kapoor | General Secretary | | `+91 98111 22334` | `sc_dtu@dtu.ac.in` |
| Sahil Malik | Cricket Coordinator | `cricket` | `+91 99999 88888` | `cricket@dtu.ac.in` |

---

## 8. Tab 7: `Gallery` (Photo Highlights)

Photos displayed in the [`/gallery`](https://arena-2026-dtu.vercel.app/gallery) grid.

### Columns
- `filename`: Local image path (e.g., `/gallery/action-1.jpg`) or direct image URL.
- `caption`: Descriptive event caption.
- `year`: Fest year (e.g., `2025` or `2026`).

---

## 9. Tab 8: `Announcements` (Timestamped Log)

A chronological log of festival notices and venue updates.

### Columns
- `date_time`: Optional timestamp (e.g., `16 Oct, 10:30 AM`).
- `text` *(required)*: Announcement message.

> 💡 If `announcement_ribbon_text` in the `Config` tab is left blank, the website **automatically displays the latest announcement from this tab** in the top ribbon bar!

---

## 10. Tab 9: `Check` (Automatic Validation Formulas)

Paste these formulas into row 2 of their respective sheets to catch mistakes in real time:

| Check Rule | Target Sheet | Formula to Paste | Purpose |
| :--- | :--- | :--- | :--- |
| **Invalid Department** | `Players` (Col F) | `=IF(A2="","",IF(ISNA(MATCH(A2, Departments!A:A, 0)), "⚠️ UNKNOWN DEPT", "OK"))` | Flags misspelled department IDs. |
| **Invalid Sport** | `Players` (Col G) | `=IF(B2="","",IF(ISNA(MATCH(B2, Sports!A:A, 0)), "⚠️ UNKNOWN SPORT", "OK"))` | Flags misspelled sport IDs. |
| **Duplicate Roll No** | `Players` (Col H) | `=IF(E2="","",IF(COUNTIFS(B:B, B2, C:C, C2, E:E, E2)>1, "⚠️ DUPLICATE", "OK"))` | Flags same student registered twice. |
| **Same Team Match** | `Matches` (Col N) | `=IF(OR(H2="",I2=""),"",IF(H2=I2,"⚠️ TEAM A = TEAM B","OK"))` | Flags department playing itself. |
| **Winner Missing Score** | `Matches` (Col O) | `=IF(L2="","",IF(AND(OR(L2="A",L2="B"),OR(J2="",K2="")),"⚠️ SCORE MISSING","OK"))` | Flags winner declared without scores. |

---

## 11. Troubleshooting & Common Mistakes

| Problem | Root Cause | Solution |
| :--- | :--- | :--- |
| **Website shows old data** | Caching interval (60s). | Wait 60 seconds and refresh browser with `Ctrl+Shift+R` (or `Cmd+Shift+R`). |
| **Roll number turned into date** | Google Sheets auto-formatted `2K22/CO/...` as a date. | Select the column, click **Format > Number > Plain text**. |
| **Match still on Schedule page after ending** | `winner` cell is empty. | Set Column L (`winner`) to `A`, `B`, `Draw`, or `No result`. |
| **Match doesn't show under a sport** | `sport_id` typo. | Ensure `sport_id` is exact lowercase (e.g., `table-tennis`, NOT `Table Tennis`). |
| **Ribbon bar won't disappear** | Text still present in `Config`. | Delete the text in `announcement_ribbon_text` cell or type `off`. |
