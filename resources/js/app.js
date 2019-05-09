import ReactDOM from "react-dom";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './components/layout/header.jsx';
import Footer from './components/layout/footer.jsx';
import { BrowserRouter as Router, Route } from "react-router-dom";
import loadable from '@loadable/component'

function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

const OtherComponent = loadable(() => import('./components/button.jsx'))


class App extends React.Component {
    state = {
        spacing: '16',
    };
    render() {
        const { spacing } = this.state;
        return (
            <Router>
                <CssBaseline />
                <Grid container direction="column" justify="space-around" alignItems="stretch" spacing={0}>
                    <Grid item xs={12}>
                        <Header />
                    </Grid>
                    <Grid item xs={12}>
                        <Route path="/fts3232/cash-note/public/" exact component={Index} />
                        <Route path="/fts3232/cash-note/public/about/" component={About} />
                        <Route path="/fts3232/cash-note/public/users/" component={OtherComponent} />
                    </Grid>
                    <Grid item xs={12}>
                        <Footer />
                    </Grid>
                </Grid>
            </Router>

        );
    }
}

ReactDOM.render(<App />, document.querySelector("#app"));
