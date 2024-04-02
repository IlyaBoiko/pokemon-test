import { Button, Container, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {fetchPokemonsThunk, setSelectedType, fetchPokemonsByType } from "../redux/pokemonSlice";
import { useAppDispatch, useAppSelector } from "../hooks/reduxHooks";
import PokemonCard from "../components/PokemonCard";
import { RootState } from "../redux/store";
import { POKEMON_TYPES } from "../constants";
import styles from "./Home.module.scss";
import Draggable from 'react-draggable';




export const Home = () => {
    const dispatch = useAppDispatch();
    const pokemons = useAppSelector((state: RootState) => state.pokemons);
    
    useEffect(() => {
        if (pokemons.selectedType !== null) {
            dispatch(fetchPokemonsByType(pokemons.selectedType.url));
        } else {
            dispatch(fetchPokemonsThunk(pokemons.nextUrl));
        }
    }, [pokemons.selectedType])

    const getNextPokemons = () => {
        dispatch(fetchPokemonsThunk(pokemons.nextUrl))
    }
    
    const [searchName, setSearchName] = useState<string>("");
    const navigate = useNavigate();

    const handlePokemonClick = () => {
        if(searchName === '') {
            alert('Please write a Pokemon Name')
            return
        } else {
            navigate(`/pokemon/${searchName.toLowerCase()}`);
        }
        
    };
    

    return (
        <Container>
            <Grid item container mb={1} mt={2} xs={12}>
                <TextField
                    required
                    id="outlined-basic"
                    label="Search by Pokémon Name"
                    variant="outlined"
                    value={searchName}
                    onChange={(e) => setSearchName(e.target.value)}
                />
                <Button variant="contained" onClick={handlePokemonClick}>
                    Search
                </Button>
            </Grid>
            <Grid container spacing={2} mt={1}>
                <Grid
                    container
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}>
                    {POKEMON_TYPES.map((type) => (
                        <Button key={type.name}
                            variant="contained"
                            sx={{
                                "&.MuiButton-contained": {
                                    background: type.color,
                                },
                                m: 1,
                            }}
                            onClick={() => dispatch(setSelectedType(type))}>
                            {type.name}
                        </Button>
                    ))}
                </Grid>
                {pokemons?.selectedType?.name &&
                (
                    <Grid
                        container
                        item
                        xs = { 12 }
                        sx = {{ display: "flex", justifyContent: "center" }}>
                        <Typography variant="h3">
                            Selected type:
                            <span className={styles.span}>{pokemons?.selectedType?.name}</span>
                        </Typography>
                    </Grid>
                )}
                
                <Grid
                    container
                    item
                    xs={12}
                    sx={{ display: "flex", justifyContent: "center" }}>
                    <Grid container spacing={2}>
                        {pokemons.listPokemons.length > 0 ? pokemons.listPokemons.map((p, id) => (
                            <Draggable allowAnyClick={true}>
                                <Grid key={id} item xs={4}>
                                    <PokemonCard pokemon={p} />
                                </Grid>
                            </Draggable>
                            
                            ))
                            : null}
                    </Grid>
                    {!!pokemons.nextUrl ? (
                        <Button variant="contained" onClick={getNextPokemons}>
                            Load more Pokemon
                        </Button>
                    ) : null}
                </Grid> 
             </Grid>
        </Container>
    );
};

