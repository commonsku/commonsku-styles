import React from 'react'

import Select from './Select'

let unique_id = 0;
const id_prefix = 'LabelledContact';

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
  <p>
    {contact_email}
    {(contact_phones || []).map((phone, idx) =>
      phone.phone_number ? [contact_email || idx > 0 ? <br key={idx} /> : null, <Phone key={phone.phone_id} {...phone} />] : null
    )}
  </p>
)

class LabelledContact extends React.Component {
  componentWillMount() {
    ++unique_id;
    this.setState({label_id: id_prefix + unique_id});
  }

  render() {
    const contact_id = this.props.contact ? this.props.contact.contact_id : null;
    const canAddContact = !this.props.disabled && this.props.canCreate && this.props.onAddContact;
    const select_contact_style = canAddContact ? {width: 'calc(100% - 44px)', display: 'inline-block'} : {};
    const add_style = { marginLeft: '0.2rem', lineHeight: 0.65, verticalAlign: 'top', padding: '0.85em'};
    const handleAddContact = e => {
      e.preventDefault();
      this.props.onAddContact();
    };

    return (
      <div className={this.props.className}>
        <label htmlFor={this.state.label_id}>
          {this.props.label}
        </label>
        <Select key={this.state.label_id + 'contactselect'} style={select_contact_style} id={this.state.label_id} value={contact_id} options={this.props.contacts} change={this.props.onChangeContact} disabled={this.props.disabled} />
        {canAddContact ? <a className="button hollow" style={add_style} onClick={handleAddContact}>+</a> : null}
        {this.props.contact ? <Contact key={this.state.label_id + 'contactdisplay'} {...this.props.contact} /> : null}
      </div>
    )
  }
}

export default LabelledContact
