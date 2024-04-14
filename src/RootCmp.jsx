import React from 'react'
import { Routes, Route } from 'react-router'

import { AppHeader } from './cmps/AppHeader'
import { NavBar } from './cmps/NavBar.jsx'
import { AppFooter } from './cmps/AppFooter'
import { StoryDetails } from './cmps/StoryDetails.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { LoginSignup } from './cmps/LoginSignup.jsx'
import { UserProfile } from './pages/UserProfile.jsx'

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
                    <Route path="/:username" element={<UserProfile />} />
                    <Route path="login" element={<LoginSignup />} />
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div >
    )
}


