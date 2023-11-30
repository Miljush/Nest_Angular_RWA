import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: ['./swiper.component.scss'],
})
export class SwiperComponent {
  @Input() images!: string[];
  @Output() imageChanged = new EventEmitter<string>();
  currentIndex: number = 0;

  get currentImage(): string {
    return this.images[this.currentIndex];
  }

  previous() {
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
    this.emitImageChanged();
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
    this.emitImageChanged();
  }

  private emitImageChanged() {
    this.imageChanged.emit(this.currentImage);
  }
}