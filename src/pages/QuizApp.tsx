import { useState } from "react";

import type { GameState } from "../types/game"
import { renderGame } from "../engines/renderGame";
import { agencies } from "../data/agencies";
import type { Agency } from "../types/agencies";
import { shuffle } from "../utils/shuffle";
import { normalize } from "../utils/normalize";

export default function QuizApp() {
    const [gameState, setGameState] = useState<GameState>("start");
    const [answer, setAnswer] = useState<string>("");

    const [agencyPool, setAgencyPool] = useState<Agency[]>(() => shuffle([...agencies]));
    const [currentAgency, setCurrentAgency] = useState<Agency | null>(null);

    function nextQuestion() {
        const [nextAgency, ...remaining] = agencyPool;

        setCurrentAgency(nextAgency)
        setAgencyPool(remaining)
    }

    function startGame() {
        nextQuestion();
        setGameState("playing");
    }

    function checkAnswer() {
        if (!currentAgency) return;

        const isCorrect = normalize(answer) === normalize(currentAgency.fullName);
        setGameState(isCorrect ? "correct" : "wrong");
        setAnswer("");

        setTimeout(() => {
            nextQuestion();
            setGameState("playing")
        }, 800);
    }

    return (
        <>
            <main>
                {renderGame({gameState, startGame, answer, setAnswer, checkAnswer, currentAgency})}
            </main>
        </>
    )
}