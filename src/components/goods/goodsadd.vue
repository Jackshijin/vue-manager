<template>
  <el-card>
    <!--面包屑-->
    <my-bread level1="商品管理" level2="商品列表"></my-bread>

    <!--提示-->
    <el-alert
      class="el-alert"
      title="添加商品信息"
      type="success"
      center
      show-icon>
    </el-alert>

    <!--进度条-->
    <el-steps :active="1 * active" finish-status="success" simple style="margin-top: 20px">
      <el-step title="基本信息" ></el-step>
      <el-step title="商品参数" ></el-step>
      <el-step title="商品属性" ></el-step>
      <el-step title="商品图片" ></el-step>
      <el-step title="商品内容" ></el-step>
    </el-steps>

    <!--左侧的tab-->
    <el-form label-position="top" label-width="80px" :model="form" style="height:400px;overflow:auto;">
      <el-tabs v-model="active" tab-position="left">
        <el-tab-pane name="1" label="基本信息">

          <el-form-item label="商品名称">
            <el-input v-model="form.goods_name"></el-input>
          </el-form-item>

          <el-form-item label="商品价格">
            <el-input v-model="form.goods_price"></el-input>
          </el-form-item>

          <el-form-item label="商品重量">
            <el-input v-model="form.goods_weight"></el-input>
          </el-form-item>

          <el-form-item label="商品数量">
            <el-input v-model="form.goods_number"></el-input>
          </el-form-item>

          <el-form-item>
            <!--级联选择器-->
            <el-cascader
              v-model="defaultSelection"
              :options="options"
              :props="defaultProp"
              @change="handleChange">
            </el-cascader>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">商品参数</el-tab-pane>
        <el-tab-pane name="3" label="商品属性">商品属性</el-tab-pane>
        <el-tab-pane name="4" label="商品图片">商品图片</el-tab-pane>
        <el-tab-pane name="5" label="商品内容">商品内容</el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
export default {
  name: "goodsadd",
  data () {
    return {
      active: '1',
    //   参数名	          参数说明	            备注
    //   goods_name	       商品名称	         不能为空
    //   goods_cat	以为','分割的分类列表	   不能为空
    //   goods_price	       价格	           不能为空
    //   goods_number	       数量	           不能为空
    //   goods_weight	       重量	           不能为空
    //   goods_introduce	   介绍	           可以为空
    //   pics	    上传的图片临时路径（对象）	 可以为空
    //   attrs	          商品的参数（数组）  可以为空
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: '',
        attrs: ''
      },
      // 级联选择器数据
      options: [],
      defaultSelection: [1,3,6], // 默认选择的三级分类的id
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      }
    }
  },
  methods: {
    // 级联选择器的方法
    handleChange () {

    },
    // 获取商品分类信息  请求路径：categories  请求方法：get
    async getGoodsCat () {
      const res = await this.$http.get(`categories?type=3`)
      console.log(res)
      this.options = res.data.data
    }
  },
  created() {
    this.getGoodsCat()
  }
}
</script>

<style>
.el-alert {
  margin-top: 15px;
}

</style>
