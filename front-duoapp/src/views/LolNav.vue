<template>
    <div id="nav">
        <router-link to="/matchnow">즉시매칭</router-link> |
        <router-link to="/matchlater">예약매칭</router-link>
    </div>
</template>

<script>
export default {
    name: 'LolNav'
}
</script>

<style scoped>
#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #2c3e50;
}
</style>
