import React, { useEffect, useState } from "react";
import {
  DashboardLayout,
  MediaCard,
  PageTitle,
  UploadModal,
} from "modules/Dashboard/components";
import Spinner from "components/Spinner";
import { useDispatch, useSelector } from "react-redux";
import { deleteMedia, getMedia } from "store/slice/mediaSlice";
import DeleteModal from "./DeleteModal";
import { toast } from "react-toastify";
import Empty from "./Empty";

export default function Media() {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [toDeleteMedia, setToDeleteMedia] = useState(null);
  const buttonHandler = () => {
    document.getElementById("upload-modal-btn").click();
  };
  const dispatch = useDispatch();
  const { medias, loading } = useSelector((state) => state.media);
  console.log(medias);

  useEffect(() => {
    // TODO: get media api
    dispatch(getMedia());
  }, [dispatch]);

  const handleMediaDelete = (id) => {
    setShowDeleteModal(true);
    setToDeleteMedia(id);
  };

  const handleDelete = (confirmed) => {
    if (confirmed) {
      // TODO: hit delete media API
      console.log(toDeleteMedia);
      dispatch(deleteMedia({ id: toDeleteMedia, toast }));
    }
    setShowDeleteModal(false);
  };
  return (
    <DashboardLayout activePage="Media">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Upload new asset"
        hasButton={true}
      />
      <div className="mt-4 bg-white p-[30px] rounded-xl h-[80vh] overflow-y-scroll">
        {loading && <Spinner />}
        {medias && medias.length === 0 && <Empty />}
        <div className="media-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 mt-10">
          {medias &&
            medias.length > 0 &&
            medias.map((media) => {
              return (
                <MediaCard
                  handleMediaDelete={() => handleMediaDelete(media.id)}
                  filename={media.filename}
                  size={media.size}
                  type={media.type}
                  key={media.id}
                  imageUrl={media.media_url}
                />
              );
            })}
        </div>
      </div>
      <UploadModal />
      <DeleteModal
        showModal={showDeleteModal}
        setShowModal={setShowDeleteModal}
        handleDelete={handleDelete}
      />
    </DashboardLayout>
  );
}
