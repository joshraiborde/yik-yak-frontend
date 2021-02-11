const postForm = document.getElementById("post-form")
const postInput = document.getElementById("post-input")
const postList = document.getElementById("post-list")
const postURL = `http://localhost:3000/posts`
const commentURL = `http://localhost:3000/comments` // 2021-02-11 01 added this

// 2021-02-11 01 added this block
function fetchPosts(){
    fetch(postURL)
    .then(res => res.json())
    .then(posts => posts.forEach(post => renderPost(post.content)))
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

    renderPost(postInput.value)

}

// render post to the dom
function renderPost(post){ // 2021-02-11 01  added a post argument
    const li = document.createElement('li')
    
    const p = document.createElement('p')
    p.innerText = post // 2021-02-11 01 changed this to post
    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" id="comment-input"><input type="submit">`
    commentForm.addEventListener("submit", renderComment) // 2021-02-11 01 changed to renderComment
    
    const commentList = document.createElement('ul')
    
    li.append(p, commentForm, commentList)
    
    postList.appendChild(li)
    
    postForm.reset()
}

function renderComment(e){ // 2021-02-11 01 changed this 
    e.preventDefault()
    const commentInput = e.target.children[0].value
    const commentList= e.target.nextElementSibling

    const li = document.createElement('li')
    li.innerText = commentInput
    commentList.appendChild(li)

    submitComment(commentInput)

    e.target.reset()
}

function submitComment(comment){ // 2021-02-11 01 added block
    fetch(commentURL, {
        method: "POST",
        headers: {
            "Content-type": "application/json", 
            "Accept": "application/json"
        }, 
        body: JSON.stringify({
            content: comment
        })
         
    })
}

fetchPosts() // 2021-02-11 01 added