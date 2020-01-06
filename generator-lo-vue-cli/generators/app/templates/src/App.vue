<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import Bus from '@/assets/bus/eventBus'
export default {
  name: 'App',
  created () {
    this.receivePTLMsg()
  },
  methods: {
    /**
     * 接收门户消息
     */
    receivePTLMsg () {
      this.$LOPTL.listen((message, data) => {
        // 约定方法，进行内部实现
        if (message === 'refresh') {
          Bus.$emit('LOPTL_Refresh', data)
        }
      })
    }
  }
}
</script>
<style>
* {
  padding: 0;
  margin: 0;
}
body {
  height: 100vh;
  background-color: #f7f7f7;
  font-family: "微软雅黑 Bold", "微软雅黑 Regular", "微软雅黑";
}
textarea,
input {
  font-family: "Microsoft YaHei", "微软雅黑", "Helvetica Neue", Helvetica,
    "PingFang SC", "Hiragino Sans GB", Arial, sans-serif;
}
</style>
