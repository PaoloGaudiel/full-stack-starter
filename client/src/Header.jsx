import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import classNames from 'classnames';

import './Header.scss';
import Api from './Api';
import { useAuthContext } from './AuthContext';

function Header() {
  const navigate = useNavigate();
  const { user, setUser } = useAuthContext();
  const [isNavbarShowing, setNavbarShowing] = useState(false);

  useEffect(
    function () {
      Api.users.me().then((response) => {
        if (response.status === 204) {
          setUser(null);
        } else {
          setUser(response.data);
        }
      });
    },
    [setUser]
  );

  async function onLogout(event) {
    event.preventDefault();
    await Api.auth.logout();
    setUser(null);
    hideNavbar();
    navigate('/');
  }

  function toggleNavbar() {
    setNavbarShowing(!isNavbarShowing);
  }

  function hideNavbar() {
    setNavbarShowing(false);
  }

//   return (
//     <div className="topnav-container">
//     <div className="topnav">
//         <div className="topnav-item card-item-span-6">
//             <a>K-pop Database</a>
//         </div>
//         <div className="topnav-item burger-item" id="burger">
//             <i className="fa-solid fa-burger"></i>
//         </div>
//         <div className="topnav-item card-item-span-1" id="homebutton">
//             <a>Home</a>
//         </div>
//         <div className="topnav-item card-item-span-1" id="aboutbutton">
//             <a>About</a>
//         </div>
//         <div className="topnav-item card-item-span-1" id="popularbutton">
//             <a>Popular</a>
//         </div>
//         <div className="topnav-item card-item-span-1" id="searchsection">
//             <i className="fa-solid fa-magnifying-glass"></i>
//             <form className="form-inline">
//                 <input
//                   id="searchbar"
//                   className="search-bar"
//                   type="text"
//                   placeholder="Search by Name or Group"
//                   onfocus="this.placeholder = ''"
//                   onblur="this.placeholder = 'Search by Name or Group'"
//                   aria-label="Search"
//                   autocomplete="off"
//                   onkeyup="searchFunction()"
//                 />
//               </form>
//         </div>
//     </div>
// </div>
//   );

  return (
    <nav className="header navbar navbar-expand-md navbar-light bg-light fixed-top">
      <div className="container">
        <Link className="navbar-brand" to="/" onClick={hideNavbar}>
          Full Stack Starter
        </Link>
        <button onClick={toggleNavbar} className="navbar-toggler" type="button" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className={classNames('collapse navbar-collapse', { show: isNavbarShowing })}>
          <ul className="navbar-nav flex-grow-1 mb-2 mb-md-0">
            <li className="nav-item active">
              <Link className="nav-link" aria-current="page" to="/" onClick={hideNavbar}>
                Home
              </Link>
            </li>
            <div className="flex-grow-1 d-flex justify-content-end">
              {user && (
                <>
                  {user.isAdmin && (
                    <li className="nav-item">
                      <Link className="nav-link" to="/admin" onClick={hideNavbar}>
                        Admin
                      </Link>
                    </li>
                  )}
                  <li className="nav-item me-3">
                    <span className="nav-link d-inline-block me-1">
                      Hello,{' '}
                      <Link to="/account" onClick={hideNavbar}>
                        {user.firstName}!
                      </Link>
                    </span>
                    {user.pictureUrl && <div className="header__picture" style={{ backgroundImage: `url(${user.pictureUrl})` }}></div>}
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="/logout" onClick={onLogout}>
                      Log out
                    </a>
                  </li>
                </>
              )}
              {!user && (
                <li className="nav-item">
                  <Link className="nav-link" to="/login" onClick={hideNavbar}>
                    Log in
                  </Link>
                </li>
              )}
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
