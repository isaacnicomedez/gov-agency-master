import type { GameState } from "../types/game";
import StartScreen from "../components/StartScreen";

export function renderGame(gameState: GameState, startGame: () => void) {
    switch(gameState) {
        case "start": 
            return <StartScreen onStart={startGame} />;
        default:
            return null;
    }
}