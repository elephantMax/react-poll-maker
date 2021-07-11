import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">Page not found</h2>
            </div>
            <div className="page-body">
                <img className="main__image" src="https://strawpoll.com/images/strawpoll/error-404.png" alt="" />
                <p className="subtitle">
                    Are you sure you typed this link in correctly?
                    If you followed a link to this address, please let us know!
                </p>
                <Link className="btn btn-green btn-big" to="/">Go to the start page</Link>
            </div>
        </div>
    );
}

export default NotFound;