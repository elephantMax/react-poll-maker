const Dropdown = ({ items, name, toggleDropDown }) => {
    return (
        <div className="page-header__dropdown dropdown" ref={name} onClick={toggleDropDown}>
            <div className="dropdown__btn">
                <span className="dropdown__dot"></span>
                <span className="dropdown__dot"></span>
                <span className="dropdown__dot"></span>
            </div>
            <ul className="dropdown__items">
                {items && items.map(item =>
                    <li className="dropdown__item" key={item.id} onClick={item.handler}>
                        {item.text}
                    </li>)}
            </ul>
        </div>
    );
}

export default Dropdown;