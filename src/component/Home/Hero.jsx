"use client";
import React, { useEffect, useState } from 'react';

const Hero = () => {
    const [characters, setCharacters] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch("https://api.artic.edu/api/v1/artworks");
                const data = await resp.json();
                setCharacters(data.data);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-800 to-pink-700 p-10 text-white font-sans">
            <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-12 drop-shadow-lg">
                🎨 Artworks Gallery
            </h1>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {characters.map((character) => (
                    <div
                        key={character.id}
                        className="bg-white/10 backdrop-blur-lg border border-white/20 p-6 rounded-2xl shadow-2xl hover:scale-105 transform transition duration-300"
                    >
                        <h2 className="text-2xl font-bold text-yellow-300 mb-3">
                            {character.title}
                        </h2>
                        <p className="text-md text-purple-100">
                            <span className="font-semibold text-yellow-400">Artist:</span>{" "}
                            {character.artist_title || "Unknown Artist"}
                        </p>
                        <p className="text-md text-purple-100 mt-1">
                            <span className="font-semibold text-yellow-400">Date:</span>{" "}
                            {character.date_display || "Unknown Date"}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Hero;
