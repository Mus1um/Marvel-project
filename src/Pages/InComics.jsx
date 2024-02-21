import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import banner from "../Images/Banner.svg";
import '../Style/InComics.css'

function InComics() {
  const [data, setData] = useState([]);
  const param = useParams();
  const navigate=useNavigate()
  const tata = param.id;
  console.log(data);
  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/comics/${tata}?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92`
      )
      .then((res) => setData(res.data.data.results[0]));
  }, []);
  return (
    <div>
          <div className="banner">
        <img src={banner} alt="" />
      </div>
      <h4 style={{cursor:'pointer',marginTop:'10px'}} onClick={()=>navigate('/Comics')}>Back to all</h4>
      {
        <div className="box" key={data.id}>
          <img
            style={{ width: "293px",paddingRight:'25px' }}
            src={`${data.thumbnail?.path}.${data.thumbnail?.extension}`}
            alt=""
          />
          <div className="text">
          <h1>{data.title}</h1>
          <p>{data.textObjects?.[0]?.text}</p>
          <h3>language: {data.textObjects?.[0]?.language}</h3>
          <h3>Price: {data.prices?.[0]?.price}$</h3>
          </div>
        </div>
      }
    
    </div>
  );
}

export default InComics;
