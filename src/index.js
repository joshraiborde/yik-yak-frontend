const postForm = document.getElementById("post-form")
const postInput = document.getElementById("post-input")
const postList = document.getElementById("post-list")
const postURL = `http://localhost:3000/posts`
const commentURL = `http://localhost:3000/comments` // 2021-02-11 01 added this

// 2021-02-11 01 added this block
function fetchPosts(){
    fetch(postURL)
    .then(res => res.json())
    .then(posts => posts.forEach(data => renderPost(data.data)))
}

postForm.addEventListener("submit", submitPost)

// fetch request
function submitPost(){
    event.preventDefault()
    const configObj = {
        method: "POST", 
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            content: postInput.value
        })
    }
    fetch(postURL, configObj)
    .then(res => res.json())
    .then(data => renderPost(data.data))

}

// render post to the dom
function renderPost(post){ // 2021-02-11 01  added a post argument
    console.log(post)
    const li = document.createElement('li')
    li.dataset.id = post.id

    
    const p = document.createElement('p')
    p.innerText = post.attributes.content // 2021-02-11 01 changed this to post
    
    const deleteBtn = document.createElement("button")
    deleteBtn.innerText = "delete"
    deleteBtn.addEventListener("click", deletePost)
    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" id="comment-input"><input type="submit">`
    commentForm.addEventListener("submit", renderComment) // 2021-02-11 01 changed to renderComment
    
    const commentList = document.createElement('ul')
    post.attributes.comments.forEach(comment => {
        const commentLi = document.createElement('li')
        commentLi.innerText = comment.content
        commentList.appendChild(commentLi)
    })
    
    li.append(p, deleteBtn, commentForm, commentList)
    
    postList.appendChild(li)
    
    postForm.reset()
}

function deletePost(e){
    const postId = e.target.parentElement.dataset.id

    fetch(`${postURL}/${postId}`, {
        method: "DELETE"

    })

    e.target.parentElement.remove()
}

function renderComment(e){ // 2021-02-11 01 changed this 
    e.preventDefault()
    
    const commentInput = e.target.children[0].value
    const commentList= e.target.nextElementSibling
    const postId = e.target.parentElement.dataset.id
    console.log(e.target.parentElement)

    const li = document.createElement('li')
    li.dataset.id = postId
    li.innerText = commentInput
    commentList.appendChild(li)

    submitComment(commentInput, postId)

    e.target.reset()
}

function submitComment(comment, postId){ // 2021-02-11 01 added block
    fetch(commentURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            content: comment,
            post_id: postId
        })
         
    })
}

fetchPosts() // 2021-02-11 01 added