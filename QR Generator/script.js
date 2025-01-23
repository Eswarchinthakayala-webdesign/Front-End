const container=document.querySelector(".container")
const button=document.querySelector(".form button")
const input=document.querySelector(".form input")
const img=document.querySelector(".qr-code img")
button.addEventListener('click',()=>
{   
    let inputVal=input.value
    if(!inputVal) return
    console.log(inputVal)
    button.innerText="Generating QR Code....."
    img.src=` https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${inputVal}`
    img.addEventListener("load",()=>
    {
        container.classList.add("active")
         button.innerText="Generate QR Code"
    })
    
})

input.addEventListener('keyup',()=>
{
    if(!input.value)
    {
        container.classList.remove("active")
    }
})