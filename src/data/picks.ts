type GamePick = {
    when: string,
    awayTeam: string,
    homeTeam: string,
    awayTeamLogo: string,
    homeTeamLogo: string,
    logo: string,
}

export const picks:GamePick[] = [
    { 
        when: 'Feb 11 2024, 6:30 pm EST',
        awayTeam: 'SF 49ers',
        homeTeam: '@ KC Chiefs',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nfl/san_francisco_49ers.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nfl/kansas_city_chiefs.png',
        logo: '/sportsLogos/NFL.png',
    },
    { 
        when: 'Jan 29 2024, 7:30 pm EST',
        awayTeam: 'UTA Jazz',
        homeTeam: '@ BKN Nets',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/utah_jazz.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/brooklyn_nets.png',
        logo: '/sportsLogos/NBA.png',
    },
    { 
        when: 'Jan 29 2024, 7:00 pm EST',
        awayTeam: 'LA Clippers',
        homeTeam: '@ CLE Cavaliers',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/los_angeles_clippers.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/cleveland_cavaliers.png',
        logo: '/sportsLogos/NBA.png',
    },
    { 
        when: 'Jan 29 2024, 7:30 pm EST',
        awayTeam: 'MIL Bucks',
        homeTeam: '@ DEN Nuggets',
        awayTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/milwaukee_bucks.png',
        homeTeamLogo: 'https://assets.sportsbook.fanduel.com/images/team/nba/denver_nuggets.png',
        logo: '/sportsLogos/NBA.png',
    },
]