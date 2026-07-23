import { useState, useRef, useEffect } from "react";

import type { Agency } from "../types/agencies";
import type { Stats, GameState, Record } from "../types/game"

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

    const [agencyPool, setAgencyPool] = useState<Agency[]>([]);
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

    const [bestRecord, setBestRecord] = useState<Record>(() => {
        const saved = localStorage.getItem("record");
        return saved
            ? JSON.parse(saved)
            : { time: null, score: 0, accuracy: 0, correctAnswers: 0,};
    })

    const total = stats.correct.easy + stats.correct.medium + stats.correct.hard;
    const accuracy = (total / agencies.length) * 100;

    const elapsedMs = stats.finishedAt - stats.startedAt;
    const totalSeconds = Math.floor(elapsedMs / 1000);

    const inputRef = useRef<HTMLInputElement>(null);

    function nextQuestion(pool = agencyPool) {
        const [nextAgency, ...remaining] = pool;

        if (!nextAgency) {
            setCurrentAgency(null);

            setStats(prev => ({
                ...prev,
                finishedAt: Date.now(),
            }));

            setGameState("finished");
            return;
        }

        setCurrentAgency(nextAgency)
        setAgencyPool(remaining)
        setAnswer("");
        setGameState("playing");
    }

    function startGame() {
        const shuffled = shuffle([...agencies]);
        setAgencyPool(shuffled);

        setStats({
            score: 0,
            correct: {
                easy: 0,
                medium: 0,
                hard: 0,
            },
            startedAt: Date.now(),
            finishedAt: 0,
        });
        nextQuestion(shuffled);
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
        }

        setGameState(isCorrect ? "correct" : "wrong");

        setTimeout(() => {
            nextQuestion();
        }, 2000);

    }

    useEffect(() => {
        if (gameState !== "finished") return;

        const currentRecord: Record = {
            time: totalSeconds,
            score: stats.score,
            accuracy,
            correctAnswers: total,
        }

        const saved = localStorage.getItem("record");
        let newBest = currentRecord;

        if (saved) {
            const best = JSON.parse(saved) as Record;
            
            if (currentRecord.score > best.score) {
                newBest = currentRecord;
            } else if (
                currentRecord.score === best.score &&
                currentRecord.time !== null &&
                (best.time === null || currentRecord.time < best.time)
            ) {
                newBest = currentRecord;
            } else {
                newBest = best;
            }
        }

        localStorage.setItem("record", JSON.stringify(newBest));
        const timeout = setTimeout(() => {
            setBestRecord(newBest);    
        })
        
        return () => clearTimeout(timeout);
    }, [gameState, totalSeconds, stats.score, accuracy, total]);

    useEffect(() => {
        if (gameState === "playing") {
            inputRef.current?.focus();
        }
    }, [gameState]);

    return (
        <>
            <main>
                {gameState === "start" && (
                    <StartScreen onStart={startGame}/>
                )}

                {(gameState !== "start" &&
                 gameState !== "finished") && (
                    <ScoreBoard score={stats.score} agencyPool={agencyPool}/>
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
                    <ResultCard stats={stats} total={total} accuracy={accuracy} time={totalSeconds} record={bestRecord}/>
                }
            </main>
        </>
    )
}