import ReactDOM from "react-dom";
import React from "react";
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Header from './header.jsx';
import Footer from './footer.jsx';
import {BrowserRouter as Router, Route} from "react-router-dom";
import loadable from '@loadable/component'

const AddComponent = loadable(() => import('../add/index.jsx'))
const ChartComponent = loadable(() => import('../chart/index.jsx'))
const DetailComponent = loadable(() => import('../chart/index.jsx'))

class App extends React.Component {
    state = {

    };

    render() {
        this.props.PayIncrease()
        const {classes} = this.props;
        return (
            <Router>
                <CssBaseline/>

                <Grid container spacing={0}  direction="column" alignItems="stretch" style={{flexWrap: 'nowrap',height:'100vh'}}>
                    <Grid item xs={12} style={{flexBasis: 'auto'}}>
                        <Header toggleFooter={this.toggleFooter}/>
                    </Grid>
                    <Grid item xs={12} style={{flexGrow:1, overflow: 'auto'}}>
                        <Route path="/fts3232/cash-note/public/" exact component={ChartComponent}/>
                        <Route path="/fts3232/cash-note/public/detail/" component={DetailComponent}/>
                        <Route path="/fts3232/cash-note/public/add/" component={AddComponent}/>
                    </Grid>
                    <Grid item xs={12} style={{flexBasis: 'auto'}} >
                        <Footer />
                    </Grid>
                </Grid>
            </Router>

        );
    }
}

export default App;
