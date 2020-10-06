const authToken = () => {
  return localStorage.getItem("token");
};

export default authToken;
