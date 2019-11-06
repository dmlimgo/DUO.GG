import React, { useState, useEffect } from 'react';
import Recruit from './Recruit';
import './RecruitList.scss';



const RecruitList = () => {
    const [recruitList, setRecruitList] = useState([]);
    const [allList, setAllList] = useState([]);
    const requestBody = {
        query: `
            query{
                recruitmentAndWriters{
                    _id,
                    position,
                    status,
                    created_at,
                    updated_at,
                    writer {
                        username,
                        representationNickname,
                        tiers {
                            tier,
                            rank,
                            leaguePoint
                        },
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
    };
    const requestRecruit = async() => {
        const res = await fetch('http://localhost:4000/graphql', {
            method: 'POST',
            body: JSON.stringify(requestBody),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        await res.json().then(data => {
            setAllList(data.data.recruitmentAndWriters);
            setRecruitList(data.data.recruitmentAndWriters);
            // console.log(data.recruitmentsAndUsers);

        });
    };
    // if (each["position"] === "TOP"){
    //     return (
    //     <Recruit
    //     key={each._id}
    //     each={each}
    //     />
    //     )
    // }
    const positionList = num => {
        if (num===1) {
            setRecruitList(allList.filter(word => word["position"] === "TOP"))
        }
        else if (num===2) {
            setRecruitList(allList.filter(word => word["position"] === "JUNGLE"))
        }
        else if (num===3) {
            setRecruitList(allList.filter(word => word["position"] === "MID"))
        }
        else if (num===4) {
            setRecruitList(allList.filter(word => word["position"] === "AD"))
        }
        else if (num===5) {
            setRecruitList(allList.filter(word => word["position"] === "SUPPORT"))
        }
        else if (num===6) {
            setRecruitList(allList)
        }
    }
    const recruitPostList = recruitList.map((each, index) => {
        // console.log(resEach)
        return (
            <Recruit
                key={each._id}
                each={each}
            />
        )
    });
    useEffect(() => {
        requestRecruit();
    }, []);
    return (
        <div className="matchnow__list">
            <div className="recruit__filter">
                <button onClick={() => {positionList(1)}}>TOP</button>
                <button onClick={() => {positionList(2)}}>JUNGLE</button>
                <button onClick={() => {positionList(3)}}>MID</button>
                <button onClick={() => {positionList(4)}}>AD</button>
                <button onClick={() => {positionList(5)}}>SUPPORT</button>
                <button onClick={() => {positionList(6)}}>전체보기</button>
            </div>
            {recruitPostList}
        </div>
    );
};

export default RecruitList;