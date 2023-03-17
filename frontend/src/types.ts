export type State = {
  logoutButton: JSX.Element;
  loginButton: JSX.Element;
  signupButton: JSX.Element;
  menu: JSX.Element;
  anchorElNav: HTMLElement | null;
};

export type Action =
  | { type: "SET_LOGOUT_BUTTON"; payload: JSX.Element }
  | { type: "SET_LOGIN_BUTTON"; payload: JSX.Element }
  | { type: "SET_SIGNUP_BUTTON"; payload: JSX.Element }
  | { type: "SET_MENU"; payload: JSX.Element }
  | { type: "SET_ANCHORELNAV"; payload: HTMLElement | null }
  | { type: "RESET_STATE" };

export interface detailProps {
  id: number;
}

export interface drawerProps {
  onChange: (newBuildId: string) => void;
}

export interface buildProps {
  builds: Build[];
  onChange: (newBuildId: string) => void;
}

export interface buildStepper {
  handleBuild: () => void;
  validateInput: () => boolean;
  steps: string[];
  content: JSX.Element[];
}

export interface Build {
  id: number;
  budget: number;
  cpu_brand: string;
  gpu_brand: string;
  gpu_budget: number;
  cpu_budget: number;
  ram_budget: number;
  cpu_id: number;
  gpu_id: number;
  ram_id: number;
}

export type GetBuildResponse = {
  data: Build[];
};

export type CreateBuildResponse = {
  budget: number;
  cpu_brand: string;
  cpu_budget: number;
  gpu_brand: string;
  gpu_budget: number;
  ram_budget: number;
};

export interface RegProps {
  children: [React.ReactNode, React.ReactNode];
}
