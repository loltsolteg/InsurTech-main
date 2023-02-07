const moment = require('moment');
module.exports = {
    formatDate: function (date, targetFormat) {
        return moment(date).format(targetFormat);
    },

    radioCheck: function (value, radioValue) {
        if (value == radioValue) {
            return 'checked';
        }
        return '';
    },
    sumObj: function(list, key) {
        var foo = list.map(i => parseFloat(i[key])).reduce(
            (acc, a) => acc + a, 0
        )
        return foo
    },
    twoDP: function (value) {
        return parseFloat(value).toFixed(2)
    },
    subtract: function (val1, val2) {
        return parseFloat(parseFloat(val1) - parseFloat(val2)).toFixed(2)
    },
    setVar: function(varName, varValue, options) {
        options.data.root[varName] = varValue;
      }


};
