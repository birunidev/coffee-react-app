import { Modal, Button } from "flowbite-react";
import React from "react";
export default function DeleteModal({ showModal, setShowModal, handleDelete }) {
  const onClose = () => {
    setShowModal(false);
  };
  return (
    <Modal show={showModal} size="md" popup={true} onClose={onClose}>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          {/* <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" /> */}
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            Are you sure you want to delete this media?
          </h3>
          <div className="flex justify-center gap-4">
            <Button color="failure" onClick={() => handleDelete(true)}>
              Yes, I'm sure
            </Button>
            <Button color="gray" onClick={() => handleDelete(false)}>
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
}
