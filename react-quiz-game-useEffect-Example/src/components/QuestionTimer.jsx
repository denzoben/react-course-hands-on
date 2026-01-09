import { useState, useEffect } from "react";

export default function QuestionTimer({ timeout, onTimeOut, mode }) {

    const [timeRemaining, setTimeRemaining] = useState(timeout);

    useEffect(() => {
        const timer = setTimeout(onTimeOut, timeout);
        return () => { clearTimeout(timer) };
    }, [timeout, onTimeOut]);

    useEffect(() => {
        const interval = setInterval(() => {
            setTimeRemaining(prevTime => prevTime - 100);
        }, 100);

        return () => { clearInterval(interval) };
    }, []);

    return <progress id="question-time" max={timeout} value={timeRemaining} mode={mode}/>;
};