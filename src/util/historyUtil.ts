type Picks = {
    result: string;
  };
  
 export  const calculateWinPercentage = (picks: Picks[]): string => {
    if (!picks || picks.length === 0) return '0%';
  
    // Filter out picks with the result 'Incomplete'
    const validPicks = picks.filter(pick => pick.result !== 'Incomplete');
  
    if (validPicks.length === 0) return '0%';
  
    const winCount = validPicks.filter(pick => pick.result === 'Win').length;
    const winPercentage = (winCount / validPicks.length) * 100;
  
    return `${Math.round(winPercentage * 100) / 100}%`; // Rounding to two decimal places and adding percent sign
  };
  