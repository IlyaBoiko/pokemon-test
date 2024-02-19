import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from "@mui/material";
import { IndexedPokemon, ListPokemon } from "../types/pokemon.interface"
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getColorFromUrl } from "../utils/color";
import { useAppSelector } from "../hooks/reduxHooks";

interface PokemonCardProps {
    pokemon: ListPokemon;
}


const PokemonCard = ({ pokemon }: PokemonCardProps) => {
    const [pokemonColor, setPokemonColor] = useState<string | null>(null);
    
    
    
    const getPokemonColor = async()=> {
        const color = await getColorFromUrl(pokemon.image)
        if(color) setPokemonColor(color);
    }

    useEffect(() => {
        getPokemonColor();
    }, [])
    

    return (
        <Card sx={{ backgroundColor: pokemonColor }}>
            <CardActionArea>
                <Link to={`pokemon/${pokemon.name}`} style={{ textDecoration: "none", color: "white" }}>
                    <CardMedia
                        component='img'
                        image={pokemon.image}
                        title={pokemon.name}
                        sx={{ height: 100, objectFit: "contain" }}
                    />
                    <CardContent>
                        <Box sx={{ display: 'flex', flexDirection:'column',alignItems:'center', justifyContent: 'center' }}>
                            <Typography sx={{textTransform: 'capitalize'}}>
                                {pokemon.name}
                            </Typography>
                            <Typography sx={{ textTransform: 'capitalize' }}>
                                #{pokemon.pokedexNumber}
                            </Typography>
                        </Box>
                    </CardContent>
                </Link>
            </CardActionArea>
        </Card>
    )
}

export default PokemonCard