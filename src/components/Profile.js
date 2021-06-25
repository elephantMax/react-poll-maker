import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getUserById } from "../store/slices/userSlice";
import PollsList from "./PollsList";

const Profile = () => {
    const polls = useSelector((state) => state.poll.polls)
    const { profileData } = useSelector((store) => store.user)
    const dispatch = useDispatch()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getUserById({id}))
    }, [id, profileData, dispatch])

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
                    <PollsList polls={polls} />
                </>
            ) : <p className="subtitle">Загрузка</p>}
        </div>
    );
}

export default Profile;