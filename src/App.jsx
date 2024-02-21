import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container } from "reactstrap";
import Header from "./Components/Header";
import Comics from "./Pages/Comics";
import Homepage from "./Pages/Homepage";
import InComics from "./Pages/inComics";
function App() {
  const [data,setData]=useState([])
  useEffect(() => {
    axios
      .get(
        "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=23f73c6784f2f80d3b29cab33fd30ff7&hash=721beb32bc3e66c06a76db97ae763b92"
      )
      .then((res) => setData(res.data.data.results));
  },[]);
  return (
    <>
    <Container>
      <Header/>
      <Routes>
        <Route path="/" element={<Home data={data} />}   />
        <Route path="/Comics" element={<Comics  data={data} /> }/>
        <Route path="/Homepage/:id" element={<Homepage/>}/>
        <Route path="/InComics/:id" element={<InComics/>}/>
      </Routes>
    </Container>
   
    </>
  );
}

export default App;
