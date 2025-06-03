"use client";
import React, { useEffect, useState } from 'react';

const Page = ({ params }) => {
    const { slug } = params;
    const [artwork, setArtwork] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await fetch(`https://api.artic.edu/api/v1/artworks/${slug}`);
                if (!resp.ok) {
                    throw new Error(`Failed to fetch artwork with slug: ${slug}`);
                }
                const data = await resp.json();
                setArtwork(data.data);
            } catch (err) {
                setError(err.message);
            }
        };

        fetchData();
    }, [slug]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-300 via-purple-300 to-pink-200 flex items-center justify-center p-6">
            <div className="backdrop-blur-lg bg-white/30 border border-white/40 shadow-2xl rounded-3xl w-full max-w-5xl p-10 flex flex-col md:flex-row items-center md:items-start gap-10 transition-transform duration-300 ease-in-out transform hover:scale-[1.01]">
                
                {error ? (
                    <p className="text-red-700 bg-red-100 px-6 py-4 rounded-lg w-full text-center font-medium shadow-md">
                        ⚠️ {error}
                    </p>
                ) : artwork ? (
                    <>
                        {/* Artwork Image */}
                        {artwork.image_id && (
                            <div className="w-full md:w-1/2 flex-shrink-0">
                                <img
                                    src={`https://www.artic.edu/iiif/2/${artwork.image_id}/full/843,/0/default.jpg`}
                                    alt={artwork.title}
                                    className="rounded-2xl shadow-lg border border-white/60"
                                />
                            </div>
                        )}

                        {/* Artwork Info */}
                        <div className="text-gray-900 w-full md:w-1/2">
                            <h1 className="text-4xl font-extrabold mb-4 text-purple-900 drop-shadow-md">
                                {artwork.title}
                            </h1>
                            <p className="text-xl font-medium mb-2">
                                <span className="text-gray-700">Artist:</span>{" "}
                                {artwork.artist_title || "Unknown Artist"}
                            </p>
                            <p className="text-xl font-medium mb-2">
                                <span className="text-gray-700">Date:</span>{" "}
                                {artwork.date_display || "Unknown Date"}
                            </p>
                            <p className="text-md text-gray-600 mt-4 italic">
                                Artwork ID: {artwork.id}
                            </p>
                        </div>
                    </>
                ) : (
                    <p className="text-gray-700 text-lg font-semibold animate-pulse">
                        ⏳ Loading artwork...
                    </p>
                )}
            </div>
        </div>
    );
};

export default Page;
