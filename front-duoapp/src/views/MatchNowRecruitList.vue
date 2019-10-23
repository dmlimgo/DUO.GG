<template>
    <div class="matchnow__list">
        <MatchNowRecruit/>
        <MatchNowRecruit/>
        <MatchNowRecruit/>
        <MatchNowRecruit/>
    </div>
</template>

<script>
import MatchNowRecruit from './MatchNowRecruit.vue'

export default {
    name: 'matchnowrecruitlist',
    components: {
        MatchNowRecruit
    }
}
</script>

<style lang="scss" scoped>
.matchnow__list {
    display: flex;
    flex-direction: column;
    width: 100%;
}
</style>
