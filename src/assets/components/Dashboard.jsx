import { React, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import Header from "./Header";
import Aluvial from "../../Images/Soils/Aluvial.jpg";
import Loader from "./Loader";
import { Agri } from "./Data";
import bg2 from "../../Images/bg2.jpg";
import icon from "../../Images/icon.png";
import FlipCard from "./Flipcard";

export default function Dashboard() {
  const location = useLocation();
  const { Agri_d, Weather, formdata, Predict_price } = location.state || {};
  console.log("Predict_price:", Predict_price, typeof Predict_price);
  const price = parseFloat(Predict_price);
  const [hovered, setHovered] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("../../../BackEnd/public/components.json") 
      .then((response) => response.json())
      .then((json) => setData(json))
      .catch((error) => console.error("Error fetching JSON:", error));
  }, []);

  if (!data) {
    return (
      <p className="flex justify-center items-center relative pt-80">
        <Loader />
      </p>
    );
  }


  // const colSpanValue = suitableCrops.length ? 12 / suitableCrops.length : 3; // Prevent division by zero

  return (
    <div className="font-pop">
      <div className="p-8 font-pop  min-h-screen">
        <div className="flex justify-between items-start">
          {/* Left side: Suitable Crops */}
          <div className="flex-1 mr-4">
            <h2 className="text-xl font-semibold mb-2 ">Expected Disease:</h2>
            <div className="grid grid-cols-12 gap-4">
              {data.potential_crop_diseases.map((disease, index) => (
                <div
                  key={index}
                  className={`col-span-4 bg-sor p-6  rounded-lg flex justify-center items-center 
                            transition-all duration-300 ease-in-out ${
                              hovered === index ? "h-32" : "h-20"
                            }`}
                  onMouseEnter={() => setHovered(index)}
                  onMouseLeave={() => setHovered(null)}
                >
                  <p className="text-yellow-700 text-center">
                    {hovered === index ? data.disease_details[index] : disease}
                  </p>
                </div>
              ))}
            </div>
          </div>
          {/* Right side: Farmsol Dashboard Heading */}
          <h1 className="text-3xl text-gray font-bold mb-4 justify-center">
            <Link to="/home">
              <span className="text-green-500">Farmsol </span>Dashboard
            </Link>
          </h1>
        </div>
        <br />
        <div className="grid gap-4 auto-rows-min  sm:grid-cols-12">
          <div className="bg-white p-6 rounded-lg shadow-md mb-6 sm:col-span-3  ">
            <div className="bg-dgry rounded-lg p-6 flex justify-center">
              <h2 className="text-xl text-rup font-semibold mb-2">
                Disease Prevention
              </h2>
            </div>
            <br />
            <ul className="list-disc list-inside">
              {data.precautionary_measures.map((measure, index) => (
                <li key={index} className="mb-2">
                  {measure}
                </li>
              ))}
            </ul>
            <br />
            <div className="bg-white min-h-10 rounded-lg flex items-baseline  ">
              <div className="">
                <div className="bg-dgry py-6 px-0 rounded-lg flex justify-center">
                  <h3 className="text-lg text-rup font-semibold">
                    Harvest Time
                  </h3>
                </div>
                <br />
                <p>
                  <span className="text-3xl font-bold">
                    {data.expected_harvest_time}
                  </span>{" "}
                  vs. previous month
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: 78 }}
                  ></div>
                </div>
              </div>
            </div>
          </div>

          <div className=" rounded-lg mb-6 justify-center sm:col-span-3">
            <div className="bg-dgry rounded-lg shadow-md mb-6 p-6">
              <img src={icon} alt="" className="size-20" /> <br />
              <br />
              <h2 className="text-5xl text-white font-semibold mb-2">
                Market Price
              </h2>
              <p className="text-3xl text-rup font-bold">
               {typeof price === "number" ? price .toFixed(2) : "30.92"} per/quin
              </p>
              <br />
              <p className="text-3xl text-rup font-bold">
                1KG = {((price)/100).toFixed(2) || "30.92"}
              </p>
            </div>
            <div></div>
          </div>
          <div className="bg-dgry p-6 rounded-lg shadow-md mb-6 flex flex-col  sm:col-span-6  gap-4">
            <div>
              <img
                src={bg2}
                alt="Alluvial Soil"
                className="w-full shadow-md object-cover rounded-lg"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl text-rup font-semibold mb-2 ">
                Best Practices:
              </h2>
              <ul className="list-disc list-inside text-xs text-justify">
                {data.best_practices.length > 0 ? (
                  data.best_practices.map((practice, index) => (
                    <li key={index} className="mb-2 text-gray-200">
                      {practice}
                    </li>
                  ))
                ) : (
                  <li>No best practices available.</li>
                )}
              </ul>
            </div>

            {/* Responsive Image */}
          </div>
        </div>

              {/* crop environment information */}
            <h1 className="text-xl font-semibold">Crop Environment Setup:</h1>
            <div className=" grid grid-cols-10 gap-2 text-center p-4">
              <div className="col-span-2 bg-dgry rounded-md shadow-lg p-6 text-rup ">
                <p className="">Maximum Temperature </p>
                <span className="text-gray-300">{data.growth_info.T_Max}°C </span>
              </div>
              <div className="col-span-2 bg-dgry rounded-md shadow-lg p-6 text-rup ">
                <p className="">Minimum Temperature </p>
                <span className="text-gray-300">{data.growth_info.T_Min}°C </span>
              </div>
              <div className="col-span-2 bg-dgry rounded-md shadow-lg p-6 text-rup ">
                <p className="">Optimal Temperature </p>
                <span className="text-gray-300">{data.growth_info.Optimum_degree}°C </span>
              </div>
              <div className="col-span-2 bg-dgry rounded-md shadow-lg p-6 text-rup ">
                <p className="">Rainfall mm </p>
                <span className="text-gray-300">{data.growth_info.Rainfall_mm[0]}-{data.growth_info.Rainfall_mm[1]} mm</span>
              </div>
              <div className="col-span-2 bg-dgry rounded-md shadow-lg p-6 text-rup ">
                <p className="">Altitude m MSL</p>
                <span className="text-gray-300">up to {data.growth_info.Altitude_m_MSL[1]} </span>
              </div>
            </div>


        <h1 className="text-xl font-semibold">Crop Recommendation: </h1>
        <div className="grid sm:grid-cols-12 py-6 gap-6">
          {data.suitable_crops.map((crop, index) => (
            <div
              key={index}
              className={`col-span-4 bg-rup text-dgry p-6 rounded-lg shadow-md`}
            >
              {crop.crop}
            </div>
          ))}
        </div>

        <br />
      </div>
      <h1 className="px-6 text-xl font-semibold">Crop Scheduling: <span className="text-2xl text-green-500">{data.detailed_crop_schedule[0].crop}</span></h1>
      <div className="grid grid-cols-4">
        {data.detailed_crop_schedule[0].schedule.map((day, index) => (
          <div key={index}>
            <FlipCard front={day.day} back={day.task} />
          </div>
        ))}
      </div>
    </div>
  );
}
