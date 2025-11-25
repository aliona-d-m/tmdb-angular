import { NgClass } from '@angular/common';
import { Component, input, signal } from '@angular/core';

interface ImgI {
  src?: string,
  alt?: string,
  class?: string
}

@Component({
  selector: 'app-lazy-image',
  imports: [NgClass],
  standalone: true,
  templateUrl: './lazy-image.html',
  styleUrl: './lazy-image.css',
})
export class LazyImage {
  img = input.required<ImgI>();

  imgLoaded = signal(false);

  onImgLoad() {
    this.imgLoaded.set(true);
  }
}
