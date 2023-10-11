import { Link } from 'react-router-dom';

function Item( {id, fields} ) {
  return (
    <div className="idol-card">
            <div className="idol-card-id idol-card-item card-item-span-2">
                <div className="idol-card-photo">
                    <img className="idol-photo" src={fields.Portrait[0].url} alt={fields["Legal Name"]}/>
                </div>
                <Link to={`./detail/${id}`}>
                  <div className="idol-card-name">
                    <h1 className="idol-name">{fields["Stage Name"]}</h1>
                    <h2 className="idol-group">{fields["Group Name"]}</h2>
                  </div>
                </Link>
            </div>
            <div className="idol-card-facts idol-card-item card-item-span-2">
                <h2>Info</h2>
                <ul className="fact-list">
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Birth Name</h4>
                        <p>{fields["Legal Name"]}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Nationality</h4>
                        <p>{fields["Nationality"]}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Birthday</h4>
                        <p>{fields["Birthday"]}</p>
                    </li>
                  </ul>
            </div>
            <div className="idol-card-facts idol-card-item card-item-span-2">
                <h2>Fun Facts</h2>
                <ul className="fact-list">
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Height</h4>
                        <p>{fields["Height"]}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">MBTI</h4>
                        <p>{fields["MBTI"]}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Representative Emoji</h4>
                        <p>{fields["Representative Emoji"]}</p>
                    </li>
                  </ul>
            </div>
  </div>);
}

export default Item;
/* Because you can have many functions in here,
 you need to designate a default function that will be exported. */
