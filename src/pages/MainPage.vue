<template>
    <div class="dark-theme">
        <table>
            <transition-group name="fade" tag="tbody">
              <tr v-for="stock in stocks" :key="stock.s">
                <td>{{ stock.d[0] }}</td>
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
        }
    },

    mounted() {
      this.get_stocks().then((stocks) => {
          this.stocks = stocks.data;
        })
      setInterval(() => {
        this.get_stocks().then((stocks) => {
          this.stocks = stocks.data;
        })
      }, 10000);
    },

    methods: {
        async get_stocks(){
            return fetch('/stock', {
              method: 'GET'
            })
            .then(function(response) { return response.json(); });
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