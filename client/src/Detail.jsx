import Item from "./Item";

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function Detail() {

  const { id } = useParams();
  const [data, setData] = useState();
  useEffect(() => {
   
    fetch(`/api/idols/${id}`)
      .then((response) => response.json())
      .then((data) => setData(data));
  },[id]);

  console.log(data);

  return (
    <main className="container">
      {data && <Item
        key = {data.id}
        id = {data.id}
        fields = {data}
        ></Item>} 
        {/* In JavaScript, we include "truthy" or "falsy" */}
    </main>
  );
}

export default Detail;