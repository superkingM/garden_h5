<template>
  <div>
    <van-dialog v-model="show" title="修改昵称" show-cancel-button @cancel="cancelButton"
                @confirm="confirmButton">
      <template #default>
        <van-field v-model="name" rows="1" autosize type="textarea" maxlength="10"
                   show-word-limit></van-field>
      </template>
    </van-dialog>
  </div>
</template>
<script>
import {Toast} from "vant";

export default {
  props: {
    nameShow: {
      type: Boolean,
      default: false
    },
    gardenName: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      show: false,
      name: this.gardenName
    }
  },
  methods: {
    cancelButton() {
      this.show = false
      this.$emit('update:nameShow', this.show)
    },
    confirmButton() {
      this.$store.dispatch('user/changeName', {name: this.name}).then(() => {
        Toast.success('修改成功')
      })
      this.show = false
      this.$emit('update:nameShow', this.show)
    }
  }, watch: {
    nameShow(val) {
      this.show = val
    },
    gardenName(val) {
      this.name = val
    }
  }
}
</script>