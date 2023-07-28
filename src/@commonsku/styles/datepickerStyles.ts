const datepickerStyles = `
.commonsku-styles-datepicker {
  &.react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__input-container {
    display: block;
    width: 100%;
  }

  .react-datepicker {
    border: 1px solid var(--color-primary1-60);
    outline: none;
    box-shadow: 1px  1px 0px var(--color-primary1-60),
              -1px -1px 0px var(--color-primary1-60),
              1px -1px 0px var(--color-primary1-60),
              -1px  1px 0px var(--color-primary1-60);
  }

  .react-datepicker__current-month,
  .react-datepicker-time__header,
  .react-datepicker-year-header,
  .react-datepicker__header {
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .react-datepicker__header,
  .react-datepicker__today-button {
    background: var(--color-neutrals-20);
    padding-top: 8px;
    padding-bottom: 8px;
  }

  .react-datepicker__header {
    border-bottom: none;
  }

  .react-datepicker__today-button {
    border-top: none;
  }

  .react-datepicker__day {
    outline: none;
  }

  .react-datepicker__day :not(
    .react-datepicker__day--outside-month,
    .react-datepicker__day--selected
  ) {
    color: var(--color-neutrals-90);
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
  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected
   {
    background-color: var(--color-primary1-60);
    color: #fff;
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

  .react-datepicker__navigation {
    border: 0.45rem solid transparent;

    &.react-datepicker__navigation--next {
      border-left: 7px solid var(--color-primary1-60);
      margin-top: 8px;
    }
  
    &.react-datepicker__navigation--previous {
      border-right: 7px solid var(--color-primary1-60);
      margin-top: 8px;
    }
  }

  .react-datepicker__aria-live {
    display: none;
  }

  @media only screen and (min-height: 600px) and (max-height: 800px ) {
    .react-datepicker__month {
      overflow-y: scroll !important;
      height: 15vh !important;
    }
  }
  @media only screen and (max-height: 599px ) {
    .react-datepicker__month {
      overflow-y: scroll !important;
      height: 5vh !important;
    }
  }
}
`;

export default datepickerStyles;
