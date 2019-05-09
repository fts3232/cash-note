import ReactDOM from "react-dom";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './header.jsx';
import Footer from './footer.jsx';
import {BrowserRouter as Router, Route} from "react-router-dom";
import loadable from '@loadable/component'
import { withStyles } from '@material-ui/styles';
import Paper from "@material-ui/core/Paper";

const styles = {
    grid:{
        height:'100vh',
    }
};

function Index() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Users() {
    return <h2>Users</h2>;
}

const OtherComponent = loadable(() => import('../button.jsx'))


class App extends React.Component {
    state = {
        spacing: '16',
    };

    render() {
        const {spacing} = this.state;
        const {classes} = this.props;
        return (
            <Router>
                <CssBaseline/>
                <Grid container spacing={0}  direction="column" alignItems="stretch" className={classes.grid}>
                    <Grid item xs={12}  style={{flexBasis: 'auto'}}>
                        <Header/>
                    </Grid>
                    <Grid item xs={12} style={{flexGrow:1, overflow: 'auto'}}>
                        <Route path="/fts3232/cash-note/public/" exact component={Index}/>
                        <Route path="/fts3232/cash-note/public/about/" component={About}/>
                        <Route path="/fts3232/cash-note/public/users/" component={OtherComponent}/>
                    </Grid>
                    <Grid item xs={12}  style={{flexBasis: 'auto'}}>
                        <Footer/>
                    </Grid>
                </Grid>
            </Router>

        );
    }
}

export default withStyles(styles)(App);
