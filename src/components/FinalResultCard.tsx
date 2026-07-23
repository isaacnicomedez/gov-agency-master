import { agencies } from "../data/agencies";
import type { FinalResultProps} from "../types/props";
import { formatTime } from "../utils/format-time";

export default function ResultCard({stats, total, accuracy, time, record}: FinalResultProps) {
    return (
        <section>
            <h2>Best:</h2>
            <p>Score: {record.score}</p>
            <p>Accuracy: {record.accuracy.toFixed(2)}</p>
            <p>Time: {formatTime(record.time)}</p>
            <p>Correct Answers: {record.correctAnswers} / {agencies.length}</p>

            <h2>Current:</h2>
            <p>Score: {stats.score}</p>
            <p>Accuracy: {accuracy.toFixed(2)}</p>
            <p>Time: {formatTime(time)}</p>
            <p>Correct Answers: {total} / {agencies.length}</p>
        </section>
    )
}