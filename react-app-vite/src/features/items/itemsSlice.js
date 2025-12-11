import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCharactersService, getCharacterById } from "../../services/itemsService";

export const fetchItems = createAsyncThunk(
    "items/fetchItems",
    async ({ page, query }, { rejectWithValue }) => {
        try {
            const data = await fetchCharactersService(page, query);
            return {
                results: data.results,
                hasMore: data.info.next !== null,
            };
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

export const fetchItemById = createAsyncThunk(
    "items/fetchItemById",
    async (id, { rejectWithValue }) => {
        try {
            return await getCharacterById(id);
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

const itemsSlice = createSlice({
    name: "items",
    initialState: {
        list: [],
        selectedItem: null,
        loadingList: false,
        loadingItem: false,
        errorList: null,
        errorItem: null,
        query: "",
        page: 1,
        hasMore: true,
    },
    reducers: {
        setQuery(state, action) {
            state.query = action.payload;
        },
        resetItems(state) {
            state.list = [];
            state.page = 1;
            state.hasMore = true;
        },
        incrementPage(state) {
            state.page += 1;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchItems.pending, (state) => {
                state.loadingList = true;
                state.errorList = null;
            })
            .addCase(fetchItems.fulfilled, (state, action) => {
                state.loadingList = false;

                if (state.page === 1) {
                    state.list = action.payload.results;
                } else {
                    state.list = [...state.list, ...action.payload.results];
                }

                state.hasMore = action.payload.hasMore;
            })
            .addCase(fetchItems.rejected, (state, action) => {
                state.loadingList = false;
                state.errorList = action.payload;
            })

            .addCase(fetchItemById.pending, (state) => {
                state.loadingItem = true;
                state.errorItem = null;
            })
            .addCase(fetchItemById.fulfilled, (state, action) => {
                state.loadingItem = false;
                state.selectedItem = action.payload;
            })
            .addCase(fetchItemById.rejected, (state, action) => {
                state.loadingItem = false;
                state.errorItem = action.payload;
            });
    },
});

export const { setQuery, resetItems, incrementPage } = itemsSlice.actions;
export default itemsSlice.reducer;
