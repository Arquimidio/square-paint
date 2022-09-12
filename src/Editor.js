export class Editor {
    constructor({ wrapperId = 'editor-wrapper', width = 600, height = 600, backgroundColor = 'black' } = {}) {
        this.wrapper = document.getElementById(wrapperId);
        this._container = this.makeDiv('editor-container');
        this.pixelAmount = 65;
        this.width = width;
        this.height = height;
        this.backgroundColor = backgroundColor;
        this.isMouseClicked = false;
        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('mouseup', this.handleMouseUp.bind(this));
        this._container.addEventListener('mouseover', this.changePixelColor.bind(this));
    }
    get editorArea() {
        return this.width * this.height;
    }
    get pixelSide() {
        return this.width / this.pixelAmount;
    }
    get pixelArea() {
        return this.pixelSide ** 2;
    }
    get pixelCount() {
        return Math.round(this.editorArea / this.pixelArea);
    }
    makeDiv(className) {
        const div = document.createElement('div');
        div.className = className;
        return div;
    }
    addMeasureTo(htmlElement, measureKind, measure) {
        if (measureKind in htmlElement.style) {
            htmlElement.style[measureKind] = this.toPixelUnit(measure.toString());
        }
    }
    toPixelUnit(string) {
        return `${string}px`;
    }
    makePixel() {
        const pixel = this.makeDiv('pixel');
        this.addMeasureTo(pixel, 'width', this.pixelSide);
        this.addMeasureTo(pixel, 'height', this.pixelSide);
        return pixel;
    }
    handleMouseClick(isClicked) {
        this.isMouseClicked = isClicked;
    }
    handleMouseDown(event) {
        this.handleMouseClick(true);
        this.changePixelColor(event);
    }
    handleMouseUp() {
        this.handleMouseClick(false);
    }
    changePixelColor(event) {
        var _a;
        const pixel = event.target;
        const targetIsPixel = (_a = pixel === null || pixel === void 0 ? void 0 : pixel.classList) === null || _a === void 0 ? void 0 : _a.contains('pixel');
        if (targetIsPixel && this.isMouseClicked) {
            pixel.style.backgroundColor = 'green';
        }
    }
    addPixelsToContainer() {
        for (let i = 0; i < this.pixelCount; i++) {
            const pixel = this.makePixel();
            this._container.append(pixel);
        }
    }
    defineContainerSize() {
        this.addMeasureTo(this._container, 'width', this.width);
        this.addMeasureTo(this._container, 'height', this.height);
    }
    setContainerBackgroundColor() {
        this._container.style.backgroundColor = this.backgroundColor;
    }
    displayContainer() {
        var _a;
        this.setContainerBackgroundColor();
        (_a = this.wrapper) === null || _a === void 0 ? void 0 : _a.append(this._container);
    }
    render() {
        this.addPixelsToContainer();
        this.defineContainerSize();
        this.displayContainer();
    }
}
