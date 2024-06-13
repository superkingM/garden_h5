<template>
  <div>
    <van-nav-bar title="我的花园"></van-nav-bar>
    <van-grid clickable :column-num="5" :border="false">
      <van-grid-item icon="flower-o" text="花园" to="/"></van-grid-item>
      <van-grid-item icon="star-o" text="魔法屋" to="/magic"></van-grid-item>
      <van-grid-item icon="home-o" text="花房" to="/"></van-grid-item>
      <van-grid-item icon="friends-o" text="好友" to="/"></van-grid-item>
      <van-grid-item icon="fire-o" text="活动" badge="hot" to="/"></van-grid-item>
    </van-grid>
    <van-cell-group inset>
      <template #title>
        <van-cell>
          <template #title>
            <span>昵称:{{ gardenName }}</span>
          </template>
          <template #default>
            <van-button plain type="primary" size="mini" @click="editName">修改昵称</van-button>
            <van-button plain type="danger" size="mini" @click="handleLogout">退出</van-button>
          </template>
        </van-cell>
      </template>
      <van-cell>
        <template #title>
          <van-tag type="success">金币:</van-tag>
          <span>{{ gold }}</span>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-tag :color="levelColor">
            lv{{ level }}:{{ levelName }}({{ exp }}/{{ levelExp }})
          </van-tag>
        </template>
      </van-cell>
      <van-cell :label="gardenNotice">
        <template #title>
          <van-tag type="success">公告板</van-tag>
        </template>
        <template #default>
          <van-button plain type="info" size="mini" @click="changeNotice">修改公告</van-button>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <span>花之图谱({{ atlasData.playerTotal }}/{{ atlasData.total }})</span>
        </template>
        <template #label>
          <van-tag type="success">普通:{{ atlasData.p }}</van-tag>
          <van-tag type="danger">独特:{{ atlasData.d }}</van-tag>
          <van-tag type="warning">珍稀:{{ atlasData.z }}</van-tag>
        </template>
      </van-cell>
      <van-cell>
        <template #title>
          <van-image :src="item.imgUrl" v-for="(item,index) in imgUrlData" :key="index"></van-image>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset>
      <template #title>
        <van-cell>
          <template #title>
            <van-tag type="success">我的花盆({{ flowerpotListData.length }})</van-tag>
          </template>
          <template #default>
            <van-button plain type="primary" size="mini" to="/addBasin">添置新花盆</van-button>
            <van-button plain type="info" size="mini" @click="getFlowerpotList">刷新</van-button>
          </template>
        </van-cell>
      </template>
      <van-cell v-for="item in flowerpotListData" :key="item.id">
        <template #label>
          <span v-if="item.status===1&&item.ripe_status===0">{{ item.stage }}:({{ item.down }})</span>
        </template>
        <template #title>
          <span>{{ item.seq }}号花盆:</span>
          <van-tag type="success">{{ item.name }}</van-tag>
        </template>
        <template #default>
          <van-button plain type="primary" size="mini" v-if="item.status===1&&item.ripe_status===0&&item.water===1"
                      @click="handleWater(item.id)">
            浇水
          </van-button>
          <van-button plain type="info" size="mini" v-if="item.status===1&&item.ripe_status===0&&item.bug===1"
                      @click="handleBug(item.id)">除虫
          </van-button>
          <van-button plain type="warning" size="mini" v-if="item.status===1&&item.ripe_status===0&&item.grass===1"
                      @click="handleGrass(item.id)">
            除草
          </van-button>
          <van-button color="linear-gradient(to right, #ff6034, #7232dd)" size="mini"
                      v-if="item.status===1&&item.ripe_status===0&&item.dye===1" @click="handleDye(item.id)">染色
          </van-button>
          <van-button plain color="#7232dd" size="mini" v-if="item.ripe_status===1" @click="harvest(item.id)">
            收获
          </van-button>
          <van-button plain color="#2f363c" size="mini" v-if="item.status===0" @click="plant(item.id)">播种
          </van-button>
        </template>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset>
      <template #title>
        <van-tag type="primary" size="mini">更多聊天</van-tag>
      </template>
      <van-cell v-for="(item,index) in chatData" :key="index">
        <div style="float: left">
          <van-tag type="success">{{ item.garden_name }}:</van-tag>
          <span> {{ item.msg }}</span></div>
      </van-cell>
      <van-cell>
        <div style="float: left">
          <van-button type="primary" size="mini" @click="chatShow=true">发言</van-button>
        </div>
      </van-cell>
    </van-cell-group>
    <van-cell-group inset>
      <template #title>
        <span>功能导航</span>
      </template>
      <van-grid clickable :column-num="5" :border="false">
        <van-grid-item icon="bag" text="背包" to="/backpack"></van-grid-item>
        <van-grid-item icon="shop" text="商店" to="/shop"></van-grid-item>
        <van-grid-item text="排行" icon="ascending" to="/rank" dot></van-grid-item>
        <van-grid-item icon="records" text="签到" to="/sign"></van-grid-item>
        <van-grid-item icon="question" text="帮助" to="/"></van-grid-item>
      </van-grid>
    </van-cell-group>
    <change-name :name-show.sync="nameShow" :garden-name="gardenName"></change-name>
    <change-notice :notice-show.sync="noticeShow" :garden-notice="gardenNotice"></change-notice>
    <dye-list :dye-show.sync="dyeShow" :dye-id="basinId" :dye-list="dyeListData"
              @refresh-list="getFlowerpotList"></dye-list>
    <push-chat :chat-show.sync="chatShow" @refresh-list="worldChat"></push-chat>
  </div>
