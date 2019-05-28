import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import HomeIcon from '@material-ui/icons/Home';
import ReplyIcon from '@material-ui/icons/Reply';
import AddIcon from '@material-ui/icons/Add';
import { Link as RouterLink } from 'react-router-dom'


const styles = {
    grow      : {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft : -12,
        marginRight: 20,
    }
};

class Header extends React.Component {
    state = {};

    goBack = () => {
        const {history} = this.props;
        history.goBack()
    }

    render() {
        const {classes, showBack} = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    { showBack ? (
                        <IconButton className={ classes.menuButton } color="inherit" aria-label="add" onClick={ this.goBack }>
                            <ReplyIcon/>
                        </IconButton>
                    ) : (
                        <IconButton className={ classes.menuButton } color="inherit" aria-label="add" component={ RouterLink } to="/">
                            <HomeIcon/>
                        </IconButton>
                    ) }
                    <Typography variant="h6" color="inherit" className={ classes.grow }>
                        记账本
                    </Typography>
                    <IconButton className={ classes.menuButton } color="inherit" aria-label="add" component={ RouterLink } to="/add/">
                        <AddIcon/>
                    </IconButton>
                </Toolbar>
            </AppBar>
        );
    }
}

Header.propTypes = { //isRequired  代表该参数是必须的
    showBack: PropTypes.bool,
    classes : PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};
Header.defaultProps = {
    showBack: false
};

export default withStyles(styles)(Header);