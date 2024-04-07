import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Fragment, useState, useEffect } from 'react'
import { socketService } from '../services/socket.service.js'
import { logout } from '../store/user.actions.js'
import { toggleModal } from '../store/system.actions.js'
import { CreateModal } from './CreateModal.jsx'

export function NavBar() {
    const user = useSelector(storeState => storeState.userModule.user)
    const [full, setFull] = useState(true)

    async function onLogout() {
        try {
            await logout()
            console.log('USER FROM LOGOUT')

        } catch (err) {
            console.log(err)
        }
    }

    // if (!user) return <div className="loading-page"></div>
    return (
        <Fragment>

            <div className='test'>
                <div className='nav-header-btns'>
                    <a onClick={toggleModal} className='nav-btn'><i className="fa-regular fa-square-plus"></i></a>
                </div>
            </div>

            <section className={full ? "side-bar" : "side-bar mini"}>
                <a className='icon' href='/'>
                    {full ? <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Instagram_logo.svg/2560px-Instagram_logo.svg.png" /> : null}
                </a>
                <nav className="navbar">
                    <NavLink className='nav-btn' to='/'><span className='nav-icon'><i className="fa-solid fa-house"></i></span><span className='nav-name'>Home</span></NavLink>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-solid fa-magnifying-glass"></i></span><span className='nav-name'>Search</span></a>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-compass"></i></span><span className='nav-name' >Explore</span></a>
                    <NavLink className='nav-btn' ><span className='nav-icon'><i className="fa-brands fa-facebook-messenger"></i></span><span className='nav-name'>Messages</span></NavLink>
                    <a className='nav-btn'><span className='nav-icon'><i className="fa-regular fa-heart"></i></span><span className='nav-name'>Notifications</span></a>
                    <a onClick={toggleModal} className='nav-btn mobile'><span className='nav-icon'><i className="fa-regular fa-square-plus"></i></span><span className='nav-name' ><CreateModal /></span></a>
                    <NavLink className='nav-btn'
                    // to={user.username}
                    >
                        <span className='nav-icon'>
                            {/* <img src={user.imgUrl} /> */}
                        </span><span className='nav-name' >Profile</span></NavLink>
                </nav>
            </section>
        </Fragment >
    )
}