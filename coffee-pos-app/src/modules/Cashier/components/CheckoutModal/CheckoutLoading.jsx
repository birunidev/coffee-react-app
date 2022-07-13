import React from "react";
import Lottie from "react-lottie";
import * as loadingAnim from "constants/loading_anim.json";

export default function CheckoutLoading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie
        height={300}
        width={400}
        style={{ margin: "auto" }}
        options={{
          animationData: loadingAnim,
          rendererSettings: {
            preserveAspectRatio: "xMidYMid slice",
          },
        }}
      />
    </div>
  );
}
