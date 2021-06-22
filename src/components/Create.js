const Create = () => {
    return (
        <div className="page">
            <h2 className="page-header">
                <h2 className="title">
                    Craete a Poll
                </h2>
            </h2>
            <form className="form">
                <div className="form__group">
                    <label className="form__label">Title</label>
                    <input className="form__input" type="text" placeholder="write your question here..." />
                </div>
                <div className="form__group">
                    <label className="form__label">Description</label>
                    <textarea className="form__input" placeholder="Enter an introduction text..."></textarea>
                </div>
                <div className="form__group">
                    <label className="form__label">Answer options</label>
                    <input className="form__input" type="text" placeholder="Choose answer..." />
                    <input className="form__input" type="text" placeholder="Choose answer..." />
                    <input className="form__input" type="text" placeholder="Choose answer..." />
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