<template>
  <div>
    <!-- <el-button type="primary" @click="handleCommand">sdafsdaf</el-button> -->
    <el-table
      :data="carList"
      class="mytable"
      :default-sort="{ prop: 'car_id', order: 'descending' }"
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="购物车ID">
              <span>{{ props.row.car_id }}</span>
            </el-form-item>
            <el-form-item label="商品名称">
              <span>{{ props.row.car_fapiao_content }}</span>
            </el-form-item>
            <el-form-item label="商品数量">
              <span>{{ props.row.trade_no }}</span>
            </el-form-item>
            <el-form-item label="总金额">
              <span>{{ props.row.car_price }} 元</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column type="index" width="120"></el-table-column>
      <el-table-column prop="car_id" label="编号" width="120">
      </el-table-column>
      <!-- <el-table-column prop="province" label="省份" width="120">
      </el-table-column> -->
      <el-table-column prop="car_price" label="总价"> </el-table-column>
      <el-table-column prop="create_time" label="创建时间" width="200">
        <template slot-scope="scope">
          {{ scope.row.create_time | dateFormat }}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="300px">
        <template slot-scope="scope">
          <el-card
            shadow="hover"
            class="box-card handle"
            @click.native="goBuy(scope.row.car_id)"
          >
            下单
          </el-card>
          <el-card
            shadow="hover"
            class="box-card handle"
            @click.native="deleteById(scope.row.car_id)"
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
    this.user_id = window.sessionStorage.getItem('user_id')
    this.getCarsList()
  },
  data() {
    return {
      carList: [],
      queryInfo: {
        query: window.sessionStorage.getItem('user_id'),
        pagenum: 1,
        pagesize: 15,
      },
      total: '',
      user_id: '',
      master: '',
    }
  },
  methods: {
    async getCarsList() {
      console.log('asdfasdfsdafsdfasdf')
      const { data: res } = await this.$http.get('car/found', {
        params: this.queryInfo,
      })
      console.log(res)
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg)
      }
      this.carList = res.data.keys
      this.total = res.data.keys.length

      console.log(res)
    },
    handleSizeChange(newSize) {
      this.queryInfo.pagesize = newSize
      this.getCarsList()
    },
    handleCurrentChange(newPage) {
      this.queryInfo.pagenum = newPage
      this.getCarsList()
    },
    async goBuy(id) {
      const confirmResult = await this.$confirm(
        '请仔细核对购物单中的信息！',
        `${this.master}:`,
        {
          confirmButtonText: '确认下单',
          cancelButtonText: '让我再核对一下',
          type: 'warning',
        }
      ).catch((err) => err)
      console.log(confirmResult)

      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消下单')
      }
      const aaa = this.carList.filter((curitem, index) => {
        return curitem.car_id == id
      })
      const { data: res } = await this.$http.post('orders', {
        user_id: this.user_id,
        order_price: aaa[0].car_price,
        order_pay: '0',
        is_send: '否',
        order_fapiao_title: '',
        consignee_addr: aaa[0].consignee_addr,
        order_fapiao_content: aaa[0].car_fapiao_content,
        trade_no: aaa[0].trade_no,
      })
      if (res.meta.status !== 201) return this.$message.error(res.meta.msg)

      this.dialog = false
      this.$message.success('购买成功！请耐心等待发货')
    },
    async deleteById(id) {
      console.log(id);
      const confirmResult = await this.$confirm(
        '您确定要删除该购物单吗？',
        `${this.master}:`,
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }
      ).catch(err => err);
      console.log(confirmResult);
      if (confirmResult !== 'confirm') {
        return this.$message.info('已取消删除');
      }
      const { data: res } = await this.$http.delete('car/' + id);
      if (res.meta.status !== 200) return this.$message.error(res.meta.msg);
      this.$message.success('删除购物清单成功！');
      this.getCarsList();
    },
  },
}
</script>
<style lang="less" scoped>
.mytable {
  width: 60%;
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
