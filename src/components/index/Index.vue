<template>
  <el-container>
    <el-main>
      <el-input
        placeholder="请输入你想要的商品"
        v-model="queryInfo.query"
        @keyup.enter.native="getGoodsList"
        class="input-with-select"
        suffix-icon="el-icon-search"
      >
      </el-input>
      <div class="goods-list">
        <div
          class="goods-item"
          v-for="item in goodslist"
          :key="item.goods_id"
          @click="goDetail(item.goods_id)"
        >
          <img :src="url + item.goods_big_logo" alt />
          <h1 class="title">{{ item.goods_name }}</h1>
          <div class="info">
            <p class="price">
              <span class="now">{{ item.goods_price }}</span>
            </p>
            <p class="all">
              <span>热卖中</span>
              <span>剩{{ item.goods_number }}件</span>
            </p>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      url: 'http://127.0.0.1:8888/',
      pageindex: 1,
      goodslist: [],
      queryInfo: {
        query: '',
        pagenum: 1,
        pagesize: 10,
      },
    }
  },
  created() {
    this.getGoodsList()
  },
  methods: {
    async getGoodsList() {
      const { data: res } = await this.$http.get('goods', {
        params: {
          query: this.queryInfo.query,
          pagenum: this.queryInfo.pagenum,
          pagesize: this.queryInfo.pagesize,
        },
      })
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.goodslist = res.data.goods
      console.log(this.goodslist)
    },
    getmore() {},
    goDetail(id) {
      //使用js的形式进行路由导航
      this.$router.push('/goods/' + id)
    },
  },
}
</script>

<style lang="less" scoped>
.el-header,
.el-footer {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-main {
  background-color: #ffffff;
  padding-left: 260px;
  padding-right: 260px;
  color: #333;
  // text-align: center;
  // line-height: 160px;
  .input-with-select {
    width: 50%;
  }
}
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  justify-content: space-between;
  .goods-item {
    width: 330px;
    margin: 20px;
    // border: 1px solid #ccc;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 250px;
    img {
      width: 100%;
      max-height: 330px;
    }
    h1 {
      font-size: 16px;
    }
    .info {
      // background-color: #eee;
      // border-top: 1px solid #ccc;
      p {
        margin: 0;
        padding: 3px;
      }
      .price {
        .now {
          // color: red;
          margin-left: 5px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 15px;
        }
      }
    }
  }
  .goods-item:hover {
    box-shadow: 0 0 8px #ccc;
    cursor: pointer;
    transition-duration:0.2s;
    transform: scale(1.01);
    transition-timing-function: ease-in-out;
  }
}
</style>
