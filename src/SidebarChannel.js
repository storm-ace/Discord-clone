import React from 'react'
import { useDispatch } from 'react-redux'
import { setChannelInfo } from './features/appSlice'
import "./SidebarChannel.css"

function SidebarChannel(channel) {
    const dispatch = useDispatch()

    return (
        <div className="sidebarChannel" 
            onClick={() => 
                dispatch(
                    setChannelInfo({
                        channelID: channel.id,
                        channelName: channel.channelName,
                    })
                )
            }
        >
            <h4><span className="sidebarChannel__hash">#</span>
            {channel.channelName}
            </h4>
        </div>
    )
}

export default SidebarChannel
 