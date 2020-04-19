import React, { Component } from 'react';
import { message, Button, Table, Form, Col, Row, Select, Pagination, Popover, Tooltip } from 'antd';
import moment from 'moment';
// import echarts from "echarts";
import { ajax, uuid } from '../../utils/index';
import { observer, inject } from 'mobx-react';
import config from '../../components/config';
import './data.less';
const { Option } = Select;
@inject('PublicStatus')
@observer
export class DataEchart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      visible: false,
      dratype: '1', // 1代表新增
      searchType: '',
      status: '',
      page: 1,
      size: 10,
      total: 0,
      fileList: [],
      bannerId: '',
    };
    this.imgIp = config.config.imgIp;
  }
  componentDidMount() {
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('main'));
    // 绘制图表
    myChart.setOption({
      title: {
        text: 'ECharts 入门示例',
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      },
      yAxis: {},
      series: [
        {
          name: '销量',
          type: 'bar',
          data: [5, 20, 36, 10, 10, 20],
        },
      ],
    });
    var myChart = echarts.init(document.getElementById('pie'));
    // 绘制图表
    myChart.setOption({
      tooltip: {
        trigger: 'item',
        formatter: '{a} <br/>{b}: {c} ({d}%)',
      },
      legend: {
        orient: 'vertical',
        left: 10,
        data: ['直接访问', '邮件营销', '联盟广告', '视频广告', '搜索引擎'],
      },
      series: [
        {
          name: '访问来源',
          type: 'pie',
          radius: ['50%', '70%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: false,
              position: 'center',
            },
            emphasis: {
              show: true,
              textStyle: {
                fontSize: '30',
                fontWeight: 'bold',
              },
            },
          },
          labelLine: {
            normal: {
              show: false,
            },
          },
          data: [
            { value: 335, name: '直接访问' },
            { value: 310, name: '邮件营销' },
            { value: 234, name: '联盟广告' },
            { value: 135, name: '视频广告' },
            { value: 1548, name: '搜索引擎' },
          ],
        },
      ],
    });
    var myChart = echarts.init(document.getElementById('line-simple'));
    // 绘制图表
    myChart.setOption({
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      },
      yAxis: {
        type: 'value',
      },
      series: [
        {
          data: [820, 932, 901, 934, 1290, 1330, 1320],
          type: 'line',
        },
      ],
    });
  }

  render() {
    return (
      <div className="banner-list">
        <div style={{ width: 500, height: 500 }} id="main"></div>;
        <div style={{ width: 500, height: 500 }} id="pie"></div>;
        <div style={{ width: 500, height: 500 }} id="line-simple"></div>;
      </div>
    );
  }
}
export default Form.create()(DataEchart);
