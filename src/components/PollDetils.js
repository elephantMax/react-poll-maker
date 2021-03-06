import { Link, useHistory, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPollById, removePoll, setPoll, vote } from '../store/slices/pollSlice';
import { useEffect, useMemo, useState } from 'react';
import useDateDifference from '../hooks/useDateDifference';
import Loader from './Loader';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import Dropdown from './Dropdown';
import Modal from './Modal';

const PollDetails = () => {
  const { poll, pollLoading } = useSelector((state) => state.poll)
  const { user } = useSelector(state => state.user)
  const dispatch = useDispatch()
  const [selectedOption, setSelectedOption] = useState()
  const [hasError, setHasError] = useState(false)
  const [voteLoading, setVoteLoading] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { id } = useParams()
  const history = useHistory()
  const { setError, formState: { errors } } = useForm()
  const page = useRef()
  const dropdown = useRef()

  const modalData = {
    header: 'Embed Poll',
    content: () => (
      <>
        <p className="subtitle">
          Use the code below to embed this poll on any website.
        </p>
        <p className="subtitle">
          The height and width of the widget were calculated automatically. If necessary, you can change the width and height in the code according to your needs.
        </p>
        <textarea className="embed-textarea" readOnly value={`<iframe width="620" height="572" src="http://localhost:3000/embed/${id}" style="width: 100%; height: 572px;" frameborder="0" allowfullscreen></iframe>`}>
        </textarea>
      </>
    ),
    buttons: [
      {
        id: 1,
        text: 'close',
        classList: ['btn', 'btn-white'],
        onClick: () => {
          setShowModal(false)
        }
      }
    ]
  }

  const session_id = localStorage.getItem('session_id')

  const canDelete = useMemo(() => {
    if (!poll) {
      return false
    }
    if (user && user.uid === poll.user_id) {
      return true
    } else if (session_id === poll?.session_id) {
      return true
    }
    return false
  }, [poll, user, session_id])

  const items = useMemo(() => {
    const list = [{
      id: 1,
      text: 'Embed',
      handler: () => {
        setShowModal(true)
      }
    }]
    if (canDelete) {
      list.push({
        id: 2,
        text: 'Delete',
        handler: async () => {
          try {
            const data = await dispatch(removePoll(id))
            if (data.error) {
              throw new Error(data.error.message)
            }
            history.push('/discover')
          } catch (error) {
            console.log(error);
          }
        }
      })
    }
    return list
  }, [canDelete, dispatch, history, id])

  const submitHandler = async (e) => {
    e.preventDefault()
    if (selectedOption) {
      try {
        setVoteLoading(true)
        const data = await dispatch(vote({ poll, optionId: selectedOption }))
        if (data.error) {
          throw new Error(data.error.message)
        }
        history.push(`/success/${id}`)
      } catch {
        setHasError(true)
      } finally {
        setVoteLoading(false)
      }

    } else {
      setError('options')
    }
  }

  const toggleDropDown = (e) => {
    e.stopPropagation()
    dropdown.current.classList.toggle('open')
  }

  const closeDropDown = () => {
    dropdown.current.classList.remove('open')
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

  return (
    <>
      <div className="page" ref={page} onClick={closeDropDown}>
        {pollLoading && <Loader />}
        {poll && (
          <>
            <div className="page-header">
              <h2 className="title">
                {poll.title}
              </h2>
              <p className="subtitle">
                by {poll.user ? <Link className="link" to={`/profile/${poll.user_id}`}>{poll.user}</Link> : <span className="subtitle">guest</span>} ?? {dateDifference} days ago
              </p>
              <Dropdown items={items} name={dropdown} toggleDropDown={toggleDropDown} />
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
                  <Link className="btn btn-dark" to={`/results/${id}`}>
                    Results
                  </Link>
                </div>
              </form>
            </div>

            <Modal visible={showModal} close={() => setShowModal(false)} data={modalData} />
          </>
        )}
        {!poll && !pollLoading && <p className="subtitle">??????????</p>}
        {voteLoading && <p className="subtitle">??????????????????</p>}
      </div>
    </>
  );
}

export default PollDetails;