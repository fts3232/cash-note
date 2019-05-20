import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import React from "react";
import ReactDOM from "react-dom";
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
import {withStyles} from '@material-ui/core/styles';

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error  : ErrorIcon,
    info   : InfoIcon,
};

const styles = theme => ({
    success    : {
        backgroundColor: green[600],
    },
    error      : {
        backgroundColor: theme.palette.error.dark,
    },
    info       : {
        backgroundColor: theme.palette.primary.dark,
    },
    warning    : {
        backgroundColor: amber[700],
    },
    icon       : {
        fontSize: 20,
    },
    iconVariant: {
        opacity    : 0.9,
        marginRight: theme.spacing.unit,
    },
    message    : {
        display   : 'flex',
        alignItems: 'center',
    },
});

class MySnackbarContent extends React.Component {
    queue = [];
    state = {
        open: true,
        messageInfo: queue.shift(),
    };

    constructor(props){
        super(props)
        MySnackbarContent.addQuene = this.addQueue.bind(this)
    }

    addQueue(type,message){
        this.queue.push({
            message,
            type,
            key: new Date().getTime(),
        });
    }

    handleClose = () => {
        let {onClose} = this.props;
        this.setState({'open': false}, () => {
            onClose()
        })
    };

    processQueue = () => {
        if (this.queue.length > 0) {
            this.setState({
                messageInfo: this.queue.shift(),
                open: true,
            });
        }
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        const {classes, className, vertical, horizontal, ...other} = this.props;
        const {open, messageInfo } = this.state;
        const variant = messageInfo.type;
        const message = messageInfo.message;
        const Icon = variantIcon[variant];
        return (
            <Snackbar
                key={messageInfo.key}
                open={open}
                autoHideDuration={6000}
                anchorOrigin={{vertical, horizontal}}
            >
                <SnackbarContent
                    anchorOrigin={{vertical, horizontal}}
                    className={classNames(classes[variant], className)}
                    aria-describedby="client-snackbar"
                    onClick={this.handleClose}
                    onExited={this.handleExited}
                    message={
                        <span id="client-snackbar" className={classes.message}>
                            <Icon className={classNames(classes.icon, classes.iconVariant)}/>
                            {message}
                        </span>
                    }
                    action={[
                        <IconButton
                            key="close"
                            aria-label="Close"
                            color="inherit"
                            className={classes.close}
                            onClick={this.handleClose}
                        >
                            <CloseIcon className={classes.icon}/>
                        </IconButton>,
                    ]}
                    {...other}
                />
            </Snackbar>
        );
    }
}

MySnackbarContent.propTypes = {
    classes  : PropTypes.object.isRequired,
    className: PropTypes.string,
    message  : PropTypes.node,
    onClose  : PropTypes.func,
    /*variant  : PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,*/
};

const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

class MyMessage extends React.Component {
    queue = [];
    state = {
        open: true,
        messageInfo: queue.shift(),
    };
    constructor(props){
        super(props)
        MyMessage.addQuene = this.addQueue.bind(this)
    }

    queue = [];

    state = {
        open: true,
        messageInfo: queue.shift(),
    };

    addQueue(){
        console.log(1)
    }

    handleClose = () => {
        let {onClose} = this.props;
        this.setState({'open': false}, () => {
            onClose()
        })
    };

    processQueue = () => {
        if (queue.length > 0) {
            this.setState({
                messageInfo: queue.shift(),
                open: true,
            });
        }
    };

    handleExited = () => {
        this.processQueue();
    };

    render() {
        let {onClose} = this.props;
        return (<MySnackbarContentWrapper
            horizontal="center"
            vertical="top"
            onClose={onClose}
        />);
    }

}

const showMessage = (type, message) => {
    let div = '';
    open = true;
    if (!document.getElementById("MyMessage")) {
        div = document.createElement('div');
        div.setAttribute('id', 'MyMessage');
        document.body.appendChild(div);
        ReactDOM.render(<MyMessage
            onClose={(event, reason) => {
                setTimeout(()=>{
                    if (document.getElementById("MyMessage")) {
                        document.getElementById('MyMessage').remove();
                    }
                },500)
            }}
        />, div);
    }
    MyMessage.addQuene(type,message)
}


export default showMessage;