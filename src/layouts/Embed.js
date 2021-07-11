import { useEffect } from 'react';
import { Switch, Route} from 'react-router-dom'
import EmbedDetails from '../components/EmbedDetails';
import EmbedResults from '../components/EmbedResults';

const Embed = () => {
    useEffect(() => {
        document.body.style.backgroundColor = 'transparent'
    }, [])
    return (
        <div className="container">
            <Switch>
                <Route path="/embed/:id" component={EmbedDetails}></Route>
                <Route path="/embed-results/:id" component={EmbedResults}></Route>
            </Switch>
        </div>
    );
}

export default Embed;