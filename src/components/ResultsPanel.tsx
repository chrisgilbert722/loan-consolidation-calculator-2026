import React from 'react';
import type { LoanConsolidationResult } from '../logic/loanConsolidationCalculations';

interface ResultsPanelProps {
    result: LoanConsolidationResult;
}

const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        maximumFractionDigits: 0
    }).format(val);
};

export const ResultsPanel: React.FC<ResultsPanelProps> = ({ result }) => {
    const hasSavings = result.isSavings;

    return (
        <div className="card" style={{
            background: hasSavings
                ? 'linear-gradient(to bottom, #F0FDF4, #DCFCE7)'
                : 'linear-gradient(to bottom, #FEF3C7, #FDE68A)',
            borderColor: hasSavings ? '#86EFAC' : '#FCD34D',
            boxShadow: '0 2px 8px -2px rgba(0, 0, 0, 0.1)'
        }}>
            <div className="text-center">
                <h2 style={{ fontSize: '1rem', color: 'var(--color-text-secondary)', marginBottom: 'var(--space-2)' }}>
                    Estimated Monthly Payment Difference
                </h2>
                <div style={{
                    fontSize: '2.75rem',
                    fontWeight: 800,
                    color: hasSavings ? '#166534' : '#92400E',
                    lineHeight: 1,
                    letterSpacing: '-0.025em'
                }}>
                    {hasSavings ? '-' : '+'}{formatCurrency(Math.abs(result.monthlyPaymentDifference))}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--color-text-muted)', marginTop: 'var(--space-2)' }}>
                    {result.savingsMessage}
                </div>
            </div>

            <hr style={{
                margin: 'var(--space-6) 0',
                border: 'none',
                borderTop: `1px solid ${hasSavings ? '#86EFAC' : '#FCD34D'}`
            }} />

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-2)', textAlign: 'center' }}>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>INTEREST SAVED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.interestSaved > 0 ? '#166534' : '#B91C1C' }}>
                        {formatCurrency(result.interestSaved)}
                    </div>
                </div>
                <div style={{ borderLeft: `1px solid ${hasSavings ? '#86EFAC' : '#FCD34D'}`, borderRight: `1px solid ${hasSavings ? '#86EFAC' : '#FCD34D'}` }}>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>TOTAL SAVED</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem', color: result.totalCostDifference > 0 ? '#166534' : '#B91C1C' }}>
                        {formatCurrency(result.totalCostDifference)}
                    </div>
                </div>
                <div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--color-text-muted)', fontWeight: 600 }}>NEW PAYMENT</div>
                    <div style={{ fontWeight: 700, fontSize: '1.125rem' }}>
                        {formatCurrency(result.newMonthlyPayment)}/mo
                    </div>
                </div>
            </div>
        </div>
    );
};
