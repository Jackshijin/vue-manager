<template>
  <el-card>
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品分类"></my-bread>
    <!--添加分类按钮-->
    <el-row>
      <el-col :span="24" class="searchArea">
        <el-button @click="addCategory()" type="primary" size="mini" class="el-btn">添加分类</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table height="450px" :data="categoryList" style="width: 100%">
       <!--<el-table-column prop="cat_name" label="分类名称" width="180"></el-table-column>-->
      <!--
        treeKey 绑定到id 给每个节点设置一个唯一值
        parentKey 绑定到父id属性 区分父子节点
        levelKey 绑定到层级的属性
        childKey 绑定到储存子元素的属性
       -->
      <el-tree-grid
        prop="cat_name"
        label="分类名称"
        treeKey="cat_id"
        parentKey="cat_pid"
        levelKey="cat_level"
        childKey="children"
        :indentSize="30">
      </el-tree-grid>

      <el-table-column prop="cat_level" label="级别" width="180">
        <!-- 级别 -->
        <template slot-scope="scope">
          <span v-if="scope.row.cat_level === 0">一级</span>
          <span v-else-if="scope.row.cat_level === 1">二级</span>
          <span v-else-if="scope.row.cat_level === 2">三级</span>
        </template>
      </el-table-column>
      <el-table-column
        prop="cat_deleted"
        label="是否有效">
        <template slot-scope="scope">
          {{ scope.row.cat_deleted ? '无效' : '有效'}}
        </template>
      </el-table-column>
      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-button  @click="handleOpenEdit(scope.row)" plain size="mini" type="primary" icon="el-icon-edit" circle title="编辑"></el-button>
          <el-button  @click="handleDelete(scope.row.cat_id)" plain size="mini" type="danger" icon="el-icon-delete" circle title="删除"></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--添加分类对话框-->
    <el-dialog title="添加分类" :visible.sync="addCateDialogVisible">
      <el-form :model="addForm">
        <el-form-item label="分类名称" :label-width="formLabelWidth">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
        <!--级联选择器--表单元素-->
        <el-form-item label="分类" :label-width="formLabelWidth">
          {{selectedOptions}}
          <el-cascader
            clearable
            :options="cateList"
            :props="defaultProps"
            v-model="selectedOptions">

          </el-cascader>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click=" addCateDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addCateCommit()">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 编辑修改分类的对话框 -->
    <el-dialog title="修改商品分类" :visible.sync="editDialogFormVisible">
      <el-form :model="addForm" label-width="100px">
        <el-form-item label="分类名称">
          <el-input v-model="addForm.cat_name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleEdit">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
  // 引入表格中的树形结构控件
  let ElTreeGrid = require('element-tree-grid');
 export default {
   components: {
     ElTreeGrid
   },
   name: "goodscate",
   data() {
     return {
       categoryList: [],
       pagenum: 1,
       pagesize: 5,
       total: 0,
       // 绑定层级下拉框
       selectedOptions: [],
       // 层级下拉框中的数据
       options: [],
       // 层级下拉框中的配置
       defaultProps: {
         value: 'cat_id',
         label: 'cat_name',
         children: 'children',
         expandTrigger: 'hover',
         checkStrictly: true // 严格遵守父子节点不互相关联
       },
       // 添加分类数据
       addCateDialogVisible: false,
       addForm: {
         cat_pid: -1,
         cat_name: '',
         cat_level: -1
       },
       formLabelWidth: '120px',
       // 二级级联选择器的数据
       cateList: [],
       // 编辑参数按钮数据
       editDialogFormVisible: false
     }
   },
   methods: {
     // 添加分类方法
     async addCategory () {
       // 获取二级分类的数据
       const {data:res} = await this.$http.get(`categories?type=2`)
       this.cateList = res.data
       // console.log(res)
       this.addCateDialogVisible = true
     },
     // 对添加二级分类数据的处理
     handleCateData (arrayLength) {
       this.addForm.cat_level = arrayLength
       this.addForm.cat_pid = (arrayLength === 0 ? 0 : this.selectedOptions[arrayLength - 1])
     },
     // 提交新加分类
     async addCateCommit () {
       // 请求路径：categories
       // 请求方法：post
       // 请求参数
       // 参数名	     参数说明	       备注
       // cat_pid	   分类父 ID	     不能为空
       // cat_name	 分类名称	     不能为空
       // cat_level	 分类层级	     不能为空

       // 添加二级分类 -->selectedOptions.length === 1  cat_pid == 父级id值-selectedOptions[0] cat_level == 1
       // 添加三级分类 -->selectedOptions.length === 2   cat_pid == selectedOptions[0]  cat_level == 2
       // if (this.selectedOptions.length === 0) {
       //   // 添加一级分类 -->selectedOptions.length === 0  cat_pid == 0  cat_level == 0
       //   this.addForm.cat_level = 0
       //   this.addForm.cat_pid = 0
       // } else if (this.selectedOptions.length === 1) {
       //   this.addForm.cat_pid = this.selectedOptions[0]
       //   this.addForm.cat_level = 1
       // } else {
       //   this.addForm.cat_pid = this.selectedOptions[1]
       //   this.addForm.cat_level = 2
       // }
       this.handleCateData(this.selectedOptions.length)
       const res = await this.$http.post(`categories`, this.addForm)
       // console.log(res)
       // 更新视图
       this.loadData()
       // 关闭对话框
       this.addCateDialogVisible = false
       this.addForm = {}
     },
     // 编辑按钮事件 点击打开编辑对话框
     handleOpenEdit (cate) {
       this.addForm.cat_name = cate.cat_name
       this.addForm.cat_id = cate.cat_id
       this.editDialogFormVisible = true
       // console.log(this.addForm)
     },
     // 提交编辑 点击确定按钮发送编辑请求
     async handleEdit () {
       // 请求路径：categories/:id
       // 请求方法：put
       // 请求参数
       // 参数名	    参数说明	       备注
       //  :id      分类 ID	     不能为空携带在url中
       // cat_name	分类名称	     不能为空
       const { data:res } = await this.$http.put(`categories/${this.addForm.cat_id}`, this.addForm)
       if (res.meta.status === 200) {
         this.editDialogFormVisible = false
         this.$message.success(res.meta.msg)
       } else {
         this.$message.error(res.meta.msg)
       }
       // console.log(res)
     },
     async handleDelete (catId) {
       // 请求路径：categories/:id
       // 请求方法：delete
       //   请求参数
       //   参数名	        参数说明	     备注
       //   :id	           分类 ID	不能为空携带在url中
       this.$confirm('此操作将永久删除分类，是否继续','提示',{
         confirmButtonText: '确定',
         cancelButtonText: '取消',
         type: 'warning'
       }).then(async () => {
         // 发送请求
         const { data:res } = await this.$http.delete(`categories/${catId}`)
         if (res.meta.status === 200) {
           this.$message.success('删除成功')
           // 更新视图
           this.loadData()
         } else {
           this.$message.error(res.meta.msg)
         }
       }).catch(() => {
         this.$message({
           type: 'info',
           message: '已取消删除'
         })
       })
     },
     handleCurrentChange (val) {
       this.pagenum = val
       this.loadData()
       // console.log(`当前页: ${val}`)
     },
     handleSizeChange (val) {
       this.pagesize = val
       this.loadData()
       // console.log(`每页 ${val} 条`)
     },
     // 获取所有分类数据
     async loadData () {
       const { data: resData } = await this.$http.get(`categories?type=3&pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
       const {data: { result, total }} = resData
       this.categoryList = result
       this.total = total
     }
   },
   created () {
     this.loadData()
   }
 }
</script>

<style>
.el-btn {
  margin-top: 15px;
}
/*该伪类去掉分类名称前的那个小文件形状的图标*/
.el-icon-folder:before {
  content: none;
}
</style>
