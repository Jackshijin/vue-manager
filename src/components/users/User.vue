<template>
 <el-card class="box-card">
   <!--1、面包屑-->
   <!--首页 / 用户管理 / 用户列表 -->
   <!--<el-breadcrumb separator-class="el-icon-arrow-right">-->
     <!--<el-breadcrumb-item>首页</el-breadcrumb-item>-->
     <!--<el-breadcrumb-item>用户管理</el-breadcrumb-item>-->
     <!--<el-breadcrumb-item>用户列表</el-breadcrumb-item>-->
   <!--</el-breadcrumb>-->
   <my-bread level1="用户管理" level2="用户列表"></my-bread>

   <!--2、搜索-->
    <el-row class="searchRow">
      <el-col>
        <el-input placeholder="请输入内容" v-model="query" clearable class="inputSearch" @clear="reloadUserList()">
          <el-button slot="append" icon="el-icon-search" @click="searchUser()"></el-button>
        </el-input>
        <el-button type="primary" plain @click.prevent="showEditUserData()">添加用户</el-button>
      </el-col>
    </el-row>

   <!--3、表格-->
   <el-table height="350px" :data="userList" style="width: 100%">
     <el-table-column type="index" label="#" width="60"></el-table-column>
     <el-table-column prop="username" label="姓名" width="80"></el-table-column>
     <el-table-column prop="email" label="邮箱"></el-table-column>
     <el-table-column prop="mobile" label="电话"></el-table-column>

     <el-table-column label="创建时间">
       <!--template 内部使用外部数据，设置slot-scope 属性,该属性目前已经废除，查看文档改用以下写法-->
       <template slot-scope="scope">
         <!--创建时间格式化-->
         {{scope.row.create_time | fmtdate}}
       </template>
     </el-table-column>

     <el-table-column prop="mg_state" label="用户状态">
       <template slot-scope="slotProps">
         <el-switch
           @change="changeMgData(slotProps.row)"
           v-model="slotProps.row.mg_state"
           active-color="#13ce66"
           inactive-color="#ff4949">
         </el-switch>
       </template>
     </el-table-column>

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
   <!--4、分页-->
   <!--@size-change:每页显示页码数变化时触发；@current-change：当前页码改变时 触发；current-page:当前页；
     page-size=[]：每页多少条的数据数组； page-size:设置显示多少条，默认数组第一个；total:数据总数-->
   <el-pagination
     @size-change="handleSizeChange"
     @current-change="handleCurrentChange"
     :current-page="pagenum"
     :page-sizes="[2, 4, 6, 8]"
     :page-size="2"
     layout="total, sizes, prev, pager, next, jumper"
     :total="total">
   </el-pagination>

   <!--添加用户对话框-->
   <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
     <el-form :model="form">
       <el-form-item label="用户名" :label-width="formLabelWidth">
         <el-input v-model="form.username" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="密码" :label-width="formLabelWidth">
         <el-input v-model="form.password" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" :label-width="formLabelWidth">
         <el-input v-model="form.email" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="电话" :label-width="formLabelWidth">
         <el-input v-model="form.mobile" autocomplete="off"></el-input>
       </el-form-item>

     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisible = false">取 消</el-button>
       <el-button type="primary" @click="addUserData()">确 定</el-button>
     </div>
   </el-dialog>

   <!--编辑用户对话框-->
   <el-dialog title="编辑用户" :visible.sync="dialogFormVisibleEdit">
     <el-form :model="form">
       <el-form-item label="用户名" :label-width="formLabelWidth">
         <el-input v-model="form.username" disabled autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="邮箱" :label-width="formLabelWidth">
         <el-input v-model="form.email" autocomplete="off"></el-input>
       </el-form-item>
       <el-form-item label="电话" :label-width="formLabelWidth">
         <el-input v-model="form.mobile" autocomplete="off"></el-input>
       </el-form-item>

     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisibleEdit = false">取 消</el-button>
       <el-button type="primary" @click="editUserInfo()">确 定</el-button>
     </div>
   </el-dialog>

   <!--分配角色的对话框 组件来自elementui-->
   <el-dialog title="分配角色" :visible.sync="dialogFormVisibleRole">
     <el-form :model="form">
       <el-form-item label="用户名" :label-width="formLabelWidth">
        {{currentUsername}}
       </el-form-item>

       <el-form-item label="角色" :label-width="formLabelWidth">

         <el-select v-model="currentRoleId">
           <el-option label="请选择" :value="-1"></el-option>
           <el-option :label="item.roleName"
                      :value="item.id"
                      v-for="(item, index) in roles" :key="index"></el-option>
         </el-select>

       </el-form-item>
     </el-form>
     <div slot="footer" class="dialog-footer">
       <el-button @click="dialogFormVisibleRole = false">取 消</el-button>
       <el-button type="primary" @click="setRole()">确 定</el-button>
     </div>
   </el-dialog>
 </el-card>
</template>

