import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "../Context/ThemeContext";
import AuthContext from "../Context/AuthContext";
import Loader from "../Components/Loader";
import styled from "styled-components";
import useAxiosSecure from "../Hooks/useAxiosSecure";

function Purchase() {
  const axiosSecure = useAxiosSecure();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);
  const { user, loading: authLoading, } = useContext(AuthContext);
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/login");
      return;
    }

    if (user) {
      axiosSecure
        .get(`/my-purchases?email=${user.email}`)
        .then((response) => {
          console.log("Purchases fetched:", response.data);
          setPurchases(response.data);
          setError(null);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching purchases:", error);
          setError("Failed to load your purchases. Please try again.");
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
            <h1 className="title">My Purchases</h1>
            <p className="subtitle">
              View all AI models you've purchased
            </p>
          </div>
          <div className="purchase-count">
            <span className="count-badge">{purchases.length}</span>
            <p className="count-text">Models Purchased</p>
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
        {purchases.length === 0 && !error ? (
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
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
            </div>
            <h2 className="empty-title">No Purchases Yet</h2>
            <p className="empty-description">
              You haven't purchased any AI models yet. Explore our collection and start building with powerful models!
            </p>
            <button
              className="empty-button"
              onClick={() => navigate("/all-models")}
            >
              Browse Models
            </button>
          </div>
        ) : (
          <div className="purchase-grid">
            {purchases.map((purchase) => {
              console.log("🔍 Purchase item:", purchase);
              
              // Try multiple ways to get model data
              let model = null;
              
              // Method 1: Check if modelInfo is an array
              if (purchase.modelInfo && Array.isArray(purchase.modelInfo) && purchase.modelInfo.length > 0) {
                model = purchase.modelInfo[0];
                console.log("✅ Found model in modelInfo array:", model);
              }
              // Method 2: Check if model properties exist directly on purchase
              else if (purchase.name && purchase.framework) {
                model = purchase;
                console.log("✅ Found model properties on purchase object:", model);
              }
              // Method 3: Check if it's not an array but still an object
              else if (purchase.modelInfo && typeof purchase.modelInfo === 'object' && !Array.isArray(purchase.modelInfo)) {
                model = purchase.modelInfo;
                console.log("✅ Found model as object in modelInfo:", model);
              }
              
              console.log("📦 Extracted model:", model);
              
              if (!model) {
                console.warn("⚠️ No model data found for purchase:", purchase._id, purchase);
                return null;
              }

              return (
                <StyledPurchaseCard key={purchase._id} $darkMode={darkMode}>
                  <div className="image-wrapper">
                    <img src={model.image || "https://via.placeholder.com/340x200?text=Model+Image"} alt={model.name} />
                    <div className="badge">Purchased</div>
                  </div>

                  <div className="content">
                    <h2 className="model-name">{model.name}</h2>

                    <p className="model-description">{model.description}</p>

                    <div className="info-grid">
                      <div className="info-item">
                        <span className="label">Framework:</span>
                        <span className="value">{model.framework}</span>
                      </div>

                      <div className="info-item">
                        <span className="label">Use Case:</span>
                        <span className="value">{model.useCase}</span>
                      </div>

                      <div className="info-item">
                        <span className="label">Dataset:</span>
                        <span className="value">{model.dataset}</span>
                      </div>

                      <div className="info-item">
                        <span className="label">Created by:</span>
                        <span className="value">{model.createdBy}</span>
                      </div>

                      <div className="info-item">
                        <span className="label">Purchased by:</span>
                        <span className="value">{purchase.buyerEmail}</span>
                      </div>

                      <div className="info-item">
                        <span className="label">Total Purchases:</span>
                        <span className="value">{model.purchased}</span>
                      </div>
                    </div>

                    <div className="purchase-date">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                        <line x1="16" y1="2" x2="16" y2="6"></line>
                        <line x1="8" y1="2" x2="8" y2="6"></line>
                        <line x1="3" y1="10" x2="21" y2="10"></line>
                      </svg>
                      <span>
                        Purchased: {new Date(purchase.purchasedAt).toLocaleDateString()}
                      </span>
                    </div>

                    <Link to={`/model/${model._id}`}>
                      <button className="view-details-btn">
                        View Details
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </button>
                    </Link>
                  </div>
                </StyledPurchaseCard>
              );
            })}
          </div>
        )}
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  min-height: 100vh;
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

  .purchase-count {
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

  .purchase-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
    gap: 24px;
  }

  @media (max-width: 768px) {
    .header-section {
      flex-direction: column;
    }

    .title {
      font-size: 28px;
    }

    .purchase-grid {
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
    }

    .empty-state {
      padding: 60px 20px;
    }
  }
`;

const StyledPurchaseCard = styled.div`
  background: ${({ $darkMode }) =>
    $darkMode ? "rgba(15, 23, 42, 0.95)" : "rgba(255, 255, 255, 0.95)"};
  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"};
  color: ${({ $darkMode }) => ($darkMode ? "#f8fafc" : "#0f172a")};
  border-radius: 16px;
  overflow: hidden;
  transition: all 0.3s ease;
  box-shadow: ${({ $darkMode }) =>
    $darkMode
      ? "0 10px 35px rgba(0,0,0,0.45)"
      : "0 10px 30px rgba(0,0,0,0.08)"};
  display: flex;
  flex-direction: column;
  height: 100%;

  &:hover {
    transform: translateY(-6px);
    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 15px 40px rgba(0,0,0,0.6)"
        : "0 15px 40px rgba(0,0,0,0.12)"};
  }

  .image-wrapper {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .image-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.06);
  }

  .badge {
    position: absolute;
    top: 12px;
    right: 12px;
    padding: 6px 12px;
    background: rgba(6, 182, 212, 0.9);
    color: #000;
    font-size: 12px;
    font-weight: 700;
    border-radius: 8px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  .content {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    flex-grow: 1;
  }

  .model-name {
    font-size: 18px;
    font-weight: 700;
    margin: 0;
    line-height: 1.3;
  }

  .model-description {
    font-size: 13px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#6b7280")};
    margin: 8px 0 0 0;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .info-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 12px;
  }

  .info-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .label {
    font-size: 11px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.5px;
    color: ${({ $darkMode }) => ($darkMode ? "#94a3b8" : "#6b7280")};
  }

  .value {
    font-size: 13px;
    font-weight: 600;
    color: ${({ $darkMode }) => ($darkMode ? "#e2e8f0" : "#1e293b")};
    word-break: break-word;
  }

  .purchase-date {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 12px;
    color: ${({ $darkMode }) => ($darkMode ? "#cbd5e1" : "#64748b")};
    padding: 8px 0;
  }

  .purchase-date svg {
    color: ${({ $darkMode }) => ($darkMode ? "#06b6d4" : "#2563eb")};
  }

  .view-details-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    padding: 10px 16px;
    background: linear-gradient(135deg, #06b6d4, #0891b2);
    color: #000;
    border: none;
    border-radius: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    width: 100%;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 16px rgba(6, 182, 212, 0.4);
    }

    &:active {
      transform: translateY(0);
    }
  }

  @media (max-width: 640px) {
    .info-grid {
      grid-template-columns: 1fr;
    }

    .content {
      padding: 16px;
    }

    .model-description {
      -webkit-line-clamp: 3;
    }
  }
`;

export default Purchase;