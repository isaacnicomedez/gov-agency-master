import type { FinalResultProps} from "../types/props";

export default function ResultCard({stats, total, accuracy}: FinalResultProps) {
    return (
        <section>
            <h2>Results:</h2>
            <p>Easy: {stats.correct.easy}</p>
            <p>Medium: {stats.correct.medium}</p>
            <p>Hard: {stats.correct.hard}</p>

            <p>Total: {total}</p>
            <p>Accuracy: {accuracy}%</p>

            <p>Score: {stats.score}</p>
        </section>
    )
}