import { Component, OnDestroy } from '@angular/core';
import {
  IonImg,
  IonFab,
  IonFabButton,
  IonIcon,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  Platform,
} from '@ionic/angular/standalone';
import {
  BarcodeScanner,
  BarcodeFormat,
} from '@capacitor-mlkit/barcode-scanning';
import { NavigationStart, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { barcodeOutline } from 'ionicons/icons';

const SCANNING_URL_HASH = 'scanning';

@Component({
  selector: 'app-rate',
  templateUrl: 'rate.page.html',
  styleUrls: ['rate.page.scss'],
  imports: [
    IonImg,
    IonFab,
    IonFabButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
  ],
})
export class RatePage implements OnDestroy {
  private routerSub: Subscription;
  private backButtonSub: Subscription;

  constructor(
    private readonly router: Router,
    private platform: Platform,
  ) {
    this.routerSub = this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        if (!event.url.includes(`#${SCANNING_URL_HASH}`)) {
          this.stopScan();
        }
      }
    });

    this.backButtonSub = this.platform.backButton.subscribeWithPriority(
      10,
      () => {
        if (window.location.hash === `#${SCANNING_URL_HASH}`) {
          this.router.navigate([], { fragment: undefined });
        }
      },
    );

    addIcons({ barcodeOutline });
  }

  async scan(): Promise<void> {
    document.body.style.display = 'none';
    this.router.navigate([], { fragment: SCANNING_URL_HASH });

    await BarcodeScanner.addListener('barcodesScanned', async (result) => {
      console.log(result.barcodes);
      if (result.barcodes[0].rawValue) {
        this.stopScan();
        this.router.navigate([`/home/rate/${result.barcodes[0].rawValue}`]);
      }
    });

    await BarcodeScanner.startScan({ formats: [BarcodeFormat.Ean13] });
  }

  async stopScan(): Promise<void> {
    document.body.style.display = '';
    await BarcodeScanner.removeAllListeners();
    await BarcodeScanner.stopScan();
  }

  ngOnDestroy(): void {
    this.routerSub.unsubscribe();
    this.backButtonSub.unsubscribe();
  }
}
