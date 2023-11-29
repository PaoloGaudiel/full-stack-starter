import { Link } from 'react-router-dom';
import { useAuthContext } from './AuthContext';

function Item( {id, fields} ) {
    const { user } = useAuthContext();
  return (
    <div className="idol-card">
            <div className="idol-card-id idol-card-item card-item-span-2">
                <div className="idol-card-photo">
                    <img className="idol-photo" src={fields.portraitUrl} alt={fields["Legal Name"]}/>
                </div>
                <Link to={`./idols/${id}`}>
                  <div className="idol-card-name">
                    <h1 className="idol-name">{fields.stageName}</h1>
                    <h2 className="idol-group">{fields.groupName}</h2>
                  </div>
                </Link>
                {user && <Link to={`/idols/${id}/edit`}>Edit</Link>}
            </div>
            <div className="idol-card-facts idol-card-item card-item-span-2">
                <h2>Info</h2>
                <ul className="fact-list">
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Birth Name</h4>
                        <p>{fields.legalName}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Nationality</h4>
                        <p>{fields.nationality}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Birthday</h4>
                        <p>{fields.birthday}</p>
                    </li>
                  </ul>
            </div>
            <div className="idol-card-facts idol-card-item card-item-span-2">
                <h2>Fun Facts</h2>
                <ul className="fact-list">
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Height</h4>
                        <p>{fields.height}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">MBTI</h4>
                        <p>{fields.mbti}</p>
                    </li>
                    <li className="fact-list-item">
                        <h4 className="list-subtitle">Representative Emoji</h4>
                        <p>{fields.repEmoji}</p>
                    </li>
                  </ul>
            </div>
  </div>);
}

export default Item;
/* Because you can have many functions in here,
 you need to designate a default function that will be exported. */
