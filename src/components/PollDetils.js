import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPollById, setPoll, setVoteLoading, vote } from '../store/slices/pollSlice';
import { useEffect, useState } from 'react';
import useDateDifference from '../hooks/useDateDifference';
import Loader from './Loader';
import { useForm } from 'react-hook-form';

const PollDetails = () => {
    const { poll, pollLoading, voteLoading, hasDuplicationError } = useSelector((state) => state.poll)
    const dispatch = useDispatch()
    const [selectedOption, setSelectedOption] = useState()
    const { id } = useParams()
    const history = useHistory()
    const { setError, formState: { errors } } = useForm()

    

    const submitHandler = (e) => {
        e.preventDefault()
        if (selectedOption) {
            dispatch(vote({ poll, optionId: selectedOption }))
        } else {
            setError('options')
        }
    }

    const dateDifference = useDateDifference(poll)

    useEffect(() => {
        if (poll) {
            if (poll.id !== +id) {
                dispatch(setPoll(null))
                dispatch(fetchPollById(id))
            }
        } else dispatch(fetchPollById(id))
    }, [dispatch, id, poll])

    useEffect(() => {
        if (voteLoading === false && !hasDuplicationError) {
            dispatch(setVoteLoading(null))
            history.push(`/success/${id}`)
        }
    }, [voteLoading, id, dispatch, history, hasDuplicationError])

    return (
        <>
            <div className="page">
                {pollLoading && <Loader />}
                {poll && (
                    <>
                        <div className="page-header">
                            <h2 className="title">
                                {poll.title}
                            </h2>
                            <p className="subtitle">
                                by {poll.user ? <Link className="link" to={`/profile/${poll.user_id}`}>{poll.user}</Link> : <span className="subtitle">guest</span>} · {dateDifference} days ago
                            </p>
                        </div>

                        <div className="pollDetails__body">
                            <p className="subtitle">
                                Choose one answer:
                            </p>
                            <form className="form-answer" onSubmit={submitHandler}>
                                {poll.options.map(option =>
                                    <div className="form-answer__option" key={option.id}>
                                        <input className="form-answer__input" type="radio" checked={selectedOption === option.id} onChange={() => setSelectedOption(option.id)} id={option.id} name="answer" />
                                        <label className="form-answer__label" htmlFor={option.id}>
                                            {option.text}
                                        </label>
                                    </div>)}
                                {(errors.options && !voteLoading) && <span className="form__error">Choose one of this answers</span>}
                                {(hasDuplicationError && !voteLoading) && <span className="form__error">You cannot vote twice</span>}
                                <div className="form-answer__actions">
                                    <button className="btn btn-green">Vote</button>
                                    <Link className="btn btn-dark" to={`/results/${id}`}>
                                        Results
                                    </Link>
                                </div>
                            </form>
                        </div>
                    </>
                )}
                {!poll && !pollLoading && <p className="subtitle">Пусто</p>}
                {voteLoading && <p className="subtitle">Обработка</p>}
            </div>
        </>
    );
}

export default PollDetails;