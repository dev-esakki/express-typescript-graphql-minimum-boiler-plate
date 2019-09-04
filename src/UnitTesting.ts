import axios from 'axios'

export const functions = {
    add : (num1, num2) => num1 + num2,
    isNull: () => null,
    checkValue: (x) => x,
    createUser: () => {
        const user = {}
        user['firstName'] = 'js'
        user['lastName'] = 'jest'
        return user
    },
    fetchUser: () => {
        return axios
        .get('https://jsonplaceholder.typicode.com/users/1')
        .then(res => res.data)
        .catch(err => 'error')
    },
    fetchUserArray: () => {
        return axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(res => res.data)
        .catch(err => 'error')
    },
    reverseString: (str) => {
        return str
            .split('')
            .reverse()
            .join('');
    } 
}
