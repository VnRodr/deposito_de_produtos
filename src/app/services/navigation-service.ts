import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class NavigationService {
  constructor(private router: Router) {}

  goBackToHome(): void {
    this.router.navigate(['/']);
  }

  goToPage(path: string): void {
    this.router.navigate(['/' + path]);
  }

  goToPageWithCustomName(path: string, customName: string) {
    this.router.navigate(['/' + path, customName]);
  }
}
