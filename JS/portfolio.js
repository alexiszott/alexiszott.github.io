document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.slider');

    //Controles
    const leftArrow = document.querySelector('.left');
    const rightArrow = document.querySelector('.right');
    const downArrow = document.querySelector('.down');
    const upArrow = document.querySelector('.up');

    const nextArrow = document.querySelector('.next');
    const prevArrow = document.querySelector('.prev');

    const downArrowMenu = document.querySelector('#arrowExpandMenu');
    const upArrowMenu = document.querySelector('#arrowReduceMenu');
    const menu = document.querySelector('#menu');
    const head = document.querySelector('header');
    const HEADER_ORIGIN_HEIGHT = 300;

    //1st Carousel
    const carousel = document.querySelector('.carousel');
    const projectSections  = document.querySelectorAll('.section');

    //2nd Carousel
    const imgCont = document.querySelector('.img_container');
    var indexImg = 0;
    var sectionIndex = 0;
    let tabURL = [
        ["img/monster_pres.png","img/monster_1.png", "img/monster_2.png", "img/monster_3.png"],
        ["img/blender_pres.png", "img/blender_greenhouse.png", "img/blender_meteor.png", "img/blender_neocity.png","img/blender_chillLake.png"],
        ["img/unity_pres.png"],
        ["img/school_djikstra_1.png","img/school_djikstra_2.png","img/school_card_1.png"]
    ];

    //Images
    const modal = document.querySelector('.modal');
    const modalImage = document.querySelector('#modalImage');
    const closeButton = document.querySelector('.close-button');

    const PROJET_ORIGIN_HEIGHT = 800;
    const CAROUSEL_ORIGIN_HEIGHT = 550;

    const topPage = document.querySelector('#topPageArrow');

    var NUMBER_OF_PROJECTS = 3; //Nombre de projets -1
    let expended = Boolean(false);
    let expendedMenu = Boolean(false);

    //Carousel Principale
    function scrollLeft() {
        indexImg = 0;
        sectionIndex = (sectionIndex > 0) ? sectionIndex - 1 : 0;
        slider.style.transform = 'translate(' + (sectionIndex * -25) + '%)';

        if(sectionIndex === 0){
            leftArrow.style.color = "rgba(95,95,95,0.25)";
        } else{
            leftArrow.style.color = "#F0F2A6";
            rightArrow.style.color = "#F0F2A6";

        }

        //Mise à jour du projet selectionné
        const activeDesc = document.querySelector('.carousel .section.active');
        const prevElement = activeDesc.previousElementSibling;
        if(activeDesc && prevElement.classList.contains('section')){
            activeDesc.classList.remove('active');
            activeDesc.previousElementSibling.classList.add('active');

            //Réduire la description si elle est étendu
            expandLess();
        }
    }
    function scrollRight() {
        indexImg = 0;
        sectionIndex = (sectionIndex < NUMBER_OF_PROJECTS) ? sectionIndex + 1 : NUMBER_OF_PROJECTS;
        slider.style.transform = 'translate(' + (sectionIndex * -25) + '%)';
        if(sectionIndex === 3){
            rightArrow.style.color = "rgba(95,95,95,0.25)";
        } else{
            leftArrow.style.color = "#F0F2A6";
            rightArrow.style.color = "#F0F2A6";
        }
        //Mise à jour du projet selectionné
        const activeDesc = document.querySelector('.carousel .section.active');
        const nextElement = activeDesc.nextElementSibling;

        if(activeDesc && nextElement.classList.contains('section')){
            activeDesc.classList.remove('active');
            activeDesc.nextElementSibling.classList.add('active');
            //Réduire la description si elle est étendu
            expandLess();
        }
    }
    function expandMore() {
        if(!expended){

            //Height change
            const txt = document.querySelector('.section.active p');
            projects.style.height = (PROJET_ORIGIN_HEIGHT + txt.scrollHeight) + 'px';
            carousel.style.height = (CAROUSEL_ORIGIN_HEIGHT + txt.scrollHeight) + 'px';

            //Buttons
            downArrow.disabled = true;
            downArrow.style.display = "none";
            upArrow.disabled = false;
            upArrow.style.display = "block";
            expended = true;
        }
    }
    function expandLess() {
        if(expended){
            //Height change
            projects.style.height = PROJET_ORIGIN_HEIGHT + 'px';
            carousel.style.height = CAROUSEL_ORIGIN_HEIGHT + 'px';

            //Buttons
            downArrow.disabled = false;
            downArrow.style.display = "block";
            upArrow.disabled = true;
            upArrow.style.display = "none";

            expended = false;
        }
    }

    //Menu
    function expandMenu() {
        if(!expendedMenu){
            //Height change
            const buttons = document.querySelectorAll('#menu a');
            head.style.height = (HEADER_ORIGIN_HEIGHT + 700) + 'px';
            menu.style.display = "flex";

            let index = 0;
            const interval = setInterval(() => {
                if (index < buttons.length) {
                    buttons[index].style.transform = "scale(1)";
                    index++;
                } else {
                    clearInterval(interval);
                }
            }, 50);

            //Buttons
            downArrowMenu.disabled = true;
            downArrowMenu.style.display = "none";
            upArrowMenu.disabled = false;
            upArrowMenu.style.display = "block";
            expendedMenu = true;
        }
    }

    function retractMenu() {
        if(expendedMenu){
            //Height change
            const buttons = document.querySelectorAll('#menu a');
            let index = buttons.length - 1;
            const interval = setInterval(() => {
                if (index >= 0) {
                    buttons[index].style.transform = "scale(0)";
                    index--;
                } else {
                    clearInterval(interval);


                    //Buttons
                    downArrowMenu.disabled = false;
                    downArrowMenu.style.display = "block";
                    upArrowMenu.disabled = true;
                    upArrowMenu.style.display = "none";
                    expendedMenu = false;

                    setTimeout(() => {
                        head.style.height = HEADER_ORIGIN_HEIGHT + 'px';
                        menu.style.display = "none";
                    }, 200); // Ajustez le délai en conséquence
                }
            }, 50);
        }
    }
    //Modale
    function openModal(imgURL){
        modal.style.display = "block";
        modalImage.src = imgURL;
    }

    function closeModal() {
        modal.style.display = 'none';
        modalImage.src = '';
    }

    const images = document.querySelectorAll('.section img');
    images.forEach(function (image) {
        image.addEventListener('click', function () {
            const imageUrl = image.src;
            openModal(imageUrl);
        });
    });

    //Carousel secondaire
    function nextImage() {
        const imageSelected = document.querySelector('.section.active img');
        if(indexImg + 1 > tabURL[sectionIndex].length - 1){
            indexImg = 0;
            imageSelected.src = tabURL[sectionIndex][indexImg];
        } else {
            indexImg = indexImg + 1;
            imageSelected.src = tabURL[sectionIndex][indexImg];
        }
    }

    function prevImage() {
        const imageSelected = document.querySelector('.section.active img');
        if(indexImg - 1 < 0){
            indexImg = tabURL[sectionIndex].length - 1;
            imageSelected.src = tabURL[sectionIndex][indexImg];
        } else {
            indexImg = indexImg - 1;
            imageSelected.src = tabURL[sectionIndex][indexImg];
        }
    }

    //Listener
    topPage.addEventListener('click', function (){
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        })
    });
    downArrowMenu.addEventListener('click', expandMenu);
    upArrowMenu.addEventListener('click', retractMenu);
    window.addEventListener('click', function (event) {
        if(event.target === modal){
            closeModal();
        }
    });
    nextArrow.addEventListener('click', nextImage);
    prevArrow.addEventListener('click', prevImage);
    closeButton.addEventListener('click', closeModal);
    leftArrow.addEventListener('click', scrollLeft);
    rightArrow.addEventListener('click', scrollRight);
    downArrow.addEventListener('click', expandMore);
    upArrow.addEventListener('click', expandLess);
});


