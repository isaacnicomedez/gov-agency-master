import type { FeedbackCardProps } from "../types/props";
import "../styles/components/FeedbackCard.css";

export default function FeedbackCard({ currentAgency, isCorrect }: FeedbackCardProps) {
    const correct = isCorrect === "correct";
    return (
        <section className={`feedback-card ${correct ? "correct" : "wrong"}`}>
            <h2>
                {correct ? "Correct!" : "Wrong!"}
            </h2>

            <p className="agency-answer">
                {currentAgency.abbreviation}
            </p>

            <p className="agency-fullname">
                {currentAgency.fullName}
            </p>

            <p className="agency-description">
                {currentAgency.description}
            </p>
        </section>
    )
}