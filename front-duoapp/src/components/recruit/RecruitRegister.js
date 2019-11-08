import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './RecruitRegister.scss';
import TopIcon from '../../assets/icons/ranked-positions/Position_Challenger-Top.png';
import JungleIcon from '../../assets/icons/ranked-positions/Position_Challenger-Jungle.png';
import MidIcon from '../../assets/icons/ranked-positions/Position_Challenger-Mid.png';
import BotIcon from '../../assets/icons/ranked-positions/Position_Challenger-Bot.png';
import SupportIcon from '../../assets/icons/ranked-positions/Position_Challenger-Support.png';

const RecruitRegister = () => {
    console.log('RecruitRegister Mounted')
    const [user, setUser] = useState({});
    const [registerResult, setState] = useState({});
    const getUsername = async() => {
        try {
            const token = document.cookie.split("MnMsToken=");
            // console.log('user', user);
            const res = await fetch('http://localhost:4000/authtest', {
                method: 'GET',
                mode: 'cors',
                headers: {
                    'Content-Type': 'applicatoin/json',
                    'authorization': token[1]
                },
            });
            await res.json().then(data => {
                setUser(data);
            });
        } catch(err) {
            console.log(err);
        }
    };
    const registerSubmit = async() => {
        const selectedPosition = document.querySelector('input[name="position"]:checked').id.toUpperCase();
        const requestBody = {
            query: `
                mutation {
                    createRecruitment(createRecruitmentInput: {username: "${user.username}", position: "${selectedPosition}"}) {
                        position
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
        await res.json().then(data => {
            setState(data);
        });
    };
    useEffect(() => {
        getUsername();
    },[]);
    return (
        <React.Fragment>
            {user.representationNickname ? (
                // 대표 소환사가 등록된 경우
                <div className="register__form">
                    <div className="register__title">
                        매칭 등록하기
                    </div>
                    <div className="register__content">
                        <div className="position__radio__wrap">
                            <label htmlFor="top">
                                <input type="radio" name="position" id="top" />
                                <img alt="top-icon" src={TopIcon} />
                            </label>
                            <label htmlFor="jungle">
                                <input type="radio" name="position" id="jungle" />
                                <img alt="jungle-icon" src={JungleIcon} />
                            </label>
                            <label htmlFor="mid">
                                <input type="radio" name="position" id="mid" />
                                <img alt="mid-icon" src={MidIcon} />
                            </label>
                            <label htmlFor="ad">
                                <input type="radio" name="position" id="ad" />
                                <img alt="bot-icon" src={BotIcon} />
                            </label>
                            <label htmlFor="support">
                                <input type="radio" name="position" id="support" />
                                <img alt="support-icon" src={SupportIcon} />
                            </label>
                        </div>
                        <div className="submit">
                            <button onClick={registerSubmit} className="button">
                                등록
                            </button>
                        </div>
                    </div>
                </div>
            ) : user ? (
                // 대표 소환사가 등록되지 않은 경우
                <Link to="/profile" className="register__form">
                    <div className="register__title">
                        대표 소환사를 등록해 주세요
                    </div>
                </Link>
            ) : (
                // 로그인 하지 않은 경우
                <div>
                    로그인 해 주세요
                </div>
            )}
        </React.Fragment>
    );
};

export default RecruitRegister;