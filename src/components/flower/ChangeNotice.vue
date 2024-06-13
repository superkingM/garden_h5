<template>
  <div>
    <van-dialog v-model="show" title="修改公告" show-cancel-button @cancel="cancelButton" @confirm="confirmButton">
      <template #default>
        <van-field v-model="name" rows="2" autosize type="textarea" maxlength="50"
                   show-word-limit></van-field>
      </template>
    </van-dialog>
  </div>
</template>
<script>
import {Toast} from "vant";

export default {
  props: {
    noticeShow: {
      type: Boolean,
      default: false
    },
    gardenNotice: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      name: this.gardenNotice
    }
  },
  methods: {
    cancelButton() {
      this.show = false
      this.$emit('update:noticeShow', this.show)
    },
    confirmButton() {
      this.$store.dispatch('user/changeNotice', {name: this.name}).then(() => {
        Toast.success('修改成功')
      })
      this.show = false
      this.$emit('update:noticeShow', this.show)
    }
  },
  watch: {
    noticeShow(val) {
      this.show = val
    },
    gardenNotice(val) {
      this.name = val
    }
  }
}
</script>