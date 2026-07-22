import type { ScoreBoardProps } from "../types/props";

export default function ScoreBoard({score, agencyPool}: ScoreBoardProps) {
    return (
        <header>
            <h2>Score: {score}</h2>
            <p>Remaining: {agencyPool.length}</p>
        </header>
    )
}