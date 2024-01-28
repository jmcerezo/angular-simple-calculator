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

  onDecimalClick(): void {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  onDigitClick(digit: string): void {
    if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      this.displayValue =
        this.displayValue === '0' ? digit : this.displayValue + digit;
    }
  }

  onOperatorClick(operator: string): void {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.operator && !this.waitingForSecondOperand) {
      this.calculate();
    }

    this.operator = operator;
    this.waitingForSecondOperand = true;
  }

  onEqualClick(): void {
    if (
      this.firstOperand !== null &&
      this.operator &&
      !this.waitingForSecondOperand
    ) {
      this.calculate();
      this.operator = null;
    }
  }

  onClearClick(): void {
    this.displayValue = '0';
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  onDeleteClick(): void {
    if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  private calculate(): void {
    this.secondOperand = parseFloat(this.displayValue);

    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand! + this.secondOperand;
        break;
      case '-':
        result = this.firstOperand! - this.secondOperand;
        break;
      case '*':
        result = this.firstOperand! * this.secondOperand;
        break;
      case '/':
        result = this.firstOperand! / this.secondOperand;
        break;
      default:
        return;
    }

    this.displayValue = result.toString();
    this.firstOperand = result;
  }
}
