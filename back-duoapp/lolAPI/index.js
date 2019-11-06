const axios = require('axios');
mykey = 'RGAPI-a57f7bd0-b157-42ab-977e-78504418ab35'

exports.getLOLData = async function (nick) {
    try {
    let summonerUrl, matchUrl, leagueUrl;
    let gamelist = []
    let recentGames = []
    let tiers = []
    summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${mykey}`
    const allData = await axios.get(encodeURI(summonerUrl))
    .then(async summonerData => { 
        console.log(summonerData.data)
        let data = summonerData.data
        let userId = data['id']
        let accountId = data['accountId']
        leagueUrl = `https://kr.api.riotgames.com/lol/league/v4/entries/by-summoner/${userId}?api_key=${mykey}`
        matchUrl = `https://kr.api.riotgames.com/lol/match/v4/matchlists/by-account/${accountId}?api_key=${mykey}`
        tiers = await axios.get(encodeURI(leagueUrl))
        .then(userData => {
            if (userData.data == '') {
                return false
            }
            else {
                let tierIndex = 0
                for (let j = 0; j < userData.data.length; j++) {
                    if (userData.data[j]['queueType'] == 'RANKED_SOLO_5x5') {
                        tierIndex = j
                    }
                }
                tier = userData.data[tierIndex]['tier']
                rank = userData.data[tierIndex]['rank']
                leaguePoint = userData.data[tierIndex]['leaguePoints']
                console.log(tier, rank, leaguePoint)
                return [tier, rank, leaguePoint]
            }
            
        }).catch (error => {
            console.error(error)
        })
        if (tiers != false) {
            recentGames = await axios.get(matchUrl)
            .then( async (matchData) => {
                let matches = matchData.data['matches']
                let cnt = 0
                for (let i = 0; i < matches.length; i++){
                    if (matches[i]['queue'] === 420) {
                        gamelist.push(matches[i]['gameId'])
                        cnt += 1
                    }
                    if (cnt === 5) {
                        break
                    }
                }
                recentlyGame = gamelist.map( async (game) => {
                    let gameInfoUrl = `https://kr.api.riotgames.com/lol/match/v4/matches/${game}?api_key=${mykey}`
                    const gameData = await axios.get(gameInfoUrl)
                    let participantId = 0
                    for (let j = 0; j < gameData.data['participantIdentities'].length; j++){
                        if (gameData.data['participantIdentities'][j]['player']['accountId'] === accountId) {
                            participantId = gameData.data['participantIdentities'][j]['participantId']
                            break
                        }
                    }
                    if (gameData.data['participants'][participantId-1]['stats']['win'] === true) {
                        let champion = gameData.data['participants'][participantId-1]['championId']
                        let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                        let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                        let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                        return [true, kills, deaths, assists, champion] 
                    }
                    else {
                        let champion = gameData.data['participants'][participantId-1]['championId']
                        let kills = gameData.data['participants'][participantId-1]['stats']['kills']
                        let deaths = gameData.data['participants'][participantId-1]['stats']['deaths']
                        let assists = gameData.data['participants'][participantId-1]['stats']['assists']
                        return [false, kills, deaths, assists, champion]

                    }
                })
                return recentlyGame = await Promise.all(recentlyGame);
            }).catch (error => {
                console.error(error)
            })
        }
            return {tiers, recentGames}
        }) 
        return allData
    }   
    catch(e) {
        return false
    }
    
}

exports.hasNickname = async function (nick) {
    summonerUrl = `https://kr.api.riotgames.com/lol/summoner/v4/summoners/by-name/${nick}?api_key=${mykey}`
    try {   
        const res = await axios.get(encodeURI(summonerUrl))
        //console.log(res)
        return true
    }
    catch(e) {
        return false
    }
}