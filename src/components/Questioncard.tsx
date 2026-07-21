import { handleKeyDown } from "../engines/handleKeyDown"
import type { QuestionCardProps } from "../types/props"

export default function QuestionCard({
    answer, 
    setAnswer, 
    checkAnswer,
    }: QuestionCardProps) {
    return (
        <>
            <p>{}</p>
            <input 
                type="text" 
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => handleKeyDown({e, checkAnswer})}
            />
        </>
    )
}