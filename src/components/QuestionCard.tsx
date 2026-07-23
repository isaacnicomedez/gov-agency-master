import { handleKeyDown } from "../engines/handleKeyDown"
import type { QuestionCardProps } from "../types/props"
import "../styles/components/QuestionCard.css";

export default function QuestionCard({
    answer,
    currentAgency,
    inputRef,
    onAnswerChange,
    onSubmit,
}: QuestionCardProps) {

    return (
        <section className="question-card">
            <p className={`difficulty ${currentAgency.difficulty}`}>
                {currentAgency.difficulty}
            </p>            
            <p className="agency-name">{currentAgency?.abbreviation}</p>
            <p className="question">What does this agency stand for?</p>
            <input
                ref={inputRef}
                type="text"
                value={answer}
                onChange={e => onAnswerChange(e.target.value)}
                onKeyDown={e => handleKeyDown({ e, onSubmit })}
                placeholder="Type full agency name here..."
                size={20}
            />
        </section>
    )
}