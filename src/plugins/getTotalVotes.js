export default function getTotalVotes (poll) {
    return poll.options.reduce((prev, curr) => {
        return prev + (curr.votes?.length || 0)
    }, 0)
}