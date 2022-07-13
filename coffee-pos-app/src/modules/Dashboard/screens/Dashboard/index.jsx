import {
  DashboardLayout,
  DashboardStat,
  EarningChart,
  PageTitle,
} from "modules/Dashboard/components";
import React, { useEffect } from "react";
import {
  ClipboardListIcon,
  CollectionIcon,
  UsersIcon,
} from "@heroicons/react/outline";
import ApiClient from "lib/Api/Client";

export default function Dashboard() {
  return (
    <DashboardLayout activePage="Home">
      <PageTitle />
      <div className="mt-4 bg-white p-[30px] rounded-xl">
        <div className="grid xl:grid-cols-4 gap-y-4 gap-x-4">
          <DashboardStat
            label="All Orders"
            value="40 Bills"
            type="blue"
            icon={<ClipboardListIcon />}
          />
          <DashboardStat
            label="All Products"
            value="9 Variants"
            type="green"
            icon={<CollectionIcon />}
          />
          <DashboardStat
            label="All Employees"
            value="20 People"
            type="yellow"
            icon={<UsersIcon />}
          />
          <DashboardStat
            label="Earnings"
            value="Rp 39,000,000"
            type="red"
            icon={<CollectionIcon />}
          />
        </div>
        <div className="mt-10">
          <p className="font-bold text-2xl">Earning Statistics</p>
          <EarningChart />
        </div>
      </div>
    </DashboardLayout>
  );
}
