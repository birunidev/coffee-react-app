import React from "react";

export default function ProductCard() {
  return (
    <div className="product-card p-[17px] bg-[#F3F3F3]  rounded-[12px]">
      <div className="product-card__img rounded-[12px] mx-auto text-center ">
        <img className="w-full" src="/assets/product-1.png" alt="" />
      </div>
      <div className="mt-3">
        <p className="font-bold text-xl">Caramel Machiato</p>
        <div className="flex items-center justify-between mt-2">
          <p>
            <img className="inline-block" src="/assets/ic-tag.svg" alt="" />
            <span> Rp. 20,000</span>
          </p>
          <img src="/assets/ic-check.svg" alt="" />
        </div>
      </div>
    </div>
  );
}
