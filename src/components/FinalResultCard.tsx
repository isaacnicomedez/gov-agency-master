import type { FinalResultProps} from "../types/props";

export default function ResultCard({stats, total, accuracy, time}: FinalResultProps) {
    return (
        <section>
            <h2>Results:</h2>
            <p>Easy: {stats.correct.easy}</p>
            <p>Medium: {stats.correct.medium}</p>
            <p>Hard: {stats.correct.hard}</p>

            <p>Total: {total}</p>
            <p>Accuracy: {accuracy.toFixed(2)}%</p>

            <p>Time: {time.minutes > 0 && `${time.minutes}m`} {time.seconds}s</p>

            <p>Score: {stats.score}</p>
        </section>
    )
}