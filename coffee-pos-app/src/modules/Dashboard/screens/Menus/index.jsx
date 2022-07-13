import { ProductCard } from "components";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React from "react";
import { useHistory } from "react-router-dom";

export default function Menus() {
  const history = useHistory();
  const buttonHandler = () => {
    history.push(RouteName.ADD_NEW_MENU);
  };

  return (
    <DashboardLayout activePage="Menu">
      <PageTitle
        buttonHandler={buttonHandler}
        buttonText="Add new menu"
        hasButton={true}
      />
      <div className="mt-4 bg-white p-[30px] rounded-xl">
        <div className="category-wrapper mb-10">
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
          <div className="product-cards grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-10">
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
      </div>
    </DashboardLayout>
  );
}
