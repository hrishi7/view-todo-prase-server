import { QVueGlobals } from 'quasar';
export function showNotify(q: QVueGlobals, message: string, color: string, icon: string) {
    q.notify({
        message,
        color,
        icon,
    })
}