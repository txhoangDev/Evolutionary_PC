const url = "http://127.0.0.1:8000/api";

export interface detailProps {
  id: number;
}

export interface userProps {
  builds: Build[];
  onChange: (newBuildId: string) => void;
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

export const login = async (username: string, password: string) => {
  try {
    await fetch(url + "/auth/login/", {
      method: "POST",
      body: JSON.stringify({ username, password }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
    return "success";
  } catch (error) {
    console.log("unexpected error: ", error);
    throw new Error("Fail");
  }
};

export const register = async (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  try {
    await fetch(url + "/auth/registration/", {
      method: "POST",
      body: JSON.stringify({ username, email, password1, password2 }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return "success";
  } catch (error) {
    console.log("unexpected error: ", error);
    throw new Error("Fail");
  }
};

export const verifyEmail = async (key: string) => {
  try {
    await fetch(url + "/verify-email/" + key + "/", {
      method: "POST",
      body: JSON.stringify({ key }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include"
    });
    return "";
  } catch (error) {
    console.log("unexpected error: ", error);
    throw new Error("Fail");
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
    await fetch(url + "/logout/", {
      method: "POST",
      credentials: "include",
    });

    return;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
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