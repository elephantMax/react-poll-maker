import { Link } from 'react-router-dom'

const Results = () => {
    return (
        <div className="results page">
            <div className="page-header">
                <h2 className="title">
                    What are you most excited for?
                </h2>
                <p className="subtitle">
                    by <Link className="link">BenereV2</Link> · 8 days ago
                </p>
            </div>
            <div className="results__body">
                <p className="subtitle">
                    The results after 18432 people voted:
                </p>
                <div className="stats">
                    <div className="stats__options">
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                        <div className="stats-option">
                            <p className="stats-option__title">
                                Fruits
                            </p>
                            <span className="stats-option__percents">
                                48.54% (8947 votes)
                            </span>
                            <div className="progressbar">
                                <span className="progressbar__value"></span>
                            </div>
                        </div>
                    </div>
                    <div className="diagramm">

                    </div>
                </div>
                <h2 className="title">Total: 1232</h2>

            </div>

            <div className="page-footer">
                <button className="btn btn-green">
                    Refresh Results
                </button>
                <Link className="btn btn-dark" to="/poll">Back to Poll</Link>
            </div>
        </div>
    );
}

export default Results;