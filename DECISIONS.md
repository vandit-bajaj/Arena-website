# Architectural Decisions (DECISIONS.md)

This document tracks all design and implementation decisions made where the roadmap was silent or permitted implementation choices, adhering strictly to the master rules of Arena 2026.

---

### 1. Google Sheets Client Architecture (Dual Protocol & Cache Fallback)
* **Decision**: Support both **Google Sheets API v4** (via API key if provided) and **Public Web Export CSV** (`https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:csv&sheet={TAB_NAME}`), with local `/data-template/` CSV files as the offline / last-good-data baseline.
* **Rationale**: Google Cloud API keys can be rate-limited, expire, or take time to provision. The Google Sheets CSV export endpoint works immediately for any sheet set to "Anyone with the link can view".
* **Caching & Resilience**: Revalidation is set to 60 seconds (`next: { revalidate: 60 }`). A persistent in-memory / filesystem cache stores the last successfully fetched dataset so that if Google Sheets goes down during the tournament, the site never errors or blanks out.

### 2. Timezone & DateTime Handling
* **Decision**: All date calculations, live countdowns, and schedule formatting are hardcoded to Indian Standard Time (`IST`, UTC+05:30, `Asia/Kolkata`).
* **Rationale**: Rule 6 states: "Timezone is always IST (Asia/Kolkata)". Prevents timezone drift on visitors' devices traveling from outside the IST timezone.

### 3. Typography & Aesthetic Tokens
* **Decision**:
  - Headings: `Barlow Condensed` / `Oswald` (Google Fonts) with bold uppercase tracking (`tracking-wide` / `font-black`).
  - Body: `Inter` (Google Fonts) for maximum legibility on mobile devices.
  - Palette sampled from the poster:
    - Primary Deep Royal: `#1E3A8A` / `#1D4ED8`
    - Vibrant Blue: `#2563EB`
    - Sky / Cyan Accent: `#38BDF8`
    - Soft Cloud / Cream Accent: `#F0F9FF` / `#FEF3C7`
    - Surface Card: `#FFFFFF` and `#F8FAFC`
    - Text: `#0F172A` (Slate 900) and `#475569` (Slate 600)
    - Border: `#E2E8F0` (Slate 200) with subtle glassmorphism effects (`backdrop-blur-md`).
* **Rationale**: Directly reflects the Arena 2026 poster's clean, modern, energetic athletic aesthetic without unnecessary visual clutter.

### 4. Zero Hardcoded Data Guarantee
* **Decision**: All dynamic content (names, scores, contacts, announcements, links) is resolved at runtime from the Google Sheet client.
* **Seed Data**: Only the exact poster facts from Section 3 of the roadmap are placed into `/data-template/Config.csv` and `/data-template/Sports.csv`.
* **Zero Inventory**: Zero fake teams, players, coordinators, fixtures, or roll numbers. All empty entities render standard "To be announced" or "Coming soon" state cards.

### 5. Sport Identifiers (sport_id)
* **Decision**: Normalized kebab-case slugs for all 9 poster sports:
  - `basketball`, `table-tennis`, `kabaddi`, `football`, `volleyball`, `cricket`, `badminton`, `chess`, `hockey`.
* **Rationale**: Ensures deterministic URLs like `/sports/table-tennis` and robust foreign key referencing across `Players`, `Matches`, and `Coordinators` tabs.

### 6. Team Representation & Grouping
* **Decision**: In `Players.csv`, players are grouped by `dept_id`, `sport_id`, and `category` (Boys/Girls). If a department has no registered players for a sport or category, that category displays "Team to be announced".
* **Search**: The `/teams` page includes instant client-side search filtering by player name and roll number.

### 7. Match Status Derivation & Scores
* **Decision**: A match is derived as `Completed` if `winner` is non-empty (`A`, `B`, `Draw`, or `No result`). If `winner` is empty, it is `Scheduled`.
* **Scores**: Free-text string preserved as entered in the sheet (e.g., `"21-18, 19-21, 21-15"`, `"145/6 vs 132/9"`) without destructive regex parsing.

### 8. External Links & Missing Assets
* **Decision**:
  - Logo: Since no logo image file is provided yet, render a clean typographic banner: `"DTU | Department of Physical Education & Sports"`.
  - Instagram & Doubts Form: If empty in `Config`, render buttons with "Coming soon" disabled state.
  - Gallery: If no photos exist in `Gallery.csv` or `/public/gallery/`, display "Photos from past editions coming soon".
