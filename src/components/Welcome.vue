<template>
  <div>
    <div id="welcome">
      <div id="w-head">
        <span>欢迎使用智慧教学大楼的电力大数据WEB远程检测系统</span>
      </div>
      <div id="w-carousel">
        <el-carousel :interval="4000" type="card" height="200px">
          <el-carousel-item v-for="item in 3" :key="item">
            <h3 class="medium"></h3>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div id="w-text">
        <span>使用说明</span><br />
        <span>大楼电量监测 -> 整栋</span><br />
        <span>教室电量监测 -> 点击楼层对应教室</span><br />
        <span>用户信息查看修改 -> 个人</span><br />
        <span>警告信息查询 -> 警告</span><br />
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="less" scoped>
#welcome {
  //   background-image: url("../assets/img/pig.jpg");
  display: flex;
  flex-direction: column;
}

#w-head {
  font-size: 200%;
  margin: 0 auto;
}

#w-carousel {
  margin: 0 auto;
  margin-top: 3%;
  height: 100%;
  width: 60%;
}

.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(3n) {
  background-image: url(../assets/img/dj1.jpg);
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(3n + 1) {
  background-image: url(../assets/img/hust.jpg);
  background-color: #ffffff;
  background-repeat: no-repeat;
  background-position:center;
}

.el-carousel__item:nth-child(3n + 2) {
  background-image: url(../assets/img/d9.jpg);
  background-color: #d3dce6;
  background-repeat: no-repeat;
}

#w-text {
  margin: 0 auto;
  font-size: 100%;
  line-height: 200%;
  text-align: center;
}
</style>