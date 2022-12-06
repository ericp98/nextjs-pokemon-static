import { pokeApi } from "../api";
import { Pokemon } from '../interfaces';

export const getPokemonInfo = async (nameOrId: string) => {

  const { data } = await pokeApi.get<Pokemon>(`/pokemon/${nameOrId}`);

  // tomando solo los datos que se utilizaran del pokemon
  return {
    id: data.id,
    name: data.name,
    sprites: data.sprites,
  };
};