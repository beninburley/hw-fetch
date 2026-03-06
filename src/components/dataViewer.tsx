import { useEffect, useReducer } from "react";
import type { Pokemon } from "../types/pokeType";
import { fetchPokemon } from "../types/api";
import { pokeReducer } from "../types/display";

const [state, dispatch] = useReducer(pokeReducer<Pokemon>, { status: "idle" });
useEffect(() => {
  const controller = new AbortController();
  (async () => {
    dispatch({ status: "loadStart" });
    const r = await fetchPokemon(searchTerm);
    // handle r.ok or r.error
    // validate DTO
    // map to domain
    // dispatch success or error
  })();

  return () => controller.abort();
}, [searchTerm]);
