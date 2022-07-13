import React from "react";
import { Link } from "react-router-dom";
export default function PageTitle({ hasButton, buttonHandler, buttonText }) {
  return (
    <div className="page-title w-full bg-white py-[27px] px-[37px] rounded-xl md:flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl text-primary-500">Home</h1>
        <ul className="mt-4 flex items-center">
          <li className="text-gray-400 mr-2">
            <Link to="/"> Home /</Link>
          </li>
          <li className="text-black">Dashboard</li>
        </ul>
      </div>
      {hasButton && (
        <button
          className="py-3 px-9 bg-primary-500 hover:bg-primary-600 text-lg font-bold text-white rounded-xl mt-10 md:mt-0"
          onClick={buttonHandler}
        >
          {buttonText}
        </button>
      )}
    </div>
  );
}
