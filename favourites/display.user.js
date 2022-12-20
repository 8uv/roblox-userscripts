// ==UserScript==
// @name         Display Favourites
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  avi page end of favourites script
// @author       9n25
// @match        https://www.roblox.com/my/avatar
// @icon         https://www.google.com/s2/favicons?sz=64&domain=roblox.com
// @grant        none
// ==/UserScript==

window.addEventListener("load", () => {
    setTimeout(() => {
        let container = document.querySelector("#recent-items-container > div.items-list.avatar-item-list > ul").cloneNode(true)
        document.querySelector("#avatar-container > div > div > div.right-panel.six-column > div.tab-content.rbx-tab-content").prepend(container)
    
        const header = document.createElement("h2")
        header.innerHTML = "Favourites"
        container.prepend(header)

        const favCount = JSON.parse(localStorage.getItem("favourites")).length
        let toRemove = 0;
        for(i in container.children) {
            if(container.children[i].tagName == "LI") {
                toRemove++;
            }
        }
        toRemove = toRemove - favCount

        let els = []
        let c = 0
        for(i in container.children) {
            const el = container.children[i]
            if(el.tagName == "LI" && c < toRemove) {
                el.innerHTML = ""
                el.className = ""
                c++
            } else if(el.tagName == "LI") {
                els.push(el)
            }
        }

        const favourites = JSON.parse(localStorage.getItem("favourites"))
        for(i in els) {
            const img = els[i].children[0].children[0].children[0].children[0]
            const title = els[i].children[0].children[0].children[1].children[1]
            img.href = ""
            title.href = `https://www.roblox.com/catalog/${favourites[i].id}/item`
            title.children[0].innerHTML = favourites[i].name

            const price = document.createElement("h3")
            price.innerHTML = `R$ ${favourites[i].price}`
            price.style.color = "#81B562"
            title.appendChild(price)

            $.get(`https://thumbnails.roblox.com/v1/assets?assetIds=${favourites[i].id}&returnPolicy=0&size=150x150&format=Png&isCircular=false`).then(res => {
                img.children[0].children[0].children[0].src = res.data[0].imageUrl
            })

            img.addEventListener("click", () => {
                $.post(`https://avatar.roblox.com/v1/avatar/assets/${favourites[i].id}/wear`).then(() => {location.reload()})
            })
        }

    }, 1500)
})