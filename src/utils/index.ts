import { QDialogOptions, Dialog } from 'quasar';

export function showErrorDetails(error: unknown) {
    const dialogOptions: QDialogOptions = {
        title: 'Error Details'
    };

    if (typeof error === 'string') dialogOptions.message = error;
    else {
        dialogOptions.message = `<pre><code> ${JSON.stringify(error, null, 2)} </code></pre>`;
        dialogOptions.html = true;
    }

    Dialog.create(dialogOptions);
}

export function getInitials(name: string) {
    const names = name.split(' ');
    names.splice(2);
    return names.map(n => n.charAt(0).toUpperCase()).join('');
}

/**
 * Gets asset url for the asset. Useful for dynamic binding of assets.
 * @param assetName asset name with extension
 */
export function getAssetUrl(assetName: string) {
    return new URL(`/src/assets/${assetName}`, import.meta.url).href;
}
