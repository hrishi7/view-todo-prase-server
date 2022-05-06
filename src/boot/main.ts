import { boot } from 'quasar/wrappers';
import Parse from 'parse/dist/parse.min'; // https://github.com/parse-community/Parse-SDK-JS/issues/1362
import { Notify, setCssVar } from 'quasar';
import { getActivePinia } from 'pinia';
import { markRaw } from 'vue';
import loglevel from 'loglevel';
import { useUserStore } from 'src/stores/user';
import { showErrorDetails } from 'src/utils';

import type { Router } from 'vue-router';


export default boot(async ({ app, router, redirect, urlPath }) => {
    // add global router prop to store
    getActivePinia()?.use(({ store }) => {
        store.router = markRaw(router);
    });

    // set color pallet from config
    setCssVar('primary', `#68A7AD`);
    setCssVar('secondary', `#79DAE8`);
    setCssVar('error', '#F85757');
    setCssVar('warning', '#FFA924');

    // Notify plugin defaults
    Notify.setDefaults({
        timeout: 5000,
        position: 'top-right',
        progress: true,
        classes: 'text-subtitles2',
        actions: [
            {
                flat: true,
                round: true,
                icon: 'close',
                size: 'md',
                color: 'white'
            }
        ]
    });

    // First redirect to root path so that we can initialize the app before rendering the requested path. Requested path
    // is added to the query params so that, when the app is initialized, we can render the requested path.
    if (!/^\/(\?.*){0,1}$/.test(urlPath)) return redirect({ path: '/', query: { next: urlPath } });

    // we shouldn't await this promise as it'll block the boot process which in turn will block the initial route
    // resolution. i.e, router.isReady() will never resolve if this promise is awaited
    init(router);
});

export async function init(router: Router): Promise<void> {
    const userStore = useUserStore();

    try {
        const localUser = Parse.User.current();

        // Wait until initial route, generally `/`, is resolved before replacing it
        await router.isReady();

        // After initial route is resolved, if the localUser is null it means that the current route is /login and we
        // shouldn't continue with init
        if (!localUser) return;
        else router.replace((router.currentRoute.value.query.next as string) ?? '/login');


    } catch (error: any) {
        let message = 'An error occurred while initializing the application.';
        let logout = true;

        if (error instanceof Parse.Error) {
            if (error.code === Parse.Error.CONNECTION_FAILED) {
                message = 'Please check your internet connection and try again.';
                logout = false;
            }

            if (error.code === Parse.Error.INVALID_SESSION_TOKEN) {
                message = 'Please log in again.';
                logout = true;
            }
        }
        Notify.create({
            message,
            type: 'error',
            position: 'top-right',
            actions: [
                {
                    label: 'Details',
                    color: 'yellow',
                    handler: () => showErrorDetails(error)
                }
            ]
        });
        loglevel.error(error);

        if (logout) {
            // logout user to repeat the process
            await Parse.User.logOut();
            router.replace('/login');
        }
    }
}
