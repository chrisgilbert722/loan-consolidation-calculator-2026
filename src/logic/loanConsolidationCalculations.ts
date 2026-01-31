export interface LoanConsolidationInput {
    totalBalance: number;
    currentAPR: number;
    newAPR: number;
    loanTermMonths: number;
}

export interface LoanConsolidationResult {
    currentMonthlyPayment: number;
    newMonthlyPayment: number;
    monthlyPaymentDifference: number;
    currentTotalInterest: number;
    newTotalInterest: number;
    interestSaved: number;
    currentTotalCost: number;
    newTotalCost: number;
    totalCostDifference: number;
    totalBalance: number;
    currentAPR: number;
    newAPR: number;
    loanTermMonths: number;
    loanTermYears: number;
    isSavings: boolean;
    savingsMessage: string;
}

function calculateMonthlyPayment(principal: number, annualRate: number, termMonths: number): number {
    if (principal <= 0 || termMonths <= 0) return 0;
    if (annualRate === 0) return principal / termMonths;

    const monthlyRate = annualRate / 100 / 12;
    const payment = principal * (monthlyRate * Math.pow(1 + monthlyRate, termMonths)) / (Math.pow(1 + monthlyRate, termMonths) - 1);
    return payment;
}

export function calculateLoanConsolidation(input: LoanConsolidationInput): LoanConsolidationResult {
    const totalBalance = Math.max(0, input.totalBalance);
    const currentAPR = Math.max(0, Math.min(100, input.currentAPR));
    const newAPR = Math.max(0, Math.min(100, input.newAPR));
    const loanTermMonths = Math.max(1, Math.min(600, input.loanTermMonths));
    const loanTermYears = loanTermMonths / 12;

    // Calculate current loans monthly payment and total cost
    const currentMonthlyPayment = calculateMonthlyPayment(totalBalance, currentAPR, loanTermMonths);
    const currentTotalCost = currentMonthlyPayment * loanTermMonths;
    const currentTotalInterest = currentTotalCost - totalBalance;

    // Calculate consolidated loan monthly payment and total cost
    const newMonthlyPayment = calculateMonthlyPayment(totalBalance, newAPR, loanTermMonths);
    const newTotalCost = newMonthlyPayment * loanTermMonths;
    const newTotalInterest = newTotalCost - totalBalance;

    // Calculate differences
    const monthlyPaymentDifference = currentMonthlyPayment - newMonthlyPayment;
    const interestSaved = currentTotalInterest - newTotalInterest;
    const totalCostDifference = currentTotalCost - newTotalCost;

    const isSavings = monthlyPaymentDifference > 0;

    // Generate savings message
    let savingsMessage: string;
    if (totalBalance === 0) {
        savingsMessage = 'Enter your total loan balance to compare';
    } else if (currentAPR === newAPR) {
        savingsMessage = 'Same APR - no interest rate savings';
    } else if (isSavings) {
        if (monthlyPaymentDifference >= 100) {
            savingsMessage = `Could save ${Math.round(monthlyPaymentDifference)} per month by consolidating`;
        } else {
            savingsMessage = 'Lower rate reduces monthly payment';
        }
    } else if (monthlyPaymentDifference < 0) {
        savingsMessage = 'Current rate is lower than consolidated rate';
    } else {
        savingsMessage = 'Compare your loan options';
    }

    return {
        currentMonthlyPayment,
        newMonthlyPayment,
        monthlyPaymentDifference,
        currentTotalInterest,
        newTotalInterest,
        interestSaved,
        currentTotalCost,
        newTotalCost,
        totalCostDifference,
        totalBalance,
        currentAPR,
        newAPR,
        loanTermMonths,
        loanTermYears,
        isSavings,
        savingsMessage
    };
}
