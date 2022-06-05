import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Login, MainApp, Register } from "../../pages";

const Routes = () => {

    return (
        <Router>
            <Switch>
                <Route path='/login'><Login /></Route>
                <Route path='/register'><Register /></Route>
                <Route path='/'><MainApp /></Route>
                <Route path='' render={() => <h3>Not Found</h3>} />
            </Switch>
        </Router>
    )
}

export default Routes;