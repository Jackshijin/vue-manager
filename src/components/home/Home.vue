<template>
  <el-container class="el-container">
    <el-header class="el-header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.jpg" alt="无法显示图片">
          </div>
        </el-col>

        <el-col :span="18" class="middle-title">
          <h3>后台管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            <a class="login-out" href="#">退出</a>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside width="200px" class="el-aside">Aside</el-aside>
      <el-main class="el-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {

}
</script>

<style>
.el-container {
  height: 100%;
}
.el-header {
  background-color: #b3c0d1;
  padding: 0;
}
.el-aside {
  background-color: #d3dce6;
}
.el-main {
  background-color: #e9eef3;
  height: 100%;
}
  /*头部样式*/
 .middle-title {
   text-align: center;
 }
 .login-out {
   line-height: 60px;
   text-decoration: none;
   /*text-align: center;*/
 }
 img {
  height: 60px;
  width: 200px;
}
</style>
