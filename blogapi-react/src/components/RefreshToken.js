export const refreshToken = async () => {
  const URI = "http://localhost:8000/api/token/refresh/";
  console.log("refreshing token... ");

  const refreshToken = localStorage.getItem("refresh_token");
  //   console.log("refresh token: ", refreshToken);

  await fetch(URI, {
    headers: {
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ refresh: refreshToken }),
  })
    .then(async (response) => {
      const res = await response.json();
      //   console.log("Get new access token response: ", res);
      await localStorage.setItem("access_token", res.access);
    })
    .catch((error) => {
      console.log(error);
    });
};
