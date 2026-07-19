import { useState } from "react";

import type { GameState } from "../types/game"
import { renderGame } from "../engines/renderGame";

export default function QuizApp() {
    const [gameState, setGameState] = useState<GameState>("start");

    function startGame() {
        setGameState("playing");
    }

    return (
        <>
            <main>
                {renderGame(gameState, startGame)}
            </main>
        </>
    )
}