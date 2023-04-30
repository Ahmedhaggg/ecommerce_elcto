import { setCookies, getCookie, deleteCookie, getCookies } from 'cookies-next';

const get = (key) => getCookie(key);

const set = (key, value) => setCookies(key, value);

const destroy = (key) => deleteCookie(key);

const update = (key, value) => setCookies(key, value);

export default {
    get,
    set,
    destroy,
    update
}