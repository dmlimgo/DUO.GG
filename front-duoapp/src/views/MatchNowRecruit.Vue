<template>
    <div class="matchnow__each">
        <div class="column1">
            <div class="tier">
                {tier}
            </div>
            <div class="position">
                {position}
            </div>
            <div class="nickname">
                {nickname}
            </div>
        </div>
        <div class="column2">
            <div class="records">
                {records}
            </div>
        </div>
        <div class="column3">
            <div class="status">
                {status}
            </div>
            <div class="time">
                {created_time}
            </div>
            <div class="submit">
                신청
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'matchnowrecruit'
}
</script>

<style lang="scss" scoped>
.matchnow__each {
    display: flex;
    flex-direction: column;
    // flex: auto;
    width: 100%;
    // height: 180px;
    padding: 20px;
    margin: 20px 0;
    background-color: #fdfdfd;
    box-shadow: 0 0 10px 0 rgba(0,0,0,0.1);
    > div {
        display: flex;
        margin: 10px 0;
        align-items: center;
        > div {
            margin: 0 20px;
        }
    }
}
.tier {
    width: 40px;
    height: 40px;
    border: 1px solid black;
}
.position {
    width: 80px;
    height: 30px;
    border: 1px solid black;
}
.nickname {
    width: 120px;
    height: 30px;
    border: 1px solid black;
}
.records {
    width: 500px;
    height: 80px;
    border: 1px solid black;
}
.status, .time, .submit {
    border: 1px solid black;
}
</style>
