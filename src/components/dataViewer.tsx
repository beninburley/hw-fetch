import { useEffect, useReducer, useState } from "react";
import { isPokemon, type Pokemon } from "../types/pokeType";
import { fetchPokemon } from "../types/api";
import { pokeReducer } from "../types/display";

export function DataViewer() {
  const [state, dispatch] = useReducer(pokeReducer<Pokemon>, {
    status: "idle",
  });
  const [inputName, setInputName] = useState("Pikachu");
  const [searchTerm, setSearchTerm] = useState("pikachu");
  const [reloadToken, setReloadToken] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      dispatch({ status: "loadStart" });
      const r = await fetchPokemon(searchTerm, controller.signal);

      if (controller.signal.aborted) return;

      if (r.ok && isPokemon(r.data)) {
        dispatch({ status: "loadSuccess", data: r.data });
      } else if (!r.ok) {
        const msg =
          r.error.kind === "http"
            ? `HTTP ${r.error.status} ${r.error.statusText}`
            : r.error.message;
        dispatch({ status: "loadError", message: msg });
      }
    })();

    return () => controller.abort();
  }, [searchTerm, reloadToken]);
  return (
    <div>
      <input
        value={inputName}
        onChange={(e) => setInputName(e.target.value)}
        placeholder="Enter pokemon name"
      />
      <button onClick={() => setSearchTerm(inputName)}>Search</button>
      <button onClick={() => setReloadToken((x) => x + 1)}>Reload</button>

      {state.status === "idle" && <p>Idle</p>}
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p>Error: {state.message}</p>}
      {state.status === "success" && (
        <div>
          <p>Name: {state.data.name}</p>
          <p>Ability: {state.data.ability}</p>
          <p>Type: {state.data.type}</p>
          <p>Weight: {state.data.weight}</p>
        </div>
      )}
    </div>
  );
}
