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
      //Fetch Products
      .addCase(getProduct.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getProduct.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getProduct.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.data = action.payload;
      })

      // Add New Product
      .addCase(addProduct.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(addProduct.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.product = action.payload;
      })

      // Update Product
      .addCase(updadeProduct.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(updadeProduct.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(updadeProduct.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.product = action.payload;
      })

      //Get Variants
      .addCase(getVariants.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(getVariants.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(getVariants.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.variants = action.payload;
      })

      //Get Variants
      .addCase(addVariant.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(addVariant.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(addVariant.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.variants.push(action.payload);
      });
  },
});

export const getProduct = createAsyncThunk("product/get", async (id) => {
  const res = await api.get(`/product/${id}`);
  if (res.data) {
    return res.data;
  }
});
export const getVariants = createAsyncThunk(
  "product/get-variant",
  async (id) => {
    const res = await api.get(`/detail-product/${id}`);
    if (res.data) {
      return res.data;
    }
  }
);

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
export const addVariant = createAsyncThunk(
  "product/add-variant",
  async ({ formData, id }) => {
    try {
      const res = await api.post("/detail-product", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        toast.success("Variant added successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(" Faild to add this Variant !  ");
    }
  }
);

// Update product
export const updadeProduct = createAsyncThunk(
  "product/edit",
  async ({ formData, id }) => {
    try {
      const res = await api.patch(`/product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      console.log("🚀 ~ res:", res);

      if (res.data) {
        toast.success("Product updated successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(" Faild to update this product !  ");
    }
  }
);

// export const {} = productSlice.actions;

export default productSlice.reducer;
