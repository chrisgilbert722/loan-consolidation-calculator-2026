import React from 'react';
import type { LoanConsolidationResult } from '../logic/loanConsolidationCalculations';

interface BreakdownTableProps {
    result: LoanConsolidationResult;
}

const formatMoney = (val: number) => {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(val);
};

const formatTerm = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    if (remainingMonths === 0) {
        return `${years} year${years !== 1 ? 's' : ''}`;
    }
    return `${years} year${years !== 1 ? 's' : ''}, ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
};

export const BreakdownTable: React.FC<BreakdownTableProps> = ({ result }) => {
    const currentRows = [
        { label: 'Total Loan Balance', value: formatMoney(result.totalBalance), isTotal: false },
        { label: 'Weighted Average APR', value: `${result.currentAPR.toFixed(2)}%`, isTotal: false },
        { label: 'Loan Term', value: formatTerm(result.loanTermMonths), isTotal: false },
        { label: 'Estimated Monthly Payment', value: formatMoney(result.currentMonthlyPayment), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.currentTotalInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.currentTotalCost), isTotal: true },
    ];

    const consolidatedRows = [
        { label: 'Consolidated APR', value: `${result.newAPR.toFixed(2)}%`, isTotal: false },
        { label: 'Estimated Monthly Payment', value: formatMoney(result.newMonthlyPayment), isTotal: false },
        { label: 'Estimated Total Interest', value: formatMoney(result.newTotalInterest), isTotal: false },
        { label: 'Estimated Total Cost', value: formatMoney(result.newTotalCost), isTotal: true },
    ];

    const comparisonRows = [
        { label: 'Monthly Payment Difference', value: formatMoney(result.monthlyPaymentDifference), isTotal: false },
        { label: 'Estimated Interest Saved', value: formatMoney(result.interestSaved), isTotal: false },
        { label: 'Estimated Total Savings', value: formatMoney(result.totalCostDifference), isTotal: true },
    ];

    const renderTable = (rows: Array<{ label: string; value: string; isTotal: boolean }>, isLast = false, showSavingsColor = false) => (
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9375rem' }}>
            <tbody>
                {rows.map((row, idx) => (
                    <tr key={idx} style={{
                        borderBottom: (isLast && idx === rows.length - 1) ? 'none' : '1px solid var(--color-border)',
                        backgroundColor: idx % 2 === 0 ? 'transparent' : '#F8FAFC'
                    }}>
                        <td style={{ padding: 'var(--space-3) var(--space-6)', color: 'var(--color-text-secondary)' }}>
                            {row.label}
                        </td>
                        <td style={{
                            padding: 'var(--space-3) var(--space-6)',
                            textAlign: 'right',
                            fontWeight: row.isTotal ? 700 : 400,
                            color: (showSavingsColor && row.isTotal) ? (result.totalCostDifference >= 0 ? '#166534' : '#B91C1C') : 'inherit'
                        }}>
                            {row.value}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div className="card" style={{ padding: '0' }}>
            {/* Current Loans Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)' }}>
                <h3 style={{ fontSize: '1rem' }}>Estimated Current Loan Costs</h3>
            </div>
            {renderTable(currentRows)}

            {/* Consolidated Loan Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: '#F0F9FF' }}>
                <h3 style={{ fontSize: '1rem', color: '#0369A1' }}>Estimated Consolidated Loan Costs</h3>
            </div>
            {renderTable(consolidatedRows)}

            {/* Comparison Section */}
            <div style={{ padding: 'var(--space-4) var(--space-6)', borderBottom: '1px solid var(--color-border)', borderTop: '1px solid var(--color-border)', background: result.totalCostDifference >= 0 ? '#F0FDF4' : '#FEF3C7' }}>
                <h3 style={{ fontSize: '1rem', color: result.totalCostDifference >= 0 ? '#166534' : '#92400E' }}>Estimated Savings Comparison</h3>
            </div>
            {renderTable(comparisonRows, true, true)}
        </div>
    );
};
