import { Card, Grid } from "@nextui-org/react";
import { FavouritesCardPokemon } from './index';

interface FavouritesProps {
    favourites: number[]
}

export const FavouritesPokemons = ( { favourites } : FavouritesProps) => {
  return (
    <Grid.Container gap={2} direction="row" justify="flex-start">
      {favourites.map((id) => (
        <FavouritesCardPokemon id={id} key={id} />
      ))}
    </Grid.Container>
  );
};
