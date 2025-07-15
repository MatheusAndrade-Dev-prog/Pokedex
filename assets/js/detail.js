const pokemonDetailContainer = document.getElementById(
   "pokemon-detail-container"
);

function getPokemonIdFromUrl() {
   const urlParams = new URLSearchParams(window.location.search);
   return urlParams.get("id");
}

function convertPokemonToDetailHtml(pokemon) {
   return `
        <section class="pokemon-detail ${pokemon.type}">
            <header class="header">
                <a href="index.html" class="back-button">&larr;</a>
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pokemon.number}</span>
            </header>

            <div class="image-container">
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="details">
                <h2>Detalhes</h2>
                <ol class="types">
                    ${pokemon.types
                       .map((type) => `<li class="type ${type}">${type}</li>`)
                       .join("")}
                </ol>

                <h3>Habilidades</h3>
                <ul class="abilities">
                    ${pokemon.habilidades
                       .map((habilidade) => `<li>${habilidade}</li>`)
                       .join("")}
                </ul>

                <h3>Descrição</h3>
                <p class="description">${pokemon.description}</p>
                
                <h3>Atributos Base</h3>
                <ul class="stats">
                    <li><span class="stat-name">HP:</span> <span class="stat-value">${
                       pokemon.hp
                    }</span></li>
                    <li><span class="stat-name">Attack:</span> <span class="stat-value">${
                       pokemon.attack
                    }</span></li>
                    <li><span class="stat-name">Defense:</span> <span class="stat-value">${
                       pokemon.defense
                    }</span></li>
                    <li><span class="stat-name">Special Attack:</span> <span class="stat-value">${
                       pokemon.specialAttack
                    }</span></li>
                    <li><span class="stat-name">Special Defense:</span> <span class="stat-value">${
                       pokemon.specialDefense
                    }</span></li>
                    <li><span class="stat-name">Speed:</span> <span class="stat-value">${
                       pokemon.speed
                    }</span></li>
                </ul>
            </div>
        </section>
    `;
}

function loadPokemonDetail() {
   const pokemonId = getPokemonIdFromUrl();
   if (!pokemonId) return;

   pokeApi.getPokemonById(pokemonId).then((pokemon) => {
      const newHtml = convertPokemonToDetailHtml(pokemon);
      pokemonDetailContainer.innerHTML = newHtml;
   });
}

loadPokemonDetail();
