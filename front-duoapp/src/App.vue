<template>
    <div id="app">
        <TopNav/>
        <LolNav/>
        <router-view/>
    </div>
</template>

<script>
import TopNav from '@/views/TopNav.vue'
import LolNav from '@/views/LolNav.vue'

export default {
    name: 'App',
    components: {
        TopNav,
        LolNav
    }
}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Noto+Sans|Noto+Sans+KR&display=swap');

#app {
    font-family: 'Noto Sans', sans-serif;
    font-family: 'Noto Sans KR', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
