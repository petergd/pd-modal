export class pdModal extends HTMLElement {
  static get observedAttributes() {
    return ['contentbg', 'overlaybg', 'modalstyles', 'button-text'];
  }
  constructor() {
    super();
    this.sRoot = this.attachShadow({
      mode: 'closed'
    });
	this.buttonText = !this.isEmpty(this.getAttribute("button-text")) ? this.getAttribute("button-text") : "Open Modal Window" ;
    this.modalStyles = ['zoom', 'slide-left', 'slide-right', 'slide-down', 'slide-up', 'rotate', 'fall', 'rotate-Y-Right', 'rotate-Y-Left', 'slit-right', 'slit-left','slit-up','slit-down'];
    this.queue = [];
    this.modalstyles = !this.isEmpty(this.getAttribute("modalstyles")) ? this.getAttribute("modalstyles") : 'auto';
    if (this.modalstyles !== "auto" && this.modalstyles !== "template") {
      console.info("Proper modal style was not set, switching to auto!");
      this.modalstyles = 'auto';
    }
    this.init();
  }
  isEmpty(value) {
    switch (true) {
      case (value == null || value == undefined):
        return true;
      case (Array.isArray(value)):
        return value.length == 0;
      case (typeof value == 'object'):
        return (Object.keys(value).length === 0 && value.constructor === Object);
      case (typeof value == 'string'):
        return value.length == 0;
      case (typeof value == 'number' && !isNaN(value)):
        return value == 0;
      case (!value):
        return true;
      default:
        return false;
    }
  }
  toRGB(color) {
    if (typeof color == "number") {
      color = color.toString();
    }
    if (typeof color !== "string" || color.length != 6) {
      return false;
    }
    let rgb = {};
    rgb.r = parseInt(color.slice(0, 2), 16);
    rgb.g = parseInt(color.slice(2, 4), 16);
    rgb.b = parseInt(color.slice(4, 6), 16);
    return rgb;
  }
  stripTags(htmlString){
    let doc = new DOMParser().parseFromString(htmlString, 'text/html');
    return doc.body.textContent || "";
  }
  prepareCSS() {
    let threshold = '0.5';
    let borderThreshold = '0.8';
    let cR = this.contentRGB.r * 0.2126;
    let cG = this.contentRGB.g * 0.7152;
    let cB = this.contentRGB.b * 0.0722;
    let oR = this.overlayRGB.r * 0.2126;
    let oG = this.overlayRGB.g * 0.7152;
    let oB = this.overlayRGB.b * 0.0722;
    let perceivedLigthness = (cR + cG + cB) / 255;
    let color = 'hsl(0,0%,calc((' + perceivedLigthness + ' - ' + threshold + ') * -10000000%))';
    let cBG = 'rgb(' + this.contentRGB.r + ',' + this.contentRGB.g + ',' + this.contentRGB.b + ')';
    let oBG = 'rgba(' + this.overlayRGB.r + ',' + this.overlayRGB.g + ',' + this.overlayRGB.b + ',0.8)';
    this.css = '.modal-modal{position:fixed;top:5%;left:5%;z-index:2000;visibility:visible;width:90vw;height:90vh;backface-visibility:visible;perspective: 81.25rem;filter: drop-shadow(-.25rem .25rem .75rem rgba(50, 50, 0, 0.5));} .modal-show{visibility:visible; opacity:1;} .modal-overlay{position:fixed;filter: blur(.3875rem);width:100%;height:100%;visibility:visible;top:0;left:0;z-index:1000;opacity:1;background:' + oBG + ';-webkit-transition:all 0.3s;-moz-transition:all 0.3s;transition:all 0.3s} .modal-show~.modal-overlay{opacity:1;visibility:visible} .modal-content{color:' + color + ';background:' + cBG + ';position:relative;border-radius:.1875rem;font-size:1rem;margin:0 auto;height:90vh} .modal-content h3{margin:0;padding:.4em;text-align:center;font-size:2.4em;font-weight:300;opacity:.8;border-radius:.1875rem .1875rem 0 0} .modal-content>div{padding:.5rem;margin:0 0 0 1rem;font-weight:300;font-size:1.15em} .modal-content>div p{margin:0;padding:.5rem 0} .modal-content>div ul{margin:0;padding:.5rem 0 .5rem .5rem} .modal-content>div ul li{padding:.5rem .3rem .5rem 0;display:table-row} .modal-content>div ul li::before{content:"☛";padding:.5rem .3rem .5rem 0;text-indent:.5rem;display:table-cell} button{cursor: pointer;font-size: 1rem; padding: .5rem 1rem;background: ' + cBG + ';color: ' + color + ';display:block;margin:0 auto;font-size:.8em} .modal-show.zoom-in { animation: zoomin 0.7s forwards normal ease-in;} @keyframes zoomin { 0% { opacity:0; transform:scale(0.25); } 50% { opacity:0.65; transform:scale(0.85); } 100% { opacity:1 ;transform:scale(1); } } .modal-show.zoom-out { animation: zoomout 0.7s forwards normal ease-in;} @keyframes zoomout { 0% { opacity:1 ;transform:scale(1); } 50% { opacity:0.65; transform:scale(0.85); } 100% { opacity:0; transform:scale(0.25); } } .modal-show.slide-left-in { animation: slideleftin 0.7s forwards normal ease-in;} @keyframes slideleftin { 0% { opacity:0; transform:translateX(100%); } 100% { opacity:1 ;transform:translateX(0%); } } .modal-show.slide-left-out { animation: slideleftout 0.7s forwards normal ease-in;} @keyframes slideleftout { 0% { opacity:1 ;transform:translateX(0%); } 100% { opacity:0; transform:translateX(100%); } } .modal-show.slide-right-in { animation: sliderightin 0.7s forwards normal ease-in;} @keyframes sliderightin { 0% { opacity:0; transform:translateX(-100%); } 100% { opacity:1 ;transform:translateX(0%); } } .modal-show.slide-right-out { animation: sliderightout 0.7s forwards normal ease-in;} @keyframes sliderightout { 0% { opacity:1 ;transform:translateX(0%); } 100% { opacity:0; transform:translateX(-100%); } } .modal-show.slide-down-in { animation: slidedownin 0.7s forwards normal ease-in;} @keyframes slidedownin { 0% { opacity:0; transform:translateY(-100%); } 100% { opacity:1 ;transform:translateY(0%); } } .modal-show.slide-down-out { animation: slidedownout 0.7s forwards normal ease-in;} @keyframes slidedownout { 0% { opacity:1 ;transform:translateY(0%); } 100% { opacity:0; transform:translateY(-100%); } } .modal-show.slide-up-in { animation: slideupin 0.7s forwards normal ease-in;} @keyframes slideupin { 0% { opacity:0; transform:translateY(100%); } 100% { opacity:1 ;transform:translateY(0%); } } .modal-show.slide-up-out { animation: slideupout 0.7s forwards normal ease-in;} @keyframes slideupout { 0% { opacity:1 ;transform:translateY(0%); } 100% { opacity:0; transform:translateY(100%); } } .modal-show.rotate-in { animation: rotatein 0.7s forwards normal ease-in;} @keyframes rotatein { 0% { opacity:0; transform: scale(0) rotate(720deg); } 100% { opacity:1 ; transform: scale(1) rotate(0deg); } } .modal-show.rotate-out { animation: rotateout 0.7s forwards normal ease-in;} @keyframes rotateout { 0% { opacity:1 ; transform: scale(1) rotate(0deg); } 100% { opacity:0; transform: scale(0) rotate(720deg); } } .modal-show.fall-in { transform-style: preserve-3d; animation: fallin 0.7s forwards normal ease-in;} @keyframes fallin { 0% { transform: translateZ(37.5rem) rotate(540deg); opacity: 0; } 100% { transform: translateZ(0rem) rotate(0deg); opacity: 1; } } .modal-show.fall-out { transform-style: preserve-3d; animation: fallout 0.7s forwards normal ease-in;} @keyframes fallout { 0% { transform: translateZ(0rem) rotate(0deg); opacity: 1; } 100% { transform: translateZ(37.5rem) rotate(540deg); opacity: 0; } } .modal-show.rotate-Y-Right-in { transform-style: preserve-3d; animation: rotateYRightin 0.7s forwards normal ease-in;} @keyframes rotateYRightin { 0% { transform:  rotateY(-70deg); opacity: 0; } 100% { transform: rotateY(0deg); opacity: 1; } } .modal-show.rotate-Y-Right-out { transform-style: preserve-3d; animation: rotateYRightout 0.7s forwards normal ease-in;} @keyframes rotateYRightout { 0% { transform: rotateY(0deg); opacity: 1; } 100% { transform:  rotateY(-70deg); opacity: 0; } }  .modal-show.rotate-Y-Left-in { transform-style: preserve-3d; animation: rotateYLeftin 0.7s forwards normal ease-in;} @keyframes rotateYLeftin { 0% { transform:  rotateY(70deg); opacity: 0; } 100% { transform: rotateY(0deg); opacity: 1; } } .modal-show.rotate-Y-Left-out { transform-style: preserve-3d; animation: rotateYLeftout 0.7s forwards normal ease-in;} @keyframes rotateYLeftout { 0% { transform: rotateY(0deg); opacity: 1; } 100% { transform:  rotateY(70deg); opacity: 0; } } .modal-show.slit-left-in { transform-style: preserve-3d; animation: slitleftin 0.7s forwards normal ease-in;} @keyframes slitleftin { 0% { transform: translateZ(-187.5rem) rotateY(90deg); opacity: 0; } 50% { transform: translateZ(-15.625rem) rotateY(89deg); opacity: 1; } 100% { transform: translateZ(0) rotateY(0deg); opacity: 1; } } .modal-show.slit-left-out { transform-style: preserve-3d; animation: slitleftout 0.7s forwards normal ease-in;} @keyframes slitleftout { 0% { transform: translateZ(0) rotateY(0deg); opacity: 1; } 50% { transform: translateZ(-15.625rem) rotateY(89deg); opacity: 1; } 100% { transform: translateZ(-187.5rem) rotateY(90deg); opacity: 0; } } .modal-show.slit-right-in { transform-style: preserve-3d; animation: slitrightin 0.7s forwards normal ease-in;} @keyframes slitrightin { 0% { transform: translateZ(-187.5rem) rotateY(-90deg); opacity: 0; } 50% { transform: translateZ(-15.625rem) rotateY(-89deg); opacity: 1; } 100% { transform: translateZ(0) rotateY(0deg); opacity: 1; } } .modal-show.slit-right-out { transform-style: preserve-3d; animation: slitrightout 0.7s forwards normal ease-in;} @keyframes slitrightout { 0% { transform: translateZ(0) rotateY(0deg); opacity: 1; } 50% { transform: translateZ(-15.625rem) rotateY(-89deg); opacity: 1; } 100% { transform: translateZ(-187.5rem) rotateY(-90deg); opacity: 0; } }  .modal-show.slit-up-in { transform-style: preserve-3d; animation: slitupin 0.7s forwards normal ease-in;} @keyframes slitupin { 0% { transform: translateZ(-187.5rem) rotateX(90deg); opacity: 0; } 50% { transform: translateZ(-15.625rem) rotateX(89deg); opacity: 1; } 100% { transform: translateZ(0) rotateX(0deg); opacity: 1; } } .modal-show.slit-up-out { transform-style: preserve-3d; animation: slitupout 0.7s forwards normal ease-in;} @keyframes slitupout { 0% { transform: translateZ(0) rotateX(0deg); opacity: 1; } 50% { transform: translateZ(-15.625rem) rotateX(89deg); opacity: 1; } 100% { transform: translateZ(-187.5rem) rotateX(90deg); opacity: 0; } } .modal-show.slit-down-in { transform-style: preserve-3d; animation: slitdownin 0.7s forwards normal ease-in;} @keyframes slitdownin { 0% { transform: translateZ(-187.5rem) rotateX(-90deg); opacity: 0; } 50% { transform: translateZ(-15.625rem) rotateX(-89deg); opacity: 1; } 100% { transform: translateZ(0) rotateX(0deg); opacity: 1; } } .modal-show.slit-down-out { transform-style: preserve-3d; animation: slitdownout 0.7s forwards normal ease-in;} @keyframes slitdownout { 0% { transform: translateZ(0) rotateX(0deg); opacity: 1; } 50% { transform: translateZ(-15.625rem) rotateX(-89deg); opacity: 1; } 100% { transform: translateZ(-187.5rem) rotateX(-90deg); opacity: 0; } } ';
    this.Style = document.createElement("style");
    this.Style.append(this.css);
    this.sRoot.appendChild(this.Style);
  }

  connectedCallback() {
    this.contentbg = this.getAttribute("contentbg");
    this.overlaybg = this.getAttribute("overlaybg");
    this.modalstyles = this.getAttribute("modalstyles");
	this.buttonText = this.getAttribute("button-text");
  }

  disconnectedCallback() {
    console.log('Disconnected.');
  }

  adoptedCallback() {
    console.log('Adopted.');
  }

  manageQueue(button, overlay, index) {
    let template = this.queue.filter(item => item.dataset.modalOrder == index)[0];
    let templateId = template.dataset.modalId;
    let close = null;
	let next = null;
	let prev = null;
	let modalStyleIn = null;
	let modalStyleOut = null;
    let templateContent = template.content.cloneNode(true);
    let modal = document.createElement("div");
    modal.classList.add("modal-modal");
    modal.id = templateId;
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.appendChild(templateContent);
    if (this.isEmpty(modalContent.querySelector(".modal-close")) && this.isEmpty(modalContent.querySelector(".modal-next"))) {
      console.error("You must have a close button in your modal, having class modal-close or a next button having class modal-next.");
      return;
    } else {
      close = modalContent.querySelector(".modal-close");
    }
	
    modal.appendChild(modalContent);
	if (this.modalstyles == "auto") {
		modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
		modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
	} 	
	if (this.modalstyles == "template") {
		let styles = template.dataset.modalStyle.split(",");
		if(!this.isEmpty(styles)) {
			if(styles.length > 2) {
				console.info("Too many modal styles switching to auto!");
				modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
				modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
			} else if(styles.length == 2) {
				modalStyleIn = styles[0];
				modalStyleOut = styles[1];
			} else {
				modalStyleIn = styles[0];
				modalStyleOut = styles[0];
			}
		} else {
			console.info("Modal styles not approved switching to auto!");
			modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
			modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
		}
	}
    
    modal.classList.add("modal-show");
    modal.classList.add(modalStyleIn + "-in");
    this.sRoot.appendChild(overlay);
    this.sRoot.append(modal);
	if(!this.isEmpty(close)) {
		close.addEventListener("click", (ev) => {
		  ev.preventDefault();
		  ev.stopPropagation();
		  modal.classList.add(modalStyleOut + "-out");
		  modal.classList.remove(modalStyleIn + "-in");
		  setTimeout(() => {
			modal.classList.remove("modal-show");
			modal.classList.remove(modalStyleOut + "-out");
			this.sRoot.removeChild(modal);						
			this.sRoot.removeChild(overlay);
			this.sRoot.removeChild(button);
			this.queue = [];
			this.init();
			return;
		  }, 700);
		}, false);
	}
	if (!this.isEmpty(modalContent.querySelector(".modal-next"))) {
		next = modalContent.querySelector(".modal-next");
		if(!this.isEmpty(next)) {
			next.addEventListener("click", (ev) => {
			  ev.preventDefault();
			  ev.stopPropagation();
			  modal.classList.add(modalStyleOut + "-out");
			  modal.classList.remove(modalStyleIn + "-in");
			  setTimeout(() => {
				modal.classList.remove("modal-show");
				modal.classList.remove(modalStyleOut + "-out");
				this.sRoot.removeChild(modal);
				index++;
				if (index <= this.queue.length && index >= 1) {
				  this.manageQueue(button, overlay, index);
				} else {
				  this.sRoot.removeChild(overlay);
				  if(index > this.queue.length || index < 1) {
					this.sRoot.removeChild(button);
					this.queue = [];
					this.init();
					return;  
				  }  
				}
			  }, 700);
			}, false);
		}
	}
    if (!this.isEmpty(modalContent.querySelector(".modal-prev"))) {
		prev = modalContent.querySelector(".modal-prev");
		if(!this.isEmpty(prev)) {
			prev.addEventListener("click", (ev) => {
			  ev.preventDefault();
			  ev.stopPropagation();
			  modal.classList.add(modalStyleOut + "-out");
			  modal.classList.remove(modalStyleIn + "-in");
			  setTimeout(() => {
				modal.classList.remove("modal-show");
				modal.classList.remove(modalStyleOut + "-out");
				this.sRoot.removeChild(modal);
				index--;
				if (index <= this.queue.length && index >= 1) {
				  this.manageQueue(button, overlay, index);
				} else {
				  this.sRoot.removeChild(overlay);
				  if(index > this.queue.length || index < 1) {
					this.sRoot.removeChild(button);
					this.queue = [];
					this.init();
					return;  
				  }  
				}
			  }, 700);
			}, false);
		}
	}
	overlay.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      modal.classList.add(modalStyleOut + "-out");
      modal.classList.remove(modalStyleIn + "-in");
      setTimeout(() => {
        modal.classList.remove("modal-show");
        modal.classList.remove(modalStyleOut + "-out");
        this.sRoot.removeChild(modal);
		index++;
        if (index <= this.queue.length && index >= 1) {
          this.manageQueue(button, overlay, index);
        } else {
          this.sRoot.removeChild(overlay);
		  if(index > this.queue.length || index < 1) {
			this.sRoot.removeChild(button);
			this.queue = [];
			this.init();
			return;  
		  }
        }
      }, 700);
    }, false);
  }
  init() {
    this.contentbg = !this.isEmpty(this.getAttribute("contentbg")) ? this.getAttribute("contentbg") : '000000';
    this.overlaybg = !this.isEmpty(this.getAttribute("overlaybg")) ? this.getAttribute("contentbg") : '000000';
    this.contentRGB = this.toRGB(this.contentbg);
    this.overlayRGB = this.toRGB(this.overlaybg);
    this.prepareCSS();
    let queueList = Array.from((!this.isEmpty(this.id) ? document.querySelectorAll("template[data-pd-modal-id=\""+this.id+"\"]") : document.querySelectorAll("template[data-for=\"pd-modal\"]")));
    queueList.forEach((node) => {
      this.queue.push(node.cloneNode(true))
    });
    this.queue.sort((a, b) => {
      if (a.dataset.modalOrder == b.dataset.modalOrder) {
        return 0;
      } else {
        return a.dataset.modalOrder < b.dataset.modalOrder ? 1 : -1;
      }
    });
    let index = 1;
    let template = this.queue.filter(item => item.dataset.modalOrder == index)[0];
	if(this.isEmpty(template)) {
		let doc = new DOMParser().parseFromString('<template data-for="pd-modal" data-pd-modal-id="singlepage" data-modal-order="1" data-modal-id="modals1" data-modal-style="auto"></template>', 'text/html');
		template = doc.querySelector("template");
		template.innerHTML = '<style>* { font-family: Arial; } button {background: blue; color: white; float: right; bottom: 0; margin: 1rem;} h3 {display: block; width: inherit; height: 2rem;background: blue; color: white; padding: 1rem  0;} p { font-size: 1rem; line-height: 1rem; word-spacing: .275rem; letter-spacing: .0975rem}</style><h3>Single Page Modal Header</h3><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc libero, elementum vitae nunc in, placerat fringilla massa. Nam tempus malesuada aliquam. Vivamus a imperdiet arcu, a venenatis dolor. Vivamus tempor et felis vel congue. Sed iaculis leo eu felis tempor interdum. Etiam ut justo neque. Ut sit amet magna blandit, lacinia massa quis, porttitor sem. Fusce laoreet ante eget cursus convallis. Nulla sed felis vel libero porttitor viverra quis a odio. Integer commodo interdum lorem, vitae tempor ex tristique nec. Pellentesque aliquam, felis eget efficitur efficitur, diam velit egestas lorem, non fringilla elit velit vitae elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet finibus mi.</p></div><div><button class="modal-action" onclick="alert(\'Action button clicked!\')">Action</button><button class="modal-close">Close</button></div>';
	}
    let templateId = template.dataset.modalId;
    let button = document.createElement("button");
    button.classList.add("modal-trigger");
    button.innerHTML = this.stripTags(this.buttonText);
    button.id = "button-" + (!this.isEmpty(this.id) ? this.id : templateId);
    let overlay = document.createElement("div");
    overlay.classList.add("modal-overlay");
    let close = null;
	let next = null;
	let prev = null;
	let modalStyleIn = null;
	let modalStyleOut = null;
    let templateContent = template.content.cloneNode(true);
    let modal = document.createElement("div");
    modal.classList.add("modal-modal");
    modal.id = templateId;
    let modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
    modalContent.appendChild(templateContent);
    if (this.isEmpty(modalContent.querySelector(".modal-close")) && this.isEmpty(modalContent.querySelector(".modal-next"))) {
      console.info("You must have a close button in your modal, having class modal-close or a next button having class modal-next.");
      return;
    } else {
      close = modalContent.querySelector(".modal-close");
    }
    modal.appendChild(modalContent);
	if (this.modalstyles == "auto") {
		modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
		modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
	}	
	if (this.modalstyles == "template") {
		let styles = template.dataset.modalStyle.split(",");
		if(!this.isEmpty(styles)) {
			if(styles.length > 2) {
				console.info("Too many modal styles switching to auto!");
				modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
				modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
			} else if(styles.length == 2) {
				modalStyleIn = styles[0];
				modalStyleOut = styles[1];
			} else {
				modalStyleIn = styles[0];
				modalStyleOut = styles[0];
			}
		} else {
			console.info("Modal styles not approved switching to auto!");
			modalStyleIn = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];
			modalStyleOut = this.modalStyles[Math.floor(Math.random() * this.modalStyles.length)];	
		}
	}
    if(!this.isEmpty(close)) {
		close.addEventListener("click", (ev) => {
		  ev.preventDefault();
		  ev.stopPropagation();
		  modal.classList.add(modalStyleOut + "-out");
		  modal.classList.remove(modalStyleIn + "-in");
		  setTimeout(() => {
			modal.classList.remove("modal-show");
			modal.classList.remove(modalStyleOut + "-out");
			this.sRoot.removeChild(modal);	
			this.sRoot.removeChild(overlay);
			this.sRoot.removeChild(button);
			this.queue = [];
			this.init();
			return;
		  }, 700);
		}, false);
	}
	if (!this.isEmpty(modalContent.querySelector(".modal-next"))) {
		next = modalContent.querySelector(".modal-next");
		if(!this.isEmpty(next)) {
			next.addEventListener("click", (ev) => {
			  ev.preventDefault();
			  ev.stopPropagation();
			  modal.classList.add(modalStyleOut + "-out");
			  modal.classList.remove(modalStyleIn + "-in");
			  setTimeout(() => {
				modal.classList.remove("modal-show");
				modal.classList.remove(modalStyleOut + "-out");
				this.sRoot.removeChild(modal);
				index++;
				if (index <= this.queue.length && index >= 1) {
				  this.manageQueue(button, overlay, index);
				} else {
				  this.sRoot.removeChild(overlay);
				  if(index > this.queue.length || index < 1) {
					this.sRoot.removeChild(button);
				    this.queue = [];
				    this.init();
				    return;  
				  }
				}
			  }, 700);
			}, false);
		}
	}
    if (!this.isEmpty(modalContent.querySelector(".modal-prev"))) {
		prev = modalContent.querySelector(".modal-prev");
		if(!this.isEmpty(prev)) {
			prev.addEventListener("click", (ev) => {
			  ev.preventDefault();
			  ev.stopPropagation();
			  modal.classList.add(modalStyleOut + "-out");
			  modal.classList.remove(modalStyleIn + "-in");
			  setTimeout(() => {
				modal.classList.remove("modal-show");
				modal.classList.remove(modalStyleOut + "-out");
				this.sRoot.removeChild(modal);
				index--;
				if (index <= this.queue.length && index >= 1) {
				  this.manageQueue(button, overlay, index);
				} else {
				  this.sRoot.removeChild(overlay);
				  if(index > this.queue.length || index < 1) {
					this.sRoot.removeChild(button);
				    this.queue = [];
				    this.init();
				    return;  
				  }
				}
			  }, 700);
			}, false);
		}
	}
    overlay.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      modal.classList.add(modalStyleOut + "-out");
      modal.classList.remove(modalStyleIn + "-in");
      setTimeout(() => {
        modal.classList.remove("modal-show");
        modal.classList.remove(modalStyleOut + "-out");
        this.sRoot.removeChild(modal);
		index++;
        if (index <= this.queue.length && index >= 1) {
          this.manageQueue(button, overlay, index);
        } else {
          this.sRoot.removeChild(overlay);
		  if(index > this.queue.length || index < 1) {
			this.sRoot.removeChild(button);
			this.queue = [];
			this.init();
			return;  
		  }
        }
      }, 700);
    }, false);
    button.addEventListener("click", (ev) => {
      ev.preventDefault();
      ev.stopPropagation();
      modal.classList.add("modal-show");
      modal.classList.add(modalStyleIn + "-in");
      this.sRoot.appendChild(overlay);
      this.sRoot.append(modal);
	  ev.target.style.display = "none";
    });
    this.sRoot.append(button);
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name == "contentbg") {
      this.contentbg = this.getAttribute("contentbg");
    }
    if (name == "overlaybg") {
      this.overlaybg = this.getAttribute("overlaybg");
    }
    if (name == "modalstyles") {
      this.modalstyles = this.getAttribute("modalstyles");
    }
	if (name == "button-text") {
	  this.buttonText = this.getAttribute("button-text");
	}
  }
}
if (!window.customElements.get('pd-modal')) {
  window.pdModal = pdModal;
  window.customElements.define('pd-modal', pdModal);
}
