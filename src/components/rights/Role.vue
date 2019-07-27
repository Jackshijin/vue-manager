<template>
    <el-card>
      <!--面包屑-->
      <my-bread level1="权限列表" level2="角色列表"></my-bread>
      <!--按钮-->
      <el-row class="addRoleBtn">
        <el-col>
          <el-button type="info">添加角色</el-button>
        </el-col>
      </el-row>

      <!--角色表格-->
      <el-table height="400px" :data="roleList" style="width: 100%">
        <el-table-column type="expand" width="80">
          <template slot-scope="scope">
            <el-row v-for="(item1,index) in scope.row.children" :key="index">
              <el-col :span="4">
                <el-tag>{{item1.authName}}</el-tag>
              </el-col>
              <el-col :span="20">

                <el-row v-for="(item2, index) in item1.children" :key="index">
                  <el-col :span="4">
                    <el-tag>{{item2.authName}}</el-tag>
                  </el-col>
                  <el-col :span="20">
                    <el-tag v-for="(item3, index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>

        <el-table-column type="index" label="#" width="150"></el-table-column>

        <el-table-column prop="roleName" label="角色名称" width="200"></el-table-column>
        <el-table-column prop="roleDesc" label="角色描述" width="250"></el-table-column>

        <el-table-column
          prop="address"
          label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showEditUser(scope.row)"></el-button>
              <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="showUserDelete(scope.row.id)"></el-button>
              <el-button type="success" size="mini" plain icon="el-icon-check" circle @click="showSetUserRole(scope.row)"></el-button>
            </el-row>
          </template>
        </el-table-column>

      </el-table>
    </el-card>
</template>

<script>
 export default {
   name: "Role",
   created() {
     this.getRoleList()
   },
   data() {
     return {
       roleList: []
     }
   },
   methods: {
     async getRoleList() {

       const res = await this.$http.get(`roles`)
       console.log(res) // 数据在 res.data.data 中
       this.roleList = res.data.data
     }
   }
 }
</script>

<style>
  .addRoleBtn {
    margin-top: 15px;
  }
</style>
