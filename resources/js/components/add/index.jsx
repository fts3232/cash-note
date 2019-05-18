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
import {Link as RouterLink} from 'react-router-dom';
import axios from 'axios';
import MySnackbarContentWrapper from '../common/snackbar.jsx';
import Qs from 'qs';

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

let date = new Date();
let month = date.getMonth() + 1;
month = month < 10 ? '0' + month : month;
let year = date.getFullYear();
let day = date.getDay();
day = day < 10 ? '0' + day : day;

class Add extends React.Component {
    queue = [];

    state = {
        type       : 0,
        amount     : '',
        category   : 'c-1',
        remark     : '',
        categoryMap: [],
        date       : year + '-' + month + '-' + day,
        showTip:false
    };

    handleChange = name => event => {
        let value = event.target.value;
        if (name == 'type') {
            this.setState({'category': value == 0 ? 'c-1' : 'i-1'});
        }
        this.setState({[name]: value});
    };

    post = () => {
        const {state} = this;
        const _this = this;
        let data = {
            type    : state.type,
            amount  : state.amount,
            category: state.category,
            remark  : state.remark,
            date    : state.date
        }
        data = Qs.stringify(data)
        this.setState({showTip:true})
        axios.post('http://localhost/fts3232/workspace/installer/lumen/public/api/cashNote/add', data, {timeout: 5000}).then(function (response) {
            _this.setState({data: response.data.result,})
        }).catch(function (error) {
            console.log(error);
        });
    }

    render() {
        const {classes} = this.props;
        const {type,showTip} = this.state;
        const categoryMap = {
            'cost'  : [
                {
                    'label': "生活必要花费",
                    'items': [
                        {
                            label: '交通', value: 'c-1'
                        },
                        {
                            label: '餐饮', value: 'c-2'
                        },
                        {
                            label: '住宿', value: 'c-3'
                        },
                        {
                            label: '话费', value: 'c-4'
                        },
                        {
                            label: '剪发', value: 'c-5'
                        }
                    ]
                },
                {
                    'label': "其他",
                    'items': [
                        {
                            label: '交通', value: 'c-5'
                        },
                        {
                            label: '餐饮', value: 'c-6'
                        },
                        {
                            label: '住宿', value: 'c-7'
                        },
                        {
                            label: '网吧', value: 'c-8'
                        }
                        ,
                        {
                            label: '游戏', value: 'c-9'
                        }
                        ,
                        {
                            label: '购物', value: 'c-10'
                        }
                        ,
                        {
                            label: '大保健', value: 'c-11'
                        }
                    ]
                }
            ],
            'income': [
                {
                    label: '工资', value: 'i-1'
                },
                {
                    label: '其他', value: 'i-2'
                }
            ]
        };
        let categorys = type == 0 ? categoryMap.cost : categoryMap.income
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
                                shrink: true,
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
                            {categorys.map((category) => {
                                if (typeof category.items != 'undefined') {
                                    return (
                                        <optgroup label={category.label}>
                                            {category.items.map((items) => {
                                                return (<option value={items.value}>{items.label}</option>)
                                            })}
                                        </optgroup>
                                    )
                                } else {
                                    return (<option value={category.value}>{category.label}</option>)
                                }
                            })}
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
                <div style={{textAlign: 'right'}}>
                    <Button variant="contained" color="primary" component="span" className={classes.button} onClick={this.post}>
                        添加
                    </Button>
                    <Button variant="contained" component="span" className={classes.button} component={RouterLink} to="/">
                        取消
                    </Button>
                </div>
                <MySnackbarContentWrapper
                    variant="success"
                    message="添加成功！"
                    horizontal="center"
                    vertical="top"
                    ref={'tip'}
                    open={showTip}
                    onClose={(event, reason)=>{
                        if (reason === 'clickaway') {
                            return;
                        }
                        this.setState({showTip: false});
                    }}
                />
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