import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../@types/types";

type FilterSlice = {
  category: number;
  search: string;
  sortType: Category;
}

const initialState: FilterSlice = {
  category: 0,
  search: '',
  sortType: {
    name: 'most popular',
    sortProperty: 'raiting'
  }
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategory: (state, action: PayloadAction<number>) => {
      state.category = action.payload;
    },
    setSortType: (state, action: PayloadAction<Category>) => {
      state.sortType.name = action.payload.name;
      state.sortType.sortProperty = action.payload.sortProperty;
    },
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    }
  }
})

export const { setCategory, setSortType, setSearch } = filterSlice.actions;

export default filterSlice.reducer;