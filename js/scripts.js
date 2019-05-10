/* -------------------------------
Author : Grant Imbo
Site : grantimbo.com
Version : 4.9
Description : A custom vanilla js for my site.
------------------------------- */

var htmlBody = document.querySelector('html'),
	bodyCheck = document.querySelector('body.single'),
	modal = document.querySelector('#modal'),
	loadWrap = document.querySelector('.loadbar-wrap'),
	loader = document.querySelector('.loadbar'),
	imgModalWrap = document.querySelector('#imgModal'),
	months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
	siteContents = null,
	defaultTitle = document.title,
	defaultLink = location.pathname;
	


function loadSite() {
	
	loadWrap.classList.add('active');
	setTimeout(function(){
		loader.classList.add('active');
	},200)

	var projectRest = grantData.siteUrl + '/wp-json/wp/v2/posts?_embed&per_page=20';

	fetch(projectRest)
	  .then(
	    function(response) {
	    	
	      if (response.status !== 200) {
	        console.log('Looks like there was a problem. Status Code: ' +
	          response.status);
	        return;
	      }

	      // Examine the text in the response
	      response.json().then(function(data) {
	        siteContents = data
	        
			loadWrap.classList.remove('active');
			loader.classList.remove('active');



			appendPortfolio()

	      });
	    }
	  )
	  .catch(function(err) {
	    console.log('Fetch Error :-S', err);
	  });
}


function appendPortfolio() {
    for (var i = 0; i < siteContents.length; i++) {
		let a = document.createElement('a')
		let p = document.createElement('p')
		let img = document.createElement('img')
		let thumb = document.createElement('figure')
		let thumbWrap = document.createElement('div')

		a.setAttribute('data-id', siteContents[i].id)
		a.setAttribute('href', siteContents[i].link)
		a.setAttribute('class', 'post-link')
		p.innerText = siteContents[i].title.rendered
		img.setAttribute('src', siteContents[i].fimg_url)
		thumb.setAttribute('class', 'project-thumb')
		thumbWrap.setAttribute('class', 'project-thumb-wrap')



		thumb.appendChild(thumbWrap).appendChild(a).appendChild(img)
		thumbWrap.appendChild(p)

		document.querySelector('#home').appendChild(thumb)

	}

	openModal();
}


function openModal() {

	[].forEach.call(document.querySelectorAll('a.post-link'), function(e) { 
		e.addEventListener('click', function(e) {
			e.preventDefault();
			

			var id = this.dataset.id;

			for (var i = 0; i < siteContents.length; i++) {
				if (siteContents[i].id == id) {

					let t = siteContents[i].title.rendered;
					let x = siteContents[i].excerpt.rendered;
					let d = new Date(siteContents[i].date);
					let c = siteContents[i].content.rendered;
					let nxt = document.querySelector('a.next-post');
					let prv = document.querySelector('a.prev-post');
					let df = months[d.getMonth()] +' '+ d.getDate() + ', ' + d.getFullYear();

					document.querySelector('.project-title').innerHTML = t
					document.querySelector('.project-desc').innerHTML = x
					document.querySelector('.project-date').innerHTML = df
					document.querySelector('.project-content').innerHTML = c
					

					if (siteContents[i+1]) {
						nxt.setAttribute('data-id', siteContents[i+1].id)
						nxt.classList.remove('hide');
					} else {
						nxt.classList.add('hide');
					}

					if (siteContents[i-1]) {
						prv.setAttribute('data-id', siteContents[i-1].id)
						prv.classList.remove('hide');
					} else {
						prv.classList.add('hide');
					}

					modal.style.display = 'block';
					htmlBody.style.overflowY = 'hidden';

					document.title = siteContents[i].title.rendered
					// history.replaceState(null, siteContents[i].title.rendered, siteContents[i].link);
				}
			}

			closeModal();
			imgModal() 

		})
	});
}


function closeModal() {

	[].forEach.call(document.querySelectorAll('a.close-modal'), function(e) { 
		e.addEventListener('click', function(e) {
			e.preventDefault();

			modal.style.display = 'none';
			htmlBody.style.overflowY = 'auto';

			document.title = defaultTitle
			history.replaceState(null, defaultTitle, defaultLink);
		})
	})
}





// ---------------------------------------
// Individual Image Preview with Carousel
// ---------------------------------------
function imgModal() {

	// variables
	var clsBtn = document.querySelector('.close-img-modal');


	document.addEventListener('click', function(e) {

		if ( e.target.matches('.project-content img') ) {

			document.querySelector('#carouselWrap').innerHTML = null
			e.preventDefault();

			var cloneImg = e.target.cloneNode(true);
			
			document.querySelector('#carouselWrap').appendChild(cloneImg)
			imgModalWrap.classList.add('active')
		}
	});

	clsBtn.addEventListener('click', function() {
	
		modal.style.overflowY = 'auto';
		imgModalWrap.classList.remove('active')

	});
	
}




// -------------------
// Sidebar Navigation
// -------------------

function menuAndnav() {

	var	menu = document.querySelector('.menu'),
		menuShadow = document.querySelector('.menu-shadow'),
	 	sideNav = document.querySelectorAll('a.category-menu'),
		menuBtn = document.querySelector('button.mobile-menu');
		menuShadow = document.querySelector('.menu-shadow');

	// triggers
	menuBtn.addEventListener('click', toggleMenu);
	menuShadow.addEventListener('click', toggleMenu);
	[].forEach.call(sideNav, function(e) { e.addEventListener('click', loadCategory) });

	// functions
	function toggleMenu() {
		menu.classList.toggle('open');
	}

	function loadCategory() {
		let href = this.getAttribute('data-category'),
			prj = document.getElementsByClassName("project-thumb");

		for (i = 0; i < prj.length; i++) {
			if (prj[i].className.match(href)) {
				prj[i].style.display = 'block';
			} else {
				prj[i].style.display = 'none';
			}
		}
		menu.classList.toggle('open');
	}
}	



// run the function
loadSite();
menuAndnav();
console.log(
' -------------------------------\n',
'Author : Grant Imbo\n',
'Site : grantimbo.com\n',
'Version : 4.8\n',
'Description : A custom vanilla js for my site.\n',
'-------------------------------' );