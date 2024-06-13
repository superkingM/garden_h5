<template>
  <div>
    <van-nav-bar :title="'合成('+listData[0].flower_name+')'" left-text="我的花园" left-arrow
                 @click-left="back"></van-nav-bar>
    <van-cell-group inset>
      <van-cell v-for="(item,index) in listData" :key="index">
        <template #title>
          <van-tag type="primary">{{ item.atlas_name }}</van-tag>
        </template>
        <template #label>
          <span>数量:({{ item.dQty }}/{{ item.qty }})</span>
        </template>
        <template #default>
          <van-tag type="primary" v-if="item.dQty>=item.qty">满足</van-tag>
          <van-tag type="danger" v-else>不满足</van-tag>
        </template>
      </van-cell>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit" v-if="showButton" @click="handleCompound">合成
        </van-button>
      </div>
    </van-cell-group>
  </div>
</template>
<script>
import {compound, show} from "@/api/magic";
import {Notify} from "vant";

export default {
  data() {
    return {
      listData: []
    }
  },
  computed: {
    showButton: function () {
      let flag = true
      this.listData.forEach(item => {
        if (item.qty > item.dQty) {
          flag = false
        }
      })
      return flag
    }
  },
  methods: {
    handleCompound() {
      compound({id: this.$route.params.id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.list()
      })
    },
    back() {
      this.$router.push({path: '/'})
    },
    list() {
      show({id: this.$route.params.id}).then(res => {
        this.listData = res.data
      })
    }
  },
  mounted() {
    this.list()
  }
}
</script>