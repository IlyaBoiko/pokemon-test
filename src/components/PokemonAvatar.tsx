
import { DetailPokemon } from "../types/pokemon.interface"

import { Card, CardContent, CardMedia, Typography } from "@mui/material"
import { Box } from "@mui/system"


interface PokemonAvatarProps {
    pokemon: DetailPokemon
}


const PokemonAvatar = ({pokemon}: PokemonAvatarProps) => {
    
    
    return (
        <Card sx={{ backgroundColor: pokemon.color }}>
            <CardMedia
                component="img"
                sx={{ height: 100, objectFit: "contain" }}
                image={pokemon.sprites.other["home"].front_shiny}
                title={pokemon.name}
            />
            <CardContent>
                <Box sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                }}>
                    <Typography sx={{ textTransform: "capitalize" }}>
                        {pokemon.name}
                    </Typography>
                    <Typography sx={{ textTransform: "capitalize" }}>
                        #{pokemon.id}
                    </Typography>
                </Box>
            </CardContent>
        </Card>
    )
}

export default PokemonAvatar