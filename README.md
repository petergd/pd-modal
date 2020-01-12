# pd-bubble

A custom web component that can be used in web applications or websites. It provides a modal window container that can be used in various ways.
[![Published on webcomponents.org](https://img.shields.io/badge/webcomponents.org-published-blue.svg)](https://www.webcomponents.org/element/pd-modal)

[Demo page (by unpkg.com)](https://unpkg.com/pd-modal@1.0.0/pd-modal.html)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

`node.js`

### Installing

`$ npm install pd-modal`

## Running the tests

`npm test`

### Tests output explanation

#### pd-modal

_**modalStyles**_

_✓ checks the modal styles is a non empty object upon initialization._

_**buttonText**_

_✓ Checks that modal trigger button has default text._

_**css**_

_✓ Check the web element's css upon initialization that it is not an empty string._

_**queue**_

_✓ this is the modal queue it is an empty array [] upon initialization_

_**modalstyles**_

_✓ Check if animations will be automatic or if there is template override._

_**sRoot**_

_✓ Checks that component is attached to DOM and is equal to <pd-modal>_

_✓ check that string holds certain CSS rules relative to the @font-face declaration_

_**sRoot**_

_✓ Checks that component is attached to DOM and has empty innerHTML_

##### Array

_**indexOf()**_

_✓ should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok._


## Deployment

Add the custom element tag to your HTML page. 

The element's parameters are:

 - **contentbg** (string - default `000000`). Set only the hexadecimal value of the background colour of the content (without #). 
 - **overlaybg** (string - default `000000`). Set only the hexadecimal value of the background colour of the overlay (without #).
 - **modalstyles** (string - default `auto`). Determines if the animations that will be used will be on automatic mode or if there is template override, accepted values are `auto` and `template` on ay other occasion `auto` is used.
 - **button-text** (string - default `Open Modal Window`). The text that will be displayed in the modal trigger button.
 - **id** (string - optional). If the element has an id then the modal content will be created from `template` elements that have attribute `data-pd-modal-id` equal to the id of the element. If it is not set then the modal content will be created from `template` elements that have attribute `data-for="pd-modal"`.

**Basic Usage**

`<template data-for="pd-modal" data-modal-order="1" data-modal-id="my_modal" data-modal-style="auto">...rest of HTML here...</template><pd-modal contentbg="ff0000" overlaybg="990000" modalstyles="template" button-text="Open Multi Page Modal"></pd-modal>`

In order for the modal window to be flexible regarding the inner content in the examples below `templates` are used. The `template` or `other` web element (e.g. a custom one) should have either a `data-for` attribute that has value `pd-modal` or a `data-pd-modal-id` that matches the `id` attribute that `pd-modal` element has. Adding `CSS` inside your `template` can change the overall style of the inner content.

**Example HTML**

	<template data-for="pd-modal" data-pd-modal-id="multipage" data-modal-order="2" data-modal-id="modal2" data-modal-style="auto"><style>* { font-family: Arial; } button {background: blue; float: right; bottom: 0; margin: 1rem;} h3 {display: block; width: inherit; height: 2rem;background: blue; padding: 1rem  0;} p { font-size: 1rem; line-height: 1rem; word-spacing: .275rem; letter-spacing: .0975rem}</style><h3>Single Page Modal Header - Page 2</h3><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc libero, elementum vitae nunc in, placerat fringilla massa. Nam tempus malesuada aliquam. Vivamus a imperdiet arcu, a venenatis dolor. Vivamus tempor et felis vel congue. Sed iaculis leo eu felis tempor interdum. Etiam ut justo neque. Ut sit amet magna blandit, lacinia massa quis, porttitor sem. Fusce laoreet ante eget cursus convallis. Nulla sed felis vel libero porttitor viverra quis a odio. Integer commodo interdum lorem, vitae tempor ex tristique nec. Pellentesque aliquam, felis eget efficitur efficitur, diam velit egestas lorem, non fringilla elit velit vitae elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet finibus mi.</p></div><div><button>Action</button><button class="modal-prev">Previous</button><button class="modal-close">Close</button></div></template>	
	<template data-for="pd-modal" data-pd-modal-id="multipage" data-modal-order="1" data-modal-id="modal1" data-modal-style="auto"><style>* { font-family: Arial; } button {background: purple; float: right; bottom: 0; margin: 1rem;} h3 {display: block; width: inherit; height: 2rem;background: purple; padding: 1rem  0;} p { font-size: 1rem; line-height: 1rem; word-spacing: .275rem; letter-spacing: .0975rem}</style><h3>Single Page Modal Header - Page 1</h3><div><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam nunc libero, elementum vitae nunc in, placerat fringilla massa. Nam tempus malesuada aliquam. Vivamus a imperdiet arcu, a venenatis dolor. Vivamus tempor et felis vel congue. Sed iaculis leo eu felis tempor interdum. Etiam ut justo neque. Ut sit amet magna blandit, lacinia massa quis, porttitor sem. Fusce laoreet ante eget cursus convallis. Nulla sed felis vel libero porttitor viverra quis a odio. Integer commodo interdum lorem, vitae tempor ex tristique nec. Pellentesque aliquam, felis eget efficitur efficitur, diam velit egestas lorem, non fringilla elit velit vitae elit. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Cras sit amet finibus mi.</p></div><div><button class="modal-action" onclick="alertme()">Action</button><button class="modal-next">Next</button></div></template>	
	<template data-for="pd-modal" data-pd-modal-id="image-gallery" data-modal-order="1" data-modal-id=image1" data-modal-style="auto"><style>img { width: 100%; height: auto; } button { width: 2rem; border-radius: 0; border: none; background: transparent; font-size: 2rem; z-index: 999; position: fixed; padding: 1rem; background: rgba(0,0,0,0.65); color: #fff; height: auto; vertical-align: middle; } button.modal-prev { top: calc(50% - 1rem); left: 0; } button.modal-next { top: calc(50% - 1rem); left: calc(100% - 2rem); } button.modal-close { top: 0; height: auto; padding: 0 .5rem; left: calc(100% - 2rem); } .img-caption{ background: rgba(0,0,0,0.65); color: #fff; margin: 0 auto; width: 86.5vw; height: 10vh; padding: .5rem; font-size: 1rem; position: fixed; top: 85vh;}</style><img src="https://picsum.photos/1200/900"/><div class="img-caption">This is a caption text for this image</div><button class="modal-next">&#8250;</button><button class="modal-close">&#215;</button></div></template>	
	<template data-for="pd-modal" data-pd-modal-id="image-gallery" data-modal-order="2" data-modal-id=image2" data-modal-style="auto"><style>img { width: 100%; height: auto; } button { width: 2rem; border-radius: 0; border: none; background: transparent; font-size: 2rem; z-index: 999; position: fixed; padding: 1rem; background: rgba(0,0,0,0.65); color: #fff; height: auto; vertical-align: middle; } button.modal-prev { top: calc(50% - 1rem); left: 0; } button.modal-next { top: calc(50% - 1rem); left: calc(100% - 2rem); } button.modal-close { top: 0; height: auto; padding: 0 .5rem; left: calc(100% - 2rem); } .img-caption{ background: rgba(0,0,0,0.65); color: #fff; margin: 0 auto; width: 86.5vw; height: 10vh; padding: .5rem; font-size: 1rem; position: fixed; top: 85vh;}</style><img src="https://picsum.photos/1201/900"/><div class="img-caption">This is a caption text for this image</div><button class="modal-prev">&#8249;</button><button class="modal-next">&#8250;</button><button class="modal-close">&#215;</button></div></template>
	<template data-for="pd-modal" data-pd-modal-id="image-gallery" data-modal-order="3" data-modal-id=image3" data-modal-style="auto"><style>img { width: 100%; height: auto; } button { width: 2rem; border-radius: 0; border: none; background: transparent; font-size: 2rem; z-index: 999; position: fixed; padding: 1rem; background: rgba(0,0,0,0.65); color: #fff; height: auto; vertical-align: middle; } button.modal-prev { top: calc(50% - 1rem); left: 0; } button.modal-next { top: calc(50% - 1rem); left: calc(100% - 2rem); } button.modal-close { top: 0; height: auto; padding: 0 .5rem; left: calc(100% - 2rem); } .img-caption{ background: rgba(0,0,0,0.65); color: #fff; margin: 0 auto; width: 86.5vw; height: 10vh; padding: .5rem; font-size: 1rem; position: fixed; top: 85vh;}</style><img src="https://picsum.photos/1200/901"/><div class="img-caption">This is a caption text for this image</div><button class="modal-prev">&#8249;</button><button class="modal-close">&#215;</button></div></template>
	<pd-modal id="multipage" contentbg="ff0000" overlaybg="990000" modalstyles="template" button-text="Open Multi Page Modal"></pd-modal>

You can change the element's attributes by using Javascript and pass callbacks, for example.

	function alertme() {
		alert("modal action");
	}
	customElements.whenDefined('pd-modal').then(() => {			
		document.querySelector("pd-modal:defined").setAttribute("contentbg","323232");
		document.querySelector("pd-modal:defined").setAttribute("overlaybg","232323");
		document.querySelector("pd-modal:defined").setAttribute("modalstyles","auto");
		document.querySelector("pd-modal:defined").setAttribute("button-text","Open Image Gallery Modal");
		document.querySelector("pd-modal:defined").setAttribute("id","multipage");
		document.querySelector("pd-modal:defined").setAttribute("id","image-gallery");
	});

In addition `CSS` from index.html page of this project will be needed to be added as it is. If not provided then unicode emojis will be used instead of custom font icons. 

## Contributing

1. Fork it!
2. Create your feature branch: `git checkout -b my-new-feature`
3. Commit your changes: `git commit -am 'Add some feature'`
4. Push to the branch: `git push origin my-new-feature`
5. Submit a pull request 😁

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details

## Acknowledgments

* test-utils.js can be found in https://github.com/github/custom-element-boilerplate
