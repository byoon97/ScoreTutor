export interface InputObject {
    event_id: string;
    sport_id: number;
    teams: any[];
    schedule: any;
    lines: {
      [key: number]: {
        moneyline: {
          moneyline_away: number;
          moneyline_home: number;
        };
        spread: {
          point_spread_away: number;
          point_spread_home: number;
        };
        total: {
          total_over: number;
          total_under: number;
        };
      };
    };
  }
  
export interface OutputObject {
    eventid: string;
    sportid: number;
    teams: any[];
    schedule: any;
    lines: {
      [key: number]: {
        moneyline: {
          moneyline_away: number;
          moneyline_home: number;
        };
        spread: {
          point_spread_away: number;
          point_spread_home: number;
        };
        total: {
          total_over: number;
          total_under: number;
        };
      };
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
  
      const mappedLines: { [key: number]: any } = {};
      Object.keys(lines).forEach((key) => {
        const line = lines[parseInt(key, 10)];
        mappedLines[parseInt(key, 10)] = {
          moneyline: {
            moneyline_away: line.moneyline.moneyline_away,
            moneyline_home: line.moneyline.moneyline_home,
          },
          spread: {
            point_spread_away: line.spread.point_spread_away,
            point_spread_home: line.spread.point_spread_home,
          },
          total: {
            total_over: line.total.total_over,
            total_under: line.total.total_under,
          },
        };
      });
  
      const outputObject: OutputObject = {
        eventid: event_id,
        sportid: sport_id,
        teams: teams,
        schedule: schedule,
        lines: mappedLines,
      };
  
      return outputObject;
    });
  }