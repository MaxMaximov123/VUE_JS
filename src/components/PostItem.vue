<template>
    <div class="news">
        <div><strong>Название: </strong>{{ newss.title }}</div>
        <div><strong>Новость: </strong>{{ newss.body }}</div>
    </div>
</template>
<script>
export default {
    props: {
        newss: {
            type: Object,
            required: true
        }
    }
    
}
</script>
<style src="../app_style.css"></style>