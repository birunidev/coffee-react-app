import React from "react";

export default function DashboardStat({ type = "blue", value, label, icon }) {
  let iconColor = "#0065C6";
  let bgIconColor = "#E1F0FF";
  let bgColor = "#CDE7FF";

  switch (type) {
    case "green":
      iconColor = "#007042";
      bgIconColor = "#F2FFFA";
      bgColor = "#E2FAF0";
      break;
    case "yellow":
      iconColor = "#B08869";
      bgIconColor = "#FFF4E5";
      bgColor = "#FFECD3";
      break;
    case "red":
      iconColor = "#AA3C30";
      bgIconColor = "#FFE5E2";
      bgColor = "#FFD9D4";
      break;

    default:
      break;
  }

  return (
    <div
      className={`dashboard-stat flex items-center p-[27px] rounded-xl`}
      style={{ background: bgColor }}
    >
      <div
        className={`w-[60px] icon rounded-xl mr-4`}
        style={{ color: iconColor, background: bgIconColor }}
      >
        <div className="w-[60px] p-[12px]">{icon}</div>
      </div>
      <div>
        <p>{label}</p>
        <p className="font-bold text-2xl">{value}</p>
      </div>
    </div>
  );
}
