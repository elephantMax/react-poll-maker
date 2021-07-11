import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPollById, setPoll, vote } from '../store/slices/pollSlice';
import { useEffect, useState } from 'react';
import Loader from './Loader';
import { useForm } from 'react-hook-form';


const EmbedDetails = () => {
    const { poll, pollLoading } = useSelector((state) => state.poll)
    const dispatch = useDispatch()

    const [selectedOption, setSelectedOption] = useState()
    const [hasError, setHasError] = useState(false)
    const [voteLoading, setVoteLoading] = useState(false)
    const { id } = useParams()
    useEffect(() => {
        dispatch(fetchPollById(id))
    }, [id])
    const history = useHistory()
    const { setError, formState: { errors } } = useForm()

    const submitHandler = async (e) => {
        e.preventDefault()
        if (selectedOption) {
            try {
                setVoteLoading(true)
                const data = await dispatch(vote({ poll, optionId: selectedOption }))
                if ('error' in data) {
                    throw new Error(data.error.message)
                }
                console.log(id);
                history.push(`/embed-results/${id}`)
            } catch {
                setHasError(true)
            } finally {
                setVoteLoading(false)
            }

        } else {
            setError('options')
        }
    }

    useEffect(() => {
        if (poll) {
            if (poll.id !== +id) {
                dispatch(setPoll(null))
                dispatch(fetchPollById(id))
            }
        } else dispatch(fetchPollById(id))
    }, [dispatch, id, poll])

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
                                {(hasError && !voteLoading) && <span className="form__error">You cannot vote twice</span>}
                                <div className="form-answer__actions">
                                    <button className="btn btn-green">Vote</button>
                                    <Link className="btn btn-dark" to={`/embed-results/${id}`}>
                                        Show Results
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

export default EmbedDetails;