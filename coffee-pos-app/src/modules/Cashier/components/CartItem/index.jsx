import React from "react";

export default function CartItem() {
  return (
    <div className="cart-item flex items-center justify-between">
      <div className="flex items-center">
        <div className="max-w-[80px] mr-4">
          <img className="w-full" src="/assets/product-1.png" alt="" />
        </div>
        <div>
          <p className="font-bold text-xl">Caramel Machiato</p>
          <p>Rp. 20,000</p>
        </div>
      </div>

      <div className="flex items-center">
        <button className="w-[30px] h-[30px] bg-primary-500 hover:bg-primary-600 rounded-full text-white text-3xl flex items-center justify-center">
          -
        </button>
        <span className="mx-4">2</span>
        <button className="w-[30px] h-[30px] bg-primary-500 hover:bg-primary-600 rounded-full text-white text-[20px] flex items-center justify-center">
          +
        </button>
      </div>
    </div>
  );
}
