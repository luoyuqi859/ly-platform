export class ImagePool {
    size: number;
    images: HTMLImageElement[];
    counter: number;
  
    constructor(size: number) {
      this.size = size;
      this.images = [];
      this.counter = 0;
    }
  
    next(): HTMLImageElement {
      if (this.images.length < this.size) {
        const image = new Image();
        this.images.push(image);
        return image;
      } else {
        if (this.counter >= this.size) {
          // Reset for unlikely but theoretically possible overflow.
          this.counter = 0;
        }
      }
  
      return this.images[this.counter++ % this.size];
    }
  }