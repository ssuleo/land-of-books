import { useEffect, useState } from "react";
import { getCookie } from "../../components/Token";
import { Accordion } from "@chakra-ui/react";
import OffersItem from "../../components/OffersItem";

function MyOffersComp() {
  const [data, setData] = useState([]);

  const searchGet = async () => {
    const response = await fetch(
      `http://localhost/land-of-books/backend/page/get/getOffer.php?authToken=${getCookie(
        "authToken"
      )}`
    );
    const data = await response.json();
    console.log(data);
    setData(data.data);
  };

  useEffect(() => {
    searchGet();
  }, []);

  return (
    <>
      <Accordion allowMultiple>
        {data
          ? data.map((offer) => (
              <OffersItem
                key={offer.idoffers}
                initialOffer={offer}
                userId={11}
              />
            ))
          : null}
      </Accordion>
    </>
  );
}

export default MyOffersComp;
