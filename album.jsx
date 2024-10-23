import React, { useContext } from "react";
import { Navbar } from "./navbar";
import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../assets/assets";
import { PlayerContext } from "../context/playerContext";

export const Album = () => {
  const { id } = useParams();
  const albumData = albumsData[id];
  const { playWithId } = useContext(PlayerContext);

  // console.log(album);

  return (
    <>
      <Navbar />
      <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
        <img className="w-48 rounded" src={albumData.image} alt="" />
        <div className="flex flex-col">
          <p>Playlist</p>
          <h2 className="text-5xl font-bold mb-4 md:text-7xl">
            {albumData.name}
          </h2>
          <h4>{albumData.desc}</h4>
          <p className="mt-1">
            <img
              className="inline-block w-7 mr-2"
              src={assets.spotify_logo}
              alt=""
            />
            <b className="mr-2">Spotify</b>
            {/* <span className= ' font-extrabold' >&#183;</span>1,372,382 likes */}
            <b className="mr-2">
              {" "}
              <span className=" font-extrabold">&#183;</span> 50 Songs,
            </b>
            about 2 hr
          </p>
        </div>
      </div>

      <div className="grid grid-cols-4 sm:grid-col-4 mt-10 mb-4 pl-2 text-[#a7a7a7] ">
        <p className="mr-8">
          <b className="mr-2">#</b>Title
        </p>
        <p className="ml-8">Album</p>
        <p className="hidden sm:block">Date Added</p>
        <img className="m-auto w-4" src={assets.clock_icon} alt="" />
      </div>
      <hr />
      {songsData.map((item, index) => (
        <div
          onClick={() => playWithId(item.id)}
          key={index}
          className="grid grid-cols-4 sm:grid-col-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
        >
          <p className="text-white">
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <img className="inline w-10 mr-5" src={item.image} alt="" />
            {item.name}
          </p>
          <p className="text-[15px] ml-8"> {albumData.name}</p>
          <p className="text-[15px] hidden sm:block ml-2">3 days ago</p>
          <p className="text-[15px] text-center">{item.duration}</p>
        </div>
      ))}
    </>
  );
};
