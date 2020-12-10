import { useState } from "react"
import { useSelector } from 'react-redux';
import React, { useEffect } from 'react'
import db from './firebase'
import firebase from 'firebase'
import { selectChannelID } from "./features/appSlice"
import User from "./User"
import './Users.css'
import { selectUser } from './features/userSlice';

function Users(usr) {
    const [users, setUser] = useState([])
    const channelID = useSelector(selectChannelID)
    var activeUsersInGroup = new Array()

    useEffect(() => {
        if (channelID) {
            db.collection('users')
                .onSnapshot((snapshot) =>
                    setUser(snapshot.docs.map((doc) => doc.data()))
                )
        }
    }, [channelID])

    async function setUserInOnlinePanel() {
        if (channelID) {
            await db.collection('users').doc(usr.usr.displayName)
                .set({
                    title: "",
                    photo: usr.usr.photo,
                    name: usr.usr.displayName,
                    channel: channelID
                })
            let index = 0
            users.forEach(element => {
                if (channelID == element.channel) {
                    activeUsersInGroup[index] = element
                }
                index += 1
            });
        }
    }

    setUserInOnlinePanel()
    return (
        <div className="users">
            {activeUsersInGroup.map((u) => (
                <User user={u} />
            ))}
        </div>
    )
}

export default Users
