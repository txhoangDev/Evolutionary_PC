import { Build } from "./types";

const url = "http://127.0.0.1:8000/auth";

export const getUser = async () => {
  try {
    const res = await fetch(url + "/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    })
      .then((response) => {
        if (response.ok) {
          return true;
        } else {
          return false;
        }
      });
    return res;
  } catch (error) {
    console.log("unexpected error: ", error);
    return false;
  }
};

export const getUserInfo = async () => {
  try {
    const data = await fetch(url + "/user/", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include"
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
};

export const login = async (username: string, password: string, remember: boolean) => {
  try {
    const status = await fetch(url + "/login/", {
      method: "POST",
      body: JSON.stringify({ username, password, remember }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        return "success";
      } else {
        return "error";
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "error";
  }
};

export const register = async (
  username: string,
  email: string,
  password1: string,
  password2: string
) => {
  try {
    const status = await fetch(url + "/registration/", {
      method: "POST",
      body: JSON.stringify({ username, email, password1, password2 }),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        return "success";
      } else {
        return "error";
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "error";
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
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        return "success";
      } else {
        return "error";
      }
    });
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "error";
  }
};

export async function getUserBuilds() {
  try {
    const data = await fetch(url + "/all-builds/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        return data;
      });
    return data as Build[];
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
    const result = await fetch(url + "/get-token/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        fetch(url + "/create-build/", {
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
            "content-type": "application/json",
            Accept: "application/json",
            "x-csrftoken": data["message"],
          },
        }).then((response) => {
          if (response.ok) {
            return "Success";
          } else {
            return "Error";
          }
        })
      );
    return result;
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
      }).catch((error) => { return 'Error' });
    return data;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "An unexpected error occurred";
  }
}

export async function logout() {
  try {
    const status = await fetch(url + "/get-token/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        fetch(url + "/logout/", {
          method: "POST",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "x-csrftoken": data["message"],
          },
        }).then((response) => {
          if (response.ok) {
            return "Success";
          } else {
            return "Error";
          }
        })
      );
    return status;
  } catch (error) {
    console.log("unexpected error: ", error);
    return "Error";
  }
}

export async function deleteBuild(id: string) {
  try {
    const res = await fetch(url + "/get-token/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) =>
        fetch(url + "/build/" + id + "/", {
          method: "DELETE",
          credentials: "include",
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "x-csrftoken": data["message"],
          },
        }).then((response) => {
          if (!response.ok) {
            return 'Error';
          } else {
            return 'Success'
          }
        })
      );
    return res;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function resetPassword(email: string) {
  try {
    const res = await fetch(url + "/password/reset/", {
      method: "POST",
      body: JSON.stringify({ email }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return 'Success';
        } else {
          return 'error';
        }
      });
    return res;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function changeResetPassword(
  uid: string,
  token: string,
  new_password1: string,
  new_password2: string
) {
  try {
    const res = await fetch(url + "/password/reset/confirm/", {
      method: "POST",
      body: JSON.stringify({ uid, token, new_password1, new_password2 }),
      headers: {
        "content-type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return 'Success';
        } else {
          return 'Error';
        }
      });
    return res;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function putUsername(username: string) {
  try {
    const res = await fetch(url + "/get-token/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => fetch(url + "/user/", {
          method: "PUT",
          body: JSON.stringify({ username }),
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "x-csrftoken": data["message"],
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              return 'Success';
            } else {
              return 'Error';
            }
          })
      );
    return res;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function changePassword(
  old_password: string,
  new_password1: string,
  new_password2: string
) {
  try {
    const result = await fetch(url + "/get-token/", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => 
        fetch(url + "/password/change/", {
          method: "POST",
          body: JSON.stringify({ new_password1, new_password2, old_password }),
          headers: {
            "content-type": "application/json",
            Accept: "application/json",
            "x-csrftoken": data["message"],
          },
          credentials: "include",
        })
          .then((response) => {
            if (response.ok) {
              return 'success';
            } else {
              return 'old_password';
            }
          })
      );
    return result;
  } catch (error) {
    console.log(error);
    return "Error";
  }
}

export async function getPrices() {
  try {
    const result = await fetch(url + '/components/', {
      method: 'GET',
    }).then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return 'Error';
      }
    });
    return result;
  } catch (error) {
    console.log(error);
    return 'Error';
  }
}