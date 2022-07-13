import React from "react";
import MediaLibraryModal from "../MediaLibraryModal";
import Sidebar from "../Sidebar";
import SidebarMobile from "../Sidebar/SidebarMobile";

export default function DashboardLayout({ children, activePage }) {
  return (
    <div>
      <Sidebar activePage={activePage} />
      <SidebarMobile />
      <div className="dashboard-content lg:ml-[210px] mt-4 pl-5 lg:pl-0 pr-5">
        {children}
      </div>
      <MediaLibraryModal />
    </div>
  );
}
