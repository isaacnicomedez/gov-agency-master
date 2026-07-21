import { handleKeyDown } from "../engines/handleKeyDown"
import type { QuestionCardProps } from "../types/props"
import { useRef } from "react"

export default function QuestionCard({
    answer,
    currentAgency,
    onAnswerChange, 
    onSubmit,
    }: QuestionCardProps) {

    const inputRef = useRef<HTMLInputElement>(null);
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