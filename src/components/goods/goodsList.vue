<template>
  <el-card>
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!--搜索框-->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input placeholder="请输入内容" v-model="searchValue.query" clearable class="inputSearch" >
          <el-button slot="append" icon="el-icon-search" @click="getGoodList()"></el-button>
        </el-input>
        <el-button type="success" plain @click="$router.push({name: 'goodsadd'})">添加商品</el-button>
      </el-col>
    </el-row>

    <!--表格-->
    <el-table height="450px" border stripe v-loading="loading" :data="goodsList" style="width: 100%">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="goods_name" label="商品名称" ></el-table-column>
      <el-table-column prop="goods_price" label="商品价格(元)" width="100"></el-table-column>
      <el-table-column prop="goods_weight" label="商品重量" width="80"></el-table-column>

      <el-table-column label="创建时间" width="120">
        <!--template 内部使用外部数据，设置slot-scope 属性,该属性目前已经废除，查看文档改用以下写法-->
        <template slot-scope="scope">
          <!--创建时间格式化-->
          {{scope.row.add_time | fmtdate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showGoodsEdit(scope.row)"></el-button>
            <el-button type="danger" size="mini" plain icon="el-icon-delete" circle @click="removeGoods(scope)"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>

    <!--分页组件-->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="pagenum"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--编辑商品信息对话框-->
    <el-dialog title="编辑商品信息" :visible.sync="dialogFormVisibleGoodsEdit">
      <el-form :model="form">
        <el-form-item label="商品名称" :label-width="formLabelWidth">
          <el-input v-model="form.goods_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品价格" :label-width="formLabelWidth">
          <el-input v-model="form.goods_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="商品重量" :label-width="formLabelWidth">
          <el-input v-model="form.goods_weight" autocomplete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleGoodsEdit = false">取 消</el-button>
        <el-button type="primary" @click="editGoodsData()">确 定</el-button>
      </div>
    </el-dialog>
  </el-card>
</template>

<script>
    export default {
      name: "goodsList",
      data() {
        return {
          searchValue:{
            query: '',
            pagenum: 1,
            pagesize: 10
          },
          loading: false,
          goodsList: [],
          pagenum: 1,
          pagesize: 10,
          total: 0,
          // 编辑商品信息数据
          dialogFormVisibleGoodsEdit: false,
          formLabelWidth: '120px',
          form: {
            cat_id: '',
            cat_one_id: '',
            cat_two_id: '',
            cat_three_id: '',
            goods_id: '',
            goods_name:'',
            goods_price: '',
            goods_weight: '',
            goods_number: '',
            goods_state:'',
            hot_number: '',
            is_promote: false
          }
        }
      },
      created () {
        this.loadData()
      },
      methods: {
        // 编辑商品方法
        async editGoodsData() {
          // 发送请求  请求路径：goods/:id 请求方法：put
          const res = await this.$http.put(`goods/${this.form.goods_id}`, this.form)
          // 提醒信息
          this.$message.error('该功能因接口问题尚未完善')
          console.log(res)
          // 更新视图
          // 关闭窗口
         this.dialogFormVisibleGoodsEdit = false
        },
        handleSizeChange (val) {
          this.pagesize = val
          this.pagenum = 1
          this.loadData()
        },
        handleCurrentChange (val) {
          this.pagenum = val
          this.loadData()
        },
        // 获取商品列表
        async getGoodList () {
          const res = await this.$http.get('goods', { params: this.searchValue })
          if (res.data.meta.status !== 200) return this.$message.error('获取商品列表失败！')
          this.goodsList = res.data.data.goods
          this.total = res.data.data.total
          // console.log(res)
        },

        // 删除商品
        async removeGoods(scope) {
          const confirmResult = await this.$confirm('此操作将永久删除该商品, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).catch(err => err)

          // 用户取消了删除
          if (confirmResult !== 'confirm') {
            return this.$message({
              type: 'info',
              message: '已取消删除'
            })
          }

          // 用户确认了删除
          const { data: res } = await this.$http.delete('goods/' + scope.row.goods_id)
          if (res.meta.status !== 200) return this.$message.error('删除商品失败！')
          this.$message.success('删除商品成功！')
          this.getGoodList()
        },
        // 编辑商品
        showGoodsEdit (goodsData) {
          this.dialogFormVisibleGoodsEdit = true
          this.form = goodsData
          console.log(goodsData)
        },
        // 获取数据
        async loadData () {
          this.loading = true
          const { data: resData } = await this.$http.get(`goods?pagenum=${this.pagenum}&pagesize=${this.pagesize}`)
          this.total = resData.data.total
          this.goodsList = resData.data.goods
          this.loading = false
        }
      }
    }
</script>

<style>
.searchArea {
  margin-top: 10px;
  margin-bottom: 10px;
}
.searchArea .inputSearch {
  width: 350px;
}

</style>
