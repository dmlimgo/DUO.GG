<template>
    <div class="matchnow__register">
        <div class="matchnow__register__title">
            매칭 등록하기
        </div>
        <div class="matchnow__register__form">
            <div class="position">
                <div class="top">
                    {top}
                </div>
                <div class="jungle">
                    {jgl}
                </div>
                <div class="mid">
                    {mid}
                </div>
                <div class="ad">
                    {ad}
                </div>
                <div class="support">
                    {sup}
                </div>
            </div>
            <div class="submit">
                <div class="button">
                    등록
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'register'
}
</script>

<style scoped>
.matchnow__register {
    display: flex;
    flex-direction: column;
    width: 50%;
    height: 120px;
    border-radius: 3px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    background-color: #fefefe;
    padding: 10px 20px;
}
.matchnow__register__title {
    font-weight: 700;
    margin: 10px 0;
}
.matchnow__register__form {
    display: flex;
    justify-content: space-around;
}
.position, .submit {
    display: flex;
}
.top, .jungle, .mid, .ad, .support {
    width: 50px;
    height: 50px;
    border: 1px;
    border-radius: 3px;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    margin: 10px;
}
.button {
    width: 50px;
    height: 50px;
    border-radius: 50% !important;
    background-color: #1ea1f6;
    line-height: 50px;
    margin: 10px;
}
</style>
