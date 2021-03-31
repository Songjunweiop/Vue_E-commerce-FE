<template>
  <div class="goodsinfo-container">
    <!-- <div class="mui-card">
      <div class="mui-card-content">
        <div
          class="mui-card-content-inner"
          v-for="item in lunbotu"
          :key="item.id"
        >
          <img :src="item.src" />
        </div>
      </div>
    </div>

    <transition
      @before-enter="beforeEnter"
      @enter="enter"
      @after-enter="afterEnter"
    >
      <div class="ball" v-show="ballflag" ref="ball"></div>
    </transition>

    <div>
      <img :src="goodsinfo.pics[0].pics_big_url" />
      <div>{{ goodsinfo.goods_name }}</div>

      
      <div>
        <div>
          <p class="price">
            价格：
            <span class="now_price">￥{{ goodsinfo.goods_price }}</span>
          </p>
          <p>
            购买数量：
          </p>
          <p>
            <el-button type="primary" size="small">立即购买</el-button>
            <el-button type="danger" size="small">加入购物车</el-button>
          </p>
        </div>
      </div>
    </div>

    <div>
      <div>商品参数</div>
      <div>
        <div>
          <p>商品货号：{{ goodsinfo.goods_id }}</p>
          <p>库存{{ goodsinfo.goods_number }}件</p>
        </div>
      </div>
      <div
        class="goods_introduce"
        v-html="this.goodsinfo.goods_introduce"
      ></div>
    </div> -->
    <div class="goodsDatil">
      <div class="left">
        <el-image
          style="width: 80%; height: 80%; margin-top: 50px"
          :src="this.goodsinfo.pics[0].pics_big_url"
        ></el-image>
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
          <el-card shadow="hover" class="box-card handle">
            <h3>购买</h3>
          </el-card>
          <el-card shadow="hover" class="box-card handle">
            <h3>加入购物车</h3>
          </el-card>
        </div>
      </div>
    </div>

    <div class="goods_introduce" v-html="this.goodsinfo.goods_introduce"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      img_url: '../../assets/images/dibu.jpg',
      id: this.$route.params.id,
      goodsinfo: {},
      editForm: {},
      manyTabData: [],
    }
  },
  created() {
    this.getGoodsinfobyid()
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
      console.log(this.manyTabData)
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
      .buy{
        position: relative;
        left: 100px;
        width: 80%;
        .handle{
          cursor: pointer;
        }
      }
    }
  }
}
</style>
