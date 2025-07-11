const pokeapi = {};

pokeapi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url).then((response) => response.json());
};

pokeapi.getPokemon = (offSet = 0, limit = 10) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;
   return fetch(url)
      .then((response) => response.json())
      .then((jsonbody) => jsonbody.results)
      .then((pokemons) => pokemons.map(pokeapi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetail) => pokemonsDetail)
      .catch((error) => console.error(error));
};
