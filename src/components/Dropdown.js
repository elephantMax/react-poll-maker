const Dropdown = ({toggleDropDown, clickHandler, canDelete, refName, createEmbedded}) => {
    return (
        <div className="page-header__dropdown dropdown" ref={refName} onClick={toggleDropDown} >
            <div className="dropdown__btn">
                <span className="dropdown__dot"></span>
                <span className="dropdown__dot"></span>
                <span className="dropdown__dot"></span>
            </div>
            <ul className="dropdown__items">
                <li className="dropdown__item" onClick={createEmbedded}>
                    Embed
                </li>
                {canDelete && <li className="dropdown__item" onClick={clickHandler}>
                    Remove
                </li>}
            </ul>
        </div>
    );
}

export default Dropdown;