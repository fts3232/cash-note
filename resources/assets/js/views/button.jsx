import Button from '@material-ui/core/Button';
import React from 'react';
class App extends React.Component {
    render() {
        return (
            <Button variant="contained" color="primary">
                你好，世界
            </Button>
        );
    }
}

App.propTypes = {
    name: React.PropTypes.string
};

export default App;