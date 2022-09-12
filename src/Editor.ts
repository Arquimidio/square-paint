export class Editor{
  public wrapper: HTMLElement | null
  public width: number
  public height: number
  public pixelAmount: number
  public backgroundColor: string
  private isMouseClicked: boolean
  private _container: HTMLDivElement

  constructor({
    wrapperId = 'editor-wrapper',
    width = 600,
    height = 600,
    backgroundColor = 'black'
   } = {}){
    this.wrapper = document.getElementById(wrapperId);
    this._container = this.makeDiv('editor-container');
    this.pixelAmount = 65;
    this.width = width;
    this.height = height;
    this.backgroundColor = backgroundColor;
    this.isMouseClicked = false;

    window.addEventListener('mousedown', this.handleMouseDown.bind(this));
    window.addEventListener('mouseup', this.handleMouseUp.bind(this));
    this._container.addEventListener('mouseover', this.changePixelColor.bind(this))
  }

  get editorArea(): number {
    return this.width * this.height;
  }

  get pixelSide(): number{
    return this.width / this.pixelAmount;
  }

  get pixelArea(): number{
    return this.pixelSide ** 2;
  }

  get pixelCount(): number{
    return Math.round(this.editorArea / this.pixelArea);
  }

  makeDiv(className: string): HTMLDivElement {
    const div = document.createElement('div');
    div.className = className;
    return div;
  }
  
  addMeasureTo(
    htmlElement: HTMLElement, 
    measureKind: string, 
    measure: number
  ): void{
    if(measureKind in htmlElement.style){
      htmlElement.style[measureKind as any] = this.toPixelUnit(measure.toString());
    }
  }

  toPixelUnit(string: string){
    return `${string}px`
  }

  makePixel(): HTMLDivElement {
    const pixel = this.makeDiv('pixel'); 
    this.addMeasureTo(pixel, 'width', this.pixelSide);
    this.addMeasureTo(pixel, 'height', this.pixelSide);
    return pixel;
  }

  handleMouseClick(isClicked: boolean): void{
    this.isMouseClicked = isClicked;
  }

  handleMouseDown(event: MouseEvent): void{
    this.handleMouseClick(true);
    this.changePixelColor(event);
  }

  handleMouseUp(): void{
    this.handleMouseClick(false);
  }

  changePixelColor(event: MouseEvent): void{
    const pixel = event.target as HTMLElement;
    const targetIsPixel = pixel?.classList?.contains('pixel');

    if(targetIsPixel && this.isMouseClicked){
      pixel.style.backgroundColor = 'green';
    }
  }

  addPixelsToContainer(): void{
    for (let i = 0; i < this.pixelCount; i++) {
      const pixel = this.makePixel();
      this._container.append(pixel);
    }
  }

  defineContainerSize(): void{
    this.addMeasureTo(this._container, 'width', this.width)
    this.addMeasureTo(this._container, 'height', this.height)
  }

  setContainerBackgroundColor(){
    this._container.style.backgroundColor = this.backgroundColor;
  }
  
  displayContainer(): void{
    this.setContainerBackgroundColor()
    this.wrapper?.append(this._container);
  } 

  render(): void{
    this.addPixelsToContainer();
    this.defineContainerSize();
    this.displayContainer();
  }
}