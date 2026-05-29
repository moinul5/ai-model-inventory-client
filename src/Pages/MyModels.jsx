import { useContext, useEffect, useState } from "react";
import ModelCard from "../Components/ModelCard";
import { useTheme } from "../Context/ThemeContext";
import AuthContext from "../Context/AuthContext";
import Loader from "../Components/Loader";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import useAxiosSecure from "../Hooks/useAxiosSecure";

function MyModels() {
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useTheme();
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [models, setModels] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      axiosSecure
        .get(`/my-models?email=${user.email}`)
        .then((response) => {
          setModels(response.data);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          setError("Failed to load your models. Please try again.");
          setLoading(false);
        });
    }
  }, [user, authLoading, axiosSecure, navigate]);

  if (authLoading || loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          darkMode ? "bg-black text-white" : "bg-white text-black"
        }`}
      >
        <Loader />
      </div>
    );
  }

  return (
    <StyledWrapper $darkMode={darkMode}>
      <div className="max-w-7xl mx-auto px-4 py-10 mt-24">
        {/* Header */}
        <div className="header-section">
          <div>
            <h1 className="title">My AI Models</h1>
            <p className="subtitle">
              Manage and view all AI models you've created
            </p>
          </div>
          <div className="model-count">
            <span className="count-badge">{models.length}</span>
            <p className="count-text">Total Models</p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="error-banner">
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
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Empty State */}
        {models.length === 0 && !error ? (
          <div className="empty-state">
            <div className="empty-icon">
              <svg
                width="64"
                height="64"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"></path>
              </svg>
            </div>
            <h2 className="empty-title">No Models Yet</h2>
            <p className="empty-description">
              You haven't created any AI models yet. Start by creating your first model!
            </p>
            <button
              className="empty-button"
              onClick={() => navigate("/add-model")}
            >
              Create Your First Model
            </button>
          </div>
        ) : (
          <div className="models-grid">
            {models.map((model) => (
              <div key={model._id} className="model-card-wrapper">
                <ModelCard model={model} />
                <div className="card-meta">
                  <span className="created-by">Created by: {model.createdBy}</span>
                  <span className="purchase-count">
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2m0 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16z"></path>
                    </svg>
                    {model.purchased} purchases
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-h-screen;
  padding-top: 20px;
  transition: background-color 0.3s ease;
  background: ${({ $darkMode }) => ($darkMode ? "#000000" : "#f4f4f5")};
  color: ${({ $darkMode }) => ($darkMode ? "#ffffff" : "#111827")};

  .header-section {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    margin-bottom: 32px;
    flex-wrap: wrap;
    gap: 20px;
  }

  .title {
    font-size: 36px;
    font-weight: 800;
    margin: 0 0 8px 0;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .subtitle {
    font-size: 16px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0;
  }

  .model-count {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 16px 24px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.1)" : "rgba(37, 99, 235, 0.1)"};
    border-radius: 12px;
    border: 1px solid
      ${({ $darkMode }) =>
        $darkMode ? "rgba(6, 182, 212, 0.2)" : "rgba(37, 99, 235, 0.2)"};
  }

  .count-badge {
    font-size: 32px;
    font-weight: 700;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
  }

  .count-text {
    font-size: 12px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .error-banner {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 16px;
    margin-bottom: 24px;
    background: rgba(239, 68, 68, 0.1);
    border: 1px solid rgba(239, 68, 68, 0.3);
    border-radius: 12px;
    color: #ef4444;
    font-size: 14px;
    animation: slideIn 0.3s ease;
  }

  .error-banner svg {
    flex-shrink: 0;
    stroke: #ef4444;
  }

  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(-10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  .empty-state {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px 40px;
    text-align: center;
    background: ${({ $darkMode }) =>
      $darkMode
        ? "rgba(255, 255, 255, 0.02)"
        : "rgba(0, 0, 0, 0.02)"};
    border-radius: 24px;
    border: 2px dashed
      ${({ $darkMode }) =>
        $darkMode
          ? "rgba(255, 255, 255, 0.1)"
          : "rgba(0, 0, 0, 0.1)"};
  }

  .empty-icon {
    width: 80px;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(6, 182, 212, 0.1)" : "rgba(37, 99, 235, 0.1)"};
    border-radius: 50%;
    margin-bottom: 20px;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
  }

  .empty-title {
    font-size: 24px;
    font-weight: 700;
    margin: 0 0 12px 0;
  }

  .empty-description {
    font-size: 16px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 0 0 24px 0;
    max-width: 400px;
  }

  .empty-button {
    padding: 12px 28px;
    background: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    color: ${({ $darkMode }) => ($darkMode ? "#000000" : "#ffffff")};
    border: none;
    border-radius: 12px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      transform: translateY(-2px);
      box-shadow: ${({ $darkMode }) =>
        $darkMode
          ? "0 10px 25px rgba(6, 182, 212, 0.3)"
          : "0 10px 25px rgba(37, 99, 235, 0.3)"};
    }
  }

  .models-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
    gap: 24px;
  }

  .model-card-wrapper {
    display: flex;
    flex-direction: column;
  }

  .card-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    background: ${({ $darkMode }) =>
      $darkMode ? "rgba(255, 255, 255, 0.05)" : "rgba(0, 0, 0, 0.02)"};
    border-radius: 0 0 12px 12px;
    font-size: 12px;
    gap: 12px;
    flex-wrap: wrap;
  }

  .created-by {
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    font-weight: 500;
  }

  .purchase-count {
    display: flex;
    align-items: center;
    gap: 6px;
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
    font-weight: 600;
  }

  @media (max-width: 768px) {
    .header-section {
      flex-direction: column;
    }

    .title {
      font-size: 28px;
    }

    .models-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .empty-state {
      padding: 60px 20px;
    }
  }
`;

export default MyModels;