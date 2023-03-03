<template>
    <div class="container">
        <el-table :data="WINNERS" style="width: 100%" v-if="WINNERS.length>0">
            <el-table-column prop="name" label="Winners for the day"></el-table-column>
          </el-table>
          <el-card class="box-card" v-else>
            <h2>No winners yet!</h2>
          </el-card>
    </div>
    <div class="back">
      <router-link to="/">Back to Home</router-link>
    </div>
    
</template>

<script>
import { mapGetters } from "vuex";
    export default {
        name:"Winners list",
        computed: {
    ...mapGetters(["WINNERS"]),
  },
    }
</script>

<style lang="scss" scoped>
.container{
    margin: auto;
    width: 50%;
}
.back{
  margin-top: 10px;
}
</style>