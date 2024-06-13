<template>
  <div>
    <van-nav-bar title="魔法屋" left-text="我的花园" left-arrow
                 @click-left="back"></van-nav-bar>
    <van-search v-model="search" show-action placeholder="请输入名称搜索" @search="onSearch"
                @cancel="onCancel"></van-search>
    <van-cell-group>
      <van-cell v-for="item in flowerData" :key="item.id">
        <template #default>
          <van-button plain type="primary" size="mini" @click="compound(item.id)">去合成</van-button>
        </template>
        <template #title>
          <van-tag type="primary" size="mini">lv{{ item.level }}:{{ item.flower_name }}</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {flower} from "@/api/magic";

export default {
  data() {
    return {
      search: '',
      flowerData: []
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    onCancel() {
      this.search = ''
    },
    onSearch() {

    },
    flowerList() {
      flower().then(res => {
        this.flowerData = res.data
      })
    },
    compound(id){
      this.$router.push({path: `/magic/hc/${id}`})
    }
  },
  mounted() {
    this.flowerList()
  }
}
</script>
