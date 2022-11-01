import { ProductCard } from "components";
import { CartItem, CheckoutModal } from "modules/Cashier/components";
import React, { useState } from "react";
import { CashIcon, QrcodeIcon } from "@heroicons/react/solid";
import { useEffect } from "react";
import { categoryAPI } from "modules/Dashboard/infrastructure/api";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "store/slice/productSlice";
import { formatThousand } from "lib/Misc";

export default function Transaction() {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("CASH");

  const [total, setTotal] = useState(0);
  const [subTotal, setSubTotal] = useState(0);
  const [taxVal, setTaxVal] = useState(0);
  const tax = 10 / 100;

  const { products, productLoading, productError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  useEffect(() => {
    categoryAPI.get().then((res) => {
      setCategories(res.data);
    });
  }, []);

  const handleFilter = (category_id) => {
    setActiveCategory(category_id);
    dispatch(
      getProducts({
        category_id,
      })
    );
  };

  useEffect(() => {
    let myTotal = 0;
    let mySubTotal = 0;
    selectedProduct.forEach((item) => {
      mySubTotal += item.price * item.qty;
    });
    let myTax = mySubTotal * tax;
    myTotal = mySubTotal + myTax;
    setTotal(myTotal);
    setSubTotal(mySubTotal);
    setTaxVal(myTax);
  }, [selectedProduct, tax]);

  function handleDone() {
    // TODO: clear cart
    // TODO: clear selected items
    // TODO: close modal
    setShowModal(false);
    window.location.reload();
  }

  const handleSelectedProduct = (productData) => {
    let copyProducts = [...selectedProduct];
    const foundProduct = copyProducts.find(
      (product) => product.id === productData.id
    );
    if (!foundProduct) {
      copyProducts.push({ ...productData, qty: 1 });
    } else {
      copyProducts = copyProducts.filter(
        (product) => product.id !== productData.id
      );
    }
    setSelectedProduct(copyProducts);
  };

  const handleDecrease = (id) => {
    let copySelectedProduct = [...selectedProduct];
    copySelectedProduct.forEach((item) => {
      if (item.id === id) {
        item.qty = item.qty - 1;
      }
    });
    setSelectedProduct(copySelectedProduct);
  };

  const handleIncrease = (id) => {
    let copySelectedProduct = [...selectedProduct];
    copySelectedProduct.forEach((item) => {
      if (item.id === id) {
        item.qty = item.qty + 1;
      }
    });
    setSelectedProduct(copySelectedProduct);
  };
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
      <div className="m-4 xl:flex min-h-[753px]">
        {/* menu section */}
        <div className="menu-section bg-white xl:max-w-[1300px] xl:mr-4 rounded-xl">
          <div className="category-wrapper p-[20px] ">
            <p className="font-bold text-2xl mb-3">Choose Category</p>
            <div className="categories">
              <button
                onClick={() => handleFilter(0)}
                className={[
                  "px-5 py-2 rounded-lg mr-3",
                  activeCategory === 0
                    ? "bg-primary-500 text-white  hover:bg-primary-600"
                    : "bg-white text-[#989898] hover:bg-gray-200",
                ].join(" ")}
              >
                🍴All Menu
              </button>
              {categories.map((category, index) => {
                return (
                  <button
                    key={index}
                    onClick={() => handleFilter(category.id)}
                    className={[
                      "px-5 py-2 rounded-lg mr-3",
                      activeCategory === category.id
                        ? "bg-primary-500 text-white  hover:bg-primary-600"
                        : "bg-white text-[#989898] hover:bg-gray-200",
                    ].join(" ")}
                  >
                    {category.title}
                  </button>
                );
              })}
            </div>
          </div>
          <div className="product-cards grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-3 gap-y-4 px-[20px] py-[30px] max-h-[66vh] overflow-y-scroll h-full items-start">
            {products.map((product) => {
              return (
                <ProductCard
                  key={product.id}
                  title={product.title_product}
                  id={product.id}
                  thumbnail={product.thumbnail}
                  price={product.price}
                  inAdmin={false}
                  interactive={true}
                  isActive={selectedProduct.find(
                    (item) => item.id == product.id
                  )}
                  handleClick={() => handleSelectedProduct(product)}
                />
              );
            })}
          </div>
        </div>
        {/* cart section */}
        <div className="cart-section bg-white p-[20px] w-full rounded-xl">
          <p className="font-bold text-2xl ">Bills</p>
          <div className="cart-items mt-4 grid grid-cols-1 gap-y-8 max-h-[30vh] overflow-y-scroll pr-8 pb-3">
            {selectedProduct.map((product) => {
              return (
                <CartItem
                  handleDecrease={() => handleDecrease(product.id)}
                  handleIncrease={() => handleIncrease(product.id)}
                  thumbnail={product.thumbnail}
                  title={product.title_product}
                  price={product.price}
                  qty={product.qty}
                />
              );
            })}
          </div>
          <div className="flex items-center justify-between mt-5">
            <p className="text-xl">Subtotal</p>
            <p className="text-xl">Rp. {formatThousand(subTotal)}</p>
          </div>
          <div className="mt-3 flex items-center justify-between">
            <p className="text-xl">Tax (10%)</p>
            <p className="text-xl">Rp. {formatThousand(taxVal)}</p>
          </div>
          <hr className="my-3" />
          <div className="font-bold flex items-center justify-between">
            <p className="text-2xl">Total</p>
            <p className="text-2xl">Rp. {formatThousand(total)}</p>
          </div>
          <div className="mt-[40px]">
            <p className="text-xl">Payment Method</p>
            <div className="flex mt-4">
              <div
                className={[
                  "px-6  border-2 rounded-xl mr-2 cursor-pointer",
                  selectedPayment == "CASH"
                    ? "bg-[#D8FFEF]  border-[#007042]"
                    : "bg-[#F0F0F0]",
                ].join(" ")}
                onClick={() => setSelectedPayment("CASH")}
              >
                <CashIcon
                  className={[
                    "mb-1",
                    selectedPayment == "CASH"
                      ? "text-[#007042]"
                      : "text-[#CDCDCD]",
                  ].join(" ")}
                />
                <p
                  className={[
                    "font-semibold ",
                    selectedPayment == "CASH"
                      ? "text-[#007042]"
                      : "text-[#CDCDCD]",
                  ].join(" ")}
                >
                  Cash
                </p>
              </div>
              <div
                className={[
                  "py-2 px-6  border-2 rounded-xl cursor-pointer",
                  selectedPayment == "QRIS"
                    ? "bg-[#D8FFEF]  border-[#007042]"
                    : "bg-[#F0F0F0]",
                ].join(" ")}
                onClick={() => setSelectedPayment("QRIS")}
              >
                <QrcodeIcon
                  className={[
                    " mb-1",
                    selectedPayment == "QRIS"
                      ? "text-[#007042]"
                      : "text-[#CDCDCD]",
                  ].join(" ")}
                />
                <p
                  className={[
                    "font-semibold",
                    selectedPayment == "QRIS"
                      ? "text-[#007042]"
                      : "text-[#CDCDCD]",
                  ].join(" ")}
                >
                  QRIS
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                if (selectedProduct.length != 0) {
                  setShowModal(true);
                }
              }}
              disabled={selectedProduct.length == 0}
              className="disabled:bg-green-200 bg-primary-500 hover:bg-primary-600 px-3 py-4 text-white font-bold rounded-xl w-full mt-4"
            >
              Place this order
            </button>
          </div>
        </div>
      </div>
      <CheckoutModal
        selectedProduct={selectedProduct}
        handleDone={handleDone}
        showModal={showModal}
        total={total}
        selectedPayment={selectedPayment}
        onClose={() => setShowModal(false)}
      />
    </div>
  );
}
