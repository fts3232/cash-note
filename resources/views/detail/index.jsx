import PropTypes from 'prop-types';
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import ReactEcharts from 'echarts-for-react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableFooter from '@material-ui/core/TableFooter';
import Paper from '@material-ui/core/Paper';
import { categoryMap } from 'fts/config/app.js';
import axios from 'axios';

const styles = theme => ({
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
    }
});

class Dashboard extends React.Component {
    state = {
        data: {
            income: [],
            cost  : []
        },
        page       : 0,
        rowsPerPage: 10,
        count      : 0,
        rows       : []
    };

    componentDidMount() {
        this.getData();
    }

    getOptions(title) {
        let { data } = this.state;
        data = title === '收入' ? data.income : data.cost;
        const legend = [];
        for (const x in categoryMap) {
            legend.push(categoryMap[x]);
        }
        return {
            title: {
                text: title,
                x   : 'center'
            },
            tooltip: {
                trigger  : 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
            },
            legend: {
                type  : 'scroll',
                orient: 'vertical',
                right : 10,
                top   : 20,
                bottom: 20,
                data  : legend
            },
            series: [
                {
                    name     : '访问来源',
                    type     : 'pie',
                    radius   : '55%',
                    center   : ['50%', '50%'],
                    data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur   : 10,
                            shadowOffsetX: 0,
                            shadowColor  : 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
    }

    onClick = () => {
        console.log(1);
    };

    handleChangePage = (event, page) => {
        const _this = this;
        this.setState({ page }, () => {
            _this.getData();
        });
    };

    handleChangeRowsPerPage = event => {
        const _this = this;
        this.setState({ page: 0, rowsPerPage: event.target.value }, () => {
            _this.getData();
        });
    };

    getData = () => {
        const { page, rowsPerPage } = this.state;
        const { date } = this.props.match.params;
        const params = {
            'getRows'   : 1,
            'page'      : page + 1,
            'size'      : rowsPerPage,
            'getPieData': 1
        };
        if (date) {
            params.date = date;
        }
        const _this = this;
        axios.get('http://localhost/fts3232/workspace/installer/lumen/public/api/cashNote/fetch', { params }, { timeout: 5000 }).then((response) => {
            const { pieData } = response.data;
            pieData.income.map((v) => {
                v.name = categoryMap[v.name];
                return v;
            });
            pieData.cost.map((v) => {
                v.name = categoryMap[v.name];
                return v;
            });
            _this.setState({
                'data' : pieData,
                'rows' : response.data.rows,
                'count': response.data.count
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    render() {
        const { classes } = this.props;

        const { rowsPerPage, page, rows, count } = this.state;
        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Paper>
                        <ReactEcharts
                            option={this.getOptions('收入')}
                            style={{ height: '300px' }}
                            onEvents={{
                                'click': this.onClick
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <ReactEcharts
                            option={this.getOptions('支出')}
                            style={{ height: '300px' }}
                            onEvents={{
                                'click': this.onClick
                            }}
                        />
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>项目</TableCell>
                                    <TableCell align="right">金额</TableCell>
                                    <TableCell align="right">备注</TableCell>
                                    <TableCell align="right">日期</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                { rows.map(row => (
                                    <TableRow key={row.ROW_ID}>
                                        <TableCell component="th" scope="row">{ categoryMap[row.CATEGORY] }</TableCell>
                                        <TableCell align="right" className={row.TYPE === 1 ? classes.income : classes.cost}>
                                            { row.TYPE === 1 ? '+' : '-' }{ row.AMOUNT }
                                        </TableCell>
                                        <TableCell align="right">{ row.REMARK }</TableCell>
                                        <TableCell align="right">{ row.DATE }</TableCell>
                                    </TableRow>
                                )) }
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={count}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true
                                        }}
                                        onChangePage={this.handleChangePage}
                                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                                    />
                                </TableRow>
                            </TableFooter>
                        </Table>
                    </Paper>
                </Grid>
            </Grid>

        );
    }
}

Dashboard.propTypes = { // isRequired  代表该参数是必须的
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Dashboard);