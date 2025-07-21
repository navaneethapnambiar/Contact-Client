import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { AbstractControl } from '@angular/forms';


@Component({
  selector: 'app-field-errors',
  standalone: true,
  templateUrl: './field-errors.component.html',
  styleUrl: './field-errors.component.css',
})
export class FieldErrorsComponent implements OnInit, OnDestroy {
  @Input() control: AbstractControl | null = null;
  errorsList: string[] = [];
  private statusChangesSub?: Subscription;

  ngOnInit() {
    if (this.control) {
      this.statusChangesSub = this.control.statusChanges.subscribe(() => {
        this.updateErrors();
      });
    }
    this.updateErrors();
  }

  ngOnDestroy(): void {
    this.statusChangesSub?.unsubscribe();
  }

  shouldShowErrors(): boolean {
    return (
      !!this.control &&
      !!this.control.errors &&
      (this.control.touched || this.control.dirty)
    );
  }

  private updateErrors(): void {
    this.errorsList = [];

    if (!this.control?.errors) return;

    for (const [errorKey, errorValue] of Object.entries(this.control.errors)) {
      const message = this.getErrorMessage(errorKey, errorValue);
      this.errorsList.push(message);
    }
  }

  private getErrorMessage(errorKey: string, errorValue: unknown): string {
    if (errorKey === 'minlength' && this.isLengthError(errorValue)) {
      return `Minimum length is ${errorValue.requiredLength} characters.`;
    }

    if (errorKey === 'maxlength' && this.isLengthError(errorValue)) {
      return `Maximum length is ${errorValue.requiredLength} characters.`;
    }

    if (errorKey === 'min' && this.isMinMaxError(errorValue)) {
      const minError = errorValue as { min: number; actual: number };
      return `Minimum value is ${minError.min}.`;
    }

    if (errorKey === 'max' && this.isMinMaxError(errorValue)) {
      const maxError = errorValue as { max: number; actual: number };
      return `Maximum value is ${maxError.max}.`;
    }

    if (errorKey === 'requiredTrue') {
      return 'You must agree before submitting.';
    }

    if (errorKey === 'mismatch') {
      return 'Passwords do not match.';
    }

    if (typeof errorValue === 'string') {
      return errorValue;
    }

    const staticMessages: Record<string, string> = {
      required: 'This field is required.',
      email: 'Enter a valid email address.',
      pattern: 'Invalid format.',
    };

    return staticMessages[errorKey] || 'Invalid field.';
  }

  // Type guards
  private isLengthError(
    val: unknown
  ): val is { requiredLength: number; actualLength: number } {
    return (
      typeof val === 'object' &&
      val !== null &&
      'requiredLength' in val &&
      'actualLength' in val
    );
  }

  private isMinMaxError(
    val: unknown
  ): val is { min: number; actual: number } | { max: number; actual: number } {
    return (
      typeof val === 'object' && val !== null && ('min' in val || 'max' in val)
    );
  }
}