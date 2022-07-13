import React from "react";

export default function Empty() {
  return (
    <div className="text-center h-full text-center w-full flex items-center justify-center">
      <div>
        <p className="text-2xl font-bold mb-3">No Media Added</p>
        <p className="text-gray-400">Upload new media now....</p>
      </div>
    </div>
  );
}
