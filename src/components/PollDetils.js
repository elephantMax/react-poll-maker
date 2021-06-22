import { Link } from 'react-router-dom'

const PollDetails = () => {
    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">
                    What are you most excited for?
                </h2>
                <p className="subtitle">
                    by <Link className="link">BenereV2</Link> · 8 days ago
                </p>
            </div>

            <div className="pollDetails__body">
                <p className="subtitle">
                    Choose one answer:
                </p>
                <form className="form-answer">
                    <div className="form-answer__option">
                        <input className="form-answer__input" type="radio" id="3" name="answer" />
                        <label className="form-answer__label" htmlFor="3">
                            Answer 3
                        </label>
                    </div>
                    <div className="form-answer__option">
                        <input className="form-answer__input" type="radio" id="3" name="answer" />
                        <label className="form-answer__label" htmlFor="3">
                            Answer 3
                        </label>
                    </div>
                    <div className="form-answer__option">
                        <input className="form-answer__input" type="radio" id="3" name="answer" />
                        <label className="form-answer__label" htmlFor="3">
                            Answer 3
                        </label>
                    </div>
                    <div className="form-answer__option">
                        <input className="form-answer__input" type="radio" id="3" name="answer" />
                        <label className="form-answer__label" htmlFor="3">
                            Answer 3
                        </label>
                    </div>
                    <div className="form-answer__actions">
                        <button className="btn btn-green">Vote</button>
                        <Link className="btn btn-dark" to="/results">
                            Results
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PollDetails;