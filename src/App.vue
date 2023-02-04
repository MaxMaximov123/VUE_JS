<template>
    <div class="app">
        <div>
            <NavBar/>
        </div>
        <div class="main-cont">
            <router-view></router-view>
        </div>
        <div class="footer">
            <FooterBar/>
        </div>
    </div>
</template>
<script>
import NavBar from '@/components/NavBar.vue';
import FooterBar from '@/components/FooterBar.vue';
export default {
    components: {
        NavBar, FooterBar
    },
}
</script>
<style src="@/app_style.css">

.main-cont {
    position:static;
}
</style>