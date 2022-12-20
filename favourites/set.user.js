// ==UserScript==
// @name         Set Favourites
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  catalog end of favourites script
// @author       9n25
// @match        https://www.roblox.com/catalog/*/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// @grant        none
// ==/UserScript==

const btn = (t, c, col) => {
    let el = document.createElement("a")
    el.className = "btn-control-md"
    el.style.backgroundColor = col
    el.innerHTML = t
    c.appendChild(el)
    return el;
}

const constructCookie = () => {
    const id = document.getElementById("item-container").getAttribute("data-item-id")
    const name = document.getElementById("item-container").getAttribute("data-item-name")
    let price = document.getElementById("item-container").getAttribute("data-expected-price")
    if(price == 0) {
        price = "Offsale"
    }

    const cookie = {id:id, name:name, price:price}
    return cookie;
}

window.addEventListener("load", () => {
    const container = document.createElement("div")
    container.style.margin = "1vh 0"
    document.querySelectorAll(".tooltip-container")[0].appendChild(container)

    //
    if(localStorage.getItem('favourites') == "") {
        localStorage.setItem('favourites', "[]")
    }

    const stored = JSON.parse(localStorage.getItem('favourites')) 
    let match = 0;
    for(i in stored) {
        if(stored[i].id == document.getElementById("item-container").getAttribute("data-item-id")) {
            match++
            const remove = btn("-", container, "#610D0C")
            remove.addEventListener("click", () => {
                let cookie = stored
                cookie.splice(stored[i], 1)
                localStorage.setItem('favourites', cookie)
                location.reload()
            })
        }
    }

    if(match == 0) {
        const add = btn("+", container, "#81B562")
        add.addEventListener("click", () => {
            let cookie = stored
            cookie.push(constructCookie())
            localStorage.setItem('favourites', JSON.stringify(cookie))
            location.reload()
        })
    }
})