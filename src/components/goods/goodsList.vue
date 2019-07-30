<template>
  <el-card>
    <my-bread level1="商品管理" level2="商品列表"></my-bread>
    <!--搜索框-->
    <el-row class="searchArea">
      <el-col :span="24">
        <el-input placeholder="请输入内容" v-model="searchValue" clearable class="inputSearch" >
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
            <el-button type="primary" size="mini" plain icon="el-icon-edit" circle @click="showGoodsEdit()"></el-button>
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
  </el-card>
</template>

<script>
    export default {
      name: "goodsList",
      data() {
        return {
          searchValue: '',
          loading: false,
          goodsList: [],
          pagenum: 1,
          pagesize: 10,
          total: 0
        }
      },
      created () {
        this.loadData()
      },
      methods: {
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
        getGoodList () {

        },

        // 删除商品
        removeGoods() {

        },
        // 编辑商品
        showGoodsEdit () {

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
