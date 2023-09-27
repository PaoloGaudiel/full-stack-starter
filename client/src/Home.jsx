import { Helmet } from 'react-helmet-async';
import { useStaticContext } from './StaticContext';

import Item from './Item';

function Home() {
  const staticContext = useStaticContext();
  return (
    <>
      <Helmet>
        <title>Home - {staticContext?.env?.VITE_SITE_TITLE ?? ''}</title>
      </Helmet>
      <main className="container">
        <h1>Home</h1>
        <p>Heyyo</p>
        <Item title="Title 1"/>
        <Item title="Title 2"/>
        <Item title="Title 3"/>
        <Item title="Title 4"/>
      </main>
    </>
  );
}

export default Home;
