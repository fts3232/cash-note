import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import DescriptionIcon from '@material-ui/icons/Description';
import PieChartIcon from '@material-ui/icons/PieChart';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';


const styles = {
    root: {},
};

class Footer extends React.Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({value});
    };

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (
            <BottomNavigation
                value={ value }
                onChange={ this.handleChange }
                showLabels
                className={ classes.root }
            >
                <BottomNavigationAction label="图表" icon={ <PieChartIcon/> }/>
                <BottomNavigationAction label="明细" icon={ <DescriptionIcon/> }/>
            </BottomNavigation>
        );
    }
}

Footer.propTypes = { //isRequired  代表该参数是必须的
    classes  : PropTypes.object.isRequired,
};

export default withStyles(styles)(Footer);