export type sportsbooks = {
    id: number
    name: string
    promo: string
    code: string
    imageURL: string
    link: string
}

export const Sportsbook:sportsbooks[] = [
    {
        id: 0,
        name: 'FanDuel',
        promo: 'Bet $5, Get $200 in Bonus Bets if your first bet wins!',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/818/fanduel_2.svg',
        link: 'https://www.fanduel.com/best-promo-code'
    },
    {
        id: 1,
        name: 'BetMGM',
        promo: '$Up to 1,500 back in bonus bets',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/833/betmgm.png',
        link: 'https://promo.ny.betmgm.com/en/promo/sports/king-of-sportsbooks?wm=7117269'
    },
    {
        id: 2,
        name: 'Caesars Sportsbook',
        promo: 'If your first cash bet loses, you’ll get it back as a Bonus Bet – up to $1,000',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/20/caesars.svg',
        link: 'https://www.caesars.com/sportsbook-and-casino'
    },
    {
        id: 3,
        name: 'DraftKings',
        promo: 'Bet $5, Get $150',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/811/draft_kings.png',
        link: 'https://sportsbook.draftkings.com/sportsbook'
    },
    {
        id: 4,
        name: 'BetRivers',
        promo: '$100 2nd Chance Bet',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/836/betrivers.svg',
        link: 'https://ny.betrivers.com/?page=landing#home'
    },
    {
        id: 5,
        name: 'Fanatics',
        promo: '$Bet $100, Get $100 (10x)',
        code: 'No Code',
        imageURL: 'https://img.covers.com/betting/sportsbooks/142/fanatics.svg',
        link: 'https://sportsbook.fanatics.com/'
    },

]