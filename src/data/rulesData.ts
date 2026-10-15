export interface SportRule {
  sport_id: string;
  name: string;
  iconName?: string;
  governingBody?: string;
  format: {
    general?: string;
    men?: string;
    women?: string;
    rounds?: { stage: string; detail: string }[];
  };
  rules: string[];
  subsections?: {
    title: string;
    items: string[];
  }[];
}

export const GENERAL_RULES = [
  {
    title: 'Eligibility & ID Verification',
    description:
      'Only regular students of Delhi Technological University (DTU) are eligible to participate. All participants must produce their physical University ID Card whenever requested by the Organisers.',
  },
  {
    title: 'Strict Ban on Outside Players',
    description:
      'Playing with outside or invalid players is strictly prohibited and will attract severe disciplinary action, including immediate disqualification of the concerned team and player.',
  },
  {
    title: 'Official Roster Adherence',
    description:
      'Departments shall play only those players included in the officially registered and published team roster.',
  },
  {
    title: 'Recommended Sports Attire',
    description:
      'All players are recommended to wear appropriate sports attire (preferably white or light-coloured T-shirts and comfortable sports shoes) suitable for the respective discipline. Spike shoes are strictly prohibited in cricket.',
  },
  {
    title: '15-Minute Reporting & Walkover Rule',
    description:
      'Teams and players must report to the ground/court/board/table 15 minutes before the scheduled start time. Failure to report within 15 minutes of the scheduled time will result in disqualification, and an automatic walkover (bye) will be awarded to the opponent.',
  },
  {
    title: 'Fixed Match Scheduling',
    description:
      'No request for change of slot and/or date/time shall be entertained under any circumstances.',
  },
  {
    title: 'Referee & Umpire Authority',
    description:
      'The decision of the Umpire(s) and Referee(s) will be final and binding. No player or captain shall argue with match officials. Any dissent or unsporting conduct will lead to disqualification.',
  },
  {
    title: 'Knockout Tournament Format',
    description:
      'All matches shall be conducted on a knockout basis, unless otherwise specified by the Organisers for a particular event.',
  },
  {
    title: 'Squad Size & Minimum Quota',
    description:
      'The number of players shall follow the international rules of the respective sport. If the full quota is not present at match time, a team may play with reduced numbers provided the international minimum threshold is met. Otherwise, a walkover is awarded to the opponent.',
  },
  {
    title: 'Dispute Resolution',
    description:
      'In case of any dispute, discrepancy, clash, or conflict, the decision taken by the Arena Organising Committee shall be final and absolute.',
  },
];

export const POINTS_SYSTEM = {
  gold: { position: '1st Position (Gold)', points: 10, label: '10 Points' },
  silver: { position: '2nd Position (Silver)', points: 7, label: '7 Points' },
  bronze: { position: '3rd Position (Bronze)', points: 5, label: '5 Points' },
  trophy_note:
    'The overall department topper (based on cumulative points scored across all events) shall be awarded the prestigious ARENA Cup/Trophy. In case of a tie in total points, the trophy shall be shared.',
};

