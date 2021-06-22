import { useState } from "react";
import { useDispatch } from 'react-redux'
import { createPoll } from "../store/slices/pollSlice";
const Create = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([{ id: 1, text: 'example' }, { id: 2, text: '' }])
    const dispatch = useDispatch()

    const updateOption = (value, id) => {
        const updated = options.map(option => {
            if(option.id === id) {
                option.text = value
            }
            return option
        })
        setOptions(updated)
    }

    const focusHandler = (index) => {
        if(index !== options.length - 1) return

        setOptions([...options, {id: Date.now(), text: ''}])
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const optionsData = options.filter(option => option.text)
        const poll = {
            id: Date.now(),
            title,
            description,
            options: optionsData
        }
        dispatch(createPoll(poll))
    }

    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">
                    Craete a Poll
                </h2>
            </div>
            <form className="form" onSubmit={submitHandler}>
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
            </form>
        </div>
    );
}

export default Create;