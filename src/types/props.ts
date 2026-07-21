import type { Dispatch, SetStateAction } from "react";
import type { KeyboardEvent } from "react";
import type { GameState } from "./game";
import type { Agency } from "./agencies";

export interface RenderGameProps {
    gameState: GameState;
    startGame: () => void;
    answer: string;
    setAnswer: Dispatch<SetStateAction<string>>;
    checkAnswer: () => void;
    currentAgency: Agency | null;
}

export interface QuestionCardProps {
    answer: string;
    currentAgency: Agency;
    onAnswerChange: Dispatch<SetStateAction<string>>;
    onSubmit: () => void;
}

export interface handleKeyDownProps {
    e: KeyboardEvent<HTMLInputElement>;
    onSubmit: () => void;
}

export interface CardProps {
    currentAgency: Agency;
    isCorrect: "correct" | "wrong";
}