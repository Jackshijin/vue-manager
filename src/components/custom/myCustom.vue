<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item>首页</el-breadcrumb-item>
    <el-breadcrumb-item>{{level1}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{level2}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  name: 'my-bread',
  data() {
    return {
      // level1: '',
      // level2: ''
    }
  },
  // props 字符串数组 props 中的数据的值和data中数据用法一样 ；它的值来源于使用组件时传的值
  props: ['level1', 'level2']
}
</script>

<style>


</style>
