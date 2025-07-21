import { Component, Input } from '@angular/core';
import { ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-email-input',
  standalone: true,
  templateUrl: './email-input.component.html',
  styleUrl: './email-input.component.css',
})
export class EmailInputComponent implements ControlValueAccessor {
  
  @Input() label = 'Email';

  @Input() id = '';

  @Input() disabled = false;

  @Input() email = '';

  @Input() placeholder = 'Enter your text';

  value = '';
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

