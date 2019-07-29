<template>
    <el-card>
      <!--面包屑-->
      <my-bread level1="权限列表" level2="角色列表"></my-bread>
      <!--按钮-->
      <el-row class="addRoleBtn">
        <el-col>
          <el-button type="info" @click="showAddRoleData()">添加角色</el-button>
        </el-col>
      </el-row>

      <!--角色表格-->
      <el-table height="400px" :data="roleList" style="width: 100%">
        <el-table-column type="expand" width="80">
          <template slot-scope="scope">
            <el-row v-for="(item1,index) in scope.row.children" :key="index">
              <el-col :span="4">
                <el-tag @close="deleteRight(scope.row
                ,item1.id)" type="" closable>{{item1.authName}}</el-tag>
                <i class="el-icon-arrow-right"></i>
              </el-col>
              <el-col :span="20">

                <el-row v-for="(item2, index) in item1.children" :key="index">
                  <el-col :span="4">
                    <el-tag @close="deleteRight(scope.row,item2.id)" type="success" closable>{{item2.authName}}</el-tag>
                    <i class="el-icon-arrow-right"></i>
                  </el-col>
                  <el-col :span="20">
                    <el-tag @close="deleteRight(scope.row,item3.id)" type="warning" closable v-for="(item3, index) in item2.children" :key="index">{{item3.authName}}</el-tag>
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
            <!--未分配权限时的提示-->
            <span v-if="scope.row.children.length === 0" class="noRightTip">未为该角色分配权限</span>
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
              <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showRoleEdit(scope.row)"></el-button>
              <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="showRoleDelete(scope.row.id)"></el-button>
              <el-button type="success" size="mini" plain icon="el-icon-check" circle @click="showSetRight(scope.row)"></el-button>
            </el-row>
          </template>
        </el-table-column>

      </el-table>
      <!--修改权限对话框-->
      <el-dialog title="修改权限" :visible.sync="dialogFormVisibleRight">
        <!--
        树形结构
        data: 展示数据  show-checkbox: 展示选择的方框  node-key:树形结构中节点的唯一标识
        default-expanded-keys: 默认展开的节点，为数组    default-checked-keys: 默认选择的节点，数据类型也是数组
        props: 配置选项，包括label:指定节点标签为节点对象的某个属性值；children:指定子树为节点对象的某个属性值
               disabled:指定节点选择框是否禁用为节点的某个属性值    isLeaf:指定节点是否为子节点，需要指定lazy属性
        -->
        <el-tree
          ref="tree"
          :data="treeList"
          default-expand-all
          :default-checked-keys="arrChecked"
          show-checkbox
          node-key="id"
          :props="defaultProps">
        </el-tree>

        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRight = false">取 消</el-button>
          <el-button type="primary" @click="setRoleRight()">确 定</el-button>
        </div>
      </el-dialog>

      <!--编辑角色对话框-->
      <el-dialog title="编辑角色" :visible.sync="dialogFormVisibleRoleEdit">
        <el-form :model="form">
          <el-form-item label="角色ID" :label-width="formLabelWidth">
            <el-input v-model="form.roleId" disabled autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="form.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="form.roleDesc" autocomplete="off"></el-input>
          </el-form-item>

        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleRoleEdit = false">取 消</el-button>
          <el-button type="primary" @click="editRoleData()">确 定</el-button>
        </div>
      </el-dialog>

      <!--添加角色对话框-->
      <el-dialog title="添加角色" :visible.sync="dialogFormVisibleAddRole">
        <el-form :model="formRole">
          <el-form-item label="角色名称" :label-width="formLabelWidth">
            <el-input v-model="formRole.roleName" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="角色描述" :label-width="formLabelWidth">
            <el-input v-model="formRole.roleDesc" autocomplete="off"></el-input>
          </el-form-item>


        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisibleAddRole = false">取 消</el-button>
          <el-button type="primary" @click="addRoleData()">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
</template>

