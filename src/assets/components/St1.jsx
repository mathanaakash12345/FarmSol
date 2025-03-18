import React, { useState } from "react";
import Form1 from "../../Images/Form1.png";
import Header from "./Header";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useEffect } from "react";
import Loader from "./Loader";

const Startpage = () => {
  const [state, setState] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [ifnext, setIfnext] = useState(true); // For city weather
  const [ifnext1, setIfnext1] = useState(true); // For form
  const [ifnext2, setIfnext2] = useState(false);
  const [result, setResult] = useState("");
  const [result1, setResult1] = useState("");
  const [isProcess, setIsProcess] = useState(false);

  const [marketPrice, setMarketPrice] = useState("$0.00");
  const [diseases, setDiseases] = useState([]);
  const [harvestTime, setHarvestTime] = useState({
    current: "N/A",
    previous: "N/A",
  });
  const [bestPractices, setBestPractices] = useState([]);
  const [suitableCrops, setSuitableCrops] = useState([]);
  const [cropSchedule, setCropSchedule] = useState({}); // Stores detailed crop plan
  const [expectedOutcome, setExpectedOutcome] = useState(""); // Stores predicted outcome of the harvest

  const navigate = useNavigate();

  const [formdata, setFormdata] = useState({
    name: "",
    location: "",
    district: "",
    farmsize: "",
    soil: "",
    irrigation: "",
    preferredcrop: "",
    prevcrop: "",
    date: "",
    pdhistory: "",
    budget: "",
  });

  const apiKey = "fcff2877cdfa6a8021924af25a0e893a";

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Fetch weather data
  const handleWeatherFetch = async () => {
    if (!state.trim()) {
      setError("Please enter a valid city name.");
      return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${state}&appid=${apiKey}&units=metric`;

    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error("Unable to fetch weather data.");
      }

      const data = await response.json();
      setWeatherData(data);
      console.log(data);
      setError(null);
    } catch (err) {
      setError(err.message || "An error occurred while fetching weather data.");
      setWeatherData(null);
    }
  };

  // Handle form submission
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIfnext1(false);
    setIfnext2(true);
    setIsProcess(true);
    console.log("Form data submitted:", formdata);
    setState(formdata.district);
    handleWeatherFetch();
    console.log(weatherData);

    try {
      // Gemini API logic

      const genAI = new GoogleGenerativeAI(
        "AIzaSyCBY4pic2uEucVaio6lc0aYFIgcyOTbxvo"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
      Using the provided agricultural data, give the answeer in the following format "JSON"
       Ensure the output is structured in the given JSON format.  
      
      ### Key  Questions need you to notice before answer the wuestion:  
      - What is the total area of the field to be cultivated?  
      - What is the soil type and its average pH level of the location ?  
      - What crops have been grown previously in this field (if any)?  
      - What is the available water source and irrigation method?  
      - What is the desired crop yield target?  
      - Are there any specific farming constraints (e.g., budget, machinery)?  
      - What is the planting start date and desired harvest period?  
      
      ### Data Provided:  
      - Farming details: 
      - Weather details:  
      
      ### JSON Output Structure:  
      \`\`\`json
      {
        \"best_practices\": [\"point1\", \"point2\", \"point3\"],
        \"suitable_crops\": [
          {
            \"crop\": \"crop_name\",
            \"image_url\": \"url_to_crop_image\",
            \"reasoning\": \"reason why this crop is suitable\"
          }
        ],
        \"expected_harvest_time\": \"number_of_days\",
        \"estimated_market_price\": \"price_in_INR\",
        \"potential_crop_diseases\": [\"disease1\", \"disease2\"],
        \"precautionary_measures\": [\"measure1\", \"measure2\"],
        \"Soil_Ph\": \"Average PH of soil based on the district\",
        \"detailed_crop_schedule\": [
          {
            \"crop\": \"crop_name\",
            \"schedule\": [
              {
                \"day\": \"Day 1\",
                \"task\": \"Planting\"
              },
              {
                \"day\": \"Day 15\",
                \"task\": \"Pesticide application\"
              },
              {
                \"day\": \"Day 30\",
                \"task\": \"Growth stage monitoring\"
              }
            ]
          }
        ]
      }
      \`\`\`
      
      Ensure that the output is concise and action-oriented for each answer, and refer to the provided data for accurate responses.
            
      Data provided:
      - Farming details: ${JSON.stringify(formdata)}
      - Weather details: ${JSON.stringify(weatherData)}
      `;

      const result = await model.generateContent(prompt);
      const result1 = result.response.text().replace(/\*+/g, "");

      console.log("Generated Response:", result.response.text());
      // handleGeminiResponse(result);
      setResult(result.response.text());
      setResult1(result1);
      setIsProcess(false);
    } catch (err) {
      console.error("Error with Gemini API:", err.message);
    }
  };

  const handledashbutton = () => {
    navigate("/Dashboard", { state: result1 });
  };

  // const handleGeminiResponse = (response) => {
  //   try {
  //     if (!response) throw new Error("Empty response from Gemini");

  //     setMarketPrice(response.estimatedMarketPrice || '$0.00');
  //     setDiseases(Array.isArray(response.potentialDiseases) ? response.potentialDiseases : []);
  //     setHarvestTime({
  //       current: response.harvestDuration?.current || 'N/A',
  //       previous: response.harvestDuration?.previous || 'N/A'
  //     });
  //     setBestPractices(Array.isArray(response.recommendedPractices) ? response.recommendedPractices : []);
  //     setSuitableCrops(Array.isArray(response.recommendedCrops) ? response.recommendedCrops : []);
  //     setCropSchedule(response.cropSchedule || {});  // Example: { "Paddy": { "Day 1": "Planting", "Day 10": "Irrigation", ... } }
  //     setExpectedOutcome(response.expectedOutcome || "Outcome data not available");

  //   } catch (error) {
  //     console.error('Error processing Gemini response:', error);
  //   }
  // };

  return (
    <div className="relative h-screen bg-cover font-pop  bg-center pt-20">
      <Header />

      {ifnext1 && (
        <div className="flex flex-wrap justify-between items-start px-8 py-6 bg-gray-50 min-h-screen">
          <div className="w-full lg:w-1/2">
            <h1 className="text-2xl font-bold mb-6 text-green-700">
              Agricultural Information Form
            </h1>
            <form className="space-y-4" onSubmit={handleFormSubmit}>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Your Name"
                  name="name"
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  State
                </label>
                <input
                  type="text"
                  placeholder="Enter location"
                  name="location"
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  District
                </label>
                <input
                  type="text"
                  placeholder="Enter District"
                  name="district"
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              {/* Farm Size */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Farm Size (in acres)
                </label>
                <input
                  type="number"
                  placeholder="Enter farm size"
                  onChange={handleChange}
                  name="farmsize"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              {/* Soil Type */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Soil Type
                </label>
                <select
                  name="soil"
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700 bg-transparent"
                >
                  <option value="">Select soil type</option>
                  <option value="Red">Red Soil</option>
                  <option value="Black">Black Soil</option>
                  <option value="Alluvial">Alluvial Soil</option>
                  <option value="Laterite">Laterite Soil</option>
                  <option value="Saline and Alkaline">
                    Saline and Alkaline Soil
                  </option>
                  <option value="Sandy">Sandy Soil</option>
                  <option value="Forest">Forest Soil</option>
                  <option value="others">Others</option>
                </select>
              </div>

              {/* Irrigation Type */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Irrigation Type
                </label>
                <select
                  onChange={handleChange}
                  name="irrigation"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700 bg-transparent"
                >
                  <option value="">Select irrigation type</option>
                  <option value="rain-fed">Rain-fed</option>
                  <option value="canal">Canal</option>
                  <option value="drip">Drip</option>
                  <option value="borewell">Borewell</option>
                </select>
              </div>

              {/* Crop Preferences */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Preferred Crops
                </label>
                <input
                  type="text"
                  placeholder="Enter preferred crops"
                  onChange={handleChange}
                  name="preferredcrop"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              {/* Previous Crops */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Previous Crops Grown
                </label>
                <input
                  type="text"
                  placeholder="Enter previous crops"
                  onChange={handleChange}
                  name="prevcrop"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              {/* Planting Date */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Planting Date
                </label>
                <input
                  type="date"
                  name="date"
                  onChange={handleChange}
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              {/* Pest and Disease History */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Pest and Disease History
                </label>
                <textarea
                  placeholder="Describe any known pests or diseases"
                  onChange={handleChange}
                  name="pdhistory"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                ></textarea>
              </div>

              {/* Budget Details */}
              <div>
                <label className="block text-lg font-medium text-gray-800">
                  Budget for Farming (₹)
                </label>
                <input
                  type="number"
                  placeholder="Enter budget"
                  onChange={handleChange}
                  name="budget"
                  className="w-full border-b-2 border-green-500 focus:outline-none focus:border-green-700"
                />
              </div>

              <button
                type="submit"
                className="px-6 py-2 bg-green-700 text-white font-medium rounded hover:bg-green-800"
              >
                Submit
              </button>
            </form>
          </div>
          <div className=" lg:w-1/2 flex justify-center items-center">
            <img src={Form1} alt="Agriculture" className="p-6" />
          </div>
        </div>
      )}

      {/* Agri Suggest */}
      <div className="flex justify-center items-center w-screen">
        {isProcess && <Loader />}
      </div>

      {ifnext2 && result && (
        <div className="bg-gray-300 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Farming Recommendations:
          </h2>

          <ul className="list-disc pl-6 text-lg leading-relaxed text-gray-700">
            {result1.split("\n").map((line, index) => {
              const cleanLine = line.replace(/\*+/g, ""); // Remove * and ** symbols
              if (cleanLine.trim()) {
                return (
                  <li key={index} className="mb-2 text-justify">
                    {cleanLine.trim()}
                  </li>
                );
              }
              return null;
            })}
          </ul>
          <button
            className="inline-flex items-center border rounded-xl px-5 py-2 bg-green-600 hover:bg-white text-white hover:text-green-700"
            onClick={handledashbutton}
          >
            Dashboard
            <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
    </div>
  );
};

export default Startpage;
