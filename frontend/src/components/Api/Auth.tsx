import axios from 'axios';

const url = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
// axios.defaults.xsrfCookieName = "csrftoken"
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN" 

export async function getUserBuilds() {
    try {
        const { data, status } = await axios.get(
            url+'/allBuilds/',
            {
                withCredentials: true,
            },
        );
        console.log(JSON.stringify(data));
        console.log('Response status is: ', status);
        return data;
    }
    catch (error) {
        if(axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error('Fail');
        } else {
            console.log('unexpected error: ', error);
            throw new Error('Fail');
        }
    }
}

export const login = async (username: string, password: string) => {
    try {
        const { data, status } = await axios.post(
            'http://127.0.0.1:8000/api/auth/login/',
            { "username": username, "password": password },
            {
                withCredentials: true
            },
        );
        return 'success';
    }
    catch (error) {
        if(axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error('Fail');
        } else {
            console.log('unexpected error: ', error);
            throw new Error('Fail');
        }
    }
}

export const register = async (username: string, email: string, password1: string, password2: string) => {
    try {
        const { data, status } = await axios.post(
            'http://127.0.0.1:8000/api/auth/registration/',
            { "username": username, "email": email, "password1": password1, "password2": password2 },
            {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                }
            }
        );
        console.log(JSON.stringify(data));
        console.log('Response status is: ', status);
        return 'success';
    }
    catch (error) {
        if(axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            throw new Error('Fail');
        } else {
            console.log('unexpected error: ', error);
            throw new Error('Fail');
        }
    }
}