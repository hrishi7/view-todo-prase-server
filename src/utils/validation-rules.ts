import emailValidator from 'validator/lib/isEmail';
import alphaNumericValidator from 'validator/lib/isAlphanumeric';
import dateValidator from 'validator/lib/isDate';
import lengthValidator, { IsLengthOptions } from 'validator/lib/isLength';
import passwordValidator from 'validator/lib/isStrongPassword';

export function required(val: unknown) {
    if (!val) return 'Required';
    return true;
}

/**
* Validates if the given string's length is between the given min and max length.
* @param val The string to validate.
* @param isLengthOptions The options for the length validator. Default: `{ min: 3, max: 30 }`
* @returns error message if the length is not valid, true if valid
*/
export function isLength(val: string, isLengthOptions: IsLengthOptions = { min: 3, max: 30 }) {
    if (!lengthValidator(val, isLengthOptions)) return `Must be minimum ${isLengthOptions.min} and maximum ${isLengthOptions.max} characters`;
    return true;
}


export function isEmail(val: string) {
    if (!emailValidator(val)) return 'Email is invalid';
    return true;
}


/**
 * Validates password strength. Password should be at least 8 characters long, contain at least one number, one upper
 * case letter and one lower case letter.
 * @param val The string to validate.
 * @returns error message if the password is not valid, true if valid
 */
export function isPasswordValid(val: string) {
    if (!passwordValidator(val, { minSymbols: 0 })) return 'Password must contain at least 1 lower case, 1 upper case and 1 digit';
    return true;
}

/**
 * Validates if string contains only alphanumeric characters. Can include space
 * @param val The string to validate.
 * @returns error message if the string is not valid, true if valid
 */
export function isAlphaNumeric(val: string, ignore: string | RegExp = ' ') {
    if (!alphaNumericValidator(val, undefined, { ignore })) return 'Only letters and numbers are allowed';
    return true;
}

export function isDate(val: string) {
    if (!dateValidator(val, { format: 'DD/MM/YYYY' })) return 'Invalid date';
    return true;
}