import { useState, useRef, useEffect } from "react";

import type { Agency } from "../types/agencies";
import type { GameState } from "../types/game"

import { agencies } from "../data/agencies";
import { shuffle } from "../utils/shuffle";
import { normalize } from "../utils/normalize";

import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/FinalResultCard";
import ScoreBoard from "../components/ScoreBoard";
import FeedbackCard from "../components/FeedbackCard";

export default function QuizApp() {
    const [gameState, setGameState] = useState<GameState>("start");
    const [answer, setAnswer] = useState<string>("");

    const [agencyPool, setAgencyPool] = useState<Agency[]>(() => shuffle([...agencies]));
    const [currentAgency, setCurrentAgency] = useState<Agency | null>(null);

    const [score, setScore] = useState<number>(0);
    const [wrong, setWrong] = useState<number>(0);

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (gameState === "playing") {
            inputRef.current?.focus();
        }
    }, [gameState]);

    function nextQuestion() {
        if (agencyPool.length === 0) {
            setCurrentAgency(null);
            setGameState("finished");
            return;
        }

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

        if (isCorrect) {
            setScore(prev => prev + 1);
        } else {
            setWrong(prev => prev + 1);
        }

        setGameState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            nextQuestion();
            setGameState("playing")
        }, 2000);

    }

    return (
        <>
            <main>
                {gameState === "start" && (
                    <StartScreen onStart={startGame}/>
                )}

                {(gameState !== "start" &&
                 gameState !== "finished") && (
                    <ScoreBoard score={score} agencyPool={agencyPool}/>
                )}

                {gameState === "playing" &&
                  currentAgency && (
                    <QuestionCard answer={answer} currentAgency={currentAgency} inputRef={inputRef} onAnswerChange={setAnswer} onSubmit={checkAnswer} />
                )}

                {(gameState === "correct" ||
                  gameState === "wrong") &&
                  currentAgency && (
                    <FeedbackCard currentAgency={currentAgency} isCorrect={gameState} />
                  )
                }

                {gameState === "finished" &&
                    <ResultCard score={score} wrong={wrong} />
                }
            </main>
        </>
    )
}