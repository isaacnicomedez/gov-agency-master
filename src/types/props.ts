import type { Dispatch, SetStateAction } from "react";
import type { KeyboardEvent } from "react";

export interface QuestionCardProps {
    answer: string;
    setAnswer: Dispatch<SetStateAction<string>>;
    checkAnswer: () => void;
}

export interface handleKeyDownProps {
    e: KeyboardEvent<HTMLInputElement>;
    checkAnswer: () => void;
}