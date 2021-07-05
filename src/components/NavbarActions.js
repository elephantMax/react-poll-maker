import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { logout, signIn } from '../store/slices/userSlice';

const NavbarActions = ({user}) => {
    const dispatch = useDispatch()

    const signInHandler = () => {
        dispatch(signIn())
    }

    const logoutHandler = () => {
        dispatch(logout())
    }

    return (
        <div className="navbar__actions">
            {user ? (
                <>
                    <button onClick={logoutHandler} className="btn btn-dark">
                        Log out
                    </button>
                    <Link to={`/profile/${user.uid}`} className="btn btn-blue">
                        {user.displayName}
                    </Link>
                </>
            ) : (
                <>
                    <button className="btn btn-dark">
                        Log in
                    </button>
                    <button onClick={signInHandler} className="btn btn-blue">
                        Sign up
                    </button>
                </>
            )}
        </div>
    );
}

export default NavbarActions;