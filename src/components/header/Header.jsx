import { useState, useEffect } from 'react'
import { HiOutlineSearch } from 'react-icons/hi'
import { SlMenu } from 'react-icons/sl'
import { VscChromeClose } from 'react-icons/vsc'
import { useNavigate, useLocation } from 'react-router-dom'

import './Header.scss'
import ContentWrapper from '../contentWrapper/ContentWrapper'
import Logo from '../../assets/movix-logo.svg'
function Header() {
  const [show, setShow] = useState('top')
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenu, setMobileMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [showSearch, setShowSearch] = useState("");
  const navigate = useNavigate();
  const location = useLocation();


  //When visiting new page it will scroll on top
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const controlNavbar = () => {
    if (window.scrollY > 200) {
      if (window.scrollY > lastScrollY && !mobileMenu) {
        setShow("hide");
      } else {
        setShow("show");
      }
    } else {
      setShow("top");
    }
    setLastScrollY(window.scrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", controlNavbar);
    return () => {
      window.removeEventListener("scroll", controlNavbar);
    };
  }, [lastScrollY]);

  // Handle Search Bar Menu at Mobile view 
  const openSearch = () => {
    setShowSearch(true);
    setMobileMenu(false)
  }
  // Handle Menu options on mobile 
  const openMobileMenu = () => {
    setShowSearch(false);
    setMobileMenu(true)
  }

  const searchQueryHandler = (e) => {
    if (e.key === "Enter" && query.length > 0) {
      navigate(`/search/${query}`);
      setTimeout(() => {
        setShowSearch(false);
      }, 1000);
    }
  };

  const navigationHandler = (type) => {
    if (type === "movie") {
      navigate('/explore/movie')
    }
    else {
      navigate("/explore/tv")
    }
  }
  return (
    <header className={`header ${mobileMenu ? 'mobileView' : ""} ${show}`}>
      <ContentWrapper>
        <div className="logo">
          <img src={Logo} alt="" />
        </div>
        <ul className="menuItems">
          <li className="menuItem" onClick={() => navigationHandler("movie")}>Movies</li>
          <li className="menuItem" onClick={() => navigationHandler("tv")}>TV shows</li>
          <li className="menuItem"><HiOutlineSearch onClick={openSearch} /></li>
        </ul>

        {/* Mobile View  */}
        <div className="mobileMenuItems">
          <HiOutlineSearch onClick={openSearch} />
          {mobileMenu ? <VscChromeClose onClick={() => setMobileMenu(false)} /> : <SlMenu onClick={openMobileMenu} />}
        </div>
      </ContentWrapper>

      {showSearch && <div className="searchBar">
        <ContentWrapper>
          <div className="searchInput">
            <input
              type="text"
              placeholder="Search for movie or TV show...."
              onChange={(e) => setQuery(e.target.value)}
              onKeyUp={searchQueryHandler}
            />
            <VscChromeClose onClick={() => setShowSearch(false)} />
          </div>
        </ContentWrapper>
      </div>}
    </header >
  )
}

export default Header