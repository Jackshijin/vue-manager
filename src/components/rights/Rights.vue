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
    <el-table :data="rightList" border style="width: 100%" height="500px" class="el-table-right">
      <el-table-column type="index" label="#" width="80" align="center"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180" align="center"></el-table-column>
      <el-table-column prop="path" label="路径" align="center"></el-table-column>

      <el-table-column label="层级" align="center">
      <template slot-scope="scope">
        <span v-if="scope.row.level === '0'">一级</span>
        <span v-if="scope.row.level === '1'">二级</span>
        <span v-if="scope.row.level === '2'">三级</span>
      </template>
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
  export default {
    name: "Rights.vue",
    created() {
      this.getRightList()
    },
    methods: {
      // 获取所有权限列表 请求路径：rights/:type  请求方法：get
      async getRightList() {
        // 获取授权 ---通过token值
        // const AUTH_TOKEN = localStorage.getItem('token')
        // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN
        const res = await this.$http.get(`rights/list`)
        console.log(res) // 数据在 res.data.data 中
        this.rightList = res.data.data

      }
    },
    data() {
      return {
        rightList: []
      }
    }
  }
</script>

<style>
.el-table-right {
  margin-top: 15px;
}
</style>
