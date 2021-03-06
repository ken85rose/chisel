!function(d, w, c, u){'use strict'

	/*
		REQUIRES: domExtension.js

		USAGE:
		<div id="productList">
			<div class="product"></div>
			<div class="product"></div>
			<div class="product"></div>
			<div class="product"></div>
		</div>
		<div id="loader"></div>
		

		var list = new c.InfiniteScroll({
			parent: document.querySelector('#productList'),
			loader: document.querySelector('#loader'),
			increment: 4,
			onIncrement: function(done){
				// Changes increment number
				done(8)
			},
			onLoad: function(els, done){
				// Do stuff with els
				console.log('loading...')
				done()
			}
		})

	*/


	var proto = {
		increment: 8,
		onLoad: noop,
		threshold: 10,		// How close element detection needs to be to load

		listenerActive: true,
		processing: false,

		// See if raf is ready to update
		requestTick: function(){
			if(this.processing === false) {
				requestAnimationFrame(this.update.bind(this))
			}
			this.processing = true
		},
		// Update when refresh rate says we can
		update: function(){

			// See if loader is in view
			var winBottom = w.innerHeight + w.scrollY,
				docBottom = d.body.scrollHeight


			var diff = docBottom - winBottom

			// If in viewport
			if(diff <= this.threshold){
				this.loader.style.visibility = 'visible'
				if(this.onIncrement){
					this.onIncrement(this.dynamicIncrement.bind(this))
				}
				else{
					this.loaderShowing()
				}
			}
			// If not in viewport
			else{
				this.processing = false
			}

		},
		// Reset dom extension
		reset: function(){
			this.extension.reset()
		},
		// Increment with callback
		dynamicIncrement: function(increment){
			this.increment = increment
			this.loaderShowing()
		},
		// Send callback when at bottom of page
		loaderShowing: function(){
			this.extension.incrementTotal(this.increment)
			this.onLoad(this.extension.children, this.showConfirm.bind(this))
		},
		// After callback has ran
		showConfirm: function(){
			this.processing = false
			this.extension.incrementShow(this.increment)
			this.loader.style.visibility = 'hidden'
		}
	}


	// Constructor
	function InfiniteScroll(config){

		for(var i in config){
			this[i] = config[i]
		}
		this.extension = new c.DomExtension({
			parent: this.parent
		})

		// requestAnimationFrame on scroll
		this.requestTick()
		w.addEventListener('scroll', this.requestTick.bind(this))
		w.addEventListener('resize', this.requestTick.bind(this))

		return this
	}
	InfiniteScroll.prototype = proto


	function noop(els, done){done()}


	c.InfiniteScroll = InfiniteScroll

}(document, window, c)