import Link from "next/link";
import React from "react";

const AdminPage: React.FC = () => {
  return (
    <div className="bg-white h-screen w-screen">
      <h1 className="text-center text-black pt-4 text-2xl">Admin Page</h1>
      <div className="tools text-black px-4">
        <h4 className="text-lg">Tools</h4>
        <ul>
          <Link href="/Admin/addPicks">
            <li>Add Picks</li>
          </Link>
          <Link href="/Admin/addPick">
            <li>Add Custom Picks</li>
          </Link>
          <Link href="/Admin/update_picks">
            <li>Update Picks</li>
          </Link>

          <li>Update User</li>
        </ul>
      </div>
    </div>
  );
};

export default AdminPage;
