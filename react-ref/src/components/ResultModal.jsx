import { useRef, forwardRef, useImperativeHandle } from "react";
import { createPortal } from "react-dom";

const ResultModal = forwardRef(function ResultModal({result, targetTime, timeRemaining, onReset}, ref) {
    const dialog = useRef();

    const userLost = timeRemaining <= 0;
    const formattedTimeRemaining = (timeRemaining / 1000).toFixed(2);
    const gameScore = Math.round((1 - timeRemaining / (targetTime * 1000)) * 100);

    useImperativeHandle( ref, () => {
        return {
            open: () => {
                dialog.current.showModal();
            }
        }
    });

    return createPortal(
        <dialog className="result-modal" ref={dialog}>
            {userLost && <h2>You Lost</h2>}
            {!userLost && <h2>Your Score: {gameScore}!</h2>}
            <p> The Target Time was <strong>{targetTime} second{targetTime > 1 ? "s" : ""}</strong></p>
            <p> You stopped the timer with <strong>{formattedTimeRemaining} Second left</strong></p>
            <form method="dialog" onSubmit={onReset}>
                <button>Close</button>
            </form>
        </dialog>,
        document.getElementById("modal")
    );
});

export default ResultModal;