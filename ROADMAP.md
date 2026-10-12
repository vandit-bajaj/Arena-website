# Arena 2026 Website: Implementation Roadmap

For use with Antigravity. Event: Arena 2026, DTU Annual Inter Departmental Sports Tournament, organised by the DTU Department of Physical Education & Sports. Dates 16, 17 and 18 October 2026, DTU Sports Complex, first day starts 8:30 AM.

## 0. Master rules for the coding agent (paste first)

1. **Never invent data.** No fake teams, players, roll numbers, scores, fixtures, coordinators, links or dates. The only facts allowed in the seed data are those printed on the poster (listed in section 3).
2. **Single source of truth.** Every piece of content comes from one Google Spreadsheet ("Arena Data"). Nothing is hardcoded in components. The owner edits the sheet only; the site updates itself.
3. **Empty means "To be announced".** Any missing value, empty tab or empty section renders a clean placeholder (for example "Schedule will be announced soon"). No page may crash or show blank space on empty data.
4. **Minimal design.** White and blue palette taken from the poster, one condensed bold heading font, generous spacing, no heavy animation, mobile-first (most visitors will be on phones at the venue).
5. **Fast and resilient.** Static generation with revalidation every 60 seconds. If the sheet is unreachable, serve the last good data instead of an error.
6. Timezone is always IST (Asia/Kolkata).

## 1. Scope

**In scope:** Home, Sports hub with a page per sport, Teams (department, then sport, then boys and girls), Schedule and Fixtures (day-wise), Results, Gallery (8 photos from last year), Contacts (coordinators), Doubts (link to Google Form), Instagram link, About.

**Out of scope (decided):** registration, rulebooks, prizes, QR code, user accounts, a custom backend or database, an admin panel.

**Conditional:** an overall department leaderboard is built only once a points system is provided. Until then the section shows "To be announced".

## 2. Architecture

| Concern | Decision | Why |
| --- | --- | --- |
| Data entry | One Google Spreadsheet, one tab per data type | Bulk paste of rosters, dropdowns for results, no login system to build, owner already knows the tool |
| Data access | Google Sheets API v4 with a read-only API key (sheet shared as "anyone with link can view"). Fallback: Publish-to-web CSV per tab | Near real time, no server needed |
| Framework | Next.js (App Router, TypeScript) | Static generation plus revalidation |
| Styling | Tailwind CSS | Fast, minimal |
| Validation | zod schemas on every row | Bad rows are skipped and reported, never crash the site |
| Hosting | Vercel (free tier), custom domain optional | Zero ops |
| Images | Gallery photos downloaded once into the repo, optimised | Google Drive hotlinks are unreliable under traffic |

No database is needed. The spreadsheet is the database.

## 3. Seed data allowed from the poster

- Name: Arena 2026
- Subtitle: Annual Inter Departmental Sports Tournament
- Organiser: DTU Department of Physical Education & Sports
- Tagline: Hustle, Hit, Never Quit
- Dates: 16, 17 and 18 October 2026
- Venue: DTU Sports Complex
- Start: 8:30 AM on 16 October
- Sports: Basketball, Football, Badminton, Table Tennis, Volleyball, Chess, Kabaddi, Cricket, Hockey

Nothing else may be pre-filled.

## 4. The one-place data system (Google Sheet)

Antigravity should generate a `/data-template/` folder with one CSV per tab (headers only, plus the poster seed rows) and a short README. The owner imports each CSV as a tab (File, Import, Insert new sheet). Then he applies the dropdown rules listed under each tab.

**Formatting rule:** set the roll number and phone columns to Plain text so nothing gets altered.

### Tab: Config (key, value)

Keys: `site_name`, `subtitle`, `organiser`, `tagline`, `event_start_datetime` (ISO, IST), `event_dates_text`, `venue`, `instagram_url`, `doubts_form_url`, `gallery_drive_url`, `contact_email`, `footer_note`. Only poster values are pre-filled. Links stay empty, and the site hides or marks any empty link as "coming soon".

### Tab: Departments

`dept_id`, `name`, `short_name`. The owner pastes his list. `dept_id` is a short unique code he chooses.

### Tab: Sports

`sport_id`, `name`, `has_boys` (TRUE/FALSE), `has_girls` (TRUE/FALSE), `display_order`. Nine rows pre-filled from the poster. Both flags default to blank, and the owner sets them. Blank means "not announced".

### Tab: Players

One row per player: `dept_id`, `sport_id`, `category` (Boys or Girls), `player_name`, `roll_no`. Dropdowns: `dept_id` from Departments, `sport_id` from Sports, `category` from Boys/Girls. A flat table means the whole roster can be pasted from any existing list in one go. The Teams page is built by grouping these rows.

### Tab: Matches (fixtures and results in the same row)

Fixture columns: `match_id`, `date` (real date), `time`, `venue_ground`, `sport_id`, `category`, `round`, `team_a` (dept\_id), `team_b` (dept\_id). Result columns, filled at the end of the match: `score_a`, `score_b`, `winner` (dropdown: A, B, Draw, No result), `result_note`. Status is derived: no winner entered means Scheduled, winner entered means Completed.

**Result entry workflow (what the owner actually does):** filter the sheet by today's date, fill three cells (`score_a`, `score_b`, `winner`), done. Scores are free text so any sport works ("21-18, 19-21, 21-15" for badminton, "145/6 vs 132/9" for cricket). The site updates within about a minute.

### Tab: Coordinators

`name`, `role`, `sport_id` (optional), `phone`, `email`. Empty tab shows "Coordinator details will be announced soon".

### Tab: Gallery

`filename`, `caption`, `year`. Photos themselves live in `/public/gallery/`.

