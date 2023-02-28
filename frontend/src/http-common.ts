import axios from 'axios';

const url = 'http://127.0.0.1:8000/api';
axios.defaults.withCredentials = true;
axios.defaults.xsrfHeaderName = 'X-CSRFTOKEN';
axios.defaults.xsrfCookieName = 'csrftoken';

export interface detailProps {
    id: number;
}

export interface userProps {
    builds: Build[];
    onChange: (newBuildId: string) => void;
}

export interface Build {
    id: number,
    budget: number,
    cpu_brand: string,
    gpu_brand: string,
    gpu_budget: string,
    cpu_budget: string,
    ram_budget: string,
    cpu: string,
    gpu: string,
    ram: string,
};

type CreateBuildResponse = {
    budget: number,
    cpu_brand: string,
    cpu_budget: number,
    gpu_brand: string,
    gpu_budget: number,
    ram_budget: number
}

export const login = async (username: string, password: string) => {
    try {
        await axios.post(
            url + '/auth/login/',
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
        await axios.post(
            url + '/auth/registration/',
            { "username": username, "email": email, "password1": password1, "password2": password2 },
            {
                headers: {
                  "Content-Type": "application/json",
                  Accept: "application/json",
                }
            }
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

export const verifyEmail = async (key: string) => {
    try {
        await axios.post(
            url + '/verify-email/' + key + '/',
            { "key": key },
            {
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                }
            }
        );
        return '';
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

export async function getUserBuilds() {
    try {
        const { data, status } = await axios.get(
            url+'/allBuilds/',
            {
                withCredentials: true,
            },
        );
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

export async function createNewBuild(budget: number, cpu_brand: string, cpu_budget: number, gpu_brand: string, gpu_budget: number, ram_budget: number) {
    try {
        const { status } = await axios.post<CreateBuildResponse>(
            url+'/createBuild/',
            { budget: budget, cpu_brand: cpu_brand, cpu_budget: cpu_budget, gpu_brand: gpu_brand, gpu_budget: gpu_budget, ram_budget: ram_budget },
        );

        console.log('response status is: ', status);
        return;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}

export async function getBuild(id: number) {
    try {
        const { data, status } = await axios.get(
            `http://127.0.0.1:8000/api/build/${id}/`,
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        console.log('response status is: ', status);
        return data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.log('error message: ', error.message);
            return error.message;
        } else {
            console.log('unexpected error: ', error);
            return 'An unexpected error occurred';
        }
    }
}