<script>
export default {
  data () {
    return {
      query: '',
      pagenum: 1,
      pagesize: 2,
      userList: [],
      // 分页数据
      total: -1,
      tableData: [],
      // 添加用户对话框的属性
      dialogFormVisible: false,
      formLabelWidth: '120px',
      // 添加的用户数据 form对象
      // username 用户名称 不能为空
      // password 用户密码 不能为空
      // email    用户邮箱  可以为空
      // mobile   用户电话  可以为空
      form: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 编辑用户属性
      dialogFormVisibleEdit: false,
      editUserId: -1,
      // 分配角色属性
      dialogFormVisibleRole: false,
      currentRoleId: -1,
      currentUserId: -1,
      currentUsername: '',
      roles: [] // 保存所有的角色

    }
  },
  created () {
    this.getUserList()
  },
  methods: {
    // 点击确定按钮发送请求 分配用户角色
    //请求路径：users/:id/role 请求方法：put :id-->要修改的用户id
    async setRole () {
      const res = await this.$http.put(`users/${this.currentUserId}/role`, {rid: this.currentRoleId})
      console.log(res)
      // 关闭对话框
      this.dialogFormVisibleRole = false
    },
    // 为用户分配角色
     async showSetUserRole (user) {
      this.currentUserId = user.id
       // 获取所有的角色 请求路径：roles 请求方法：get
      const resRole = await this.$http.get(`roles`)
       // 数据在 resRole.data.data 数组中，
       // 包含五个角色 id 为 30 31 34 38 39 40 对应主管 测试角色 和超级管理员等
      this.roles = resRole.data.data
      // console.log(resRole)
      // 显示用户名
      this.currentUsername = user.username

      // 请求路径：users/:id 请求方法：get 请求的角色id -->rid
      const res = await this.$http.get(`users/${user.id}`)
       // 打开对话框的时候显示对应用户的角色
      this.currentRoleId = res.data.data.rid
      // res 中 data: {id: 500, rid: 30, username: "admin", mobile: "12345678", email: "adsfad@qq.com"}
      // console.log(res)

       // 1、点击按钮打开对话框
      this.dialogFormVisibleRole = true
    },
    // 修改用户请求
    async changeMgData (user) {
      // 请求路径：users/:uId/state/:type  请求方法：put
      const res = await this.$http.put(`users/${user.id}/state/${user.mg_state}`)
      // console.log(res)
    },
    // 编辑用户后发送请求
    async editUserInfo () {
      const res = await this.$http.put(`users/${this.form.id}`, this.form)
      if (res.data.meta.status === 200) {
        // 1、关闭该编辑用户窗口
        this.dialogFormVisibleEdit = false
        // 2、更新视图
        this.getUserList()
        // 3、提示
        this.$message.success(res.data.meta.msg)
      }
      console.log(res)
    },
    // 编辑用户对话框
    showEditUser (userData) {
      // 1、显示对话框
      this.dialogFormVisibleEdit = true
      // 2、绑定要编辑的用户数据
      this.form = userData
    },
    // 删除用户功能
    showUserDelete (userId) {
      // 打开一个弹窗
      this.$confirm('删除该用户 是否继续?', '注意', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        // 发送删除请求
        const res = await this.$http.delete(`users/${userId}`)
        console.log(res)
        if (res.data.meta.status === 200) {
          this.pagenum = 1
          // 更新视图
          this.getUserList()
          // 提示
          this.$message({
            type: 'success',
            message: res.data.meta.msg
          })
        }
        this.$message({
          type: 'success',
          message: '删除成功!'
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    // 点击确定按钮发送请求，清空对话框，渲染数据到页面上
    async addUserData () {
      // 2、关闭对话框
      this.dialogFormVisible = false
      const res = await this.$http.post(`users`, this.form)
      const {meta: {status, msg}, data} = res.data
      if (status === 201) {
        // 1、提示
        this.$message.success(msg)
        // 3、更新视图
        this.getUserList()
        // 4、清空对话框
        this.form = {}
      } else {
        this.$message.warning(msg)
      }
    },
    // 显示添加用户对话框方法
    showEditUserData () {
      this.form = {}
      this.dialogFormVisible = true
    },
    // 清空重新加载用户
    reloadUserList () {
      this.getUserList()
    },
    // 搜索用户功能
    searchUser () {
      this.getUserList()
    },
    // 分页相关的写法
    handleSizeChange (val) {
      console.log(`每页 ${val} 条`)
      this.pagesize = val
      this.pagenum = 1
      this.getUserList()
    },
    handleCurrentChange (val) {
      console.log(`当前页: ${val}`)
      this.pagenum = val
      this.getUserList()
    },
    // 获取用户列表请求
    async getUserList () {
      //   query    | 查询参数     | 可以为空 |
      // | pagenum  | 当前页码     | 不能为空 |
      // | pagesize | 每页显示条数 | 不能为空

      // 需要授权的 API ，必须在请求头中使用 `Authorization` 字段提供 `token` 令牌
      // const AUTH_TOKEN = localStorage.getItem('token')
      // this.$http.defaults.headers.common['Authorization'] = AUTH_TOKEN

      const res = await this.$http.get(`users?query=${this.query}&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
      // console.log(res)
      const {meta: {status, msg}, data: {users, total}} = res.data
      if (status === 200) {
        // 1、给表格数据赋值
        this.userList = users
        // 2、total赋值
        this.total = total
        // 3、成功提示
        // this.$message.success(msg)
      } else {
        this.$message.warning(msg)
      }
    }
  }
}
</script>

<style>
  .box-card {
    height: 100%;
  }
  .inputSearch {
    width: 300px;
  }
  .searchRow {
    margin-top: 20px;
  }
</style>
