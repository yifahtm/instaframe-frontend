import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState, useEffect } from 'react'
import { socketService } from '../services/socket.service.js'
// import { logout } from '../store/user.actions.js'
import { toggleModal } from '../store/system.actions.js'
import { CreateModal } from './CreateModal.jsx'

export function NavBar() {
    // const user = useSelector(storeState => storeState.userModule.user)
    const isModalOpen = useSelector(storeState => storeState.systemModule.isModalOpen)
    const [full, setFull] = useState(true)

    // async function onLogout() {
    //     try {
    //         await logout()
    //         console.log('USER FROM LOGOUT')

    //     } catch (err) {
    //         console.log(err)
    //     }
    // }

    {/* 
                <div className='test'>
                    <div className='nav-header-btns'>
                        <a onClick={toggleModal} className='nav-btn'><i className="fa-regular fa-square-plus"></i></a>
                    </div>
                </div> */}
    // if (!user) return <div className="loading-page"></div>
    return (
        <>

            <section className={full ? "nav-bar-full" : "nav-bar-mini"}>
                <a href='/'>
                    {full ? <h1 className="logo">Instaframe</h1> : null}
                </a>
                <nav className="nav-links">
                    <NavLink className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name'>Search</span></a>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-compass"></i></span><span className='nav-name' >Explore</span></a>
                    <NavLink className='nav-btn' ><span className='nav-icon'><i className="fa-brands fa-facebook-messenger"></i></span><span className='nav-name'>Messages</span></NavLink>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-heart"></i></span><span className='nav-name'>Notifications</span></a>

                    <a onClick={toggleModal} className='nav-btn mobile'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' >Create</span></a>
                    {isModalOpen && <CreateModal />}
                    <NavLink className='nav-btn'
                    // to={user.username}
                    >
                        <span className='nav-icon'>
                            <img src='https://xsgames.co/randomusers/assets/avatars/female/73.jpg' />
                        </span><span className='nav-name' >Profile</span></NavLink>
                </nav>
                <div className="more">
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-bars"></i></span><span className='nav-name' >More</span></a>
                </div>
            </section>
        </>
    )
}