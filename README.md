# Sunflower Automation

End-to-end test automation project built with Playwright and TypeScript for
[Demo Web Shop](https://demowebshop.tricentis.com/).

## Prerequisites

- Node.js
- npm

## Installation

Install the project dependencies:

```bash
npm install
```

Install the Chromium browser used by the tests:

```bash
npx playwright install chromium
```

## Running Tests

Run all tests:

```bash
npm test
```

Run tests in headed mode:

```bash
npm run test:headed
```

Open Playwright's interactive UI:

```bash
npm run test:ui
```

## Test Reports

Playwright generates an HTML report after a test run. Open the latest report with:

```bash
npx playwright show-report
```

## Main Code Components

### Tests

The files in `src/tests` define the test scenarios. The current test in
`register.spec.ts` registers a new user, verifies the account email and
authentication cookie, adds a random featured product, and checks its details
in the shopping cart.

Each run selects one product. Gift cards and configurable computers receive
additional checks for their entered details and selected options.

Tests use shared fixtures and helper functions so that each specification stays
focused on the behavior being tested.

### Fixtures

The files in `src/fixtures` prepare the browser before a test begins.
`basePage.ts` opens the route selected by a test through its `pagePath` option.

Fixtures can be configured with `test.use()`, allowing tests to select a route
without repeating navigation code.

### Utilities

The files in `src/utils` contain reusable browser actions and assertions,
including:

- Filling the registration form and verifying the registered user.
- Selecting a random featured product and adding it to the cart.
- Filling gift card sender and recipient details.
- Selecting computer processor, RAM, storage, operating system, and software options.
- Checking cart product names, quantities, and configured details.
- Generating random integers and selecting or clearing checkboxes.

### Selectors and Labels

The files in `src/mapping` keep CSS selectors for the home page, registration
form, product pages, and shopping cart separate from test logic. When the
application markup changes, selectors can be updated in one place instead of
in every test.

### Test Data

The files in `src/testData` provide reusable registration details, gift card
details, and computer configurations. Registration data uses a UUID to generate
a unique email address.

`productsData.ts` also stores the shared computer names, so a product name can
be updated in one place.

### Models

The files in `src/models` define TypeScript types for registration details,
computer names, and computer options. These types help catch incorrect or
missing test data during development.

### Routes and Configuration

`src/config/routes.ts` stores the application base URL together with the routes
used by the tests. `playwright.config.ts` configures Chromium, test timeouts,
retries, screenshots, traces, and the HTML reporter.

### Test Flow

The current test follows this flow:

1. The fixture opens the registration page.
2. A utility fills and submits the form using the registration test data.
3. Assertions verify the home page URL, account email, and authentication cookie.
4. A utility selects a random featured product and fills any required product options.
5. Assertions verify the updated cart quantity and success notification.
6. The test opens the cart directly and checks the product name, quantity, and any configured details.

## Project Structure

```text
src/
├── config/       # Application routes and configuration
├── fixtures/     # Shared Playwright fixtures
├── mapping/      # Test selectors
├── models/       # TypeScript types
├── testData/     # Test input data
├── tests/        # Playwright test specifications
└── utils/        # Reusable test actions and helpers
```
