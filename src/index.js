const postForm = document.getElementById("post-form")
const postInput = document.getElementById("post-input")
const postList = document.getElementById("post-list")
const postURL = `http://localhost:3000/posts`

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

    renderPost()

}

// render post to the dom
function renderPost(){
    const li = document.createElement('li')
    
    const p = document.createElement('p')
    p.innerText = postInput.value
    
    const commentForm = document.createElement('form')
    commentForm.innerHTML += `<input type="text" id="comment-input"><input type="submit">`
    commentForm.addEventListener("submit", submitComment)
    
    const commentList = document.createElement('ul')
    
    li.append(p, commentForm, commentList)
    
    postList.appendChild(li)
    
    postForm.reset()
}

function submitComment(e){
    e.preventDefault()
    const commentInput = e.target.children[0].value
    const commentList= e.target.nextElementSibling

    const li = document.createElement('li')
    li.innerText = commentInput
    commentList.appendChild(li)

    e.target.reset()
}