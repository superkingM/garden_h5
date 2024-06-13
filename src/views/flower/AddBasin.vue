<template>
  <div>
    <van-nav-bar title="添置花盆" left-text="我的花园" left-arrow @click-left="back"></van-nav-bar>
    <van-cell-group inset>
      <van-cell value="内容">
        <template #title>
          <van-tag type="primary">等级:lv{{ nextBasinData.level }}</van-tag>
        </template>
        <template #default>
          <van-tag type="primary" v-if="level >= nextBasinData.level">满足</van-tag>
          <van-tag type="danger" v-else>不满足</van-tag>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-tag type="success">金币:{{ nextBasinData.gold }}</van-tag>
        </template>
        <template #default>
          <van-tag type="primary" v-if="gold >= nextBasinData.gold">满足</van-tag>
          <van-tag type="danger" v-else>不满足</van-tag>
        </template>
      </van-cell>
      <van-cell v-if="level >= nextBasinData.level && gold >= nextBasinData.gold">
        <template #default>
          <van-button type="primary" size="mini" plain @click="handleAddBasin">添置花盆</van-button>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
</template>
<script>
import {addBasin, nextBasin} from "@/api/flowerpot";
import {mapGetters} from "vuex";
import {Notify} from "vant";

export default {
  data() {
    return {
      nextBasinData: {}
    }
  },
  computed: {
    ...mapGetters([
      'level',
      'gold'
    ])
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    getNextBasin() {
      nextBasin().then(res => {
        this.nextBasinData = res.data
      })
    },
    handleAddBasin() {
      addBasin().then(() => {
        Notify({
          type: 'success',
          message: '添置花盆成功',
          duration: 1000
        });
        this.$store.dispatch('user/getInfo')
        this.$router.push({path: '/'})
      })
    }
  },
  mounted() {
    this.getNextBasin()
  }
}
</script>