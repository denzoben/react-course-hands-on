import { useEffect } from "react";
export default function DeleteConfirmation({ onConfirm, onCancel }) {

  useEffect(() => {
    const timeoutId = setTimeout(() => {
        console.log("On Confirm Running");
        onConfirm();
      }, 5000);

    return () => {
      console.log("Cleanup in DeleteConfirmation");
      clearTimeout(timeoutId);
    }
  }, [onConfirm]);
  

  return (
    <div id="delete-confirmation">
      <h2>Are you sure?</h2>
      <p>Do you really want to remove this place?</p>
      <div id="confirmation-actions">
        <button onClick={onCancel} className="button-text">
          No
        </button>
        <button onClick={onConfirm} className="button">
          Yes
        </button>
      </div>
    </div>
  );
}
