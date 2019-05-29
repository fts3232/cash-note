import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import React from 'react';
import ReactDOM from 'react-dom';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import IconButton from '@material-ui/core/IconButton';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error  : ErrorIcon,
    info   : InfoIcon
};

const styles = theme => ({
    success: {
        backgroundColor: green[600]
    },
    error: {
        backgroundColor: theme.palette.error.dark
    },
    info: {
        backgroundColor: theme.palette.primary.dark
    },
    warning: {
        backgroundColor: amber[700]
    },
    icon: {
        fontSize: 20
    },
    iconVariant: {
        opacity    : 0.9,
        marginRight: theme.spacing.unit
    },
    message: {
        display   : 'flex',
        alignItems: 'center'
    }
});

class Message extends React.Component {
    queue = [];

    timeout = null;

    state = {
        open       : false,
        messageInfo: {}
    };

    constructor(props) {
        super(props);
        Message.addQuene = this.addQueue.bind(this);
    }

    processQueue = () => {
        const _this = this;
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                open       : true
            }, () => {
                if (_this.timeout) {
                    clearTimeout(_this.timeout);
                }
                _this.timeout = setTimeout(() => {
                    _this.setState({ open: false });
                }, 5000);
            });
        }
    };

    handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ open: false });
    };

    handleExited = () => {
        this.processQueue();
    };

    addQueue(type, message) {
        this.queue.push({
            message,
            type,
            key: new Date().getTime()
        });

        if (this.state.open) {
            // immediately begin dismissing current message
            // to start showing new one
            this.setState({ open: false });
        } else {
            this.processQueue();
        }
    }

    render() {
        const { open, messageInfo } = this.state;
        const { classes, className, ...other } = this.props;
        const Icon = variantIcon[messageInfo.type];
        return (
            <Snackbar
                open={open}
                autoHideDuration={1000}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
                onExited={this.handleExited}
                onClick={this.handleClose}
            >
                <SnackbarContent
                    className={classNames(classes[messageInfo.type], className)}
                    aria-describedby="client-snackbar"
                    message={(
                        <span id="client-snackbar" className={classes.message}>
                            <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                            { messageInfo.message }
                        </span>
                    )}
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon className={classes.icon}/>
                        </IconButton>
                    ]}
                    {...other}
                />
            </Snackbar>
        );
    }
}

Message.propTypes = {
    classes  : PropTypes.object.isRequired,
    className: PropTypes.string
};
Message.defaultProps = {
    className: ''
};

const MyMessage = withStyles(styles)(Message);

const showMessage = (type, message) => {
    let div = '';
    if (!document.getElementById('MyMessage')) {
        div = document.createElement('div');
        div.setAttribute('id', 'MyMessage');
        document.body.appendChild(div);
        ReactDOM.render(<MyMessage/>, div);
    }
    Message.addQuene(type, message);
};


export default showMessage;