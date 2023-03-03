<template>
  <div class="container">
    <el-form ref="form" :model="form" label-width="80px" :rules="rules" @submit.prevent="submitForm">
      <el-form-item label="Name" prop="name">
        <el-input v-model="form.name" @keyup.enter="submitForm"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" :loading="DATA_LOADING" native-type="submit"
          >Submit</el-button
        >
      </el-form-item>
    </el-form>
  </div>
  <router-link to="/winners">Show Winners List</router-link>

  <el-table :data="WINNERS" style="width: 50%" v-if="WINNERS.length>0">
    <el-table-column prop="name" label="Winners for the day"></el-table-column>
  </el-table>

</template>

<script>
import { mapGetters } from "vuex";
import { ElMessageBox } from "element-plus";
export default {
  name: 'NameSearcher',
  computed: {
    ...mapGetters(["DATA_LOADING", "DATA", "WINNERS"]),
  },
  data() {
    return {
  form: {
        name: "",
      },
      rules: {
        name: [
          { required: true, message: "Name is required", trigger: "blur" },
          {
            min: 2,
            message: "Length should be at least 2 characters",
            trigger: "blur",
          },
          {
            pattern: /^[a-zA-Z]+$/,
            message: "Name must only contain letters.",
          },
        ],
      },
    }
  },
  created() {
    this.$store.dispatch("GET_DATA");
  },
  methods: {
    submitForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.performSearch();
        } else {
          // form is invalid, do something else
        }
      });
    },
    performSearch() {
      if(this.isInWinners()){
          this.showAlert('exist');
          return;
        }
      const result = this.DATA.filter(
        (obj) => obj.name.toLowerCase() === this.form.name.toLowerCase()
      );
      if (result.length > 0) {
          this.showConfirm();
      } else {
        this.showAlert();
      }
    },
    isInWinners(){
      return this.WINNERS.filter(obj => obj.name.toLowerCase() === this.form.name.trim().toLowerCase()).length >0; 
    },
    showConfirm() {
      ElMessageBox.confirm(
        `Congratulations, ${this.form.name} is a lucky name! You've won a prize. Will you accept it?`,
        "Confirmation",
        {
          confirmButtonText: "Accept",
          cancelButtonText: "Reject",
          type: "warning",
        }
      )
        .then(() => {
          this.$store.dispatch("ADD_WINNERS", this.form.name.trim());
          this.form.name = "";
        })
        .catch(() => {});
    },
    showAlert(exist) {
      let message = `I'm sorry, ${this.form.name} is not in today's list of lucky names.`
      if(exist){
        message = `I'm sorry, ${this.form.name} has already received their prize today!`
      }
      ElMessageBox.alert(
        message,
        "Alert",
        {
          confirmButtonText: "OK",
          type: "warning",
        }
      )
        .then(() => {
          this.form.name = "";
        })
        .catch(() => {});
    },
  }

}
</script>

<style scoped lang="scss">
.container {
  width: 50%;
}
</style>
