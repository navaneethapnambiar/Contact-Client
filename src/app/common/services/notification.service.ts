import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(private toastr: ToastrService) {}
  showSuccess(message: string, title = 'Success'): void {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }
  showError(message: string, title = 'Error'): void {
    this.toastr.error(message, title, {
      timeOut: 5000,
      disableTimeOut: false,
    });
  }
  showInfo(message: string, title = 'Info'): void {
    this.toastr.info(message, title);
  }
  showWarning(message: string, title = 'Warning'): void {
    this.toastr.warning(message, title);
  }
}
