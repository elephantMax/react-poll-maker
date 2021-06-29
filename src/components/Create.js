import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createPoll } from "../store/slices/pollSlice";
import Loader from "./Loader";

const Create = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([{ id: 1, text: 'example' }, { id: 2, text: '' }])
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { craeteLoading } = useSelector((state) => state.poll)
    const history = useHistory()

    const updateOption = (value, id) => {
        const updated = options.map(option => {
            if (option.id === id) {
                option.text = value
            }
            return option
        })
        setOptions(updated)
    }

    const focusHandler = (index) => {
        if (index !== options.length - 1) return

        setOptions([...options, { id: Date.now(), text: '' }])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (user) {
            const filteredOptions = options.filter(option => option.text);
            const optionsData = filteredOptions.map(option => (
                {
                    id: option.id,
                    text: option.text,
                    votes: 0
                }
            ))

            const poll = {
                id: Date.now(),
                title,
                description,
                options: optionsData,
                user_id: user.uid
            }
            dispatch(createPoll(poll))
            history.push(`/poll/${poll.id}`)
        }
        //message
    }

    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">
                    Craete a Poll
                </h2>
            </div>
            <>
                {!craeteLoading ? (<form className="form" onSubmit={submitHandler}>
                    <div className="form__group">
                        <label className="form__label">Title</label>
                        <input className="form__input" type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="write your question here..." />
                    </div>
                    <div className="form__group">
                        <label className="form__label">Description</label>
                        <textarea className="form__input" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter an introduction text..."></textarea>
                    </div>
                    <div className="form__group">
                        <label className="form__label">Answer options</label>
                        {options.map((option, index) => <input className="form__input" type="text" key={option.id} value={option.text} onChange={(e) => updateOption(e.target.value, option.id)} onFocus={() => focusHandler(index)} placeholder="Choose answer..." />)}

                    </div>
                    <div className="form__group">
                        <button className="btn btn-green">
                            Create Poll
                        </button>
                    </div>
                </form>) : <Loader />}

            </>
        </div>
    );
}

export default Create;