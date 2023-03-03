<template>
    <div class="error-page">
        <el-result
          status="error"
          title="Apologize"
          :subTitle="`${ERROR} please try gain later.`"
        
        />
      </div>
</template>

<script>
import { mapGetters } from 'vuex';
    export default {
        name: "Error",
        computed:{
            ...mapGetters(["ERROR"]),
        },
        data() {
            return{

            }
        }
    }
</script>

<style lang="scss" scoped>

</style>