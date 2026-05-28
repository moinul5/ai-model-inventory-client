import { Link } from "react-router";
import styled from "styled-components";
import { useTheme } from "../Context/ThemeContext";

const ModelCard = ({ model }) => {
  const { darkMode } = useTheme();

  const {
    _id,
    name,
    framework,
    useCase,
    image,
  } = model;

  return (
    <StyledCard $darkMode={darkMode}>
      <div className="image-wrapper">
        <img src={image} alt={name} />
      </div>

      <div className="content">
        <h2>{name}</h2>

        <div className="info">
          <p>
            <span>Framework:</span> {framework}
          </p>

          <p>
            <span>Use Case:</span> {useCase}
          </p>
        </div>

        <Link to={`/model/${_id}`}> 
          <button>View Details</button>
        </Link>
      </div>
    </StyledCard>
  );
};

const StyledCard = styled.div`
  background: ${({ $darkMode }) =>
    $darkMode
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(255, 255, 255, 0.95)"};

  border: 1px solid
    ${({ $darkMode }) =>
      $darkMode
        ? "rgba(255,255,255,0.08)"
        : "rgba(0,0,0,0.08)"};

  color: ${({ $darkMode }) =>
    $darkMode ? "#f8fafc" : "#0f172a"};

  border-radius: 24px;

  overflow: hidden;

  transition: all 0.3s ease;

  box-shadow: ${({ $darkMode }) =>
    $darkMode
      ? "0 10px 35px rgba(0,0,0,0.45)"
      : "0 10px 30px rgba(0,0,0,0.08)"};

  &:hover {
    transform: translateY(-6px);

    box-shadow: ${({ $darkMode }) =>
      $darkMode
        ? "0 15px 40px rgba(0,0,0,0.6)"
        : "0 15px 40px rgba(0,0,0,0.12)"};
  }

  .image-wrapper {
    width: 100%;
    height: 220px;
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

  .content {
    padding: 22px;
  }

  h2 {
    font-size: 1.4rem;
    font-weight: 700;
    margin-bottom: 14px;
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 10px;

    margin-bottom: 20px;
  }

  .info p {
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .info span {
    font-weight: 700;

    color: ${({ darkMode }) =>
      darkMode ? "#60a5fa" : "#2563eb"};
  }

  button {
    width: 100%;
    padding: 12px 18px;

    border: none;
    border-radius: 14px;

    cursor: pointer;

    font-size: 1rem;
    font-weight: 700;

    transition: all 0.3s ease;

    background: ${({ darkMode }) =>
      darkMode
        ? "linear-gradient(135deg, #2563eb, #60a5fa)"
        : "linear-gradient(135deg, #3b82f6, #2563eb)"};

    color: white;
  }

  button:hover {
    transform: scale(1.02);

    opacity: 0.95;
  }
`;

export default ModelCard;