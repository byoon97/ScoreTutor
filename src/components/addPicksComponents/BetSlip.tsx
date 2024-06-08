"use client";
import { Pick } from "@/types";
import React from "react";
import { gql, useMutation, useQuery } from "@apollo/client";
import toast, { Toaster } from "react-hot-toast";
import BetSlipPick from "./BetSlipPick";

const CreatePickMutation = gql`
  mutation createPick(
    $homeTeam: String!
    $awayTeam: String!
    $homeTeamLogo: String!
    $awayTeamLogo: String!
    $pick: String!
    $unit: Float!
    $startTime: String!
    $result: String!
    $eventId: String!
    $status: String!
    $toWin: Float!
    $leagueLogo: String!
  ) {
    createPick(
      homeTeam: $homeTeam
      awayTeam: $awayTeam
      homeTeamLogo: $homeTeamLogo
      awayTeamLogo: $awayTeamLogo
      pick: $pick
      unit: $unit
      startTime: $startTime
      result: $result
      eventId: $eventId
      status: $status
      toWin: $toWin
      leagueLogo: $leagueLogo
    ) {
      homeTeam
      awayTeam
      homeTeamLogo
      awayTeamLogo
      pick
      unit
      startTime
      result
      eventId
      status
      toWin
      leagueLogo
    }
  }
`;

type BetSlipProps = {
  betSlip: Pick[];
  setBetSlip: React.Dispatch<React.SetStateAction<Pick[]>>;
};

const mobileView = "w-screen";

const BetSlip: React.FC<BetSlipProps> = ({ betSlip, setBetSlip }) => {
  const [opened, setOpen] = React.useState<boolean>(false);
  const [createPick, { data: createdPick, loading, error }] =
    useMutation(CreatePickMutation);

  const updateBetAtIndex = (id: string, wager: number, newToWin: number) => {
    setBetSlip((prevBets: Pick[]) => {
      const newBets = [...prevBets];
      const index = newBets.findIndex((bet) => bet.eventId === id);
      if (index !== -1) {
        newBets[index] = { ...newBets[index], unit: wager, toWin: newToWin };
      }
      return newBets;
    });
  };

  const removeBetById = (id: string) => {
    setBetSlip((prevBets) => prevBets.filter((bet) => bet.eventId !== id));
  };

  const baseClasses =
    "flex flex-col sticky bottom-0 mt-[15%] bg-gray-300 mx-2 rounded-lg overflow-y-scroll overflow-x-hidden text-black transition-transform duration-300 no-scrollbar";

  // Dynamically generate class names based on the open prop
  const mobileView = `${baseClasses} ${
    opened ? "translate-y-[-5%] h-full" : "translate-y-[-80%] h-[3em]"
  }`;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    createPickFunction();
  };

  const createPickFunction = async () => {
    try {
      betSlip.forEach(async (bet: Pick) => {
        const variables = { ...bet };
        console.log(variables);
        await toast.promise(createPick({ variables }), {
          loading: "Creating Picks...",
          success: (result) => {
            return "Picks successfully created! 🎉";
          },
          error: (error) => {
            return `Something went wrong 😥 Please try again - ${error.message}`;
          },
        });
      });
      setBetSlip([]);
      setOpen(!opened);
    } catch (error) {
      console.log(error);
      toast.error("Error has occured");
    }
  };

  return (
    <div
      className={mobileView}
      style={{
        transform: opened ? "translateY(-5%)" : "translateY(-80%)",
      }}
    >
      {!opened ? (
        <div onClick={() => setOpen(!opened)}>{betSlip.length} Picks</div>
      ) : (
        <div onClick={() => setOpen(!opened)}>Opened</div>
      )}
      {opened && (
        <div className="h-full border-box">
          {betSlip.map((pick: Pick, idx) => (
            <BetSlipPick
              key={idx}
              pick={pick}
              setBetSlip={setBetSlip}
              updateBetAtIndex={updateBetAtIndex}
              removeBetById={removeBetById}
            />
          ))}
          <div className="m-2">
            <button
              className="bg-[#2EA636] w-full text-center font-bold p-2 text-white"
              onClick={handleSubmit}
            >
              Submit Picks
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BetSlip;
