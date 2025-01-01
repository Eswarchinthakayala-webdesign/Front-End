let filterInput=document.getElementById("filterInput")
filterInput.addEventListener('keyup',(e)=>
{ 

    let inputValue=filterInput.value.toUpperCase()
   let ul=document.getElementById('names')
   let li=ul.querySelectorAll('li.collection-item');
   
   for(let i=0;i<li.length;i++)
   {
        let a=li[i].getElementsByTagName('a')[0];
        console.log(a)
        if(a.innerHTML.toUpperCase().indexOf(inputValue)>-1)
        {
            li[i].style.display=''
        }
        else
        {
             li[i].style.display='none'
        }

   }

    
})