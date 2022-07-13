import { ProductCard } from "components";
import { CartItem, CheckoutModal } from "modules/Cashier/components";
import React, { useState } from "react";
import { CashIcon, QrcodeIcon } from "@heroicons/react/solid";

export default function Transaction() {
  const [showModal, setShowModal] = useState(false);

  function handleDone() {
    // TODO: clear cart
    // TODO: clear selected items
    // TODO: close modal
    setShowModal(false);
  }

  return (
    <div>
      {/* Page title */}
      <div className="page-title flex items-center p-[20px] bg-white m-4 rounded-xl">
        <div className="w-[88px] h-[88px] mr-4">
          <img src="/assets/logo.png" className="w-full" alt="" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">Restaurant name</h1>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit ut</p>
        </div>
      </div>
      {/* Grid */}
      <div className="m-4 xl:flex">
        {/* menu section */}
        <div className="menu-section bg-white xl:min-w-[1300px] xl:mr-4 rounded-xl">
          <div className="category-wrapper p-[20px] ">
            <p className="font-bold text-2xl mb-3">Choose Category</p>
            <div className="categories">
              <button className="px-5 py-2 text-white bg-primary-500 hover:bg-primary-600  rounded-lg mr-3">
                🍴All Menu
              </button>
              <button className="px-5 py-2 text-white bg-white text-[#989898] hover:bg-gray-200 rounded-lg mr-3">
                ☕ Coffee
              </button>
              <button className="px-5 py-2 text-white bg-white text-[#989898] hover:bg-gray-200 rounded-lg mr-3">
                🍹Juice
              </button>
              <button className="px-5 py-2 text-white bg-white text-[#989898] hover:bg-gray-200 rounded-lg mr-3">
                🥛Milk Board
              </button>
              <button className="px-5 py-2 text-white bg-white text-[#989898] hover:bg-gray-200 rounded-lg mr-3">
                🍖 Meal
              </button>
              <button className="px-5 py-2 text-white bg-white text-[#989898] hover:bg-gray-200 rounded-lg mr-3">
                🍰 Desert
              </button>
            </div>
          </div>
          <div className="product-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 px-[20px] py-[30px] max-h-[66vh] overflow-y-scroll">
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
            <ProductCard />
          </div>
        </div>
        {/* cart section */}
        <div className="cart-section bg-white p-[20px] w-full rounded-xl">
          <p className="font-bold text-2xl ">Bills</p>
          <div className="cart-items mt-4 grid grid-cols-1 gap-y-8 max-h-[30vh] overflow-y-scroll pr-8 pb-3">
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
            <CartItem />
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-xl">Subtotal</p>
            <p className="text-xl">Rp. 90,000</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xl">Tax (10%)</p>
            <p className="text-xl">Rp. 9,000</p>
          </div>
          <hr className="my-3" />
          <div className="font-bold flex items-center justify-between">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">Rp. 99,000</p>
          </div>
          <div className="mt-[40px]">
            <p className="text-xl">Payment Method</p>
            <div className="flex items-center mt-4">
              <div className="py-2 px-6 bg-[#F0F0F0] rounded-xl mr-4 border-2">
                <CashIcon className="text-[#CDCDCD] mb-1" />
                <p className="font-semibold text-[#CDCDCD]">Cash</p>
              </div>
              <div className="py-2 px-6 bg-[#D8FFEF] border-2 border-[#007042] rounded-xl">
                <QrcodeIcon className="text-[#007042] mb-1" />
                <p className="font-semibold text-[#007042]">QRIS</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary-500 hover:bg-primary-600 px-3 py-4 text-white font-bold rounded-xl w-full mt-4"
            >
              Place this order
            </button>
          </div>
        </div>
      </div>
      <CheckoutModal
        handleDone={handleDone}
        showModal={showModal}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
