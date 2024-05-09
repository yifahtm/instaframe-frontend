import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState, useEffect } from 'react'
import { socketService } from '../services/socket.service.js'
import { gotNewNotification } from '../store/user.actions.js'
import { logout } from '../store/user.actions.js'
import { toggleModal } from '../store/system.actions.js'
import { SearchModal } from './SearchModal.jsx'
import { Notifications } from './Notifications.jsx'
import { CreateModal } from './CreateModal.jsx'

export function NavBar() {
    const user = useSelector(storeState => storeState.userModule.watchedUser)
    const isModalOpen = useSelector(storeState => storeState.systemModule.isModalOpen)
    const newMessage = useSelector(storeState => storeState.messageModule.newMessage)
    const newNotification = useSelector(storeState => storeState.userModule.newNotification)

    const [searchModal, setSearchModal] = useState(false)
    const [notifications, notificationsModal] = useState(false)
    const [activityNotif, setActivityNotif] = useState([])
    const [isExpanded, setIsExpanded] = useState(false)
    const [full, setFull] = useState(true)

    function onMessages() {
        setFull(!full)
    }

    function onFull() {
        setFull(true)
    }

    function onSearch() {
        setSearchModal(!searchModal)
        setFull(!full)
    }

    function onNotifications() {
        // setSearchModal(!searchModal)
        notificationsModal(!notifications)
        gotNewNotification(false)
        setFull(!full)
    }

    async function onLogout() {
        try {
            await logout()
            console.log('USER FROM LOGOUT')

        } catch (err) {
            console.log(err)
        }
    }

    const onRecieveNewActivity = (activity) => {
        setActivityNotif(prevActivity => [...prevActivity, activity])
        // activityNotif.unshift(activity)
        console.log('ACTIVITY', activity)
        gotNewNotification(true)
    }

    useEffect(() => {
        socketService.on('new-reacting-activity', onRecieveNewActivity)

        return () => {
            socketService.off('new-reacting-activity', onRecieveNewActivity)
        }
    }, [])

    {/* 
                <div className='test'>
                    <div className='nav-header-btns'>
                        <a onClick={toggleModal} className='nav-btn'><i className="fa-regular fa-square-plus"></i></a>
                    </div>
                </div> */}
    if (!user) return <div className="loading-page"></div>
    return (
        <>
            <SearchModal setSearchModal={setSearchModal} searchModal={searchModal} full={full} setFull={setFull} />
            <Notifications activityNotif={activityNotif}
                setSearchModal={setSearchModal} searchModal={searchModal}
                full={full} setFull={setFull} notificationsModal={notificationsModal} notifications={notifications} />
            <section className={full ? "nav-bar" : "nav-bar mini"}>
                <a href='/'>
                    {full ? <h1 onClick={onFull} className="logo">Instaframe</h1> : null}
                </a>
                <nav className="nav-links">
                    <NavLink onClick={onFull} className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a onClick={onSearch} className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name'>Search</span></a>
                    <NavLink onClick={onFull} className='nav-btn' to='explore'><span className='nav-icon'><i className="fa-regular fa-compass"></i></span><span className='nav-name' >Explore</span></NavLink>
                    {/* <div className="btns-dif-spacing"> */}
                    <NavLink onClick={onMessages} className='nav-btn messages' to='/inbox'><span className='nav-icon'><i className="fa-brands fa-facebook-messenger"></i></span>{newMessage && newMessage.review ? <span className='new-msg'></span> : null}<span className='nav-name'>Messages</span></NavLink>
                    <a onClick={onNotifications} className='nav-btn notifications n'><span className='nav-icon'><i className="fa-regular fa-heart"></i></span>{newNotification ? <span className='new-msg'></span> : null}<span className='nav-name'>Notifications</span></a>

                    <a onClick={toggleModal} className='nav-btn create mobile'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' >Create</span></a>
                    {isModalOpen && <CreateModal />}
                    <NavLink onClick={onFull} className='nav-btn profile'
                        to={user._id}
                    >
                        <span className='nav-icon'>
                            <img src='https://xsgames.co/randomusers/assets/avatars/female/73.jpg' />
                        </span><span className='nav-name' >Profile</span></NavLink>
                    {/* </div> */}
                </nav>
                {/* <div className="more">
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-bars"></i></span><span className='nav-name' >More</span></a>
                </div> */}

                <div>
                    <div className={isExpanded ? 'nav-more open' : 'nav-more'}>
                        <Link className='nav-more-btn' to='switch'>Switch accounts</Link>
                        {/* <a className='nav-btn' onClick={onLogout}>Logout</a> */}
                        <Link onClick={onLogout} className='nav-more-btn' to='login'>Logout</Link>
                    </div>
                </div>
                <a className="nav-bar-more" onClick={() => setIsExpanded(!isExpanded)}><i className="fa-solid fa-bars"></i><span>More</span></a>
            </section>
        </>
    )
}