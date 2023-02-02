<template>
    <default-button @click="get_stocks">Загрузить акции</default-button>
    <div>
        <PostForm @create="add_news"/>
        <PostList 
            :news="news"/>
    </div>
</template>

<script>
import PostForm from '@/components/PostForm.vue'
import PostList from '@/components/PostList.vue'
import axios from 'axios'
export default {
    components: {
        PostForm, PostList
    },
    data() {
        return {
            news: [
                { id: 1, title: 'Сбер', body: 'Снизился' },
                { id: 2, title: 'Сбер1', body: 'Повысился' },
                { id: 3, title: 'Сбер2', body: 'Снизился' },
                { id: 4, title: 'Сбер3', body: 'Повысился' },
                { id: 5, title: 'Сбер4', body: 'Снизился' }
            ],
            showSettings: false,
            stocks: [0],
            title: '',
            body: ''
        }
    },
    /*
    mounted() {
      this.get_stocks().then((stocks) => {
          this.stocks = stocks.data;
        })
      let timerId = setInterval(() => {
        this.get_stocks().then((stocks) => {
          this.stocks = stocks.data;
        })
        console.log(200)
      }, 10000);
    },
    */
    methods: {
        async get_stocks() {
            try {
                const response = await axios.get('http://localhost:3002/stock');
                console.log(response)  
            } catch (error) {
                console.log('Ошибка запроса')
            }
        },

        add_news(news) {
            /*
            const News = {
                id: Date.now,
                title: this.title,
                body: this.body
            }
            */
            if (news.title != '' & news.body != '') {this.news.unshift(news)}
        },

        inputTitle(event) {
            this.title = event.target.value
        },

        inputBody(event) {
            this.body = event.target.value
        }
    }
}
</script>

<style src="@/app_style.css">

</style>