import React from 'react';
import Grid from '@material-ui/core/Grid';
import { renderRoutes } from 'react-router-config';
import CssBaseline from '@material-ui/core/CssBaseline';
import { MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import theme from 'fts/theme/caseNote';
import PropTypes from 'prop-types';
import Header from './header.jsx';
/* import Footer from './footer.jsx'; */

const styles = (defaultTheme) => ({
    flexBasisAuto: {
        flexBasis: 'auto'
    },
    body: {
        flexGrow  : 1,
        overflow  : 'auto',
        background: '#eeeeee',
        padding   : defaultTheme.spacing.unit * 2
    }
});

class App extends React.Component {

    render() {
        const { classes, route, history } = this.props;
        const showBack = location.pathname !== '/';
        const hidden = location.pathname === '/add/';
        return (
            <MuiThemeProvider theme={theme}>
                <CssBaseline/>
                <Grid container spacing={0} direction="column" alignItems="stretch" style={{ flexWrap: 'nowrap', height: '100vh' }}>
                    <Grid item xs={12} className={classes.flexBasisAuto}>
                        <Header showBack={showBack} history={history}/>
                    </Grid>
                    <Grid item xs={12} className={classes.body}>
                        {renderRoutes(route.routes, { theme })}
                    </Grid>
                    <Grid item xs={12} className={classes.flexBasisAuto} hidden={hidden}>
                        {/* <Footer/> */}
                    </Grid>
                </Grid>
            </MuiThemeProvider>
        );
    }
}

App.propTypes = { // isRequired  代表该参数是必须的
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(App);
