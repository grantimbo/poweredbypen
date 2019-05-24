/* -------------------------------
Author : Grant Imbo (grantimbo.com)
Version : 1.1.3
Description : A custom js for Powered by Pen.
------------------------------- */

let siteData = null,
	portfolioData = null,
	singleArtworkData = null,

	htmlBody = document.querySelector('html'),
	menuBtn = document.querySelector('.menu-button'),
	menuBtnCls = document.querySelector('.menu-button-close'),
	menuWrap = document.querySelector('.mobile-menu'),

	defaultTitle = document.title,
	defaultLink = location.pathname,

	sidebar = document.querySelector('.sidebar'),
	loadingDiv = document.querySelector('.loading'),
	loadingFolioDiv = document.querySelector('.portfolio-loading'),

	homeWrap = document.querySelector('section.home-wrap'),
	homeSlide = document.querySelector('.slides'),

	portfolioWrap = document.querySelector('section.portfolio-wrap'),
	portfolioContent = document.querySelector('.portfolio-content'),

	aboutWrap = document.querySelector('section.about-wrap'),
	aboutContent = document.querySelector('.about-content'),

	contactWrap = document.querySelector('section.contact-wrap'),
	contactContent = document.querySelector('.contact-content'),

	imgModalWrap = document.querySelector('#imgModal'),

	modal = document.querySelector('#modal'),



	homeCheck = document.querySelector('body.home'),
	aboutCheck = document.querySelector('body.about'),
	contactCheck = document.querySelector('body.contact'),
	portfolioCheck = document.querySelector('body.portfolio'),
	portfolioSingleCheck = document.querySelector('body.single');
	

		


function loadSite() {

		let pageRest = pbypData.siteUrl + '/wp-json/wp/v2/pages'

		fetch(pageRest)
			.then (
				function(response) {

					if (response.status !== 200) {
						console.log('Looks like there was a problem.')
						alert('Looks like there was a problem. Please reload the page or contact us')
						return
					}

					response.json().then(function(data) {
						
						siteData = data

						loadingDiv.classList.add('hide')
						sidebar.classList.add('show')

						loadPages()
						displaySection()

					})
				}
			)
}

function loadPages() {

	homeSlider()

	aboutContent.innerHTML = siteData[2].content.rendered
	contactContent.innerHTML = siteData[3].content.rendered


}


function shownext() {
		
	let activeSlide = document.querySelector('.slides .active')
	activeSlide.classList.remove('active')
	
	if (activeSlide == document.querySelector('.slides div:last-child')) {
		document.querySelector('.slides div:first-child').classList.add('active')
	} else {
		activeSlide.nextSibling.classList.add('active')
	}
}

var timer = setInterval( shownext, 10000);



function homeSlider() {

	let contents = document.createElement('div')
	
	contents.innerHTML = siteData[0].content.rendered

	let images = contents.getElementsByTagName('img')



	for (let i = 0; i < images.length; i++ ) {
		
		let div = document.createElement('div')
		
		div.setAttribute('class', 'slider-container')
		div.setAttribute('style', 'background-image:url(' +  images[i].getAttribute('src') + ')' )

		homeSlide.appendChild(div)

	}

	homeSlide.firstChild.classList.add('active')

	sliderControls()

}


function  sliderControls() {

	[].forEach.call(document.querySelectorAll('.slide-controls a'), function(e) { 
		e.addEventListener('click', function(e) {
			e.preventDefault()

			// reset interval
			clearInterval(timer)
			timer = setInterval( shownext, 10000)

			let activeSlide = document.querySelector('.slides .active')
			activeSlide.classList.remove('active')


			if (this.getAttribute('class') == "prev-slide" ) {

				if (activeSlide == document.querySelector('.slides div:first-child')) {
					document.querySelector('.slides div:last-child').classList.add('active')
				} else {
					activeSlide.previousSibling.classList.add('active')
				}

			} else {

				if (activeSlide == document.querySelector('.slides div:last-child')) {
					document.querySelector('.slides div:first-child').classList.add('active')
				} else {
					activeSlide.nextSibling.classList.add('active')
				}
			}
			

		})
	})

}


function displaySection() {

	if (portfolioCheck) {

		fetchPortfolio()
		portfolioWrap.classList.add('active')

	} else if (portfolioSingleCheck) {
		
		fetchSinglePortfolio()
		portfolioWrap.classList.add('active')

	} else if (aboutCheck) {
		
		aboutWrap.classList.add('active')

	} else if (contactCheck) {

		contactWrap.classList.add('active')

	} else {

		homeWrap.classList.add('active')

	}

	menuSelection()

}


function fetchPortfolio() {

	let artWorks = pbypData.siteUrl + '/wp-json/wp/v2/posts'

	loadingFolioDiv.classList.remove('hide')

	fetch(artWorks)
		.then (
			function(response) {

				if (response.status !== 200) {
					console.log('Looks like there was a problem.')
					alert('Looks like there was a problem. Please reload the page or contact us')
					return
				}

				response.json().then(function(data) {
					
					portfolioData = data

					displayArtworks()					

				})
			}
		)
}

