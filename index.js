let btn = document.getElementById("buy-tickets");

btn.addEventListener("mouseenter", function(event) {
  let sound = document.getElementById("Sound");
  sound.play();
}, false);

function fun1(){
  let a = parseInt(document.getElementById("fir").value);
  let b = parseInt(document.getElementById("rif").value);
  const p = document.getElementById('out');
  if(document.getElementById('ritema').checked === true){
    let c = 10;
    let giv = c * a;
    let vig = (c * b) * 2;
    let res = giv + vig;
    p.innerHTML = 'Total €'+res;
  }
  if(document.getElementById('ritemb').checked === true){
    let c = 20;
    let giv = c * a;
    let vig = (c * b) * 2;
    let res = giv + vig;
    p.innerHTML = 'Total €'+res;
  }
  if(document.getElementById('ritemc').checked === true){
    let c = 30;
    let giv = c * a;
    let vig = (c * b) * 2;
    let res = giv + vig;
    p.innerHTML = 'Total €'+res;
  }

}

// Custom Video player

const progress = document.getElementById('volume-bar');
const progressVolume = document.querySelector('.progress');

progress.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
})

progressVolume.addEventListener('input', function () {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #710707 0%, #710707 ${value}%, #fff ${value}%, white 100%)`
})

// Burger-menu 

window.onload = function () {

  const menu_btn = document.querySelector('.hamburger')
  const mobile_menu = document.querySelector('.mobile-nav')
  const welcome_desc = document.querySelector('.welcome-description')
  const choice_link = document.querySelectorAll('.mobile-choice')

  menu_btn.addEventListener('click', function () {
    menu_btn.classList.toggle('is-active')
    mobile_menu.classList.toggle('is-active')
  })

  menu_btn.addEventListener('click', function () {
    welcome_desc.classList.toggle('empty')
  })

  choice_link.forEach(element => {
    element.addEventListener('click', function () {
      menu_btn.classList.toggle('is-active')
      mobile_menu.classList.toggle('is-active')
      welcome_desc.classList.toggle('empty')
    })
  })

  //Comparator in Explore section

  function comparatorSlider() {
    const comparator = document.querySelector('.comparator')
    const runnerComparator = document.querySelector('.comparator__runner')
    const overlayComparator = document.querySelector('.comparator__overlay')

    let runnerWidth = runnerComparator.getBoundingClientRect().width
    let comparatorLeft = comparator.getBoundingClientRect().x
    let comparatorWidth = comparator.getBoundingClientRect().width

    runnerComparator.addEventListener('mousedown', runnerClamped)

    runnerComparator.addEventListener('touchstart', runnerClamped)

    window.addEventListener('mouseup', () => {
      window.removeEventListener('mousemove', runnerMove)
    })

    window.addEventListener('touchend', () => {
      window.removeEventListener('touchmove', runnerMove)
    })

    window.addEventListener('resize', () => {
      comparatorLeft = comparator.getBoundingClientRect().left
      comparatorWidth = comparator.getBoundingClientRect().width
      runnerWidth = runnerComparator.getBoundingClientRect().width
      if (document.body.offsetWidth <= 420) {
        runnerWidth = 20
      }
    })

    function runnerClamped(e) {
      e.preventDefault()
      window.addEventListener('mousemove', runnerMove)
      window.addEventListener('touchmove', e => runnerMove(e, true))
    }

    function runnerMove(e, isTouchEvent) {
      let positionRunner

      if (isTouchEvent) {
        positionRunner = e.touches[0].clientX - comparatorLeft - (runnerWidth / 2)
      } else {
        positionRunner = e.pageX - comparatorLeft - (runnerWidth / 2)
      }

      if (positionRunner >= comparatorWidth - (runnerWidth / 2)) {
        overlayComparator.style.width = comparatorWidth - 2 + 'px'
        runnerComparator.style.left = comparatorWidth - (runnerWidth / 2) + 'px'
        return
      }
      if (positionRunner < 0 - (runnerWidth / 2)) {
        overlayComparator.style.width = 0 + 'px'
        runnerComparator.style.left = -(runnerWidth / 2) + 'px'
        return
      }
      runnerComparator.style.left = positionRunner + 'px'
      overlayComparator.style.width = positionRunner + (runnerWidth / 2) + 'px'
    }
  }

  comparatorSlider()

  //Video slider

  $('.video-jorney').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    arrows: true,
  })
  
  // Welcome slider 
  const sliderWelcome = document.querySelector('.slider')
  const currentActiveSlide = document.querySelector('.slider__number_current')
  const sliderControl = document.querySelector('.slider__control')

  const sliderImages = tns({
    container: '.slider__images',
    items: 1,
    speed: 500,
    mode: 'carousel',
    mouseDrag: true,
    gutter: 0,
    controlsContainer: '.slider__arrows',
    navContainer: '.slider__indicators'
  })

  sliderWelcome.addEventListener('mousemove', () => {
    setActiveSlide()
  })
  
  sliderWelcome.addEventListener('touchend', () => {
    setTimeout(() => {
      setActiveSlide()
    }, 200)
    
  })
  
  sliderControl.addEventListener('click', () => {
    setActiveSlide()
  })
  
  
  document.addEventListener('keydown', (e) => {
    if (e.code === 'ArrowLeft') {
      sliderImages.goTo('prev')
    }
    if (e.code === 'ArrowRight') {
      sliderImages.goTo('next')
    }
    setActiveSlide()
  })
  
  function setActiveSlide() {
    currentActiveSlide.innerText = `0${sliderImages.getInfo().displayIndex}`
  } 


}



//Scroll top button

const scrollBtn = document.querySelector('.isShowBtn')

window.onscroll = () => {
  if (window.scrollY > 6900) {
    scrollBtn.classList.add('_hide')
  } else if (window.scrollY < 6900) {
    scrollBtn.classList.remove('_hide')
  }

  $('.isShowBtn').click(function () {
    $(window).scrollTop(0)
  })

}

//Tickets booking-menu 

const buyTicketBtn = document.querySelector('#buy-tickets')
const modalBooking = document.querySelector('#modal-booking')
const closeBooking = document.querySelector('#booking-close')

buyTicketBtn.addEventListener('click', e => {
  e.preventDefault()
  if (e.target.id = 'buy-tickets') {
    modalBooking.classList.add('active-booking')
  }
})

modalBooking.addEventListener('transitionend', () => {
  const leftModal = modalBooking.offsetLeft
  if (leftModal === 0) {
    modalBooking.classList.add('active-background')
  }
})

modalBooking.addEventListener('click', e => {
  const isActive = e.target.parentElement.tagName === 'BODY'
  if (e.target.id === 'modal-booking' && isActive) {
    modalBooking.classList.remove('active-background')
    modalBooking.classList.remove('active-booking')
  }
})

closeBooking.addEventListener('click', e => {
  if (e.target.id = 'booking-close') {
    modalBooking.classList.remove('active-booking')
    modalBooking.classList.remove('active-background')
  }
})
// const signUp = e=>{
//   let formData = {
//     name: document.getElementById('name').value,
//     pas: document.getElementById('pas').value,
//     email: document.getElementById('email').value,
//   }
//   localStorage.setItem('formData',JSON.stringify(formData));
//   console.log(localStorage.getItem('formData'));
//   e.preventDefault();
//   let {name, ...rest} = JSON.parse(localStorage.getItem('formData'));
//   console.log(name);
// }
//
// let signupform = document.querySelector(".signupform")
// console.log(signupform)
// // signupform.addEventListener("submit", e => {
// //   signUp(e)
// // })
