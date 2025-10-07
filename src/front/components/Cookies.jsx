import { useEffect, useState } from "react";

export const Cookies = () => {
  const [showCookies, setShowCookies] = useState(null);

  const acceptCookies = () => {
    localStorage.setItem("cookies", "Yes");
    setShowCookies(false);
  };

  const rejectCookies = () => {
    localStorage.setItem("cookies", "No");
    setShowCookies(false);
  };

  useEffect(() => {
    if (!localStorage.getItem("cookies")) {
      setShowCookies(true);
    } else {
      setShowCookies(false);
    }
  }, []);

  return (
    <>
      {showCookies && (
        <>
          {/* FONO BORROSO */}
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: "rgba(0, 0, 0, 0.7)",
              backdropFilter: "blur(5px)",
              zIndex: 1040,
            }}
          ></div>

          {/* MODAL FOR COOKIES */}
          <div
            className="modal show"
            tabIndex={-1}
            style={{ display: "block" }}
          >
            <div className="modal-dialog modal-dialog-centered">
              <div
                className="modal-content"
                style={{ border: "3px solid #f1c40f" }}
              >
                <div
                  className="modal-header"
                  style={{
                    backgroundColor: "#000",
                    color: "#f4d03f",
                    borderBottom: "2px solid #f1c40f",
                  }}
                >
                  <h5 className="modal-title">🍪 Cookie Policy</h5>
                </div>
                <div
                  className="modal-body"
                  style={{
                    backgroundColor: "#1a1a1a",
                    color: "#f4d03f",
                    fontSize: "16px",
                  }}
                >
                  <p style={{ marginBottom: "15px" }}>
                    <strong>Hello!</strong> To offer you the best experience, we
                    use cookies to:
                  </p>
                  <ul style={{ marginBottom: "20px", paddingLeft: "20px" }}>
                    <li>🧐 Analyze how you use our website</li>
                    <li>✏️ Personalize content</li>
                    <li>⚡ Improve performance</li>
                    <li>🔒 Keep your session secure</li>
                  </ul>
                  <p style={{ fontWeight: "bold", color: "#f1c40f" }}>
                    ⚠️ Accept to help us improve and offer you the best ⚠️.
                  </p>
                </div>
                <div
                  className="modal-footer"
                  style={{
                    backgroundColor: "#000",
                    borderTop: "2px solid #f1c40f",
                  }}
                >
                  <button
                    type="button"
                    className="btn"
                    onClick={rejectCookies}
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #f4d03f",
                    }}
                  >
                    ❌
                  </button>
                  <button
                    type="button"
                    className="btn"
                    onClick={acceptCookies}
                    style={{
                      backgroundColor: "transparent",
                      border: "2px solid #f4d03f",
                    }}
                  >
                    ✔️
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
