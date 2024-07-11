import React from "react";
import "../../../app/css/ScrollingToolbar.css";
import { gql, useQuery } from "@apollo/client";
import { formatDate } from "@/util/getDate";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { getDataForMostRecent } from "@/util/chartUtil";

const GET_DAILY_UNITS = gql`
  query GetDailyUnits {
    getDailyUnits {
      id
      date
      netUnits
    }
  }
`;

type Unit = {
  id: number;
  date: Date;
  netUnits: number;
};

const lineItem =
  "text-sm item inline-block text-black border-r-4 border-[#66FCF1] h-14 flex items-center justify-center tracking-tight font-light text-[18px]";
const optionItem = "font-bold border-solid border-[2px] bg-white";

const ScrollingToolbar: React.FC = () => {
  const { loading: unitLoad, error: unitErr, data } = useQuery(GET_DAILY_UNITS);
  const [selectedPeriod, setSelectedPeriod] =
    React.useState<string>("Last Week");

  const handlePeriodChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPeriod(event.target.value);
  };

  if (unitLoad || unitErr) return null;

  const accumilatedUnitData = getDataForMostRecent(data.getDailyUnits);

  const items = data.getDailyUnits.map((u: Unit, idx: number) => (
    <div key={u.id} className={lineItem}>
      <div className="px-4 border-r-2 border-[#66FCF1] text-white h-8 flex items-center justify-center">
        {formatDate(u.date.toString())}
      </div>{" "}
      <div className="text-white">
        {u.netUnits.toString().split("")[0] === "-" ? (
          <div className="flex flex-row items-center justify-center">
            <div className="border-r-2  h-8 border-[#66FCF1] px-2 text-red-500 flex flex-row items-center justify-center">
              <IoIosArrowDown color={"red"} />
              {u.netUnits.toString().split("").slice(1).join("")}u
            </div>
            <div className=" border-[#66FCF1] px-4">
              {accumilatedUnitData[idx].toFixed(2)}u
            </div>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <div className="border-r-2 px-4  h-8 border-[#66FCF1]  text-green-500 flex flex-row items-center justify-center">
              <IoIosArrowUp color={"green"} />
              {u.netUnits.toFixed(2)}u
            </div>
            <div className=" border-[#66FCF1] px-4">
              {accumilatedUnitData[idx].toFixed(2)}u
            </div>
          </div>
        )}
      </div>
    </div>
  ));

  return (
    <div
      className="toolbar overflow-hidden whitespace-nowrap bg-[#0B0D10] flex items-center h-12 font-sans"
      onMouseEnter={() =>
        document.querySelector(".toolbar-content")?.classList.add("paused")
      }
      onMouseLeave={() =>
        document.querySelector(".toolbar-content")?.classList.remove("paused")
      }
    >
      <div className="relative text-left z-10 p-4 flex flex-row items-center justify-center bg-gray-100">
        <select
          value={selectedPeriod}
          onChange={handlePeriodChange}
          className="p-2 text-black leading-tight bg-[#66FCF1]"
        >
          <option>Last Week</option>
          <option>This Month</option>
          <option>This Year</option>
        </select>
      </div>

      <div className="toolbar-content ">
        {items}
        {items}
      </div>
    </div>
  );
};

export default ScrollingToolbar;
