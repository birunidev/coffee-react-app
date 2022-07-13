import React from "react";
import Lottie from "react-lottie";
import { Button } from "flowbite-react";
import * as checkAnim from "constants/check_anim.json";

export default function CheckoutSuccess({ setStep, handleDone }) {
  return (
    <div className="h-[600px]">
      <Lottie
        height={300}
        width={400}
        options={{
          animationData: checkAnim,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
      <div className="mx-auto max-w-[400px] text-center">
        <h4 className="font-bold text-2xl mb-4">Your Change: Rp 40,000</h4>
        <p
          className="text-lg 
               font-bold"
        >
          Order for “Muhammad Al Biruni” has been placed successfully
        </p>
        <p className="text-center my-6">
          Please wait for the invoce to be printed{" "}
        </p>
        <Button
          style={{ margin: "auto", fontWeight: "bold" }}
          color="success"
          size="lg"
          onClick={() => {
            setStep("checkout");
            handleDone();
          }}
        >
          Back to main course
        </Button>
      </div>
    </div>
  );
}
