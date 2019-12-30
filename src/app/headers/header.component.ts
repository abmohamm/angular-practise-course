import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
   isUserAuthenticated = false;
   private authListenerSubscription: Subscription;
   constructor(private authService: AuthService) { }

   ngOnInit() {
     this.authListenerSubscription = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
        this.isUserAuthenticated = isAuthenticated;
     });
   }

   ngOnDestroy(): void {
    this.authListenerSubscription.unsubscribe();
   }


}