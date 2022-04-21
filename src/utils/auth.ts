export function required(val: string) {
    return (val && val.length > 0) || 'Filed is required';
}

export function short(val: string) {
    return (
        (val && val.length > 3) || 'Password must be more than 3 charecter atleast'
    );
}
export function isEmail(val: string) {
    const emailPattern =
        /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
    return emailPattern.test(val) || 'Invalid Email ! please enter correct email';
}
