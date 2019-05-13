import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom'


const styles = {
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    }
};

class Header extends React.Component {
    state = {

    };

    render() {
        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="add" component={RouterLink} to="/fts3232/cash-note/public/">
                        <HomeIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        记账本
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="add" component={RouterLink} to="/fts3232/cash-note/public/add/">
                        <AddIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = { //isRequired  代表该参数是必须的
    classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};

export default withStyles(styles)(Header);