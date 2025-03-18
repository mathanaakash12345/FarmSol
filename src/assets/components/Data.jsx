export const Agri={
    "best_practices": [
        "Ensure proper land preparation before sowing. This includes plowing, leveling, and removing any weeds or debris. ",
        "Use certified seeds of high-yielding varieties suitable for your region and soil type. ",
        "Implement an appropriate irrigation schedule based on your crop's water needs and the local climate.  Avoid both overwatering and underwatering, which can significantly impact yield and quality.",
        "Regularly monitor your crops for pests and diseases. Early detection and appropriate treatment can prevent significant yield losses."
    ],
    "suitable_crops": [
        {
            "crop": "Paddy",
            "image_url": "url_to_paddy_image",
            "reasoning": "Paddy thrives in alluvial soil and canal irrigation systems common in Dindigul, Tamil Nadu.  Given the previous wheat crop and the farmer's preference, paddy is a suitable rotational crop, offering good yields in this area."
        },
        {
            "crop": "Groundnut",
            "image_url": "url_to_groundnut_image",
            "reasoning": "Groundnut is well-suited to alluvial soils and can tolerate some variation in rainfall. It is a relatively drought-tolerant crop making it appropriate for the region, provided sufficient irrigation can be managed."
        },
        {
            "crop": "Wheat",
            "image_url": "url_to_groundnut_image",
            "reasoning": "Groundnut is well-suited to alluvial soils and can tolerate some variation in rainfall. It is a relatively drought-tolerant crop making it appropriate for the region, provided sufficient irrigation can be managed."
        },
        
    ],
    "expected_harvest_time": "120-150",
    "estimated_market_price": "3000-4000",
    "potential_crop_diseases": [
        "Blast",
        "Brown Spot",
        "Sheath Blight"
    ],
    "disease_details":[
         "A fungal disease that causes lesions on leaves, affecting crop yield.",
         "A bacterial or fungal disease that leads to brown spots on leaves.",
         "A fungal disease causing lesions on the sheath and stems of crops."
    ],
    "precautionary_measures": [
        "Disease-resistant varieties.",
        "Buildup in the soil.",
        "Practice soil.",
        "Practice  soil.",
        "Instructions carefully."
    ],
    "Soil_Ph": "6.5-7.5",
    "detailed_crop_schedule": [
        {
            "crop": "Paddy",
            "schedule": [
                {
                    "day": "Day 1",
                    "task": "Land preparation, plowing, and leveling"
                },
                {
                    "day": "Day 7",
                    "task": "Sowing/Transplanting of Paddy seedlings"
                },
                {
                    "day": "Day 15",
                    "task": "Weed management (manual weeding or herbicide application)"
                },
                {
                    "day": "Day 30",
                    "task": "First irrigation and nutrient application (Nitrogen, Phosphorus, Potassium)"
                },
                {
                    "day": "Day 60",
                    "task": "Growth stage monitoring, pest and disease scouting, second nutrient application"
                },
                {
                    "day": "Day 90",
                    "task": "Third irrigation and nutrient application, pest and disease control if necessary"
                },
                {
                    "day": "Day 120-150",
                    "task": "Harvesting"
                }
            ]
        }
    ]
}