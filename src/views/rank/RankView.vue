<template>
  <div>
    <van-nav-bar title="排行榜" left-text="我的花园" left-arrow
                 @click-left="back"></van-nav-bar>
    <van-tabs v-model="active">
      <van-tab title="花谱榜" name="atlas">
        <van-cell-group>
          <van-cell v-for="(item,index) in rankAtlasData" :key="index">
            <template #title>
              <van-tag type="danger" v-if="item.seq === 1">no.1花神:{{ item.garden_name }}</van-tag>
              <van-tag type="warning" v-else-if="item.seq === 2">no.2花仙:{{ item.garden_name }}</van-tag>
              <van-tag type="primary" v-else-if="item.seq === 3">no.3花圣:{{ item.garden_name }}</van-tag>
              <van-tag type="default" v-else>no.{{ item.seq }}:{{ item.garden_name }}</van-tag>
            </template>
            <template #default>
              <span>已点亮{{ item.qty }}</span>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <van-tag type="danger" v-if="userRank.atlas === 0">未上榜</van-tag>
              <van-tag type="success" v-else>排名:{{userRank.atlas}}</van-tag>
            </template>
          </van-cell>
          <van-pagination v-model="atlasPage" :page-count="atlasCount" mode="simple" @change="atlasChange"/>
        </van-cell-group>
      </van-tab>
      <van-tab title="等级榜" name="level">
        <van-cell-group>
          <van-cell v-for="(item,index) in rankLevelData" :key="index">
            <template #title>
              <van-tag type="danger" v-if="item.seq === 1">no.1出神入化:{{ item.garden_name }}</van-tag>
              <van-tag type="warning" v-else-if="item.seq === 2">no.2登峰造极:{{ item.garden_name }}</van-tag>
              <van-tag type="primary" v-else-if="item.seq === 3">no.3手法通天:{{ item.garden_name }}</van-tag>
              <van-tag type="default" v-else>no.{{ item.seq }}:{{ item.garden_name }}</van-tag>
            </template>
            <template #default>
              <span>等级:{{ item.level }}</span>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <van-tag type="danger" v-if="userRank.level === 0">未上榜</van-tag>
              <van-tag type="success" v-else>排名:{{userRank.level}}</van-tag>
            </template>
          </van-cell>
          <van-pagination v-model="levelPage" :page-count="levelCount" mode="simple" @change="levelChange"/>
        </van-cell-group>
      </van-tab>
      <van-tab title="财富榜" name="gold">
        <van-cell-group>
          <van-cell v-for="(item,index) in rankGoldData" :key="index">
            <template #title>
              <van-tag type="danger" v-if="item.seq === 1">no.1富可敌国:{{ item.garden_name }}</van-tag>
              <van-tag type="warning" v-else-if="item.seq === 2">no.2富甲一方:{{ item.garden_name }}</van-tag>
              <van-tag type="primary" v-else-if="item.seq === 3">no.3腰缠万贯:{{ item.garden_name }}</van-tag>
              <van-tag type="default" v-else>no.{{ item.seq }}:{{ item.garden_name }}</van-tag>
            </template>
            <template #default>
              <span>财富:{{ item.gold }}</span>
            </template>
          </van-cell>
          <van-cell>
            <template #title>
              <van-tag type="danger" v-if="userRank.gold === 0">未上榜</van-tag>
              <van-tag type="success" v-else>排名:{{userRank.gold}}</van-tag>
            </template>
          </van-cell>
          <van-pagination v-model="goldPage" :page-count="goldCount" mode="simple" @change="goldChange"/>
        </van-cell-group>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script>
import {atlas, gold, level, queryRank} from "@/api/rank";

export default {
  data() {
    return {
      active: 'atlas',
      rankAtlasData: [],
      rankLevelData: [],
      rankGoldData: [],
      userRank: {
        atlas: 0,
        gold: 0,
        level: 0
      },
      atlasPage: 1,
      atlasCount: 10,
      levelPage: 1,
      levelCount: 10,
      goldPage: 1,
      goldCount: 10,
    }
  },
  methods: {
    back() {
      this.$router.push({path: '/'})
    },
    rankAtlas() {
      atlas({page: this.atlasPage}).then(res => {
        this.rankAtlasData = res.data.rows
        this.atlasCount = res.data.total
      })
    },
    rankLevel() {
      level({page: this.levelPage}).then(res => {
        this.rankLevelData = res.data.rows
        this.levelCount = res.data.total
      })
    },
    rankGold() {
      gold({page: this.goldPage}).then(res => {
        this.rankGoldData = res.data.rows
        this.goldCount = res.data.total
      })
    },
    userRankInfo() {
      queryRank({type: 'atlas'}).then(res => {
        this.userRank.atlas = res.data.seq
      })
      queryRank({type: 'gold'}).then(res => {
        this.userRank.gold = res.data.seq
      })
      queryRank({type: 'level'}).then(res => {
        this.userRank.level = res.data.seq
      })
    },
    atlasChange() {
      this.rankAtlas()
    },
    levelChange() {
      this.rankLevel()
    },
    goldChange() {
      this.rankGold()
    }
  },
  mounted() {
    this.rankAtlas()
    this.rankLevel()
    this.rankGold()
    this.userRankInfo()
  }
}
</script>