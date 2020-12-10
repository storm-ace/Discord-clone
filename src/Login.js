import { Button } from '@material-ui/core';
import { auth, provider } from './firebase';
import React from 'react'
import './Login.css'

function login() {
    const signIn = () => {
        auth.signInWithPopup(provider)
            .catch((error) => alert(error.message));
    };

    const signInGuest = () => {
        auth.signInAnonymously()
            .catch((error) => alert(error.message));
    }

    return (
        <div className="login">
            <div className="login__Logo">
                <img src="https://discord.com/assets/fc0b01fe10a0b8c602fb0106d8189d9b.png" alt="" />

                <div className="info">
                    <h1>Created by Wesley Coomans</h1>
                    <p>This app is created using react and firebase as it's hosting platform.empty.</p>
                    <p>The goal is to recreate the popular Discord chat platform.</p>
                </div>

                <div className="Changelogs">
                    <h1>Changelogs</h1>
                    <div className="border"/>

                    <h1 id="header"/>
                    <p id="description"/>
                </div>
            </div>

            <div className="button_panel">
                <Button onClick={signIn}>Sign In</Button>
                <Button onClick={signInGuest}>Sign in as guest</Button>
            </div>
        </div>
    )
}

export default login
