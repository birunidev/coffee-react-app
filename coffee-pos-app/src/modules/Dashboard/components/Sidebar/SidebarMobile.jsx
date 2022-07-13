import { MenuIcon } from "@heroicons/react/solid";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import menus from "./data";

export default function SidebarMobile() {
  const [toggleMenu, setToggleMenu] = useState(false);

  const handleToggleMenu = () => {
    setToggleMenu(!toggleMenu);
  };

  return (
    <div className="sidebar-mobile bg-white lg:hidden">
      <div className="max-w-[90%] mx-auto">
        <div className="py-3 flex items-center justify-between">
          <img src="/assets/logo.png" className="w-[80px]" alt="" />
          <button
            className="text-primary-500 px-3"
            onClick={() => handleToggleMenu()}
          >
            <MenuIcon className="w-[50px]" />
          </button>
        </div>
        <div
          className={[
            "sidebar-mobile-menus pb-5 mt-4",
            toggleMenu ? "block" : "hidden",
          ].join(" ")}
        >
          <ul>
            {menus.map((menu, index) => {
              return (
                <li key={index}>
                  <Link to={menu.link} className="py-4 px-4 block ">
                    {menu.title}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
