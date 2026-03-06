import { isPokemonJSON } from "./pokeType";

export type FetchError =
  | { kind: "network"; message: string }
  | { kind: "http"; status: number; statusText: string }
  | { kind: "parse"; message: string };

export type Result<T> =
  | { ok: true; data: T }
  | { ok: false; error: FetchError };

export async function fetchJsonUnknown(url: string): Promise<Result<unknown>> {
  try {
    const result = await fetch(url);
    if (!result.ok) {
      return {
        ok: false,
        error: {
          kind: "http",
          status: result.status,
          statusText: result.statusText,
        },
      };
    }
    try {
      const data: unknown = await result.json();

      return { ok: true, data: data };
    } catch (e) {
      return { ok: false, error: { kind: "parse", message: String(e) } };
    }
  } catch (e) {
    return { ok: false, error: { kind: "network", message: String(e) } };
  }
}

export async function fetchPokemon(name: string): Promise<Result<unknown>> {
  const url: string = "https://pokeapi.co/api/v2/" + name;

  const response = await fetchJsonUnknown(url);
  if (!response.ok) {
    return response;
  } else if (isPokemonJSON(response.data)) {
    return {
      ok: true,
      data: {
        name: response.data.species.name,
        ability: response.data.abilities[0].ability.name,
        type: response.data.types[0].type.name,
        weight: response.data.weight,
      },
    };
  } else {
    console.log("Schema error for", url);
  }
}
