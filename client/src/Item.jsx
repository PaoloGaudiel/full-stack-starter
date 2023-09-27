import { Link } from 'react-router-dom';

function Item({title}) {
  return <div className="card mb-3">
    {title} <Link to="./detail">Link</Link>
  </div>;
}

export default Item;
/* Because you can have many functions in here,
 you need to designate a default function that will be exported. */
