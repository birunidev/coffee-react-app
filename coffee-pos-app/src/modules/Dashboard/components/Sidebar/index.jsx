import React from "react";
import MenuItem from "../MenuItem";
import menus from "./data";

export default function Sidebar({ activePage }) {
  console.log(activePage);
  return (
    <div className="sidebar hidden lg:block px-[38px] py-[20px] bg-white h-[100%] fixed top-0">
      <div className="logo w-[63px] mx-auto">
        <img src="/assets/logo.png" className="w-full" alt="" />
      </div>
      <div className="menu-items mt-[64px]">
        <ul className="grid grid-cols-1 gap-y-4">
          {menus.map((menu, index) => {
            return (
              <MenuItem
                key={index}
                active={activePage === menu.title}
                title={menu.title}
                icon={menu.icon}
                link={menu.link}
              />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
