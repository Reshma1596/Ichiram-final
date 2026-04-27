import { Box, Button, Typography, ButtonBase } from "@mui/material";
import { keyframes } from "@mui/system";
import { useTranslation } from "react-i18next";

const popBounce = keyframes`
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.08);
  }
  70% {
    transform: scale(0.97);
  }
  100% {
    transform: scale(1.03);
  }
`;

const partyOptions = [
  { size: "1", labelKey: "partySize.options.1.label", emoji: "🍜" },
  { size: "2", labelKey: "partySize.options.2.label", emoji: "🍥" },
  { size: "3-4", labelKey: "partySize.options.3_4.label", emoji: "🥢" },
  { size: "5-6", labelKey: "partySize.options.5_6.label", emoji: "🔥" },
  { size: "7+", labelKey: "partySize.options.7_plus.label", emoji: "🎉" },
];

function PartySizeStep({
  selectedPartySize,
  onSelectPartySize,
  onContinue,
}) {
  const { t } = useTranslation();

  return (
    <Box
      sx={{
        minHeight: "60vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        backgroundColor: "#fffaf3",
        padding: "24px",
      }}
    >
      <Typography
        variant="h4"
        sx={{
          color: "#222",
          fontWeight: "bold",
          mb: 1,
        }}
      >
        {t("partySize.title")}
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: "#6b4f3a",
          mb: 4,
          maxWidth: "520px",
          lineHeight: 1.7,
        }}
      >
        {t("partySize.subtitle")}
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "repeat(2, 1fr)",
            sm: "repeat(3, 1fr)",
          },
          gap: 2,
          width: "100%",
          maxWidth: "700px",
          mb: 4,
        }}
      >
        {partyOptions.map((option) => {
          const isSelected = selectedPartySize === option.size;

          return (
            <ButtonBase
              key={option.size}
              onClick={() => onSelectPartySize(option.size)}
              sx={{
                borderRadius: "18px",
                minHeight: "130px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 2,
                width: "100%",
                border: isSelected
                  ? "2px solid #ff5f00"
                  : "2px solid #ffd7a8",
                backgroundColor: isSelected ? "#fff0dd" : "#ffffff",
                transition: "all 0.22s ease",
                boxShadow: isSelected
                  ? "0 0 0 4px rgba(245, 124, 0, 0.22), 0 0 22px rgba(245, 124, 0, 0.35), 0 10px 24px rgba(245, 124, 0, 0.18)"
                  : "0 4px 12px rgba(0,0,0,0.06)",
                transform: isSelected ? "scale(1.03)" : "scale(1)",
                animation: isSelected ? `${popBounce} 260ms ease` : "none",
                "&:hover": {
                  transform: isSelected
                    ? "scale(1.04)"
                    : "translateY(-4px) scale(1.02)",
                  boxShadow: isSelected
                    ? "0 0 0 4px rgba(245, 124, 0, 0.25), 0 0 26px rgba(245, 124, 0, 0.4), 0 12px 26px rgba(245, 124, 0, 0.2)"
                    : "0 12px 24px rgba(245, 124, 0, 0.18)",
                },
              }}
            >
              <Typography sx={{ fontSize: "2rem", mb: 1 }}>
                {option.emoji}
              </Typography>

              <Typography
                sx={{
                  fontSize: "1.4rem",
                  fontWeight: "bold",
                  color: "#ff5f00",
                }}
              >
                {option.size}
              </Typography>

              <Typography
                sx={{
                  fontSize: "0.95rem",
                  color: "#6b4f3a",
                  mt: 0.5,
                }}
              >
                {t(option.labelKey)}
              </Typography>
            </ButtonBase>
          );
        })}
      </Box>

      <Button
        variant="contained"
        onClick={onContinue}
        disabled={!selectedPartySize}
        sx={{
          backgroundColor: "#ff5f00",
          color: "#fff",
          px: 5,
          py: 1.5,
          borderRadius: "999px",
          fontWeight: "bold",
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          "&:hover": {
            backgroundColor: "#ef6c00",
          },
          "&.Mui-disabled": {
            backgroundColor: "#ffd8a8",
            color: "#ffffff",
          },
        }}
      >
        {t("welcome.continue")}
      </Button>
    </Box>
  );
}

export default PartySizeStep;