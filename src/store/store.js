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
import commandeSlice from "./commandeSlice";
import productSlice from "./productSlice";
import stockSlice from "./stockSlice";
import supplierSlice from "./supplierSlice";

const store = configureStore({
  reducer: {
    cart: cartSlice,
    products: productsSlice,
    product: productSlice,
    categories: categoriesSlice,
    wishlist: wishlistSlice,
    productDetails: productDetailsSlice,
    filters: filtersSlice,
    user: userSlice,
    usersList: usersListSlice,
    auth: authSlice,
    users: usersSlice,
    commande: commandeSlice,
    stock: stockSlice,
    suppliers: supplierSlice,
  },
});

export default store;
