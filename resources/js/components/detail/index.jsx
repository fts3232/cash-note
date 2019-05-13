import PropTypes from 'prop-types';
import React from 'react';
import {withStyles} from '@material-ui/core/styles';
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

const styles = theme => ({
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
});

let id = 0;

function createData( type, amount, category,remark) {
    id += 1;
    return {id, type, amount, category,remark};
}

const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
];

class Dashboard extends React.Component {
    state = {
        data       : {
            income: [1, 2, 4, 8, 6, 23, 432, 2, 77, 13],
            cost  : [1, 2, 4, 8, 6, 323, 22, 66, 545, 2120]
        },
        day        : 30,
        page       : 0,
        rowsPerPage: 10,
        rowslength : 50,
    };

    getOptions(title) {
        //let {data} = this.state;
        let data = title == '收入' ? [{value: 335, name: '工资'},
            {value: 310, name: '其他'}] : [{value: 335, name: '生活花费'},
            {value: 310, name: '其他'}]
        return {
            //backgroundColor: '#2c343c',

            title: {
                text     : title,
                left     : 'center',
                top      : 20,
                textStyle: {
                    color: '#000'
                }
            },

            tooltip: {
                trigger  : 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },

            visualMap: {
                show   : false,
                min    : 80,
                max    : 600,
                inRange: {
                    colorLightness: [0, 1]
                }
            },
            series   : [
                {
                    name     : title,
                    type     : 'pie',
                    radius   : '55%',
                    center   : ['50%', '50%'],
                    data     : data.sort(function (a, b) {
                        return a.value - b.value;
                    }),
                    roseType : 'radius',
                    label    : {
                        normal: {
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    },
                    labelLine: {
                        normal: {
                            lineStyle: {
                                color: 'rgba(0, 0, 0, 0.3)'
                            },
                            smooth   : 0.2,
                            length   : 10,
                            length2  : 20
                        }
                    },
                    itemStyle: {
                        normal: {
                            color      : '#c23531',
                            shadowBlur : 200,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },

                    animationType  : 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay : function (idx) {
                        return Math.random() * 200;
                    }
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

    handleChangePage = (event, page) => {
        this.setState({page});
    };

    handleChangeRowsPerPage = event => {
        this.setState({page: 0, rowsPerPage: event.target.value});
    };

    render() {
        const {classes} = this.props;

        const {rowsPerPage, page, rowslength} = this.state
        return (
            <Grid container spacing={8}>
                <Grid item xs={6}>
                    <Paper>
                        <ReactEcharts option={this.getOptions('收入')} style={{height: '300px'}} onEvents={{
                            'click': this.onClick,
                        }}/>
                    </Paper>
                </Grid>
                <Grid item xs={6}>
                    <Paper>
                        <ReactEcharts option={this.getOptions('支出')} style={{height: '300px'}} onEvents={{
                            'click': this.onClick,
                        }}/>
                    </Paper>
                </Grid>
                <Grid item xs={12}>
                    <Paper>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell>类型</TableCell>
                                    <TableCell align="right">项目</TableCell>
                                    <TableCell align="right">金额</TableCell>
                                    <TableCell align="right">备注</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {rows.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell component="th" scope="row">
                                            {row.type == 1 ? '收入' : '支出'}
                                        </TableCell>
                                        <TableCell align="right">{row.category}</TableCell>
                                        <TableCell align="right" className={row.type == 1 ? classes.income : classes.cost}>
                                            {row.type == 1 ? '+' : '-' }{row.amount}
                                        </TableCell>
                                        <TableCell align="right">{row.remark}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                            <TableFooter>
                                <TableRow>
                                    <TablePagination
                                        rowsPerPageOptions={[5, 10, 25]}
                                        colSpan={3}
                                        count={rowslength}
                                        rowsPerPage={rowsPerPage}
                                        page={page}
                                        SelectProps={{
                                            native: true,
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

Dashboard.propTypes = { //isRequired  代表该参数是必须的
    classes: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array,
        PropTypes.object
    ]),
};

export default withStyles(styles)(Dashboard);