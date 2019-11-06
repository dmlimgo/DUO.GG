var express = require('express');
var router = express.Router();
const lolAPI = require('../lolAPI');
const apiRouter = require('./api');
const authCheck = require('../middlewares/auth');
const User = require('../models/user');
const Recruitment = require('../models/recruitment');
// const mongooseWatch = require('mongoose-watch');


// var mongosee = require('mongosee-watch')();
// Recruitment.find().watch( 'lastMod', function (err, fn){
//     fn.start(function(err, doc){
// 		console.log("Player :");
// 		console.log(doc);
// 		fn.stop(function(){
// 			console.log('Close the watch!');
// 		});
// 	});
//  });

// const myRecruitment = Recruitment.find({userId:"5dba430f6a757b55007deda7"},function(err,data){
//     if (err) return handleError(err);
//     // console.log('find all data => ',data)
//     // // data[0]['mytier']['tier'] = '플래티넘'
//     // console.log(data[0]['tiers'])
//     // // User.nickname = '무적꼬부기짱짱짱'
//     console.log(data[0])
//     return data[0] 
// })

// const collection = Recruitment.collection('5dba932a98883f1fe02d3a61');
// const changeStream = collection.watch();
// changeStream.on('change', next => {
//   // process next document
//   console.log('바뀜?')
// });

// const changeStream = Recruitment.watch().on('change', change => console.log(change));



router.get('/authtest', authCheck, async(req, res) => {
    const { _id } = req.decoded;
    const user = await User.findById(_id);
    res.json(user);
});

router.use('/api', apiRouter);

router.post('/test', async (req, res) => {
    // lolAPI.makeGetRequest();
    // ifInfo : true, false 닉네임이 검색되는지 확인
    let result = await Recruitment.find({});
    console.log('###############################################################################')
    console.log(result)
    console.log(req.body['nickname'])
    console.log(req.body['username'])
    console.log(req.body['userId'])
    console.log('###############################################################################')
    let search = req.body['nickname']
    let myRecentGame = []
    search = search.replace(/\s/gi, "");
    const id = req.body['userId']
    const isInfo = await lolAPI.hasNickname(search)
    if (isInfo) {
        const data = await lolAPI.getLOLData(search)
        console.log('닉넴 있음')
        console.log('------------------------------------------------------------------------')
        console.log(data)
        // data['tiers'] : tier정보, data['recentGame'] : 최근 5게임
        console.log(id)
        console.log(data['tiers'][0])   // tier
        console.log(data['tiers'][1])   // rank
        console.log(data['tiers'][2])   // leaguePoint
        console.log(data['recentGames']) // 최근 5게임(list[승패, kills, deaths, assists, champion])
        console.log('------------------------------------------------------------------------')

        for (let j = 0; j < data['recentGames'].length; j++) {
            myRecentGame.push(
                {win: data['recentGames'][j][0],
                kills: data['recentGames'][j][1],
                deaths: data['recentGames'][j][2],
                assists: data['recentGames'][j][3],
                champion: data['recentGames'][j][4],
                }
            )

        }

        // 유저 업데이트 하는 코드
        let inNickName = false
        await User.find({_id:id}, function(err, data) {
            if (data[0]['nicknames'] === undefined || data[0]['nicknames'].length == 0) {
                inNickName = false
            }
            else {
                inNickName = data[0]['nicknames'].includes(search)
            }
        })
        console.log(inNickName)
        if (inNickName === false) {
            const updateresult = await User.findOneAndUpdate({_id:id}, {$push: {nicknames: search}})
        }

        await User.findOneAndUpdate({_id:id},{
            $set: {representationNickname:search,
            tiers:{
                tier: data['tiers'][0], 
                rank: data['tiers'][1], 
                leaguePoint: data['tiers'][2]
            },
            recentgames: myRecentGame
        }
        });
        // User.update({_id:myid}, {tiers:{tier:'벌레티넘', rank:'IV', leaguePoint:10}},
        // function(err, res) {
        //     if (err) { 
        //         callback(err, null);
        //     } else { 
        //         callback(null, res);
        //     }
        // });
        res.json(data)
    }
    else {
        console.log('닉네임을 확인해주세요')
        res.json({'error':'에러에러에러에러'})
    }
    // lolAPI.getLOLData().then(function (info) {
    //     console.log('닉네임 상태?')
    //     console.log(info)
    // });
    
    // const myid = "5db253811c9d4400000f213a"
    // // const nowUser = User.findById(`${myid}`)
    // // console.log(nowUser)
    // // const nowUser = User.findOne({_id:myid})

    // 유저 찾는 코드
    // User.find({_id:myid},function(err,data){
    //     if (err) return handleError(err);
    //     console.log('find all data => ',data)
    //     // data[0]['mytier']['tier'] = '플래티넘'
    //     console.log(data[0]['tiers'])
    //     // User.nickname = '무적꼬부기짱짱짱'
    //     return data[0] 
    // })



})


module.exports = router;

// app.put('url', (req, res) => {

//     const modelId = req.body.model_id;
//     const newName = req.body.name;

//     MyModel.findById(modelId).then((model) => {
//         return Object.assign(model, {name: newName});
//     }).then((model) => {
//         return model.save();
//     }).then((updatedModel) => {
//         res.json({
//             msg: 'model updated',
//             updatedModel
//         });
//     }).catch((err) => {
//         res.send(err);
//     });
// });
