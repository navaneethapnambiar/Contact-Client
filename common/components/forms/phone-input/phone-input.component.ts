import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-phone-input',
  imports: [FormsModule, CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => PhoneInputComponent),
      multi: true,
    },
  ],
  standalone: true,
  templateUrl: './phone-input.component.html',
  styleUrl: './phone-input.component.css',
})
export class PhoneInputComponent implements ControlValueAccessor {
  /**
   * Whether to show the country code prefix (+) in the input field.
   */
  @Input() showCountryCode = true;

  /**
   * Label displayed above the input field.
   */
  @Input() label = 'Phone Number';

  /**
   * HTML `id` attribute for the input element.
   */
  @Input() id = '';

  /**
   * Indicates whether the input should be disabled.
   */
  @Input() disabled = false;

  /**
   * HTML `name` attribute for the input element.
   */
  @Input() name = '';

  /**
   * The placeholder text displayed inside the textarea.
   */
  @Input() placeholder = 'Enter your Number';

  /**
   * Internal value of the phone input.
   */
  value = '';

  /**
   * Writes a new value from the form model into the view.
   *
   * The new value to set in the input.
   */
  writeValue(obj: string): void {
    this.value = obj;
  }

  /**
   * Registers a callback function to be called when the input value changes.
   *
   * The change handler.
   */
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  /**
   * Registers a callback function to be called when the input is touched.
   *
   * The touched handler.
   */
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  /**
   * Sets the disabled state of the component.
   *
   * Whether the input should be disabled.
   */
  setDisabledState?(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  /**
   * Placeholder function for touch event, replaced via `registerOnTouched`.
   */
  onTouched: () => void = () => {
    return;
  };

  /**
   * Placeholder function for change event, replaced via `registerOnChange`.
   */
  onChange: (value: string) => void = () => {
    return;
  };

  /**
   * Handles input changes from the DOM.
   * Updates internal value and notifies Angular form control.
   *
   * The DOM input event.
   */
  onInput(event: Event) {
    this.value = (event.target as HTMLInputElement).value;
    this.onChange(this.value);
    this.onTouched();
  }
}
