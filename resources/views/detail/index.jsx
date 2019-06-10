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
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
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
        page            : 0,
        rowsPerPage     : 10,
        count           : 0,
        rows            : [],
        grossIncome     : '0.00',
        totalExpenditure: '0.00'
    };

    componentDidMount() {
        this.getData();
        this.props.history.listen((location) => {
            this.getData();
        });
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
                    name     : title,
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

    onClick = (event) => {
        this.props.history.push(`${ location.pathname }${ event.data.category }`);
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
        let { date, category } = this.props.match.params;
        const params = {
            'getRows'            : 1,
            'page'               : page + 1,
            'size'               : rowsPerPage,
            'getGrossIncome'     : 1,
            'getTotalExpenditure': 1,
            'getPieData'         : 1
        };
        if (date) {
            if (date.indexOf('c-') !== -1 || date.indexOf('i-') !== -1) {
                category = date;
                date = null;
            } else {
                params.date = date;
            }
        }
        if (category) {
            params.category = category;
        }
        const _this = this;
        axios.get('http://localhost/fts3232/workspace/installer/lumen/public/api/cashNote/fetch', { params }, { timeout: 5000 }).then((response) => {
            const { pieData } = response.data;
            pieData.income.map((v) => {
                v.name = categoryMap[v.category];
                return v;
            });
            pieData.cost.map((v) => {
                v.name = categoryMap[v.category];
                return v;
            });
            _this.setState({
                'data'            : pieData,
                'rows'            : response.data.rows,
                'count'           : response.data.count,
                'grossIncome'     : response.data.grossIncome,
                'totalExpenditure': response.data.totalExpenditure
            });
        }).catch((error) => {
            console.log(error);
        });
    };

    numberFormat = (num) => {
        return num.replace(/\d+/, (s) => {
            return s.replace(/(\d)(?=(\d{3})+$)/g, '$1,');
        });
    };

    render() {
        const { classes } = this.props;

        const { rowsPerPage, page, rows, count, grossIncome, totalExpenditure } = this.state;
        let { date, category } = this.props.match.params;
        if (date) {
            if (date.indexOf('c-') !== -1 || date.indexOf('i-') !== -1) {
                category = date;
                date = null;
            }
        }
        return (
            <Grid container spacing={8}>
                { category === undefined || category.indexOf('i-') !== -1 ? (
                    <Grid item xs={category === undefined ? 4 : 12}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    { date } { category === undefined ? null : categoryMap[category] } 收入
                                </Typography>
                                <Typography variant="h5" component="h5" className={classes.income}>
                                    { this.numberFormat(grossIncome) }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : null }
                { category === undefined || category.indexOf('c-') !== -1 ? (
                    <Grid item xs={category === undefined ? 4 : 12}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    { date } { category === undefined ? null : categoryMap[category] } 支出
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.cost}>
                                    { this.numberFormat(totalExpenditure) }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : null }
                { category === undefined ? (
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Typography className={classes.title} color="textSecondary" gutterBottom>
                                    { date } 净值
                                </Typography>
                                <Typography variant="h5" component="h2" className={classes.income}>
                                    { this.numberFormat((grossIncome - totalExpenditure).toFixed(2)) }
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ) : null }
                { category === undefined ? (
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
                ) : null }
                { category === undefined ? (
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
                ) : null }
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