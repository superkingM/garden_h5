<template>
  <div>
    <van-dialog v-model="show" title="选择颜色" show-cancel-button @cancel="cancelButton"
                @confirm="confirmButton">
      <template #default>
        <van-field name="se">
          <template #input>
            <van-radio-group v-model="color">
              <van-radio :name="item.id" v-for="item in dyeList" :key="item.id">{{ item.name }}</van-radio>
            </van-radio-group>
          </template>
        </van-field>
      </template>
    </van-dialog>
  </div>
</template>
<script>
import {Toast} from "vant";
import {dye} from "@/api/flowerpot";

export default {
  props: {
    dyeShow: {
      type: Boolean,
      default: false
    },
    dyeId: {
      type: Number,
      default: 0
    },
    dyeList: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      show: false,
      color: 0,
      id: 0
    }
  },
  methods: {
    cancelButton() {
      this.show = false
      this.$emit('update:dyeShow', this.show)
      this.color = 0
    },
    confirmButton() {
      dye({id: this.id, atlas_id: this.color}).then(res => {
        Toast.success(res.msg)
      })
      this.show = false
      this.$emit('update:dyeShow', this.show)
      this.$emit('refresh-list')
      this.color = 0
    }
  },
  watch: {
    dyeShow(val) {
      this.show = val
    },
    dyeId(val) {
      this.id = val
    }
  },
}
</script>