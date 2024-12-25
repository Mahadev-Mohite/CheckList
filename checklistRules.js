module.exports = [
    {
        name: "Valuation Fee Paid",
        description: "isValuationFeePaid should be true",
        evaluate: (data) => data.isValuationFeePaid === true,
    },
    {
        name: "UK Resident",
        description: "isUkResident should be true",
        evaluate: (data) => data.isUkResident === true,
    },
    {
        name: "Risk Rating Medium",
        description: "riskRating should be 'Medium'",
        evaluate: (data) => data.riskRating === "Medium",
    },
    {
        name: "LTV Below 60%",
        description: "Loan-to-Value (LTV) should be less than 60%",
        evaluate: (data) => {
            const ltv = (data.loanRequired / data.purchasePrice) * 100;
            return ltv < 60;
        },
    },
];