### Tab: Announcements (optional)

`date_time`, `text`. Newest shown as a slim banner on Home.

### Tab: Check (read-only, formulas)

Highlights problems before they reach the site: a `dept_id` not in Departments, a match with the same team on both sides, duplicate roll numbers within a sport and category, a winner entered with a missing score. Conditional formatting turns bad rows red.

## 5. Pages and behaviour

**Home.** Hero with name, subtitle, dates and venue; live countdown to `event_start_datetime`; announcements banner; the nine sports as a grid; latest five results; quick links (Schedule, Teams, Gallery, Doubts, Instagram).

**Sports hub.** `/sports` lists the nine sports. `/sports/[sport]` shows that sport's fixtures, results and participating teams, with tabs for Boys and Girls (only tabs that exist in the data).

**Teams.** `/teams` with a department selector. Structure: Department, then Sport, then Boys team and Girls team, each listing player name and roll number. Empty categories show "Team to be announced". Include search by name or roll number, since people will look for themselves.

**Schedule.** `/schedule` with tabs for 16, 17 and 18 October. Each tab lists matches by time, with sport, category, round, teams and ground. Filters: sport, category, department. Empty day shows "Fixtures will be announced soon".

**Results.** `/results` lists completed matches, newest first, filterable by sport, category and department, each with a clear winner highlight. A "last updated" time sits at the top.

**Gallery.** Responsive grid of the 8 photos, with a lightbox. Until photos are added, the placeholder reads "Photos from past editions coming soon".

**Contacts.** Coordinator cards, with tap-to-call and tap-to-email links.

**Doubts.** A button that opens `doubts_form_url` in a new tab. If empty, show "Coming soon".

**Leaderboard (conditional).** Hidden until a points system exists.

**Global.** Sticky minimal navbar, footer with Instagram link, DTU and Department branding, favicon, Open Graph image for link previews on WhatsApp.

## 6. Design direction

- Palette sampled from the poster: sky and royal blue, white, soft cream accent.
- One bold condensed display font for headings, one clean sans for body.
- Flat cards, thin borders, lots of whitespace, no stock sports clip art.
- DTU seal in the header only if the owner supplies the logo file.
- Touch targets at least 44px, contrast WCAG AA, visible focus states.

## 7. Build phases and timeline

The fest starts in four days, so the plan is compressed. Section 8 lists what blocks each step.

| Day | Goal | Deliverables |
| --- | --- | --- |
| Mon 12 Oct | Foundation | Next.js and Tailwind project, theme tokens, Sheets client with caching and zod validation, CSV template folder, owner imports the sheet |
| Tue 13 Oct | Core pages | Home, Sports, Teams, Schedule, Results, all with placeholder states working on an empty sheet |
| Wed 14 Oct | Data and content | Gallery with the 8 photos, Contacts, Doubts, Instagram link, owner fills departments and rosters, fix parsing issues |
| Thu 15 Oct | QA and launch | Full QA pass, mobile testing, deploy to Vercel, domain if any, dry run of result entry |
| Fri 16 Oct | Live | Site live before 8:30 AM, owner enters results as matches finish |
| Sat 17 to Sun 18 | Support | Fixes, schedule updates, leaderboard if points system arrives |

The launch bar for the 16th is: Home, Teams, Schedule, Results and Contacts working with live data. Everything else can arrive during the fest.

## 8. Remaining inputs and blockers

None of these blocks the code. Each one only blocks filling in content.

1. Departments list (paste into the Departments tab).
2. Per sport: which of Boys and Girls exist.
3. Whether a team is simply the department (for example "Mechanical, Boys") or has its own team name.
4. Whether you want an overall points leaderboard. If yes, the points per win, draw and placement.
5. The Drive link with the 8 photos (and captions if wanted).
6. Google Form link and Instagram link.
7. DTU or Department logo files, if you want them in the header. Otherwise the site uses text only.
8. Domain preference. Without one, launch on a free `vercel.app` address and add a domain later.
9. Who gets edit access to the sheet.

## 9. QA checklist

**Data safety**

- Site renders with a completely empty sheet.
- Each tab empty one at a time, nothing breaks.
- A malformed row is skipped and logged, other rows still show.
- Sheets API unreachable, last good data is served.
- Roll numbers keep leading zeros and slashes, no scientific notation.

**Functional**

- Teams page groups correctly by department, sport and category.
- Entering a winner moves a match from Schedule to Results within about 60 seconds.
- Boys and Girls tabs appear only when data exists.
- All external links open in a new tab and hide when empty.
- Countdown uses IST and stops at zero.

**Quality**

- Lighthouse 90+ on mobile for performance, accessibility and SEO.
- Tested on small Android, iPhone Safari and desktop Chrome.
- Large rosters (hundreds of rows) render quickly with search working.
- No console errors, no placeholder text such as "lorem ipsum" anywhere.

**Content integrity**

- Search the codebase to confirm no hardcoded team, player, score or contact data exists outside the template files.

## 10. Risks and mitigations

| Risk | Mitigation |
| --- | --- |
| Typos while entering results under time pressure | Dropdowns for IDs and winner, Check tab flags errors |
| Sheets API quota or outage | 60 second caching, serve last good data |
| Multiple people editing the same cells | Share edit access with as few people as possible, use sheet version history to recover |
| Poor network at the venue | Lightweight pages, static generation, no heavy images above the fold |
| Short timeline | Launch bar in section 7, everything else is incremental |

## 11. Handover

Antigravity should finish with a one-page `OWNER_GUIDE.md` explaining: how to import the template, how to enter a roster, how to enter a fixture, how to enter a result, how to change the Instagram or form link, and how to confirm the site updated.
