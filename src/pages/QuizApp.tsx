import { useState, useRef, useEffect } from "react";

import type { Agency } from "../types/agencies";
import type { Stats, type GameState } from "../types/game"

import { agencies } from "../data/agencies";
import { shuffle } from "../utils/shuffle";
import { normalize } from "../utils/normalize";

import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/QuestionCard";
import ResultCard from "../components/FinalResultCard";
import ScoreBoard from "../components/ScoreBoard";
import FeedbackCard from "../components/FeedbackCard";

export default function QuizApp() {
    const POINTS = {
        easy: 10,
        medium: 20,
        hard: 30
    } as const;

    const [gameState, setGameState] = useState<GameState>("start");
    const [answer, setAnswer] = useState<string>("");

    const [agencyPool, setAgencyPool] = useState<Agency[]>(() => shuffle([...agencies]));
    const [currentAgency, setCurrentAgency] = useState<Agency | null>(null);

    const [stats, setStats] = useState<Stats>({
        score: 0,

        correct: {
            easy: 0,
            medium: 0,
            hard: 0,
        },

        startedAt: 0,
        finishedAt: 0,
    });

    const inputRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (gameState === "playing") {
            inputRef.current?.focus();
        }
    }, [gameState]);

    function nextQuestion() {
        const [nextAgency, ...remaining] = agencyPool;

        if (!nextAgency) {
            setCurrentAgency(null);
            setGameState("finished");
            return;
        }

        setCurrentAgency(nextAgency)
        setAgencyPool(remaining)
        setAnswer("");
        setGameState("playing");
    }

    function startGame() {
        nextQuestion();
    }

    function checkAnswer() {
        if (!currentAgency) return;

        const isCorrect = normalize(answer) === normalize(currentAgency.fullName);
        const difficulty = currentAgency.difficulty;

        if (isCorrect) {
            setStats(prev => ({
                ...prev,
                score: prev.score + POINTS[difficulty],
                correct: {
                    ...prev.correct,
                    [difficulty]: prev.correct[difficulty] + 1,
                }
            }));
        } else {
            setStats(prev => prev + 1);
        }

        setGameState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            nextQuestion();
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