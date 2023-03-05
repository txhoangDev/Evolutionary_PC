const url = "http://127.0.0.1:8000/api";

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
| { type: "SET_ANCHORELNAV"; payload: HTMLElement | null}
| { type: "RESET_STATE" };

export interface detailProps {
  id: number;
}

export interface userProps {
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
  gpu_budget: string;
  cpu_budget: string;
  ram_budget: string;
  cpu: string;
  gpu: string;
  ram: string;
}

export const getUser = async () => {
  try {
    const data = await fetch(url + "/auth/user/me/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => response.json()).then((data) => {return data});
    return data;
  } catch (error) {
    console.log("unexpected error: ", error);
    throw new Error("Fail");
  }
}

export const login = async (username: string, password: string) => {
  try {
    const status = await fetch(url + "/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.status === 200) {
        return 'success';
      } else {
        return 'error';
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return 'error';
  }
};

export const register = async (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  try {
    const status = await fetch(url + "/auth/registration/", {
      method: "POST",
      body: JSON.stringify({ username, email, password1, password2 }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.status === 201) {
        return 'success';
      } else {
        return 'error';
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return 'error';
  }
};

export const verifyEmail = async (key: string) => {
  try {
    const status = await fetch(url + "/verify-email/" + key + "/", {
      method: "POST",
      body: JSON.stringify({ key }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include"
    }).then((response) => {
      if (response.status === 200) {
        return 'success';
      } else {
        return 'error';
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return 'error';
  }
};

export async function getUserBuilds() {
  try {
    const data = await fetch(url + "/allBuilds/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return data;
  } catch (error) {
    console.log("unexpected error: ", error);
    throw new Error("Fail");
  }
}

export async function createNewBuild(
  budget: number,
  cpu_brand: string,
  cpu_budget: number,
  gpu_brand: string,
  gpu_budget: number,
  ram_budget: number
) {
  try {
      await fetch(url + "/getToken/", {
        method: "GET",
        credentials: "include",
      }).then((response) => response.json()).then((data) => 
      fetch(url + "/createBuild/", {
        method: "POST",
        body: JSON.stringify({
          budget,
          cpu_brand,
          cpu_budget,
          gpu_brand,
          gpu_budget,
          ram_budget,
        }),
        credentials: "include",
        headers: {
          'content-type': 'application/json',
          Accept: 'application/json',
          'x-csrftoken': data['message']
        }
      }));
    return 'Success';
  } catch (error) {
    console.log(error);
    return "An unexpected error occurred";
  }
}

export async function getBuild(id: number) {
  try {
    const data = await fetch(url + "/build/" + id + "/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return data;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
}

export async function logout() {
  try {
    const status = await fetch(url + "/getToken/", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json()).then((data) => 
    fetch(url + "/auth/logout/", {
      method: "POST",
      credentials: "include",
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        'x-csrftoken': data['message']
      }
    }).then((response) => {
      if (response.status === 200) {
        return 'Success';
      } else {
        return 'Error';
      }
    }));
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "Error";
  }
}

export async function deleteBuild(id: string) {
  try {
    await fetch(url + "/getToken/", {
      method: "GET",
      credentials: "include",
    }).then((response) => response.json()).then((data) => 
    fetch(url + "/build/" + id + '/', {
      method: "DELETE",
      credentials: "include",
      headers: {
        'content-type': 'application/json',
        Accept: 'application/json',
        'x-csrftoken': data['message']
      }
    }));
    return 'Success';
  } catch(error) {
    console.log(error);
    return 'Error';
  }
}