'use strict';

import superagentPromise from 'superagent-promise';
import _superagent from 'superagent';

const superagent = superagentPromise(_superagent, global.Promise);

const API_ROOT = 'https://conduit.productionready.io/api';

const responseBody = res => res.body;

let token = null;
const tokenPlugin = req => {
    if (token) {
        req.set('authorization', `Token ${token}`);
    }
}

const requests = {
    get: url =>
        superagent.get(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody),
    post: (url, body) =>
        superagent.post(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    put: (url, body) =>
        superagent.put(`${API_ROOT}${url}`, body).use(tokenPlugin).then(responseBody),
    del: url => {
        superagent.del(`${API_ROOT}${url}`).use(tokenPlugin).then(responseBody)
    }

};

const Articles = {
    all: page =>
        requests.get(`/articles?limit=10`),
    del: slug =>
        requests.del(`/articles/${slug}`),
    get: slug =>
        requests.get(`/articles/${slug}`),
    byAuthor: author=>
        requests.get(`/articles?author=${encodeURIComponent(author)}&limit=5`),
    favoritedBy: author =>
        requests.get(`/articles?favorited=${encodeURIComponent(author)}&limit=5`),
    feed: () =>
    requests.get(`/articles/feed?limit=10`)
}


const Auth = {
    current: () =>
        requests.get('/user'),
    login: (email, password) =>
        requests.post('/users/login', {user: {email, password}}),
    register: (username, email, password) =>
        requests.post('/users', {user: {username, email, password}}),
    save: user => {
        console.log('From agent.JS' + user);
        return (
            requests.put('/user', {user})
        )
    }

};

const Comments = {
    forArticle: slug =>
        requests.get(`/articles/${slug}/comments`),
    create: (slug, comment) =>
        requests.post(`/articles/${slug}/comments`, {comment}),
    delete: (slug, commentId) =>
        requests.del(`/articles/${slug}/comments/${commentId}`)
};

const Profile = {
    follow: username =>
        requests.post(`/profiles/${username}/follow`),
    get: username =>
        requests.get(`/profiles/${username}`),
    unfollow: username =>
        requests.del(`/profiles/${username}/follow`)

}


export default {
    Articles,
    Auth,
    Comments,
    Profile,
    setToken: _token => {
        token = _token;
    }
};