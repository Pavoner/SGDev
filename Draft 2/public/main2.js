
window.addEventListener('load', init);

function init() {
    console.log('main2 init');
//Set event listener on Nav Bar Links -- Calls function to change CSS class to show "Active Link"
    let nav = document.querySelector('#nav');
    let menu = document.querySelector('#navMenu')

    nav.addEventListener('click', function (){changeActiveNavLink(event)});
    menu.addEventListener('click', showDropdown);
}

//This function sets all NavBar Link CSS classes to "", then sets the event target to "active" class
function changeActiveNavLink(event){
    //console.log('click event');
    //event.stopPropagation();
    let links = document.querySelectorAll('nav a');
    links.forEach(function (currentLink){
        currentLink.className="";
    });
    event.target.className="activeLink";
    }


function showDropdown (e){
    let dropdown = document.querySelector('.dropdown-content')
    let menu = document.querySelector('#navMenu')
    let menuContent = document.querySelector('#navMenuContent')
    e.stopPropagation();
    menu.classList.toggle('change')
    dropdown.classList.toggle('show');
    menuContent.classList.toggle('show');
    window.addEventListener('click', hideDropdown);
    menu.removeEventListener('click', showDropdown);
    menu.addEventListener('click', hideDropdown)
}

function hideDropdown(e) {
    let dropdown = document.querySelector('.dropdown-content')
    let menu = document.querySelector('#navMenu')
    let menuContent = document.querySelector('#navMenuContent')
        e.stopPropagation();
        dropdown.classList.toggle('show')
        menu.classList.toggle('change')
        menuContent.classList.toggle('show');
        window.removeEventListener('click', hideDropdown)
        menu.removeEventListener('click', hideDropdown);
        menu.addEventListener('click', showDropdown);
    }