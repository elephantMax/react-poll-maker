import { useMemo } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../store/slices/userSlice";
import Loader from "./Loader";
import PollsList from "./PollsList";

const Profile = () => {
    const polls = useSelector((state) => state.poll.polls)
    const { profileData } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUserById({ id }))
    }, [id, profileData, dispatch])

    const userPolls = useMemo(() => {
        if (polls) {
            return polls.filter(poll => poll.user_id === id)
        }
        return []
    }, [polls, id])

    return (
        <div className="page">
            {profileData ? (
                <>
                    <div className="profile">
                        <img className="profile__img" src={profileData.photoURL} alt="profile" />
                        <h2 className="title">
                            {profileData.displayName}
                        </h2>
                    </div>
                    <h2 className="subtitle">Polls</h2>
                    <PollsList polls={userPolls} />
                </>
            ) : <Loader />}
        </div>
    );
}

export default Profile;