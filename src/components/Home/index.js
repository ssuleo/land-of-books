import Footer from "../Footer";
import BookCard from "../BookCard";
import HeroSection from "../HeroSection";
import Navbar from "../Navbar";
import React from "react";

const home = () => {
  return (
    <>
      <Navbar />
      <HeroSection />
      <BookCard/>
      <Footer/>
    </>
  );
};

export default home;
