import { handleKeyDown } from "../engines/handleKeyDown"
import type { QuestionCardProps } from "../types/props"

export default function QuestionCard({
    answer, 
    setAnswer, 
    checkAnswer,
    }: QuestionCardProps) {

    console.log(answer)
    return (
        <>
            <input 
                type="text" 
                value={answer}
                onChange={e => setAnswer(e.target.value)}
                onKeyDown={e => handleKeyDown({e, checkAnswer})}
            />
        </>
    )
}