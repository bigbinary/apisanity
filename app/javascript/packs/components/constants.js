module.exports = {
  assertionComparisonOptions: {
    'Response JSON': ['equals', 'does not equal', 'contains', 'lesser than', 'greater than', 'is empty', 'is not empty', 'is NULL'],
    'Status Code': ['equals', 'does not equal', 'lesser than', 'greater than'],
  },
  disabledAssertionValueOptions: ['is empty', 'is not empty', 'is NULL'],
  disabledAssertionKeyOptions: ['Status Code'],
};
