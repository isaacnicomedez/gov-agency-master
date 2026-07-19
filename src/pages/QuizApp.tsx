import { useState } from "react";

import type { GameState } from "../types/game"
import { renderGame } from "../engines/renderGame";

export default function QuizApp() {
    const [gameState, setGameState] = useState<GameState>("start");
    const [answer, setAnswer] = useState<string>("");

    function startGame() {
        setGameState("playing");
    }

    function checkAnswer() {
        console.log("entered!");
    }

    return (
        <>
            <main>
                {renderGame({gameState, startGame, answer, setAnswer, checkAnswer})}
            </main>
        </>
    )
}