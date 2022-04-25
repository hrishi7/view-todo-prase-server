import Parse from '../config/config'
import Credential from '../types/auth';

type LoginCred = Omit<Credential, 'email'>

export const signUp = async (credientials: Credential) => {
    try {
        const user: Parse.User = new Parse.User();
        const response = await user.signUp(credientials)
        if (response) {
            return { success: true, message: 'SignUp & login Sucessfully!' }
        } else {
            return { success: false, message: 'Server Error! try again later' }
        }
    } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later - ' + error.message }
    }
}

export const logIn = async (credientials: LoginCred) => {
    console.log(credientials)
    try {
        const response = await Parse.User.logIn(credientials.username, credientials.password)
        if (response) {
            return { success: true, message: 'Loggedin Sucessfully!' }
        } else {
            return { success: false, message: 'Server Error! try again later' }
        }
    } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later - ' + error.message }
    }
}

export const logOut = async () => {
    try {
        await Parse.User.logOut()
        const currentUser = Parse.User.current();  // this will now be null
        if (currentUser == null) {
            return { success: true, message: 'Logout Successfully' }
        } else {
            return { success: false, message: 'Server Error! try again later' }
        }

    } catch (err) {
        const error = err as Parse.Error;
        return { success: false, message: 'Server Error! try again later'+ error.message }
    }
}

export const isLoggedIn = () => {
    return Parse.User.current() !== null ? true : false
}