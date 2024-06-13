<template>
  <div>
    <van-nav-bar :title="seq+'号花盆播种'" left-text="我的花园" left-arrow @click-left="back"></van-nav-bar>
    <van-search v-model="search" show-action placeholder="请输入名称搜索" @search="bag" @cancel="onCancel"></van-search>
    <van-cell-group>
      <template #title>
        <van-button type="info" size="mini" @click="handleBuy">去商店购买</van-button>
      </template>
      <van-cell v-for="item in bagData" :key="item.id">
        <template #default>
          <van-button plain type="primary" size="small" @click="handlePlant(item.id)">播种</van-button>
        </template>
        <template #title>
          <span>{{ item.name }}({{ item.quantity }})</span>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {plant, plantBag, plantBasin} from "@/api/flowerpot";
import {Notify} from "vant";

export default {
  data() {
    return {
      search: '',
      id: '',
      seq: '',
      bagData: []
    }
  },
  methods: {
    getPlantBasin() {
      plantBasin(this.$route.params.id).then(res => {
        this.id = res.data.id;
        this.seq = res.data.seq;
      })
    },
    getPlantBag() {
      plantBag({search: this.search}).then(res => {
        this.bagData = res.data
      })
    },
    back() {
      this.$router.push({path: '/'})
    },
    bag() {
      this.getPlantBag()
    },
    onCancel() {
      this.search = ''
      this.getPlantBag()
    },
    handlePlant(id) {
      plant({bagId: id, basinId: this.id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.$router.push({path: '/'})
      })
    },
    handleBuy(){
      this.$router.push({path:'/seedShop'})
    }
  }, mounted() {
    this.getPlantBasin()
    this.getPlantBag()
  }
}
</script>