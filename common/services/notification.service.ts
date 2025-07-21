import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  /**
   * Injects the `ToastrService` from ngx-toastr.
   *  toastr: Angular wrapper for toastr.js
   */
  constructor(private toastr: ToastrService) {}

  /**
   * Displays a success notification.
   *  message: The message to display.
   *  title: Optional title for the toast (default: 'Success').
   */
  showSuccess(message: string, title = 'Success'): void {
    this.toastr.success(message, title, {
      timeOut: 3000,
      progressBar: true,
      closeButton: true,
    });
  }

  /**
   * Displays an error notification.
   * message: The message to display.
   * title: Optional title for the toast (default: 'Error').
   */
  showError(message: string, title = 'Error'): void {
    this.toastr.error(message, title, {
      timeOut: 5000,
      disableTimeOut: false,
    });
  }

  /**
   * Displays an informational notification.
   *  message: The message to display.
   *  title: Optional title for the toast (default: 'Info').
   */
  showInfo(message: string, title = 'Info'): void {
    this.toastr.info(message, title);
  }

  /**
   * Displays a warning notification.
   *  message: The message to display.
   *  title: Optional title for the toast (default: 'Warning').
   */
  showWarning(message: string, title = 'Warning'): void {
    this.toastr.warning(message, title);
  }
}
