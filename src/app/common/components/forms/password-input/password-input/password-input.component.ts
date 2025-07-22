import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: "app-password-input",
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PasswordInputComponent),
      multi: true,
    },
  ],
  templateUrl: "./password-input.component.html",
  styleUrl: "./password-input.component.css",
})
export class PasswordInputComponent implements ControlValueAccessor {
  /** Label text displayed above the input */
  @Input() label = "Password";

  /** Placeholder text shown inside the input field */
  @Input() placeholder = "";

  /** ID used to bind the input and label */
  @Input() id = "";

  /** Whether the input field is disabled */
  @Input() disabled = false;

  /** Name attribute of the input field */
  @Input() name = "";

  /** Current value of the input field */
  value = "";

  /** Toggles visibility of the password */
  showPassword = false;

  /** Toggles the password field type between 'password' and 'text' */
  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  /**
   * Allows keyboard access to the toggle icon.
   * Toggles password visibility on Enter or Space.
   */
  onIconKeyDown(event: KeyboardEvent): void {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      this.togglePassword();
    }
  }

  /** Sets the input value from the form model */
  writeValue(obj: string): void {
    this.value = obj;
  }

  /** Registers a callback for when the input value changes */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /** Registers a callback for when the input is touched (blurred) */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /** Enables or disables the input field */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /** Called when the input field loses focus */
  onTouched: () => void = () => {
    return;
  };

  /** Called when the input value changes */
  onChange: (value: string) => void = () => {
    return;
  };

  /**
   * Handles input events: updates value and notifies form control
   */
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }
}

