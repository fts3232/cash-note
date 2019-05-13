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
import { Link as RouterLink } from 'react-router-dom'

const styles = theme => ({
    title : {
        fontSize: 14,
    },
    income: {
        color: 'green'
    },
    cost  : {
        color: 'red'
    },
    bar   : {
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
    cardAction:{
        display:'block',
        textAlign: 'right'
    }
});

class Dashboard extends React.Component {
    state = {
        data: {
            income: [1, 2, 4, 8, 6, 23, 432, 2, 77, 13],
            cost  : [1, 2, 4, 8, 6, 323, 22, 66, 545, 2120]
        },
        day : 30,
    };

    getOptions() {
        let {data} = this.state;
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
                    data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月']
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

    onClick = () => {
        this.setState({
            data: {
                income: [10000, 2, 4, 8, 6, 23, 432, 2, 77, 13],
                cost  : [1, 2, 4, 8, 6, 323, 22, 66, 545, 2120]
            }
        })
    }

    render() {
        const {classes} = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                总收入
                            </Typography>
                            <Typography variant="h5" component="h5" className={classes.income}>
                                1,256.50
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>
                <Grid item xs={6}>
                    <Card>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                总支出
                            </Typography>
                            <Typography variant="h5" component="h2" className={classes.cost}>
                                12,018.80
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