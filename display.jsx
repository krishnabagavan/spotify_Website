import React, { useEffect, useRef } from "react";
import { Routes, Route, useLocation, useParams } from "react-router-dom";
import { Navbar } from "./navbar";
import { albumsData } from "../assets/assets";
import { AlbumItems } from "./albumItems";
import { songsData } from "../assets/assets";
import { SingsItems } from "./singsItems";
import { Album } from "./Album";


export const Display = () => {
  const displayRef = useRef();
  const location = useLocation();
  const { id: albumId } = useParams(); // Use useParams to get the dynamic album id
  const isAlbum = location.pathname.includes("album");
  const bgColor = isAlbum ? albumsData[Number(albumId)]?.bgColor : "#121212"; // Handle invalid album id gracefully

  useEffect(() => {
    if (isAlbum && bgColor) {
      displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
    } else {
      displayRef.current.style.background = `#121212`;
    }
  }, [isAlbum, bgColor]); // Add dependencies

  return (
    <div
      ref={displayRef}
      className="w-[100%] m-2 px-6 pt-4 rounded bg-[#121212] text-white overflow-auto lg:w-[75%] lg:ml-0"
    >
      <Routes>
        <Route path="/" element={<DisHome />} />
        <Route path="/album/:id" element={<Album/>} />
      </Routes>
    </div>
  );
};

const DisHome = () => {
  return (
    <>
      <Navbar />
      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Featured Chart</h1>
        <div className="flex overflow-auto">
          {albumsData.map((item, index) => (
            <AlbumItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>

      <div className="mb-4">
        <h1 className="my-5 font-bold text-2xl">Today's Biggest Hits</h1>
        <div className="flex overflow-auto">
          {songsData.map((item, index) => (
            <SingsItems
              key={index}
              name={item.name}
              desc={item.desc}
              id={item.id}
              image={item.image}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default DisHome;
