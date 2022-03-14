// Code in this file will be loaded by all full pages.

loadPartial({
    partial: "/partials/header.partial",
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

    // GitHub.io namespaces sites under the project name
    // so we can't just default to root
    const pathBase = location.host.endsWith("github.io")
        ? "/" + location.pathname.split("/")[1]
        : ""

    return fetch(pathBase + partial)
        .then(data => data.text())
        .then(html => {
            console.log(html)
            target.insertAdjacentHTML(method, html)
        })
}