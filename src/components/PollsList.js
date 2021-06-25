import Poll from './Poll'

const PollsList = ({ polls }) => {
    return (
        <>
            {polls && (
                <div className="polls__list">
                    {polls.length ? polls.map(poll => <Poll poll={poll} key={poll.id} />) : <p className="subtitle">No polls</p>}
                </div>
            )}
        </>
    );
}

export default PollsList;