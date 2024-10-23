import React from 'react'
import { useNavigate } from 'react-router-dom';

export const AlbumItems = ({image,name,desc,id}) => {

    const navigate = useNavigate();

  return (
    <div onClick={()=> navigate(`/album/${id}`)} className='min-w-[160px] p-2 px-3 rounded cursor-pointer hover:bg-[#ffffff26]'>
        <img className='rounded' src={image} alt="" />
        <p className='font-bold mt-2 mb-1'>{name}</p>
        <p className='text-slate-200 text-xs'>{desc}</p>

    </div>
  )
}
