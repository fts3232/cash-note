import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import FormGroup from '@material-ui/core/FormGroup';
import TextField from '@material-ui/core/TextField';
import NativeSelect from '@material-ui/core/NativeSelect';
import Button from '@material-ui/core/Button';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';
import showMessage from 'fts/components/showMessage';
import { categoryMap } from 'fts/config/app.js';
import Qs from 'qs';

const styles = theme => ({
    root: {
        margin: '20px 24px 0 24px'
    },
    formControl: {
        margin: '6px 0'
    },
    textField: {
        margin: '10px 0'
    },
    button: {
        margin: theme.spacing.unit
    },
    radioGroup: {
        margin       : `${ theme.spacing.unit }px 0`,
        flexDirection: 'row'
    }
});

const date = new Date();
let month = date.getMonth() + 1;
month = month < 10 ? `0${  month }` : month;
const year = date.getFullYear();
let day = date.getDate();
day = day < 10 ? `0${  day }` : day;


const selectCategoryMap = {
    'cost'  : [],
    'income': []
};
let costFlag1 = false;
let costFlag2 = false;
for (const x in categoryMap) {
    if (x.indexOf('c-') !== -1) {
        if (categoryMap[x].indexOf('生活必要花费') !== -1) {
            if (costFlag1 === false) {
                selectCategoryMap.cost.push({ 'label': '生活必要花费', 'items': [] });
                costFlag1 = selectCategoryMap.cost.length - 1;
            }
            selectCategoryMap.cost[costFlag1].items.push({ 'label': categoryMap[x], 'value': x });
        } else {
            if (costFlag2 === false) {
                selectCategoryMap.cost.push({ 'label': '其他', 'items': [] });
                costFlag2 = selectCategoryMap.cost.length - 1;
            }
            selectCategoryMap.cost[costFlag2].items.push({ 'label': categoryMap[x], 'value': x });
        }
    } else {
        selectCategoryMap.income.push({ 'label': categoryMap[x], 'value': x });
    }
}

class Add extends React.Component {
    state = {
        type      : '0',
        amount    : '',
        category  : 'c-1-1',
        remark    : '',
        date      : `${ year }-${ month }-${ day }`,
        submission: false
    };

    handleChange = name => event => {
        const { value } = event.target;
        if (name === 'type') {
            this.setState({ 'category': value === '0' ? 'c-1-1' : 'i-1-1' });
        }
        this.setState({ [name]: value });
    };

    post = () => {
        const { submission } = this.state;
        const { state } = this;
        const _this = this;
        if (!submission) {
            this.setState({ 'submission': true }, () => {
                let data = {
                    type    : state.type,
                    amount  : state.amount,
                    category: state.category,
                    remark  : state.remark,
                    date    : state.date
                };
                data = Qs.stringify(data);
                axios.post('http://localhost/fts3232/workspace/installer/lumen/public/api/cashNote/add', data, { timeout: 5000 }).then((response) => {
                    let type = 'success';
                    if (!response.data.status) {
                        type = 'error';
                    }
                    showMessage(type, response.data.msg);
                }).catch((error) => {
                    console.log(error);
                    showMessage('error', error.message);
                }).then(() => {
                    _this.setState({ 'submission': false });
                });
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { type } = this.state;
        const categorys = type === '0' ? selectCategoryMap.cost : selectCategoryMap.income;
        return (
            <div className={classes.root}>
                <FormGroup>
                    <FormControl component="fieldset">
                        <FormLabel component="legend">日期</FormLabel>
                        <TextField
                            id="date"
                            type="date"
                            defaultValue={this.state.date}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true
                            }}
                            onChange={this.handleChange('date')}
                        />
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">类型</FormLabel>
                        <RadioGroup
                            aria-label="类型"
                            name="type"
                            className={classes.radioGroup}
                            defaultValue="0"
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
                            { categorys.map((category) => {
                                if (typeof category.items !== 'undefined') {
                                    return (
                                        <optgroup label={category.label}>
                                            { category.items.map((items) => {
                                                return (<option value={items.value}>{ items.label }</option>);
                                            }) }
                                        </optgroup>
                                    );
                                } 
                                return (<option value={category.value}>{ category.label }</option>);
                                
                            }) }
                        </NativeSelect>
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">金额</FormLabel>
                        <TextField
                            id="standard-name"
                            className={classes.textField}
                            value={this.state.amount}
                            placeholder="0.00"
                            type="number"
                            onChange={this.handleChange('amount')}
                        />
                    </FormControl>
                    <FormControl component="fieldset" className={classes.formControl}>
                        <FormLabel component="legend">备注</FormLabel>
                        <TextField
                            multiline
                            rows="4"
                            placeholder="请输入备注"
                            value={this.state.remark}
                            onChange={this.handleChange('remark')}
                            className={classes.textField}
                        />
                    </FormControl>
                </FormGroup>
                <div style={{ textAlign: 'right' }}>
                    <Button variant="contained" color="primary" component="span" className={classes.button} onClick={this.post}>
                        添加
                    </Button>
                    <Button variant="contained" className={classes.button} component={RouterLink} to="/">
                        取消
                    </Button>
                </div>
            </div>
        );
    }
}

Add.propTypes = { // isRequired  代表该参数是必须的
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Add);