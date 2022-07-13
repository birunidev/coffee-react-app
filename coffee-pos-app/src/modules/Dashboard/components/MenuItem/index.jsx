import React from "react";
import { Link } from "react-router-dom";

export default function MenuItem({ active, title, link, icon }) {
  return (
    <li className="menu-item-wrapper">
      <Link
        to={link}
        className={[
          "menu-item w-[120px] w-full border-2 border-transparent text-center block p-[14px] rounded-xl",
          active
            ? "bg-primary-500 text-white"
            : "hover:bg-[#F2F2F2] text-[#A9A9A9]",
        ].join(" ")}
      >
        <div className="w-[38px] mx-auto text-center">{icon}</div>
        <p className="font-bold mt-2">{title}</p>
      </Link>
    </li>
  );
}
