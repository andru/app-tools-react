import { AppStateProvider,  } from "./state-provider"
import { MemoryTrainer as Game } from "./game"

export function MemoryTrainer() {
  return (<AppStateProvider>
    <Game />
  </AppStateProvider>)
}