<template>
    <div class="dark-theme">
        <br>
        <br>
        <br>
        <br>
        <br>
        <br>
        <select v-model="current_country" name="pets" id="pet-select">
            <option v-for="countr in country" :key="countr">{{countr}}</option>
        </select>
        <button @click="get_stocks">click</button>
        <table>
            <transition-group name="fade" tag="tbody">
              <tr v-for="stock in stocks" :key="stock.s">
                <td>{{ stock.d[2] }}</td>
                <td>{{ stock.d[1] }}</td>
                <td>{{ stock.d[6] + ' ' + stock.d[7]}}</td>
                <td>{{ stock.d[12] }}</td>
                <td>{{ stock.d[14] }}</td>
                <td>{{ stock.d[22] }}</td>
                <td>{{ stock.d[23] }}</td>
              </tr>
            </transition-group>
        </table>
    </div>
</template>
<script>
export default {
    data() {
        return {
            stocks: [],
            country: [
                    'america', 'argentina', 'bahrain', 'belgium',
                    'brazil', 'uk', 'hungary', 'venezuela',
                    'vietnam', 'germany', 'hongkong', 'greece',
                    'denmark', 'egypt', 'israel', 'india',
                    'indonesia', 'iceland', 'spain', 'italy',
                    'canada', 'qatar', 'china', 'colombia',
                    'latvia', 'lithuania', 'luxembourg', 'malaysia',
                    'mexico', 'nigeria', 'netherlands', 'newzealand',
                    'norway', 'uae', 'peru', 'poland',
                    'portugal', 'russia', 'romania', 'ksa',
                    'serbia', 'singapore', 'slovakia', 'thailand',
                    'taiwan', 'turkey', 'philippines', 'finland',
                    'france', 'chile', 'switzerland', 'sweden',
                    'estonia', 'rsa', 'korea', 'japan'],
            current_country: 'america'
        }
    },

    mounted() {
      this.get_stocks();
      setInterval(() => {
        this.get_stocks()
      }, 10000);
    },

    methods: {
        async get_stocks(){
            return fetch('/stock/' + this.current_country, {
              method: 'GET'
            })
            .then(function(response) { return response.json(); }).then((stocks) => { this.stocks = stocks.data; });
        },
    }
}
</script>
<style scoped>

table {
    position: absolute;
    top: 20%;
    left: 5%;
    width: 90%;
    color: aliceblue;
    font-size: 20px;
    border-collapse: collapse;
  }
  th, td {
    border: 1px solid rgb(60, 163, 247);
    padding: 8px;
  }
  th {
    background-color: #373b48;
  }

  .dark-theme {
    background-color: #013fb9;
  }
</style>