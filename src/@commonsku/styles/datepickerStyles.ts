const datepickerStyles = `
.react-datepicker {
  font-family: "skufont-demibold", sans-serif;
  color: var(--color-neutrals-dark);
}

.commonsku-styles-datepicker {
  &.react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    display: block;
    width: 100%;
  }

  .react-datepicker {
    border-radius: 3px;
    border: 1px solid var(--color-primary1-60);
    outline: none;
    box-shadow: 1px  1px 0px var(--color-primary1-60),
              -1px -1px 0px var(--color-primary1-60),
              1px -1px 0px var(--color-primary1-60),
              -1px  1px 0px var(--color-primary1-60);
  }

  /* For date ranges */
  &.daterangepicker {
    .react-datepicker__day--range-start,
    .react-datepicker__day--range-end,
    .react-datepicker__day:hover
    {
      background-color: var(--color-primary1-60);
      color: #fff;
    }

    .react-datepicker__day--in-range:not(
      .react-datepicker__day--range-start,
      .react-datepicker__day--range-end,
      .react-datepicker__day:hover
    )
    {
      background-color: var(--color-primary1-40);
    }

    .react-datepicker__day--in-range:not(
      .react-datepicker__day--in-selecting-range,
      .react-datepicker__day--weekend,
      .react-datepicker__day--selected
    )
    {
      color: var(--color-neutrals-dark);
    }

    .react-datepicker__day--in-range.react-datepicker__day--weekend:not(
      .react-datepicker__day--selected,
      .react-datepicker__day--range-start,
      .react-datepicker__day--range-end,
      .react-datepicker__day:hover
    )
    {
      color: var(--color-errors-main);
    }

    .react-datepicker__day--in-selecting-range:not(
      .react-datepicker__day--range-start,
      .react-datepicker__day--range-end,
      .react-datepicker__day:hover
    )
    {
      background-color: var(--color-primary1-40);
      &.react-datepicker__day:not(
        .react-datepicker__day--outside-month,
        .react-datepicker__day--weekend,
      ) {
        color: var(--color-neutrals-90);
      }
      &.react-datepicker__day--outside-month {
        color: var(--color-neutrals-70);
      }
      &.react-datepicker__day--weekend {
        color: var(--color-errors-main);
      }
    }
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header,
  .react-datepicker__header {
    padding-top: 8px;
    padding-bottom: 8px;
    color: var(--color-neutrals-dark);
  }

  .react-datepicker__header,
  .react-datepicker__input-time-container,
  .react-datepicker__today-button {
    background: var(--color-neutrals-20);
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .react-datepicker__header, 
  .react-datepicker__input-time-container {
    border-bottom: none;
  }

  .react-datepicker__today-button {
    border-top: none;
  }

  .react-datepicker__input-time-container {
    margin: 0;
    text-align: center;
  }
  
  .react-datepicker-time__caption {
    color: var(--color-neutrals-dark);
    font-size: 0.944rem;
    font-weight: bold;
  }

  .react-datepicker-time__input {
    padding: 8px;
    border-radius: 5px;
    font-size: 14px;
    font-weight: 400;
    color: var(--color-neutrals-darkest);
    border: 0;
    input {
      border: 2px solid var(--color-neutrals-60);
    }
  }

  .react-datepicker__day
  {
    outline: none;
    color: var(--color-neutrals-dark);
  }

  .react-datepicker__day-name {
    color: var(--color-neutrals-dark);
  }

  .react-datepicker__day:hover :not(.react-datepicker__day--selected),
  .react-datepicker__month-text:hover,
  .react-datepicker__quarter-text:hover,
  .react-datepicker__year-text:hover {
    background-color: var(--color-neutrals-20);
  }

  .react-datepicker__day--outside-month {
    color: var(--color-neutrals-70);
  }

  .react-datepicker__day--weekend {
    color: var(--color-errors-main);
  }

  .react-datepicker__day--selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected
   {
    background-color: var(--color-primary1-60);
    color: #fff;
  }

  .react-datepicker__day--keyboard-selected {
    background-color: inherit;
  }

  .react-datepicker__triangle {
    border-bottom-color: var(--color-neutrals-20) !important;
  }

  .react-datepicker__triangle::before {
    border-bottom-color: var(--color-primary1-60) !important;
    border-top-color: var(--color-primary1-60) !important;
  }

  .react-datepicker__month-select,
  .react-datepicker__year-select {
    height: 30px;
    border: 2px solid var(--color-primary1-60);
    padding: 3px;
    border-radius: 5px;
    outline: none;
  }

  .react-datepicker__time-container {
    margin-top: -2px;
    border-top-left-radius: 0px;
    border-right: 2px solid var(--color-primary1-60);
    border-bottom: 2px solid var(--color-primary1-60);
    border-top: 2px solid var(--color-primary1-60);
  }

  .react-datepicker__navigation-icon {
    &.react-datepicker__navigation-icon--next::before {
      content: '';
      box-sizing: initial;
      top: 2px;
      left: -8px;
      height: 6px;
      width: 6px;
      border-width: 3px 3px 0 0;
      border-top-right-radius: 2px;
      border-color: var(--color-primary1-60);
    }

    &.react-datepicker__navigation-icon--previous::before {
      content: '';
      box-sizing: initial;
      top: 2px;
      right: -8px;
      height: 6px;
      width: 6px;
      border-width: 3px 3px 0 0;
      border-top-right-radius: 2px;
      border-color: var(--color-primary1-60);
    }
  }

  .react-datepicker__aria-live {
    display: none;
  }

  @media only screen and (min-height: 600px) and (max-height: 800px ) {
    .react-datepicker .react-datepicker__month-container .react-datepicker__month {
      overflow-y: scroll;
      max-height: 140px;
    }
  }
  @media only screen and (max-height: 599px ) {
    .react-datepicker .react-datepicker__month-container .react-datepicker__month {
      overflow-y: scroll;
      max-height: 110px;
    }

    .react-datepicker__time-container {
      margin-top: -2px;
      border-top-left-radius: 0px;
      border-right: 2px solid var(--color-primary1-60);
      border-bottom: 2px solid var(--color-primary1-60);
      border-top: 2px solid var(--color-primary1-60);
    }
  }
}
`;

export default datepickerStyles;
