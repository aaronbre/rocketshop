import {accounting} from './scripts/accounting.min';

UI.registerHelper('money', function (amount) {
  return accounting.formatMoney(amount);
});
