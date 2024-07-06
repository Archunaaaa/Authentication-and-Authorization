import axios from "axios";

export const signupUser = (userData) => {
  return axios.post("http://localhost:8080/api/auth/user/register", userData);
};

export const loginUser = (credentials) => {
  return axios.post("http://localhost:8080/api/auth/user/login", credentials);
};

export const fetching = async (payload, token) => {
  const response = await axios.get(
    `http://localhost:8080/api/user/getUser/${payload}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
export const fetchAdminn = async (payload, token) => {
  const response = await axios.get(
    `http://localhost:8080/api/admin/getAllusers/${payload}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response;
};
export const deleteUser = async (useremail, token) => {
  const response = await axios.delete(
    `http://localhost:8080/api/user/deleteUser/${useremail}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  console.log(response);
  return response;
};