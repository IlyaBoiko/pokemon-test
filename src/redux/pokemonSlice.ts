import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ListPokemon, IndexedType, IndexedPokemon, PokemonListResponse, PokemonByTypeListResponse } from "../types/pokemon.interface";
import { httpClient } from "../api/httpClient";
import {  POKEMON_API_POKEMON_URL, POKEMON_IMAGES_BASE_URL } from "../constants";

interface PokemonState {
	pokemons: IndexedPokemon[];
	nextUrl: string;
	isLoading: boolean;
	selectedType: IndexedType | null;
	listPokemons: ListPokemon[];
}

const initialState: PokemonState = {
	pokemons: [],
	nextUrl: POKEMON_API_POKEMON_URL,
	isLoading: false,
	selectedType: null,
	listPokemons: [],
};

const pokemonSlice = createSlice({
	name: "pokemon",
	initialState,
	reducers: {
		setPokemons: (state, action: PayloadAction<IndexedPokemon[]>) => {
			state.pokemons = action.payload;
		},
		setNextUrl: (state, action: PayloadAction<string>) => {
			state.nextUrl = action.payload;
			console.log(action.payload);
		},
		setSelectedType: (state, action: PayloadAction<IndexedType | null>) => {
			state.selectedType = action.payload;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPokemonsThunk.pending, (state, action) => {
			state.isLoading = true;
		});
		builder.addCase(fetchPokemonsThunk.fulfilled, (state, action) => {
			state.isLoading = false;
			state.pokemons = action.payload.results;
			const listPokemons = action.payload.results.map<ListPokemon>((p) =>
				indexedPokemonToListPokemon(p)
			);
			state.nextUrl = action.payload.next;
			state.listPokemons = [...state.listPokemons, ...listPokemons];
		});

		builder.addCase(fetchPokemonsByType.fulfilled, (state, action) => {
			state.isLoading = false;
			const listPokemons = action.payload.map<ListPokemon>((obj) =>
				indexedPokemonToListPokemon(obj.pokemon)
			);
			state.listPokemons = listPokemons;
			state.nextUrl = '';
		});
	},
});

export const {
	setPokemons,
	setNextUrl,
	setSelectedType,
} = pokemonSlice.actions;

export const fetchPokemonsThunk = createAsyncThunk(
	"pokemon/fetchPokemonsThunk",
	async (url: string) => {
		const response = await httpClient.get<PokemonListResponse>(url);
		return response.data;
	}
);
export const fetchPokemonsByType = createAsyncThunk(
	"pokemon/fetchPokemonsByType",
	async (url: string) => {
		const response = await httpClient.get<PokemonByTypeListResponse>(url);
		
		return response.data.pokemon;
	}
);


const indexedPokemonToListPokemon = (indexedPokemon: IndexedPokemon) => {
	const pokedexNumber = parseInt(
		indexedPokemon.url
			.replace(`${POKEMON_API_POKEMON_URL}/`, "")
			.replace("/", "")
	);

	const listPokemon: ListPokemon = {
		name: indexedPokemon.name,
		url: indexedPokemon.url,
		image: `${POKEMON_IMAGES_BASE_URL}/${pokedexNumber}.png`,
		pokedexNumber,
	};

	return listPokemon;
};



export default pokemonSlice.reducer;
