import { Avatar } from '@material-ui/core'
import './User.css'
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';

function User({ user }) {
    console.log(user)
    return (
        <div className="user">
            <h3>{user.title !== null ? user.title : ''}</h3>
            <div className="userInfo">
                <Avatar id="avatar" src={user.photo !== null ? user.photo : ''} />
                <FiberManualRecordIcon />
                <p>{user.name !== null ? user.name : ''}</p>
            </div>
        </div>
    )
}

export default User
