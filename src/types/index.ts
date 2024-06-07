import { Membership, Role } from "@prisma/client"

export type UserProps = {
    email : string
    firstName: string
    lastName: string
    role: Role
    phoneNumber: string
    bankroll: number
    unitSize: number
    membership: Membership
}

export interface event {
    eventid: string;
    lines: {
      moneyline: {
        moneyline_away: number;
        moneyline_home: number;
      };
      spread: {
        point_spread_away: number;
        point_spread_away_odds: number;
        point_spread_home: number;
        point_spread_home_odds: number;
      };
      total: {
        total_over: number;
        total_over_odds: number;
        total_under: number;
        total_under_odds: number;
      };
    };
    schedule: {
      event_name: string
    };
    sportid: number;
    teams: team[]
  };

  interface team {
    name: string
    teamLogo: string
}

export interface Pick {
    homeTeam: string
    awayTeam: string
    homeTeamLogo: string
    awayTeamLogo: string
    pick: string
    unit: number
    startTime: string
    result: string
    eventId: string
}