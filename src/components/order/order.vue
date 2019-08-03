<template>
  <div>
    <my-bread level1="订单管理" level2="订单列表"></my-bread>
    <!--表格-->
    <el-table border stripe :data="ordersList" style="width: 100%" class="tableBody">
      <el-table-column type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" ></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="100"></el-table-column>
      <el-table-column prop="pay_status" label="是否付款" width="80">
        <template slot-scope="scope">
          <el-tag type="danger" v-if="scope.row.pay_status === 0" size="small">未付款</el-tag>
          <el-tag type="success" v-else size="small">已付款</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货" width="80"></el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="120">
        <!--template 内部使用外部数据，设置slot-scope 属性,该属性目前已经废除，查看文档改用以下写法-->
        <template slot-scope="scope">
          <!--创建时间格式化-->
          {{scope.row.create_time | fmtdate}}
        </template>
      </el-table-column>

      <el-table-column
        prop="address"
        label="操作">
        <template slot-scope="scope">
          <el-row>
            <el-button type="primary" icon="el-icon-edit" size="mini" title="修改订单地址" @click="addressDialogVisible=true"></el-button>
            <el-button type="success" icon="el-icon-location" size="mini" title="物流信息" @click="showExpressData"></el-button>
          </el-row>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total">
    </el-pagination>

    <!--修改地址对话框-->
    <el-dialog title="修改地址" :visible.sync="addressDialogVisible" width="50%" @close="addressDialogClosed">
      <el-form :model="addressForm" :rules="addressFormRules" ref="addressFormRef" label-width="100px">
        <el-form-item label="省市区/县" prop="address1">
          <!-- 使用级联选择器，加载省市区县的数据 -->
          <el-cascader :options="cityData"></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址" prop="address2">
          <el-input v-model="addressForm.address2"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addressDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="addressDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 物流信息的对话框 -->
    <el-dialog title="物流信息" :visible.sync="expressDialogVisible" width="50%">
      <el-steps direction="vertical" :active="1">
        <el-step v-for="(item, index) in expressInfo" :key="index" :title="item.time" :description="item.context"></el-step>
      </el-steps>
    </el-dialog>
  </div>
</template>

<script>
import cityData from '../../assets/city_data'
 export default {
   name: "order",
   data () {
     return {
       queryInfo: {
         query: '',
         pagenum: 1,
         pagesize: 10
       },
       total: 0,
       // 表格数据
       ordersList: [],
       // 修改订单数据
       addressDialogVisible: false,
       addressForm: {
         // 省市区的数据
         address1: '',
         address2: ''
       },
       addressFormRules: {
         address1: [{ required: true, message: '请填写省市区', trigger: 'blur' }],
         address2: [{ required: true, message: '请填写详细地址', trigger: 'blur' }]
       },
       // 省市区的数据
       cityData: cityData,
       // 物流信息数据
       expressDialogVisible: false,
       expressInfo: []
     }
   },
   created() {
     this.getOrderList()
   },
   methods: {
     // dialog 关闭动画结束时的间隔
     addressDialogClosed () {},
     // 获取订单列表
     async getOrderList () {
       // 请求路径：orders 请求方法：get
       const {data:res} = await this.$http.get(`orders`, {params: this.queryInfo})
       if (res.meta.status !== 200) this.$message.error('获取订单列表错误')
       this.ordersList = res.data.goods
       this.total = res.data.total
       console.log(res)
     },
     handleSizeChange (val) {
       this.queryInfo.pagesize = val
       this.queryInfo.pagenum = 1
       this.getOrderList()
     },
     handleCurrentChange (val) {
       this.queryInfo.pagenum = val
       this.getOrderList()
     },
     // 物流信息
     async showExpressData () {
       // 接口没有该功能数据，暂时保留
       const { data: res } = await this.$http.get('/express/11111111')
       if (res.meta.status !== 200) return this.$message.error('获取物流信息失败！')
       this.expressInfo = res.data
       this.expressDialogVisible = true
     }
   }
 }
</script>

<style>
.tableBody {
  margin-top: 15px;
}

</style>
