import { HttpInterceptor, HttpRequest, HttpHandler, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { ErrorComponent } from './error/error.component';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    public constructor(private dialog: MatDialog) {}

    intercept(request: HttpRequest<any>, next: HttpHandler) {

        return next.handle(request).pipe(
          catchError((error: HttpErrorResponse) => {
            this.dialog.open(ErrorComponent);
            console.log(error);
            alert(error.error.error.message);
            return throwError(error);
          })
        );
    }
}
