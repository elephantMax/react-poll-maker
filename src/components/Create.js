import { useState } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from "react-router-dom";
import { createPoll } from "../store/slices/pollSlice";
import { useForm } from 'react-hook-form'
import Loader from "./Loader";

const Create = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [options, setOptions] = useState([{ id: 1, text: 'example' }, { id: 2, text: '' }])
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.user)
    const { craeteLoading } = useSelector((state) => state.poll)
    const history = useHistory()
    const { register, handleSubmit, setError, clearErrors, formState: { errors } } = useForm()


    const updateOption = (value, id) => {
        clearErrors('options')
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

    const submitHandler = () => {

        const uniqueOptions = new Set()

        const filteredOptions = options.filter(option => {
            if (!uniqueOptions.has(option.text.trim()) && option.text) {
                uniqueOptions.add(option.text.trim())
                return true
            }
            return false
        });

        const optionsData = filteredOptions.map(option => (
            {
                id: option.id,
                text: option.text,
                votes: []
            }
        ))

        if (!optionsData.length) {
            setError('options')
            return
        }

        const poll = {
            id: Date.now(),
            title,
            description,
            options: optionsData,
            user_id: user ? user.uid : null
        }

        const session_id = localStorage.getItem('session_id')

        if(!poll.user_id) poll.session_id = session_id 

        dispatch(createPoll(poll))
        history.push(`/poll/${poll.id}`)
    }

    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">
                    Craete a Poll
                </h2>
            </div>
            <>
                {!craeteLoading ? (<form className="form" onSubmit={handleSubmit(submitHandler)}>
                    <div className="form__group">
                        <label className="form__label">Title</label>
                        <input className={`form__input ${errors.title ? 'form__input--danger' : ''}`} type="text" {...register('title', { required: true })} value={title} onChange={(e) => setTitle(e.target.value)} placeholder="write your question here..." />
                        {errors.title && <span className="form__error">Title is required</span>}
                    </div>
                    <div className="form__group">
                        <label className="form__label">Description</label>
                        <textarea className={`form__input ${errors.description ? 'form__input--danger' : ''}`} {...register('description', { required: true })} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Enter an introduction text..."></textarea>
                        {errors.description && <span className="form__error">Description is required</span>}
                    </div>
                    <div className="form__group">
                        <label className="form__label">Answer options</label>
                        {options.map((option, index) => <input className={`form__input ${errors.options ? 'form__input--danger' : ''}`} type="text" key={option.id} value={option.text} onChange={(e) => updateOption(e.target.value, option.id)} onFocus={() => focusHandler(index)} placeholder="Choose answer..." />)}
                        {errors.options && <span className="form__error">Options are required</span>}
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