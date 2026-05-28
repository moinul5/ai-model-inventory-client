import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import styled from "styled-components";

const NotFound = () => {
  const navigate = useNavigate();
  const { darkMode } = useTheme();

  return (
    <StyledWrapper $darkMode={darkMode}>
      <div className="container">
        <div className="content">
          {/* 404 Animation */}
          <div className="error-code">
            <span className="digit">4</span>
            <div className="orb"></div>
            <span className="digit">4</span>
          </div>

          {/* Message */}
          <h1 className="title">Oops! This AI Model Doesn't Exist</h1>
          <p className="description">
            The page you're looking for has gone offline or never existed in our AI model inventory.
            Don't worry, let's get you back on track!
          </p>

          {/* Buttons */}
          <div className="button-group">
            <button className="btn-primary" onClick={() => navigate("/")}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                <polyline points="9 22 9 12 15 12 15 22"></polyline>
              </svg>
              Back to Home
            </button>
            <button className="btn-secondary" onClick={() => navigate("/all-models")}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="8"></circle>
                <path d="m21 21-4.35-4.35"></path>
              </svg>
              Browse Models
            </button>
          </div>

          {/* Helpful Text */}
          <p className="help-text">
            Error Code: <span className="code">404</span> | Page Not Found
          </p>
        </div>

        {/* Decorative Elements */}
        <div className="decoration"></div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#f4f4f5")};
  color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};
  transition: background 0.3s ease;

  .container {
    position: relative;
    max-width: 600px;
    text-align: center;
    z-index: 10;
  }

  .content {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .error-code {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 16px;
    margin-bottom: 20px;
    font-size: 120px;
    font-weight: 900;
    font-style: italic;
    background: linear-gradient(
      135deg,
      ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")},
      ${({ $darkMode }) => ($darkMode ? "#0891b2" : "#1d4ed8")}
    );
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    letter-spacing: -2px;
  }

  .digit {
    display: block;
  }

  .orb {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 0 30px rgba(6, 182, 212, 0.5)"
        : "0 0 30px rgba(37, 99, 235, 0.5)"};
    animation: float 3s ease-in-out infinite;
  }

  @keyframes float {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
  }

  .title {
    font-size: 32px;
    font-weight: 800;
    margin: 0;
    line-height: 1.2;
  }

  .description {
    font-size: 16px;
    line-height: 1.6;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0;
  }

  .button-group {
    display: flex;
    gap: 12px;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 16px;
  }

  .btn-primary,
  .btn-secondary {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    border: none;
    transition: all 0.3s ease;
  }

  .btn-primary {
    background: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    color: ${({ $darkMode }) => ($darkMode ? "#000000" : "#ffffff")};
  }

  .btn-primary:hover {
    transform: translateY(-2px);
    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 10px 25px rgba(6, 182, 212, 0.3)"
        : "0 10px 25px rgba(37, 99, 235, 0.3)"};
  }

  .btn-secondary {
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    border: 2px solid
      ${({ $darkMode }) => ($darkMode ? "rgba(6, 182, 212, 0.3)" : "rgba(37, 99, 235, 0.3)")};
  }

  .btn-secondary:hover {
    transform: translateY(-2px);
    border-color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.1)" : "rgba(37, 99, 235, 0.1)"};
  }

  .help-text {
    font-size: 14px;
    color: ${({ $darkMode }) => ($darkMode ? "#64748b" : "#9ca3af")};
    margin: 0;
  }

  .code {
    font-family: "Courier New", monospace;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.05)"};
    padding: 2px 8px;
    border-radius: 4px;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    font-weight: 700;
  }

  .decoration {
    position: absolute;
    width: 400px;
    height: 400px;
    border-radius: 50%;
    background: ${({ $darkMode }) =>
      $darkMode
        ? "radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%)"
        : "radial-gradient(circle, rgba(37, 99, 235, 0.1) 0%, transparent 70%)"};
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: -1;
  }

  @media (max-width: 640px) {
    .error-code {
      font-size: 80px;
      gap: 12px;
    }

    .orb {
      width: 40px;
      height: 40px;
    }

    .title {
      font-size: 24px;
    }

    .description {
      font-size: 14px;
    }

    .button-group {
      flex-direction: column;
    }

    .btn-primary,
    .btn-secondary {
      width: 100%;
      justify-content: center;
    }
  }
`;

export default NotFound;
