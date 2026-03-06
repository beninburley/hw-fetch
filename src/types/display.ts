export type AsyncState<T> =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; data: T }
  | { status: "error"; message: string };

export type Action<T> =
  | { status: "loadStart" }
  | { status: "loadSuccess"; data: T }
  | { status: "loadError"; message: string };

function assertNever(x: never): never {
  throw new Error(`Unhandled action: ${JSON.stringify(x)}`);
}

export function pokeReducer<T>(
  state: AsyncState<T>,
  action: Action<T>,
): AsyncState<T> {
  switch (action.status) {
    case "loadStart":
      return { status: "loading" };
    case "loadSuccess":
      return { status: "success", data: action.data };
    case "loadError":
      return { status: "error", message: action.message };
    default:
      return assertNever(action);
  }
}
