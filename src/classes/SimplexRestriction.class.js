export default class SimplexRestriction {
    x_n = [];
    symbol = '<=';
    equal = '';

    constructor(n_vars)
    {
        this.x_n = Array(Number(n_vars)).fill('');
    }
}
