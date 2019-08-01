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
      <el-tabs v-model="active" tab-position="left" @tab-click="tabChange()">
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

          <el-form-item label="商品分类">
            <!--级联选择器-->
            <el-cascader
              clearable
              v-model="selectedOptions"
              :options="options"
              :props="defaultProp"
              @change="handleChange">
            </el-cascader>
          </el-form-item>

        </el-tab-pane>
        <el-tab-pane name="2" label="商品参数">
          <!--显示该三级分类的商品参数-->
          <el-form-item :label="item1.attr_name" v-for="(item1,index1) in  arrGoodsData" :key="index1">
            <el-checkbox-group v-model="item1.attr_vals">
              <el-checkbox border :label="item2" v-for="(item2, index2) in item1.attr_vals" :key="index2"></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="3" label="商品属性">
          <el-form-item :label="item.attr_name" v-for="(item,index) in arrStaticData" :key="index">
            <el-input v-model="item.attr_vals"></el-input>
          </el-form-item>
        </el-tab-pane>

        <el-tab-pane name="4" label="商品图片">
          <el-form-item>
            <el-upload
              action="http://localhost:8888/api/private/v1/upload"
              :on-preview="handlePreview"
              :headers="headers"
              :on-remove="handleRemove"
              :on-success="handleSuccess"
              list-type="picture">
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
        </el-tab-pane>
        <el-tab-pane name="5" label="商品内容">
          <el-form-item>
            <el-button type="primary" @click="addGoodsData()">添加商品</el-button>
            <!--富文本编辑器-->
            <quill-editor v-model="form.goods_introduce"></quill-editor>
          </el-form-item>
        </el-tab-pane>
      </el-tabs>
    </el-form>
  </el-card>
</template>

<script>
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

import { quillEditor } from 'vue-quill-editor'
export default {
  components: {
    quillEditor
  },
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
    //   attrs	          商品的参数（数组）  可以为空     动态参数和静态参数
      form: {
        goods_name: '',
        goods_cat: '',
        goods_price: '',
        goods_number: '',
        goods_weight: '',
        goods_introduce: '',
        pics: [],
        attrs: []
      },
      // 级联选择器数据
      options: [],
      selectedOptions: [1,3,6], // 默认选择的三级分类的id
      defaultProp: {
        label: 'cat_name',
        value: 'cat_id',
        children: 'children',
        expandTrigger: 'hover'
      },
      // 商品基本信息参数数据
      // 动态参数数组
      arrGoodsData: [],
      // 静态参数数组
      arrStaticData: [],
      checkList: [],
      headers: {
       Authorization: localStorage.getItem('token')
      }
    }
  },
  methods: {
    // 点击商品按钮发送请求
    async addGoodsData () {
      // 发送请求前处理未处理的数据
      this.form.goods_cat = this.selectedOptions.join(',')
      // 动态参数数组处理
      let array1 = this.arrGoodsData.map((item) => {
        return { attr_id: item.attr_id, atr_value: item.attr_vals }
      })
      // 静态参数数组数据处理
      let array2 = this.arrGoodsData.map((item) => {
        return { attr_id: item.attr_id, atr_value: item.attr_vals }
      })
      this.form.attrs = [...array1, ...array2]
      // console.log(this.arrGoodsData)
      // 发送请求
      const resData = await this.$http.post(`goods`, this.form)
      console.log(resData)
      this.$router.push({name: "goods"})
    },
    // 图片上传相关方法
    handlePreview (file) {

    },
    handleRemove (file) {
      // file.response.data.tmp_path 图片的临时路径
      let index = this.form.pics.findIndex((item) => {
        return item.pic === file.response.data.tmp_path
      })
      this.form.pics.splice(index, 1)
       console.log(this.form.pics)
    },
    handleSuccess (file) {
      // file,data.tmp_path 图片的临时路径
      this.form.pics.push({
        pic:file.data.tmp_path
      })
    },
    // 点击不同tab方法
    async tabChange() {
      // console.log(this.active)
      if (this.active === '2') {
        if (this.selectedOptions.length !== 3) {
          // console.log('进来了')
          this.$message.warning('请先选择商品的三级分类')
        } else {
          // 获取数据  请求路径：categories/:id/attributes 请求方法：get
          // 请求参数
          // 参数名	   参数说明	      备注
          // :id	     分类 ID	      不能为空携带在url中
          // sel	    [only,many]	  不能为空,通过 only 或 many 来获取分类静态参数还是动态参数
          const res = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=many`)
          // 数据在res.data.data
          this.arrGoodsData = res.data.data
          this.arrGoodsData.forEach(item => {
            item.attr_vals =  item.attr_vals.length === 0 ? [] : item.attr_vals.trim().split(',')
          })
          // console.log(res)
        }

      } else if (this.active === '3') {
        if (this.selectedOptions.length !== 3) {
          this.$message.warning('请先选择商品的三级分类')
          return
        }
        // 三级分类 tab=3 获取静态参数数据
        const res1 = await this.$http.get(`categories/${this.selectedOptions[2]}/attributes?sel=only`)
        this.arrStaticData = res1.data.data
        console.log(res1)

      }
    },
    // 级联选择器的方法
    handleChange () {

    },
    // 获取商品分类信息  请求路径：categories  请求方法：get
    async getGoodsCat () {
      const res = await this.$http.get(`categories?type=3`)
      // console.log(res)
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
.ql-editor {
  min-height: 300px;
}

</style>
