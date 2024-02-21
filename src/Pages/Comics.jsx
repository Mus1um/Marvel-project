import React, { useEffect, useState } from "react";
import banner from "../Images/Banner.svg";
import "../Style/Comics.css";
import testfoto from "../Images/UW.png";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { Link } from "react-router-dom";

function Comics() {
  const [data,setData]=useState([])
  useEffect(() => {
    axios
      .get(
        "https://gateway.marvel.com/v1/public/comics?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92"
      )
      .then((res) =>( setData(res.data.data.results)));
  },[]);

  return (
    <div>
      <div className="banner">
        <img src={banner} alt="" />
      </div>
      <div className="section">
        <div className="cards">
          <Row>
            {data.map(item=>(
                 <Col key={item.id} >
                  <Link to={`/InComics/${item?.id}`}>
                  <div className="card" >
                   <img src={`${item.thumbnail.path}.${item.thumbnail.extension}`} alt="" />
                   <h5>{item.title}</h5>
                   <p  >Price: {item.prices[0].price} $</p>
                 </div>
                  </Link>
                
               </Col>
            ))
            }
          </Row>
        </div>
      </div>
    </div>
  );
}

export default Comics;
