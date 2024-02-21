import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import banner from "../Images/Banner.svg";
import { Button } from "reactstrap";
import axios from "axios";
import '../Style/Homepage.css'

function Homepage() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();
  const param = useParams();
  const data = param.id;
  useEffect(() => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${data}?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92`
      )
      .then((res) => setItems(res.data.data.results));
  },[]);
  console.log(data);

  return (
    <div>
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <Button color="primary" style={{marginTop:'25px'}} onClick={() => navigate("/")}>GO TO BACK</Button>
      {
        items.map(item=>(
            <div className="box" key={item.id}>
            <div className="left">
                <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
            </div>
            <div className="right">
                <h1>{item.name}</h1>
                <p>{item.description}</p>
            </div>
          </div>
        ))
      }
     
    </div>
  );
}

export default Homepage;
