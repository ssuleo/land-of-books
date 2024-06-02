import React, { useState } from "react";
import AdminNavbar from "../../components/AdminNavbar"
import Footer from "../../components/Footer"
import NavigationBar from "../../components/NavigationBar"
import { Box, Card, Flex, SimpleGrid, Text, Image } from "@chakra-ui/react";

import { checkAuthAndRedirect } from "../../../utils/PrivateRouter";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getCookie } from "../../components/Token";

export const getServerSideProps = async (ctx) => {
    return checkAuthAndRedirect(ctx);
};
const index = () => {

    const router = useRouter();
    const [data, setData] = useState([])

    // Query string parametrelerini al
    const query = router.query;

    console.log(query)

    const searchGet = async () => {
        const response = await fetch(`http://localhost/land-of-books/backend/page/getSearch.php?search=${query.s}&authToken=${getCookie("authToken")}`);
        const data = await response.json();
        console.log(data);
        setData(data)
    }

    useEffect(() => {

        searchGet()
    }, [router])



    return (
        <>
            <AdminNavbar />
            <Flex minH={"75vh"}>
                <NavigationBar />
                <Box p={10}>
                    <Text fontSize="xl" mb={2}>Kitaplar</Text>
                    {/* Yan yana 3 kitap kartı */}
                    <SimpleGrid columns={4} spacing={4}>
                        {data ? (
                            data.map((book) => (
                                <Card key={book.idbooks} boxShadow="md" borderRadius="md" p={4} onClick={() => router.push("/bookdetail?book="+book.idbooks)}>
                                    <Image
                                        src={"http://localhost/land-of-books/backend/uploads/" + book.book_image}
                                        alt={book.books_name}
                                        borderRadius="md"
                                        mb={2}
                                    />
                                    <Text fontWeight="bold">{book.books_name}</Text>
                                    <Text>Puan: {book.point}</Text>
                                </Card>
                            ))
                        ) : null}
                    </SimpleGrid>
                </Box>
            </Flex>
            <Footer />
        </>
    );
};

export default index;

