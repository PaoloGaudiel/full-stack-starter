import Item from "./Item";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {

  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
    const url = `https://api.airtable.com/v0/appUxSybGA38lbH30/Idols/${id}`;
    const token = 'pat8JUooC1dwj8jXu.7165b80ece482ca97838855878749eb5c73c1510cf78a7591cad4db1fe123606';

    fetch(url, {
      headers: { Authorization: `Bearer ${token}`}
    })
      .then((response) => response.json())
      .then((data) => setData(data));
  },[id]);

  console.log(data?.fields);

  return (
    <main className="container">
      {data && <Item
        key = {data.id}
        id = {data.id}
        fields = {data.fields}
        ></Item>} 
        {/* In JavaScript, we include "truthy" or "falsy" */}
    </main>
  );
}

export default Detail;