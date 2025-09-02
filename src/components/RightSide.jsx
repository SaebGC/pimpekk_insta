import React from 'react'
import './RightSide.css'

const RightSide = () => {
  return (
    <div className="rightSideHome">
      <div className="topProfileRight">
        <div className="leftRightProfile">
          <div className="imageDivRightSIde">
            <img className='imageRightSideProfile' src="https://i.pinimg.com/736x/74/a7/bf/74a7bf3e184a689c975cc5a4b43bcb79.jpg" />
          </div>
          <div className="userNameBlock">
            <div className="userNameRightSide">Dog_wolff</div>
            <div className="userFullName">Dog Wolff</div>
          </div>
        </div>
        <div className="swithcBtn">
          Switch
        </div>
      </div>
      <div className="bottomRightSide">
        <div className="suggestedBlock">
          <div className="suggestedForYou">suggested for you</div>
          <div className="seeAll">See All</div>
        </div>
        <div className="followBlockRightSide">
          <div className="topProfileRightBottomProfile">
            <div className="leftRightProfile">
              <div className="imageDivRightSIde">
                <img className='imageRightSideProfile' src="https://i.pinimg.com/736x/39/40/5a/39405a25ce27a1fe06c7cb52027999e0.jpg" />
              </div>
              <div className="userNameBlock">
                <div className="userNameRightSide">bunta_fujiwara</div>
                <div className="userFullName">New to Instagram</div>
              </div>
            </div>
            <div className="swithcBtn">
              Follow
            </div>
          </div>
          <div className="topProfileRightBottomProfile">
            <div className="leftRightProfile">
              <div className="imageDivRightSIde">
                <img className='imageRightSideProfile' src="https://i.pinimg.com/1200x/e0/77/49/e07749502ffe21bbea3872e370da200d.jpg" />
              </div>
              <div className="userNameBlock">
                <div className="userNameRightSide">El_brian</div>
                <div className="userFullName">New to Instagram</div>
              </div>
            </div>
            <div className="swithcBtn">
              Follow
            </div>
          </div>
          <div className="topProfileRightBottomProfile">
            <div className="leftRightProfile">
              <div className="imageDivRightSIde">
                <img className='imageRightSideProfile' src="https://i.pinimg.com/1200x/7f/3a/fb/7f3afb88712a75ef397ae98968a72a1c.jpg" />
              </div>
              <div className="userNameBlock">
                <div className="userNameRightSide">Honda</div>
                <div className="userFullName">New to Instagram</div>
              </div>
            </div>
            <div className="swithcBtn">
              Follow
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RightSide