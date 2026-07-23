export interface Agency {
    abbreviation: string;
    fullName: string;
    difficulty: Difficulty;
    description: string;
}

export type Difficulty = 
    | "easy"
    | "medium"
    | "hard"