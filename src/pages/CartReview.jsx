import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import menuData from "../data/menuData";
import {
  incrementItem,
  decrementItem,
  removeItem,
  selectCartCount,
  selectSubtotal,
  selectCartList,
} from "../redux/cartSlice";
import { useTranslation } from "react-i18next";

const CartReview = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const totalItems = useSelector(selectCartCount);
  const subtotal = useSelector((state) => selectSubtotal(state, menuData));
  const cartList = useSelector(selectCartList);

  const handleBackToMenu = () => {
    navigate("/home/menu");
  };

  const handleProceed = () => {
    navigate("/home/confirmation");
  };

  if (cartList.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#fff4ea",
          padding: "24px",
          paddingBottom: "48px",
        }}
      >
        <h2
          style={{
            textAlign: "center",
            color: "#ff5f00",
            marginBottom: "16px",
          }}
        >
          Your Cart is Empty
        </h2>

        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            onClick={handleBackToMenu}
            sx={{
              backgroundColor: "#ff5f00",
              "&:hover": { backgroundColor: "#e65600" },
            }}
          >
            Back to Menu
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#fff4ea",
        padding: "24px",
        paddingBottom: "48px",
      }}
    >
      <h2
        style={{
          textAlign: "center",
          color: "#ff5f00",
          marginBottom: "16px",
        }}
      >
        Order Review
      </h2>

      <div
        style={{
          width: "100%",
          maxWidth: "1200px",
          margin: "12px auto 24px",
        }}
      >
        {cartList.map((item) => {
          const product = menuData.find((p) => p.id === item.id);

          if (!product) return null;

          const itemTotal = product.price * item.quantity;

          return (
            <div
              key={item.id}
              style={{
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "16px",
                border: "1px solid #ffd7b8",
                borderRadius: "10px",
                padding: "16px",
                marginBottom: "16px",
                background: "#fff",
              }}
            >
              <img
                src={product.image}
                alt={t(product.nameKey)}
                style={{
                  width: "90px",
                  height: "90px",
                  objectFit: "cover",
                  borderRadius: "8px",
                  border: "1px solid #ffd7b8",
                  background: "#fff7ef",
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1 }}>
                <h3 style={{ margin: "0 0 8px", color: "#1f1f1f" }}>
                  {t(product.nameKey)}
                </h3>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  Price: ₹{product.price}
                </p>
                <p style={{ margin: "4px 0", color: "#555" }}>
                  Quantity: {item.quantity}
                </p>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontWeight: 700,
                    color: "#ff5f00",
                  }}
                >
                  Item Total: ₹{itemTotal}
                </p>
              </div>

              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  minWidth: "170px",
                  marginLeft: "auto",
                }}
              >
                <div style={{ display: "flex", gap: "8px" }}>
                  <Button
                    variant="outlined"
                    onClick={() => dispatch(decrementItem(item.id))}
                    sx={{
                      minWidth: "48px",
                      borderColor: "#ffb26b",
                      color: "#ff5f00",
                      backgroundColor: "#fff3e6",
                      "&:hover": {
                        borderColor: "#ff9a3d",
                        backgroundColor: "#ffe7cc",
                      },
                    }}
                  >
                    -
                  </Button>

                  <Button
                    variant="outlined"
                    onClick={() => dispatch(incrementItem(item.id))}
                    sx={{
                      minWidth: "48px",
                      borderColor: "#ffb26b",
                      color: "#ff5f00",
                      backgroundColor: "#fff3e6",
                      "&:hover": {
                        borderColor: "#ff9a3d",
                        backgroundColor: "#ffe7cc",
                      },
                    }}
                  >
                    +
                  </Button>
                </div>

                <Button
                  color="error"
                  variant="contained"
                  onClick={() => dispatch(removeItem(item.id))}
                  sx={{
                    fontWeight: 700,
                  }}
                >
                  Remove
                </Button>
              </div>
            </div>
          );
        })}

        <div
          style={{
            marginTop: "24px",
            padding: "18px",
            borderRadius: "10px",
            background: "#fff",
            border: "1px solid #ffd7b8",
          }}
        >
          <h3>Total Items: {totalItems}</h3>
          <h3 style={{ color: "#ff5f00", marginBottom: 0 }}>
            Grand Total: ₹{subtotal}
          </h3>
        </div>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginTop: "24px",
            flexWrap: "wrap",
          }}
        >
          <Button
            variant="outlined"
            onClick={handleBackToMenu}
            sx={{
              minWidth: "160px",
              borderColor: "#ffb26b",
              color: "#ff5f00",
              backgroundColor: "#fff3e6",
              "&:hover": {
                borderColor: "#ff9a3d",
                backgroundColor: "#ffe7cc",
              },
            }}
          >
            Back to Menu
          </Button>

          <Button
            variant="contained"
            onClick={handleProceed}
            sx={{
              minWidth: "160px",
              backgroundColor: "#ff5f00",
              fontWeight: 700,
              "&:hover": {
                backgroundColor: "#e65600",
              },
            }}
          >
            Proceed
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartReview;
