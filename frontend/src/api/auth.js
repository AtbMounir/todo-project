import axios from "axios";

export async function signIn(email, password) {
  try {
    const params = {
      email: email,
      password: password,
    };

    let current_user, current_error;
    await axios
      .post("http://localhost:8000/api/login", params, {
        withCredentials: true,
      })
      .then((response) => (current_user = response.data))
      .catch((error) => (current_error = error));

    if (current_error != null) {
      throw new Error(current_error);
    }

    return {
      isOk: true,
      data: current_user,
    };
  } catch {
    return {
      isOk: false,
      message: "Authentication failed",
    };
  }
}

export async function getUser() {
  try {
    let current_user, current_error;
    await axios
      .get("http://localhost:8000/api/user", { withCredentials: true })
      .then((response) => (current_user = response.data))
      .catch((error) => (current_error = error));

    if (current_error != null) {
      throw new Error(current_error);
    }

    return {
      isOk: true,
      data: current_user,
    };
  } catch {
    return {
      isOk: false,
    };
  }
}

export async function createAccount(username, email, password) {
  try {
    const params = {
      username: username,
      email: email,
      password: password,
    };

    let current_error;
    await axios
      .post("http://localhost:8000/api/register", params, {
        withCredentials: true,
      })
      .then((response) => response)
      .catch((error) => (current_error = error));

    if (current_error != null) {
      throw new Error(current_error);
    }

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to create account",
    };
  }
}

export async function changePassword(email, recoveryCode) {
  try {
    // Send request
    console.log(email, recoveryCode);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to change password",
    };
  }
}

export async function resetPassword(email) {
  try {
    // Send request
    console.log(email);

    return {
      isOk: true,
    };
  } catch {
    return {
      isOk: false,
      message: "Failed to reset password",
    };
  }
}
