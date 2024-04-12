import Footer from "../Footer";
import BookCard from "../BookCard";
import Body from "../Body";
import Navbar from "../Navbar";
import React from "react";

const home = () => {
  return (
    <>
      <Navbar />
      <Body />
      <BookCard/>
      <Footer/>
    </>
  );
};

export default home;
