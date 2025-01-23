let currentStep = 1;
const totalSteps = 6;
let userInputs = {
  employerType: '',
  annualIncome: '',
  hecsDebt: '',
  generalLivingExpenses: '',
  mealEntertainmentExpenses: ''
};

// debug utils
const debug = false;
if (debug) {
  currentStep = 1;
  userInputs = {
    // employerType: 'Public Benevolent Institution',
    employerType: 'Rebateable Employer',
    annualIncome: '100000',
    hecsDebt: 'yes',
    generalLivingExpenses: '15900',
    mealEntertainmentExpenses: '2650'
  };
}

const step1Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">STEP 01</div>
        <h1>Choose Your Employer Type</h1>
        <p>Choose an Employer Type that best describes your organisation *</p>
      </div>
      <div class="step-functionality">
        <div class="step-functionality-content">
          <div class="form-elements-wrapper">
            <div class="select-wrapper">
              <label for="organisation-type">Your Organisation Type</label>
              <select id="organisation-type" class="native-select">
                <option value="">Select one...</option>
                <option value="pbi">Public Benevolent Institution</option>
                <option value="rebateable">Rebateable Employer</option>
              </select>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <button class="back-button" disabled>Back</button>
          <button class="next-button">Next</button>
        </div>
      </div>
    </div>
  `;

const step2Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">STEP 02</div>
        <h1>Enter your Annual Gross Income</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.</p>
      </div>
      <div class="step-functionality">
        <div class="step-functionality-content">
          <div class="form-elements-wrapper">
            <div class="input-wrapper">
              <label>Annual Gross Income</label>
              <input type="number" class="number-input" placeholder="Enter amount" min="0">
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <button class="back-button">Back</button>
          <button class="next-button">Next</button>
        </div>
      </div>
    </div>
  `;

const step3Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">STEP 03</div>
        <h1>Do you have HECS/HELP debt?</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet.</p>
      </div>
      <div class="step-functionality">
        <div class="step-functionality-content">
          <div class="form-elements-wrapper">
            <div class="radio-wrapper">
              <label>Do you have HECS/HELP debt?</label>
              <div class="radio-group">
                <label class="radio-option">
                  <input type="radio" name="hecs-help" value="yes">
                  <span class="radio-label">Yes</span>
                </label>
                <label class="radio-option">
                  <input type="radio" name="hecs-help" value="no">
                  <span class="radio-label">No</span>
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <button class="back-button">Back</button>
          <button class="next-button">Next</button>
        </div>
      </div>
    </div>
  `;

const step4Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">STEP 04</div>
        <h1>General Living Expenses</h1>
        <p>Select the amount you wish to package within the $15,900 General Living Expenses cap limit</p>
      </div>
      <div class="step-functionality">
        <div class="step-functionality-content">
          <div class="form-elements-wrapper">
            <div class="slider-wrapper">
              <label>General Living Expenses</label>
              <div class="slider-container">
                <input type="range" class="slider" min="0" max="15900" value="0" step="50">
                <div class="slider-value">$0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <button class="back-button">Back</button>
          <button class="next-button">Next</button>
        </div>
      </div>
    </div>
  `;

