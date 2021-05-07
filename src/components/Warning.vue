<template>
  <div>
    <el-card>
      <el-row :gutter="20">
        <el-col :span="7">
          <el-input placeholder="请输入内容">
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </el-col>
        <el-col :span="4">
          <el-button type="primary">主要按钮</el-button>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 获取报警历史数据对象
      queryInfo:{}
    };
  },
  created() {
    // this.getAlarmMesg();
  },

  methods: {
    async getAlarmMesg(){
      const {data:res} = await this.$http.get("", {
        params:this.queryInfo
      })
    }
  }
}
</script>

<style lang="less" scoped>

</style>


