import { handleKeyDown } from "../engines/handleKeyDown"
import type { QuestionCardProps } from "../types/props"

export default function QuestionCard({
    answer,
    currentAgency,
    inputRef,
    onAnswerChange, 
    onSubmit,
    }: QuestionCardProps) {

    return (
        <>
            <p>{currentAgency?.abbreviation}</p>
            <input 
                ref={inputRef}
                type="text" 
                value={answer}
                onChange={e => onAnswerChange(e.target.value)}
                onKeyDown={e => handleKeyDown({e, onSubmit})}
            />
        </>
    )
}