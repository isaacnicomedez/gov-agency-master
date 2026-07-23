import { agencies } from "../data/agencies";
import type { FinalResultProps } from "../types/props";
import { formatTime } from "../utils/format-time";
import "../styles/components/FinalResultCard.css";

export default function ResultCard({
    stats,
    total,
    accuracy,
    time,
    record,
}: FinalResultProps) {
    return (
        <section className="result-card">
            <h1>🎉 Quiz Complete!</h1>

            <div className="result-grid">

                <div className="result-panel">
                    <h2>🏆 Best</h2>

                    <div className="stat-row">
                        <span>Score</span>
                        <strong>{record.score}</strong>
                    </div>

                    <div className="stat-row">
                        <span>Accuracy</span>
                        <strong>{record.accuracy.toFixed(2)}%</strong>
                    </div>

                    <div className="stat-row">
                        <span>Time</span>
                        <strong>{formatTime(record.time)}</strong>
                    </div>

                    <div className="stat-row">
                        <span>Correct</span>
                        <strong>{record.correctAnswers} / {agencies.length}</strong>
                    </div>
                </div>

                <div className="result-panel">
                    <h2>📊 Current</h2>

                    <div className="stat-row">
                        <span>Score</span>
                        <strong>{stats.score}</strong>
                    </div>

                    <div className="stat-row">
                        <span>Accuracy</span>
                        <strong>{accuracy.toFixed(2)}%</strong>
                    </div>

                    <div className="stat-row">
                        <span>Time</span>
                        <strong>{formatTime(time)}</strong>
                    </div>

                    <div className="stat-row">
                        <span>Correct</span>
                        <strong>{total} / {agencies.length}</strong>
                    </div>
                </div>

            </div>
        </section>
    );
}