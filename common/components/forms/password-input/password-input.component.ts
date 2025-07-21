import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-password-input',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './password-input.component.html',
  styleUrl: './password-input.component.css',
})
export class PasswordInputComponent implements ControlValueAccessor {

  @Input() label = 'Password';

  @Input() placeholder = '';

  @Input() id = '';

  @Input() disabled = false;

  @Input() name = '';

  value = '';

  showPassword = false;

  togglePassword() {
    this.showPassword = !this.showPassword;
  }


  onIconKeyDown(event: KeyboardEvent): void {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      this.togglePassword();
    }
  }

  writeValue(obj: string): void {
    this.value = obj;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onTouched: () => void = () => {
    return;
  };

  onChange: (value: string) => void = () => {
    return;
  };

  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }
}
