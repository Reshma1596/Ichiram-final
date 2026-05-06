import ramen1 from "../assets/react.svg";
import ramen2 from "../assets/react.svg";
import ramen3 from "../assets/react.svg";

const menuData = [
  {
    id: "tonkotsu",
    nameKey: "menu.items.tonkotsu.name",
    descriptionKey: "menu.items.tonkotsu.description",
    price: 320,
    image: ramen1,
    category: "ramen",
    foodType: "nonveg",
    isBestseller: true,
  },
  {
    id: "shoyu",
    nameKey: "menu.items.shoyu.name",
    descriptionKey: "menu.items.shoyu.description",
    price: 280,
    image: ramen2,
    category: "ramen",
    foodType: "nonveg",
    isBestseller: false,
  },
  {
    id: "miso",
    nameKey: "menu.items.miso.name",
    descriptionKey: "menu.items.miso.description",
    price: 300,
    image: ramen3,
    category: "ramen",
    foodType: "veg",
    isBestseller: false,
  },
];

export default menuData;