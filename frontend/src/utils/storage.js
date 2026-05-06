export const saveGuestToLocal = (guest) => {
  localStorage.setItem("guestName", guest.name || "");
  localStorage.setItem("guestPhone", guest.phone || "");
};

export const getGuestFromLocal = () => {
  return {
    name: localStorage.getItem("guestName") || "",
    phone: localStorage.getItem("guestPhone") || "",
  };
};

export const saveSessionPrefs = ({ partySize, diningType, language }) => {
  sessionStorage.setItem("partySize", partySize || "");
  sessionStorage.setItem("diningType", diningType || "");
  sessionStorage.setItem("language", language || "");
};

export const getSessionPrefs = () => {
  return {
    partySize: sessionStorage.getItem("partySize") || "",
    diningType: sessionStorage.getItem("diningType") || "",
    language: sessionStorage.getItem("language") || "",
  };
};

export const clearGuestData = () => {
  localStorage.removeItem("guestName");
  localStorage.removeItem("guestPhone");
  sessionStorage.removeItem("partySize");
  sessionStorage.removeItem("diningType");
  sessionStorage.removeItem("language");
};

export const saveAdminSession = (admin) => {
  localStorage.setItem("isAdminLoggedIn", "true");
  localStorage.setItem("adminUsername", admin.username || "");
};

export const getAdminSession = () => {
  return {
    isAdminLoggedIn: localStorage.getItem("isAdminLoggedIn") === "true",
    adminUsername: localStorage.getItem("adminUsername") || "",
  };
};

export const clearAdminSession = () => {
  localStorage.removeItem("isAdminLoggedIn");
  localStorage.removeItem("adminUsername");
};