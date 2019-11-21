import React, { useState, useEffect } from 'react';
import './RecruitDetail.scss';
import { getEmblem } from './Recruit';
import { useDispatch } from 'react-redux';
import { showDetailAction } from '../../reducers/modal';

console.log('[initial] RD Mounted')
const RecruitDetail = props => {
    console.log('RecruitDetail Mounted');
    console.log('modalDetail props:', props);
    const data = props.data.clickedRecruit;
    // console.log('modaldata', data);
    const dispatch = useDispatch();
    const modalHide = () => {
        // document.querySelector('.detail__wrap').classList.remove('modal--show');
        // document.querySelector('.detail__wrap').classList.add('modal--hide');
        dispatch(showDetailAction());
    };
    const [applicantList, setApplicantList] = useState([]);
    const [applicants, setApplicants] = useState([]);
    const getApplicants = async() => {
        // recruit_id필요
        console.log('RD getApplicants excuted')
        console.log('modalshow', props.data.isShow)
        if (props.data.isShow) {
            const requestBody = {
                query: `
                    query {
                        recruitmentAndApplicants(recruitId:"${data._id}") {
                            _id,
                            position,
                            status,
                            created_at,
                            updated_at,
                            writer {
                                username,
                                tiers {
                                    tier,
                                    rank,
                                    leaguePoint
                                }
                            },
                            applicants {
                                representationNickname,
                                tiers {
                                    tier,
                                    rank,
                                    leaguePoint
                                }
                                recentgames {
                                    win,
                                    kills,
                                    deaths,
                                    assists,
                                    champion
                                }
                            }
                        }
                    }
                `
            }
            console.log('111')
            const res = await fetch('http://localhost:4000/graphql', {
                method: 'POST',
                body: JSON.stringify(requestBody),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            console.log('res', res)
            console.log('222')
            await res.json().then(data => {
                console.log('resdata', data)
                const applicantList = data.data.recruitmentAndApplicants.applicants.map((data, index) => {
                    return (
                        <div className="comment__box" key={index}>
                            <div className="username">
                                {data.representationNickname}
                            </div>
                            <div className="tier">
                                {data.tiers.tier} {data.tiers.rank}
                            </div>
                            <div className="position">
                                {data.position}
                            </div>
                            <div className="recent">
                                전적
                            </div>
                        </div>
                    )
                });
                console.log('before setApplicants', applicantList)
                setApplicants(applicantList);
                console.log('after setApplicants', applicantList);
            });
        }
    };
    const applyMatch = async userId => {
        console.log('applyMatch userId', userId)
        const requestBody = {
            query: `
                mutation {
                    createApplicant(createApplicantInput: {userId: "${userId}", recruitmentId: "${data._id}", position: "MID"}) {
                        userId,
                        recruitmentId,
                        position,
                        created_at,
                        updated_at
                    }
                }
            `
        }
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        getApplicants();
        await res.json().then(data => {
            console.log('applyMatch done', data)
        })
    }
    // getApplicants();
    useEffect(() => {
        console.log('RecruitDetail useEffect')
        getApplicants() 
    },[]);

    // const [test, setTest] = useState(0);
    // const getTest = () => {
    //     console.log('getTest', test);
    //     setTest(test+1);
    // }
    // useEffect(() => {
    //     console.log('useeffect')
    //     getTest();
    // },[test])
    return (
        // <div className="detail__wrap modal--hide">
        <div className="detail__wrap">
            <div onClick={modalHide} className="modal__bg" />
            <div className="modal__box">
                <div className="row1">
                    <div className="emblem">
                        {getEmblem(props.data.isShow ? data.writer.tiers.tier : 'unknown')}
                    </div>
                    <div className="row1__column2">
                        <div className="nickname">
                            <span>{props.data.isShow ? data.writer.representationNickname : 'username'}</span>
                        </div>
                        <div className="tier">
                            <span>{props.data.isShow ? data.writer.tiers.tier : 'tier'} {props.data.isShow? data.writer.tiers.rank : 'rank'}</span>
                        </div>
                        <div className="point">
                            <span>{props.data.isShow ? data.writer.tiers.leaguePoint : 'leaguePoint'}</span>
                        </div>
                    </div>
                </div>
                <div className="row2">
                    <div className="record">
                        <div className="champion">
                            champ_img
                        </div>
                        <div className="score">
                            score_data
                        </div>
                    </div>
                </div>
                <div className="row3">
                    <button onClick={() => applyMatch(props.user._id)} className="button">
                        신청하기
                    </button>
                </div>  
            </div>
            <div className="modal__box">
                <div className="comments">
                    {/* {test} */}
                    {applicants}
                </div>
            </div>
        </div>
    )
};
export default RecruitDetail;