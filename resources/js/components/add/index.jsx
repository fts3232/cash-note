import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom'


const styles = theme => ({
    root       : {
        margin: '20px 24px 0 24px'
    },
    formControl: {
        margin: '6px 0',
    },
    textField  : {
        margin: '10px 0'
    },
    button     : {
        margin: theme.spacing.unit,
    },
    radioGroup : {
        margin       : `${theme.spacing.unit}px 0`,
        flexDirection: 'row'
    },
});


class Add extends React.Component {
    state = {
        type    : 0,
        amount  : '',
        category: 0,
        remark  : ''
    };

    handleChange = name => event => {
        let value = event.target.value
        this.setState({[name]: value});
    };

    post = () => {
        console.log(this.state)
    }

    render() {
        const {classes} = this.props;
        const {value} = this.state;
        return (
            <div className={classes.root}>
                <FormGroup>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">类型</FormLabel>
                        <RadioGroup
                            aria-label="类型"
                            name="type"
                            className={classes.radioGroup}
                            defaultValue={'0'}
                            value={this.state.value}
                            onChange={this.handleChange('type')}
                        >
                            <FormControlLabel value="0" control={<Radio/>} label="支出"/>
                            <FormControlLabel value="1" control={<Radio/>} label="收入"/>
                        </RadioGroup>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">项目</FormLabel>
                        <NativeSelect
                            value={this.state.category}
                            onChange={this.handleChange('category')}
                            name="category"
                            className={classes.textField}
                        >
                            <optgroup label="生活必要花费">
                                <option value={1}>交通</option>
                                <option value={2}>餐饮</option>
                                <option value={3}>住宿</option>
                            </optgroup>
                            <optgroup label="外出">
                                <option value={3}>交通</option>
                                <option value={4}>餐饮</option>
                            </optgroup>
                            <optgroup label="娱乐项目">
                                <option value={5}>网吧</option>
                                <option value={6}>手游</option>
                                <option value={7}>端游</option>
                                <option value={8}>购物</option>
                                <option value={9}>大保健</option>
                            </optgroup>
                            <optgroup label="收入项目">
                                <option value={10}>工资</option>
                            </optgroup>
                        </NativeSelect>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">金额</FormLabel>
                        <TextField
                            id="standard-name"
                            className={classes.textField}
                            value={this.state.amount}
                            placeholder="0.00"
                            onChange={this.handleChange('amount')}
                        />
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">备注</FormLabel>
                        <TextField
                            multiline
                            rows="4"
                            defaultValue=""
                            placeholder="请输入备注"
                            value={this.state.remark}
                            onChange={this.handleChange('remark')}
                            className={classes.textField}
                        />
                    </FormControl>
                </FormGroup>
                <div style={{textAlign: 'right'}}>
                    <Button variant="contained" color="primary" component="span" className={classes.button} onClick={this.post}>
                        添加
                    </Button>
                    <Button variant="contained" component="span" className={classes.button} component={RouterLink} to="/fts3232/cash-note/public/">
                        取消
                    </Button>
                </div>
            </div>
        );
    }
}

Add.propTypes = { //isRequired  代表该参数是必须的
    classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};

export default withStyles(styles)(Add);