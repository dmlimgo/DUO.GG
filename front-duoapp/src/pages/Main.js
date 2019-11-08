import React, { useState, useEffect } from 'react';
import RecruitRegister from '../components/recruit/RecruitRegister';
import RecruitList from '../components/recruit/RecruitList';
import RecruitDetail from '../components/recruit/RecruitDetail';
import './Main.scss';
import Push from 'push.js'

import { useSelector } from 'react-redux';

const Main = () => {
    const [user, setUser] = useState({});
    useEffect(() => {
        // profile에서 유저 정보 가져오기
        getUser()
    },[])
    useEffect(() => {
        // console.log('user',user)
        if (user._id) {
            requestRecruit()
        }
    },[user])
    const getUser = async() => {
        try {
            // cookie가 여러개인 경우 오류가 날수도 있을 것 같다.
            const token = document.cookie.split("MnMsToken=");
            // console.log('token', token);
            const res = await fetch('http://localhost:4000/authtest', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'applicatoin/json',
                    'authorization': token[1] 
                },
            });
            // console.log('user:', res.json().then(data => console.log(data.username)));
            const username = '';
            res.json().then(data => {
                setUser(data)
            });
        } catch(err) {
            console.log('TopNav error Msg:', err);
        }

    }
   
    const [recruit, setRecruit] = useState([]);
    const requestBody = {
        query: `
            query {
                getRecruitmentByUserID(userId:"${user._id}") {
                    _id,
                    position,
                    status,
                    created_at,
                    updated_at,
                    writer {
                        username,
                        representationNickname
                    },
                    applicantsCount,
                }
            }
        `
    };

    const requestRecruit = async() => {
        // console.log('user in requestrecuirt', user)
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json().then(data => {
            // console.log(data)
            if (!data.errors) {
                setRecruit(data.data.getRecruitmentByUserID);
            }
        });
    };
    if (recruit.status === true) {
        if (recruit.applicantsCount > 0) {
            Push.create("신청이 왔습니다!",{
                body: "본인의 글에서 신청자를 확인해 주세요",
                timeout: 2000,
                onClick: function () {
                    window.focus();
                    this.close();
                }
            });
        }
    }

    const modalDetail = useSelector( state => state.modal );
    console.log('MainJs', modalDetail);
    return (
        // <div className="home">
        //     <div className="content">
        //         <RecruitRegister/>
        //         <RecruitList/>
        //     </div>
        // </div>
        <div className="home">
            <RecruitRegister/>
            <RecruitList/>
            {modalDetail.isShow === true ? <RecruitDetail data={modalDetail} user={user}/> : <React.Fragment/>}
        </div>
    );
};

export default Main;