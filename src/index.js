const postForm = document.getElementById("post-form")
const postInput = document.getElementById("post-input")
const postList = document.getElementById("post-list")

postForm.addEventListener("submit", submitPost)

// fetch request
function submitPost(){
    event.preventDefault()

}

// render post to the dom
// tried moving line 10 thru line 25 from the function submitPost(), into function renderPost(), but the form stopped working
// going to keep the code in function renderPost(), hopefully there's a fix for it.

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