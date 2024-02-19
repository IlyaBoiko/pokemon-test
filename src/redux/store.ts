import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";

const store = configureStore({
	reducer: {
		pokemons: pokemonReducer,
	},
});


export type AppThunk = (...args: any) => void;
export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
export default store;
