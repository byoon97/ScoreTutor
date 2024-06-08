import { Pick } from "@/types";
import { IoIosRemove } from "react-icons/io";
import React, { SetStateAction } from "react";

type BetSlipPickProps = {
  pick: Pick;
  setBetSlip: React.Dispatch<SetStateAction<Pick[]>>;
  updateBetAtIndex: (id: string, wager: number, newToWin: number) => void;
  removeBetById: (id: string) => void;
};

const BetSlipPick: React.FC<BetSlipPickProps> = ({
  pick,
  setBetSlip,
  updateBetAtIndex,
  removeBetById,
}) => {
  const [wager, setWager] = React.useState<number>(1);
  const [toWin, setToWin] = React.useState<number>(1);

  const calculateWinAmount = React.useCallback(
    (betAmount: number, odds: number): number => {
      if (odds > 0) {
        return (betAmount * odds) / 100;
      } else {
        return (betAmount * 100) / Math.abs(odds);
      }
    },
    []
  );

  //   calculating win based off wager upon rerenders
  React.useEffect(() => {
    const game = pick.pick.split(" ");
    const odds = Number(game[game.length - 1]);

    const newToWin = calculateWinAmount(wager, odds);
    setToWin(newToWin);

    if (pick.unit !== wager || pick.toWin !== newToWin) {
      updateBetAtIndex(pick.eventId, wager, newToWin);
    }
  }, [
    wager,
    pick.pick,
    calculateWinAmount,
    pick.eventId,
    pick.unit,
    pick.toWin,
    updateBetAtIndex,
  ]);

  const handleWagerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setWager(isNaN(value) ? 0 : value);
  };

  const handleRemoveClick = () => {
    removeBetById(pick.eventId);
  };

  return (
    <div className="border-t-[1px] border-gray-400 flex flex-row justify-between py-2 px-1">
      <div className="flex flex-col text-left justify-center">
        <div className="flex flex-row">
          <p
            className="flex justify-center items-center"
            onClick={handleRemoveClick}
          >
            <IoIosRemove />
          </p>
          <div className="font-bold text-[14px]">{pick.pick}</div>
        </div>
        <div className="text-[12px]  ">
          {pick.awayTeam} @ {pick.homeTeam}
        </div>
        <div className="text-[10px]  ">{pick.startTime}</div>
      </div>

      <div className="flex flex-col">
        <input
          className="border-[1px] border-gray-300 text-[10px] h-8 mb-1"
          type="number"
          placeholder="Units"
          onChange={handleWagerChange}
        />
        <p className="text-[12px]">
          to Win: {toWin !== null ? toWin.toFixed(2) + " Units" : ""}
        </p>
      </div>
    </div>
  );
};

export default BetSlipPick;
