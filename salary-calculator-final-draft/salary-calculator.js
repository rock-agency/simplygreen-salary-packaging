// Constants for calculations
const SP_FEE = 199.00;
const TYPE_2_GROSS_UP_RATE = 1.8868;
const REBATEABLE_SHORTCUT_RATE = 0.47;

const TAX_BRACKETS = [
  { threshold: 0, rate: 0, fixed: 0 },
  { threshold: 18200, rate: 0.16, fixed: 0 },
  { threshold: 45000, rate: 0.30, fixed: 4288 },
  { threshold: 135000, rate: 0.37, fixed: 31288 },
  { threshold: 190000, rate: 0.45, fixed: 51638 }
];

const HECS_RATES = [
  { threshold: 0, rate: 0 },
  { threshold: 54435, rate: 0.01 },
  { threshold: 62851, rate: 0.02 },
  { threshold: 66621, rate: 0.025 },
  { threshold: 70619, rate: 0.03 },
  { threshold: 74856, rate: 0.035 },
  { threshold: 79347, rate: 0.04 },
  { threshold: 84108, rate: 0.045 },
  { threshold: 89155, rate: 0.05 },
  { threshold: 94504, rate: 0.055 },
  { threshold: 100175, rate: 0.06 },
  { threshold: 106186, rate: 0.065 },
  { threshold: 112557, rate: 0.07 },
  { threshold: 119310, rate: 0.075 },
  { threshold: 126468, rate: 0.08 },
  { threshold: 134057, rate: 0.085 },
  { threshold: 142101, rate: 0.09 },
  { threshold: 150627, rate: 0.095 },
  { threshold: 159664, rate: 0.10 }
];

const MEDICARE_THRESHOLDS = [
  { threshold: 0, rate: 0 },
  { threshold: 26000, rate: 0.02 }
];

// Calculation functions
function calculatePAYG(income) {
  const bracket = TAX_BRACKETS.findLast(b => income >= b.threshold) || TAX_BRACKETS[0];
  const variableComponent = (income - bracket.threshold);
  const medicare = calculateMedicare(income);
  const payg = variableComponent * bracket.rate + bracket.fixed + medicare;
  return payg;
}

function calculateMedicare(income) {
  return MEDICARE_THRESHOLDS.reduce((acc, threshold) => {
    return income > threshold.threshold ? income * threshold.rate : acc;
  }, 0);
}

function calculateHECS(income, hasHECS, totalPackagedAmount) {
  if (!hasHECS) return 0;
  const hecsAssessableIncome = income + (totalPackagedAmount * TYPE_2_GROSS_UP_RATE);
  return HECS_RATES.reduce((acc, rate) => {
    return hecsAssessableIncome > rate.threshold ? hecsAssessableIncome * rate.rate : acc;
  }, 0);
}

function formatCurrencyValueAUS(value) {
  return new Intl.NumberFormat('en-AU', {
    style: 'currency',
    currency: 'AUD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
}

function formatCurrencyObjAus(obj) {
  return Object.fromEntries(Object.entries(obj).map(([key, value]) => [key, formatCurrencyValueAUS(
    value)]));
}

// TODO: want to refactor this so that you just have one calculation function perhaps
function calculateCurrent(salary, hasHECS) {
  const payg = calculatePAYG(salary);

  // TODO: come back and clean this up 
  const generalLiving = 0;
  const mealEntertainment = 0;
  const spFee = 0;
  const fbt = 0
  const hecs = calculateHECS(salary, hasHECS, 0);
  const netPay = salary - payg - hecs;
  const taxableIncome = salary - generalLiving - mealEntertainment - spFee;

  const data = {
    grossSalary: salary,
    generalLivingExpenses: generalLiving,
    mealEntertainment: mealEntertainment,
    fbt: fbt,
    spFeePaid: spFee,
    taxableIncome: taxableIncome,
    paygPayment: payg,
    hecsPayment: hecs,
    netPayment: netPay,
    salaryPackagingPayments: 0,
    totalTakeHome: netPay + 0
  }
  return data;

}

function calculateTotals(salary, generalLiving, mealEntertainment, hasHECS, employerType) {
  let fbt = 0;

  if (employerType === "Rebateable Employer") {
    fbt = (generalLiving + mealEntertainment) * REBATEABLE_SHORTCUT_RATE;
  } else {
    fbt = 0;
  }

  const taxableIncome = salary - (generalLiving + mealEntertainment) - fbt - SP_FEE;
  const payg = calculatePAYG(taxableIncome);
  const totalPackagedAmount = generalLiving + mealEntertainment;
  const hecs = calculateHECS(taxableIncome, hasHECS, totalPackagedAmount);
  const netPay = taxableIncome - payg - hecs;
  const salaryPackagingPayments = generalLiving + mealEntertainment;
  const totalTakeHome = netPay + salaryPackagingPayments;

  const data = {
    grossSalary: salary,
    generalLivingExpenses: generalLiving,
    mealEntertainment: mealEntertainment,
    spFeePaid: SP_FEE,
    fbt: fbt,
    taxableIncome: taxableIncome,
    paygPayment: payg,
    hecsPayment: hecs,
    netPayment: netPay,
    salaryPackagingPayments: salaryPackagingPayments,
    totalTakeHome: totalTakeHome
  }
  return data;
}

function calculateSavings(salary, generalLiving, mealEntertainment, hasHECS, employerType) {
  const totals = calculateTotals(salary, generalLiving, mealEntertainment, hasHECS, employerType);
  const current = calculateCurrent(salary, hasHECS);

  return {
    totals: formatCurrencyObjAus(totals),
    current: formatCurrencyObjAus(current),
    // annualSavings: formatCurrencyValueAUS(Math.max(0, totals.totalTakeHome - current.totalTakeHome)), // if you want to floor at 0
    annualSavings: formatCurrencyValueAUS(totals.totalTakeHome - current.totalTakeHome),
    annualAdditionalHecsContrib: hasHECS ? formatCurrencyValueAUS(totals.hecsPayment - current
      .hecsPayment) : 0
  }
}

// debug
// const res = calculateSavings(100000, 15900, 2650, false, 'Public Benevolent Institution');
// const res = calculateSavings(100000, 15900, 2650, false, "Rebatable Employer");
// console.log(res);
