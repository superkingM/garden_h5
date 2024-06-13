<template>
  <div>
    <van-nav-bar title="种子商店" left-text="去播种" left-arrow @click-left="back"></van-nav-bar>
    <van-search v-model="search" show-action placeholder="请输入名称搜索" @search="getSeedShop"
                @cancel="onCancel"></van-search>
    <van-cell-group>
      <van-cell v-for="item in seedShopData" :key="item.id">
        <template #default>
          <van-stepper v-model="item.qty" max="99" theme="round" button-size="16px"></van-stepper>
          <van-button plain type="primary" size="mini" @click="buy(item.qty,item.id)">购买</van-button>
        </template>
        <template #title>
          <van-tag type="primary" size="mini">lv{{ item.level }}:{{ item.flower_name }}</van-tag>
        </template>
        <template #label>
          <van-tag type="warning" size="mini">价格:{{ item.buy_price }}金币</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {buySeed, seedShop} from "@/api/flowerpot";
import {Notify} from "vant";

export default {
  data() {
    return {
      search: '',
      seedShopData: []
    }
  },
  methods: {
    back() {
      this.$router.go(-1)
    },
    getSeedShop() {
      seedShop({search: this.search}).then(res => {
        this.seedShopData = res.data
      })
    },
    onCancel() {
      this.search = ''
      this.getSeedShop()
    },
    buy(qty, id) {
      buySeed({id: id, qty: qty}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
      })
    }
  },
  mounted() {
    this.getSeedShop()
  }
}
</script>