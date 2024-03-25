export type GamePick = {
    id: number,
    when: string,
    awayTeam: string,
    homeTeam: string,
    awayTeamLogo: string,
    homeTeamLogo: string,
    logo: string,
    spread: string,
    total: string
}

export const picks:GamePick[] = [
    {   id: 0,
        when: 'March 7th, 7:10 pm EST',
        awayTeam: 'MIN Timberwolves',
        homeTeam: 'IND Pacers',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/minnesota_timberwolves.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/indiana_pacers.png',
        logo: '/sportsLogos/NBA.png',
        spread: 'Pacers -1.5',
        total: '225.5'
    },
    { 
        id: 1,
        when: 'March 7th, 7:30 pm EST',
        awayTeam: 'UTA Jazz',
        homeTeam: 'BKN Nets',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png',
        logo: '/sportsLogos/NBA.png',
        spread: 'Jazz -2.5',
        total: '208.5'
    },
]