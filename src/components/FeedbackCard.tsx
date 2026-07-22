import type { FeedbackCardProps } from "../types/props";

export default function FeedbackCard({ currentAgency, isCorrect }: FeedbackCardProps) {
    return (
        <>
            <p>
                {isCorrect === "correct"
                    ? "Correct /"
                    : "Wrong X"
                }
            </p>

            <p>{currentAgency.fullName}</p>
        </>
    )
}