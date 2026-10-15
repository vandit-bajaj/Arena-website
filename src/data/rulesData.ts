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
    rule_no: 1,
    title: 'Eligibility',
    description:
      'Only the regular students of DTU are eligible to participate in ARENA-2026.',
  },
  {
    rule_no: 2,
    title: 'University ID Card Verification',
    description:
      'All participants must produce their University ID Card whenever requested by the Organisers.',
  },
  {
    rule_no: 3,
    title: 'Strict Ban on Outside Players',
    description:
      'Playing with outside or invalid players is strictly prohibited and will attract disciplinary action, including disqualification of the concerned team/player.',
  },
  {
    rule_no: 4,
    title: 'Official Roster Adherence',
    description:
      'Teams shall play only those players as per the registered/published list.',
  },
  {
    rule_no: 5,
    title: 'Sports Attire',
    description:
      'All Players are recommended to wear the appropriate sports attire (preferably white or light-coloured T-shirts and comfortable sports shoes) suitable for the respective game.',
  },
  {
    rule_no: 6,
    title: '15-Minute Reporting & Walkover Rule',
    description:
      'Team/Player must report to the ground/court/board/table 15 minutes before the scheduled start time. Failure to report within 15 minutes of the scheduled time will result in disqualification and a walkover will be awarded to the opponent.',
  },
  {
    rule_no: 7,
    title: 'Fixed Match Scheduling',
    description:
      'No request for change of Slot and/or Date/Time shall be entertained.',
  },
  {
    rule_no: 8,
    title: 'Referee & Umpire Authority',
    description:
      'Decision of Umpire(s)/Referee(s) will be final. No player shall argue with the Umpire(s)/Referee(s) on their decision.',
  },
  {
    rule_no: 9,
    title: 'Knockout Tournament Format',
    description:
      'Matches shall be conducted on a knockout basis, unless otherwise specified for a particular event.',
  },
  {
    rule_no: 10,
    title: 'Squad Size & Reduced Quota',
    description:
      'The number of players in a team shall be as per the international rules of the respective game/sport unless otherwise specified for a particular sport/event. If the required number of players is not available at the scheduled time, the team may play with a reduced number of players, provided the minimum number required under the international rules of that game is met.',
  },
  {
    rule_no: 11,
    title: 'Minimum Players Threshold & Disqualification',
    description:
      'If a team fails to meet the minimum number of players required under the international rules of the respective sport at the scheduled time, the team shall be disqualified and the opposing team shall be awarded a walkover (bye).',
  },
  {
    rule_no: 12,
    title: 'ARENA Cup / Trophy',
    description:
      'The overall topper (based on cumulative points scored across all events) shall be awarded the ARENA Cup/Trophy.',
  },
  {
    rule_no: 13,
    title: 'Championship Points System',
    description:
      'Points System: Gold / 1st Position: 10 Points • Silver / 2nd Position: 7 Points • Bronze / 3rd Position: 5 Points.',
  },
  {
    rule_no: 14,
    title: 'Tie in Championship Points',
    description:
      'In case of a tie in the total points for the ARENA Cup/Trophy, the Cup/Trophy shall be shared.',
  },
  {
    rule_no: 15,
    title: 'Dispute Resolution & Final Authority',
    description:
      'In case of any dispute, discrepancy, clash or conflict, the decision taken by the Organisers shall be final.',
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
        { stage: 'Final (Men)', detail: '15 overs per innings' },
        { stage: 'Semifinals & Final (Women)', detail: '10 overs (or as decided by organisers)' },
      ],
    },
    rules: [
      'Matches shall be played according to the ICC rules in force, as adopted from time to time by the Board of Control for Cricket in India (BCCI), unless otherwise modified by the Organisers.',
      'All matches shall be conducted on a knockout basis. Each side is allowed to complete the specified number of overs unless the opposing team is dismissed earlier.',
      'Each bowler may bowl a maximum of 2 overs in an 8-over match, 2 overs in a 10-over match, and 3 overs in a 15-over match.',
      'The bowling team will be given appropriate time to complete its quota of overs (approximately 30-35 minutes for 8 overs, 40-45 minutes for 10 overs, and 60-70 minutes for 15 overs).',
      'No spike shoes will be allowed on the turf or pitch.',
      'In case of a tie, a Super Over will be played to determine the winner.',
      'The umpires are empowered to rearrange the number of overs in the event of a delayed start or interruption. The number of overs for the team batting second will not be reduced if the team batting first has been dismissed in fewer than the agreed number of overs.',
    ],
  },
  {
    sport_id: 'football',
    name: 'Football',
    governingBody: 'FIFA / AIFF',
    format: {
      men: 'League & Quarterfinals: 25 minutes + 25 minutes (with 10-minutes break) | Semifinals: 30 minutes + 30 minutes (with 10-minutes break) | Final: 35 minutes + 35 minutes (with 15-minute break)',
      women: '15 minutes + 15 minutes (with 7-minutes break)',
    },
    rules: [
      'Matches shall be played according to the rules of FIFA as adopted from time to time by the All-India Football Federation, unless otherwise modified.',
      'In the event of a draw at the end of a knockout match, penalty shootout will take place.',
      'A maximum of four substitutions per match will be allowed.',
      'Kick-offs will be taken from the halfway line.',
      'Goalkeepers may pass the ball out with their feet or throw it with their hands. Goalkeepers cannot pick up a ball passed by a teammate, and must release the ball within 6 seconds.',
      'Serious foul play will be punishable by yellow and red cards.',
      'The referee\'s on-field decision is final. Any dissent, verbal abuse, or physical altercations with match officials or opponents will result in immediate disqualification of the player or team from the tournament.',
    ],
  },
  {
    sport_id: 'basketball',
    name: 'Basketball',
    governingBody: 'FIBA / BFI',
    format: {
      rounds: [
        { stage: 'League Knockouts, Quarters & Semifinals (Men & Women)', detail: '10 + 10 Minutes' },
        { stage: 'Finals (Men & Women)', detail: '15 + 15 Minutes' },
      ],
    },
    rules: [
      'Matches shall be played according to the rules of FIBA as adopted from time to time by the All-India Basketball Federation unless otherwise modified.',
      'Each team can have a maximum of 5 players on the court at any one time. Substitutions can be made as many times as they wish within the game.',
      'The ball can only be moved by either dribbling (bouncing the ball) or passing the ball. Once a player puts two hands on the ball (not including catching the ball) they cannot then dribble or move with the ball and the ball must be passed or shot.',
      '10-Second Rule: After the ball goes into a team’s half and they win possession back, the ball must then make it back over the halfway line within 10 seconds. If the ball fails to do so then a foul will be called and the ball will be turned over.',
      '24-Second Shot Clock: Each team has 24 seconds to at least shoot at the basket. A shot constitutes either going in the basket or hitting the rim of the basket. If after the shot is taken and the ball fails to go in the basket then the shot clock is restarted for another 24 seconds.',
      'Offence & Defence: The team trying to score a basket is called the offence whilst the team trying to prevent them from scoring is called the defence. The defence must do all they can to stop the offence from scoring by either blocking a shot or preventing a shot from being fired.',
      'Possession Turnover: After each successful basket the ball is then turned over to the opposition.',
      'Accumulated Fouls & Free Throws: Fouls committed throughout the game will be accumulated and then when reached a certain number will eventually be awarded as a free throw. A free throw involves one player from the offensive team (the player fouled) to take a shot unopposed from the free throw line. Depending on where the foul was committed will depend on the number of free throws a player gets.',
      'Violations: Include travelling (taking more than one step without bouncing the ball), double dribble (picking the ball up dribbling, stopping then dribbling again with two hands), goaltending (a defensive player interferes with the ball travelling downwards towards the basket), and backcourt violation (once the ball passes the halfway line the offensive team cannot take the ball back over the halfway line).',
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
      'Each team may hit the ball a maximum of three times before returning it.',
      'Violations include stepping over the baseline on serve, carrying/palming the ball, touching the net, and reaching over the net.',
    ],
  },
  {
    sport_id: 'kabaddi',
    name: 'Kabaddi',
    governingBody: 'IKF / AKFI',
    format: {
      men: 'League & Semifinals: 7 minutes + 7 minutes (2-minutes break) | Final: 10 minutes + 10 minutes (2-minutes break)',
      women: 'League & Semifinals: 5 minutes + 5 minutes (2-minutes break) | Final: 7 minutes + 7 minutes (2-minutes break)',
    },
    rules: [
      'Matches shall be played according to the rules of the International Kabaddi Federation (IKF) as adopted by the All-India Kabaddi Federation, unless otherwise modified.',
      'Each team shall consist of no more than 12 players, with only 7 taking the field at any one time.',
      'At the start of the match, a coin toss will determine which team raids first. In the second half, the team that did not raid first will begin with a raid.',
      'To score a point, the raider must take a breath, enter the opposition’s half, tag one or more opponents, and return to their own half before inhaling again, while continuously chanting "Kabaddi".',
      'Defenders may score a point by preventing the raider from returning after a tag. Raiders may only be grabbed by limbs or torso.',
      'The team with the most points at the end of the match is declared the winner.',
    ],
  },
  {
    sport_id: 'lawn-tennis',
    name: 'Lawn Tennis',
    governingBody: 'ITF / AITA',
    format: {
      rounds: [
        { stage: 'League Knockouts (Men & Women)', detail: '1 set (4 points)' },
        { stage: 'Semifinals (Men & Women)', detail: '1 set (6 points)' },
        { stage: 'Finals (Men & Women)', detail: 'Best of 3 sets (4 points each)' },
      ],
    },
    rules: [
      'The game starts with a coin toss to determine which player must serve first and which side they want to serve from.',
      'The server must then serve each point from alternative sides on the baseline. At no point must the server’s feet move in front of the baseline on the court prior to hitting their serve.',
      'If the server fails to get their first serve in, they may take advantage of a second serve. If they again fail to get their second serve in then a double fault will be called and the point lost.',
      'If the server clips the net but the ball goes in the service area still then let is called and they get to take that serve again without penalty. If the ball hits the net and fails to go in the service area then out is called and they lose that serve.',
      'The receiver may stand where they wish upon receipt of the serve. If the ball is struck without the serve bouncing then the server will receive the point.',
      'Once a serve has been made the number of shots between the players can be unlimited. The point is won by hitting the ball so the opponent fails to return it in the scoring areas.',
      'If a player touches the net, distracts his opponent or impedes in anyway then they automatically lose the point.',
      'The ball can hit any part of the line for the point to be called in, outside the line and the ball is out.',
      'The balls in a tennis match are changed for new balls every 6 games.',
      'A player loses a point if they fail to return the ball in either the correct areas on the court, hits the net and doesn’t go into opponent’s area or fails to return the ball before it bounces twice in their half.',
    ],
  },
  {
    sport_id: 'badminton',
    name: 'Badminton',
    governingBody: 'BWF / DTU Department of Physical Education',
    format: {
      rounds: [
        { stage: 'Knockout Matches (Men & Women)', detail: '1 Game (11 points each)' },
        { stage: 'Quarterfinals and Semifinals', detail: '1 Game (21 points each)' },
        { stage: 'Finals (Men)', detail: 'Best of 3 Games (21 points each)' },
        { stage: 'Finals (Women)', detail: 'Best of 3 Games (11 points each)' },
      ],
      general: 'Format of Match: Singles & Doubles (Men & Women). Venue: Indoor Badminton Hall.',
    },
    rules: [
      'Standard BWF rules will be followed unless otherwise modified.',
      'A point is scored when the shuttlecock lands within the opponent’s court. If it hits the net and fails to cross, or lands out, the point goes to the opponent.',
      'Serves must be underarm, below the waist, and diagonally across. There are no second serves.',
      'Touching the net, deliberate distraction, or continuous rule violations may result in loss of points or forfeiture.',
      'Non-marking sports shoes are strictly mandatory inside the Indoor Badminton Hall.',
      '15-Minute Rule: Players not ready within 15 minutes of being called will forfeit the match.',
    ],
  },
  {
    sport_id: 'chess',
    name: 'Chess',
    governingBody: 'FIDE / AICF',
    format: {
      rounds: [
        { stage: 'Knock outs (Men & Women)', detail: 'Points Scored in 10 Minutes' },
        { stage: 'Semifinals and Finals (Men & Women)', detail: 'Points Scored in 15 Minutes' },
      ],
    },
    rules: [
      'White is always first to move and players take turns alternately moving one piece at a time.',
      'Movement is required. If a player’s turn is to move, he is not in check but has no legal moves, this situation is called "Stalemate" and it ends the game in a draw.',
      'Each type of piece has its own method of movement.',
      'A piece may be moved to another position or may capture an opponent’s piece, replacing on its square (en passant being the only exception).',
      'With the exception of the knight, a piece may not move over or through any of the other pieces.',
      'When a king is threatened with capture (but can protect himself or escape), it’s called check.',
      'If a king is in check, then the player must make a move that eliminates the threat of capture and cannot leave the king in check.',
      'Checkmate happens when a king is placed in check and there is no legal move to escape.',
      'Checkmate ends the game and the side whose king was checkmated loses.',
    ],
  },
  {
    sport_id: 'table-tennis',
    name: 'Table Tennis',
    governingBody: 'ITTF / TTFI',
    format: {
      rounds: [
        { stage: 'Knockout (Singles & Doubles)', detail: '1 Game (11 points)' },
        { stage: 'Quarterfinals and Semifinals', detail: '1 Game (21 points)' },
        { stage: 'Finals (Men)', detail: 'Best of 3 Games (21 points each)' },
        { stage: 'Finals (Women)', detail: 'Best of 3 Games (11 points each)' },
      ],
      general: 'Format of Match: Singles & Doubles (Men & Women).',
    },
    rules: [
      'The toss of a coin or another form of lot-drawing determines which of the players shall serve first.',
      'Each table tennis player serves twice in turn and serves must be made from an open palm, the ball tossed six inches then struck so it bounces on the service side, clears the net, then bounces on the receiver’s side.',
      'Points are decided as described above and games must be won by two clear points.',
      'After each game the players rotate both the end of the table from which they are playing as well as who serves and receives the ball first.',
      'In the deciding game of a match the players swap ends after either player reaches five points.',
    ],
  },
  {
    sport_id: 'carrom',
    name: 'Carrom',
    governingBody: 'All India Carrom Federation',
    format: {
      rounds: [
        { stage: 'Knockout (Men & Women)', detail: 'First to 5 coins + Queen, or points scored in 10 minutes (whichever is earlier)' },
        { stage: 'Semifinals & Final', detail: 'Board clear' },
      ],
    },
    rules: [
      'For the very first turn, the player is allowed three attempts to "break" i.e. disturb the central group of counters.',
      'It doesn\'t matter which piece the striker hits first and it doesn\'t matter if the striker hits no pieces.',
      'If the striker pockets the Queen and/or one or more pieces of their own colour, the player retrieves the striker and takes another strike. If the player pockets no pieces or commits a foul, the turn finishes.',
      'Pieces returned to the centre can be placed on top of other pieces within the main circle.',
      'If pieces come to rest standing on their edge or overlapping another piece, they are left as they are until moved again in the normal course of play.',
      'If the striker comes to rest under another piece, the striker should be removed with as little disturbance to the covering piece as possible.',
      'Sport-specific rules may be further modified by the Organisers. In case of any dispute, the decision of the Organising Committee / Umpires shall be final.',
    ],
    subsections: [
      {
        title: 'Striking Rules',
        items: [
          'For each strike, the player must position the striker within the baseline OR on one of the two circles at either end of the baseline.',
          'A striker within the baseline must touch both the front line and the rear line.',
          'The striker may not "cut the moon" - be placed partially within the baseline and partially within the circle.',
          'The player must flick the striker with one finger so that it crosses the front baseline - it is not permitted to flick backwards or horizontally.',
          'A piece that is on or behind the front baseline must not be struck by the striker until the striker has crossed the front baseline.',
          'In striking, the player\'s hand or arm must not cross the diagonal foul lines at either end of the baseline.',
        ],
      },
      {
        title: 'Covering the Queen',
        items: [
          'A player may only pocket and cover the Queen if that player has already pocketed at least one piece of that player\'s colour.',
          'Should a player pocket the Queen before being permitted to cover it, the turn continues but the Queen is returned to the centre at the end of the turn.',
          'If a player pockets the Queen and one of her own pieces in the same turn, this counts and that player has covered the Queen. Such a player must have already pocketed at least one piece in order to cover the Queen as per normal.',
          'When a player pockets the Queen but does not cover it, the Queen is returned as near as possible to the centre circle by the opponent.',
        ],
      },
      {
        title: 'Fouls & Penalties',
        items: [
          'When a player commits a foul, the turn comes to an end immediately and a penalty is incurred: one pocketed piece is returned to the board by the opponent anywhere within the main circle.',
          'The striker is pocketed.',
          'The striker or any other piece leaves the board.',
          'A player pockets an opponent\'s piece. If the Queen was also pocketed, it is returned to the centre by the opponent together with the penalty piece. Any other pieces pocketed in the same strike remain pocketed.',
          'A player pockets the final opponent\'s piece. Regardless of whether the Queen has been covered, the opponent\'s piece is returned to the centre in addition to the penalty piece.',
          'A player pockets the final piece before the Queen has been covered. In this case both the pocketed piece and a penalty piece are returned to the centre.',
          'A player contravenes the rules for striking.',
          'A player touches any piece in play, other than the striker.',
          'The first player to strike fails to break the counters in three attempts.',
          'Where a penalty is incurred but no pocketed pieces exist to return, the penalty is "owed" until a piece becomes available due to being pocketed.',
        ],
      },
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
