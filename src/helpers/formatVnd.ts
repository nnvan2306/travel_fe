export const formatCurrencyVN = (amount: number) => {
    return Number(amount).toLocaleString('vi-VN', {
        style: 'currency',
        currency: 'VND',
    });
};
