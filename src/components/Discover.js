import { Link } from 'react-router-dom'

const Discover = () => {
    return (
        <div className="page">
            <h2 className="title">Discover Interesting Polls</h2>
            <p className="subtitle">
                If you're interested in finding new polls, opinions and thoughts from others, feel free to explore this page.
            </p>
            <div className="polls">
                <div className="polls__left">
                    <h3 className="title">
                        Trending Polls
                    </h3>
                    <div className="polls__list">
                        <div className="poll">
                            <div className="poll__stats">
                                <span className="poll__counter">1000</span>
                                <img className="poll__image" src="https://strawpoll.com/images/strawpoll/strawpoll-logo.png" />
                            </div>
                            <div className="poll__info">
                                <Link className="poll__title link" to="/poll" >
                                    What are you most excited for?
                                </Link>
                                <p className="poll__date">
                                    Started on 14 June 2021 13:53.
                                </p>
                            </div>
                        </div>
                        <div className="poll">
                            <div className="poll__stats">
                                <span className="poll__counter">1000</span>
                                <img className="poll__image" src="https://strawpoll.com/images/strawpoll/strawpoll-logo.png" />
                            </div>
                            <div className="poll__info">
                                <Link className="poll__title" to="/poll" >
                                    What are you most excited for?
                                </Link>
                                <p className="poll__date">
                                    Started on 14 June 2021 13:53.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="polls__right">
                    <h3 className="title">
                        New Polls
                    </h3>
                    <div className="polls__list">
                        <div className="poll">
                            <div className="poll__stats">
                                <span className="poll__counter">1000</span>
                                <img className="poll__image" src="https://strawpoll.com/images/strawpoll/strawpoll-logo.png" />
                            </div>
                            <div className="poll__info">
                                <Link className="poll__title" to="/poll" >
                                    What are you most excited for?
                                </Link>
                                <p className="poll__date">
                                    Started on 14 June 2021 13:53.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Discover;