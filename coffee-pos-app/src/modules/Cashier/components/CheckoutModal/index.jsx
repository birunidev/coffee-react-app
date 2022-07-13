import React, { useState } from "react";
import { Modal } from "flowbite-react";

import CheckoutForm from "./CheckoutForm";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutLoading from "./CheckoutLoading";

export default function CheckoutModal({ showModal, onClose, handleDone }) {
  const [step, setStep] = useState("checkout");

  function handleCheckout() {
    setStep("loading");
    // TODO: save to database
    setTimeout(() => {
      setStep("success");
    }, 2000);

    // change UI
  }

  return (
    <>
      <Modal size="4xl" show={showModal} onClose={onClose}>
        <Modal.Header>
          {step === "checkout"
            ? "Place new order"
            : step === "success"
            ? "Order Success"
            : null}
        </Modal.Header>
        <Modal.Body>
          {step === "checkout" ? (
            <CheckoutForm handleCheckout={handleCheckout} />
          ) : step === "success" ? (
            <CheckoutSuccess setStep={setStep} handleDone={handleDone} />
          ) : step === "loading" ? (
            <CheckoutLoading />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
