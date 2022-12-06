import React, { useEffect, useState } from 'react'
import { Layout } from '../../components/layouts'
import { NoFavourites } from '../../components/ui/index'
import { localFavourites } from '../../utils'
import { FavouritesPokemons } from '../../components/pokemon/index'

const FavouritesPage = () => {

  const [favouritesPokemons, setfavouritesPokemons] = useState<number[]>([])

  useEffect(() => {
    setfavouritesPokemons( localFavourites.pokemons() )
  }, [])
  

  return (
    <Layout title='Favourites'>

      {
        favouritesPokemons.length === 0
          ? (<NoFavourites />)
          : (<FavouritesPokemons favourites={favouritesPokemons} />)
      }
      
    </Layout>
  )
}

export default FavouritesPage 