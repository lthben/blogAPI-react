export async function handleDelete(postID) {
  const URI = "http://localhost:8000/api/post-delete/" + postID + "/";
  await fetch(URI, {
    headers: {
      "Authorization": "Bearer " + localStorage.getItem("access_token"), //Command K, S to save without auto-format
      "Content-Type": "application/json",
    },
    method: "DELETE",
  })
    .then(async (response) => {
      const res = await response.json();
      console.log("Response: ", res);
      alert("post deleted!");
    })
    .catch((error) => {
      console.log(error);
    });
}
