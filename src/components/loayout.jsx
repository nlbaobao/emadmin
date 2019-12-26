import React from "react";

import { Layout, Menu, Icon } from "antd";
import config from './config'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import './index.less'
export default class layout extends React.Component {
  render() {
    const skeys = window.location.hash.split('/home')[1]
    // const openKeys = []
    // config.config.menuData.forEach(element => {
    //   element.child&&element.child.forEach(item=>{
    //     if(item.url === skeys){
    //       openKeys.push(element.key)
    //     }
    //   })
    // });
    const { children } = this.props;
    const { menuData } = config.config
    const menu = menuData.map(item => {
      return (


        <SubMenu
          key={item.key}
          // onClick={()=>{
          //   this.setState({

          //   })
          // }}
          title={
            <span>
              <Icon type="user" />
              {item.name}
            </span>
          }
        >
          {item.child && item.child.map(ele => {
           
            return (<Menu.Item  onClick={()=>{
              location.hash ='/home'+ele.url 
            }} key={ele.url}>{ele.subName}</Menu.Item>
            )
          })}
        </SubMenu>


      )
    })
    return (
      <div className='container'>
        <Layout style={{ height: '100%' }}>
          <Header className="header">
            <div className="logo" >
              {/* <Icon type="slack" /> */}
              <span className='logo-title'>妆小样后台管理</span>
            </div>
          </Header>
          <Layout>
            <Sider className='sider'>
              <Menu
                mode="inline"
                theme='dark'
                style={{ height: "100%", borderRight: 0 }}
                selectedKeys={skeys}
                // openKeys={openKeys}
              >
                {menu}
              </Menu>
            </Sider>
            <Layout style={{ padding: "24px" }}>
              <Content
                style={{
                  background: "#fff",
                  padding: 24,
                  height: '100%',
                  margin: 0,

                }}
              >
                {children}
              </Content>
            </Layout>
          </Layout>
        </Layout>
      </div>
    );
  }
}
