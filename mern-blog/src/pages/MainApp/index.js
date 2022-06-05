import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import CreateBlog from "../CreateBlog";
import DetailBlog from "../DetailBlog";
import Home from "../Home";
import { Header, Footer} from "../../components"

const RouteWrapper = ({path, component: Component, ...rest}) => {
    return (
        <Route path={path} render={(props) => {
            <Component {...rest}/>
        }}/>
    )
}

const MainApp = () => {
    return (
        <div className="main-app-wrapper d-flex flex-column h-100">
            <Header />
            <div className="content-wrapper p-5" style={{flex: 1}}>
                <Router>
                    <Switch>
                        <Route path='/create-blog/:id?' component={CreateBlog} />
                        <Route path='/detail-blog/:id' component={DetailBlog} />
                        <Route path='/' component={Home} />
                    </Switch>
                </Router>
            </div>
            <Footer />
        </div>
    )
}

export default MainApp