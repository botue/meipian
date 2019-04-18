import { Component, ElementRef } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import {injectStyles} from 'shadow-dom-inject-styles';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})

export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private el: ElementRef
  ) {
    this.initializeApp();
  }

  ngOnInit() {

    setTimeout(() => {

      let tabbutton = (this.el.nativeElement.querySelector('ion-tabs > ion-tab-bar> ion-tab-button:nth-child(3)') as HTMLElement);
      const styles = `
        a {
          overflow: visible;
        }
      `;

      injectStyles(tabbutton, 'a', styles);

    }, 200)

  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
