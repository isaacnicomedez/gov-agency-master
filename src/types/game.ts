export type GameState = 
    | "start"
    | "playing"
    | "correct"
    | "wrong"
    | "finished"

export interface Stats {
    score: number;

    correct: {
        easy: number;
        medium: number;
        hard: number;
    }

    startedAt: number,
    finishedAt: number,
}