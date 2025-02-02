import { AppStateProvider,  } from "./state-provider"
import { MemoryTrainer } from "./game"

export function Game() {
  return (<AppStateProvider>
    <MemoryTrainer />
  </AppStateProvider>)
}

export default Game;