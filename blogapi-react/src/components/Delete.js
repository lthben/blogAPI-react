import { refreshToken } from "./RefreshToken";

export const handleDelete = async (postID) => {
  const URI = "http://localhost:8000/api/post-delete/" + postID + "/";
  await fetch(URI, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access_token"), //Command K, S to save without auto-format
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then(async (response) => {
      const res = await response.json();
      console.log("Response: ", res);
      if (res.code === "token_not_valid") {
        refreshToken();
        await handleDelete(postID);
      } else {
        alert("post deleted!");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
