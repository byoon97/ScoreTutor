import { NBAlogos, NFLlogos, NHLlogos, MLBlogos } from "../../public/SportsTeam";

export interface InputTeam {
  team_id: number;
  team_normalized_id: number;
  name: string;
  is_away: boolean;
  is_home: boolean;
}

export interface OutputTeam {
  teamLogo: string;
  name: string;
  is_away: boolean;
  is_home: boolean;
}

export interface InputObject {
  score: {
    event_status: string;
  };
  event_id: string;
  sport_id: number;
  teams: InputTeam[];
  schedule: any;
  lines: {
    [key: number]: {
      moneyline: {
        moneyline_away: number;
        moneyline_home: number;
      };
      spread: {
        point_spread_home_money: number;
        point_spread_away_money: number;
     
        point_spread_away: number;
    
        point_spread_home: number;
      };
      total: {
   
        total_over: number;
        total_over_money: number;
        total_under: number;
        total_under_money: number;
      };
    };
  };
}

export interface OutputObject {
  eventid: string;
  sportid: number;
  teams: OutputTeam[];
  schedule: any;
  lines: {
    [key: number]: any;
  };
}

export function mapObjects(inputArray: InputObject[]): OutputObject[] {
  return inputArray.map((inputObject) => {
    const {
      event_id,
      sport_id,
      teams,
      schedule,
      lines,
    } = inputObject;

    // Function to find the logo URL based on the team name and sportId
    const findTeamLogo = (teamName: string, currentSportId: number): [string, string] | undefined => {
      let logosArray: any[] = [];

      // Determine which logos array to use based on the sportId
      switch (currentSportId) {
        case 2:
          logosArray = NFLlogos;
          break;
        case 3:
          logosArray = MLBlogos;
          break;
        case 4:
          logosArray = NBAlogos;
          break;
        case 6:
          logosArray = NHLlogos;
          break;
        default:
          logosArray = [];
          break;
      }

    
      const foundTeam = logosArray.find((team) => team.team.includes(teamName.split(" ")[teamName.split(" ").length - 1]));
        
      return [foundTeam?.logo, foundTeam?.team];
    };

    const mappedTeams: OutputTeam[] = teams.map((team: InputTeam) => {
      const outputTeam: OutputTeam = {
        name: team.name,
        is_away: team.is_away,
        is_home: team.is_home,
        teamLogo: ""
      };

      // Check sportId and add teamLogo if conditions are met
      if ([2, 3, 4, 6].includes(sport_id)) {
        const teamData = findTeamLogo(team.name, sport_id);
        if (teamData) {
          outputTeam.teamLogo = teamData[0];
          outputTeam.name = teamData[1]
        }
      }

      return outputTeam;
    });

    const mappedLines: { [key: number]: any } = {};
    Object.keys(lines).forEach((key) => {
      const line = lines[parseInt(key, 10)];
      mappedLines[parseInt(key, 10)] = {
        moneyline: {
          moneyline_away: Math.round(line.moneyline.moneyline_away),
          moneyline_home: Math.round(line.moneyline.moneyline_home),
        },
        spread: {
          point_spread_away: line.spread.point_spread_away,
          point_spread_away_odds: Math.round(line.spread.point_spread_away_money),
          point_spread_home: line.spread.point_spread_home,
          point_spread_home_odds: Math.round(line.spread.point_spread_home_money),
        },
        total: {
          total_over: line.total.total_over,
          total_over_odds: Math.round(line.total.total_over_money),
          total_under: Math.round(line.total.total_over),
          total_under_odds: Math.round(line.total.total_under_money),
        },
      };
    });

    const outputObject: OutputObject = {
      eventid: event_id,
      sportid: sport_id,
      teams: mappedTeams,
      schedule: schedule,
      lines: mappedLines["19"],
    };

    return outputObject;
  });
}