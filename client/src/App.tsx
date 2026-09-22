import { useState } from "react";
import type { AppNotification, NotificationTone } from "./types";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ToastQueue from "./components/ToastQueue";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CommunityPage from "./pages/CommunityPage";
import OpportunitiesPage from "./pages/OpportunitiesPage";
import OpportunityDetailPage from "./pages/OpportunityDetailPage";
import NotFoundPage from "./pages/NotFoundPage";

let nextNotificationId = 1;

function App() {
  // Queue — notifications are added at the BACK (end of the array) by
  // whichever action triggered them, and always displayed/removed from the
  // FRONT (index 0) by ToastQueue, one at a time, in the order they happened.
  const [notifications, setNotifications] = useState<AppNotification[]>([]);

  function addNotification(message: string, tone: NotificationTone) {
    const notification: AppNotification = {
      id: nextNotificationId,
      message,
      tone,
    };
    nextNotificationId += 1;

    setNotifications([...notifications, notification]);
  }

  function dismissFrontNotification() {
    setNotifications(
      notifications.filter((_notification, index) => index !== 0),
    );
  }

  return (
    <div className="page">
      <Navbar />

      <main className="main-layout">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/community"
            element={<CommunityPage onNotify={addNotification} />}
          />
          <Route
            path="/opportunities"
            element={<OpportunitiesPage onNotify={addNotification} />}
          />
          <Route
            path="/opportunities/:id"
            element={<OpportunityDetailPage onNotify={addNotification} />}
          />
          <Route path="*"
            element={ <NotFoundPage />} />
        </Routes>
        {/* <CommunitySection onNotify={addNotification} />
        <OpportunitiesSection onNotify={addNotification} /> */}
      </main>

      <Footer />

      <ToastQueue
        notifications={notifications}
        onDismissFront={dismissFrontNotification}
      />
    </div>
  );
}

export default App;
