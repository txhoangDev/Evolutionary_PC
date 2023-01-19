import axios from 'axios';

interface Build {
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

type GetBuildResponse = {
    data: Build[],
};

type CreateBuildResponse = {
    budget: number,
    cpu_brand: string,
    cpu_budget: number,
    gpu_brand: string,
    gpu_budget: number,
    ram_budget: number
}

// API call to get the build needed
export async function getAllBuild() {
    try{
        const { data, status } = await axios.get<GetBuildResponse>(
            'http://127.0.0.1:8000/api/allBuilds/',
            {
                headers: {
                    Accept: 'application/json',
                },
            },
        );

        console.log(JSON.stringify(data));
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

export async function createNewBuild(budget: number, cpu_brand: string, cpu_budget: number, gpu_brand: string, gpu_budget: number, ram_budget: number) {
    try {
        const { data, status } = await axios.post<CreateBuildResponse>(
            'http://127.0.0.1:8000/api/createBuild/',
            { budget: budget, cpu_brand: cpu_brand, cpu_budget: cpu_budget, gpu_brand: gpu_brand, gpu_budget: gpu_budget, ram_budget: ram_budget },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Accept: 'application/json',
                },
            },
        );

        console.log('response status is: ', status);
        console.log(JSON.stringify(data));

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
        console.log(JSON.stringify(data));

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