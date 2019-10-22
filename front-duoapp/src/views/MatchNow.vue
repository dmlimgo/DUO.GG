<template>
    <div class="matchnow">
        <MatchNowRegister/>
        <MatchNowRecruitList/>
    </div>
</template>

<script>
import MatchNowRegister from './MatchNowRegister.vue'
import MatchNowRecruitList from './MatchNowRecruitList.vue'

export default {
    name: 'matchnow',
    components: {
        MatchNowRegister,
        MatchNowRecruitList
    }
}
</script>

<style scoped>
.matchnow {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 900px;
    min-height: 100vh;
    margin: 0 auto;
}
</style>
