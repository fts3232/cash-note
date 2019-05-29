import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import ReactEcharts from 'echarts-for-react';
import { Link as RouterLink } from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    title: {
        fontSize: 14
    },
    income: {
        color: theme.income
    },
    cost: {
        color: theme.cost
    },
    bar: {
        '& .ct-series-a': {
            '& .ct-bar': {
                stroke: theme.income
            }
        },
        '& .ct-series-b': {
            '& .ct-bar': {
                stroke: theme.cost
            }
        }
    },
    cardAction: {
        display  : 'block',
        textAlign: 'right'
    },
    chip: {
        marginRight: '5px'
    }
});


class Dashboard extends React.Component {
    state = {
        data: {
            income: [],
            cost  : []
        },
        grossIncome     : '0.00',
        totalExpenditure: '0.00'
    };

    componentDidMount() {
        this.getData();
    }

    getOptions() {
        const { data } = this.state;
        const date = new Date();
        let currentMonth = date.getMonth() + 1;
        let currentYear = date.getFullYear();
        const xAxisData = [];
        for (let i = 12; i > 0; i--) {
            if (currentMonth < 10) {
                currentMonth = `0${  currentMonth }`;
            }
            xAxisData.push(`${ currentYear  }-${  currentMonth }`);
            currentMonth -= 1;
            if (currentMonth <= 0) {
                currentMonth = 12;
                currentYear -= 1;
            }
        }
        xAxisData.reverse();
        return {
            tooltip: {
                trigger    : 'axis',
                axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                    type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            legend: {
                data: ['收入', '支出']
            },
            grid: {
                left        : '3%',
                right       : '4%',
                bottom      : '3%',
                containLabel: true
            },
            xAxis: [
                {
                    type: 'category',
                    data: xAxisData
                }
            ],
            yAxis: [
                {
                    type: 'value'
                }
            ],
            series: [
                {
                    name: '收入',
                    type: 'bar',
                    data: data.income
                },
                {
                    name: '支出',
                    type: 'bar',
                    data: data.cost
                }
            ]
        };
    };

    getData = () => {
        const params = {
            'getGrossIncome'     : 1,
            'getTotalExpenditure': 1,
            'getMonthData'       : 1
        };
        const _this = this;
        axios.get('http://localhost/fts3232/workspace/installer/lumen/public/api/cashNote/fetch', { params }, { timeout: 5000 }).then((response) => {
            _this.setState({
                'data'            : response.data.monthData,
                'grossIncome'     : response.data.grossIncome,
                'totalExpenditure': response.data.totalExpenditure
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    onClick = (v) => {
        this.props.history.push(`/detail/${  v.name }`);
    };

    numberFormat = (num) => {
        return num.replace(/\d+/, (s) => {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        });
    };

    render() {
        const { classes } = this.props;
        const { grossIncome, totalExpenditure } = this.state;
        return (
            <Grid container spacing={8}>
                <Grid item xs={4}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                总收入
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.income}>
                                { this.numberFormat(grossIncome) }
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
                                { this.numberFormat(totalExpenditure) }
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
                                { this.numberFormat((grossIncome - totalExpenditure).toFixed(2)) }
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card>
                        <CardContent>
                            <ReactEcharts
                                option={this.getOptions()}
                                style={{ height: '500px' }}
                                onEvents={{
                                    'click': this.onClick
                                }}
                            />
                        </CardContent>
                        <CardActions className={classes.cardAction}>
                            <Button size="small" color="primary" component={RouterLink} to="/detail/">
                                查看更多
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>
        );
    }
}

Dashboard.propTypes = { // isRequired  代表该参数是必须的
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);