import { useMemo } from "react";

const StatsOption = ({ totalVotes, option }) => {
    const percent = useMemo(() => {
        if(totalVotes) {
            return (option.votes / totalVotes * 100).toFixed(1)
        }
        return 0
    }, [totalVotes, option])
    return (
        <div key={option.id} className="stats-option">
            <p className="stats-option__title">
                {option.text}
            </p>
            <span className="stats-option__percents">
                {percent}% ({option.votes} votes)
            </span>
            <div className="progressbar">
                <span style={{right: `${100 - percent}%`}} className="progressbar__value"></span>
            </div>
        </div>
    );
}

export default StatsOption;