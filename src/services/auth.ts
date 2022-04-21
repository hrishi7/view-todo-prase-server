import Parse from '../config/config'
import Credential from '../types/auth';

type LoginCred = Omit<Credential, 'email'>

export const signUp = async (credientials: Credential) => {
    try {
        const user = new Parse.User();
        const response = await user.signUp(credientials)
        if (response) {
            return { success: true, message: 'SignUp & login Sucessfully!' }
        } else {
            return { success: false, message: 'Server Error! try again later' }
        }
    } catch (error: Parse.Error) {
        return { success: false, message: 'Server Error! try again later - ' + error.message }
    }
}

export const logIn = async (credientials: LoginCred) => {
    console.log(credientials)
    try {
        const response: Parse.User<Credential> = await Parse.User.logIn(credientials.username, credientials.password)
        if (response) {
            return { success: true, message: 'Loggedin Sucessfully!' }
        } else {
            return { success: false, message: 'Server Error! try again later' }
        }
    } catch (error: Parse.Error) {
        return { success: false, message: 'Server Error! try again later - ' + error.message }
    }
}

export const logOut = async () => {
    try {
        await Parse.User.logOut()
        const currentUser = Parse.User.current();  // this will now be null
        if (currentUser == null) {
            return 'Logout Successfully'
        } else {
            return 'Server Error! try again later'
        }

    } catch (error) {
        return 'Server Error! try again later'
    }
}

export const isLoggedIn = () => {
    return Parse.User.current() !== null ? true : false
}