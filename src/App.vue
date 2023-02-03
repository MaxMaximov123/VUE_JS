<template>
    <div class="app">
        <div>
            <NavBar/>
        </div>
        <router-view></router-view>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
export default {
    components: {
        NavBar
    },
}
</script>
<style src="@/app_style.css">
</style>