const pokeApi = {};

function covertPokeApiDetailToPokemoin(pokeDetail) {
   const pokemon = new Pokemon();
   pokemon.number = pokeDetail.id;
   pokemon.name = pokeDetail.name;
   const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name);
   const [type] = types;
   pokemon.types = types;
   pokemon.type = type;
   pokemon.photo = pokeDetail.sprites.other.dream_world.front_default;
   pokemon.hp = pokeDetail.stats[0].base_stat;
   pokemon.attack = pokeDetail.stats[1].base_stat;
   pokemon.specialAttack = pokeDetail.stats[3].base_stat;
   pokemon.defense = pokeDetail.stats[2].base_stat;
   pokemon.specialDefense = pokeDetail.stats[4].base_stat;
   pokemon.speed = pokeDetail.stats[5].base_stat;
   pokemon.evolução = pokeDetail.species.url;
   pokemon.habilidades = pokeDetail.abilities.map(
      (ability) => ability.ability.name
   );
   pokemon.stats = pokeDetail.stats.map((stat) => stat.stat.name);
   pokemon.moves = pokeDetail.moves.map((move) => move.move.name);

   return pokemon;
}
pokeApi.getPokemonDetail = (pokemon) => {
   return fetch(pokemon.url)
      .then((response) => response.json())
      .then(covertPokeApiDetailToPokemoin);
};

pokeApi.getPokemonById = (id) => {
   const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
   let pokemon;

   return fetch(url)
      .then((response) => response.json())
      .then((pokeDetail) => {
         pokemon = covertPokeApiDetailToPokemoin(pokeDetail);
         return fetch(pokemon.evolução);
      })
      .then((response) => response.json())
      .then((speciesDetail) => {
         let descriptionEntry = speciesDetail.flavor_text_entries.find(
            (entry) => entry.language.name === "pt"
         );

         if (!descriptionEntry) {
            descriptionEntry = speciesDetail.flavor_text_entries.find(
               (entry) => entry.language.name === "en"
            );
         }

         pokemon.description = descriptionEntry
            ? descriptionEntry.flavor_text
                 .replace(/\f/g, " ")
                 .replace(/\n/g, " ")
            : "Nenhuma descrição disponível.";
         return pokemon;
      });
};

pokeApi.getPokemons = (offSet = 0, limit = 5) => {
   const url = `https://pokeapi.co/api/v2/pokemon?offset=${offSet}&limit=${limit}`;
   return fetch(url)
      .then((response) => response.json())
      .then((jsonbody) => jsonbody.results)
      .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
      .then((detailRequests) => Promise.all(detailRequests))
      .then((pokemonsDetail) => pokemonsDetail)
      .catch((error) => console.error(error));
};
