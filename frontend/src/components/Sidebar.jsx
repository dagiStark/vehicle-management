import  { useState } from "react";
import { Link } from "react-router-dom";

import { navItems } from "../constants";

function Sidebar() {
  const [currentItem, setCurrentItem] = useState("overview");

  return (
    <div className="w-[15%] h-[100vh] bg-[#022213] pl-6 pt-3 rounded-l-2xl">
      <div>
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-5 mt-5">
        <h2 className="text-white/60">General</h2>
        <ul className="flex flex-col gap-5">
          {navItems.map((item) => (
            <li
              key={item.name}
              className="text-white/60 flex gap-2 items-center justify-start"
              onClick={() => setCurrentItem(item.path)}
            >
              <item.icon
                className={`${currentItem === item.path && "text-[#adde33]"}`}
              />
              <Link
                to={item.path}
                className={`${currentItem === item.path && "text-white"}`}
              >
                {item.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
