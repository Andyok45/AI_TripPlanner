import React from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { AI_PROMPT } from "@/constants/options";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-pro",
})

const generationConfig = {
  temperature: 1,         // Higher temperature for more creative responses
  topP: 0.95,             // Controls diversity of responses
  topK: 64,               // Limits token selection to top K possibilities
  maxOutputTokens: 8000,  // Maximum length of response
  responseMimeType: 'application/json', // Requesting JSON response format
};

const generateBudgetOptions = async (prompt) => {

  try {

  const chatSession = model.startChat({
    context: 'You are a travel planner AI. You will help the user plan their trip.',
    generationConfig,
    history: []
  })

  const response = await chatSession.sendMessage(prompt);

  console.log("Full response object:", response);

  let responseText = "";

    if (response.candidates && response.candidates[0]?.content?.parts) {
      for (const part of response.candidates[0].content.parts) {
        if (part.text) {
          responseText += part.text;
        }
      }
    } else if (response.response && typeof response.response.text === 'function') {
      // If text is a function, call it to get the text
      responseText = response.response.text();
    } else if (response.response && response.response.text) {
      // If text is already available
      responseText = response.response.text;
    }

    console.log("Extracted text:", responseText);

    return responseText;

}catch (apiError) {
  console.error("API Error:", apiError);
} finally {
}
}

export default generateBudgetOptions;











// import React, { useState, useEffect } from 'react'
// import { GoogleGenerativeAI } from '@google/generative-ai'

// const apiKey = import.meta.env.GEMINI_API_KEY
// const genAI = new GoogleGenerativeAI(apiKey)

// const model = genAI.getGenerativeModel({
//   model: 'gemini-1.5-flash',
// })

// const generationConfig = {
//   temperature: 1,
//   topP: 0.95,
//   topK: 64,
//   maxOutputTokens: 8000,
//   responseMimeType: 'application/json',
// }

// export const chatSession = model.startChat({
//   context: 'You are a travel planner AI. You will help the user plan their trip.',
//   generationConfig,
//   history: [
//     {
//       role: 'user',
//       parts: [
//         {
//           text: 'Generate a travel plan for location: Las Vegas, for 3 days for couple with a cheap budget, give me Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates, rating, description and suggest itinerary with place name, Place details, place image url, geo coordinates, ticket pricing, rating, time travel of each location for 3 days with each day plan with best time to visit in JSON format'
//         }
//       ]
//     },
//     {
//       role: 'model',
//       parts: [
//         {
//           text: "```json\n{\n  \"tripDetails\": {\n    \"destination\": \"Las Vegas, Nevada\",\n    \"travelers\": \"Couple\",\n    \"duration\": \"3 Days\",\n    \"budget\": \"Cheap\"\n  },\n  \"hotels\": [\n    {\n      \"hotelName\": \"Hotel Name 1\",\n      \"hotelAddress\": \"Hotel Address 1\",\n      \"price\": \"$$$ (replace with price range)\",\n      \"hotelImageUrl\": \"URL of hotel image\",\n      \"geoCoordinates\": {\n        \"latitude\": \"0.0\",\n        \"longitude\": \"0.0\" \n      },\n      \"rating\": \"4.0\",\n      \"description\": \"Hotel description\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 2\",\n      \"hotelAddress\": \"Hotel Address 2\",\n      \"price\": \"$$$ (replace with price range)\",\n      \"hotelImageUrl\": \"URL of hotel image\",\n      \"geoCoordinates\": {\n        \"latitude\": \"0.0\",\n        \"longitude\": \"0.0\" \n      },\n      \"rating\": \"3.5\",\n      \"description\": \"Hotel description\"\n    },\n    {\n      \"hotelName\": \"Hotel Name 3\", \n      \"hotelAddress\": \"Hotel Address 3\",\n      \"price\": \"$$$ (replace with price range)\",\n      \"hotelImageUrl\": \"URL of hotel image\",\n      \"geoCoordinates\": {\n        \"latitude\": \"0.0\",\n        \"longitude\": \"0.0\" \n      },\n      \"rating\": \"4.2\",\n      \"description\": \"Hotel description\"\n    }\n\n  ],\n  \"itinerary\": {\n    \"day1\": [\n      {\n        \"placeName\": \"The Strip (walking tour)\",\n        \"placeDetails\": \"Walk the length of the Strip, taking in the sights and sounds.  Focus on the free attractions.\",\n        \"placeImageUrl\": \"URL of Strip image\",\n        \"geoCoordinates\": {\n          \"latitude\": \"0.0\",\n          \"longitude\": \"0.0\"\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.5\",\n        \"timeTravel\": \"4 hours\"\n      },\n      {\n        \"placeName\": \"Fremont Street Experience (Evening)\",\n        \"placeDetails\": \"Experience the vibrant light show and street performers.\",\n        \"placeImageUrl\": \"URL of Fremont Street image\",\n        \"geoCoordinates\": {\n          \"latitude\": \"0.0\",\n          \"longitude\": \"0.0\"\n        },\n        \"ticketPricing\": \"Free (optional paid shows)\",\n        \"rating\": \"4.0\",\n        \"timeTravel\": \"2 hours\"\n      }\n    ],\n    \"day2\": [\n      {\n        \"placeName\": \"Hoover Dam\",\n        \"placeDetails\": \"Take a day trip to the Hoover Dam (consider a tour bus for cheap transport).\",\n        \"placeImageUrl\": \"URL of Hoover Dam image\",\n        \"geoCoordinates\": {\n          \"latitude\": \"0.0\",\n          \"longitude\": \"0.0\"\n        },\n        \"ticketPricing\": \"$$$ (check for tour prices)\",\n        \"rating\": \"4.8\",\n        \"timeTravel\": \"6 hours (including travel time)\"\n      }\n    ],\n    \"day3\": [\n      {\n        \"placeName\": \"Red Rock Canyon National Conservation Area\",\n        \"placeDetails\": \"Hike or drive through the scenic Red Rock Canyon.\",\n        \"placeImageUrl\": \"URL of Red Rock Canyon image\",\n        \"geoCoordinates\": {\n          \"latitude\": \"0.0\",\n          \"longitude\": \"0.0\"\n        },\n        \"ticketPricing\": \"$$ (park entrance fee)\",\n        \"rating\": \"4.6\",\n        \"timeTravel\": \"4 hours\"\n      },\n      {\n        \"placeName\": \"Seven Magic Mountains\",\n        \"placeDetails\": \"Visit this colorful art installation (easily accessible by car)\",\n        \"placeImageUrl\": \"URL of Seven Magic Mountains image\",\n        \"geoCoordinates\": {\n          \"latitude\": \"0.0\",\n          \"longitude\": \"0.0\"\n        },\n        \"ticketPricing\": \"Free\",\n        \"rating\": \"4.2\",\n        \"timeTravel\": \"1 hour\"\n      }\n    ]\n  }\n}\n```"
//         }
//       ]
//     }
//   ]
// })