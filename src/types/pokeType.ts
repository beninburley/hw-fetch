export type PokemonJSON = {
  species: { name: string };
  abilities: [{ ability: { name: string } }];
  weight: number;
  types: [{ type: { name: string } }];
};

export type Pokemon = {
  name: string;
  ability: string;
  weight: number;
  type: string;
};

export function isPokemon(x: unknown): x is Pokemon {
  return (
    typeof x === "object" &&
    x !== null &&
    typeof (x as any).name === "string" &&
    typeof (x as any).ability === "string" &&
    typeof (x as any).weight === "number" &&
    typeof (x as any).type === "string"
  );
}

export function isPokemonJSON(x: unknown): x is PokemonJSON {
  return (
    typeof x === "object" &&
    x !== null &&
    (x as any).species &&
    typeof (x as any).species.name === "string" &&
    typeof (x as any).abilities[0].ability.name === "string" &&
    typeof (x as any).weight === "number" &&
    typeof (x as any).types[0].type.name === "string"
  );
}
