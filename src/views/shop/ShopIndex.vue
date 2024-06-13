<template>
  <div>
    <van-nav-bar title="商店" left-text="我的花园" left-arrow @click-left="back"></van-nav-bar>
    <van-search v-model="search" show-action placeholder="请输入名称搜索" @search="onSearch"
                @cancel="onCancel"></van-search>
    <van-cell-group>
      <van-tabs v-model="active">
        <van-tab title="种子" name="seed">
          <van-cell v-for="item in seedData" :key="item.id">
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
        </van-tab>
        <van-tab title="道具" name="daoju">
          <van-cell v-for="item in propData" :key="item.id">
            <template #default>
              <van-stepper v-model="item.qty" max="99" theme="round" button-size="16px"></van-stepper>
              <van-button plain type="primary" size="mini" @click="handBuyProp(item.qty,item.id)">购买</van-button>
            </template>
            <template #title>
              <van-tag type="primary" size="mini">{{ item.name }}</van-tag>
            </template>
            <template #label>
              <van-tag type="warning" size="mini">价格:{{ item.price }}金币</van-tag>
            </template>
          </van-cell>
        </van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>
<script>
import {buyProp, flower, prop} from "@/api/shop";
import {buySeed} from "@/api/flowerpot";
import {Notify} from "vant";

export default {
  data() {
    return {
      search: '',
      seedData: [],
      active: 'seed',
      propData: []
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    getSeedList() {
      flower({search: this.search}).then(res => {
        this.seedData = res.data
      })
    },
    getPropData() {
      prop({search: this.search}).then(res => {
        this.propData = res.data
      })
    },
    onSearch() {
      if (this.active === 'seed') {
        this.getSeedList()
      }
      if (this.active === 'daoju') {
        this.getPropData()
      }
    },
    onCancel() {
      this.search = ''
      this.getSeedList()
      this.getPropData()
    },
    buy(qty, id) {
      buySeed({id: id, qty: qty}).then(res => {
        this.$store.dispatch('user/getInfo')
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
      })
    },
    handBuyProp(qty, id) {
      buyProp({id: id, qty: qty}).then(res => {
        this.$store.dispatch('user/getInfo')
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.$store.dispatch('user/getInfo')
      })
    }
  },
  mounted() {
    this.getSeedList()
    this.getPropData()
  }
}
</script>