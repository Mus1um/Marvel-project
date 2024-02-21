import React, { useState } from "react";
import "../Style/Home.css";
import thor from "../Images/Thumbnail.svg";
import deceration from "../Images/Decoration.svg";
import testfoto from "../Images/5202887448860 1.svg";
import skeleton from "../Images/Skeleton.svg";
import { Row, Col } from "reactstrap";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";

function Home(props) {
  const [activeclass, setActiveClass] = useState(null);
  const [activeInfo, setActiveInfo] = useState([]);
  const [load, setload] = useState(9);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const data = props.data;
  const handleactive = (item) => {
    setActiveClass(item);
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92`
      )
      .then((res) => {
        setActiveInfo(res.data.data.results[0]),
          console.log(res.data.data.results);
      });
  };
  const loadClick = () => {
    if (load >= 20) {
      setload(20);
    } else {
      setload(load + 3);
    }
  };
  const loadClick2 = () => {
    if (load <= 0) {
      setload(0);
    } else {
      setload(load - 11);
    }
  };
  const handleFind = () => {
    axios
      .get(
        `https://gateway.marvel.com/v1/public/characters/${item}?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92`
      )
      .then((res) => setName(res));
  };

  return (
    <div className="section">
      <div className="section2">
        <Row>
          <Col>
            <div className="left-box">
              <img src={thor} alt="thor" />
              <div className="text">
                <h1>THOR</h1>
                <p>
                  As the Norse God of thunder and lightning, Thor wields one of
                  the greatest weapons ever made, the enchanted hammer Mjolnir.
                  While others have described Thor as an over-muscled, oafish
                  imbecile, he's quite smart and compassionate...
                </p>
                <div className="buttons">
                  <button
                    style={{
                      backgroundColor: " #9F0013",
                      padding: " 11px 18px",
                    }}
                  >
                    HOMEPAGE
                  </button>

                  <button
                    style={{
                      backgroundColor: "#5C5C5C",
                      padding: " 11px 37px",
                    }}
                  >
                    WIKI
                  </button>
                </div>
              </div>
            </div>
          </Col>
          <Col>
            <div className="right-box">
              <div className="left">
                <p>
                  Random character for today! Do you want to get to know him
                  better?
                </p>
                <p>Or choose another one</p>
                <button>TRY IT</button>
              </div>
              <div className="right">
                <img src={deceration} alt="thor" />
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <div className="section3">
        <Row>
          <Col>
            <div className="cards">
              {data.slice(0, load).map((item) => (
                <div
                  className={`cardd ${
                    item.id === activeclass ? "activecard" : ""
                  }`}
                  key={item.id}
                  onClick={() => handleactive(item.id)}
                >
                  <div className="img">
                    <img
                      src={`${item.thumbnail.path}.${item.thumbnail.extension}`}
                      alt="salam"
                    />
                  </div>
                  <div className="text">
                    <h3>{item.name}</h3>
                  </div>
                </div>
              ))}
              <div className="load-button">
                <button
                  style={{ display: `${load == data.length ? "none" : ""}` }}
                  className={`btn`}
                  onClick={loadClick}
                >
                  LOAD MORE
                </button>
                <button
                  style={{ display: `${load == data.length ? "" : "none"}` }}
                  className={`btn`}
                  onClick={loadClick2}
                >
                  Less
                </button>
              </div>
            </div>
          </Col>
          <Col>
            <div className="left-box">
              <div
                className="left-box1"
                style={{ display: `${activeclass ? "none" : ""}` }}
              >
                <p>Please select a character to see information</p>
                <img src={skeleton} alt="" />
              </div>
              {
                <div
                  className="left-box2"
                  style={{ display: `${activeclass ? "" : "none"}` }}
                  key={activeInfo?.id}
                >
                  <div className="top">
                    <img
                      src={`${activeInfo.thumbnail?.path}.${activeInfo.thumbnail?.extension}`}
                      alt=""
                    />
                    <div className="top-text">
                      <h2>{activeInfo.name}</h2>
                      <div className="buttons">
                        <Link to={`/Homepage/${activeInfo?.id}`}>
                          <button
                            style={{
                              backgroundColor: " #9F0013",
                              padding: " 11px 18px",
                            }}
                          >
                            HOMEPAGE
                          </button>
                        </Link>

                        <button
                          style={{
                            backgroundColor: "#5C5C5C",
                            padding: " 11px 37px",
                          }}
                        >
                          WIKI
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="center" >
                    <p>{activeInfo.description}</p>
                    <h3>Comics:</h3>
                    {activeInfo.comics?.items?.map((item) => (
                      <p className="box" key={item.id}>
                        {item.name}
                      </p>
                    ))}
                  </div>
                </div>
              }
              <div
                className="left-box3"
                style={{ display: `${activeclass ? "" : "none"}` }}
              >
                <h5>Or find a character by name:</h5>
                <input
                  placeholder="Enter name"
                  type="text"
                  onClick={(e) => setName(e.target.value)}
                />
                <button onClick={handleFind}>FIND</button>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Home;
