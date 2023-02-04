<template>
    <div class="dark-theme">
        <default-select @create="select_country" :items="countries">
          {{ country }}
        </default-select>
        <default-button @click="update_data_stocks">click</default-button>
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
            countries: [
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
            current_country: '',
            req_country: ''
        }
    },

    mounted() {
      this.current_country = this.req_country = this.countries[0]
      this.get_stocks();
      setInterval(() => {
        this.get_stocks()
      }, 10000);
    },

    methods: {
        async get_stocks(){
            return fetch('/stock/' + this.req_country, {
              method: 'GET'
            })
            .then(function(response) { return response.json(); }).then((stocks) => { this.stocks = stocks.data; });
        },

        select_country(country){
          this.current_country = country;
        },

        update_data_stocks(){
          this.req_country = this.current_country
          this.get_stocks()
        }
    }
}
</script>
<style scoped>

table {
    /* position: absolute;*/
    margin:auto;
    width: 90%;
    padding-left: 10%;
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

</style>