const step5Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">STEP 05</div>
        <h1>Meal Entertainment Expense Cap</h1>
        <p>Select the amount you wish to package within the $2,650 Meal Entertainment & Leisure Accommodation cap limit</p>
      </div>
      <div class="step-functionality">
        <div class="step-functionality-content">
          <div class="form-elements-wrapper">
            <div class="slider-wrapper">
              <label>Meal Entertainment Expense Cap</label>
              <div class="slider-container">
                <input type="range" class="slider" min="0" max="2650" value="0" step="50">
                <div class="slider-track"></div>
                <div class="slider-value">$0</div>
              </div>
            </div>
          </div>
        </div>
        <div class="navigation-buttons">
          <button class="back-button">Back</button>
          <button class="next-button">Next</button>
        </div>
      </div>
    </div>
  `;

const step6Content = `
    <div class="step-content-wrapper">
      <div class="step-info">
        <div class="step-label">SUMMARY</div>
        <h1>Your Salary Package Summary</h1>
        <div class="summary-list">
          <div class="summary-item">
            <label>Employer Type</label>
            <span class="summary-value employer-type">Loading...</span>
          </div>
          <div class="summary-item">
            <label>Annual Income</label>
            <span class="summary-value annual-income">Loading...</span>
          </div>
          <div class="summary-item">
            <label>HECS/HELP Debt</label>
            <span class="summary-value hecs-debt">Loading...</span>
          </div>
          <div class="summary-item">
            <label>General Living Expenses</label>
            <span class="summary-value living-expenses">Loading...</span>
          </div>
          <div class="summary-item">
            <label>Meal Entertainment</label>
            <span class="summary-value meal-expenses">Loading...</span>
          </div>
        </div>
      </div>
      
      <div class="step-functionality dark">
        <div class="savings-card">
          <h2 class="savings-title">
            You could save up to <br><span class="savings-amount">Loading...</span> per year!
          </h2>
        
          <div class="comparison-boxes">
            <div class="box-label with-package">With SimplygreenSalary<br>Package</div>
            <div class="box-label without-package">Without Simplygreen Salary<br>Package</div>
            <div class="comparison-box with-package">
              <div class="box-amount">Loading...</div>
            </div>
            <div class="comparison-box without-package">
              <div class="box-amount">Loading...</div>
            </div>
          </div>

          <div class="cta-section">
            <p class="cta-text">
              Request a quote for a Simplygreen Salary Package <span class="highlight">Today!</span>
            </p>
            <div class="button-group" style="text-align: left;">
              <button class="view-report-button">View Report</button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div class="step-content-wrapper report-page">
      <div class="report-content">
        <table class="savings-report-table">
          <thead>
            <tr class="header-row">
              <th></th>
              <th class="with-package-header">With Simplygreen Salary Package</th>
              <th class="without-package-header">Without Simplygreen Salary Package</th>
            </tr>
            <tr class="subheader-row">
              <th></th>
              <th>Annually</th>
              <th>Annually</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Gross Income</td>
              <td class="with-package gross-income">-</td>
              <td class="without-package gross-income">-</td>
            </tr>
            <tr>
              <td>General Living Expenses</td>
              <td class="with-package general-living">-</td>
              <td class="without-package general-living">-</td>
            </tr>
            <tr>
              <td>Meal Entertainment and/or Leisure<br>Accommodation Expenses</td>
              <td class="with-package meal-entertainment">-</td>
              <td class="without-package meal-entertainment">-</td>
            </tr>
            <tr>
              <td>Fringe Benefits Tax</td>
              <td class="with-package fbt">-</td>
              <td class="without-package fbt">-</td>
            </tr>
            <tr>
              <td>Simplygreen Administration Fee</td>
              <td class="with-package admin-fee">-</td>
              <td class="without-package admin-fee">-</td>
            </tr>
            <tr>
              <td>Taxable Income</td>
              <td class="with-package taxable-income">-</td>
              <td class="without-package taxable-income">-</td>
            </tr>
            <tr>
              <td>Tax and Medicare</td>
              <td class="with-package tax-medicare">-</td>
              <td class="without-package tax-medicare">-</td>
            </tr>
            <tr>
              <td>HECS/HELP payment</td>
              <td class="with-package hecs-payment">-</td>
              <td class="without-package hecs-payment">-</td>
            </tr>
            <tr>
              <td>Take-home salary</td>
              <td class="with-package take-home">-</td>
              <td class="without-package take-home">-</td>
            </tr>
            <tr>
              <td>Out-of-pocket expenses</td>
              <td class="with-package expenses">-</td>
              <td class="without-package expenses">-</td>
            </tr>
            <tr class="total-row">
              <td>Cash salary</td>
              <td class="with-package cash-salary">-</td>
              <td class="without-package cash-salary">-</td>
            </tr>
            <tr class="savings-row-table">
              <td>Simplygreen salary packaging savings</td>
              <td class=""></td>
              <td class="savings-amount">-</td>
            </tr>
          </tbody>
        </table>
        <div class="navigation-buttons">
          <button class="back-to-calculator">
            <span>&#8592;</span>
            Back to Calculator
          </button>
          <button class="print-page">
            <span>&#128424;</span>
            Print Page
          </button>
        </div>
      </div>
    </div>
  `;

const stepContainer = $('.step');

// Debounce function
function debounce(func, delay) {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
}

function initializeStep1() {
  // Restore employer type selection if it exists
  if (userInputs.employerType) {
    const select = $('#organisation-type');
    // Find the option with matching text and select it
    select.find('option').each(function () {
      if ($(this).text() === userInputs.employerType) {
        $(this).prop('selected', true);
      }
    });
  }
}

function initializeSlider() {
  const currentSlider = $('.slider');
  const currentSliderValue = $('.slider-value');

  function updateSlider() {
    const value = currentSlider.val();
    currentSliderValue.text(`$${value}`);
  }

  currentSlider.on('input', updateSlider);
  updateSlider(); // Initialize the slider value
}

function updateStep(stepNumber) {
  stepContainer.fadeOut(200, function () {
    let content;
    switch (stepNumber) {
    case 1:
      content = step1Content;
      break;
    case 2:
      content = step2Content;
      break;
    case 3:
      content = step3Content;
      break;
    case 4:
      content = step4Content;
      break;
    case 5:
      content = step5Content;
      break;
    case 6:
      content = step6Content;
      break;
    }

    // Update content while it's hidden
    stepContainer.html(content);

    // Update progress bar and dots
    const progressFill = $('.progress-fill');
    const stepDots = $('.step-dot');
    const completedSpan = $('.completed-text span');

    const progress = ((stepNumber - 1) / (totalSteps - 1)) * 100;
    progressFill.css('width', `${progress}%`);

    stepDots.each(function (index) {
      if (index + 1 < stepNumber) {
        $(this).addClass('completed');
      } else if (index + 1 === stepNumber) {
        $(this).addClass('active');
      } else {
        $(this).removeClass('completed active');
      }
    });

    completedSpan.text(stepNumber - 1);

    // Initialize step-specific functionality
    if (stepNumber === 1) {
      initializeStep1();
      // Add validation for step 1
      const select = $('#organisation-type');
      const nextButton = $('.next-button');
      nextButton.prop('disabled', !select.val() && !userInputs.employerType);

      select.on('change', () => {
        nextButton.prop('disabled', !select.val());
      });
    } else if (stepNumber === 2) {
      const incomeInput = $('.number-input');
      const nextButton = $('.next-button');

      if (userInputs.annualIncome) {
        incomeInput.val(userInputs.annualIncome);
      }
      nextButton.prop('disabled', !incomeInput.val() && !userInputs.annualIncome);

      incomeInput.on('input', () => {
        nextButton.prop('disabled', !incomeInput.val());
      });
    } else if (stepNumber === 3) {
      const radioButtons = $('input[name="hecs-help"]');
      const nextButton = $('.next-button');

      if (userInputs.hecsDebt) {
        $(`input[name="hecs-help"][value="${userInputs.hecsDebt}"]`).prop('checked',
          true);
      }
      nextButton.prop('disabled', !$('input[name="hecs-help"]:checked').length && !
        userInputs.hecsDebt);

      radioButtons.on('change', () => {
        nextButton.prop('disabled', false);
      });
    } else if (stepNumber === 4) {
      initializeSlider();
      // Restore general living expenses slider
      const livingExpensesSlider = $('.slider');
      if (userInputs.generalLivingExpenses) {
        livingExpensesSlider.val(userInputs.generalLivingExpenses);
        livingExpensesSlider.trigger('input');
      }
    } else if (stepNumber === 5) {
      initializeSlider();
      // Restore meal entertainment slider
      const mealExpensesSlider = $('.slider');
      if (userInputs.mealEntertainmentExpenses) {
        mealExpensesSlider.val(userInputs.mealEntertainmentExpenses);
        mealExpensesSlider.trigger('input');
      }
    } else if (stepNumber === 6) {
      updateSummaryValues();
    }

    // Update button event listeners
    const backButton = $('.back-button');
    const nextButton = $('.next-button');

    /* // Old Code

        backButton.on('click', () => {
          if (currentStep > 1) {
            currentStep--;
            updateStep(currentStep);
          }
        });

        nextButton.on('click', () => {
          if (currentStep < totalSteps) {
            saveCurrentStepData();
            logAllInputs();
            currentStep++;
            updateStep(currentStep);
          } else if (currentStep === totalSteps) {
            saveCurrentStepData();
            logAllInputs();
          }
        });
        
        */

    // Updated with Debounce Function

    backButton.on(
      "click",
      debounce(() => {
        if (currentStep > 1) {
          currentStep--;
          updateStep(currentStep);
        }
      }, 400)
    ); // 400ms debounce delay

    nextButton.on(
      "click",
      debounce(() => {
        if (currentStep < totalSteps) {
          saveCurrentStepData();
          logAllInputs();
          currentStep++;
          updateStep(currentStep);
        } else if (currentStep === totalSteps) {
          saveCurrentStepData();
          logAllInputs();
        }
      }, 400)
    ); // 400ms debounce delay

    // Disable back button on first step
    if (stepNumber === 1) {
      backButton.prop('disabled', true);
    }

    // Add event listener for "View Full Report" button in step 6
    if (stepNumber === 6) {

      const results = calculateSavings(
        parseFloat(userInputs.annualIncome),
        parseFloat(userInputs.generalLivingExpenses || 0),
        parseFloat(userInputs.mealEntertainmentExpenses || 0),
        userInputs.hecsDebt === 'yes',
        userInputs.employerType
      );
      updateReportValues(results);

      const viewReportButton = $('.view-report-button');
      if (viewReportButton) {
        viewReportButton.on('click', () => {
          // Add smooth scrolling to report section
          const reportSection = $('.report-page');
          if (reportSection.length) {
            reportSection[0].scrollIntoView({
              behavior: 'smooth',
              block: 'start'
            });
          }
        });
      }

      // back button functionality
      const backToCalculatorButton = $('.back-to-calculator');
      if (backToCalculatorButton) {
        backToCalculatorButton.on('click', () => {
          currentStep = 5;
          updateStep(currentStep); // Go back to step 6 (summary page)
        });
      }

      // print functionality
      const printButton = $('.print-page');
      if (printButton) {
        printButton.on('click', () => {
          window.print();
        });
      }

    }

    // Fade in new content
    stepContainer.fadeIn(200);
  });
}

function saveCurrentStepData() {
  switch (currentStep) {
  case 1:
    const select = $('#organisation-type');
    if (select.val() !== '') {
      userInputs.employerType = select.find('option:selected').text();
    }
    break;
  case 2:
    const incomeInput = $('.number-input');
    if (incomeInput.val()) {
      userInputs.annualIncome = incomeInput.val();
    }
    break;
  case 3:
    const selectedRadio = $('input[name="hecs-help"]:checked');
    if (selectedRadio.length) {
      userInputs.hecsDebt = selectedRadio.val();
    }
    break;
  case 4:
    const livingExpensesSlider = $('.slider');
    if (livingExpensesSlider.length) {
      userInputs.generalLivingExpenses = livingExpensesSlider.val();
    }
    break;
  case 5:
    const mealExpensesSlider = $('.slider');
    if (mealExpensesSlider.length) {
      userInputs.mealEntertainmentExpenses = mealExpensesSlider.val();
    }
    break;
  }
}

function logAllInputs() {
  console.log('Current User Inputs:', {
    'Employer Type': userInputs.employerType || 'Not selected',
    'Annual Income': userInputs.annualIncome ? `$${userInputs.annualIncome}` : 'Not entered',
    'HECS/HELP Debt': userInputs.hecsDebt || 'Not selected',
    'General Living Expenses': userInputs.generalLivingExpenses ?
      `$${userInputs.generalLivingExpenses}` : 'Not entered',
    'Meal Entertainment Expenses': userInputs.mealEntertainmentExpenses ?
      `$${userInputs.mealEntertainmentExpenses}` : 'Not entered'
  });
}

// Initialize first step
updateStep(1);

// Add new function to update summary values
function updateSummaryValues() {
  const employerType = $('.employer-type');
  const annualIncome = $('.annual-income');
  const hecsDebt = $('.hecs-debt');
  const livingExpenses = $('.living-expenses');
  const mealExpenses = $('.meal-expenses');

  // Calculate savings results
  const results = calculateSavings(
    parseFloat(userInputs.annualIncome),
    parseFloat(userInputs.generalLivingExpenses || 0),
    parseFloat(userInputs.mealEntertainmentExpenses || 0),
    userInputs.hecsDebt === 'yes',
    userInputs.employerType
  );

  // Update the comparison boxes with calculated values
  const withPackageAmount = $('.with-package .box-amount');
  const withoutPackageAmount = $('.without-package .box-amount');
  const savingsAmount = $('.savings-amount');

  if (withPackageAmount.length) withPackageAmount.text(results.totals.totalTakeHome);
  if (withoutPackageAmount.length) withoutPackageAmount.text(results.current.totalTakeHome);
  if (savingsAmount.length) savingsAmount.text(`${results.annualSavings.toLocaleString()}`);

  // Update existing summary values
  if (employerType.length) employerType.text(userInputs.employerType || 'Not provided');
  if (annualIncome.length) annualIncome.text(userInputs.annualIncome ?
    `$${userInputs.annualIncome}` : 'Not provided');
  if (hecsDebt.length) hecsDebt.text(userInputs.hecsDebt ? userInputs.hecsDebt.toUpperCase() :
    'Not provided');
  if (livingExpenses.length) livingExpenses.text(userInputs.generalLivingExpenses ?
    `$${userInputs.generalLivingExpenses}` : 'Not provided');
  if (mealExpenses.length) mealExpenses.text(userInputs.mealEntertainmentExpenses ?
    `$${userInputs.mealEntertainmentExpenses}` : 'Not provided');

  const withAmount = parseFloat(results.totals.totalTakeHome.replace(/[^0-9.-]+/g, ""));
  const withoutAmount = parseFloat(results.current.totalTakeHome.replace(/[^0-9.-]+/g, ""));
  const withPackageBox = $('.comparison-box.with-package');
  const withoutPackageBox = $('.comparison-box.without-package');

  if (withPackageBox.length && withoutPackageBox.length) {
    const baseHeight = 160; // Base height of barsin pixels
    const heightDelta = 1 + (Math.max(withAmount / withoutAmount, 1) - 1) * 10;
    withPackageBox.css('height', `${baseHeight * heightDelta}px`);
    withoutPackageBox.css('height', `${baseHeight}px`);
  }
}

function updateReportValues(results) {
  const withPackage = results.totals;
  const withoutPackage = results.current;

  const dataMap = {
    'gross-income': 'grossSalary',
    'general-living': 'generalLivingExpenses',
    'meal-entertainment': 'mealEntertainment',
    'fbt': 'fbt',
    'admin-fee': 'spFeePaid',
    'taxable-income': 'taxableIncome',
    'tax-medicare': 'paygPayment',
    'hecs-payment': 'hecsPayment',
    'take-home': 'netPayment',
    'expenses': 'salaryPackagingPayments',
    'cash-salary': 'totalTakeHome'
  };

  const tableSelector = '.step-content-wrapper.report-page';
  ['with-package', 'without-package'].forEach(packageType => {
    const data = packageType === 'with-package' ? withPackage : withoutPackage;
    Object.keys(dataMap).forEach(field => {
      $(`${tableSelector} td.${packageType}.${field}`).text(data[dataMap[field]]);
    });
  });
}
