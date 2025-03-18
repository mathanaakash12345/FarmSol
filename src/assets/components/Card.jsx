import React, { useState } from "react";
import start from '../../Images/start.jpg';
import middle from '../../Images/middle.jpg';
import { useNavigate } from "react-router-dom"; 


const Card = () => {
  const [activeCard, setActiveCard] = useState(null);
  const navigate = useNavigate();

  return (
    <>
    <div className=" gap-8 p-8 font-pop grid grid-cols-2">
      {/* First Card */}
      <div
        className={`relative flex flex-col bg-transperent  border shadow-lg rounded-lg overflow-hidden cursor-pointer transition-all duration-300 
          ${activeCard === "ai" ? "scale-105" : "scale-100"} w-72`}
        onMouseEnter={() => setActiveCard("ai")}
        onMouseLeave={() => setActiveCard(null)}
        onClick={() => navigate("/Startpage")}
      >
        
        <div className="p-6">
          <div className="text-2xl font-bold text-white mb-4">
           STARTING<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STAGE..
          </div>
          <div className="text-gray-300 text-sm text-justify">
            This stage focuses on managing and supporting your crops. 
            At this point, crops often require additional care and assistance. 
            We offer such as disease prediction and preventive measures.
          </div>
        </div>
        <img
          className="w-full h-48 object-cover"
          src={start}
          alt="Starting Stage"
        />
        
      </div>

      {/* Second Card */}
      <div
        className={`relative flex flex-col bg-transperent shadow-lg border rounded-lg overflow-hidden cursor-pointer transition-all duration-300 
          ${activeCard === "ds" ? "scale-105" : "scale-100"} w-72`}
        onMouseEnter={() => setActiveCard("ds")}
        onMouseLeave={() => setActiveCard(null)}
        onClick={() => navigate("/Middlepage")}
      >
        <div className="p-6">
          <div className="text-2xl font-bold text-white mb-4">
            MIDDLE<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;STAGE..
          </div>
          <div className="text-gray-300 text-sm text-justify">
            The starting stage marks the beginning of agricultural practices.
             During this crucial phase, we provide a detailed,
              long-term plan designed specifically for your crop management needs.
          </div>
        </div>
        <img
          className="w-full h-48 object-cover"
          src={middle}
          alt="Middle Stage"
        />
      </div>
    </div>
    </>
  );
};

export default Card;
