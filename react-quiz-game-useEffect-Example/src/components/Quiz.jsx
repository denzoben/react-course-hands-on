import { useState, useCallback } from "react";

import QUESTIONS from "../constants/questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";

export default function Quiz() {
    const [quizAnswers, setQuizAnswers] = useState([]);

    const quizQuestionsIndex = quizAnswers.length;
    const quizCompleted = quizQuestionsIndex >= QUESTIONS.length;

    const handleAnswerSubmit = useCallback(function handleAnswerSubmit(answer) {
        setQuizAnswers((prevAnswers) => [...prevAnswers, answer]);
    }, []);

    const handleSkipAnswer = useCallback(() => {
        handleAnswerSubmit(null);
    }, [handleAnswerSubmit]);

    if (quizCompleted) {
       return (
        <Summary quizAnswers={quizAnswers}/>
       );
    }

    return (
        <div id="quiz">
            <Question
                key={quizQuestionsIndex}
                index={quizQuestionsIndex}
                onSkip={handleSkipAnswer}
                onSelectAnswer={handleAnswerSubmit}
            />
        </div>
    );
};