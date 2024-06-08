import { Box, Accordion } from "@chakra-ui/react";
import OffersItem from "./OffersItem";
import { useEffect, useState } from "react";
import axios from "axios";
import { getCookie } from "./Token";

function Offers() {
  const [offersData, setOffers] = useState([]);
  const [userId, setUserId] = useState(null);

  const getOffer = async () => {
    const response = await axios.get(
      "http://localhost/land-of-devices/backend/page/get/getOffer.php?authToken=" +
        getCookie("authToken")
    );
    console.log(response.data);
    if (response.data.status) {
      setOffers(response.data.data);
      setUserId(response.data.userId);
    }
  };

  useEffect(() => {
    getOffer();
  }, []);

  return (
    <Box p={5} w="50%" ml="10px" paddingTop="40px">
      <Accordion allowMultiple>
        {offersData.map((offer) => (
          <OffersItem
            key={offer.idoffers}
            initialOffer={offer}
            userId={userId}
          />
        ))}
      </Accordion>
    </Box>
  );
}

export default Offers;
