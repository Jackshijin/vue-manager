

# Vue实战小项目 后台管理系统

> 作者：Jackshijijn

# vue-manager

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

## 基本架构和功能

>登录页 根据登录的不同用户展示不同的权限页面


>用户管理
>>用户列表
>>用户搜索
>>添加用户
>>编辑用户信息、分配角色

>权限管理
>>权限列表（一、二、三级权限展示）
>>角色列表--添加角色 编辑角色 删除角色 修改权限


>商品管理
>>商品列表 --- 添加商品 搜索商品 编辑和删除商品信息
>>分类参数 --- 动态和静态参数的添加和编辑
>>商品分类 --- 添加分类  修改商品分类 删除商品分类


>订单管理
>>订单列表 修改地址  物流信息 （接口里没有）

>数据统计
>>数据报表 展示后台返回的数据

### 该后台管理系统的后台代码是node写的，接口和api-server均是来自网络资源 

## 用到的技术栈和库

*  vue  element-ui localstorage 
* axios echarts
* 前端部分： es6简化开发流程  axios 实现API 请求

## 说明

    接口文档在开发文档.md  数据库文件是 vue-manager.sql  后台源码是api-server（来源于网络，部分接口不完善） 需自己配置数据库账号密码
    大量使用element-ui中的组件  原生方法几乎没有
    
## 心得教训
        学不动就回家养猪
