import { Card, Grid, Row, Text } from "@nextui-org/react";
import { useRouter } from "next/router";
import { FC, PropsWithChildren } from "react";
import { SmallPokemon } from "../../interfaces";

interface Props extends PropsWithChildren {
  pokemon: SmallPokemon;
}

export const PokemonCard: FC<Props> = ({ pokemon }) => {

  const router = useRouter()

  const goToPokemonId = () => {
    router.push(`/name/${ pokemon.name }`)
  }

  const { id, img, name } = pokemon;
  return (
    <Grid xs={6} sm={3} md={2} xl={1} key={id}>
      <Card 
        hoverable 
        clickable
        onClick={ goToPokemonId }
      >
        <Card.Body css={{ p: 1 }}>
          <Card.Image src={img} width="100%" height={140} />
        </Card.Body>
        <Card.Footer>
          <Row>
            <Text transform="capitalize">{name}</Text>
            <Text>#{id}</Text>
          </Row>
        </Card.Footer>
      </Card>
    </Grid>
  );
};
