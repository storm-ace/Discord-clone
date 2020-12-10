import React, { useEffect, useState } from 'react'
import './Chat.css'
import ExpandMoreIcon from "@material-ui/icons/ExpandMore"
import ChatHeader from './ChatHeader'
import AddCircleIcon from '@material-ui/icons/AddCircle';
import CardGiftcardIcon from '@material-ui/icons/CardGiftcard';
import GifIcon from '@material-ui/icons/Gif';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import Message from './Message';
import { selectUser } from './features/userSlice';
import { selectChannelID, selectChannelName } from './features/appSlice';
import { useSelector } from 'react-redux';
import db from './firebase'
import firebase from 'firebase'
import { EmojiEngine } from './emojiEngine'


function Chat() {
    const user = useSelector(selectUser)
    const channelID = useSelector(selectChannelID)
    const channelName = useSelector(selectChannelName)
    const [input, setInput] = useState('')
    const [messages, setMessages] = useState([])

    let writingValue = false

    useEffect(() => {
        if (channelID) {
            db.collection('channels')
                .doc(channelID).collection('messages')
                .orderBy('timestamp', 'desc')
                .onSnapshot((snapshot) =>
                    setMessages(snapshot.docs.map((doc) => doc.data()))
                )
        }
    }, [channelID])
    
    const sendMessage = e => {
        e.preventDefault()

        if (input !== '') {
            db.collection('channels').doc(channelID).collection('messages')
                .add({
                    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
                    message: input,
                    user: user
                })

            setInput('')
        } else {
            var chat = document.getElementById("chat_value")
            chat.placeholder = "Can't send empty message!"
            setTimeout(function () {
                resetChatError(chat)
            }, 1000)
        }
    }

    const UpdateWriting = e => {
        e.preventDefault()

        // var writeInfo = document.getElementById("writing")
        // writeInfo.style.visibility = 'visible'
        // writeInfo.innerHTML = 'somebody' + " Is writing..."

        if (channelName !== '') {
            db.collection('channels').doc(channelID).collection('users')
                .set({
                    channel: channelName,
                    user: user.displayName,
                    isWriting: true
                })
        }

        setTimeout(function () {
            writingValue = false
            db.collection('users').doc(user.displayName)
                .set({
                    channel: channelName,
                    user: user.displayName,
                    isWriting: false
                })
        }, 5000)
    }

    function resetChatError(chat) {
        chat.placeholder = `Message #${channelName}`
    }

    function hideOnClickOutside() {
        let isActive = false

        const outsideClickListener = event => {
            console.log(event.target.className)

            if (event.target.className !== null && event.target.className !== "smiley__Panel") {
                if (!window.onkeypress) {
                    document.getElementById("smiley__Panel").style.visibility = 'hidden'
                    removeClickListener()
                    isActive = false
                }
            }
        }

        const removeClickListener = () => {
            document.removeEventListener('click', outsideClickListener)
        }

        if (isActive) return

        document.getElementById("smiley__Panel").style.visibility = 'visible'
        setTimeout(() => {
            document.addEventListener('click', outsideClickListener)
            isActive = true
        }, 500);
    }

    const ClickSmiley = e => {
        e.preventDefault()
        let value = input
        value += e.target.textContent
        setInput(value)
    }

    function chatInput(e) {
        setInput(EmojiEngine(e.target.value))
        //UpdateWriting(e)
    }

    return (
        <div className="chat">
            <ChatHeader channelName={channelName} />
            <div className="chat__messages">
                {messages.map((message) => (
                    <Message
                        timestamp={message.timestamp}
                        message={message.message}
                        user={message.user} />
                ))}
            </div>

            <div className="smiley__Panel" id="smiley__Panel">
                <div className="mostlyUsed">
                    <h4>😀 Mostly Used</h4>
                    <ExpandMoreIcon />
                </div>

                <div className="mostlyUsed__Grid">
                    <div className="grid-container">
                        <div className="grid-item">
                            <button onClick={ClickSmiley}>😀</button>
                            <button onClick={ClickSmiley}>😄</button>
                            <button onClick={ClickSmiley}>😁</button>
                            <button onClick={ClickSmiley}>😆</button>
                            <button onClick={ClickSmiley}>😅</button>
                            <button onClick={ClickSmiley}>😂</button>
                            <button onClick={ClickSmiley}>🤣</button>
                            <button onClick={ClickSmiley}>😊</button>
                        </div>
                    </div>
                </div>

                <div className="emojiCode__Panel">
                    <p>😀 :)</p>
                </div>
            </div>

            <div className="chat__input">
                <AddCircleIcon fontSize="large" />
                <form>
                    <input
                        id={"chat_value"}
                        value={input}
                        disabled={!channelID}
                        onChange={(e) => chatInput(e)}
                        placeholder={`Message #${channelName}`}
                    />
                    <button
                        disabled={!channelID}
                        className="chat__inputButton"
                        type="submit"
                        onClick={sendMessage}
                    ></button>
                </form>

                <div className="chat_inputIcons">
                    <CardGiftcardIcon />
                    <GifIcon />
                    <EmojiEmotionsIcon id="smiley__button" onClick={hideOnClickOutside} />
                </div>
            </div>

            <div className="isTyping__panel">
                <p id="writing" />
            </div>
        </div>
    )
}

export default Chat