export const SPORT_RULES: SportRule[] = [
  {
    sport_id: 'cricket',
    name: 'Cricket',
    governingBody: 'ICC / BCCI',
    format: {
      rounds: [
        { stage: 'League & Quarterfinals (Men & Women)', detail: '8 overs per innings' },
        { stage: 'Semifinals (Men)', detail: '10 overs per innings' },
        { stage: 'Finals (Men)', detail: '15 overs per innings' },
        { stage: 'Semifinals & Finals (Women)', detail: '10 overs (or as decided by organisers)' },
      ],
    },
    rules: [
      'Matches shall be played according to ICC rules adopted by BCCI, unless modified by the Organisers.',
      'Conducted strictly on a knockout basis. Each side is allowed to complete the specified number of overs unless bowled out earlier.',
      'Over restrictions: Maximum 2 overs per bowler in an 8-over match, 2 overs in a 10-over match, and 3 overs in a 15-over match.',
      'Time limits: Approximately 30-35 mins for 8 overs, 40-45 mins for 10 overs, and 60-70 mins for 15 overs.',
      'Spike shoes are strictly prohibited on the turf / pitch.',
      'In case of a tie at the end of the overs, a Super Over will be played to decide the winner.',
      'Umpires are empowered to rearrange overs in the event of delayed start or interruption. Overs for the team batting second will not be reduced if the team batting first was bowled out in fewer overs.',
    ],
  },
  {
    sport_id: 'football',
    name: 'Football',
    governingBody: 'FIFA / AIFF',
    format: {
      men: 'League & Quarterfinals: 25m + 25m (10m break) | Semifinals: 30m + 30m (10m break) | Final: 35m + 35m (15m break)',
      women: '15m + 15m (with 7m break)',
    },
    rules: [
      'Matches shall follow FIFA rules adopted by the All-India Football Federation (AIFF).',
      'In the event of a draw at the end of regular time in knockout matches, a penalty shootout will immediately take place.',
      'A maximum of four substitutions per match will be allowed per team.',
      'Kick-offs will be taken from the center spot on the halfway line.',
      'Goalkeepers may pass out with feet or throw with hands. Goalkeepers cannot pick up an intentional backpass from a teammate, and must release the ball within 6 seconds.',
      'Serious foul play will be penalized with yellow and red cards. Two yellow cards in a match equal an automatic red card.',
      'The referee’s on-field decision is final. Dissent, verbal abuse, or physical altercations with match officials or opponents will result in immediate disqualification.',
    ],
  },
  {
    sport_id: 'basketball',
    name: 'Basketball',
    governingBody: 'FIBA / BFI',
    format: {
      general: 'Knockouts, Quarters & Semifinals: 10 + 10 Minutes | Finals: 15 + 15 Minutes (Men & Women)',
    },
    rules: [
      'Matches played according to FIBA rules as adopted by the Basketball Federation of India.',
      'Each team may have a maximum of 5 players on the court at any time. Rolling substitutions can be made unlimited times during play stoppages.',
      'Ball movement: The ball can only be advanced by dribbling or passing. Once a player puts two hands on the ball, they must pass or shoot.',
      'Violations: Double dribble, travelling, carrying, and backcourt violations will forfeit possession.',
      'Personal & Team Fouls: Illegal personal contact results in fouls. Bonus free throws awarded once team foul limits are exceeded.',
      'In case of a tie at regulation time, an overtime period of 5 minutes will be played.',
    ],
  },
  {
    sport_id: 'volleyball',
    name: 'Volleyball',
    governingBody: 'FIVB / VFI',
    format: {
      rounds: [
        { stage: 'League Knockouts (Men & Women)', detail: 'Single game of 15 points' },
        { stage: 'Semifinals (Men & Women)', detail: 'Single game of 25 points' },
        { stage: 'Finals (Men & Women)', detail: 'Best of 3 games (25 points each)' },
      ],
    },
    rules: [
      'Standard FIVB rules will be followed.',
      'Each team may hit the ball a maximum of three times before returning it across the net.',
      'Violations include stepping over the service line while serving, carrying or palming the ball, touching the net, and reaching over the net.',
      'Rally point scoring: A point is scored on every serve, regardless of which team served.',
    ],
  },
  {
    sport_id: 'kabaddi',
    name: 'Kabaddi',
    governingBody: 'IKF / AKFI',
    format: {
      men: 'League & Semifinals: 7m + 7m (2m break) | Final: 10m + 10m (2m break)',
      women: 'League & Semifinals: 5m + 5m (2m break) | Final: 7m + 7m (2m break)',
    },
    rules: [
      'Matches played according to International Kabaddi Federation (IKF) and Amateur Kabaddi Federation of India rules.',
      'Squad size: Maximum 12 players in the squad, with only 7 players taking the mat at any one time.',
      'Raid start: A coin toss determines who raids first. In the second half, the opposing team initiates the raid.',
      'Raiding mechanics: The raider must take a continuous breath, enter the opponent’s half, tag one or more defenders, and return across the midline before inhaling, chanting “Kabaddi” continuously.',
      'Tackling: Defenders score by restraining the raider within their half. Raiders may only be held by limbs or torso (no collar/hair pulling).',
      'The department team with the most points at full-time is declared the winner.',
    ],
  },
  {
    sport_id: 'lawn-tennis',
    name: 'Lawn Tennis',
    governingBody: 'ITF / AITA',
    format: {
      rounds: [
        { stage: 'League Knockouts (Men & Women)', detail: '1 set of 4 points' },
        { stage: 'Semifinals (Men & Women)', detail: '1 set of 6 points' },
        { stage: 'Finals (Men & Women)', detail: 'Best of 3 sets (4 points each)' },
      ],
    },
    rules: [
      'Coin toss determines initial server and court side choice.',
      'Servers serve from alternate sides behind the baseline. Feet must not cross the baseline prior to racket contact (foot fault).',
      'Second serve allowed if first serve fails. Double fault awards the point to receiver.',
      'Let serve: If the serve clips the net cord and lands in the service box, a let is called and the serve is retaken without penalty.',
      'Receiver may stand anywhere. If struck by the ball on the full before bouncing, the server wins the point.',
      'Touching the net, deliberately distracting the opponent, or impeding movement automatically forfeits the point.',
      'Line calls: The ball is IN if it touches any part of the boundary line.',
      'Tennis balls are refreshed every 6 games during tournament progression.',
    ],
  },
  {
    sport_id: 'badminton',
    name: 'Badminton',
    governingBody: 'BWF / Physical Education Dept DTU',
    format: {
      rounds: [
        { stage: 'Earlier Rounds (Through Round of 16)', detail: '1 Game to 21 points (Golden point at 29–29: 30th point wins)' },
        { stage: 'Quarterfinals, Semifinals & Finals', detail: 'Best of 3 Games (15 points each, Golden point at 20–20: 21st point wins)' },
      ],
      general: 'Venue: Indoor Badminton Hall | Events: Men’s Singles, Women’s Singles, Men’s Doubles, Women’s Doubles. Each participant may enter max 1 singles & 1 doubles event (both doubles partners must be from same department).',
    },
    rules: [
      'Matches follow BWF Laws of Badminton under the DTU Department of Physical Education.',
      'Rally point scoring applies in every round (a point is awarded after each rally). Must win by 2 clear points.',
      'Intervals: Up to 60 seconds at 11 points (earlier rounds) or at 8 points (quarterfinals onward). Up to 2 minutes rest between games.',
      'End switching: Players change ends after each game, and in a deciding third game, when the leading player/pair reaches 8 points.',
      'Warm-up & Toss: Toss winner selects serve, receive, or end. Warm-up is strictly limited to 2 minutes.',
      'Mandatory Footwear: Non-marking sports shoes are strictly mandatory inside the Indoor Badminton Hall.',
      'Service: Must be hit underarm below the waist diagonally across the net. No second serves are permitted.',
      '15-Minute Rule: Players not ready within 15 minutes of being called will forfeit the match. Brief medical break permitted for illness/injury.',
    ],
  },
  {
    sport_id: 'chess',
    name: 'Chess',
    governingBody: 'FIDE / AICF',
    format: {
      rounds: [
        { stage: 'Knockouts (Men & Women)', detail: 'Points scored in 10 minutes (Rapid/Blitz timer)' },
        { stage: 'Semifinals & Finals (Men & Women)', detail: 'Points scored in 15 minutes' },
      ],
    },
    rules: [
      'White moves first; players alternate one legal move at a time.',
      'Touch-move rule in effect: A touched piece must be moved if a legal move exists.',
      'Stalemate: If a player on turn is not in check but has no legal move, the game ends in a draw.',
      'No piece other than the Knight may move over or through other pieces.',
      'Check & Checkmate: When a King is attacked, it must escape, block, or capture. Checkmate ends the match immediately in a win.',
      'Flag fall: If a player runs out of clock time before checkmate or stalemate, they lose the game on time.',
    ],
  },
  {
    sport_id: 'table-tennis',
    name: 'Table Tennis',
    governingBody: 'ITTF / TTFI',
    format: {
      rounds: [
        { stage: 'Knockouts (Singles & Doubles)', detail: '1 Game of 11 points' },
        { stage: 'Quarterfinals & Semifinals', detail: '1 Game of 21 points' },
        { stage: 'Finals (Men)', detail: 'Best of 3 Games (21 points each)' },
        { stage: 'Finals (Women)', detail: 'Best of 3 Games (11 points each)' },
      ],
    },
    rules: [
      'A coin toss or lot-drawing determines initial server.',
      'Each player serves 2 consecutive points. Service must begin from an open, flat palm, thrown at least 6 inches upward, striking the server’s side before bouncing on the receiver’s court.',
      'Games must be won by at least 2 clear points (deuce rule).',
      'Players swap ends after each game. In the deciding set, players switch ends when either player reaches 5 points.',
    ],
  },
  {
    sport_id: 'carrom',
    name: 'Carrom',
    governingBody: 'All India Carrom Federation',
    format: {
      rounds: [
        { stage: 'Knockouts (Men & Women)', detail: 'First to 5 coins + Queen, or points scored in 10 minutes (whichever is earlier)' },
        { stage: 'Semifinals & Finals', detail: 'Complete board clearance' },
      ],
    },
    rules: [
      'For the very first turn, the opening player is allowed up to 3 attempts to break the central cluster of carrom men.',
      'Striking position: The striker must touch both the front and rear baseline, or rest completely on one of the outer baseline circles. "Cutting the moon" (partially in circle and baseline) is illegal.',
      'Flicking motion: Must flick the striker forward across the front baseline with one finger. Backward or horizontal flicks are strictly prohibited.',
      'Covering the Queen: A player may only pocket and cover the Queen if they have already pocketed at least one coin of their assigned color. A cover coin must follow immediately.',
      'Fouls & Penalties: Pocketing the striker, knocking pieces off the board, pocketing opponent’s piece, or touching pieces on board results in a foul. 1 penalty piece is returned to the center circle by the opponent.',
    ],
  },
  {
    sport_id: 'athletics',
    name: 'Athletics (Track & Field)',
    governingBody: 'World Athletics / AFI',
    format: {
      general: 'Track & Field individual events conducted at the DTU Main Athletics Track per official festival schedule.',
    },
    rules: [
      'Events include Sprints (100m, 200m, 400m), Middle Distance (800m, 1500m), Relay (4x100m, 4x400m), Shot Put, Long Jump, and High Jump.',
      'False start rule: Any competitor responsible for a false start in sprint heats is disqualified.',
      'Chest numbers / bibs issued by the DTU Athletics committee must be worn visibly.',
      'Points scored in athletics finals contribute directly to the department’s overall ARENA Cup championship points.',
    ],
  },
  {
    sport_id: 'powerlifting',
    name: 'Powerlifting',
    governingBody: 'IPF / DTU Sports Council',
    format: {
      general: 'Single Open Event on Friday, 16th October 2026 • Weigh-in: 10:00 AM • Lifting Commences: 12:00 PM at DTU Gymnasium.',
    },
    rules: [
      'The competition features three classic disciplines: Squat, Bench Press, and Deadlift.',
      'Mandatory Weigh-in: All participants must report to the DTU Gymnasium at 10:00 AM for official weigh-in and rack height verification. Failure to weigh in disqualifies the participant.',
      'Lifting Schedule: The competition officially commences at 12:00 PM.',
      'Three Attempts: Each competitor is granted 3 attempts for each discipline. The maximum successful weight lifted in each discipline counts toward the final total score.',
      'Judging & Commands: Lifters must strictly follow the head referee’s verbal and visual commands (e.g., "Squat" / "Rack", "Start" / "Press" / "Rack", "Down").',
      'Tie-Breaker: In the event of a tie in the total weight lifted, the competitor with the lower recorded body weight at weigh-in shall be declared the winner.',
      'Attire & Equipment: Standard athletic wear, non-supportive lifting belts, and approved wrist wraps are permitted. Supportive suits and knee wraps are strictly prohibited.',
      'All lifts will be judged by the official refereeing panel under standard IPF guidelines. The decisions of the panel are final and binding.',
    ],
  },
];
