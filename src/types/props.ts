import type { Dispatch, RefObject, SetStateAction } from "react";
import type { KeyboardEvent } from "react";
import type { GameState, Stats, Time } from "./game";
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
    inputRef: RefObject<HTMLInputElement | null>;
    onAnswerChange: Dispatch<SetStateAction<string>>;
    onSubmit: () => void;
}

export interface handleKeyDownProps {
    e: KeyboardEvent<HTMLInputElement>;
    onSubmit: () => void;
}

export interface FeedbackCardProps {
    currentAgency: Agency;
    isCorrect: "correct" | "wrong";
}

export interface ScoreBoardProps {  
    score: number;
    agencyPool: Agency[];
}   

export interface FinalResultProps {
    stats: Stats;
    total: number;
    accuracy: number;
    time: Time;
}