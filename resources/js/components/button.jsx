import Button from '@material-ui/core/Button';
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

const style = {
    'footer':{
        background:'black'
    }
};


class App extends React.Component {
    render() {
        return (
            <Button variant="contained" color="primary">
                你好，世界
            </Button>
        );
    }
}

App.propTypes = { //isRequired  代表该参数是必须的
    remove: PropTypes.func.isRequired,  //必须而且必须是函数
    todo: PropTypes.object,     //非必须 可传可不传
    title: PropTypes.string.isRequired,
};

export default withStyles(style)(App);