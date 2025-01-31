import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";
import wishlistSlice from "./wishlistSlice";
import productDetailsSlice from "./productDetailsSlice";
import userSlice from "./userSlice";
import filtersSlice from "./filtersSlice";
import usersListSlice from "./usersListSlice";
import categoriesSlice from "./categorySlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    categories: categoriesSlice,
    wishlist: wishlistSlice,
    productDetails: productDetailsSlice,
    user: userSlice,
    filters: filtersSlice,
    usersList: usersListSlice,
  },
});

export default store;
