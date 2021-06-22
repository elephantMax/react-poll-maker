import { Link } from 'react-router-dom'

const Main = () => {
    return (
        <div className="main">
            <h2 className="title">Create a <span className="text-red">Straw Poll</span> in Seconds</h2>
            <p className="subtitle">
                Simple. Fast. Free.
            </p>
            <img className="main__image" src="https://strawpoll.com/images/strawpoll/poll-image.png" alt="" />
            <Link className="btn btn-green btn-big" to="/create">Create a Poll</Link>
        </div>
    );
}

export default Main;