</template>
<script>
import changeNotice from "@/components/flower/ChangeNotice.vue";
import ChangeName from "@/components/flower/ChangeName.vue";
import {mapGetters} from "vuex";
import {atlas, bug, dyeList, flowerpotList, grass, harvest, water} from '@/api/flowerpot'
import {Notify} from "vant";
import DyeList from "@/components/flower/DyeList.vue";
import {world} from "@/api/chat";
import PushChat from "@/components/flower/PushChat.vue";

export default {
  components: {
    PushChat,
    DyeList,
    changeNotice,
    ChangeName
  },
  data() {
    return {
      noticeShow: false,
      flowerpotListData: [],
      nameShow: false,
      dyeListData: [],
      basinId: 0,
      dyeShow: false,
      atlasData: {},
      imgUrlData: [
        {imgUrl: require('@/assets/i/m_s_1.gif')},
        {imgUrl: require('@/assets/i/m_s_2.gif')},
        {imgUrl: require('@/assets/i/m_s_3.gif')},
        {imgUrl: require('@/assets/i/m_s_4.gif')},
        {imgUrl: require('@/assets/i/m_s_5.gif')},
        {imgUrl: require('@/assets/i/m_s_6.gif')},
        {imgUrl: require('@/assets/i/m_s_7.gif')},
        {imgUrl: require('@/assets/i/m_s_8.gif')},
      ],
      chatData: [],
      chatShow: false
    }
  },
  computed: {
    ...mapGetters([
      'username',
      'gardenName',
      'gardenNotice',
      'level',
      'gold',
      'exp',
      'levelExp',
      'levelName',
      'levelColor'
    ])
  },
  methods: {
    editName() {
      this.nameShow = true
    },
    changeNotice() {
      this.noticeShow = true
    },
    getFlowerpotList() {
      flowerpotList().then(res => {
        this.flowerpotListData = res.data
      })
    },
    getAtlasData() {
      atlas().then(res => {
        this.atlasData = res.data
      })
    },
    handleLogout() {
      this.$store.dispatch('user/logout').then(() => {
        this.$router.push({path: '/login'})
      })
    },
    harvest(id) {
      harvest({id: id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.refreshUserInfo()
        this.getFlowerpotList()
        this.getAtlasData()
      })
    },
    plant(id) {
      this.$router.push({path: `/plant/${id}`})
    },
    handleWater(id) {
      water({id: id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.getFlowerpotList()
        this.refreshUserInfo()
      })
    },
    handleBug(id) {
      bug({id: id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.getFlowerpotList()
        this.refreshUserInfo()
      })
    },
    handleGrass(id) {
      grass({id: id}).then(res => {
        Notify({
          type: 'success',
          message: res.msg,
          duration: 1000
        });
        this.getFlowerpotList()
        this.refreshUserInfo()
      })
    },
    handleDye(id) {
      this.basinId = id
      dyeList({id: id}).then(res => {
        this.dyeListData = res.data
        this.dyeShow = true
      })
    },
    refreshUserInfo() {
      this.$store.dispatch('user/getInfo')
      this.worldChat()
    },
    worldChat() {
      world().then(res => {
        this.chatData = res.data
      })
    }
  },
  mounted() {
    this.getFlowerpotList()
    this.getAtlasData()
    this.worldChat()
  }
}
</script>