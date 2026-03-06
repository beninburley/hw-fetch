import { fetchJsonUnknown } from "./types/api";
import { isPokemonJSON } from "./types/pokeType";

async function fetchPokemon(name: string) {
  const url: string = "https://pokeapi.co/api/v2/" + name;

  const response = await fetchJsonUnknown(url);
  if (!response.ok) {
    if (response.error.kind === "http") {
      console.log(
        "Error for",
        url,
        "::",
        response.error.kind,
        response.error.status,
        response.error.statusText,
      );
    } else {
      console.log(
        "Error fetching",
        url,
        "Error information:",
        response.error.kind,
        response.error.message,
      );
    }
  } else if (isPokemonJSON(response.data)) {
    console.log(
      "Success! Pokemon info: ",
      response.data.species.name,
      response.data.abilities[0].ability.name,
      response.data.types[0].type.name,
      response.data.weight,
      "for",
      url,
    );
  } else {
    console.log("Schema error for", url);
  }
}

fetchPokemon("pokemon/garchomp");
fetchPokemon("penguin");
fetchPokemon("ability/gluttony");
