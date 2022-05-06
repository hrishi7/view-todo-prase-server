import { defineStore } from 'pinia';
import Parse from '../config/config';
import log from 'loglevel';
import { AddUserAttributes } from 'src/pages/SignUp.vue';



export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as Parse.User | null,
  }),

  getters: {
    /**
        * get specific user attributes
        */
    userAttributes: (state) => () => {
      return state.user?.attributes as UserAttributes
    },
  },

  actions: {
    async signup(data: AddUserAttributes) {
      try {
        const user: Parse.User = new Parse.User();
        this.user = await user.signUp(data)
      } catch (error) {
        log.error(error);
        throw error;
      }
    },

    async login({ email, password }: { email: string; password: string }) {
      try {
        this.user = await Parse.User.logIn(email, password)
      } catch (error) {
        log.error(error);
        throw error;
      }
    },

    async logout() {
      try {
        this.user = await Parse.User.logOut()
      } catch (error) {
        log.error(error);
        throw error;
      }
    },

    fetchUser() {
      try {
        // eslint-disable-next-line 
        //@ts-ignore
        this.user = () => {
          return Parse.User.current()?.attributes as UserAttributes
        }
      } catch (error) {
        log.error(error);
        throw error;
      }
    }

  }
});
