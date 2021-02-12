const postForm = document.getElementById("post-form")
const postInput = document.getElementById("post-input")
const postList = document.getElementById("post-list")
const postURL = `http://localhost:3000/posts`
const commentURL = `http://localhost:3000/comments` // 2021-02-11 01 added this

postForm.addEventListener("submit", Post.submitPost)

Post.fetchPosts()