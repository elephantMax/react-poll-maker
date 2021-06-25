import { useMemo, useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom'
import getTotalVotes from '../plugins/getTotalVotes';
import { fetchPollById } from '../store/slices/pollSlice';
import StatsOption from './StatsOption';
import useDateDifference from '../hooks/useDateDifference';

const Results = () => {
    const { id } = useParams()
    const [totalVotes, setTotalVotes] = useState(0)
    const { poll } = useSelector((state) => state.poll)

    const sortedOptions = useMemo(() => {
        if (poll) {
            return [].concat(poll.options)
                .sort((a, b) => a.votes < b.votes ? 1 : -1)
        }
        return []
    }, [poll])

    const dateDifference = useDateDifference(poll)

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchPollById(id))
    }, [dispatch, id])



    useEffect(() => {
        if (poll) {
            setTotalVotes(getTotalVotes(poll))
        }
    }, [poll])

    return (
        <div className="results page">
            <>
                {poll ? (
                    <>
                        <div className="page-header">
                            <h2 className="title">
                                {poll.title}
                            </h2>
                            <p className="subtitle">
                                by <Link className="link" to="/">BenereV2</Link> · {dateDifference} days ago
                            </p>
                        </div>
                        <div className="results__body">
                            <p className="subtitle">
                                The results after people voted:
                            </p>
                            <div className="stats">
                                <div className="stats__options">
                                    {sortedOptions.map(option => <StatsOption key={option.id} option={option} totalVotes={totalVotes}></StatsOption>)}
                                </div>
                                <div className="diagramm">

                                </div>
                            </div>
                            <h2 className="title">Total: {totalVotes}</h2>

                        </div>
                    </>
                ) : <p>Загрузка</p>}
            </>
            <div className="page-footer">
                <button className="btn btn-green">
                    Refresh Results
                </button>
                <Link className="btn btn-dark" to={`/poll/${id}`}>Back to Poll</Link>
            </div>
        </div>
    );
}

export default Results;