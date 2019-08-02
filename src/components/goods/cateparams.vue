<template>
  <el-card>
    <my-bread level1="商品管理" level2="分类参数"></my-bread>
    <!--提示-->
    <el-alert title="只允许为第三级分类商品设置参数" type="warning" center show-icon class="el-alert"></el-alert>
    <!--级联选择器-->
    <el-form label-position="left" label-width="80px" class="formParams">
      <el-form-item label="商品分类">
        <!--级联选择器-->
        <el-cascader
          :show-all-levels="false"
          clearable
          v-model="selectedOptions"
          :options="options"
          :props="defaultProp"
          @change="handleChange">
        </el-cascader>
      </el-form-item>
    </el-form>

    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="动态参数" name="many">
        <!--按钮-->
        <el-button type="primary" size="mini" :disabled="this.selectedOptions.length !== 3 " @click="addDialogVisible=true" class="el-btn">添加参数</el-button>
        <!--表格-->
        <el-table :data="arrGoodsData" style="width: 100%">
          <el-table-column type="expand" label="#">
            <template slot-scope="scope">
              <el-tag
                :key="tag"
                v-for="tag in scope.row.attr_vals"
                closable
                :disable-transitions="false"
                @close="handleClose(scope.row,tag)">
                {{tag}}
              </el-tag>
              <el-input
                class="input-new-tag"
                v-if="inputVisible"
                v-model="inputValue"
                ref="saveTagInput"
                size="small"
                @keyup.enter.native="handleInputConfirm(scope.row)"
                @blur="handleInputConfirm(scope.row)"
              >
              </el-input>
              <el-button v-else class="button-new-tag" size="small" @click="showInput">+ New Tag</el-button>
            </template>
          </el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showEditParams(scope)">修改</el-button>
                <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="removeParams(scope)">删除</el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>

      <el-tab-pane label="静态参数" name="only">
        <el-button type="primary" size="mini" :disabled="this.selectedOptions.length !== 3 " @click="addDialogVisible=true">添加参数</el-button>
        <!--表格-->
        <el-table :data="arrStaticData" style="width: 100%" height="400px">
          <el-table-column type="index" label="#"></el-table-column>
          <el-table-column label="属性名称" prop="attr_name"></el-table-column>
          <el-table-column label="属性值" prop="attr_vals"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-row>
                <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showEditParams(scope)"></el-button>
                <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="removeParams(scope)"></el-button>
              </el-row>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>

    <!--修改参数对话框-->
    <el-dialog :title="activeName === 'many' ? '修改动态参数' : '修改静态属性'" :visible.sync="editDialogVisible" width="50%" @close="editDialogClosed">
      <!-- 修改参数的表单 -->
      <el-form :model="editForm" :rules="editFormRules" ref="editFormRef" label-width="100px">
        <el-form-item :label="activeName === 'many' ? '动态参数' : '静态属性'" prop="attr_name">
          <el-input v-model="editForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editParams">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 添加参数的对话框 -->
    <el-dialog :title="activeName === 'many' ? '添加动态参数' : '添加静态属性'" :visible.sync="addDialogVisible" width="50%" @close="addDialogClosed">
      <!-- 添加参数的表单 -->
      <el-form :model="addForm" :rules="addFormRules" ref="addFormRef" label-width="100px">
        <el-form-item :label="activeName === 'many' ? '动态参数' : '静态属性'" prop="attr_name">
          <el-input v-model="addForm.attr_name"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addParams">确 定</el-button>
      </span>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  name: "cateparams",
  data() {
    return {
      options: [],
      selectedOptions: [], // 默认选择的三级分类的id
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      arrGoodsData: [],
      arrStaticData: [],
      activeName: 'many',
      // 表格数据
      tableData: [],
      inputVisible: false,
      inputValue: '',
      // 修改参数数据
      editDialogVisible: false,
      editForm: {
        attrId: '', // 要编辑的那个参数的Id
        attr_name: '' // 要修改的参数的名称
      },
      // 修改参数表单的验证规则对象
      editFormRules: {
        attr_name: [{ required: true, message: '请添加参数名称', trigger: 'blur' }]
      },
      // 添加参数的数据
      addDialogVisible: false,
      addFormRules: {
        attr_name: [{ required: true, message: '请添加参数名称', trigger: 'blur' }]
      },
      addForm: {
        attr_name: '' // 要添加的参数的名称
      },
    }
  },
  methods: {
    // 添加参数中的方法
    addDialogClosed () {
      this.$refs.addFormRef.resetFields()
    },
    addParams() {
      this.$refs.addFormRef.validate(async valid => {
        if (!valid) return
        // 发起请求，提交表单到服务器，添加新参数
        const { data: res } = await this.$http.post(
          `categories/${this.selectedOptions[2]}/attributes`,
          {
            attr_name: this.addForm.attr_name,
            attr_sel: this.activeName // 控制添加的参数类型
          }
        )

        if (res.meta.status !== 201) return this.$message.error('添加参数失败！')
        this.$message.success('添加参数成功！')
        // 重新获取参数列表中的数据
        this.getGoodsCat()
        // 隐藏添加的对话框
        this.addDialogVisible = false
      })
    },
    // 操作中的按钮相关方法
     // 1.修改参数
    //  const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
    async showEditParams (scope) {
      const { data: res } = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=${this.activeName}`)
      console.log(res)
      if (res.meta.status !== 200) return this.$message.error('获取参数信息失败！')
      this.editForm.attr_name = res.data.attr_name
      this.editForm.attrId = res.data.attr_id
      this.editDialogVisible = true
      console.log(this.editForm.attrId)
    },
    // 对话框关闭时 重置表单
    editDialogClosed() {
      this.$refs.editFormRef.resetFields()
    },
    // 2.删除参数
    async removeParams (scope) {
      const confirmResult = await this.$confirm('此操作将永久删除该参数, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch(err => err)

      if (confirmResult !== 'confirm') {
        return this.$message({
          type: 'info',
          message: '已取消删除'
        })
      }

      const { data: res } = await this.$http.delete(
        `categories/${this.selectedOptions[2]}/attributes/${scope.row.attr_id}`
      )

      if (res.meta.status !== 200) return this.$message.error('删除参数失败！')
      this.$message.success('删除参数成功！')
      this.getGoodsCat()
    },
    // 3.点击确定按钮
    editParams () {
      console.log('确定')
      this.$refs.editFormRef.validate(async valid => {
        if (!valid) return
        // 如果验证通过，则 发起请求 保存编辑的操作
        const { data: res } = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${this.editForm.attrId}`)
        console.log(res)
        if (res.meta.status !== 200) return this.$message.error('编辑参数信息失败！')
        this.$message.success('编辑参数信息成功！')
        this.getGoodsCat()
        this.handleChange()
        this.handleClick()
        this.editDialogVisible = false
      })
    },
    // 点击关闭按钮
    async handleClose(attrData,tag) {
      attrData.attr_vals.splice(attrData.attr_vals.indexOf(tag), 1)
      let putData = {
        attr_name: attrData.attr_name,
        attr_sel: 'many',
        attr_vals: attrData.attr_vals.join(',')
      }
      // 发送请求
      const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attrData.attr_id}`, putData)
      // console.log(res)
    },
    // 点击newTag按钮触发
    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    // 回车键事件 失去焦点
    async handleInputConfirm(attrData2) {
      let inputValue = this.inputValue;
      if (inputValue) {
        attrData2.attr_vals.push(inputValue);
        let putData = {
          attr_name: attrData2.attr_name,
          attr_sel: 'many',
          attr_vals: attrData2.attr_vals.join(',')
        }
        const res = await this.$http.put(`categories/${this.selectedOptions[2]}/attributes/${attrData2.attr_id}`, putData)
        // console.log(res)
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    // 点击tab触发方法
     async handleClick () {
      // console.log('事件终于他妈出发了')
      //  console.log(this.activeName)
      if (this.activeName === 'only') {
        if (this.selectedOptions.length === 3) {
          // 获取数据
          const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
          // console.log(res)
          this.arrStaticData = res.data.data
        }
      }
    },
    // 级联选择器的方法
    async handleChange () {
      if (this.selectedOptions.length === 3) {
        const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
        this.arrGoodsData = res.data.data
        this.arrGoodsData.forEach(item => {
          item.attr_vals =  item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
        })
      }
    },
    // 获取三级分类数据
    async getGoodsCat () {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res)
      this.options = res.data.data
    }
  },
  created () {
    this.getGoodsCat()
  }
}
</script>

<style>
.el-alert {
  margin-top: 15px;
}
.el-btn {
  margin: 10px 0;
}
.formParams {
  margin-top: 15px;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}

</style>
