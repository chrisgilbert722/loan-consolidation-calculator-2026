import React from 'react';
import type { LoanConsolidationInput } from '../logic/loanConsolidationCalculations';

interface InputCardProps {
    values: LoanConsolidationInput;
    onChange: (field: keyof LoanConsolidationInput, value: number | boolean) => void;
}

export const InputCard: React.FC<InputCardProps> = ({ values, onChange }) => {
    return (
        <div className="card">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                {/* Total Existing Loan Balance */}
                <div>
                    <label htmlFor="totalBalance">Total Existing Loan Balance ($)</label>
                    <input
                        type="number"
                        id="totalBalance"
                        value={values.totalBalance}
                        onChange={(e) => onChange('totalBalance', parseFloat(e.target.value) || 0)}
                        min="0"
                        step="1000"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Combined balance of all loans to consolidate
                    </span>
                </div>

                {/* Weighted Average APR */}
                <div>
                    <label htmlFor="currentAPR">Weighted Average APR (%)</label>
                    <input
                        type="number"
                        id="currentAPR"
                        value={values.currentAPR}
                        onChange={(e) => onChange('currentAPR', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Average interest rate across your existing loans
                    </span>
                </div>

                {/* New Consolidated APR */}
                <div>
                    <label htmlFor="newAPR">New Consolidated APR (%)</label>
                    <input
                        type="number"
                        id="newAPR"
                        value={values.newAPR}
                        onChange={(e) => onChange('newAPR', parseFloat(e.target.value) || 0)}
                        min="0"
                        max="100"
                        step="0.01"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Interest rate on the consolidated loan
                    </span>
                </div>

                {/* Loan Term */}
                <div>
                    <label htmlFor="loanTermMonths">Loan Term (Months)</label>
                    <input
                        type="number"
                        id="loanTermMonths"
                        value={values.loanTermMonths}
                        onChange={(e) => onChange('loanTermMonths', parseInt(e.target.value) || 12)}
                        min="12"
                        max="360"
                        step="12"
                    />
                    <span style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)' }}>
                        Repayment period in months (e.g., 60 = 5 years)
                    </span>
                </div>
            </div>
        </div>
    );
};
