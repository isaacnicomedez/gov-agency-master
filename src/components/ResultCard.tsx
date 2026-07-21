import type { CardProps } from "../types/props";

export default function ResultCard({ currentAgency, isCorrect }: CardProps) {
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