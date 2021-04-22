import 'assets/css/PublicationContents.css'
import clutchimg from 'assets/image/clutchimage.png'
import extesimg from 'assets/image/extesimage.png'

export default function PublicationContents() {
    return (
        <div className='public-main-contents'>
            <h2 className='public-title'>
                Publications
            </h2>
            <div className='public-inner'>
                <div className='public-inner-title'>International Journal</div>
                <ol>
                    <li>Young-Kyoon Suh, Seounghyeon Kim, and Jeeyoung Kim*,&nbsp;&nbsp;
                        <a href='https://ieeexplore.ieee.org/document/9281033' target='_blank' rel="noopener noreferrer">
                            "CLUTCH: A Clustering-Driven Runtime Estimation Scheme for Scientific Simulations"
                        </a>, <span class='association'>IEEE Access</span> 8: 220710 - 220722, 2020 (SCIE) (new).
                    </li>
                    <div style={{ textAlign: "center" }}><img src={clutchimg} alt='CLUTCH'></img></div>
                    <li>Seounghyeon Kim, Young-Kyoon Suh*, and Jeeyoung Kim*,&nbsp;&nbsp;
                        <a href='https://ieeexplore.ieee.org/document/8766089' target='_blank' rel="noopener noreferrer">
                            "EXTES: An Execution-Time Estimation Scheme for Efficient Computational Science and Engineering Simulation via Machine Learning"
                        </a>, <span class='association'>IEEE Access</span> 7: 98993 - 99002, 2019 (SCIE).
                    </li>
                    <div style={{ textAlign: "center" }}><img src={extesimg} alt='EXTEX'></img></div>
                </ol>
            </div>
            <div className='public-inner'>
                <div className='public-inner-title'>Domestic Journal</div>
                <ol>
                    <li>김성현, 서영균*, 탁병철,&nbsp;
                        <a href='http://kiise.or.kr/e_journal/2020/3/JOK/pdf/11.pdf' target='_blank' rel="noopener noreferrer">
                            "고품질 빅데이터 분석을 위한 최적의 전처리 순열 추천 방법"
                        </a>, 정보과학회 논문지, 제47권, 3호, pp. 319-327, 2020. 03.
                    </li>
                    <li>김성현, 서영균*,&nbsp;
                        <a href='http://www.cseric.or.kr/KeyDocs/tmp/0056-0070.pdf' target='_blank' rel="noopener noreferrer">
                            "계산과학공학 시뮬레이션의 효율화를 위한 기계 학습 기반의 실행 시간 추정 방법"
                        </a>, 데이타베이스연구, 제35권 1호, pp. 56–70, 2019.04.
                    </li>
                </ol>
            </div>
            <div className='public-inner'>
                <div className='public-inner-title'>Domestic Academic Paper</div>
                <ol>
                    <li>
                        정현태, 김성현, 서영균, "시뮬레이션-이력 데이터 분석 서비스 프레임워크의 설계 및 구현," KCSE 2019 제21권 1호, pp. 293–297 (oral).
                    </li>
                    <li>
                        김성현, 서영균, "기계학습 기법을 활용한 시뮬레이션 실행 시간 추정 알고리즘," KDBC2018 논문집, pp. 85–88 (oral).
                    </li>
                </ol>
            </div>
            <div className='public-inner'>
                <div className='public-inner-title'>Patent</div>
                <ol>
                    <li>
                        서영균*, 김성현, 정현태, 박수호, "시뮬레이션 실행 시간 예측 장치 및 예측 방법," 특허출원: 10-2020-0010327, 2020.01, 대한민국.
                    </li>
                </ol>
            </div>
        </div>
    )
}