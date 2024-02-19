import { useEffect, useState } from "react";
import { httpClient } from "../api/httpClient";
import { POKEMON_API_POKEMON_URL } from "../constants";
import { DetailPokemon } from "../types/pokemon.interface";
import { getColorFromUrl } from "../utils/color";

interface UsePokemonProps {
	pokemonName: string | undefined;
}

const usePokemon = ({ pokemonName }: UsePokemonProps) => {
	const [pokemon, setPokemon] = useState<DetailPokemon | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	useEffect(() => {
		if (pokemonName) {
			fetchPokemon();
		}
	}, [pokemonName]);

	useEffect(() => {
		if (pokemon) {
			getPokemonColor();
		}
	}, [pokemon]);

	const getPokemonColor = async () => {
		if (pokemon?.sprites?.other["home"]?.front_shiny) {
			const color = await getColorFromUrl(
				pokemon.sprites.other["home"].front_shiny
			);
			if (color) setPokemon({ ...pokemon, color });
		}
	};
	
	

	const fetchPokemon = async () => {
		if (pokemonName) {
			setIsLoading(true);
			const url = `${POKEMON_API_POKEMON_URL}/${pokemonName}`;
			var http = new XMLHttpRequest();
			http.open("HEAD", url, false);
			http.send();
			if (http.status != 404) {
				const result = await httpClient.get<DetailPokemon>(url);
				if (result?.data) {
					setPokemon(result.data);
				}
				
			} else {
				setPokemon(null);
			}
			setIsLoading(false);
			
		}
	};

	return {
		pokemon,
		isLoading,
	};
};

export default usePokemon;
