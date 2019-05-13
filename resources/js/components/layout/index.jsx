import React from "react";
import Grid from '@material-ui/core/Grid';
import {renderRoutes} from "react-router-config";
import CssBaseline from '@material-ui/core/CssBaseline';
import {withStyles} from '@material-ui/core/styles';
import Header from './header.jsx';
/*import Footer from './footer.jsx';*/

const styles = (theme) => ({
    header: {
        flexBasis: 'auto'
    },
    footer: {
        flexBasis: 'auto'
    },
    body  : {
        flexGrow  : 1,
        overflow  : 'auto',
        background: '#eeeeee',
        padding   : theme.spacing.unit * 2
    }
});

class App extends React.Component {
    state = {};

    render() {
        const {classes, route, location} = this.props;
        let hidden = location.pathname == '/fts3232/cash-note/public/add/';
        return (
            <div>
                <CssBaseline/>
                <Grid container spacing={0} direction="column" alignItems="stretch" style={{flexWrap: 'nowrap', height: '100vh'}}>
                    <Grid item xs={12} className={classes.header}>
                        <Header/>
                    </Grid>
                    <Grid item xs={12} className={classes.body}>
                        {renderRoutes(route.routes)}
                    </Grid>
                    <Grid item xs={12} className={classes.footer} hidden={hidden}>
                        {/*<Footer/>*/}
                    </Grid>
                </Grid>
            </div>

        );
    }
}

export default withStyles(styles)(App);
