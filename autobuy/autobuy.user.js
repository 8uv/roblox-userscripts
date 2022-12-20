// ==UserScript==
// @name         Roblox Autobuy
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  this is so bad pleaseeee
// @author       9n25
// @match        https://www.roblox.com/catalog/0000000000000000/*
// @icon         https://qu.ax/WhTa.jpg
// @grant        none
// ==/UserScript==

// configs
// ADD YOUR ITEM ID TO THE MATCH TAG
const gameId = 9663052482 // add your 40% game id
const maxPrice = 9999; // add max item price to buy

try {

    const purchaseButton = await $(".btn-growth-lg")[0]
    console.log("captured purchase button!")

    if(purchaseButton.disabled == true) {
        location.reload()
    } else {
        const productId = purchaseButton.getAttribute('data-product-id')
        const expectedSellerId = purchaseButton.getAttribute('data-expected-seller-id')
        const expectedPrice = purchaseButton.getAttribute('data-expected-price')
        
        if(expectedPrice > maxPrice) {
            throw new Error("expected price exceeds max price")
        }

        $.post(`https://economy.roblox.com/v1/purchases/products/${productId}`, {
            expectedCurrency: 1,
            expectedPrice: expectedPrice,
            expectedSellerId: expectedSellerId,
            expectedPromoId: 0,
            saleLocationId: gameId,
            saleLocationType: "Game",
        }).then(() => {
            location.reload();
        })
    }
} catch (error) {
    console.error(error)
    location.reload()
}