Dropdown Button 

Example:
```js
<DropDown style={{marginRight: 5}} items={[
    <a key={'dropdownBtn_create-contact'} onClick={() => <CreateContactPopup {...sharedProps} />}>New Contact</a>,
    <a key={'dropdownBtn_create-address'} onClick={() => <CreateAddressPopup {...sharedProps} />}>New Address</a>,
    <a key={'dropdownBtn_create-project'} onClick={() => window.open('/new_project.php', '_blank')}>New Project</a>,
]} />
```
