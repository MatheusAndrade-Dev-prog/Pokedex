const pokemonList = document.getElementById("pokemonList");
const loadMoreButton = document.getElementById("loadMoreButton");
const maxRecords = 1164;
const limit = 10;
let offset = 0;

function covertPokemonToLi(pokemon) {
   return `
    <li class="pokemon ${pokemon.type}">
        <samp class="number">${pokemon.number}</samp>
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
