<template>
  <div class="container">
    <input type="text" placeholder="type your guess name" v-model="guessedName">
    <br /><br />
    <el-button @click="checkingName">Submit</el-button>
    <br /> <br />

    <div v-if="this.winners_for_the_day.length > 0">
      <h4>the list of winners for the day</h4>
      <p v-for="winner in winners_for_the_day"> 🏆 {{ winner }}</p>
    </div>
  </div>
  <name-search-response :message="this.message" :winner="this.winner" @restart="this.restarting" @accept="this.accepting"
    @reject="this.rejecting" />
</template>

<script>
import NameSearchResponse from '@/components/NameSearchResponse.vue'
import { getAll } from '@/api/peopleApi';

export default {
  name: 'NameSearcher',
  components: {
    NameSearchResponse,
  },
  data() {
    return {
      guessedName: "",
      message: "",
      winner: false,
      winners_for_the_day: [],
      displayTheList: false
    }
  },
  methods: {
    restarting() {
      this.message = "";
    },
    accepting() {
      this.winners_for_the_day.push(this.guessedName);
      this.displayTheList = true;
      this.message = "";
    },
    rejecting() {
      this.message = "";
    }
    ,
    checkingName: async function () {
      const guessedName = this.guessedName;
      // console.log(guessedName);

      function capitalize(guessedName) {
        return guessedName[0].toUpperCase() + guessedName.slice(1);
      }

      const capitalizedGuessedName = capitalize(guessedName);
      // console.log("Capitalizezd Guessed Name: ", capitalizedGuessedName);

      const luckyNameListArray = await getAll().then(people => {
        let nameListArray = []

        people.forEach(person => {
          nameListArray.push(person.name);
        })

        return nameListArray
      });
      // console.log("nameList: ", luckyNameListArray);


      if (luckyNameListArray.includes(capitalizedGuessedName)) {
        console.log("You gussed right !!");
        this.message = `Congratulations, ${capitalizedGuessedName} is a lucky name! You've won a prize. Will you accept it?`
        this.winner = true
        return
      } else {
        console.log("Wrong guess !!");
        this.guessedName = "";
        this.message = `I'm sorry, ${capitalizedGuessedName} is not in today's list of lucky names.`
        this.winner = false;
      }



    }
  }
}
</script>

<style scoped lang="scss">
.container {
  width: 100%;

  input {
    font-size: 16px;
    padding: 12px;
    border: 2px solid #cfcfcf;
    border-radius: 8px;
    box-shadow: 4px 4px 10px rgba(0, 0, 0, 0.06);
  }

}
</style>
