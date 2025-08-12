<script lang="ts">
  import { onMount } from "svelte";
  import ScatterPlot from "./components/ScatterPlot.svelte";
  import * as d3 from "d3";

  let data: any[] = $state([]);

  const margin = {
    top: 50,
    bottom: 70,
    left: 95,
    right: 50,
  }

  let xProperty = $state("weight");
  let yProperty = $state("raceTime");
  let colorProperty = "name";

  let pokeData: any = $state([]);

  onMount(async () => {
    data = await d3.csv("https://raw.githubusercontent.com/gckirchoff/league-of-pigs-data/refs/heads/master/data.csv", row => ({
      ...row,
      round: +row.round,
      season: +row.season,
      race: +row.race,
      length: +row.length,
      height: +row.height,
      waist: +row.waist,
      weight: +row.weight,
      isMale: row["is male"] === 'TRUE',
      position: +row.position,
      raceTime: +row["race time"],
    }));
    
    const fetchedPokeData: any = await d3.json("https://pokeapi.co/api/v2/pokemon?limit=100");
    const allResults = await Promise.all(fetchedPokeData.results.map(pokemon => d3.json(pokemon.url).then(data => data)));
    const parsedResults = allResults.map(pokemon => ({
      weight: pokemon.weight,
      height: pokemon.height,
      defense: pokemon.stats[2].base_stat,
      speed: pokemon.stats[5].base_stat,
      type: pokemon.types[0].type.name
    }))
    pokeData = parsedResults;
  })
  
  const colorMap = {
    'ginger hamilton': 'orange',
    'hoshi oinku': 'green',
    'pepper sanchez': 'purple',
    'bear trotsky': 'red',
    'piggy smalls': 'blue',
  };

  const pokeColorMap = {
    fire: 'red',
    grass: 'green',
    water: 'blue',
    dark: 'black',
    rock: 'brown',
    ground: 'beige',
    electric: 'yellow',
    flying: 'grey',
    bug: '#98e336',
    dragon: '#081e70',
    poison: '#purple',
    ghost: '#715fe3',
    fighting: '#bd4317',
    ice: '#62fcde',
    normal: '#849995',
    psychic: 'pink',
  };

</script>

<h1>Racing Pigs Data</h1>
<ScatterPlot {data} {margin} {xProperty} {yProperty} {colorProperty} {colorMap}></ScatterPlot>
<h1>Pokemon Data</h1>
<ScatterPlot data={pokeData} {margin} xProperty="weight" yProperty="defense" colorProperty="type" colorMap={pokeColorMap}></ScatterPlot>

<style>
  h1 {
    text-align: center;
  }
</style>