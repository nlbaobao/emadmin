import React, { Component } from "react";
import { Tag, Input, Button, Row, Col, message } from "antd";
export default class TestTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      value: '',
      floor: 0,
      count: 0
    };
    this.test = [{
      title: '华为'
    }, {
      title: '三星',
    }, {
      title: '乐视',
    }, {
      title: '特等奖',
    }, {
      title: '点击',
    }, {
      title: 'QQ',
    }, {
      title: '谢谢参与',
    }, {
      title: '优惠卷',
    }, {
      title: '苹果',
    }],
      this.count = 0
    this.timmer = null
  }
  componentDidMount() {
  }

  math() {
    this.count++
    console.log(this.count)
    var num = Math.floor(Math.random() * 9);
    this.setState({
      floor: num === 4 ? 0 : num,
    })
    if (this.count > 20) {
      clearInterval(this.timmer)
      this.count = 0
    }

  }
  renderColor(index) {
    if (index < 1) {
      return 'magenta'
    }
    else if (index > 1 && index < 5) {
      return 'geekblue'
    }
    else {
      return 'volcano'
    }
  }
  renderBackGround(index){
    const {floor} = this.state
    if(index===4){
      return 'orange'
    }
    if(index===floor&&index!==4){
      return '#eee'
    }
    else{
      return 'white'
    }
  }

  render() {
    const { data, value, floor, count } = this.state;
    return (
      <div style={{ width: '510px', margin: '0 auto', padding: 20 }}>
        <Row>
          <Col style={{ height: '32px', lineHeight: '32px' }} span={4}>添加标签:</Col>
          <Col span={16}><Input value={value} onChange={(e) => {
            this.setState({
              value: e.target.value.trim()
            })
          }} /></Col>
          <Col offset={1} span={3}>  <Button onClick={() => {
            value === '' ? null : data.push(value)
            this.setState({
              data,
              value: ''
            })
          }}>添加</Button></Col>
        </Row>

        {data.map((item, index) => {
          return (
            <Tag style={{ marginTop: 20 }} color={this.renderColor(index)} key={index}>{item}</Tag>
          )
        })}
        <Row style={{ marginTop: 20 }}>
          {this.test.map((item, index) => {
            return (
              <Col key={index} span={8}><div onClick={() => {
                if (index === 4&&this.count==0) {
                  this.timmer = setInterval(() => {
                    this.math()
                  }, 100)
                }else if(index === 4&&this.count!==0){
                  message.info('正在抽奖......')
                }

              }} style={{ width: 168, justifyContent: 'center', border: '1px solid #000', height: 168, display: 'flex', alignItems: 'center', background: `${this.renderBackGround(index)}`, cursor: `${index === 4 ? 'pointer' : 'normal'}` }}>{item.title}</div></Col>
            )
          })}


        </Row>
      </div>

    );
  }
}
