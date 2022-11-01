import React, { useRef, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { CloudUploadIcon } from "@heroicons/react/outline";
import MediaCard from "../MediaCard";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { createMedia, getMedia } from "store/slice/mediaSlice";
import Empty from "modules/Dashboard/screens/Media/Empty";
import Spinner from "components/Spinner";
import { useEffect } from "react";
import dayjs from "dayjs";

export default function MediaLibraryModal({ setMediaUrl }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const uploadRef = useRef();
  const [menu, setMenu] = useState("from-computer");
  const [selectedMedia, setSelectedMedia] = useState(null);
  const { medias, loading } = useSelector((state) => state.media);

  const handleUpload = (e) => {
    const fileToUpload = e.target.files[0];
    const formData = new FormData();
    formData.append("media", fileToUpload);
    dispatch(createMedia({ formData, toast }));
    setMenu("media-library");
    setSelectedMedia(medias[medias.length - 1]);
  };

  useEffect(() => {
    dispatch(getMedia());
    setSelectedMedia(medias[medias.length - 1]);
  }, [dispatch]);

  function handleChooseMedia() {
    setMediaUrl(selectedMedia.media_url);
    setShowModal(false);
  }

  return (
    <>
      <Button
        id="media-library-modal-btn"
        color="success"
        style={{ opacity: 0 }}
        onClick={() => setShowModal(!showModal)}
      >
        Toggle modal
      </Button>
      <Modal size="8xl" show={showModal} onClose={() => setShowModal(false)}>
        <Modal.Header>
          <p className="font-bold text-xl">Media Library</p>
        </Modal.Header>
        <Modal.Body style={{ paddingBottom: 0 }}>
          <div>
            <button
              onClick={() => setMenu("from-computer")}
              className={[
                "py-2 px-3 border-b-2 font-bold mr-4",
                menu === "from-computer"
                  ? " border-primary-500 text-primary-500 "
                  : " text-gray-500",
              ].join(" ")}
            >
              From Computer
            </button>

            <button
              onClick={() => setMenu("media-library")}
              className={[
                "py-2 px-3 border-b-2 font-bold",
                menu === "media-library"
                  ? " border-primary-500 text-primary-500 "
                  : " text-gray-500",
              ].join(" ")}
            >
              Media Library
            </button>
          </div>
          <div className="text-center text-gray-700 pt-10 ">
            {menu === "from-computer" ? (
              <div className="border w-[100%] mx-auto h-[80%] flex items-center justify-center">
                <div className="h-[639px] flex items-center justify-center ">
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
                      onChange={handleUpload}
                      type="file"
                      className="opacity-0 fixed top-[999999px]"
                    />
                  </div>
                </div>
              </div>
            ) : (
              <div className="media-library-wrapper flex pb-[40px]">
                {loading && <Spinner />}
                {medias && medias.length === 0 && <Empty />}
                <div className="media-cards grid grid-cols-4 mr-6 gap-y-5 gap-x-10 pb-[40px] overflow-y-scroll h-[600px] max-h-[600px] pr-[90px] ]">
                  {medias &&
                    medias.length > 0 &&
                    medias.map((media, index) => {
                      return (
                        <div
                          className={[
                            "clickable-media border-2  h-[308px]",
                            selectedMedia &&
                              selectedMedia.id == media.id &&
                              "border-primary-500",
                          ].join(" ")}
                          onClick={() => setSelectedMedia(media)}
                        >
                          <MediaCard
                            hasDelete={false}
                            filename={media.filename}
                            size={media.size}
                            type={media.type}
                            key={media.id}
                            imageUrl={media.media_url}
                          />
                        </div>
                      );
                    })}
                </div>
                {selectedMedia && (
                  <div className="media-detail border-l-2 border-gray-300 w-1/5 px-4  relative">
                    <div className="w-full h-[200px] flex items-center justify-center">
                      <img
                        src={`${selectedMedia.media_url}`}
                        className="w-full mb-5 block"
                        alt=""
                      />
                    </div>
                    <div className="media-info mt-5">
                      <div className="flex justify-between text-black mb-3">
                        <p className="font-semibold mr-3">Filename </p>
                        <p>
                          {selectedMedia.filename.length > 20
                            ? selectedMedia.filename.substr(0, 20) + " ..."
                            : selectedMedia.filename}
                        </p>
                      </div>
                      <div className="flex justify-between text-black mb-3">
                        <p className="font-semibold">Size </p>
                        <p>{selectedMedia.size} KB</p>
                      </div>
                      <div className="flex justify-between text-black mb-3">
                        <p className="font-semibold">Resolution </p>
                        <p>1200x820</p>
                      </div>
                      <div className="flex justify-between text-black mb-3">
                        <p className="font-semibold">Type </p>
                        <p>{selectedMedia.type}</p>
                      </div>
                      <div className="flex justify-between text-black mb-3">
                        <p className="font-semibold">Uploaded at </p>
                        <p>
                          {dayjs(selectedMedia.created_at).format("D MMM YYYY")}
                        </p>
                      </div>
                    </div>
                    <div className="btn-actions absolute bottom-0 w-full left-0 px-4">
                      <Button
                        color="success"
                        size="lg"
                        style={{ width: "100%", fontWeight: "bold" }}
                        onClick={handleChooseMedia}
                      >
                        Choose this media
                      </Button>
                      <button className="text-[#DA0A0A] mt-3">
                        Remove Permanently
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
