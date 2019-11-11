import React from 'react'

import Select from './Select'
import Address from './Address';
//import TaxSelect from './TaxSelect';

let unique_id = 0;
const id_prefix = 'LabelledAddress';

const Phone = ({phone_type, phone_number, phone_extension }) => {
  if (!phone_number) {
    return null;
  }
  return (
    <span>
      {phone_type[0]}: {phone_number} {phone_extension ? 'x' + phone_extension : null}
    </span>
  );
};

const Contact = ({ contact_email, contact_phones }) => (
  <p style={{ paddingLeft: '5px' }}>
    {contact_email}
    {(contact_phones || []).map((phone, idx) =>
      phone.phone_number ? [contact_email || idx > 0 ? <br key={idx} /> : null, <Phone key={phone.phone_id} {...phone} />] : null
    )}
  </p>
)

class LabelledAddress extends React.Component {
  UNSAFE_componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    const address_id = this.props.address ? this.props.address.address_id : null;
    const contact_id = this.props.contact ? this.props.contact.contact_id : null;
    const canAddContact = !this.props.disabled && this.props.canCreate && this.props.onAddContact;
    const canAddAddress = !this.props.disabled && this.props.canCreate && this.props.onAddAddress;
    const select_contact_style = canAddContact ? {width: 'calc(100% - 44px)', display: 'inline-block'} : {};
    const select_address_style = canAddAddress ? {width: 'calc(100% - 44px)', display: 'inline-block'} : {};
    const add_style = { marginLeft: '0.2rem', lineHeight: 0.65, verticalAlign: 'top', padding: '0.85em' };
    const addresses = this.props.addresses.length && !address_id ? [{key: '', value: ''}].concat(this.props.addresses) : this.props.addresses;
    const contacts = this.props.contacts.length && !contact_id ? [{key: '', value: ''}].concat(this.props.contacts) : this.props.contacts;
    const handleAddContact = e => {
      e.preventDefault();
      this.props.onAddContact();
    };
    const handleAddAddress = e => {
      e.preventDefault();
      this.props.onAddAddress();
    };
    const tax_id = this.props.address ? this.props.address.tax_id : null;
    return (
      <div className={this.props.className}>
        <label htmlFor={this.state.label_id}>
          {this.props.label}
        </label>
        <Select key={this.state.label_id + 'contactselect'} style={select_contact_style} id={this.state.label_id} value={contact_id} options={contacts} change={this.props.onChangeContact} disabled={this.props.disabled} />
        {canAddContact ? <a className="button hollow" style={add_style} onClick={handleAddContact}>+</a> : null}
        <Select key={this.state.label_id + 'addressselect'} style={select_address_style} value={address_id} options={addresses} change={this.props.onChangeAddress} disabled={this.props.disabled} />
        {canAddAddress ? <a className="button hollow" style={add_style} onClick={handleAddAddress}>+</a> : null}
        {/* this.props.showTax ? <TaxSelect value={tax_id} zip2tax={1 == this.props.zip2tax} onChange={this.props.onChangeTax} disabled={this.props.disabled} /> : null */}
        {this.props.address ? <Address key={this.state.label_id + 'addressdisplay'} {...this.props.address} style={{ paddingLeft: '5px'}} /> : null}
        {this.props.contact ? <Contact key={this.state.label_id + 'contactdisplay'} {...this.props.contact} /> : null}
      </div>
    )
  }
}

export default LabelledAddress;
