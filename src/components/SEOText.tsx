import React from 'react';

export const SEOText: React.FC = () => {
    return (
        <div className="card" style={{ background: '#F8FAFC' }}>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', lineHeight: 1.7 }}>
                This loan consolidation calculator compares the estimated costs of multiple existing
                loans versus a single consolidated loan. Calculations assume fixed interest rates
                and consistent monthly payments over the loan term. These figures are estimates only
                and actual costs will depend on specific loan terms, fees, and individual circumstances.
                This calculator is for informational purposes and does not constitute financial guidance.
            </p>
        </div>
    );
};
