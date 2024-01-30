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
    else if (this.displayValue.length > 1) {
      this.displayValue = this.displayValue.slice(0, -1);
    } else {
      this.displayValue = '0';
    }
  }

  onDigitClick(digit: string): void {
    if (this.displayValueIsNaN()) return;
    else if (this.waitingForSecondOperand) {
      this.displayValue = digit;
      this.waitingForSecondOperand = false;
    } else {
      const value = this.displayValue + digit;
      this.displayValue = this.displayValue === '0' ? digit : value;
    }
  }

  onEqualClick(): void {
    if (this.firstOperand !== null && this.operator !== null) {
      this.calculate();
    }

    this.operator = null;
  }

  onNegativeClick() {
    if (this.displayValueIsNaN()) return;
    else if (this.displayValue === '0') return;
    else if (!this.displayValue.includes('-')) {
      this.displayValue = '-' + this.displayValue;
    } else {
      this.displayValue = this.displayValue.slice(1);
    }
  }

  onOperatorClick(operator: string): void {
    if (!this.displayValueIsNaN()) {
      if (this.firstOperand === null) {
        this.firstOperand = parseFloat(this.displayValue);
      } else if (this.operator !== null && !this.waitingForSecondOperand) {
        this.calculate();
      } else if (this.operator !== null && this.firstOperand !== null) {
        this.waitingForSecondOperand = false;
        this.calculate();
      }
    }

    this.operator = operator;
    this.waitingForSecondOperand = true;
  }

  private displayValueIsNaN(): boolean {
    return isNaN(parseFloat(this.displayValue));
  }

  private displayError(): void {
    this.displayValue = 'Error';
    this.firstOperand = null;
    this.secondOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
    return;
  }

  private calculate(): void {
    if (this.firstOperand !== null) {
      this.secondOperand = parseFloat(this.displayValue);
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
          if (this.secondOperand === 0) this.displayError();
          result = this.firstOperand / this.secondOperand;
          break;
        default:
          return;
      }

      if (isNaN(result)) this.displayError();
      else {
        this.displayValue = '0';
        this.firstOperand = result;
      }
    }
  }
}
