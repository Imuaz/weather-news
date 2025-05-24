import express from "express";
import axios from "axios";
import dotenv from 'dotenv';


const router = express.Router();
dotenv.config();
const apiKey = process.env.OPENWEATHER_API_KEY;
const newsApiKey = process.env.GNEWS_API_KEY;

// Home route
router.get("/", (req, res) => {
    const data = "Weather & News Dashboard";
    res.render("index.ejs", { title: data });
});

// Weather API route
router.get("/api/weather/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
        const response = await axios.get(url);
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({error: "Failed to fetch weather data"});
    }
});

//API route for news data
router.get("/api/news/:city", async (req, res) => {
    try {
        const city = req.params.city;
        const url = `https://gnews.io/api/v4/search?q=${city}&lang=en&country=us&max=10&apikey=${newsApiKey}`;
        
        const response = await axios.get(url);
        // console.log(response.data);
        res.json(response.data);
    } catch (error) {
        console.log(error.response.message);
        res.status(500).json({error: error.message });
    }
});


export default router;