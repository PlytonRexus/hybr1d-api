module.exports = {
    // Include param
    includeParams: function (includeString) {
        return includeString.split(',').join(' ')
    },
    // Filter param
    filterParams: function (filterString) {
        return filterString.split(',').map(v => v.split(':'))
            .reduce((accumulated, curr) => {
                return {
                    ...accumulated,
                    [curr[0]]: new RegExp(curr[1], 'i')
                }
            }, {})
    }
}
