import { Link } from 'react-router-dom'
import getTotalVotes from '../plugins/getTotalVotes'
import getDate from '../plugins/getDate'
import { useMemo } from 'react'

const Poll = ({poll}) => {
    const countVotes = useMemo(() => getTotalVotes(poll), [poll])
    const date = useMemo(() => getDate(poll.id), [poll])
    return (
        <div className="poll">
            <div className="poll__stats">
                <span className="poll__counter">{countVotes}</span>
                <img className="poll__image" src="https://strawpoll.com/images/strawpoll/strawpoll-logo.png" alt="poll" />
            </div>
            <div className="poll__info">
                <Link className="poll__title link" to={`/poll/${poll.id}`} >
                    {poll.title}
                </Link>
                <p className="poll__date">
                    Started on {date.day} {date.month} {date.year} {date.hours}:{date.minutes}
                </p>
            </div>
        </div>
    );
}

export default Poll;