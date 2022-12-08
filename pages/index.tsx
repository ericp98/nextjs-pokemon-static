import type { NextPage, GetStaticProps } from "next";
import { Card, Grid, Row, Text } from '@nextui-org/react';

import { pokeApi } from "../api";
import { Layout } from "../components/layouts/index";
import { PokemonListResponse, SmallPokemon } from "../interfaces";
import { PokemonCard } from '../components/pokemon';

interface Props {
  pokemons: SmallPokemon[];
}

const HomePage: NextPage<Props> = ({ pokemons }) => {

  return (
    <>
      <Layout title="PokeApp">
        <Grid.Container gap={ 4 } justify='center'>
          {pokemons.map(( pokemon ) => {
            return (
              <PokemonCard 
                key={pokemon.id} 
                pokemon={pokemon} 
              />
            )
          })}
        </Grid.Container>
      </Layout>
    </>
  );
};

// Solo se ejecuta en el servidor, excepto las props que viajan dentro del componente
export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>("/pokemon?limit=151");

  const pokemons: SmallPokemon[] = data.results.map((pokemon, i) => {
    return {
      ...pokemon,
      id: i + 1,
      img: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${i+1}.svg`,
    };
  });

  return {
    props: {
      pokemons,
    },
  };
};

export default HomePage;
