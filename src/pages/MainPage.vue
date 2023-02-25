<template>
  <div class="dark-theme">
    <default-select @create="select_country" :items="countries" :current="current_country">
      {{ country }}
    </default-select>
    <div id="div_top_hypers">
      <div class="table-container">
        <table>
          <!-- <transition-group name="fade1" tag="thead"> -->
            <thead>
              <tr v-if="1">
                <th class="head-col">Logo</th>
                <th class="head-col" v-show="columns[column_id - 1].status" v-for="column_id in 2" :key="`1_${column_id}`">{{ columns[column_id - 1].name }}</th>
                <th v-show="columns[column_id + 1].status" v-for="column_id in (columns.length - 2)" :key="`2_${column_id}`">{{ columns[column_id + 1].name }}</th>
              </tr>
            </thead>
            <tbody v-if="1">
              <tr v-for="stock in stocks" :key="stock.s">
                <th><img class="logo" :src="get_logo(stock.d[2])"></th>
                <th class="head-row" v-show="columns[data_col - 1].status" v-for="data_col in 2" :key="`3_${data_col}`">{{ stock.d[data_col - 1] }}</th>
                <td v-show="columns[data_col + 1].status" v-for="data_col in (stock.d.length - 2)" :key="`4_${data_col}`">{{ stock.d[data_col + 1] }}</td>
              </tr>
            </tbody>
          <!-- </transition-group> -->
        </table>
      </div>
    <li><check-list :items="columns" @update="update_columns"></check-list></li>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      socket: null,
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
      columns: [
        {id: 0, name: 'name', status: true, show: false},
        {id: 1, name: 'description', status: true, show: false},
        {id: 2, name: 'logoid', status: false, show: false},
        {id: 3, name: 'update_mode', status: false, show: false},
        {id: 4, name: 'type', status: false, show: false},
        {id: 5, name: 'typespecs', status: false, show: false},
        {id: 6, name: 'close', status: true, show: true},
        {id: 7, name: 'currency', status: true, show: true},
        {id: 8, name: 'pricescale', status: true, show: true},
        {id: 9, name: 'minmov', status: true, show: true},
        {id: 10, name: 'fractional', status: true, show: true},
        {id: 11, name: 'minmove2', status: true, show: true},
        {id: 12, name: 'change', status: true, show: true},
        {id: 13, name: 'change_abs', status: true, show: true},
        {id: 14, name: 'Recommend.All', status: true, show: true},
        {id: 15, name: 'volume', status: true, show: true},
        {id: 16, name: 'Value.Traded', status: true, show: true},
        {id: 17, name: 'market_cap_basic', status: true, show: true},
        {id: 18, name: 'fundamental_currency_code', status: true, show: true},
        {id: 19, name: 'price_earnings_ttm', status: true, show: true},
        {id: 20, name: 'earnings_per_share_basic_ttm', status: true, show: true},
        {id: 21, name: 'number_of_employees', status: true, show: true},
        {id: 22, name: 'sector', status: true, show: true},
        {id: 23, name: 'market', status: true, show: true}
      ]
    }
  },

  mounted() {
    /* WEBSOCKE INIT */
    this.socket = new WebSocket('ws://localhost:8000/stocks');

    this.socket.onmessage = (event) => {
      this.stocks = JSON.parse(event.data);
    };

    this.socket.onclose = () => {
      console.log('WebSocket connection closed!');
      this.socket = new WebSocket('ws://localhost:8000/stocks');
    };

    this.socket.onopen = () => {
      this.socket.send(JSON.stringify({type: 'stocks', range: this.range, country: this.req_country}));
    }

    /* -------------------------------------- */

    this.range = [Number(this.$route.params.page) * this.step, Number(this.$route.params.page) * this.step + this.step]
    this.req_country = this.current_country
    setInterval(() => {
      this.socket.send(JSON.stringify({type: 'stocks', range: this.range, country: this.req_country}));
    }, 2000);
  },

  methods: {
    /* async get_stocks() {
      this.socket.send('get_stocks');
        return fetch(`../../../api/stock/?country=${this.req_country}&range=${this.range.join(':')}`, {
        method: 'GET'
      })
        .then(function (response) { return response.json(); }).then((stocks) => {this.stocks = stocks.data;});
    }, */

    select_country(country) {
      this.req_country = this.current_country = country
      this.range = [Number(this.$route.params.page) * this.step, Number(this.$route.params.page) * this.step + this.step]
      this.socket.send(JSON.stringify({type: 'stocks', range: this.range, country: this.req_country}));
      this.$router.push(`/stocks/${this.current_country}/0`)
    },

    update_columns(columns1) {
      this.columns[columns1.id] = columns1
    },

    get_logo(logoid) {
      if (logoid) return `https://s3-symbol-logo.tradingview.com/${logoid}.svg`
      return 'https://cdn-icons-png.flaticon.com/128/6516/6516128.png'
    }
  }
}
</script>
<style scoped>
.logo {
/*   position: -webkit-sticky;
  position: sticky; */
  z-index: 3;
  left: 0 ;
  width: 40px;
  background-color: #a0a0a0;
  border-radius: 40%;
}

table {
  /* position: absolute;*/
  border-collapse: collapse;
  font-family: helvetica;
  position: relative;
  overflow: scroll;
  margin: auto;
  width: 90%;
  padding-left: 10%;
  color: aliceblue;
  font-size: 15px;
  border-collapse: collapse;
}

thead th {
  font-size: 20px;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
  z-index: 2;
}

.head-col {
  left: 0;
  z-index: 4;
}

th,
td {
  border: 1px solid rgb(60, 163, 247);
  padding: 8px;
  box-sizing: border-box;
}

th {
  /* position: -webkit-sticky; */
  border: 1px solid rgb(60, 163, 247);
  position: sticky;
  z-index: 3;
  background-color: #373b48;
}

tbody {
  overflow: scroll;
  height: 200px;
}

.head-row {
  position: -webkit-sticky;
  position:sticky;
  left: 0;
  z-index: 3;
}

.table-container {
  scrollbar-track-color: aqua;
  scrollbar-face-color: aqua;
  position: relative;
  max-height:  900px;
  width: 100%;
  overflow: scroll;
}

.dark-theme {
  margin: 50px;
}

#div_top_hypers {
    background-color:#eeeeee;
    display:inline;      
}
#ul_top_hypers li{
    display: inline;
}
</style>