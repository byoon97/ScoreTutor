import PicksList from "@/components/PicksPageComps/PicksList";
import { getDate } from "@/util/getDate";
import React from "react";

const UpdatePicks: React.FC = () => {
  return (
    <div className="bg-white text-black pt-6">
      <div className="text-center">
        {" "}
        <span className="text-3xl font-bold">Update Picks</span>
      </div>

      <PicksList page={"update"} />
    </div>
  );
};

export default UpdatePicks;
