import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { statusCode } from "../utils/statusCode";
import api from "../lib/api";
import { toast } from "react-toastify";

const initialState = {
  product: null,
  variants: [],
  status: statusCode.idle,
};

const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload;
      });

    builder
      .addCase(addProduct.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.product = action.payload;
      });
  },
});

export const getProduct = createAsyncThunk("products/get", async (id) => {
  const res = await api.get(`/product/${id}`);
  if (res.data) {
    return res.data;
  }
});

//
// Create new product
export const addProduct = createAsyncThunk("products/new", async (formData) => {
  try {
    const res = await api.post("/product/add", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    if (res.data) {
      toast.success("Product created successfully");
      return res.data;
    }
  } catch (error) {
    toast.error(" Faild to create this product !  ");
  }
});

// Create new product
// export const updadeProduct = createAsyncThunk(
//   "products/edit",
//   async ({ formData, id }) => {
//     try {
//       const res = await api.patch(`/product/${id}`, formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       console.log("🚀 ~ res:", res);

//       if (res.data) {
//         toast.success("Product updated successfully");
//         return res.data;
//       }
//     } catch (error) {
//       toast.error(" Faild to update this product !  ");
//     }
//   }
// );

// export const {} = productSlice.actions;

export default productSlice.reducer;
