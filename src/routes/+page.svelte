<script lang="ts">
  import { Input } from "$lib/components/ui/input";
  import { Label } from "$lib/components/ui/label";
  import { Card, CardContent, CardHeader, CardTitle } from "$lib/components/ui/card";
  import { Separator } from "$lib/components/ui/separator";

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

<div id="print-root" class="mx-auto max-w-6xl space-y-8 p-6">
  <header class="space-y-2">
    <h1 class="text-3xl font-bold">
      Locality Income Tax Calculator for Non-Resident
    </h1>
    <p class="text-muted-foreground">
      An example, simplistic, Javascript application to estimate city income tax 
      for an unamed locality, based on the number of days you worked
      inside city limits.  This is a demonstration only and not meant for tax
      preparation!  
    </p>
    <Separator />
    <div class="space-y-1 text-sm text-muted-foreground">
      <p class="text-muted-foreground">Formula used: </p>
      <code class="bg-muted block rounded-md p-3">
            Tax = [ Wages * (Days Worked in City ÷ (Total Work Days - Holidays - PTO)) - Deduction ] * Tax Rate
      </code>
      <p class="text-muted-foreground italic">In this example, the tax is calculated 
        based on the proportion of days worked within the city limits relative 
        to the total work days available. This is based on an actual formula for 
        a locality tax, where taking more sick or vacation days will increase your tax, 
        which is illogical since most likley you are not present in the locality on those days. 
      </p>
    </div>
  </header>

  <div class="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start">
    <div class="space-y-6">
      <Card class="input-card">  <!-- class="lg:sticky lg:top-6" -->
        <CardHeader>
          <CardTitle>Work days</CardTitle>
        </CardHeader>

        <CardContent class="space-y-6">
          <!-- Year -->
          <div class="grid gap-2">
            <Label for="year">
              Tax Year
            </Label>
            <p class="text-sm text-muted-foreground">
              Calendar year for which the tax is being calculated.
            </p>
            <Input id="year" type="number" class="sm:max-w-xs" bind:value={year} />
          </div>

          <!-- Total Work Days -->
          <div class="grid gap-2">
            <Label>
              Total Possible Work Days
            </Label>
            <p class="text-sm text-muted-foreground">
              Total standard workdays in the year (typically 261 for a 5-day work week).
            </p>
            <Input type="number" class="sm:max-w-xs" bind:value={totalWorkDays} />
          </div>

          <!-- Holidays -->
          <div class="grid gap-2">
            <Label>
              Paid Holidays
            </Label>
            <p class="text-sm text-muted-foreground">
              Employer-paid holidays when no work was performed.
            </p>
            <Input type="number" class="sm:max-w-xs" bind:value={holidays} />
          </div>
        </CardContent>
      </Card>

      <Card class="input-card"> <!-- class="lg:sticky lg:top-6" -->
          <CardHeader>
            <CardTitle>Your Information</CardTitle>
          </CardHeader>
          <CardContent class="space-y-6">
          <!-- PTO -->
          <div class="grid gap-2">
            <Label>
              Paid Time Off (PTO)
            </Label>
            <p class="text-sm text-muted-foreground">
              Vacation, sick leave, or other paid leave days.
            </p>
            <Input type="number" class="sm:max-w-xs" bind:value={ptoDays} />
          </div>

          <!-- Days Worked in City -->
          <div class="grid gap-2">
            <Label>
              Days Worked in City Limits
            </Label>
            <p class="text-sm text-muted-foreground">
              Number of days you were physically present and working inside
              taxation zone.
            </p>
            <Input type="number" class="sm:max-w-xs" bind:value={daysWorkedInCity} />
          </div>

          <!-- Wages -->
          <div class="grid gap-2">
            <Label>
              Wages
            </Label>
            <p class="text-sm text-muted-foreground">
              Federal W-2 Box 1 wages for the year.
            </p>
            <Input type="number" step="1000" class="sm:max-w-xs" bind:value={totalWages} />
          </div>

          <!--   let deductible = $derived(deductions * standardDeductible); -->
          <!-- deductible -->
          <div class="grid gap-2">
            <Label>
              Deductions
            </Label>
            <p class="text-sm text-muted-foreground">
              you, your spouse (if filing jointly, dependents
            </p>
            <Input type="number" step="1" class="sm:max-w-xs" bind:value={deductions} />
          </div>

        </CardContent>
      </Card>
    </div>

    <Card id="results">
      <CardHeader>
        <CardTitle>Calculated Tax</CardTitle>
      </CardHeader>

    
      <CardContent class="space-y-4">
        <div class="grid gap-2">
          <Label>
            Locality Tax Rate ( Non-Resident )
            <span class="text-sm text-muted-foreground">{taxRatePercent.toFixed(1)}%</span>
          </Label>      
          <Input class="sm:max-w-xs" bind:value={taxRate} />
       </div> 

        <div class="space-y-4 text-sm">
          <div>
            Availble Work Days:
            <strong>{workableDays}</strong>
          </div>

          <div>
            Taxable Percentage ({daysWorkedInCity}/{workableDays}):
            <strong>{(taxablePercentage * 100).toFixed(2)}%</strong>
          </div>

          <div>
            Taxable Wages:
            <strong>${taxableWages.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
          </div>

          <div>
            Deduction: 
            <strong>${deduction}</strong>
          </div>

          <div>
            Locality Tax Owed :
            <span class="text-xl font-semibold">
              <strong>${taxOwed.toLocaleString(undefined, { maximumFractionDigits: 2 })}</strong>
            </span>
            <p class="text-sm text-muted-foreground italic">this year at non-resident tax rate {taxRate * 100}%</p>
          </div>
        </div>

      </CardContent>
    </Card>
  </div>
  <footer>
    <div class="grid gap-2">
      <Separator/>
      <p class="text-sm text-muted-foreground">
        Created as a way to get started with <a class="link" href="https://svelte.dev" target="_blank" rel="noopener noreferrer">Svelte</a>,
        <a class="link" href="https://tailwindcss.com" target="_blank"  >Tailwind CSS</a>, and 
        <a class="link" href="https://www.shadcn.com/svelte" target="_blank" rel="noopener noreferrer">Shadcn-svelte components</a>
    </p>
    </div>
  </footer>
</div>

<style>

  .link {
    color: #3b82f6;
    text-decoration: underline;

  }

  @media print {
    /* Compact outer wrapper */
    :global(#print-root) {
      padding: 0.5rem;
      max-width: 100%;
    }
    :global(#print-root > * + *) {
      margin-top: 0.5rem;
    }
    :global(h1) {
      font-size: 1.2rem;
    }

    /* Hide input helper/description text and separators */
    :global(.input-card .grid p),
    :global([data-slot="separator"]) {
      display: none;
    }

    /* Two-column layout for the input fields */
    :global(.input-card [data-slot="card-content"]) {
      columns: 2;
      column-gap: 1.5rem;
      padding: 0.75rem;
    }
    :global(.input-card [data-slot="card-content"] > * + *) {
      margin-top: 0.4rem;
    }
    :global(.input-card .grid) {
      break-inside: avoid;
    }

    /* Tighten results card padding */
    :global([data-slot="card-content"]) {
      padding: 0.75rem;
    }

    /* Prevent cards from splitting across pages */
    :global([data-slot="card"]) {
      break-inside: avoid;
      page-break-inside: avoid;
    }
  }
</style>