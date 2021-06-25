import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { logout, signIn } from '../store/slices/userSlice';

const Navbar = () => {
    const { user } = useSelector((state) => state.user)
    const dispatch = useDispatch()

    const signInHandler = () => {
        dispatch(signIn())
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <header className="navbar">
            <div className="navbar__left">
                <Link to="/" className="logo">
                    <svg className="logo__img" xmlns="http://www.w3.org/2000/svg" width="138.8" height="28" viewBox="0 0 1735 350"><title>StrawPoll</title> <path fill="#f80" d="M175,0V175.35l-1.05-.7L99.75,17.15C110.573,6.824,152.2.036,175,0Z"></path> <path fill="#ffbc16" d="M100.1,16.45c4.176,3.3,15.518,31.98,18.55,38.85l39.55,84L175,175.35,11.9,111.3c1.525-7.659,6.563-15.255,10.15-21.35,13.709-23.292,29.869-42.8,51.45-58.1C81.826,25.946,91.287,22.073,100.1,16.45Z"></path> <path fill="#ab62ce" d="M11.9,110.95L175,175c-2.032,6.883-19.051,23.209-24.15,29.75L89.6,279.3,70.35,302.75c-1.593,2.056-4.838,7.987-7,7-9.3-4.443-21.152-19.982-27.3-28.35C5.067,239.231-14.153,174.346,11.9,110.95Z"></path> <path fill="#ff755e" d="M174.3,174.65l136.15,111.3-0.7.7c-4.456,9.284-19.986,21.152-28.35,27.3-30.636,22.521-81.053,45.814-137.9,33.6-33.683-7.237-56.979-20.469-80.15-37.45l1.05-1.05Z"></path> <path fill="#3eb991" d="M175,0c84.325-1.624,140.982,55.117,164.5,115.15,10.933,27.909,14.281,74.349,4.55,106.75-7.833,26.081-19.9,45.436-33.95,64.75L175,175V0Z"></path> <path d="M1607,53h46V282h-46V53Zm80,0h46V282h-46V53ZM496,64c30.482-.822,65.779.878,81,16l-16,35c-13.566-5.487-92.115-29.18-75,16,12,31.691,82,22.487,92,83,8.748,52.938-44.495,78.7-98,70-16.18-2.631-29.306-8.088-43-12V228c19.726,4.64,95.682,42.779,95-9-22.118-42.474-92.507-28.087-92-96,0.143-19.178,6.98-32.637,17-42C467.754,70.952,480.916,70.527,496,64Zm764,3c54.69-.911,117.01-6.213,139,26,7.44,10.9,10.05,24.584,10,43-0.15,57.309-43.26,70.924-102,70v76h-47V67ZM650,82v35h46v35H650c-0.411,28.308-5.315,73.63,6,92,13.133,4.354,29.885,2.5,42-2q-0.5,18-1,36c-106.144,20.839-93.291-26.864-92-126H583c-0.365-6.557-1.209-17.653,2-21,20.06-19.658,25.9-13.082,35-48Zm657,23v63c34.11,1.245,75.23-16.678,51-52C1349.65,103.832,1328.25,104.2,1307,105ZM765,282H719V117h35l7,27,2-1c6.387-18.266,34.049-36.257,63-28q-1.5,21.5-3,43h-1C752.617,136.18,764.017,225.638,765,282Zm214,0H947q-4-11.5-8-23c-8.293,6.666-14.487,16.593-25,21-41.383,17.345-76.211-5.215-82-39-10.052-58.667,50.764-63.006,102-62,1.459-48.234-46.4-26.295-72-20q-7.5-15.5-15-31l39-13C999.14,93.011,979.884,189.367,979,282Zm509-168c47.24-.972,74.79,11.782,88,44,23.13,56.419-5.39,114.308-52,125-72.99,16.744-117.31-46.321-98-115C1435.9,132.795,1455.82,127.575,1488,114Zm-497,3h46q10.005,37.5,20,75,4.005,23.5,8,47v-2q3.495-21,7-42,10.005-39,20-78c11.71-.322,44.06-4.287,51,2q11.505,47,23,94,1.995,14.5,4,29c0.81-46.542,20.85-83.672,28-125h45q-23.505,82.491-47,165l-50-1q-14.505-63.494-29-127h-1q-14.505,63.993-29,128h-49v-2Q1014.5,198.508,991,117Zm503,34c-36.57,18.935-34.58,108.985,18,96C1543.49,239.225,1554.58,148.768,1494,151ZM934,206c-32.406-1.52-71.092,9.647-49,41C917.382,257.594,935.208,239.826,934,206Z"></path></svg>
                </Link>
                <nav className="menu">
                    <NavLink className="menu__link" to="/create" activeClassName="menu__link--active">
                        Create
                    </NavLink>
                    <NavLink className="menu__link" to="/discover" activeClassName="menu__link--active">
                        Discover
                    </NavLink>
                </nav>
            </div>
            {user ? (
                <div className="navbar__right">
                    <button onClick={logoutHandler} className="btn btn-dark">
                        Log out
                    </button>
                    <button className="btn btn-blue">
                        {user.displayName}
                    </button>
                </div >
            ) : (
                <div className="navbar__right">
                    <button className="btn btn-dark">
                        Log in
                    </button>
                    <button onClick={signInHandler} className="btn btn-blue">
                        Sign up
                    </button>
                </div >
            )}
        </header >
    );
}

export default Navbar;