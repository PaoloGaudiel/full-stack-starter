import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import { useAuthContext } from './AuthContext';

import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Item from './Item';


function Home() {
  // const url = 'https://api.airtable.com/v0/appUxSybGA38lbH30/Idols';
  // const token = 'pat8JUooC1dwj8jXu.7165b80ece482ca97838855878749eb5c73c1510cf78a7591cad4db1fe123606';
  
  const { user } = useAuthContext();
  const [data, setData] = useState();

  useEffect(() => {
    // fetch(url, {
    //   headers: { Authorization: `Bearer ${token}`}
    // })
    fetch('/api/idols')
      .then((response) => response.json())
      .then((data) => setData(data))
  }, []);

  console.log(data);

  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">

      

        <div className="about main-card" id="about">
          <div className="card-item card-item-span-2">
            <h1>About</h1>
          </div>
          <div className="card-item card-item-span-4">
            <p>
              This K-POP Database was created because the K-POP profile lists
              and databases that are in current circulation focus more on the
              output of information rather than user experience.
            </p>
            <p>
              This site is meant to focus more on the user experience and decrease
              information overload to allow users more easily navigate an
              idol repository.
            </p>
            <p>
              Hopefully, this can bridge the gap in user accessibility and increase
              K-POP fanbase engagement all around the world!
            </p>
          </div>
        </div>

        {user && <div><Link to='/idols/new'>Create a new Idol</Link></div>}

        <div className="popular main-card" id="popular">
          <div className="card-item card-item-span-6">
            <h1>Popular Groups</h1>
          </div>

        </div>

        <div className="girlgroup main-card" id="girlgroup">
          <div className="card-item card-item-span-6">
            <h1>Girl Groups</h1>
          </div>
          <div className="card-item card-item-span-2">
            <h2>BLACKPINK</h2>
          </div>
          <div className="card-item card-item-span-2">
            <h2>TWICE</h2>
          </div>
          <div className="card-item card-item-span-2">
            <h2>NewJeans</h2>
          </div>
        </div>

        <div className="boygroup main-card" id="boygroup">
          <div className="card-item card-item-span-6">
            <h1>Boy Groups</h1>
          </div>
          <div className="card-item card-item-span-3">
            <h2>BTS</h2>
          </div>
        </div>

        <div className="idol-display main-card" id="idoldisplay">
          
          {data?.map((record) =>
            <Item
              key = {record.id}
              id = {record.id}
              fields = {record}
            ></Item>)}
        </div>


      </main>
    </>
  );
}

export default Home;
