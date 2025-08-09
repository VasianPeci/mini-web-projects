const input = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAttack = document.getElementById("special-attack");
const specialDefense = document.getElementById("special-defense");
const speed = document.getElementById("speed");
const imageContainer = document.getElementById("image-container");
let pokemonData = [];
let pokemonCharacter = {};

const fetchData = async()=>{
  try {
    const res = await fetch("https://pokeapi-proxy.freecodecamp.rocks/api/pokemon");
    const data = await res.json();
    pokemonData = data.results;
  } catch (err){
    console.log(err);
    return;
  }
}

fetchData();

const fetchPokemon = (url)=>{
    fetch(url).then(res => res.json()).then(data => {
      pokemonCharacter = data;
      showPokemon();
    }).catch(err => {
      console.log(err);
    });
}

const search = ()=>{
  const searchValue = input.value.trim().toLowerCase().split(" ").join("-");
  let count = 0;
  pokemonData.forEach((pokemon)=>{
    if(pokemon.name === searchValue || pokemon.id === Number(searchValue)){
      fetchPokemon(pokemon.url);
      count++;
      pokemonName.textContent = capitalize(pokemon.name);
      pokemonId.textContent = `#${pokemon.id}`;
    }
  });

  if(count === 0){
    alert("Pokémon not found");
  }
}

const capitalize = (name)=>{
  let nameCapitalized = [];
  nameCapitalized[0] = name.toUpperCase()[0];
  for(let i = 1; i < name.length; i++){
    nameCapitalized[i] = name.toLowerCase()[i];
  }
  return nameCapitalized.join("");
}

const showPokemon = ()=>{
      types.innerHTML = "";
      height.textContent = `Height: ${pokemonCharacter.height}`;
      weight.textContent = `Weight: ${pokemonCharacter.weight}`;
      imageContainer.innerHTML = `<img id="sprite" src="${pokemonCharacter.sprites.front_default}">`;
      for(let i = 0; i < pokemonCharacter.types.length; i++){
        types.innerHTML += `<span class="types ${pokemonCharacter.types[i].type.name}">${pokemonCharacter.types[i].type.name}</span>`;
      }
      const stats = pokemonCharacter.stats;
      stats.forEach((el)=>{
        if(el.stat.name === "hp"){
          hp.textContent = el.base_stat;
        } else if(el.stat.name === "attack"){
          attack.textContent = el.base_stat;
        } else if(el.stat.name === "defense"){
          defense.textContent = el.base_stat;
        } else if(el.stat.name === "special-attack"){
          specialAttack.textContent = el.base_stat;
        } else if(el.stat.name === "special-defense"){
          specialDefense.textContent = el.base_stat;
        } else if(el.stat.name === "speed"){
          speed.textContent = el.base_stat;
        }
      });
}

searchButton.addEventListener("click", search);

input.addEventListener("keydown", (e)=>{
  if (e.key === "Enter"){
    search();
  }
})