import { Link, useParams } from "react-router-dom";

const Success = () => {
    const { id } = useParams()

    return (
        <div className="page">
            <div className="page-header">
                <h2 className="title">Thanks for Your Vote</h2>
                <p className="subtitle">Your participation is very much appreciated!</p>
                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="check-circle" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{ borderRadius: '50%', color: '#00b0f4', maxWidth: '200px' }}><path fill="currentColor" d="M504 256c0 136.967-111.033 248-248 248S8 392.967 8 256 119.033 8 256 8s248 111.033 248 248zM227.314 387.314l184-184c6.248-6.248 6.248-16.379 0-22.627l-22.627-22.627c-6.248-6.249-16.379-6.249-22.628 0L216 308.118l-70.059-70.059c-6.248-6.248-16.379-6.248-22.628 0l-22.627 22.627c-6.248 6.248-6.248 16.379 0 22.627l104 104c6.249 6.249 16.379 6.249 22.628.001z"></path></svg>
            </div>
            <div className="page-footer">
                <Link className="btn btn-green" to={`/results/${id}`}>Show results</Link>
                <Link className="btn btn-dark" to={`/poll/${id}`}>Back to poll</Link>
            </div>
        </div>
    );
}

export default Success;