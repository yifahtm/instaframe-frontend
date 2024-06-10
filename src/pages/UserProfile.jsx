import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams, useNavigate } from 'react-router-dom'

import { loadStories } from "../store/story.actions.js"
import { loadUsers } from '../store/user.actions.js'
import { userService } from '../services/user.service.js'

import { loadUser } from '../store/user.actions.js'
import { store } from '../store/store.js'
import { showSuccessMsg } from '../services/event-bus.service.js'

// import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service'
import { utilService } from '../services/util.service'

export function UserProfile() {
  const params = useParams()
  // const users = useSelector(storeState => storeState.userModule.users)
  const user = useSelector(storeState => storeState.userModule.watchedUser)
  const stories = useSelector(storeState => storeState.storyModule.stories)

  const [follow, setFollow] = useState('')
  const [toggle, setToggle] = useState('stories')
  const imagesLocationStart = '../../'
  const navigate = useNavigate()
  console.log(user)
  let loggedInUser
  let userProfile
  params.id === user._id ? loggedInUser = true : loggedInUser = false

  useEffect(() => {
    loadStories()
    // console.log(users)
    loadUser(params.id)
    console.log(params.id)
    // loadUsers()
  }, [])

  // if (loggedInUser)

  userProfile = user
  // else {
  //   console.log(users)
  //   userProfile = users.find(user =>
  //     user._id === params.id)
  // }

  console.log(stories)
  const profileStories = stories.filter(story => ((story.by.username === params.id) || (story.by._id === params.id)))
  const savedStories = stories.filter(story => user.savedStoryIds.includes(story._id))
  console.log(profileStories)
  function onToggle(str) {
    if (!loggedInUser) return
    setToggle(str)
  }

  function storyModal(story) {
    navigate(`/story/${story._id}`)
  }


  function checkFollow() {
    return user.following.some(user => user._id === userProfile._id)
  }

  // function goToMessages() {
  //   navigate(`/inbox/${userProfile._id}`)
  // }


  function toggleFollow() {
    if (checkFollow()) {
      const idx = user.following.findIndex(user => user._id === userProfile._id)
      user.following.splice(idx, 1)

      const userProfileIdx = userProfile.followers.findIndex(userProfile => userProfile._id === user._id)
      userProfile.followers.splice(userProfileIdx, 1)
    }

    else {
      user.following.push({
        _id: userProfile._id,
        fullname: userProfile.fullname,
        username: userProfile.username,
        imgUrl: userProfile.imgUrl
      })

      userProfile.followers.push({
        _id: user._id,
        fullname: user.fullname,
        username: user.username,
        imgUrl: user.imgUrl
      })
    }
    userService.update(user)
    userService.update(userProfile)
    setFollow(checkFollow())
  }

  if (!userProfile) return <div className="loading-page"><span className="loading">fgfdfuyf</span></div>
  return <div className="profile-page contant-container main-container">
    <div className="profile-container">
      <section className="profile-header">
        <section className="profile-photo">
          <img src={userProfile.imgUrl} />
          {loggedInUser &&
            <div className='highlights flex column space-between justify-center'>
              <button className='btn-highlights' id=' btn-highlights'><i className="fa-solid fa-plus"></i></button>
              <label htmlFor='btn-highlights'>New</label>
            </div>
          }
        </section>
        <section className="profile-info">
          {loggedInUser ?
            <div className="profile-info-header">
              <a>{userProfile.username}</a>
              <button>Edit profile</button>
              <button>View archive</button>
              <a>

                <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>

              </a>
            </div>

            // <div>
            //     <div
            //       className={isExpanded ? 'nav-more open' : 'nav-more'}
            //     >
            //       <Link className='nav-more-btn' to='switch'>Switch accounts</Link>
            //       {/* <a className='nav-btn' onClick={onLogout}>Logout</a> */}
            //       <Link onClick={onLogout} className='nav-more-btn' to='login'>Logout</Link>
            //     </div>
            //   </div>
            //   <a
            //     // className="nav-bar-more" 
            //     onClick={() => setIsExpanded(!isExpanded)}> <svg aria-label="Options" className="x1lliihq x1n2onr6 x5n08af" fill="currentColor" height="24" role="img" viewBox="0 0 24 24" width="24"><title>Options</title><circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle><path d="M14.232 3.656a1.269 1.269 0 0 1-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 0 1-.796.66m-.001 16.688a1.269 1.269 0 0 1 .796.66l.505.996h1.862l.505-.996a1.269 1.269 0 0 1 .796-.66M3.656 9.768a1.269 1.269 0 0 1-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 0 1 .66.796m16.688-.001a1.269 1.269 0 0 1 .66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 0 1-.66-.796M7.678 4.522a1.269 1.269 0 0 1-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 0 1-.096 1.03m11.8 11.799a1.269 1.269 0 0 1 1.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 0 1 .096-1.03m-14.956.001a1.269 1.269 0 0 1 .096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 0 1 1.03.096m11.799-11.8a1.269 1.269 0 0 1-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 0 1-1.03-.096" fill="none" stroke="currentColor" strokeLinejoin="round" strokeWidth="2"></path></svg>
            //   </a>
            // </div>


            :
            <div className="profile-info-header">
              <a>{userProfile.username}</a>
              <div>
                {checkFollow() ? <button onClick={toggleFollow}>Following</button> : <button onClick={toggleFollow} className='follow'>Follow</button>}
                <button className='message'
                //  onClick={goToMessages}
                ><i className="fa-solid fa-user-pen"></i></button>
                <button className='options'
                //  onClick={() => setIsListOpen(!isListOpen)}

                >
                  <i className="fa-solid fa-ellipsis"></i>
                  {/* {isListOpen &&
                  <ActionListModal
                    onRemoveStory={onRemoveStory}
                    story={story}
                    isListOpen={isListOpen}
                    setIsListOpen={setIsListOpen}
                  />} */}

                </button>
              </div>
            </div>
          }
          <div className="user-info flex">
            <section className="user-stories flex space-between"><a className="user-number flex">{profileStories.length}</a><a> stories</a></section>
            <section className="user-followers flex"><a className="user-number flex">{userProfile.followers.length}</a><a> followers</a></section>
            <section className="user-following flex"><a className="user-number flex">{userProfile.following.length}</a><a> following</a></section>
          </div>
          <div className="user-bio">
            <a className="user-name">{userProfile.fullname}</a>
            <a className="bio">{userProfile.bio}</a>
          </div>
        </section>
      </section>
      <div className='content-container'>
        <section className="profile-links">
          <section onClick={() => setToggle('stories')} className={toggle === "stories" ? "profile-pics-link activated" : "profile-pics-link"}><a className='stories-icon'>{toggle === "stories" ?

            <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg> : <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><rect fill="none" height="18" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" width="18" x="3" y="3"></rect><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="9.015" x2="9.015" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="14.985" x2="14.985" y1="3" y2="21"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="9.015" y2="9.015"></line><line fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" x1="21" x2="3" y1="14.985" y2="14.985"></line></svg>

          }</a>STORIES</section>
          <section onClick={() => onToggle('saved')} className={toggle === "saved" ? "profile-pics-link activated" : "profile-pics-link"}><a className='saved-icon'>{toggle === "saved" ?

            <svg aria-label="" className="_ab6-" color="#262626" fill="#262626" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg> : <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><polygon fill="none" points="20 21 12 13.44 4 21 4 3 20 3 20 21" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></polygon></svg>

          }</a>SAVED</section>
          <section className="profile-pics-link"> <a className='tagged-icon'>

            <svg aria-label="" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="12" role="img" viewBox="0 0 24 24" width="12"><path d="M10.201 3.797 12 1.997l1.799 1.8a1.59 1.59 0 0 0 1.124.465h5.259A1.818 1.818 0 0 1 22 6.08v14.104a1.818 1.818 0 0 1-1.818 1.818H3.818A1.818 1.818 0 0 1 2 20.184V6.08a1.818 1.818 0 0 1 1.818-1.818h5.26a1.59 1.59 0 0 0 1.123-.465Z" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><path d="M18.598 22.002V21.4a3.949 3.949 0 0 0-3.948-3.949H9.495A3.949 3.949 0 0 0 5.546 21.4v.603" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></path><circle cx="12.072" cy="11.075" fill="none" r="3.556" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"></circle></svg>

          </a>TAGGED</section>

        </section>
        {toggle === "stories" ?
          <section className="profile-stories">
            {profileStories.map(story => <div key={story._id} onClick={() => storyModal(story)} className='story'>
              <section className='story-info'>
                <div className='likes-comm'>
                  <div>
                    <i className="fa-solid fa-heart"></i>
                    <span>{story.likedBy.length}</span>
                  </div>
                  <div>
                    <i className="fa-solid fa-comment"></i>
                    <span>{story.comments.length}</span>
                  </div>
                </div>
              </section>
              {story.imgUrls[0].startsWith('http') ?
                <img key={story.imgUrl} src={story.imgUrls[0]} /> :
                <img key={story.imgUrl} src={imagesLocationStart + story.imgUrls[0]} />}
            </div>
            )}
          </section>
          :
          <section className="profile-stories">
            {savedStories.map(story => (
              <img key={story._id} src={story.imgUrls[0].startsWith('http') ? story.imgUrls[0] : imagesLocationStart + story.imgUrls[0]} />
            ))}
          </section>

        }
      </div>
    </div>
  </div>

}

