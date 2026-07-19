import type { GameState } from "../types/game";
import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/Questioncard";
import type { Dispatch, SetStateAction } from "react";

export function renderGame(
        gameState: GameState, 
        startGame: () => void, 
        answer: string,
        setAnswer: Dispatch<SetStateAction<string>>, 
        checkAnswer: () => void) 
    {
    switch(gameState) {
        case "start": 
            return <StartScreen onStart={startGame} />;
        case "playing":
            return <QuestionCard answer={answer} setAnswer={setAnswer} checkAnswer={checkAnswer}
        />
        default:
            return null;
    }
}