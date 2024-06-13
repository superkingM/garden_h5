<template>
  <div>
    <van-nav-bar title="我的背包" left-text="我的花园" left-arrow @click-left="back"></van-nav-bar>
    <van-search v-model="search" show-action placeholder="请输入名称搜索" @search="onSearch"
                @cancel="onCancel"></van-search>
    <van-cell-group>
      <van-tabs v-model="active">
        <van-tab title="种子" name="seed">
          <van-cell v-for="item in seedData" :key="item.id">
            <template #default>
              <van-button plain type="primary" size="mini" @click="plant(item.id)">去播种</van-button>
            </template>
            <template #title>
              <van-tag type="primary" size="mini">lv{{ item.level }}:{{ item.name }}</van-tag>
            </template>
            <template #label>
              <van-tag type="warning" size="mini">数量:{{ item.quantity }}</van-tag>
            </template>
          </van-cell>
        </van-tab>
        <van-tab title="道具" name="daoju">
          <van-cell v-for="item in propData" :key="item.id">
            <template #title>
              <van-tag type="primary" size="mini">{{ item.name }}</van-tag>
            </template>
            <template #label>
              <van-tag type="warning" size="mini">数量:{{ item.qty }}</van-tag>
            </template>
          </van-cell>
        </van-tab>
      </van-tabs>
    </van-cell-group>
  </div>
</template>
<script>
import {list, prop, seed} from "@/api/backpack";

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
      list({search: this.search}).then(res => {
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
    plant(id) {
      seed({id: id}).then(()=>{
        this.$router.push({path: `/backpack/plant/${id}`})
      })

    }
  },
  mounted() {
    this.getSeedList()
    this.getPropData()
  }
}
</script>