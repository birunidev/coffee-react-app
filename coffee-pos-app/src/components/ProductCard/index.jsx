import { DotsVerticalIcon } from "@heroicons/react/outline";
import { formatThousand } from "lib/Misc";
import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteProduct } from "store/slice/productSlice";

export default function ProductCard({
  title,
  thumbnail,
  price,
  inAdmin = false,
  interactive,
  id,
  isActive,
  handleClick,
}) {
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const handleDeleteProduct = () => {
    dispatch(deleteProduct({ id, toast }));
  };

  return (
    <div
      onClick={interactive ? handleClick : null}
      className={[
        "product-card p-[17px] bg-[#F3F3F3]  rounded-[12px]",
        interactive && "cursor-pointer",
      ].join(" ")}
    >
      <div className="product-card__img rounded-[12px] h-[200px] flex items-center justify-center overflow-hidden mx-auto text-center ">
        <img className="w-full" src={thumbnail} alt="" />
      </div>
      <div className="mt-3">
        <p className="font-bold text-xl">{title}</p>
        <div className="flex items-center justify-between mt-2">
          <p>
            <img className="inline-block" src="/assets/ic-tag.svg" alt="" />
            <span> Rp. {formatThousand(price)}</span>
          </p>
          {inAdmin && (
            <div className={`relative`} onMouseEnter={() => setShowMenu(true)}>
              <button className="w-[20px]">
                <DotsVerticalIcon className="text-gray-500" />
              </button>
              <div
                onMouseLeave={() => setShowMenu(false)}
                className={[
                  "absolute flex rounded-[10px] flex-col space-y-[5px] bg-[#fff] p-3 w-[80px]",
                  showMenu ? "block" : "hidden",
                ].join(" ")}
              >
                <Link
                  to={`/cp-admin/menus/${id}/edit`}
                  className="text-green-500"
                >
                  {" "}
                  Edit
                </Link>
                <hr />
                <button onClick={handleDeleteProduct} className="text-red-500">
                  Delete
                </button>
              </div>
            </div>
          )}
          {interactive && isActive && <img src="/assets/ic-check.svg" alt="" />}
        </div>
      </div>
    </div>
  );
}
