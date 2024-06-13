<template>
  <div>
    <van-nav-bar :title="name +'('+quantity+')'" left-text="我的花园" left-arrow
                 @click-left="back"></van-nav-bar>
    <van-cell-group>
      <template #title>
        <van-cell>
          <template #title>
            <van-tag type="success">可播种花盆({{ emptyBasinData.length }})</van-tag>
          </template>
        </van-cell>
      </template>
      <van-cell v-for="item in emptyBasinData" :key="item.id">
        <template #default>
          <van-button plain type="primary" size="mini" @click="handlePlant(item.id)">播种</van-button>
        </template>
        <template #title>
          <van-tag type="primary" size="mini">{{ item.seq }}号花盆</van-tag>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {emptyBasin, seed} from "@/api/backpack";
import {plant} from "@/api/flowerpot";
import {Notify} from "vant";

export default {
  data() {
    return {
      id: '',
      name: '',
      quantity: '',
      emptyBasinData: []
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    getSeed() {
      seed({id: this.$route.params.id}).then(res => {
        this.id = res.data.id
        this.name = res.data.name
        this.quantity = res.data.quantity
      })
    },
    getEmptyBasin() {
      emptyBasin().then(res => {
        this.emptyBasinData = res.data
      })
    },
    handlePlant(id) {
      plant({basinId: id, bagId: this.id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.getEmptyBasin()
        this.getSeed()
      })
    }
  },
  mounted() {
    this.getSeed()
    this.getEmptyBasin()
  }
}
</script>