function decodeTitle (input) {
	return input.replace(/&#8211;/g, "–")
				.replace(/&mdash;/g, "–");
}

function fetchSinglePortfolio() {

	let postID = document.querySelector('body.single').getAttribute('data-post')
	let singleArtwork = pbypData.siteUrl + '/wp-json/wp/v2/posts/' + postID


	fetch(singleArtwork)
		.then (
			function(response) {

				if (response.status !== 200) {
					console.log('Looks like there was a problem.')
					alert('Looks like there was a problem. Please reload the page or contact us')
					return
				}

				response.json().then(function(data) {
					
					singleArtworkData = data

					fetchPortfolio()
					displaySinglePortfolio()

							

				})
			}
		)
	
}


function displaySinglePortfolio() {
	let t = singleArtworkData.title.rendered
	let x = singleArtworkData.excerpt.rendered
	let c = singleArtworkData.content.rendered

	document.querySelector('.project-title').innerHTML = t
	document.querySelector('.project-desc').innerHTML = x
	document.querySelector('.project-content').innerHTML = c
	

	modal.classList.add('active')
	htmlBody.style.overflowY = 'hidden'

	let titleSingle = singleArtworkData.title.rendered

	
	
	document.title = decodeTitle(titleSingle)
	// console.log(decodeTitle(titleSingle))

	closeModal()
}


function displayArtworks() {

	for (let i = 0; i < portfolioData.length; i++) {
		let a = document.createElement('a')
		let p = document.createElement('p')
		let img = document.createElement('img')
		let thumb = document.createElement('figure')
		let thumbWrap = document.createElement('div')

		a.setAttribute('data-id', portfolioData[i].id)
		a.setAttribute('href', portfolioData[i].link)
		a.setAttribute('class', 'post-link')
		p.innerText = portfolioData[i].title.rendered
		img.setAttribute('src', portfolioData[i].fimg_url)
		thumb.setAttribute('class', 'project-thumb')
		thumbWrap.setAttribute('class', 'project-thumb-wrap')

		thumb.appendChild(thumbWrap).appendChild(a).appendChild(img)
		thumbWrap.appendChild(p)

		// portfolioContent.appendChild(thumb)

		document.querySelector('.portfolio-contents').appendChild(thumb)
	}

	openSinglePortfolio()
	loadingFolioDiv.classList.add('hide')
}


function menuSelection() {
	[].forEach.call(document.querySelectorAll('a[data-nav]'), function(e) {
			e.addEventListener('click', function(e) {
				e.preventDefault()

				let menuSiblings = document.querySelectorAll('main section')
				let activeMenu = this.getAttribute('data-nav')

				menuWrap.classList.remove('open')


				if (activeMenu == 'home') {

					clearInterval(timer)
					timer = setInterval( shownext, 10000)

				} else if (activeMenu == 'portfolio') {
					
					if (portfolioData == null) {
						fetchPortfolio()
					} 
				} else {

					clearInterval(timer)
					
				}

				

				for (let i=0; i<menuSiblings.length; i++) {

						if (menuSiblings[i].className.match(activeMenu)) {
							menuSiblings[i].classList.add('active')
						} else {
							menuSiblings[i].classList.remove('active')
						}
				}

			})
	})

}


function openSinglePortfolio() {
	[].forEach.call(document.querySelectorAll('a.post-link'), function(e) {
		e.addEventListener('click', function(e) {
			e.preventDefault()

				let id = this.dataset.id

				for (let i = 0; i < portfolioData.length; i++) {
					if (portfolioData[i].id == id) {
	
						let t = portfolioData[i].title.rendered
						let x = portfolioData[i].excerpt.rendered
						let c = portfolioData[i].content.rendered
	
						document.querySelector('.project-title').innerHTML = t
						document.querySelector('.project-desc').innerHTML = x
						document.querySelector('.project-content').innerHTML = c
	
						modal.classList.add('active')
						modal.scrollTop = 0
						htmlBody.style.overflowY = 'hidden'
	
						document.title = decodeTitle(portfolioData[i].title.rendered)
						
						// history.replaceState(null, portfolioData[i].title.rendered, portfolioData[i].link);
					}
				}
	
				closeModal()

			})
	})
}

function closeModal() {

	[].forEach.call(document.querySelectorAll('a.close-modal'), function(e) { 
		e.addEventListener('click', function(e) {
			e.preventDefault()

			modal.classList.remove('active')
			htmlBody.style.overflowY = 'auto'

			document.title = defaultTitle
			history.replaceState(null, defaultTitle, defaultLink)
		})
	})
}


function menuAndnav() {

	[].forEach.call(document.querySelectorAll('.mobile-menu nav.nav a'), function(e) { 
		e.setAttribute('href', pbypData.siteUrl + '/' + e.getAttribute('data-nav') )
	})

	menuBtn.addEventListener('click', toggleMenu)
	menuBtnCls.addEventListener('click', toggleMenu)

	function toggleMenu() {
		menuWrap.classList.toggle('open')
	}
}



loadSite()
menuAndnav()

console.log(
' -------------------------------\n',
'Author : Grant Imbo (grantimbo.com)\n',
'Version : 1.1.3\n',
'Repository : https://github.com/grantimbo/poweredbypen\n',
'Description : A custom vanilla js for poweredbypen.com\n',
'-------------------------------' );