import React from "react";

const Parlays = () => {
  return (
    <div className="mt-2 text-gray-700">
      <p>
        <strong className="text-black border-b-[1px] border-black mb-2">
          Why Parlays Are Bad
        </strong>{" "}
        Parlays should not be seen as an opportunity but rather a high-risk
        come-up.
      </p>
      <div className="w-full h-2"></div>
      <p>
        <strong className="text-black border-b-[1px] border-black mb-2">
          High Risk
        </strong>
        <div className="w-full h-2"></div>
        <ul>
          <li>
            Parlays involve combining multiple bets into one, increasing the
            risk significantly.
          </li>
          <div className="w-full h-2"></div>
          <li>
            The chances of winning decrease as more bets are added to the
            parlay.
          </li>
        </ul>
      </p>
      <div className="w-full h-2"></div>
      <p>
        <strong className="text-black border-b-[1px] border-black mb-2">
          Bet Size
        </strong>
        <div className="w-full h-2"></div>
        <ul>
          <li>
            Only 1 unit should be placed on parlays to manage the high risk.
          </li>
          <div className="w-full h-2"></div>
          <li>
            Even though parlays can offer higher payouts, the risk doesn't
            justify betting more than 1 unit.
          </li>
        </ul>
      </p>
      <div className="w-full h-2"></div>
      <p>
        <strong className="text-black border-b-[1px] border-black mb-2">
          Endorsement
        </strong>
        <div className="w-full h-2"></div>
        <ul>
          <li>We only endorse parlays when we give them out.</li>
          <div className="w-full h-2"></div>
          <li>Parlays should have a maximum of 3 legs to limit the risk.</li>
        </ul>
      </p>
    </div>
  );
};

export default Parlays;
