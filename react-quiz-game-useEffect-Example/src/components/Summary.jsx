import quizCompletedImg from '../assets/quiz-complete.png';
import QUESTIONS from "../constants/questions.js";

export default function Summary({ quizAnswers }) {
    const skippedAnswers = quizAnswers.filter((answer) => answer === null);
    const skippedAnswersPercent = Math.round(
        (skippedAnswers.length / QUESTIONS.length) * 100
    );
    const correctAnswers = quizAnswers.filter((answer, index) => answer === QUESTIONS[index].answers[0]);
    const correctAnswersPercent = Math.round(
        (correctAnswers.length / QUESTIONS.length) * 100
    );
    const wrongAnswersPercent = 100 - skippedAnswersPercent - correctAnswersPercent;

    return (
        <div id="summary">
            <img src={quizCompletedImg} alt="Quiz Completed" />
            <h2>Quiz Completed!</h2>

            <div id="summary-stats">
                <p>
                    <span className='number'>{skippedAnswersPercent}%</span>
                    <span className='text'>Skipped</span>
                </p>
                <p>
                    <span className='number'>{correctAnswersPercent}%</span>
                    <span className='text'>Correct</span>
                </p>
                <p>
                    <span className='number'>{wrongAnswersPercent}%</span>
                    <span className='text'>Wrong</span>
                </p>
            </div>
            <ol>
                {quizAnswers.map((answer, index) => {
                    let cssClass = 'user-answer';

                    if(answer === null) {
                        answer = 'Skipped';
                    }else if (answer === QUESTIONS[index].answers[0]) {
                        cssClass += ' correct';
                    } else {
                        cssClass += ' wrong';
                    }
                    
                    return (
                        <li key={index}>
                            <h3>{index + 1}</h3>
                            <p className='question'>{QUESTIONS[index].text}</p>
                            <p className={cssClass}>{answer}</p>
                        </li>
                    );
                })}

            </ol>
        </div>
    );
}