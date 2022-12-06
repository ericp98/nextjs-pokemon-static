import React, { useEffect, useState } from "react";
import { Layout } from "../../components/layouts";
import { GetStaticProps, NextPage, GetStaticPaths } from "next";
import { pokeApi } from "../../api";
import { Pokemon } from "../../interfaces";
import { Grid, Card, Text, Button, Container } from '@nextui-org/react';
import Image from 'next/image';
import { localFavourites } from "../../utils";
import confetti from 'canvas-confetti'
import { PokemonListResponse } from '../../interfaces/pokemon-list';
import { getPokemonInfo } from '../../utils/getPokemonInfo';

interface Props {
  pokemon: Pokemon;
}

const PokemonByNamePage: NextPage<Props> = ({ pokemon }) => {

  const [isInFavourites, setisInFavourites] = useState( false )

  useEffect(() => {
    setisInFavourites(localFavourites.existInFavourites( pokemon.id ))
  }, [isInFavourites])
  

  const onToggleFavorite = () => {
    localFavourites.toggleFavourite( pokemon.id )
    setisInFavourites( !isInFavourites )

    if (isInFavourites) return;

    confetti({
      zIndex: 999,
      particleCount: 100,
      spread: 160,
      angle: -100,
      origin: {
        x: 1,
        y: 0
      }
    })
  }

  return (
    <Layout title={pokemon.name}>
      <Grid.Container css={{ marginTop: "5px" }} gap={2}>
        <Grid xs={12} sm={4}>
          <Card hoverable css={{ padding: "30px" }}>
            <Card.Body>
              <Card.Image
                src={pokemon.sprites.other?.dream_world.front_default || '/no-image.png'}  
                alt={pokemon.name}
                width="100%"
                height={200}
              />
            </Card.Body>
          </Card>
        </Grid>

        <Grid xs={12} sm={8}>
          <Card>
            <Card.Header css={{ display: 'flex', justifyContent: 'space-between' }}>
              <Text h1 transform="capitalize">{pokemon.name}</Text>

              <Button 
                color='gradient'
                ghost={ !isInFavourites }
                onClick={onToggleFavorite}
              >
                { isInFavourites ? 'Sacar de favoritos' : 'Guardar en favoritos' }
              </Button>
            </Card.Header>
            <Card.Body>
              <Text size={30}>Sprites:</Text>

              <Container direction="row" display="flex" gap={0} justify='space-around'>
                <Image 
                  src={ pokemon.sprites.front_default }
                  alt={ pokemon.name }
                  width={100}
                  height={100}
                />
                <Image 
                  src={ pokemon.sprites.back_default }
                  alt={ pokemon.name }
                  width={100}
                  height={100}
                />
                <Image 
                  src={ pokemon.sprites.front_shiny }
                  alt={ pokemon.name }
                  width={100}
                  height={100}
                />
                <Image 
                  src={ pokemon.sprites.back_shiny }
                  alt={ pokemon.name }
                  width={100}
                  height={100}
                />
              </Container>
            </Card.Body>
          </Card>

        </Grid>
      </Grid.Container>
    </Layout>
  );
};

// Retorna los paramertros predefinidos: En este caso son 151 nombres de pokemons estaticos
// En buildtime ejecuta este codigo para indicar los paths permitidos para ingresar a la pagina
export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const { data } = await pokeApi.get<PokemonListResponse>(`/pokemon?limit=151`);
  const pokemonNames: string[] = data.results.map( pokemon =>  pokemon.name )

  return {
    paths: pokemonNames.map((name) => ({
      params: { name },
    })),
    // Indica que hacer si se ingresa un id que no esta en la lista, en ´false´ retorna 404
    fallback: false,
  };
};

// Argumentos que puede recibir, vienen de 'getStaticPaths'
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { name } = params as { name: string };

  return {
    props: {
      pokemon: await getPokemonInfo(name)
    },
  };
};

export default PokemonByNamePage;
