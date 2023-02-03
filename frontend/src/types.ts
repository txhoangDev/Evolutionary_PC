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

export type GetBuildResponse = {
    data: Build[],
};

export type CreateBuildResponse = {
    budget: number,
    cpu_brand: string,
    cpu_budget: number,
    gpu_brand: string,
    gpu_budget: number,
    ram_budget: number
};

export interface RegProps {
    children: [React.ReactNode, React.ReactNode];
}