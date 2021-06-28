import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchPolls } from '../store/slices/pollSlice'
import { useEffect, useMemo } from 'react'
import PollsList from './PollsList'
import getTotalVotes from '../plugins/getTotalVotes'

const Discover = () => {
    const polls = useSelector((state) => state.poll.polls)
    const loading = useSelector((state) => state.poll.loading)
    const dispatch = useDispatch()

    const trandingPolls = useMemo(() => {
        if(polls) {
            const pollsWithTotal = [...polls].map(poll => ({
                ...poll,
                total: getTotalVotes(poll)
            }))
            return pollsWithTotal.sort((a, b) => a.total < b.total ? 1 : -1)
        }
    }, [polls])


    useEffect(() => {
        dispatch(fetchPolls())
    }, [dispatch])

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
                    {!loading ? <PollsList polls={trandingPolls} /> : <p className="subtitle">Загрузка</p>}
                </div>
                <div className="polls__right">
                    <h3 className="title">
                        New Polls
                    </h3>
                    {!loading ? <PollsList polls={polls} /> : <p className="subtitle">Загрузка</p>}
                </div>
            </div>
        </div>
    );
}

export default Discover;