<template>
    <h1>{{ $route.params }}</h1>
    <div class="dark-theme">
        <check-list :items="fields" @update="update_fields"></check-list>
        <default-select @create="select_country" :items="countries">
          {{ country }}
        </default-select>
        <default-button @click="update_data_stocks">click</default-button>
        <table>
            <transition-group name="fade" tag="tbody">
              <tr v-for="stock in stocks" :key="stock.s">
                <td><img class="logo" :src="get_logo(stock.d[2])"></td>
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
            current_country: this.$route.params.country,
            req_country: '',
            step: 50,
            range: [],
            fields: [
              {id: 0, name: "Цена1", status: false},
              {id: 1, name: "Цена2", status: true},
              {id: 2, name: "Цена3", status: true},
              {id: 3, name: "Цена4", status: false},
              {id: 4, name: "Цена5", status: true},

            ]
        }
    },

    mounted() {
      this.range = [Number(this.$route.params.page) * this.step, Number(this.$route.params.page) * this.step + this.step]
      this.req_country = this.current_country
      this.get_stocks();
      setInterval(() => {
        this.get_stocks()
      }, 20000);
    },

    methods: {
        async get_stocks(){
            return fetch(`../../../api/stock/?country=${this.req_country}&range=${this.range.join(':')}`, {
              method: 'GET'
            })
            .then(function(response) { return response.json(); }).then((stocks) => { this.stocks = stocks.data; });
        },

        select_country(country){
          this.current_country = country;
        },

        update_fields(fields1){
          this.fields = fields1
        },


        update_data_stocks(){
          this.req_country = this.current_country
          this.get_stocks()
        },

        get_logo(logoid){
          if (logoid) return `https://s3-symbol-logo.tradingview.com/${logoid}.svg`
          return 'https://cdn-icons-png.flaticon.com/128/6516/6516128.png'
        }
    }
}
</script>
<style scoped>

.logo{
  width: 40px;
  background-color: #a0a0a0;
  border-radius: 50%;
}

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