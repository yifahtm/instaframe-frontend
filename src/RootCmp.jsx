import React from 'react'
import { Routes, Route } from 'react-router'

// import { AppHeader } from './cmps/AppHeader'
import { NavBar } from './cmps/NavBar.jsx'
import { StoryDetails } from './cmps/StoryDetails.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { UserProfile } from './pages/UserProfile.jsx'
import { Explore } from './pages/Explore.jsx'
import { Messages } from './pages/Messages.jsx'
import { Chat } from './pages/Chat.jsx'
import { MessageContainer } from './cmps/MessageContainer.jsx'

export function RootCmp() {

    return (
        <div className='app-container'>
            {/* <AppHeader /> */}
            <NavBar />

            <main className='contant-container'>
                <Routes>
                    <Route path="/story" element={<StoryIndex />} >
                        <Route path="/story/:storyId" element={<StoryDetails />} />
                    </Route>
                    <Route path="/" element={<StoryIndex />} />
                    <Route path="explore" element={<Explore />} />
                    <Route path="/:id" element={<UserProfile />} />
                    <Route path="inbox" element={<Messages />} >
                        <Route path=":id" element={<Messages />} />
                    </Route>

                    <Route path="login" element={<LoginSignup />} />
                    <Route path="chat" element={<Chat />} />
                </Routes>
            </main>
        </div >
    )
}


