# Datepicker

The Datepicker UI-library consists of 3 different components: DatePicker, RangePicker and TodoPicker

The DatePicker components allows users to select any date from a calendar. It gives an ability to choose an option to highlight holidays or weekends with different colors. User can navigate between months and years using windows-like calendar interface to select a date. DatePicker also provides min and max date property, that a user can choose, so they cannot surpass the range of dates that they set.

The TodoPicker component is an extension to the DatePicker component that has a feature of writing todo-tasks for any selected date and save them even after browser closes. This allows users to store their todos on any date and be sure, that these todos will be saved for a long time. If needed, user can delete items pressing on "X" button.

The RangePicker component is an extension of the DatePicker, enabling users to select a range of dates. It provides a user-friendly way to choose a start and end date for specific time periods. This feature is particularly useful for tasks that require a duration, like booking accommodations or planning vacations. The RangePicker offers a seamless experience by highlighting the selected range and allowing users to easily modify it if needed.

## Installation

```sh
yarn add datepicker-xyermik
# or
npm install datepicker-xyermik@latest
```

## Import

```js
import { DatePicker, TodoPicker, RangePicker } from "datepicker-xyermik"
```

## Dependencies

- [React](https://react.dev/)
- [ReactDOM](https://react.dev/)
- [Styled-components](https://www.styled-components.com)

## Props

### includeHolidays: boolean

The includeHolidays prop is a boolean that determines whether holidays should be highlighted in any Picker component. If true, the holidays will be highlighted and indicated with green color

```jsx
<DatePicker includeHolidays={true} />
```

or

```jsx
<DatePicker includeHolidays />
```

#### default: true

### includeWeekends: boolean

The includeWeekends prop is a boolean that determines whether weekends should be highlighted in any Picker component. If true,
the holidays will be highlighted and indicated with red color

```jsx
<DatePicker includeWeekends />
```

#### default: true

### theme: `'dark'` | `'light'`

The theme prop is a union of two string values that specifies the theme of chosen picker components. This prop allows user to choose theme of picker components.

```jsx
<DatePicker theme="dark" />
```

#### default: `'dark'`

### min, max: string `(dd.mm.yyyy)`

The min and max props are string that define the range of possible dates that user can select from in DatePicker and TodoPicker components. The max string represents the latest date that can be selected, while the min string represents the earliest one. These props allow users to define a range of dates and throw errors if selected date is not in range.

```jsx
<DatePicker min="01.01.2016" max="10.12.2024" />
```

#### default: ""

### startOfWeek: `'Monday'` | `'Sunday'`

The startOfWeek prop is a union of 2 string values that determines the starting day of the week in any picker component. This prop allows to customize calendar interface depending on the week start day.

```jsx
<DatePicker startOfWeek="Sunday" />
```

#### default: `'Monday'`

### value: string `(dd.mm.yyyy)`

The value prop is a string value in format of `dd.mm.yyyy`, which allows users to pass a default selected value to DatePicker and TodoPicker components.

```jsx
<DatePicker value="04.05.2025" />
```

#### default: null

### fromValue, toValue: string `(dd.mm.yyyy)`

The fromValue and toValue props are strings, that allow user to pass default date values to get the default date range for RangePicker component.

```jsx
<DatePicker fromValue="05.02.2025" toValue="10.02.2025" />
```

#### default: fromValue - `01.01.2023`, toValue - `05.01.2023`

## Project scripts

The scripts that are available in this projects:

### `yarn storybook`

Runs storybook in development mode.
Open [http://localhost:4500](http://localhost:4500) to view it in your browser.

The page will automatically reload when changes are made and saved

### `yarn build`

Builds the library for production to the folder `dist`

### `yarn lint`

Runs eslint to check for errors

### `yarn lint:fix`

Runs ellint to check for errors and fix them automatically.

### `yarn test`

Runs jest unit-tests.

### `yarn deploy-storybook`

Runs deployment script to github-pages. It automatically build storybook to `storybook-static` folder and then uploads it to github-pages

## Built with:

[React](https://react.dev/)

[Typescript](https://www.typescriptlang.org/)

[Rollup](https://rollupjs.org)

[Storybook](https://storybook.js.org)

[Styled-components](https://www.styled-components.com)

[Eslint](https://eslint.org/)

[Babel](https://babeljs.io/)

[Jest](https://jestjs.io/)

[Yarn Berry](https://yarnpkg.com/)

[Husky](https://typicode.github.io/husky/)

[Prettier](https://prettier.io/)
