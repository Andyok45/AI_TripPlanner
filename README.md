# TravelPlan AI - Smart Trip Planning Application

## Overview

TravelPlan AI is a full-stack web application that leverages the power of Gemini AI to create personalized travel itineraries. The app allows users to input their travel details, receive budget options, and generate detailed itineraries tailored to their preferences.

## Features

- **AI-Powered Itinerary Generation**: Utilizes Gemini AI to create personalized travel plans
- **User Authentication**: Secure login with email/password and Google authentication via React-Google-Auth
- **Location Autocomplete**: Smart location input with autocomplete functionality
- **Budget Options**: Choose from multiple budget tiers for your trip
- **Real-time Data Synchronization**: Firebase backend ensures your data is always up-to-date
- **Responsive UI**: Seamless experience across desktop and mobile devices
- **Travel Management**: Easily create, view, and manage your travel plans

## Tech Stack

### Frontend
- **React**: JavaScript library for building the user interface
- **TailwindCSS**: Utility-first CSS framework for styling
- **React Router**: For navigation and routing within the application
- **React-Google-Auth**: For Google authentication integration
- **Location Autocomplete API**: For smart location input suggestions

### Backend & Data
- **Firebase Authentication**: Secure user authentication
- **Firebase Firestore**: NoSQL database for storing user data and travel plans
- **Google Gemini AI**: Advanced AI model for generating personalized travel itineraries

## Application Flow

1. User logs in (via email/password or Google authentication)
2. User inputs travel details (origin, destination, number of travelers, number of days)
3. Application sends data to backend and AI processing
4. User receives and selects from budget options
5. Final detailed itinerary is generated and displayed
6. User can save, edit, or share their travel plans

## Installation

```bash
# Clone the repository
git clone https://github.com/Andyok45/AI_TripPlanner.git

# Navigate to project directory
cd AI_TripPlanner

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Current Status

- ✅ User authentication (email/password and Google login)
- ✅ Data input form for travel details
- ✅ Firebase backend integration for data storage
- ⬜ Budget selection interface
- ⬜ Final itinerary display page
- ⬜ Additional features (sharing, editing, etc.)

## Screenshots

![Input Form](https://github.com/yourusername/travelplan-ai/raw/main/screenshots/input_form.png)
![Console](https://github.com/yourusername/travelplan-ai/raw/main/screenshots/console.png)


