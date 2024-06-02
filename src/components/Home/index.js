import Footer from "../Footer";
import BookCard from "../BookCard";
import Body from "../Body";
import Navbar from "../Navbar";
import React, { useEffect, useState } from "react";
import DividerText from "../DividerText";
import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";

const home = () => {
  const [dataBooks, setDataBooks] = useState(null);
  const data = async () => {
    let response = await axios.get(
      "http://localhost/land-of-books/backend/page/get/getBooksAll.php"
    );
    setDataBooks(response.data.data);
    console.log(response.data.data);
  };
  useEffect(() => {
    data();
  }, []);

  return (
    <>
      <Navbar />
      <Body />
      <DividerText />
      <Grid templateColumns="repeat(4, 1fr)" gap={6}>
        {dataBooks &&
          dataBooks.map((book, key) => {
            return (
              <BookCard
                key={key}
                title={book.books_name}
                author={book.users_name}
                points={book.point}
                bookImage={book.book_image}
                publisher={book.publisher}

              />
            );
          })}{" "}
      </Grid>

      <Footer />
    </>
  );
};

export default home;
