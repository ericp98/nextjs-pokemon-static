const toggleFavourite = ( id: number) => {

    let favourites: number[] = JSON.parse( localStorage.getItem('favourites') || '[]' )

    if (favourites.includes(id)){
        favourites = favourites.filter( pokeId => pokeId !== id )
    } else {
        favourites.push( id )
    }

    localStorage.setItem('favourites', JSON.stringify( favourites ))
}

const existInFavourites = ( id: number ): boolean => {

    // chequea que el codigo se este ejecutando en el front
    if (typeof window === 'undefined') {
        return false
    }

    const favourites: number[] = JSON.parse( localStorage.getItem('favourites') || '[]' )

    return favourites.includes(id)
}

const pokemons = (): number[] => {

    return JSON.parse( localStorage.getItem('favourites') || '[]')

}

export default {
    toggleFavourite,
    existInFavourites,
    pokemons
}