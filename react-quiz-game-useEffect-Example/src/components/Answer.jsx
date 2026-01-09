import { useRef } from "react";
import QuizAnswersConstants from "../constants/QuizAnswerConstants.js";

export default function Answer({answers, selectedAnswer, answerState, onSelect}) {
    const suffledAnswerOptions = useRef();

    if (!suffledAnswerOptions.current) {
        suffledAnswerOptions.current = [...answers];
        suffledAnswerOptions.current.sort(() => Math.random() - 0.5);
    }

    return (
        <ul id="answers">
            {suffledAnswerOptions.current.map((answer) => {
                const isSelected = selectedAnswer === answer;
                let cssClass = '';

                if (answerState === QuizAnswersConstants.SUBMITTED && isSelected) {
                    cssClass = 'selected';
                }

                if ((answerState === QuizAnswersConstants.CORRECT ||
                    answerState === QuizAnswersConstants.WRONG) && isSelected) {
                    cssClass = answerState;
                }
                return (
                    <li className="answer" key={answer}>
                        <button onClick={() => onSelect(answer)} className={cssClass} disabled={answerState !== ''}>{answer}</button>
                    </li>);
            })}
        </ul>
    );
};