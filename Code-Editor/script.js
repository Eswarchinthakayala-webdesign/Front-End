const html=document.querySelector("#html")
const css=document.querySelector("#css")
const js=document.querySelector("#js")
const output=document.querySelector("#output")


function run()
{
    localStorage.setItem('html',html.value)
    localStorage.setItem('css',css.value)
    localStorage.setItem('js',js.value)
    output.contentDocument.body.innerHTML=`<style>${localStorage.css}</style>`+localStorage.html;
    output.contentWindow.eval(localStorage.js);
}
html.addEventListener('keyup',()=>run())
css.addEventListener('keyup',()=>run())
js.addEventListener('keyup',()=>run())

html.value=localStorage.html
css.value=localStorage.css
js.value=localStorage.js