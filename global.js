// Code in this file will be loaded by all full pages.

loadPartial({
    partial: "/partials/_header.html",
    target: document.body,
    method: "prepend",
})





function loadPartial ({ partial, target = document.body, method = "append" }) {
    switch (method?.toLowerCase()) {
        // See https://developer.mozilla.org/en-US/docs/Web/API/Element/insertAdjacentHTML

        case "prepend":
        case "afterbegin":
            method = "afterbegin"
        break

        case "before":
        case "beforebegin":
            method = "beforebegin"

        case "after":
        case "afterend":
            method = "beforebegin"
    
        case "append":
        case "beforeend":
        default:
            method = "beforeend"
    }

    return fetch(partial)
        .then(data => data.text())
        .then(html => target.insertAdjacentHTML(method, html))
}