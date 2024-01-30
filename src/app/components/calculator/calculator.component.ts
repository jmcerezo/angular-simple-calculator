import { Component } from '@angular/core';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css',
})
export class CalculatorComponent {
  title = 'Angular Simple Calculator';
  displayValue: string = '0';
  firstOperand: number | null = null;
  secondOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  onClearClick(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  onDecimalClick(): void {
    if (!this.displayValue.includes('.') && !this.displayValueIsNaN()) {
      this.displayValue += '.';
    }
  }

  onDeleteClick(): void {
    if (this.displayValueIsNaN()) return;

    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  onDigitClick(digit: string): void {
    if (this.displayValueIsNaN()) return;

    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      const value = this.displayValue + digit;
      this.displayValue = this.displayValue === '0' ? digit : value;
    }
  }

  onEqualClick(): void {
    if (this.operator !== null) {
      this.calculate();
    }

    this.operator = null;
  }

  onNegativeClick() {
    if (this.displayValueIsNaN() || this.displayValue === '0') return;

    this.displayValue = this.displayValue.includes('-')
      ? this.displayValue.slice(1)
      : '-' + this.displayValue;
  }

  onOperatorClick(operator: string): void {
    if (this.displayValueIsNaN()) return;

    if (this.firstOperand === null) {
      this.firstOperand = Number(this.displayValue);
    } else {
      this.calculate();
    }

    this.operator = operator;
    this.waitingForSecondOperand = true;
  }

  private displayValueIsNaN(): boolean {
    return isNaN(Number(this.displayValue));
  }

  private displayErrorAndResetValues(): void {
    this.displayValue = 'Error: Division by zero';
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  private calculate(): void {
    if (this.firstOperand === null) return;

    this.secondOperand = Number(this.displayValue);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand + this.secondOperand;
        break;
      case '-':
        result = this.firstOperand - this.secondOperand;
        break;
      case '*':
        result = this.firstOperand * this.secondOperand;
        break;
      case '/':
        if (this.secondOperand === 0) this.displayErrorAndResetValues();
        result = this.firstOperand / this.secondOperand;
        break;
      default:
        return;
    }

    if (!isNaN(result)) {
      this.displayValue = '0';
      this.firstOperand = result;
    }
  }
}
