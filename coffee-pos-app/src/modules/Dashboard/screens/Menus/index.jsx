import { ProductCard } from "components";
import Spinner from "components/Spinner";
import { DashboardLayout, PageTitle } from "modules/Dashboard/components";
import { categoryAPI } from "modules/Dashboard/infrastructure/api";
import { RouteName } from "modules/Dashboard/infrastructure/routes/RouteName";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getProducts } from "store/slice/productSlice";

export default function Menus() {
  const history = useHistory();
  const dispatch = useDispatch();

  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState(0);
  const { products, productLoading, productError } = useSelector(
    (state) => state.product
  );

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const buttonHandler = () => {
    history.push(RouteName.ADD_NEW_MENU);
  };

  const handleFilter = (category_id) => {
    setActiveCategory(category_id);
    dispatch(
      getProducts({
        category_id,
      })
    );
  };

  useEffect(() => {
    categoryAPI.get().then((res) => {
      setCategories(res.data);
    });
  }, []);

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
          {productLoading ? (
            <div className="py-12 flex justify-center items-center h-[400px]">
              <Spinner />
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-6 flex justify-center items-center">
              Empty Products
            </div>
          ) : (
            <div className="product-cards grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-10">
              {products.map((product) => {
                return (
                  <ProductCard
                    key={product.id}
                    title={product.title_product}
                    id={product.id}
                    thumbnail={product.thumbnail}
                    price={product.price}
                    inAdmin={true}
                    interactive={false}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
