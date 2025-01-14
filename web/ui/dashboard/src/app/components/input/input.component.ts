import { Component, Directive, ElementRef, forwardRef, Input, OnInit, Optional } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from '../tooltip/tooltip.component';

/* ================== Input directive ================== */
@Directive({
	selector: '[convoy-input]',
	standalone: true,
	host: {
		class: 'transition-all duration-[.3s] w-full font-normal text-12 placeholder:text-new.gray-300 text-new.gray-600 border border-new.gray-200 disabled:text-new.gray-400 disabled:border-new.primary-25 hover:border-new.primary-100 focus:border-new.primary-300 outline-none rounded-4px placeholder:text-14 bg-white-100 py-12px px-16px appearance-none',
		'[ngClass]': "{ 'pointer-events-none': readonly, 'appearance-none': type !== 'password' }"
	}
})
export class InputDirective implements OnInit {
	type!: string;
	showLoginPassword = false;

	constructor(private element: ElementRef) {}

	ngOnInit(): void {
		this.type = this.element.nativeElement.getAttribute('type');
	}
}

/* ================== Input field directive ================== */
@Directive({
	selector: 'convoy-input-field, [convoy-input-field]',
	standalone: true,
	host: {
		class: 'w-full relative mb-24px block',
		'[class]': 'class'
	}
})
export class InputFieldDirective {
	@Input('className') class!: string;
}

/* ================== Password input component ================== */
@Component({
	selector: 'convoy-password-field',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="w-full relative">
			<ng-content></ng-content>
		</div>
	`
})
export class PasswordInputFieldComponent implements OnInit {
	ngOnInit(): void {}
}

/* ================== Input error component ================== */
@Component({
	selector: 'convoy-input-error',
	standalone: true,
	imports: [CommonModule],
	template: `
		<div class="flex items-center text-12 text-danger-100 mt-8px">
			<img src="assets/img/input-error-icon.svg" class="mr-6px w-16px" alt="input error icon" />
			<span><ng-content></ng-content></span>
		</div>
	`
})
export class InputErrorComponent implements OnInit {
	constructor() {}

	ngOnInit(): void {}
}

/* ================== Input label component ================== */
@Component({
	selector: 'convoy-label, [convoy-label]',
	standalone: true,
	imports: [CommonModule, TooltipComponent],
	host: {
		class: 'w-full text-12 text-new.gray-500 mb-8px flex items-center justify-between'
	},
	template: `
		<div class="flex items-center">
			<ng-content></ng-content>
			<convoy-tooltip *ngIf="tooltip" class="ml-4px" size="sm">{{ tooltip }}</convoy-tooltip>
		</div>
		<span *ngIf="required === 'true'" class="text-10 text-new.gray-400 px-6px rounded-22px font-medium bg-new.gray-100">required</span>
	`,
	styleUrls: ['./input.component.scss']
})
export class LabelComponent implements OnInit {
	@Optional() @Input('tooltip') tooltip!: string;
	@Optional() @Input('required') required: 'false' | 'true' = 'false';

	constructor() {}

	ngOnInit(): void {}
}
