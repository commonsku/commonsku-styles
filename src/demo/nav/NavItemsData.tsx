import { OuterContainerArray, InnerContainerArray } from "demo";

console.log(OuterContainerArray);
console.log(InnerContainerArray);

export const NavItems = [
    {
        name: 'Buttons', 
        links: [
            {title: 'Button Variants', to: '#button-variants' },
            {title: 'Button Presets', to: '#button-presets' },
            {title: 'Links', to: '#links' },
            {title: 'Radio Buttons', to: '#radio-buttons' },
            {title: 'Checkboxes', to: '#checkboxes' },
            {title: 'Toggles', to: '#toggles' },
        ],
        open: false,
    },
    {
        name: 'Fields', 
        links: [
            {title: 'Input Fields', to: '#input-fields' },
            {title: 'Text Area', to: '#text-area' },
            {title: 'Select', to: '#select' },
            {title: 'Date Picker', to: '#datepicker' },
            {title: 'Dropdown Button', to: '#dropdown-button' },
            {title: 'Icon Dropdown', to: '#icon-dropdown' },
        ],
        open: false,
    },
    {
        name: 'Popups and Side Panels', 
        links: [
            {title: 'Popups', to: '#popups-and-panels' },
            {title: 'Side Panels', to: '#side-panels' },
        ],
        open: false,
    },
    {
        name: 'Notifications and Indicators', 
        links: [
            {title: 'AlertNotification', to: '#alert-notifications' },
            {title: 'LightIndicator', to: '#light-indicator' },
            {title: 'DefaultStar', to: '#default-star' },
        ],
        open: false,
    },{
        name: 'Components', 
        links: [
            {title: 'Calendar Tasks', to: '#calendar-tasks' },
            {title: 'Loading Bars', to: '#loading-bars' },
            {title: 'Numbers Formatting', to: '#numbers-formatting' },
            {title: 'InputStepper', to: '#input-stepper' },
            {title: 'Collapsible', to: '#collapsible' },
            {title: 'Avatar', to: '#avatar' },
            {title: 'Progress', to: '#progress' },
            {title: 'Drop Area', to: '#drop-area' },
            {title: 'Product', to: '#product' },
            {title: 'Artwork and Files', to: '#artwork' },
            {title: 'Tasks', to: '#tasks' },
            {title: 'Feed', to: '#feed' },
            {title: 'Tabs', to: '#tabs' },
            {title: 'Table', to: '#table' },

        ],
        open: false,
    },{
        name: 'Icons', 
        links: [
            {title: 'Nav Icons', to: '#nav-icons' },
            {title: 'Production Report Icons', to: '#production-report-icons' },
            {title: 'Input Icons', to: '#input-icons' },
            {title: 'Settings Icons', to: '#settings-icons' },
            {title: 'Status Icons', to: '#status-icons' },
            {title: 'Action Icons', to: '#action-icons' },
        ],
        open: false,
    },
]
