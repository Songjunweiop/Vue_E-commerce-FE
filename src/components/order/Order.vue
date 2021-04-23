<template>
  <div>
    <!-- <el-button type="primary" @click="handleCommand">sdafsdaf</el-button> -->
    <el-table
      :data="orderList"
      class="mytable"
      :default-sort="{ prop: 'order_id', order: 'descending' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="订单ID">
              <span>{{ props.row.order_id }}</span>
            </el-form-item>
            <el-form-item label="下单时间" prop="create_time">
              <span>
                {{ props.row.create_time | dateFormat }}
              </span>
            </el-form-item>

            <el-form-item label="商品名称">
              <span>{{ props.row.order_fapiao_content }}</span>
            </el-form-item>
            <el-form-item label="商品数量">
              <span>{{ props.row.trade_no }}</span>
            </el-form-item>
            <el-form-item label="是否发货">
              <span>{{ props.row.is_send }}</span>
            </el-form-item>
            <el-form-item label="总金额">
              <span>{{ props.row.order_price }} 元</span>
            </el-form-item>
            <el-form-item label="支付方式">
              <span>
                <div v-if="props.row.order_pay === '0'">未支付</div>
                <div v-if="props.row.order_pay === '1'">支付宝</div>
                <div v-if="props.row.order_pay === '2'">微信</div>
                <div v-if="props.row.order_pay === '3'">银行卡</div>
              </span>
            </el-form-item>
            <el-form-item label="发票抬头">
              <span>{{ props.row.order_fapiao_title }}</span>
            </el-form-item>
            <el-form-item label="配送地址">
              <span>{{ props.row.consignee_addr }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" width="120"></el-table-column>
      <el-table-column prop="order_id" label="编号" width="120">
      </el-table-column>
      <!-- <el-table-column prop="province" label="省份" width="120">
      </el-table-column> -->
      <el-table-column prop="order_price" label="总价"> </el-table-column>
      <el-table-column prop="order_pay" label="支付方式">
        <template slot-scope="scope">
          <div v-if="scope.row.order_pay === '0'">未支付</div>
          <div v-if="scope.row.order_pay === '1'">支付宝</div>
          <div v-if="scope.row.order_pay === '2'">微信</div>
          <div v-if="scope.row.order_pay === '3'">银行卡</div>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="发货状态" width="120">
      </el-table-column>
      <el-table-column prop="create_time" label="下单时间" width="300">
        <template slot-scope="scope">
          {{ scope.row.create_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300">
        <template slot-scope="scope">
          <el-card
            shadow="hover"
            class="box-card handle"
            @click.native="deleteById(scope.row.order_id)"
          >
            删除
          </el-card>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="queryInfo.pagenum"
      :page-sizes="[5, 10, 15]"
      :page-size="queryInfo.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
    >
    </el-pagination>
  </div>
</template>

<script>
export default {
  created() {
    this.master = window.sessionStorage.getItem('username')
    this.activePath = window.sessionStorage.getItem('activePath')
    this.getMyorders()
  },
  data() {
    return {
      orderList: [],
      queryInfo: {
        query: window.sessionStorage.getItem('user_id'),
        pagenum: 1,
        pagesize: 10,
      },
      total: '',
    }
  },
  methods: {
    async getMyorders() {
      console.log('asdfasdfsdafsdfasdf')
      const { data: res } = await this.$http.get('orders/found', {
        params: this.queryInfo,
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.orderList = res.data.orders
      this.total = res.data.orders.length

      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getMyorders()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getMyorders()
    },
    async deleteById(id) {
      console.log(id)
      const confirmResult = await this.$confirm(
        '您确定要删除该订单吗？',
        `${this.master}:`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).catch((err) => err)
      console.log(confirmResult)
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除')
      }
      const { data: res } = await this.$http.delete('orders/' + id)
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg)
      this.$message.success('删除订单成功！')
      this.getMyorders()
    },
  },
}
</script>
<style lang="less" scoped>
.mytable {
  width: 80%;
  min-height: 600px;
  margin: 50px auto;
}
.demo-table-expand {
  font-size: 0;
}
.el-form-item__label {
  width: 90px;
  color: #99a9bf;
}
.demo-table-expand .el-form-item {
  margin-right: 0;
  margin-bottom: 0;
  width: 50%;
}
.handle {
  cursor: pointer;
  float: left;
  width: 100px;
  height: 63px;
  text-align: center;
  margin-right: 20px;
  // line-height: 50px;
  padding: 0 !important;
}
</style>
