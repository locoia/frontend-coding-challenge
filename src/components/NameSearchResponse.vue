<template>
  <div class="container" v-show='this.message !== ""'>
    <div v-if="this.winner">
      <p>{{ this.message }}</p>
      <br />
      <el-button @click="this.accept()">Accept</el-button>
      <el-button @click="this.reject()">Reject</el-button>
    </div>
    <div v-else>
      {{ this.message }}
      <br /> <br />
      <el-button @click="this.reset()">Ok</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NameSearchResponse',
  props: {
    message: String,
    winner: Boolean,
  },
  methods: {
    reset() {
      this.$emit('restart')
    },
    reject() {
      this.$emit('reject')
    },
    accept() {
      this.$emit('accept')
    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;
}
</style>
