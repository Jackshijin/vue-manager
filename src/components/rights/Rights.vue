<template>
  <el-card>
    <!--面包屑-->
    <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
      <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>权限管理</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>权限列表</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--自定义组件的使用-->
    <my-bread level1="权限管理" level2="权限列表"></my-bread>
    <!--表格-->
  </el-card>
</template>

<script>
    export default {
        name: "Rights.vue"
    }
</script>

<style>

</style>
