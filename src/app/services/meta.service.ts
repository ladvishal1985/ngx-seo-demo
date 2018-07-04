import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';

@Injectable()
export class MetaService {

  constructor(@Inject(DOCUMENT) private document) {

  }

  getMeta(name: string): string {
    return this.document[name];
  }

  setMeta(name: string, value: string) {
    let metaTag = this.document.querySelector('meta[name="' + name + '"]');

    if (!metaTag) {
      metaTag = this.document.createElement('meta');
      metaTag.setAttribute('name', name);
      document.getElementsByTagName('HEAD')[0].appendChild(metaTag);
    }

    metaTag.setAttribute('content', value);
  }
}