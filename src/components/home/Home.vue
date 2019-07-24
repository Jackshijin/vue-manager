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
      <el-aside width="200px" class="el-aside">
        <!--侧边栏导航-->
        <el-menu :unique-opened="true">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-s-custom"></i>
              <span>用户列表</span>
            </el-menu-item>
          </el-submenu>

                    <!--2-->
          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>权限管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-user-solid"></i>
              <span>角色列表</span>
            </el-menu-item>
            <el-menu-item index="1-1">
              <i class="el-icon-s-cooperation"></i>
              <span>权限列表</span>
            </el-menu-item>
          </el-submenu>

          <!--3-->
          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商品管理</span>
            </template>

            <el-menu-item index="1-1">
              <i class="el-icon-s-goods"></i>
              <span>商品列表</span>
            </el-menu-item>

            <el-menu-item index="1-1">
              <i class="el-icon-s-order"></i>
              <span>分类参数</span>
            </el-menu-item>

            <el-menu-item index="1-1">
              <i class="el-icon-goods"></i>
              <span>商品分类</span>
            </el-menu-item>

          </el-submenu>

          <!--4-->
          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>订单管理</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-s-grid"></i>
              <span>订单列表</span>
            </el-menu-item>
          </el-submenu>

          <!--5-->
          <el-submenu index="5">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>数据统计</span>
            </template>
            <el-menu-item index="1-1">
              <i class="el-icon-s-data"></i>
              <span>数据报表</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

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
