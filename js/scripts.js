/* -------------------------------
Author : Grant Imbo
Site : grantimbo.com
Version : 4.9
Description : A custom js for my Powered by Pen.
------------------------------- */

var siteData = null,
		portfolioData = null,

		sidebar = document.querySelector('.sidebar'),
		loadingDiv = document.querySelector('.loading'),

		homeWrap = document.querySelector('section.home-wrap'),
		homeContent = document.querySelector('.home-content'),

		portfolioWrap = document.querySelector('section.portfolio-wrap'),
		portfolioContent = document.querySelector('.portfolio-content'),

		aboutWrap = document.querySelector('section.about-wrap'),
		aboutContent = document.querySelector('.about-content'),

		contactWrap = document.querySelector('section.contact-wrap'),
		contactContent = document.querySelector('.contact-content'),

		bodyCheck = document.querySelector('body.home');


function loadSite() {

		var pageRest = pbypData.siteUrl + '/wp-json/wp/v2/pages'

		fetch(pageRest)
			.then (
				function(response) {

					if (response.status !== 200) {
						console.log('Looks like there was a problem.');
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

	var artWorks = pbypData.siteUrl + '/wp-json/wp/v2/posts'

	fetch(artWorks)
		.then (
			function(response) {

				if (response.status !== 200) {
					console.log('Looks like there was a problem.');
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


function displayArtworks() {
		for (var i = 0; i < portfolioData.length; i++) {
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
}


function loadPages() {

	homeContent.innerHTML = siteData[3].content.rendered
	// homeWrap.innerHTML = siteData[3].content.rendered
	aboutContent.innerHTML = siteData[2].content.rendered
	contactContent.innerHTML = siteData[1].content.rendered

}
	
	
function displaySection() {

		if (bodyCheck) {
			homeWrap.classList.add('active');
			menuSelection()
		}

}

function menuSelection() {
	[].forEach.call(document.querySelectorAll('a[data-nav]'), function(e) {
			e.addEventListener('click', function(e) {
				e.preventDefault();

				let menuSiblings = document.querySelectorAll('main section')
				let activeMenu = this.getAttribute('data-nav')

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


function loadPortfolio() {

}


loadSite()
