console.log('main.js is connected!');

//variable declarations
const home = document.querySelector('#home');
const about = document.querySelector('#about');
const toDos = document.querySelector('#toDos');
let activate = null;
//functions



//local storage
const localStorageTab =()=> {
    if(localStorage.getItem('activeTab')){
       const now = localStorage.getItem('activeTab');
       document.getElementById(`${now}`).classList.add('active');
    }
    else{
        home.classList.add('active');
    }
}
//removes active class from all, adds it back to clicked target
const activeTab = (event)=>{
    console.log('heard click');
    console.log(event.target.id);
    let id = event.target.id;
    localStorage.setItem('activeTab', id);
}




// //event listeners
home.addEventListener('click', activeTab);
about.addEventListener('click', activeTab);
toDos.addEventListener('click', activeTab);
window.addEventListener('load', localStorageTab);