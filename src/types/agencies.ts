export interface Agency {
    abbreviation: string;
    fullName: string;
    difficulty: Difficulty;
}

export type Difficulty = 
    | "easy"
    | "medium"
    | "hard"