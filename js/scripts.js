/* -------------------------------
Author : Grant Imbo
Site : grantimbo.com
Version : 1
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
	homeContent = document.querySelector('.home-content'),

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

	document.title = singleArtworkData.title.rendered

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

	openSinglePortfolio();
	loadingFolioDiv.classList.add('hide')
}


function loadPages() {

	homeContent.innerHTML = siteData[3].content.rendered
	aboutContent.innerHTML = siteData[2].content.rendered
	contactContent.innerHTML = siteData[1].content.rendered

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



function menuSelection() {
	[].forEach.call(document.querySelectorAll('a[data-nav]'), function(e) {
			e.addEventListener('click', function(e) {
				e.preventDefault();

				let menuSiblings = document.querySelectorAll('main section')
				let activeMenu = this.getAttribute('data-nav')

				menuWrap.classList.remove('open')

				if (activeMenu == 'portfolio') {
					
					if (portfolioData == null) {
						fetchPortfolio()
						
						console.log('fetching artworks')
					} else {
						
						console.log('displaying artworks')
						// showPortfolio()
						
					}
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
			e.preventDefault();

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
						htmlBody.style.overflowY = 'hidden'
	
						document.title = portfolioData[i].title.rendered
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

	menuBtn.addEventListener('click', toggleMenu)
	menuBtnCls.addEventListener('click', toggleMenu)

	function toggleMenu() {
		menuWrap.classList.toggle('open')
	}
}


loadSite()
menuAndnav()