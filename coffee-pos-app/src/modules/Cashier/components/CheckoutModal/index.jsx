import React, { useState } from "react";
import { Modal } from "flowbite-react";

import CheckoutForm from "./CheckoutForm";
import CheckoutSuccess from "./CheckoutSuccess";
import CheckoutLoading from "./CheckoutLoading";
import { transactionAPI } from "modules/Dashboard/infrastructure/api";

export default function CheckoutModal({
  showModal,
  onClose,
  handleDone,
  total,
  selectedPayment,
  selectedProduct,
}) {
  const [step, setStep] = useState("checkout");
  const [successData, setSuccessData] = useState(null);

  function handleCheckout(order_data) {
    setStep("loading");
    // TODO: save to database
    console.log(selectedProduct);
    console.log(order_data);

    let dataToSend = {
      ...order_data,
      ordered_menus: selectedProduct.map((product) => {
        return {
          productId: product.id,
          quantity: product.qty,
          description: "",
        };
      }),
    };

    // send to database
    transactionAPI.store(dataToSend).then((res) => {
      setSuccessData(res.data);
      setTimeout(() => {
        setStep("success");
      }, 2000);
    });

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
            <CheckoutForm
              total={total}
              selectedPayment={selectedPayment}
              handleCheckout={handleCheckout}
            />
          ) : step === "success" ? (
            <CheckoutSuccess
              change={successData.change}
              customer_name={successData.customer_name}
              setStep={setStep}
              handleDone={handleDone}
            />
          ) : step === "loading" ? (
            <CheckoutLoading />
          ) : null}
        </Modal.Body>
      </Modal>
    </>
  );
}
