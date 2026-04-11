import {
  Component,
  Input,
  forwardRef,
  HostListener,
  ElementRef,
  inject,
  signal,
  computed
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { CommonModule } from '@angular/common';

export interface SelectOption {
  label: string;
  value: any;
}

@Component({
  selector: 'zard-select',
  standalone: true,
  imports: [CommonModule],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ZardSelectComponent),
      multi: true
    }
  ],
  template: `
    <div class="relative w-full z-10" #dropdownWrapper>
      <!-- Select Button -->
      <button
        type="button"
        (click)="toggleOpen()"
        [disabled]="disabled()"
        [class]="buttonClass"
        [class.ring-2]="isOpen()"
        [class.ring-primary]="isOpen()"
        [class.border-primary]="isOpen()"
      >
        <span class="block text-left truncate flex-1" [class.text-stone-400]="isPlaceholder()">
          {{ displayLabel() }}
        </span>
        <span class="material-symbols-outlined shrink-0 text-[20px] text-stone-500 transition-transform duration-200"
              [class.rotate-180]="isOpen()">expand_more</span>
      </button>

      <!-- Dropdown Menu -->
      @if (isOpen()) {
        <div class="absolute z-[100] mt-1.5 w-full bg-surface-container-lowest border border-outline-variant/10 rounded-xl shadow-[0_12px_40px_rgba(0,0,0,0.12)] py-1.5 overflow-hidden origin-top focus:outline-none">
          <ul class="max-h-60 overflow-y-auto focus:outline-none py-1">
            @for (option of options; track option.value) {
              <li
                (click)="selectOption(option)"
                class="relative cursor-pointer select-none py-2.5 pl-10 pr-4 text-sm font-semibold transition-colors hover:bg-emerald-50 hover:text-emerald-800"
                [class.text-emerald-700]="option.value === internalValue()"
                [class.bg-emerald-50]="option.value === internalValue()"
                [class.text-on-surface]="option.value !== internalValue()"
              >
                <span class="block truncate">{{ option.label }}</span>
                @if (option.value === internalValue()) {
                  <span class="absolute inset-y-0 left-0 flex items-center pl-3 text-emerald-600">
                    <span class="material-symbols-outlined text-[18px] font-bold">check</span>
                  </span>
                }
              </li>
            }
          </ul>
        </div>
      }
    </div>
  `
})
export class ZardSelectComponent implements ControlValueAccessor {
  @Input() options: SelectOption[] = [];
  @Input() placeholder: string = 'Select an option';
  @Input() buttonClass: string = 'w-full flex items-center justify-between bg-surface-container-highest border-none rounded-lg px-4 py-3 font-headline text-base outline-none focus:ring-0 focus:border-[2px] focus:border-primary transition-all shadow-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed';

  private elementRef = inject(ElementRef);
  
  isOpen = signal(false);
  internalValue = signal<any>(null);
  disabled = signal(false);

  isPlaceholder = computed(() => {
    const val = this.internalValue();
    return val === null || val === undefined || val === '';
  });

  displayLabel = computed(() => {
    const val = this.internalValue();
    if (val === null || val === undefined || val === '') return this.placeholder;
    const found = this.options.find(o => o.value === val);
    return found ? found.label : this.placeholder;
  });

  onChange: any = () => {};
  onTouch: any = () => {};

  toggleOpen() {
    if (!this.disabled()) {
      this.isOpen.update(v => !v);
      this.onTouch();
    }
  }

  selectOption(option: SelectOption) {
    this.internalValue.set(option.value);
    this.onChange(option.value);
    this.isOpen.set(false);
  }

  @HostListener('document:click', ['$event'])
  clickOutside(event: Event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.isOpen.set(false);
    }
  }

  writeValue(obj: any): void {
    this.internalValue.set(obj);
  }
  
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  
  setDisabledState?(isDisabled: boolean): void {
    this.disabled.set(isDisabled);
  }
}
