import React from "react";

export default function ImagePicker({ label, id, mediaUrl }) {
  return (
    <div
      className="form-group cursor-pointer"
      onClick={() => document.getElementById("media-library-modal-btn").click()}
    >
      <label className="text-xl font-bold mb-3 block" htmlFor={id}>
        {label}
      </label>
      <div className="w-full h-[300px] flex items-center justify-center border-2 rounded-xl border-gray-200">
        {mediaUrl ? (
          <img className="w-[80%] h-[80%]" id="media" src={mediaUrl} />
        ) : (
          <p>Upload a Thumbnail</p>
        )}
      </div>
    </div>
  );
}