<script>
 export default {
   name: "Role",
   created () {
     this.getRoleList()
   },
   data() {
     return {
       // 添加角色数据
       dialogFormVisibleAddRole: false,
       form: {
         roleId: '',
         roleName: '',
         roleDesc: ''
       },
       data1:{},
       dialogFormVisibleRight:false,
       roleList: [],
       // 树形结构数据
       treeList: [],
       defaultProps: {
         label: 'authName',
         children: 'children'
       },
       arrExpand: [],
       arrChecked: [],
       currentRoleId: -1,
       // 编辑角色数据
       dialogFormVisibleRoleEdit: false,
       formLabelWidth: '120px',
       formRole: {
         roleName: '',
         roleDesc: ''
       }
     }
   },
   methods: {
     // 点击添加角色按钮，显示弹窗
     showAddRoleData () {
       this.dialogFormVisibleAddRole = true
     },
     // 添加角色按钮 点击发送请求 请求路径：roles 请求方法：post
     async addRoleData () {
       // 关闭对话框
       this. dialogFormVisibleAddRole = false
       // 发送请求
       const res = await this.$http.post('roles', this.formRole)
       // 提醒
       if (res.data.meta.status !== 201) return this.$message.error('创建角色失败！')
       this.$message.success('创建角色成功！')
       // 更新视图
       this.getRoleList()
       // 再次打开输入框清空
       this.formRole = {}
       // console.log(res)
     },
     // 点击确定按钮发送请求  请求路径：roles/:id 请求方法：put
     // await this.$http.put('roles/' + this.editForm.id, this.editForm)
     async editRoleData () {
       const res = await this.$http.put(`roles/${this.form.roleId}`, this.form)
       this.getRoleList()
       this.dialogFormVisibleRoleEdit = false
       return (res.data.meta.status===200) ? this.$message.success('编辑信息成功') : this.$message.error(res.data.meta.msg)
       // console.log(res)

     },
     // 删除角色
     showRoleDelete (roleId) {
      // 打开一个提醒确认删除按钮
       this.$confirm('删除该角色，是否继续？','注意',{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async() => {
         // 发送请求 ->请求路径：roles/:id请求方法：delete
         const res = await this.$http.delete(`roles/${roleId}`)
         console.log(res)
         if (res.data.meta.status === 200) {
           // 更新视图
           this.getRoleList()
           // 提醒
           this.$message({
             type: 'success',
             message: res.data.meta.msg
           })
         }
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         })
       })
     },

     // 编辑角色
     showRoleEdit (roleData) {
       // 显示对话框
       this.dialogFormVisibleRoleEdit = true
       this.form.roleId = roleData.id
       this.form.roleName = roleData.roleName
       this.form.roleDesc = roleData.roleDesc
       console.log(roleData)
     },
    // 修改权限 发送请求  请求路径：roles/:roleId/rights 请求方法：post
     async setRoleRight() {
       // 获取全选的id getCheckedKeys()
       let arr1 = this.$refs.tree.getCheckedKeys()
       // 获取半选的id getHalfCheckedKeys()
       let arr2 = this.$refs.tree.getHalfCheckedKeys()
       // 进行合并 赋给 rids
       let arr = [...arr1, ...arr2]
       // console.log(arr)
       const res = await this.$http.post(`roles/${this.currentRoleId}/rights`, {rids:arr.join(',')})
       console.log(res)
       // 更新视图
       this.getRoleList()
       // 关闭对话框
       this.dialogFormVisibleRight = false
     },

     // 点击按钮打开对话框
     async showSetRight(role) {
       // console.log(role)
       // 给currentRoleId 赋值
       this.currentRoleId = role.id
       // 获取树心结构的数据
      const res = await this.$http.get(`rights/tree`)
      this.treeList = res.data.data
       // 获取当前角色的权限
       let arrTemp2 = []
       role.children.forEach(item1 => {
         item1.children.forEach(item2 => {
           item2.children.forEach(item3 => {
             arrTemp2.push(item3.id)
           })
         })
       })
       this.arrChecked = arrTemp2
       this.dialogFormVisibleRight = true
     },
     async getRoleList () {

       const res = await this.$http.get(`roles`)
       console.log(res) // 数据在 res.data.data 中
       this.roleList = res.data.data
     },
     // 取消权限 请求路径：roles/:roleId/rights/:rightId   请求方法：delete
     // 删除权限，后台返回200状态码 和 还剩下的权限
      async deleteRight (role,rightId) {
      const res = await this.$http.delete(`roles/${role.id}/rights/${rightId}`)
       role.children = res.data.data
     }
   }
 }
</script>

<style>
  .addRoleBtn {
    margin-top: 15px;
  }
  .noRightTip {
    margin-left: 100px;
    color: #FF7F24;
  }
</style>
