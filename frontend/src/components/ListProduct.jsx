import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, decrementItem } from "../redux/cartSlice";
import { useTranslation } from "react-i18next";
import "./ListProduct.css";

const ListProduct = ({ product }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const cartItems = useSelector((state) => state.cart.items);
  const quantity = cartItems[product.id]?.quantity || 0;

  const handleAdd = () => {
    dispatch(addItem(product));
  };

  const handleDecrease = () => {
    dispatch(decrementItem(product.id));
  };

  return (
    <div className="menu-card">
      <div className="menu-card__image-wrap">
        {product.isBestseller && (
          <span className="menu-card__badge">
            {t("menu.bestseller", "Bestseller")}
          </span>
        )}
        <img
          src={product.image}
          alt={t(product.nameKey)}
          className="menu-card__image"
          onError={(e) => {
            e.target.src =
              "https://images.unsplash.com/photo-1557872943-16a5ac26437e?q=80&w=1200&auto=format&fit=crop";
          }}
        />
      </div>

      <div className="menu-card__content">
        <div className="menu-card__top">
          <h3 className="menu-card__title">{t(product.nameKey)}</h3>
          <span className="menu-card__price">₹{product.price}</span>
        </div>

        <p className="menu-card__desc">{t(product.descriptionKey)}</p>

        <div className="menu-card__footer">
          <span
            className={`menu-card__type ${
              product.foodType === "veg" ? "veg" : "nonveg"
            }`}
          >
            {product.foodType === "veg"
              ? t("menu.veg", "Veg")
              : t("menu.nonveg", "Non-Veg")}
          </span>

          <div className="menu-card__qty">
            <button onClick={handleDecrease} disabled={quantity === 0}>
              -
            </button>
            <span>{quantity}</span>
            <button onClick={handleAdd}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListProduct;