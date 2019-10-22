<template>
    <div id="topnav">
        <TopNavLogo/>
        <TopNavUser/>
    </div>
</template>

<script>
import TopNavUser from './TopNavUser.vue'
import TopNavLogo from './TopNavLogo.vue'

export default {
    name: 'TopNav',
    components: {
        TopNavLogo,
        TopNavUser
    }
}
</script>

<style scoped>
#topnav {
    display: flex;
    justify-content: flex-end;
    padding: 20px;
    background-color: #1ea1f6;
}
#topnav > .topnav__logo {
    flex-basis: 33.3%;
}
#topnav > .topnav__user {
    flex-basis: 33.3%;
}
</style>
