function covertPokeminTypesToLi(pokemonType) {
   return pokemonType.map(
      (typeSlot) => `<li class="type">${typeSlot.type.name}</li>`
   );
}

function covertPokemonToLi(pokemon) {
   return `
    <li class="pokemon">
        <samp class="number">${pokemon.order}</samp>
        <span class="name">${pokemon.name}</span>
        <div class="detalhes">
    <ol class="types">
       ${covertPokeminTypesToLi(pokemon.types).join("")}
    </ol>
    <img
        src="${pokemon.sprites.other.dream_world.front_default}"
        alt="${pokemon.name}">
        </div>
       </li>
        
`;
}

const pokemonList = document.getElementById("pokemonList");

pokeapi
   .getPokemon()
   .then((pokemons = []) => {
      const newHtml = pokemons.map(covertPokemonToLi).join("");
      pokemonList.innerHTML = newHtml;
   })

   .finally(function () {
      console.log("Requisisão concluida!");
   });
