import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactEcharts from 'echarts-for-react';
import {Link as RouterLink} from 'react-router-dom';
import Chip from '@material-ui/core/Chip';
import axios from 'axios';

const styles = theme => ({
    title     : {
        fontSize: 14,
    },
    income    : {
        color: 'green'
    },
    cost      : {
        color: 'red'
    },
    bar       : {
        '& .ct-series-a': {
            '& .ct-bar': {
                stroke: 'green'
            }
        },
        '& .ct-series-b': {
            '& .ct-bar': {
                stroke: 'red'
            }
        }
    },
    cardAction: {
        display  : 'block',
        textAlign: 'right'
    },
    chip      : {
        marginRight: '5px'
    }
});

class Dashboard extends React.Component {
    state = {
        data            : {
            income: [1, 2, 4, 8, 6, 23, 432, 2, 77, 13],
            cost  : [1, 2, 4, 8, 6, 323, 22, 66, 545, 2120]
        },
        queryDay        : 'all',
        grossIncome     : '0.00',
        totalExpenditure: '0.00',
    };

    getOptions() {
        let { data, queryDay } = this.state;
        let date = new Date();
        let currentMonth = date.getMonth() + 1;
        let xAxisData = [];
        for (let i = 12; i > 0; i--) {
            xAxisData.push(currentMonth + '月')
            console.log(currentMonth + '月');
            currentMonth -=1;
            if(currentMonth <= 0){
                currentMonth = 12;
            }
        }
        return {
            tooltip: {
                trigger    : 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend : {
                data: ['收入', '支出']
            },
            grid   : {
                left        : '3%',
                right       : '4%',
                bottom      : '3%',
                containLabel: true
            },
            xAxis  : [
                {
                    type: 'category',
                    data: xAxisData
                }
            ],
            yAxis  : [
                {
                    type: 'value'
                }
            ],
            series : [
                {
                    name: '收入',
                    type: 'bar',
                    data: data.income,
                },
                {
                    name: '支出',
                    type: 'bar',
                    data: data.cost
                }
            ]
        };
    }

    handleClick = (day) => () => {
        this.setState({queryDay: day},() => {
            this.getData()
        })
    };

    getData = () => {
        const {queryDay} = this.state;
        let params = {
            queryDay: queryDay
        };
        axios.get('api/user/fetch', {params: params}, {timeout: 5000}).then(function (response) {
            this.setState(response.data.result)
        }).catch(function (error) {
            console.log(error);
        });
    };

    numberFormat = (num) => {
        return num.replace(/\d+/, function(s){
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,')
        })
    };

    render() {
        const {classes} = this.props;
        const {queryDay, grossIncome, totalExpenditure} = this.state;
        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Chip label="最近1个月" color={queryDay === '1month' ? 'primary' : ''} onClick={this.handleClick('1month')} className={classes.chip}/>
                    <Chip label="最近3个月" color={queryDay === '3month' ? 'primary' : ''} onClick={this.handleClick('3month')} className={classes.chip}/>
                    <Chip label="最近6个月" color={queryDay === '6month' ? 'primary' : ''} onClick={this.handleClick('6month')} className={classes.chip}/>
                    <Chip label="最近1年" color={queryDay === '1year' ? 'primary' : ''} onClick={this.handleClick('1year')} className={classes.chip}/>
                    <Chip label="全部" color={queryDay === 'all' ? 'primary' : ''} onClick={this.handleClick('all')} className={classes.chip}/>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                总收入
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.income}>
                                {this.numberFormat(grossIncome)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                总支出
                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.cost}>
                                {this.numberFormat(totalExpenditure)}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                净值
                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.income}>
                                {this.numberFormat((grossIncome - totalExpenditure).toFixed(2))}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ReactEcharts option={this.getOptions()} style={{height: '500px'}} onEvents={{
                                'click': this.onClick,
                            }}/>
                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" color="primary" component={RouterLink} to="/fts3232/cash-note/public/detail/">
                                查看更多
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = { //isRequired  代表该参数是必须的
    classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};

export default withStyles(styles)(Dashboard);