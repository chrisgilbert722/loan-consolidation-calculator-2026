import React from 'react';
import type { LoanConsolidationInput } from '../logic/loanConsolidationCalculations';

interface ScenarioControlsProps {
    values: LoanConsolidationInput;
    onChange: (field: keyof LoanConsolidationInput, value: number | boolean) => void;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({ values, onChange }) => {
    const balanceOptions = [
        { label: '$15,000', value: 15000 },
        { label: '$30,000', value: 30000 },
        { label: '$50,000', value: 50000 },
        { label: '$75,000', value: 75000 },
    ];

    const termOptions = [
        { label: '3 Years', value: 36 },
        { label: '5 Years', value: 60 },
        { label: '7 Years', value: 84 },
        { label: '10 Years', value: 120 },
    ];

    return (
        <div className="card">
            <h3 style={{ marginBottom: 'var(--space-4)' }}>Quick Adjustments</h3>

            {/* Balance Quick Select */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
                <label style={{ marginBottom: 'var(--space-2)' }}>Total Balance</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {balanceOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('totalBalance', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.totalBalance === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.totalBalance === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.totalBalance === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Loan Term Quick Select */}
            <div>
                <label style={{ marginBottom: 'var(--space-2)' }}>Loan Term</label>
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {termOptions.map((option) => (
                        <button
                            key={option.value}
                            type="button"
                            onClick={() => onChange('loanTermMonths', option.value)}
                            style={{
                                flex: 1,
                                padding: 'var(--space-2) var(--space-3)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                border: '1px solid',
                                borderColor: values.loanTermMonths === option.value ? 'var(--color-primary)' : 'var(--color-border)',
                                borderRadius: 'var(--radius-md)',
                                background: values.loanTermMonths === option.value ? 'var(--color-primary)' : 'transparent',
                                color: values.loanTermMonths === option.value ? '#fff' : 'var(--color-text-primary)',
                                cursor: 'pointer'
                            }}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};
