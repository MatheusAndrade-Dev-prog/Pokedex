const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 1164;
const limit = 10;
let offset = 0;

function selectPokemon(id) {
   const modalBody = document.getElementById("pokemonModalBody");
   const pokemonModal = new bootstrap.Modal(
      document.getElementById("pokemonModal")
   );

   pokeApi
      .getPokemonById(id)
      .then((pokemon) => {
         modalBody.innerHTML = convertPokemonToDetailHtml(pokemon); // Use a função que gera o HTML de detalhes
         pokemonModal.show();
      })
      .catch((error) => {
         console.error("Erro ao carregar detalhes:", error);
         modalBody.innerHTML =
            '<p class="text-danger">Falha ao carregar detalhes do Pokémon.</p>';
         pokemonModal.show();
      });
}

function covertPokemonToLi(pokemon) {
   return `
    <li class="pokemon ${pokemon.type}" onclick="selectPokemon(${
      pokemon.number
   })">
        <span class="number">#${pokemon.number}</span>
        <span class="name">${pokemon.name}</span>
        <div class="detalhes">
    <ol class="types">
       ${pokemon.types
          .map((type) => `<li class="type ${type}">${type}</li>`)
          .join("")}
    </ol>
    <img src="${pokemon.photo}"
    alt="${pokemon.name}">
        </div>
       </li>     
        
`;
}

function loadPokemonItens(offSet, limit) {
   pokeApi
      .getPokemons(offSet, limit)
      .then((pokemons = []) => {
         const newHtml = pokemons.map(covertPokemonToLi).join("");
         pokemonList.innerHTML += newHtml;
      })

      .finally(function () {
         console.log("Requisisão concluida!");
      });
}

loadPokemonItens(offset, limit);

loadMoreButton.addEventListener("click", () => {
   offset += limit;
   const qrRecordWithNextPage = offset + limit;

   if (qrRecordWithNextPage >= maxRecords) {
      const newLimit = maxRecords - offset;
      loadPokemonItens(offset, newLimit);

      loadMoreButton.parentElement.removeChild(loadMoreButton);
   } else {
      loadPokemonItens(offset, limit);
   }
});
