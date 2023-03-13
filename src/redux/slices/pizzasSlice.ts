import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import { Category, Pizza } from "../../@types/types";

type PizzaSlice = {
  items: Pizza[];
  loading: boolean;
}

type Params = {
  sortType: Category;
  category: number;
  search: string;
}

const initialState: PizzaSlice = {
  items: [],
  loading: true
}

export const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  reducers: {
    setPizzas: (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPizzas.pending, (state) => {
      state.items = [];
      state.loading = true;
    });

    builder.addCase(fetchPizzas.fulfilled, (state, action: PayloadAction<Pizza[]>) => {
      state.items = action.payload;
      state.loading = false;
    });

    builder.addCase(fetchPizzas.rejected, (state) => {
      state.items = [];
      state.loading = false;
    })
  }
})

export const fetchPizzas = createAsyncThunk('pizzas/fetchAllPizzas', async (params: Params) => {
  const { sortType, category, search } = params;
  const { data } = await axios(`https://636d04f791576e19e31ceb50.mockapi.io/pizzas?sortBy=${sortType.sortProperty}&${category > 0 ? `category=${category}` : ''}&title=${search}`);
  return data;
})

export const { setPizzas } = pizzasSlice.actions;

export default pizzasSlice.reducer;