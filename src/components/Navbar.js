import { useSelector } from 'react-redux';
import { useRef } from 'react';
import NavbarLinks from './NavbarLinks';
import NavbarActions from './NavbarActions';
import Menu from './Menu';

const Navbar = () => {
  const { user } = useSelector((state) => state.user)
  const mobileMenu = useRef()

  const toggleMenu = () => {
    mobileMenu.current.classList.toggle('open')
  }

  return (
    <header className="navbar">
      <NavbarLinks />
      <NavbarActions user={user} />
      <div className="mobile-menu" ref={mobileMenu}>
        <Menu />
        <NavbarActions user={user} />
      </div>
      <div className="menu-toggler" onClick={toggleMenu}>
        <span className="menu-toggler__stick"></span>
        <span className="menu-toggler__stick"></span>
        <span className="menu-toggler__stick"></span>
      </div>
    </header >
  );
}

export default Navbar;