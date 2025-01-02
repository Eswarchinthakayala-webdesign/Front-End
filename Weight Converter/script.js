
document.getElementById('output').style.display='none';
document.getElementById('number').addEventListener('input',(e)=>
{ document.getElementById('output').style.display='';
  let weight=e.target.value;
  document.getElementById('gramsOutput').innerHTML=weight/0.0022046;
  document.getElementById('kgOutput').innerHTML=weight/2.2046;
  document.getElementById('ounOutput').innerHTML=weight*16;

})