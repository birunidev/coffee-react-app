import React from "react";

export default function ImagePicker({ label, id }) {
  return (
    <div
      className="form-group"
      onClick={() => document.getElementById("media-library-modal-btn").click()}
    >
      <label className="text-xl font-bold mb-3 block" htmlFor={id}>
        {label}
      </label>
      <div className="w-full h-[261px] flex items-center justify-center border-2 rounded-xl border-gray-200">
        <p>Upload a Thumbnail</p>
      </div>
    </div>
  );
}
