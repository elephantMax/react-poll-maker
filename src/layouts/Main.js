import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUser } from "../store/slices/userSlice";
import { fetchPolls } from "../store/slices/pollSlice";
import Loader from "../components/Loader";
import { Route, Switch } from "react-router-dom";
import Navbar from "../components/Navbar";
import Create from "../components/Create";
import Discover from "../components/Discover";
import PollDetails from "../components/PollDetils";
import Results from "../components/Results";
import Success from "../components/Success";
import Profile from "../components/Profile";
import Main from "../components/Main";
import NotFound from "../components/NotFound";

const MainLayout = () => {
    const { user, loading } = useSelector(state => state.user)
    const { polls } = useSelector(state => state.poll)
    const dispatch = useDispatch()


    useEffect(() => {
        if (!user) {
            dispatch(getCurrentUser())
        }
        if (!polls) {
            dispatch(fetchPolls())
        }
    }, [user, dispatch, polls])

    return (
        <div className="App">
            <Navbar />
            {loading && (
                <div className="page-loader">
                    <Loader />
                </div>
            )}
            <div className="container">
                <Switch>
                    <Route path="/" exact component={Main}></Route>
                    <Route path="/create" component={Create}></Route>
                    <Route path="/discover" component={Discover}></Route>
                    <Route path="/poll/:id" component={PollDetails}></Route>
                    <Route path="/results/:id" component={Results}></Route>
                    <Route path="/success/:id" component={Success}></Route>
                    <Route path="/profile/:id" component={Profile}></Route>
                    <Route path="*" component={NotFound}></Route>
                </Switch>
            </div>
        </div>
    )
}

export default MainLayout;