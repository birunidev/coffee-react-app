import React, { useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { CloudUploadIcon } from "@heroicons/react/outline";
import { useDispatch } from "react-redux";
import { createMedia } from "store/slice/mediaSlice";
import { toast } from "react-toastify";

export default function UploadModal() {
  const [showModal, setShowModal] = useState(false);
  const uploadRef = useRef();
  const dispatch = useDispatch();

  const handleInputFileChange = (e) => {
    const fileToUpload = e.target.files[0];
    const formData = new FormData();
    formData.append("media", fileToUpload);

    dispatch(createMedia({ formData, toast }));
    setShowModal(false);
  };

  return (
    <>
      <Button
        id="upload-modal-btn"
        color="success"
        style={{ opacity: 0 }}
        onClick={() => setShowModal(!showModal)}
      >
        Toggle modal
      </Button>
      <Modal size="5xl" show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <p className="font-bold text-xl">Upload new assets</p>
        </Modal.Header>
        <Modal.Body>
          <div className="text-center text-gray-700 h-[600px] flex items-center justify-center">
            <div className="border w-[80%] mx-auto h-[80%] flex items-center justify-center">
              <div>
                <CloudUploadIcon className="w-[40px] mx-auto mb-4" />
                <p className="mb-2">
                  {" "}
                  <span className="font-bold">Drag and drop</span> to upload{" "}
                  <br /> or
                </p>
                <Button
                  onClick={(e) => {
                    e.preventDefault();
                    uploadRef.current.click();
                  }}
                  type="button"
                  outline
                  color="success"
                  style={{ margin: "auto" }}
                >
                  Browse Files
                </Button>
                <input
                  ref={uploadRef}
                  onChange={handleInputFileChange}
                  type="file"
                  className="opacity-0 fixed top-[999999px]"
                />
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
