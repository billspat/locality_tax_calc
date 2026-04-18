<script lang="ts">

/* This program is free software: you can redistribute it and/or modify
 *  it under CC0 1.0 public domain license. 
 *  https://creativecommons.org/publicdomain/zero/1.0/
 *
 *  This program is distributed in the hope that it will be useful to learn 
 *  from, but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  
 */

  // ---------------------------
  // Inputs (Svelte 5 runes)
  // ---------------------------

  let year = $state(2025);

  let totalWorkDays = $state(261);
  let holidays = $state(21);
  let ptoDays = $state(0);
  let daysWorkedInCity = $state(0);

  let totalWages = $state(0);
  let taxRate = $state(0.005); // 0.5%
  let deductions = $state(1);
  let standardDeductible = 600;
  let taxRatePercent = $derived(taxRate * 100);


  // ---------------------------
  // Derived values
  // ---------------------------

  const workableDays= $derived(
    totalWorkDays - (holidays + ptoDays)
  );

  const taxablePercentage = $derived(
    workableDays> 0
      ? daysWorkedInCity / workableDays
      : 0
  );

  const taxableWages = $derived(
    totalWages * taxablePercentage
  );

  const deduction = $derived(deductions * standardDeductible);

  const taxCalculated = $derived(
    (taxableWages - deduction) * taxRate
  );

  const taxOwed = $derived( 
    taxCalculated > 0 ? taxCalculated : 0
  );

</script>

<div id="print-root" class="page-body">
  <div class="container-xl">

    <!-- Header -->
    <div class="page-header d-print-block">
      <div class="row align-items-center">
        <div class="col">
          <h1 class="page-title">
            Pretend Locality Income Tax Calculator (for Non-Resident)
          </h1>
          <p class="text-secondary mt-1">
            An example, simplistic, Javascript application to estimate city income tax 
            for an unnamed locality, based on the number of days you worked
            inside city limits.  
          </p>
          <h2 class="mt-2"><em>This is a demonstration only and not meant for tax
            preparation!</em></h2>
        </div>
      </div>
    </div>

    <hr class="my-3" />

    <div class="mb-4">
      <p class="text-secondary">Formula used:</p>
      <code class="formula-code">
        Tax = [ Wages * (Days Worked in City &divide; (Total Work Days - Holidays - PTO)) - Deduction ] * Tax Rate
      </code>
      <p class="text-secondary fst-italic mt-2">
        In this example, the tax is calculated 
        based on the proportion of days worked within the city limits relative 
        to the total work days available. This is based on an actual formula for 
        a locality tax, where taking more sick or vacation days will increase your tax, 
        which is illogical since most likely you are not present in the locality on those days. 
      </p>
    </div>

    <!-- Main Grid -->
    <div class="row g-3">

      <!-- Left Column: Input Cards -->
      <div class="col-lg-5">

        <!-- Work Days Card -->
        <div class="card input-card mb-3">
          <div class="card-header">
            <h3 class="card-title">Work Days</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label" for="year">Tax Year</label>
              <p class="form-text">
                Calendar year for which the tax is being calculated.
              </p>
              <input id="year" type="number" class="form-control" style="max-width: 16rem;" bind:value={year} />
            </div>
            <div class="mb-3">
              <label class="form-label" for="totalWorkDays">Total Possible Work Days</label>
              <p class="form-text">
                Total standard workdays in the year (typically 261 for a 5-day work week).
              </p>
              <input id="totalWorkDays" type="number" class="form-control" style="max-width: 16rem;" bind:value={totalWorkDays} />
            </div>
            <div class="mb-3">
              <label class="form-label" for="holidays">Paid Holidays</label>
              <p class="form-text">
                Employer-paid holidays when no work was performed.
              </p>
              <input id="holidays" type="number" class="form-control" style="max-width: 16rem;" bind:value={holidays} />
            </div>
          </div>
        </div>

        <!-- Your Information Card -->
        <div class="card input-card mb-3">
          <div class="card-header">
            <h3 class="card-title">Your Information</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label" for="ptoDays">Paid Time Off (PTO)</label>
              <p class="form-text">
                Vacation, sick leave, or other paid leave days.
              </p>
              <input id="ptoDays" type="number" class="form-control" style="max-width: 16rem;" bind:value={ptoDays} />
            </div>
            <div class="mb-3">
              <label class="form-label" for="daysWorkedInCity">Days Worked in City Limits</label>
              <p class="form-text">
                Number of days you were physically present and working inside
                taxation zone.
              </p>
              <input id="daysWorkedInCity" type="number" class="form-control" style="max-width: 16rem;" bind:value={daysWorkedInCity} />
            </div>
            <div class="mb-3">
              <label class="form-label" for="totalWages">Wages</label>
              <p class="form-text">
                Federal W-2 Box 1 wages for the year.
              </p>
              <input id="totalWages" type="number" step="1000" class="form-control" style="max-width: 16rem;" bind:value={totalWages} />
            </div>
            <div class="mb-3">
              <label class="form-label" for="deductions">Deductions</label>
              <p class="form-text">
                You, your spouse (if filing jointly), dependents.
              </p>
              <input id="deductions" type="number" step="1" class="form-control" style="max-width: 16rem;" bind:value={deductions} />
            </div>
          </div>
        </div>

      </div>

      <!-- Right Column: Results Card -->
      <div class="col-lg-7">
        <div class="card" id="results">
          <div class="card-header">
            <h3 class="card-title">Calculated Tax</h3>
          </div>
          <div class="card-body">
            <div class="mb-3">
              <label class="form-label" for="taxRate">
                Locality Tax Rate (Non-Resident)
                <span class="text-secondary ms-1">{taxRatePercent.toFixed(1)}%</span>
              </label>
              <input id="taxRate" class="form-control" style="max-width: 16rem;" bind:value={taxRate} />
            </div>

            <div class="datagrid mt-4">
              <div class="datagrid-item">
                <div class="datagrid-title">Available Work Days</div>
                <div class="datagrid-content"><strong>{workableDays}</strong></div>
              </div>

              <div class="datagrid-item">
                <div class="datagrid-title">Taxable Percentage ({daysWorkedInCity}/{workableDays})</div>
                <div class="datagrid-content"><strong>{(taxablePercentage * 100).toFixed(2)}%</strong></div>
              </div>

              <div class="datagrid-item">
                <div class="datagrid-title">Taxable Wages</div>
                <div class="datagrid-content"><strong>${taxableWages.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong></div>
              </div>

              <div class="datagrid-item">
                <div class="datagrid-title">Deduction</div>
                <div class="datagrid-content"><strong>${deduction}</strong></div>
              </div>

              <div class="datagrid-item">
                <div class="datagrid-title">Locality Tax Owed</div>
                <div class="datagrid-content">
                  <span class="h2 mb-0">${taxOwed.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
                  <p class="text-secondary fst-italic mt-1">this year at non-resident tax rate {taxRate * 100}%</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>

    <!-- Footer -->
    <footer class="mt-4">
      <hr />
      <p class="text-secondary">
        Created as a way to get started with <a href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a>,
        <a href="https://getbootstrap.com" target="_blank" rel="noopener noreferrer">Bootstrap</a>, and 
        <a href="https://tabler.io" target="_blank" rel="noopener noreferrer">Tabler UI</a>.
      </p>
    </footer>

  </div>
</div>
