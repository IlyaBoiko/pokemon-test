import { Button, Card, CardContent, Grid, Typography } from "@mui/material"
import { DetailPokemon } from "../types/pokemon.interface"
import { Link } from "react-router-dom";
import { useAppDispatch } from "../hooks/reduxHooks";
import { setSelectedType } from "../redux/pokemonSlice";


interface PokemonBasicInfoProps {
    pokemon: DetailPokemon
}

const PokemonBasicInfo = ({pokemon}: PokemonBasicInfoProps) => {
    const dispatch = useAppDispatch();
    
    return (
        <Card>
            <CardContent>
                <Grid
                    container
                    sx={{ textTransform: "capitalize" }}
                    justifyContent="center"
                    textAlign="center"
                    spacing={2}
                >
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Height</Typography>
                        <Typography variant="body2">{pokemon.height}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Weight</Typography>
                        <Typography variant="body2">{pokemon.weight}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Types:</Typography>
                        <Typography variant="h5">{pokemon.types.map((type) => {
                            return (
                                <Typography key={type.type.name} variant="body2">
                                    {type.type.name}
                                </Typography>
                            )
                        })}</Typography>
                        {pokemon.types.map((type) => (
                            <Button component={Link} to={"/"} key={type.type.name}
                                onClick={() => dispatch(setSelectedType(type.type))}
                            >
                                {type.type.name}
                            </Button>
                        ))}
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="subtitle2">Abilities:</Typography>
                        <Typography variant="h5">{pokemon.abilities.map((ability, id) => {
                            return (
                                <Typography key={id} variant="body2">
                                    {ability.ability.name}
                                </Typography>
                            )
                        })}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="subtitle2">Moves:</Typography>
                        <Typography variant="body2">{pokemon.moves.map((move, id) => {
                            return (
                                <span key={id}>{move.move.name}, </span>
                            )
                        })}</Typography>
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    )
}

export default PokemonBasicInfo