import { defineStore } from 'pinia';
import Parse from 'parse/dist/parse.min';
import log from 'loglevel';

interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  username: string | null;
  password: string;
}

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null as Parse.User | null,
    otpToken: null as string | null
  }),

  actions: {
    async signup(data: SignupData) {
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
    }
  }
});
