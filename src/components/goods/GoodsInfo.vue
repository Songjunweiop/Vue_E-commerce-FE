<template>
  <div class="goodsinfo-container">
    <div class="goodsDatil">
      <div class="left">
        <el-image
          style="width: 80%; height: 80%; margin-top: 50px"
          :src="goods_url"
          ><div slot="error" class="image-slot">暂无</div></el-image
        >
        <img style="width: 80%" src="../../assets/images/dibu.jpg" />
      </div>

      <div class="right">
        <el-form
          :model="goodsinfo"
          ref="editFormRef"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="" prop="goods_name">
            <!-- <el-input v-model="goodsinfo.goods_name"></el-input> -->
            <h1>购买{{ this.goodsinfo.goods_name }}</h1>
          </el-form-item>
          <el-form-item label="" prop="goods_price">
            <!-- <el-input v-model="goodsinfo.goods_price"></el-input> -->
            <el-card shadow="hover" class="box-card">
              <h3>RMB{{ this.goodsinfo.goods_price }}</h3>
            </el-card>
            <el-card shadow="hover" class="box-card">
              <h3>{{ this.goodsinfo.goods_number }}余</h3>
            </el-card>
          </el-form-item>
          <el-form-item>
            <el-table
              :show-header="false"
              :data="manyTabData"
              style="width: 100%"
            >
              <el-table-column width="200px">
                <template slot-scope="scope">
                  <el-tag effect="dark" type="info">{{
                    scope.row.attr_name
                  }}</el-tag>
                </template>
              </el-table-column>
              <el-table-column width="200px">
                <template slot-scope="scope">
                  <el-tag
                    effect="plain"
                    style="margin: 3px;"
                    v-for="(item, i) in scope.row.attr_value"
                    :key="i"
                    type="info"
                    >{{ item }}</el-tag
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </el-form>
        <div class="buy">
          <el-card
            @click.native="dialog = true"
            shadow="hover"
            class="box-card handle"
          >
            <h3>购买</h3>
          </el-card>
          <el-card shadow="hover" class="box-card handle">
            <h3>加入购物车</h3>
          </el-card>
        </div>
      </div>
    </div>

    <div class="goods_introduce" v-html="this.goodsinfo.goods_introduce"></div>
    <el-drawer
      :title="title"
      :visible.sync="dialog"
      direction="rtl"
      custom-class="demo-drawer"
      ref="drawer"
      :open="open()"
      :wrapperClosable="true"
    >
      <el-form class="but_from">
        <el-form-item>
          <!-- <el-input v-model="goodsinfo.goods_name"></el-input> -->
          <h1>为您的{{ this.goodsinfo.goods_name }}下单</h1>
        </el-form-item>
        <el-form-item label="">
          <el-image
            style="width: 200px; height: 200px"
            :src="goods_url"
            fit="cover"
          >
            <div slot="error" class="image-slot">暂无</div></el-image
          >
        </el-form-item>
        <el-form-item label="数量">
          <el-input-number
            v-model="num"
            @change="handleChange"
            :min="1"
            :max="10"
            class="aaa"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="总价">
          <el-card
            @click.native="dialog = true"
            shadow="never"
            class="box-card handle price_total"
          >
            <h3>{{ this.price_total }}</h3>
          </el-card>
        </el-form-item>
        <el-form-item label="请填写您的收获地址">
          <el-input v-model="address"></el-input>
        </el-form-item>
      </el-form>

      <div class="demo-drawer__footer">
        <el-card
          @click.native="handleBuy"
          shadow="hover"
          class="box-card handle"
          style="border: 0px; cursor: pointer;"
        >
          <h3>下单</h3>
        </el-card>
      </div>
    </el-drawer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_url: '../../assets/images/dibu.jpg',
      id: this.$route.params.id,
      user_id: '',
      goodsinfo: {},
      editForm: {},
      manyTabData: [],
      goods_url: '',
      dialog: false,
      loading: false,
      title: '',
      num: '1',
      price_total: '',
      address: '',
    }
  },
  created() {
    this.getGoodsinfobyid()

    this.user_id = window.sessionStorage.getItem('user_id')
    console.log(this.id)
  },
  methods: {
    async getGoodsinfobyid() {
      //获取商品信息
      const { data: res } = await this.$http.get('goods/' + this.id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.goodsinfo = res.data
      res.data.attrs.forEach((item) => {
        item.attr_value = item.attr_value ? item.attr_value.split(',') : []
        // 控制文本显示隐藏
        item.inputVisible = false
        item.inputValue = ''
      })
      this.manyTabData = res.data.attrs
      this.goods_url =
        this.goodsinfo.pics.length == 0
          ? ''
          : this.goodsinfo.pics[0].pics_big_url
      console.log(this.manyTabData)
    },
    open() {
      console.log('asdfasd')
      this.handleChange()
    },
    cancelForm() {
      this.loading = false
      this.dialog = false
    },
    handleChange() {
      console.log(this.goodsinfo.goods_price, this.num)
      this.price_total = this.goodsinfo.goods_price * this.num
      console.log(this.price_total)
    },
    async handleBuy() {
      console.log('aaaa')
      const { data: res } = await this.$http.post('orders', {
        user_id: this.user_id,
        order_price: this.price_total,
        order_pay: '0',
        is_send: '否',
        order_fapiao_title: '',
        consignee_addr: this.address,
      })
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)

      this.dialog = false
      this.$message.success('购买成功！请耐心等待发货');

    },
  },
}
</script>
<style lang="less" scoped>
.goodsinfo-container {
  .goodsDatil {
    height: 650px;
    width: 60%;
    margin: 0 auto;
    .left {
      float: left;
      width: 50%;
    }
    .right {
      float: left;
      margin-top: 80px;
      width: 50%;
      min-height: 660px;
      .box-card {
        width: 38%;
        float: left;
        margin-right: 20px;
        padding: 0px;
      }

      h1 {
        text-align: left;
        font-size: 40px;
        position: relative;
        // left: -50px;
      }
      h3 {
        border: 1px soild #ccc;
      }
      .el-tag {
        min-width: 150px;
        height: 50px;
        line-height: 50px;
        text-align: center;
      }
      .buy {
        position: relative;
        left: 100px;
        width: 80%;
        .handle {
          cursor: pointer;
        }
      }
    }
  }
}
.but_from {
  width: 70%;
  margin: 0 auto;
}
.price_total {
  font-size: 20px;
  width: 50%;
  line-height: 0px;
  margin-left: 50%;
  padding: 0 !important;
  border: 0px;
}
.buyit {
  float: left;
}
</style>
