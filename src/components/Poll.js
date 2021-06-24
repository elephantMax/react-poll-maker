import { Link } from 'react-router-dom'

const Poll = ({poll}) => {
    return (
        <div className="poll">
            <div className="poll__stats">
                <span className="poll__counter">1000</span>
                <img className="poll__image" src="https://strawpoll.com/images/strawpoll/strawpoll-logo.png" alt="poll" />
            </div>
            <div className="poll__info">
                <Link className="poll__title link" to={`/poll/${poll.id}`} >
                    {poll.title}
                </Link>
                <p className="poll__date">
                    Started on 14 June 2021 13:53.
                </p>
            </div>
        </div>
    );
}

export default Poll;