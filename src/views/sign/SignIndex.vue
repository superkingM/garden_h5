<template>
  <div>
    <van-nav-bar title="签到" left-text="我的花园" left-arrow @click-left="back"></van-nav-bar>
    <van-cell-group inset title="签到获得">
      <van-cell>
        <template #title>
          <van-tag type="primary" size="mini">{{ name }}</van-tag>
        </template>
        <template #default>
          <van-tag type="warning" size="mini">数量:1</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset title="签到历史">
      <van-cell v-for="(item,index) in signData" :key="index">
        <template #title>
          <van-tag type="primary" size="mini">{{ item.garden_name }}:</van-tag>
          <span> 获得 </span>
          <van-tag type="success" size="mini">{{ item.name }}</van-tag>
        </template>
        <template #default>
          <van-tag type="warning" size="mini">数量:1</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {doSign, signLog} from "@/api/sign";

export default {
  data() {
    return {
      name: '',
      signData: []
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    sign() {
      doSign().then(res => {
        this.name = res.data.name
      })
    },
    signList() {
      signLog().then(res => {
        this.signData = res.data
      })
    }
  },
  mounted() {
    this.sign()
    this.signList()
  }
}
</script>