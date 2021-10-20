export async function handleDelete(postID) {
  const URI = "http://localhost:8000/api/post-delete/" + postID + "/";
  await fetch(URI, {
    headers: { "Content-Type": "application/json" },
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
