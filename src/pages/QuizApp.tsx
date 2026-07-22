import { useState, useRef, useEffect } from "react";

import type { Agency } from "../types/agencies";
import type { GameState } from "../types/game"

import { agencies } from "../data/agencies";
import { shuffle } from "../utils/shuffle";
import { normalize } from "../utils/normalize";

import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/ResultCard";

export default function QuizApp() {
    const [gameState, setGameState] = useState<GameState>("start");
    const [answer, setAnswer] = useState<string>("");

    const [agencyPool, setAgencyPool] = useState<Agency[]>(() => shuffle([...agencies]));
    const [currentAgency, setCurrentAgency] = useState<Agency | null>(null);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (gameState === "playing") {
            inputRef.current?.focus();
        }
    }, [gameState]);

    function nextQuestion() {
        const [nextAgency, ...remaining] = agencyPool;

        setCurrentAgency(nextAgency)
        setAgencyPool(remaining)

        setAnswer("");
        inputRef.current?.focus();
    }

    function startGame() {
        nextQuestion();
        setGameState("playing");
    }

    function checkAnswer() {
        if (!currentAgency) return;

        const isCorrect = normalize(answer) === normalize(currentAgency.fullName);
        setGameState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            nextQuestion();
            setGameState("playing")
        }, 2000);
    }

    console.log(agencyPool.length);

    return (
        <>
            <main>
                {gameState === "start" && (
                    <StartScreen onStart={startGame}/>
                )}

                {(gameState === "correct" ||
                  gameState === "wrong") &&
                  currentAgency && (
                    <ResultCard currentAgency={currentAgency} isCorrect={gameState} />
                  )
                }

                {gameState === "playing" &&
                  currentAgency && (
                    <QuestionCard answer={answer} currentAgency={currentAgency} inputRef={inputRef} onAnswerChange={setAnswer} onSubmit={checkAnswer} />
                )}
            </main>
        </>
    )
}