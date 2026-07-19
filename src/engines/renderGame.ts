import type { GameState } from "../types/game";

export function renderGame(gameState: GameState) {
    switch(gameState) {
        case "start": 
            return <StartScreen />;
    }
}