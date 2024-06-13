<template>
  <div>
    <van-dialog v-model="show" title="聊天" show-cancel-button @cancel="cancelButton"
                @confirm="confirmButton">
      <template #default>
        <van-field v-model="msg" rows="2" autosize type="textarea" maxlength="100"
                   show-word-limit></van-field>
      </template>
    </van-dialog>
  </div>
</template>
<script>
import {Toast} from "vant";
import {push} from "@/api/chat";

export default {
  props: {
    chatShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      msg: ''
    }
  },
  methods: {
    cancelButton() {
      this.show = false
      this.$emit('update:chatShow', this.show)
    },
    confirmButton() {
      push({msg: this.msg}).then(() => {
        Toast.success('发送成功')
        this.msg = ''
        this.$emit('refresh-list')
      })
      this.show = false
      this.$emit('update:chatShow', this.show)
    }
  },
  watch: {
    chatShow(val) {
      this.show = val
    }
  }
}
</script>