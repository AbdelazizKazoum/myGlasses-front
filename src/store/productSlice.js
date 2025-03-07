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
  reducers: {
    setProduct(state, action) {
      state.product = action.payload;
    },
    setVariants(state, action) {
      state.variants = action.payload;
    },
  },
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
        console.log("🚀 ~ .addCase ~ action:", action);
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

      //Add Variants
      .addCase(addVariant.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(addVariant.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(addVariant.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.variants.push(action.payload);
      })

      //Update Variants
      .addCase(updateVariant.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(updateVariant.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(updateVariant.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.variants = state.variants.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else return item;
        });
      })
      //Update Stock
      .addCase(updateStock.pending, (state, action) => {
        state.status = statusCode.pending;
      })
      .addCase(updateStock.rejected, (state, action) => {
        state.status = statusCode.failure;
      })
      .addCase(updateStock.fulfilled, (state, action) => {
        state.status = statusCode.success;
        state.variants = state.variants.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          } else return item;
        });
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
  "product/get-variants",
  async (id, rejectWithValue) => {
    try {
      const res = await api.get(`/detail-product/get/${id}`);
      return res.data;
    } catch (error) {
      return rejectWithValue("faild ro fetch variants !");
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

// Add variant for the product
export const addVariant = createAsyncThunk(
  "product/add-variant",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const res = await api.post(`/detail-product/add/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      if (res.data) {
        toast.success("Variant added successfully");
        return res.data;
      }
    } catch (error) {
      console.log("🚀 ~ error:", error);

      toast.error(
        error.response?.data?.message ?? "Faild to add this Variant ! "
      );
      return rejectWithValue(error.response.data);
    }
  }
);

// Update variant for the product
export const updateVariant = createAsyncThunk(
  "product/edit-variant",
  async ({ formData, id }, { rejectWithValue }) => {
    try {
      const res = await api.patch(`/detail-product/update/${id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Variant updated successfully");
      return res.data;
    } catch (error) {
      toast.error(
        error.response?.data?.message ?? "Faild to update this Variant ! "
      );
      return rejectWithValue(false);
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

// add stock for the product variant
export const updateStock = createAsyncThunk(
  "product/add-stock",
  async ({ qty, id }, { rejectWithValue }) => {
    console.log("🚀 ~ qty:", qty);

    try {
      const res = await api.patch(`/detail-product/stock/${id}`, { qty });
      if (res.data) {
        toast.success("stock updated successfully");
        return res.data;
      }
    } catch (error) {
      toast.error(error.response?.data?.message ?? "Faild to update stock ! ");
      return rejectWithValue(error.response.data);
    }
  }
);

export const { setProduct, setVariants } = productSlice.actions;

export default productSlice.reducer;
