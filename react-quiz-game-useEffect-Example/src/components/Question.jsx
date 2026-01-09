import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answer from "./Answer.jsx";
import QUESTIONS from "../constants/questions.js";

export default function Question({
    onSkip,
    onSelectAnswer,
    index
}) {
    const [answer, setAnswer] = useState({
        selectedAnswer: '',
        isCorrect: null
    });

    let timer = 10000;

    if(answer.selectedAnswer){
        timer = 1000;
    }

    if(answer.isCorrect !== null){
        timer = 2000;
    }

    function handleSelectAnswer(answer) {
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null
        });

        setTimeout(() => {
            setAnswer({
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            });

            setTimeout(() => {
                onSelectAnswer(answer);
            }, 2000);
        }, 1000);

    }

    let answerState = '';

    if (answer.selectedAnswer) {
        answerState = answer.isCorrect === null ? 'submitted' : answer.isCorrect ? 'correct' : 'wrong';
    }

    return (
        <div id="question">
            <QuestionTimer
                key={timer}
                timeout={timer}
                onTimeOut={answer.selectedAnswer === '' ? onSkip : undefined}
                mode={answerState}
            />
            <h2>{QUESTIONS[index].text}</h2>
            <Answer
                answers={QUESTIONS[index].answers}
                selectedAnswer={answer.selectedAnswer}
                answerState={answerState}
                onSelect={handleSelectAnswer}
            />
        </div>
    );
}