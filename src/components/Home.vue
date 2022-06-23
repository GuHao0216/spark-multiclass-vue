<template>
  <div class="hello">
    <el-row>
      <el-col :span="12" :offset="6">
        <h1>森林植被类型预测系统</h1>
        <el-row>
          <el-col :span="18">
            <el-input
              v-model="textarea1"
              autosize
              type="textarea"
              placeholder="请输入54个植被特征，以逗号分隔"
            />
          </el-col>
          <el-col :span="5" :offset="1"
            ><el-button type="primary" @click="predict()"
              >预测植被类型</el-button
            >
            <el-button type="danger" @click="clearText()"
              >清空</el-button
            ></el-col
          ></el-row
        >
        <br />
        <br />
        <el-row>
          <div v-for="i in categories" :key="i.id" :id="i.id" class="init">
            {{ i.name }}
          </div>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";
import { ElLoading } from 'element-plus';

const textarea1 = ref("");
const categories = [
  { id: 1, name: "云杉 / 冷杉" },
  { id: 2, name: "洛奇波尔松" },
  { id: 3, name: "黄松" },
  { id: 4, name: "三叶杨 / 柳树" },
  { id: 5, name: "阿斯彭" },
  { id: 6, name: "花旗松" },
  { id: 7, name: "克鲁姆霍尔茨" },
];

const clearText = () => {
  textarea1.value = "";
  categories.forEach(function(item,index,self){
    document.getElementById((index+1).toString()).style.background = "white"
})


};

const predict = async () => {
    const loadingInstance = ElLoading.service({text:"类型预测中..."})
  axios({
    method: "post",
    url: "http://10.10.1.72:5000/predict",
    data: {"str":textarea1.value},
  }).then((res) => {
    const predictType = res.data.predict
    console.log(res.data.predict);
    document.getElementById((predictType+1).toString()).style.background = "green"
    loadingInstance.close()
  });
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.init {
  width: 100px;
  height: 60px;
  border: #d3dce6 solid 1px;
  border-radius: 4px;
  margin-right: 8px;
  line-height: 60px;
}
</style>
