import type { FinalResultProps} from "../types/props";

export default function ResultCard({score, wrong}: FinalResultProps) {
    return (
        <section>
            <h2>Correct Answers: {score}</h2>
            <p>Wrong Answers: {wrong}</p>
        </section>
    )
}