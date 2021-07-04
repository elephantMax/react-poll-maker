import { useSelector, useDispatch } from 'react-redux'
import { fetchPolls } from '../store/slices/pollSlice'
import { useEffect, useMemo } from 'react'
import PollsList from './PollsList'
import getTotalVotes from '../plugins/getTotalVotes'

const Discover = () => {
    const { polls, pollsLoading } = useSelector((state) => state.poll)
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
        if(!polls) {
            dispatch(fetchPolls())
        }
    }, [dispatch, polls])

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
                    {!pollsLoading ? <PollsList polls={trandingPolls} /> : <p className="subtitle">Загрузка</p>}
                </div>
                <div className="polls__right">
                    <h3 className="title">
                        New Polls
                    </h3>
                    {!pollsLoading ? <PollsList polls={polls} /> : <p className="subtitle">Загрузка</p>}
                </div>
            </div>
        </div>
    );
}

export default Discover;