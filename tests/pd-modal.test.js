import { pdModal } from "../pd-modal.js";
import { TestUtils } from "../test-utils.js";

describe("pd-modal", () => {
  describe("modalStyles", () => {
    it("checks the modal styles is a non empty object upon initialization.", () => {
        const component = new pdModal();
        expect(typeof component.modalStyles).toEqual("object");
		expect(component.modalStyles.length > 0).toBeTrue();
    });
  });
  describe("buttonText", () => {
    it("Checks that modal trigger button has default text.", () => {
        const component = new pdModal();
        expect(component.buttonText).toEqual("Open Modal Window");
    });
  });
  describe("css", () => {
    it("Check the web element's css upon initialization that it is not an empty string.", () => {
        const component = new pdModal();
        expect(typeof component.css).toBe("string");
		expect(component.css.length > 0).toBeTrue();
    });
  });
  describe("queue", () => {
    it("this is the modal queue it is an empty array [] upon initialization", () => {
        const component = new pdModal();
        expect(component.queue).toEqual([]);
    });
  });
  describe("modalstyles", () => {
    it("Check if animations will be automatic or if there is template override.", () => {
        const component = new pdModal();
        expect(component.modalstyles.length > 0).toBeTrue();
		expect(component.modalstyles).toEqual("auto"||"template");
    });
  });
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and is equal to <pd-modal>', async () => {
        const component = await TestUtils.render('pd-modal');
        expect(component.outerHTML).toEqual("<pd-modal></pd-modal>");
    });
  });  
  describe("sRoot", () => {
    it('Checks that component is attached to DOM and has empty innerHTML', async () => {
        const component = await TestUtils.render('pd-modal');
        expect(component.innerHTML.includes("")).toBeTruthy();
    });
  });   
 });
describe('Array', () => {
  describe('#indexOf()', () => {
    it('should return -1 when the value is not present. This is a demo test to check that the response from the testing framework is ok.', () => {
    assert.equal(-1, [1,2,3].indexOf(4));
    });
  });
});