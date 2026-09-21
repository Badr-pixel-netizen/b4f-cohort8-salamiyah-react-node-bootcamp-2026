import type { AppNotification } from "../types";

interface ToastQueueProps {
  notifications: AppNotification[];
  onDismissFront: () => void;
}

// Notifications are a genuine Queue: several actions across the app can each
// add one (Post published, Like failed, Applied, ...), they must be shown in
// the exact order they happened (FIFO), and only ONE is ever visible on
// screen at a time — the one at the FRONT of the queue. Dismissing it removes
// it from the front and reveals whatever is next, in the order it arrived.
//
// CORE behavior is manual dismiss only (click the × button) — this keeps the
// Queue itself the thing being assessed, not a timer/effect-cleanup pattern.
// An automatic timeout is a reasonable optional enhancement (see the
// requirements document), not something this reference solution requires.
function ToastQueue({ notifications, onDismissFront }: ToastQueueProps) {
  const current = notifications.length > 0 ? notifications[0] : null;

  if (!current) {
    return null;
  }

  return (
    <div className={`toast toast-${current.tone}`} role="status">
      <p>{current.message}</p>
      <button className="toast-dismiss" onClick={onDismissFront} aria-label="Dismiss notification">
        ×
      </button>
      {notifications.length > 1 && (
        <span className="toast-queue-count">+{notifications.length - 1} more</span>
      )}
    </div>
  );
}

export default ToastQueue;
