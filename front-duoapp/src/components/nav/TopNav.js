import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// import TopNavLogo from './TopNavLogo';
// import TopNavUser from './TopNavUser';
import './TopNav.scss';

const TopNav = () => {
    console.log('TopNav Mounted')
    const [user, setUser] = useState({});
    useEffect(() => {
        // profile에서 유저 정보 가져오기
        getUser();
    },[]);
    const getUser = async() => {
        try {
            // cookie가 여러개인 경우 오류가 날수도 있을 것 같다.
            const token = document.cookie.split("MnMsToken=");
            // console.log('token', token);
            // const res = await fetch('http://localhost:4000/authtest', {
            //console.log('token', token);
            const res = await fetch('http://localhost:4000/authtest', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'applicatoin/json',
                    'authorization': token[1] 
                },
            });
            // console.log('user:', res.json().then(data => console.log(data.username)));
            await res.json().then(data => {
                // console.log('userdata', data);
                // console.log('user1', user);
                setUser(data);
                // console.log('user2', user);
            });
        } catch(err) {
            console.log('TopNav error Msg:', err);
        }
    }
    // const user = {
    //     username: 'kbs3539@gmail.com',
    //     nicknames: ['싹싹김치', '싹싹김치2', '갓김치'],
    //     representationNickname: '싹싹김치',
    //     tiers: {
    //         tier: 'diamond',
    //         rank: 'IV',
    //         leaguePoint: 3000
    //     },
    //     recentGames: [
    //         {win: true, kills: 10, deaths: 1, assists: 5, champNo: 22},
    //         {win: false, kills: 10, deaths: 2, assists: 3, champNo: 10},
    //         {win: true, kills: 2, deaths: 10, assists: 15, champNo: 1},
    //         {win: true, kills: 6, deaths: 4, assists: 5, champNo: 40},
    //         {win: true, kills: 9, deaths: 8, assists: 7, champNo: 32}
    //     ],
    //     majorPosition: 'bot',
    //     minorPosition: 'top',
    //     apiUpdatedAt: '2016-05-18T16:00:00Z',
    // }
    return (
        <div className="topnav">
            <div className="topnav__logo">
                <Link to="/">
                    <span>DUO.GG</span>
                </Link>
            </div>
            <div className="topnav__user">
                {user.representationNickname ? (
                    <Link to="/profile">{user.representationNickname}</Link>
                ) : user.username ? (
                    <Link to="/profile">소환사 등록하기</Link>
                ) : (
                    <Link to="login">로그인</Link>
                )}
            </div>
        </div>
    );
};

export default TopNav;