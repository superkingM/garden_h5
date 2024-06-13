<template>
  <div>
    <van-nav-bar title="登录" left-text="去注册" left-arrow @click-left="back"></van-nav-bar>
    <van-form @submit="onSubmit">
      <van-field
          v-model="username"
          name="username"
          label="用户名"
          placeholder="用户名" maxlength="16"
          :rules="[{ required: true, message: '请填写用户名' }]"
      ></van-field>
      <van-field
          v-model="password"
          name="username"
          label="密码"
          placeholder="密码" maxlength="16"
          :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>
<script>
export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    onSubmit() {
      this.$store.dispatch('user/login', {username: this.username,password:this.password}).then(() => {
        this.$router.push({path: this.redirect || '/'})
      })
    },
    back() {
      this.$router.push({path: '/register'})
    }
  }
}
</script>
