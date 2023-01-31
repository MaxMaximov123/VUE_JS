<template>
    <di>
        <h3>Новости</h3>
        <PostItem
            v-for="newss in news"
            :key="newss.id"
            :newss="newss"/>
    </di>
</template>
<script>
import PostItem from './PostItem.vue';

export default {
    props: {
        news: {
            required: true
        }
    },
    components: { PostItem }
}
</script>
<style src="../app_style.css"></style>