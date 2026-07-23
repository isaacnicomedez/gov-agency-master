import type { ScoreBoardProps } from "../types/props";
import "../styles/components/ScoreBoard.css";
import { agencies } from "../data/agencies";

export default function ScoreBoard({score, agencyPool}: ScoreBoardProps) {
    return (
        <header className="header-container">
            <h2>Score: {score}</h2>
            <p>Remaining: {agencyPool.length} / {agencies.length}</p>
        </header>
    )
}