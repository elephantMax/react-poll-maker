import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'
import getTotalVotes from '../plugins/getTotalVotes';
import { fetchPollById } from '../store/slices/pollSlice';
import StatsOption from './StatsOption';
import randomColor from 'randomcolor';
import Loader from './Loader';


const EmbedResults = () => {
    const { id } = useParams()
    const [totalVotes, setTotalVotes] = useState(0)
    const { poll } = useSelector((state) => state.poll)
    const sortedOptions = useMemo(() => {
        if (poll) {
            const options = [...poll.options].map(option => ({
                ...option,
                color: randomColor(),
            }))
            return [].concat(options)
                .sort((a, b) => (a.votes?.length || 0) < (b.votes?.length || 0) ? 1 : -1)
        }
        return []
    }, [poll])

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPollById(id))
    }, [dispatch, id])



    useEffect(() => {
        if (poll) {
            setTotalVotes(getTotalVotes(poll))
        }
    }, [poll])

    const clickHandler = () => {
        dispatch(fetchPollById(id))
    }

    return (
        <div className="results page">
            <>
                {poll ? (
                    <>
                        <div className="page-header">
                            <h2 className="title">
                                {poll.title}
                            </h2>
                        </div>
                        <div className="results__body">
                            <div className="stats">
                                <div className="stats__options">
                                    {sortedOptions.map(option => <StatsOption key={option.id} option={option} totalVotes={totalVotes}></StatsOption>)}
                                </div>
                            </div>
                            <h2 className="title">Total: {totalVotes}</h2>

                        </div>
                    </>
                ) : <Loader />}
            </>
            <div className="page-footer">
                <button className="btn btn-green" onClick={clickHandler}>
                    Refresh Results
                </button>
                <a className="btn btn-dark" target="_blank" rel="noreferrer" href={`http://localhost:3000/poll/${id}`}>Open Poll</a>
            </div>
        </div>
    );
}

export default EmbedResults;