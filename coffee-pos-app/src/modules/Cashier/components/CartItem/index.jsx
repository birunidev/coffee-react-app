import { formatThousand } from "lib/Misc";
import React from "react";

export default function CartItem({
  title,
  price,
  thumbnail,
  qty,
  handleDecrease,
  handleIncrease,
}) {
  return (
    <div className="cart-item flex items-center justify-between">
      <div className="flex items-center">
        <div className="max-w-[80px] h-[70px] overflow-hidden flex items-center justify-center rounded-[6px] mr-4">
          <img className="w-full" src={thumbnail} alt="" />
        </div>
        <div>
          <p className="font-bold text-xl">{title}</p>
          <p>Rp. {formatThousand(price)}</p>
        </div>
      </div>

      <div className="flex items-center">
        <button
          onClick={handleDecrease}
          className="w-[30px] h-[30px] bg-primary-500 hover:bg-primary-600 rounded-full text-white text-3xl flex items-center justify-center"
        >
          -
        </button>
        <span className="mx-4">{qty}</span>
        <button
          onClick={handleIncrease}
          className="w-[30px] h-[30px] bg-primary-500 hover:bg-primary-600 rounded-full text-white text-[20px] flex items-center justify-center"
        >
          +
        </button>
      </div>
    </div>
  );
}
