import { Box, Typography, Button, Paper } from "@mui/material";
import dineInGif from "../../assets/Dine-in.gif";
import takeawayGif from "../../assets/Takeaway.gif";
import { useTranslation } from "react-i18next";

export default function PreferenceStep({
  selectedLanguage,
  selectedOrderType,
  onSelectLanguage,
  onSelectOrderType,
  onContinue,
}) {

   const { t } = useTranslation();

  const isContinueDisabled = !selectedLanguage || !selectedOrderType;

  const orderCardStyle = (isSelected) => ({
    width: 280,
    height: 240,
    borderRadius: "24px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: 2,
    backgroundColor: "#ffffff",
    border: isSelected ? "4px solid #ff5f00" : "2px solid #e0e0e0",
    boxShadow: isSelected
      ? "0 0 0 6px rgba(255,95,0,0.2)"
      : "0 8px 24px rgba(0,0,0,0.12)",
    transition: "all 0.3s ease",
    "&:hover": {
      transform: "translateY(-6px)",
      boxShadow: "0 16px 32px rgba(0,0,0,0.18)",
    },
  });

  const languageButtonStyle = (isSelected) => ({
    minWidth: 180,
    borderRadius: "20px",
    py: 2,
    backgroundColor: isSelected ? "#ff5f00" : "#f8f9fa",
    color: isSelected ? "#ffffff" : "#333333",
    border: isSelected ? "3px solid #ff5f00" : "2px solid #dee2e6",
    fontWeight: 700,
    textTransform: "none",
    fontSize: "1.1rem",
    "&:hover": {
      backgroundColor: isSelected ? "#e65500" : "#fff4f0",
      borderColor: "#ff5f00",
    },
  });

  return (
    <Box sx={{ p: 5, textAlign: "center" }}>
      <Typography variant="h3" sx={{ fontWeight: 900, mb: 2, color: "#1a1a1a" }}>
        {t("welcome.serviceTitle")}
      </Typography>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 6, color: "#1a1a1a" }}>
        {t("welcome.chooseDiningType")}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 5, mb: 8, flexWrap: "wrap" }}>
        <Paper
          elevation={0}
          sx={orderCardStyle(selectedOrderType === "dineIn")}
          onClick={() => onSelectOrderType("dineIn")}
        >
          <Box
            component="img"
            src={dineInGif}
            alt={t("welcome.dineInAlt")}
            sx={{
              width: 140,
              height: 140,
              objectFit: "contain",
              borderRadius: "16px",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.4rem" }}>
             {t("welcome.dineIn")}
          </Typography>
          {/*<Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            Enjoy cozy ambience with delicious food and excellent service.
          </Typography>*/}
        </Paper>

        <Paper
          elevation={0}
          sx={orderCardStyle(selectedOrderType === "takeAway")}
          onClick={() => onSelectOrderType("takeAway")}
        >
          <Box
            component="img"
            src={takeawayGif}
            alt={t("welcome.takeawayAlt")}
            sx={{
              width: 140,
              height: 140,
              objectFit: "contain",
              borderRadius: "16px",
              mb: 2,
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: "1.4rem" }}>
            {t("welcome.takeAway")}
          </Typography>
         {/* <Typography variant="body2" color="text.secondary" sx={{ px: 2 }}>
            Grab fresh & hygienically packed meals on the go with quick service.
          </Typography>*/} 
        </Paper>
      </Box>

      <Typography variant="h5" sx={{ fontWeight: 700, mb: 4, color: "#1a1a1a" }}>
        {t("welcome.chooseLanguage")}
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "center", gap: 3, flexWrap: "wrap", mb: 6 }}>

        <Button
          onClick={() => onSelectLanguage("en")}
          sx={languageButtonStyle(selectedLanguage === "en")}
        >
          {t("welcome.languageEnglish")}
        </Button>

        <Button
          onClick={() => onSelectLanguage("ta")}
          sx={languageButtonStyle(selectedLanguage === "ta")}
        >
          {t("welcome.languageTamil")}
        </Button>

        <Button
          onClick={() => onSelectLanguage("ja")}
          sx={languageButtonStyle(selectedLanguage === "ja")}
        >
          {t("welcome.languageJapanese")}
        </Button>
      </Box>

      <Button
        variant="contained"
        onClick={onContinue}
        disabled={isContinueDisabled}
        sx={{
          minWidth: 240,
          borderRadius: "16px",
          py: 2,
          backgroundColor: "#ff5f00",
          color: "#fff",
          fontWeight: 800,
          fontSize: "1.2rem",
          boxShadow: "0 8px 24px rgba(255,95,0,0.3)",
          "&:hover": {
            backgroundColor: "#e65500",
            boxShadow: "0 12px 32px rgba(255,95,0,0.4)",
          },
          "&.Mui-disabled": {
            backgroundColor: "#ffb089",
            color: "#fff",
            boxShadow: "none",
          },
        }}
      >
         {t("welcome.continue")}
      </Button>
    </Box>
  );
}