import { refreshToken } from "./RefreshToken";

export const handleDelete = async (postID) => {
  const URI = "http://localhost:8000/api/post-delete/" + postID + "/";
  await fetch(URI, {
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("access_token"),
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then(async (response) => {
      const res = await response.json();
      console.log("Response: ", res);
      if (res.code === "token_not_valid") {
        refreshToken();
        handleDelete(postID);
      } else {
        // alert("post deleted!");
        console.log("post deleted");
      }
    })
    .catch((error) => {
      console.log(error);
    });
};
