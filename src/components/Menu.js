import { NavLink } from 'react-router-dom'

const Menu = () => {
    return (
        <nav className="menu">
            <NavLink className="menu__link" to="/create" activeClassName="menu__link--active">
                Create
            </NavLink>
            <NavLink className="menu__link" to="/discover" activeClassName="menu__link--active">
                Discover
            </NavLink>
        </nav>
    );
}

export default Menu;