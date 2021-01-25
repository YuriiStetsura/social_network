import { connect } from "react-redux";
import { followedAC, setUserdAC, unfollowedAC } from "../../redux/users-reducer";
import Users from "./users";

let mapStateToProps = (state) => {
    return {
        users: state.usersPage.users 
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        follow: (id) => {
            dispatch(followedAC(id));
        },
        unfollow: (id) => {
            dispatch(unfollowedAC(id));
        },
        setUser: (users) => {
            dispatch(setUserdAC(users));
        }
    }
}

let UsersContainer = connect(mapStateToProps, mapDispatchToProps)(Users);

export default UsersContainer;