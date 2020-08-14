// Loading
window.addEventListener("load", function() {
    document.querySelector('.preloader').classList.add("opacity-0")
    setTimeout(function() {
        document.querySelector('.preloader').style.display = "none"
    }, 1000)
})

// Portfolio item filter
const filterContainer = document.querySelector(".portfolio-filter"),
  filterBtns = filterContainer.children,
  totalFilterBtn = filterBtns.length,
  portfolioItems = document.querySelectorAll(".portfolio-item"),
  totalPortfolioItem = portfolioItems.length;

for (let i = 0; i < totalFilterBtn; i++) {
  filterBtns[i].addEventListener("click", function () {
    filterContainer.querySelector(".active").classList.remove("active");
    this.classList.add("active");

    const filterValue = this.getAttribute("data-filter");
    for (let j = 0; j < totalPortfolioItem; j++) {
      if (filterValue === portfolioItems[j].getAttribute("data-category")) {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      } else {
        portfolioItems[j].classList.remove("show");
        portfolioItems[j].classList.add("hide");
      }

      if (filterValue === "all") {
        portfolioItems[j].classList.remove("hide");
        portfolioItems[j].classList.add("show");
      }
    }
  });
}


// Portfolio lightbox
const lightbox = document.querySelector('.lightbox'),
    lightboxClose = lightbox.querySelector('.lightbox-close'),
    lightboxImage = lightbox.querySelector('.lightbox-img'),
    lightboxText = lightbox.querySelector('.caption-text'),
    lightboxCounter = lightbox.querySelector('.caption-counter');

let itemIndex = 0

for (let i = 0; i < portfolioItems.length; i++) {
    portfolioItems[i].addEventListener("click", function() {
        itemIndex = i
        changeItem()
        toggleLightbox()
    })
}

function nextItem() {
    if (itemIndex === (totalPortfolioItem - 1)) {
        itemIndex = 0
    } else {
        itemIndex++
    }
    changeItem()
}

function prevItem() {
    if (itemIndex === 0) {
        itemIndex = totalPortfolioItem - 1
    } else {
        itemIndex--
    }
    changeItem()
}

function toggleLightbox() {
    lightbox.classList.toggle("open")
}

function changeItem() {
    imgSrc = portfolioItems[itemIndex].querySelector('.portfolio-img img').getAttribute("src")
    lightboxImage.src = imgSrc
    lightboxText.innerHTML = portfolioItems[itemIndex].querySelector('h4').innerHTML
    lightboxCounter.innerHTML = (itemIndex + 1) + " of " + totalPortfolioItem
}

lightbox.addEventListener("click", function() {
    if (event.target === lightboxClose || event.target === lightbox) {
        toggleLightbox()
    }
})

// Aside Nav
const nav = document.querySelector('.nav'),
    navLists = nav.querySelectorAll('li'),
    totalNavLists = navLists.length,
    allSections = document.querySelectorAll('.section'),
    totalSections = allSections.length;

for (let i = 0; i < totalNavLists; i++) {
    const a = navLists[i].querySelector('a')
    a.addEventListener("click", function() {
        // remove back-section class
        removeBackSectionClass()

        for (let j = 0; j < totalNavLists; j++) {
            if (navLists[j].querySelector('a').classList.contains("active")) {
                addBackSectionClass(j)
            }
            navLists[j].querySelector('a').classList.remove("active")
        }
        this.classList.add("active")
        showSection(this)

        if (window.innerWidth < 1200) {
            asideSectionToggle()
        }
    })
}

function addBackSectionClass(num) {
    allSections[num].classList.add("back-section")
}

function removeBackSectionClass() {
    for(let i = 0; i < totalSections; i++) {
        allSections[i].classList.remove("back-section")
    }
}

function showSection(element) {
    for (let i = 0; i < totalSections; i++) {
        allSections[i].classList.remove("active")
    }
    const target = element.getAttribute("href").split("#")[1]
    document.querySelector("#" + target).classList.add("active")
}

// Hire me button
document.querySelector('.hire-me').addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index")
    showSection(this)
    updateNav(this)
    removeBackSectionClass()
    addBackSectionClass(sectionIndex)
})

function updateNav(element) {
    for (let i = 0; i < totalNavLists; i++) {
        navLists[i].querySelector("a").classList.remove("active")
        const target = element.getAttribute("href").split("#")[1]
        if (target === navLists[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navLists[i].querySelector("a").classList.add("active")
        }
    }
}

// Nav toggler
const navTogglerBtn = document.querySelector('.nav-toggler'),
    aside = document.querySelector('.aside');

navTogglerBtn.addEventListener("click", asideSectionToggle)

function asideSectionToggle() {
    aside.classList.toggle("open")
    navTogglerBtn.classList.toggle("open")
    for (let i = 0; i < totalSections; i++) {
        allSections[i].classList.toggle("open")
    }
}