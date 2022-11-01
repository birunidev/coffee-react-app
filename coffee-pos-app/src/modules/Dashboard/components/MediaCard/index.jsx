import { TrashIcon } from "@heroicons/react/outline";
import React, { useState } from "react";

export default function MediaCard({
  filename,
  type,
  size,
  imageUrl,
  handleMediaDelete,
  hasDelete = true,
}) {
  const [showDelete, setShowDelete] = useState(false);
  return (
    <div
      className="media-card  relative max-w-[300px] cursor-pointer"
      onMouseEnter={() => setShowDelete(true)}
      onMouseLeave={() => setShowDelete(false)}
    >
      <div className="h-[200px] overflow-hidden flex items-center justify-center ">
        <img src={imageUrl} className="w-full" alt="" />
      </div>
      <div className="flex items-center justify-between p-3">
        <div className="mr-2 text-left  ">
          <p className="font-bold mt-3">
            {filename.length > 15 ? filename.substr(0, 15) + "..." : filename}
          </p>
          <span>{size} KB</span>
        </div>
        <div className="px-2 py-3 bg-gray-100">{type}</div>
      </div>
      {hasDelete && showDelete && (
        <button
          onClick={handleMediaDelete}
          className="absolute bottom-[100px] right-[20px] bg-red-500 p-3 rounded-xl"
        >
          <TrashIcon className="w-[30px] text-white" />
        </button>
      )}
    </div>
  );
}
