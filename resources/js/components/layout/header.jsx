import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link as RouterLink } from 'react-router-dom'
import Link from '@material-ui/core/Link';

const styles = {
    root: {
        flexGrow: 1,
    },
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
        anchorEl: null,
    };
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    handleClose = () => {
        this.setState({ anchorEl: null });
    };
    render() {
        const { anchorEl } = this.state;

        const { classes } = this.props;
        return (
            <AppBar position="static">
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu" onClick={this.handleClick}>
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" color="inherit" className={classes.grow}>
                        记账本
                    </Typography>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="add">
                        <AddIcon />
                    </IconButton>
                </Toolbar>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClose}>
                        <Link component={RouterLink} to="/fts3232/cash-note/public/">图表</Link>
                    </MenuItem>
                    <MenuItem onClick={this.handleClose}>
                        <Link component={RouterLink} to="/fts3232/cash-note/public/about/">明细</Link>
                    </MenuItem>
                </Menu>
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