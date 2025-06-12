"use client";

import { useState } from "react";

function StorageInfo() {
  const [showInfo, setShowInfo] = useState(false);

  return (
    <div className="mt-3">
      <button
        className="btn btn-link btn-sm text-muted p-0"
        onClick={() => setShowInfo(!showInfo)}
        aria-expanded={showInfo}
      >
        <i
          className={`bi ${
            showInfo ? "bi-chevron-up" : "bi-chevron-down"
          } me-1`}
        ></i>
        About Local Storage
      </button>

      {showInfo && (
        <div className="mt-2 small text-muted">
          <p>
            <strong>What is Local Storage?</strong> Local Storage is a feature
            in your web browser that allows websites to save data on your
            device.
          </p>
          <p>
            <strong>Your Tasks are Saved:</strong> This Task Tracker app
            automatically saves your tasks in your browser's Local Storage. This
            means your tasks will remain even if you refresh the page or close
            your browser.
          </p>
          <p>
            <strong>Device Specific:</strong> Tasks are saved only on this
            device and browser. They won't appear if you use a different device
            or browser.
          </p>
          <p>
            <strong>Clearing Data:</strong> If you clear your browser data or
            use private/incognito mode, your tasks may be deleted.
          </p>
        </div>
      )}
    </div>
  );
}

export default StorageInfo;
