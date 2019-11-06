import React from 'react';
import './RecruitDetail.scss';
import Emblem_Iron from '../../assets/icons/ranked-emblems/Emblem_Iron.png';
import Emblem_Bronze from '../../assets/icons/ranked-emblems/Emblem_Bronze.png';
import Emblem_Silver from '../../assets/icons/ranked-emblems/Emblem_Silver.png';
import Emblem_Gold from '../../assets/icons/ranked-emblems/Emblem_Gold.png';
import Emblem_Platinum from '../../assets/icons/ranked-emblems/Emblem_Platinum.png';
import Emblem_Diamond from '../../assets/icons/ranked-emblems/Emblem_Diamond.png';
import Emblem_Master from '../../assets/icons/ranked-emblems/Emblem_Master.png';
import Emblem_Grandmaster from '../../assets/icons/ranked-emblems/Emblem_Grandmaster.png';
import Emblem_Challenger from '../../assets/icons/ranked-emblems/Emblem_Challenger.png';
import { getEmblem } from './Recruit';

const RecruitDetail = props => {
    console.log('modal detail', props);
    const data = props.data.clickedRecruit;
    console.log('modaldata', data);
    const modalHide = () => {
        document.querySelector('.detail__wrap').classList.remove('modal--show');
        document.querySelector('.detail__wrap').classList.add('modal--hide');
    };
    const getApplicants = () => {
        // recruit_id필요
        const request_body = {
            query: `
                query {
                    recruitmentAndApplicants(recruitId:"5dba82c9ffd1e12700a78837") {
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
                            username,
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
    };
    return (
        <div className="detail__wrap modal--hide">
            <div onClick={modalHide} className="modal__bg" />
            <div className="modal__box">
                <div className="row1">
                    <div className="emblem">
                        {getEmblem('BRONZE')}
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
                <div className="row3">
                    <button className="button">
                        신청하기
                    </button>
                </div>
                <div className="comments">
                    
                </div>
            </div>
        </div>
    )
};
export default RecruitDetail;