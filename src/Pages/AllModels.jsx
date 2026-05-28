import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import ModelCard from "../Components/ModelCard";
import { useTheme } from "../Context/ThemeContext";
import Loader from "../Components/Loader";

function AllModels() {
  const axiosInstance = useAxios();
  const { darkMode } = useTheme();
  const [loading, setLoading] = useState(true);

  const [models, setModels] = useState([]);

  useEffect(() => {
    axiosInstance
      .get("/models")
      .then((response) => {
        setModels(response.data);
        setLoading(false);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching models:", error);
        setLoading(false);
      });
  }, [axiosInstance]);

  if (loading) {
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
    <div
      className={`relative overflow-hidden transition-all duration-500 ${
        darkMode ? "bg-black text-white" : "bg-white text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 py-10 mt-24">
        <h1 className="text-3xl font-bold mb-8">All AI Models</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {models.map((model) => (
            <ModelCard key={model._id} model={model} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AllModels;
