<template lang="ru">
    <form @submit.prevent>
        <h1>Создание поста</h1>
        <input
            @input="news.title = $event.target.value"
            :value="news.title"
            class="input"
            type="text"
            placeholder="Название">
        <input
            @input="news.body = $event.target.value"
            :value="news.body"
            class="input"
            type="text"
            placeholder="Новость">
        <default-button @click="add_news">Добавить</default-button>
    </form>
</template>
<script>
export default {
    data() {
        return {
            news: { 
                title: '',
                body: ''
            }
        }
    },
    methods: {
        add_news() {
            this.news.id = Date.now();
            this.$emit('create', this.news);
            this.title = '';
            this.body = '';
            this.news = { 
                title: '',
                body: ''
            }
        }
    }
}
</script>
<style src="../app_style.css"></style>