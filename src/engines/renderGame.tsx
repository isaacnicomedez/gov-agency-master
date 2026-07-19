import StartScreen from "../components/StartScreen";
import QuestionCard from "../components/Questioncard";
import type { RenderGameProps } from "../types/props";

export function renderGame({
        gameState, 
        startGame, 
        answer,
        setAnswer, 
        checkAnswer,
    }: RenderGameProps) 
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