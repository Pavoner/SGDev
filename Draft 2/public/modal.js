window.addEventListener('load', init)

function init() {
    var modal = document.querySelector(".modal");
    var trigger = document.querySelector(".trigger");
    var pitModal = document.querySelector("#pitModal");
    var pitTrigger = document.querySelector("#pitTrigger");
    var closeButton = document.querySelector("#modalCloseButton");
    var pitCloseButton = document.querySelector("#pitModalCloseButton");
    var mainMap = document.querySelector("#map");
    var mapModalOuter = document.querySelector("#mapModalOuter")
    var mapModalCloseButton = document.querySelector("#mapModalCloseButton")
    var useMapButton = document.querySelector("#useMap")

    function toggleModal(e) {
        modal.classList.toggle("show-modal");
        mainMap.classList.toggle("background");
    }

    function togglePitModal(e) {
        pitModal.classList.toggle("show-modal");
        mainMap.classList.toggle("background")
    }

    function toggleMapModal(e) {
        mapModalOuter.classList.toggle("show-modal");
        pitModal.classList.toggle("background");
    }

    function windowOnClick(event) {
        if (event.target === modal) {
            toggleModal();
        } 

        if (event.target === pitModal){
            togglePitModal();
        }

        if (event.target === mapModalOuter)
            toggleMapModal();
    }

    trigger.addEventListener("click", toggleModal);
    if (pitTrigger){pitTrigger.addEventListener("click", togglePitModal);}
    closeButton.addEventListener("click", toggleModal);
    if (pitCloseButton){pitCloseButton.addEventListener("click", togglePitModal);}
    if (useMapButton){useMapButton.addEventListener("click", toggleMapModal);}
    if (mapModalCloseButton) {mapModalCloseButton.addEventListener("click", toggleMapModal);}
    window.addEventListener("click", windowOnClick);
}