import React, { useState } from "react";
import Form1 from "../../Images/Form1.jpg";
import Header from "./Header";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import Loader from "./Loader";
import st1 from "../../Images/st1.png";
import { filesaves } from "../../Services/Handleservices";
import { agriinfo } from "../../Services/Handleservices";
import Toast from "./Toast";
const Startpage = () => {
  const [formdata, setFormdata] = useState({
    name: "",
    location: "",
    district: "",
    farmsize: "",
    soil: "Aluvial",
    irrigation: "",
    preferredcrop: "",
    prevcrop: "",
    date: "",
    pdhistory: "",
    budget: "",
  });

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [result, setResult] = useState(null);
  const [ifnext, setIfnext] = useState(true);
  const [predictedPrice, setPredictedPrice] = useState("");

  const navigate = useNavigate();
  const API_KEY = "fcff2877cdfa6a8021924af25a0e893a"; // Weather API Key

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleWeatherFetch = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${formdata.district}&appid=${API_KEY}&units=metric`
      );
      if (!response.ok) throw new Error("Unable to fetch weather data.");
      const data = await response.json();
      setWeatherData(data);
      console.log(data);
      return data;
    } catch (err) {
      setError(err.message);
      return null;
    }
  };

  const handlecroppricefetch = async (e) => {
    e.preventDefault();
    console.log("Sending Data:", JSON.stringify(formdata));

    try {
        const response = await fetch("http://192.168.126.234:5000/predict", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formdata),
        });

        if (!response.ok) {
            const errorText = await response.text(); // Get error message from server
            throw new Error(`Error: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        setPredictedPrice(data.predicted_price);
        console.log(data.predicted_price)
        console.log("Predicted Price:", predictedPrice);
        return data;
    } catch (error) {
        console.error("Prediction Error:", error);
        return null;
    }
};


  const addDaysToDate = async (days) => {
    if (!formdata.date) return; 

    const [day, month, year] = formdata.date.split("/").map(Number);
    let newDate = new Date(year, month - 1, day); 
  
    newDate.setDate(newDate.getDate() + days);
  
    
    const formattedDate =  `${newDate.getDate().toString().padStart(2, "0")}/${(newDate.getMonth() + 1)
      .toString()
      .padStart(2, "0")}/${newDate.getFullYear()}`;
    
      
      setFormdata((prev) => ({ ...prev, date: formattedDate }));
      console.log(formdata.date);
    return 1;
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setIfnext(false);
    setIsProcessing(true);
    setError(null);
    setToastMessage("Processing..");
    setToastType("success");
    setShowToast(true);

    // Fetch weather data first
    const weather = await handleWeatherFetch();
    if (!weather) {
      setIsProcessing(false);
      return;
    } else {
      console.log("Data not recevied");
    }


    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyCBY4pic2uEucVaio6lc0aYFIgcyOTbxvo"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `Using the provided agricultural data, generate a response in the following JSON format, 
      dont provide any extra data like the para for "note","Disclaimer" only just json format data, 
      In the best_practices points give it a detailed expalin more humanly within 65 letters,
      In the estimated_market_price just give the excat value or give the mean of the range of value same for the Soil_Ph
      In the suitable_crops give me 3 crops,
      In precautionary_measures each point only contains the 3 or 4 words  ,
      verify formdata.budget is enough for the agriculture based on the farmsize and preferedcrop,
      In detailed_crop_schedule give the more detialed information like every 5 days what to do,
      In best_practices give from 70 - 80 letters for each points,
      Provide me growth_info for a crop in formdata.preferredcrop:

      \`\`\`json
      {
        "best_practices": ["point1", "point2", "point3","point4"],
        "suitable_crops": [
          {
            "crop": "crop_name",
            "image_url": "url_to_crop_image",
            "reasoning": "reason why this crop is suitable in 30 words"
          }
        ],
        "growth_info": {
              "T_Max": maximum temperature for Sorghum (°C),
              "T_Min": minimum temperature for Sorghum (°C),
              "Optimum_degree" : optimium temperature (°C)
              "Rainfall_mm": [minimum rainfall needed (mm), maximum rainfall needed (mm)],
              "Altitude_m_MSL": [minimum altitude (m), maximum altitude (m)],
              "Additional_Info": "Additional details about the crop"
              },
        "enough_budget":"their budget vs. Enough Budget you recommended",
        "expected_harvest_time": "number_of_days",
        "estimated_market_price": "price_in_INR",
        "potential_crop_diseases": ["disease1", "disease2", "disease3"],
        "disease_details":["Description about disease1","Description about disease2","Description about disease3"],
        "precautionary_measures": ["measure1", "measure2","measure3","measure4","measure5"],
        "Soil_Ph": "Average PH of soil based on the district",
        "detailed_crop_schedule": [
          {
            "crop": "crop_name",
            "schedule": [
              {
                "day": "Day 1",
                "task": "Planting"
              },
              {
                "day": "Day 15",
                "task": "Pesticide application"
              },
              {
                "day": "Day 30",
                "task": "Growth stage monitoring"
              }
            ]
          }
        ]
      }
      \`\`\`

      Data provided:
      - Farming details: ${JSON.stringify(formdata)}
      - Weather details: ${JSON.stringify(weatherData)}
      `;

      const response = await model.generateContent(prompt);
      const responseText =
        response.response.candidates[0].content.parts[0].text;

      const cleanJson = responseText.replace(/```json|```/g, "").trim();

      const jsonData = JSON.parse(cleanJson);

      await addDaysToDate(jsonData.expected_harvest_time);
      
      await handlecroppricefetch(e);

      console.log(formdata.date)
      
      console.log(jsonData); 

      setResult(jsonData);

      console.log("Function called");
      try {
        const response = await filesaves(jsonData);
        const datas = response.data;
        console.log(datas.message);
        // console.log(jsonData)
      } catch (e) {
        console.log(e);
      }
    } catch (err) {
      setError("Error fetching AI recommendations.");
      console.log(err)
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDashboard = () => {
    navigate("/Dashboard", { 
      state: { 
        Agri_d: result, 
        Weather: weatherData, 
        formdata: formdata, 
        Predict_price: predictedPrice 
      }
    });
  };

  return (
    <div className="relative h-screen bg-cover font-pop bg-center pt-20">
      <Header />
      <Toast
        message={toastMessage}
        type={toastType}
        showToast={showToast}
        setShowToast={setShowToast}
      />
      {ifnext && (
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
                  <option value="Aluvial">Alluvial Soil</option>
                  <option value="Laterite">Laterite Soil</option>
                  <option value="Salt&Alkaline">
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
          <div className="lg:w-1/2 flex justify-center items-center ">
            <img src={st1} alt="Agriculture" className="p-6 " />
          </div>
        </div>
      )}

      {isProcessing && (
        <div className="fixed inset-0 flex justify-center items-center bg-white/70">
          <Loader />
        </div>
      )}
      {result && (
        <div className="bg-gray-300 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Farming Recommendations:
          </h2>
          <h2>Best Practices:</h2>
          <ul className="list-disc list-inside">
            {result.best_practices.map((practice, index) => (
              <li key={index} className="mb-2">
                {practice}
              </li>
            ))}
          </ul>
          <button
            className="inline-flex items-center border rounded-xl px-5 py-2 bg-green-600 hover:bg-white text-white hover:text-green-700"
            onClick={handleDashboard}
          >
            Dashboard <ArrowRight className="ml-2 h-4 w-4" />
          </button>
        </div>
      )}
      {error && <p className="text-red-500">{error}</p>}
      
    </div>
  );
};

export default Startpage;
