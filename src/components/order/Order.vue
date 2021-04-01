<template>
  <div>
    <el-button type="primary" @click="handleCommand">sdafsdaf</el-button>
  </div>
</template>

<script>
export default {
  created() {
    this.master = window.sessionStorage.getItem('username')
    this.activePath = window.sessionStorage.getItem('activePath');
  },
  data() {
    return {
      activeIndex: '/index',
      activeIndex2: '1',
    }
  },
  methods: {
    async handleCommand() {
      console.log('asdfasdfsdafsdfasdf')
      const { data: res } = await this.$http.get('orders/found', {
        // params:this.queryInfo
        params: {
          // query: this.queryInfo.query,
          // pagenum: this.queryInfo.pagenum,
          // pagesize: this.queryInfo.pagesize
          query: 1,
          pagenum: 1,
          pagesize: 10
        }
      });
      console.log(res);
      if (res.meta.status !== 200) {
        return this.$message.error(res.meta.msg);
      }
      console.log(res);
    },
  },
}
</script>
<style lang="less" scoped>

</style>
