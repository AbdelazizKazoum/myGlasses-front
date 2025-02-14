import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productsSlice from "./productsSlice";
import wishlistSlice from "./wishlistSlice";
import productDetailsSlice from "./productDetailsSlice";
import filtersSlice from "./filtersSlice";
import usersListSlice from "./usersListSlice";
import categoriesSlice from "./categorySlice";
import authSlice from "./authSlice";
import usersSlice from "./usersSlice";
import userSlice from "./userSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    categories: categoriesSlice,
    wishlist: wishlistSlice,
    productDetails: productDetailsSlice,
    filters: filtersSlice,
    user: userSlice,
    usersList: usersListSlice,
    auth: authSlice,
    users: usersSlice,
  },
});

export default store;
