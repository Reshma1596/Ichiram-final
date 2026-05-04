import {
  Card,
  CardContent,
  Typography,
  Button,
  Stack,
  Box,
  Chip,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import Counter from "./Counter";
import { addItem, incrementItem, decrementItem } from "../redux/cartSlice";

function ListProduct({ product }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const quantity = useSelector(
    (state) => state.cart.items[product.id]?.quantity || 0
  );

  const handleAddToCart = () => {
    dispatch(addItem({ id: product.id }));
  };

  const handleIncrement = () => {
    dispatch(incrementItem(product.id));
  };

  const handleDecrement = () => {
    dispatch(decrementItem(product.id));
  };

  return (
    <Card
      sx={{
        height: "100%",
        borderRadius: 5,
        background: "linear-gradient(180deg, #fff8f3 0%, #fff1e7 100%)",
        border: "2px solid #ffd7bf",
        boxShadow: "0 10px 24px rgba(255, 95, 0, 0.10)",
        overflow: "hidden",
        transition: "transform 0.2s ease, box-shadow 0.2s ease",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: "0 14px 30px rgba(255, 95, 0, 0.16)",
        },
      }}
    >
      <Box sx={{ p: 1.5, pb: 0 }}>
        <Box
          sx={{
            height: 220,
            borderRadius: 4,
            overflow: "hidden",
            background: "linear-gradient(180deg, #fff7f1 0%, #ffe7d6 100%)",
            border: "2px solid #ffd2b5",
            boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.7)",
          }}
        >
          <Box
            component="img"
            src={product.image}
            alt={t(product.nameKey)}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              display: "block",
            }}
          />
        </Box>
      </Box>

      <CardContent sx={{ p: 2.2 }}>
        <Stack spacing={1.5}>
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
            spacing={1}
          >
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                color: "#5c2d12",
                lineHeight: 1.2,
              }}
            >
              {t(product.nameKey)}
            </Typography>

            <Chip
              label={`₹${product.price}`}
              sx={{
                fontWeight: 800,
                backgroundColor: "#ff5f00",
                color: "#fff",
                borderRadius: "999px",
              }}
            />
          </Stack>

          <Typography
            variant="body2"
            sx={{
              color: "#8a4b22",
              minHeight: 42,
            }}
          >
            {t(product.descriptionKey)}
          </Typography>

          {quantity === 0 ? (
            <Button
              variant="contained"
              fullWidth
              onClick={handleAddToCart}
              sx={{
                mt: 1,
                py: 1.2,
                borderRadius: 999,
                backgroundColor: "#ff5f00",
                color: "#fff",
                fontWeight: 700,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#e65600",
                  boxShadow: "none",
                },
              }}
            >
              {t("menu.addToCart")}
            </Button>
          ) : (
            <Counter
              quantity={quantity}
              onIncrement={handleIncrement}
              onDecrement={handleDecrement}
            />
          )}
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ListProduct;