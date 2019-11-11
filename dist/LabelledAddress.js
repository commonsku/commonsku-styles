var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';

import Select from './Select';
import Address from './Address';
//import TaxSelect from './TaxSelect';

var unique_id = 0;
var id_prefix = 'LabelledAddress';

var Phone = function Phone(_ref) {
  var phone_type = _ref.phone_type,
      phone_number = _ref.phone_number,
      phone_extension = _ref.phone_extension;

  if (!phone_number) {
    return null;
  }
  return React.createElement(
    'span',
    null,
    phone_type[0],
    ': ',
    phone_number,
    ' ',
    phone_extension ? 'x' + phone_extension : null
  );
};

var Contact = function Contact(_ref2) {
  var contact_email = _ref2.contact_email,
      contact_phones = _ref2.contact_phones;
  return React.createElement(
    'p',
    { style: { paddingLeft: '5px' } },
    contact_email,
    (contact_phones || []).map(function (phone, idx) {
      return phone.phone_number ? [contact_email || idx > 0 ? React.createElement('br', { key: idx }) : null, React.createElement(Phone, _extends({ key: phone.phone_id }, phone))] : null;
    })
  );
};

var LabelledAddress = function (_React$Component) {
  _inherits(LabelledAddress, _React$Component);

  function LabelledAddress() {
    _classCallCheck(this, LabelledAddress);

    return _possibleConstructorReturn(this, (LabelledAddress.__proto__ || Object.getPrototypeOf(LabelledAddress)).apply(this, arguments));
  }

  _createClass(LabelledAddress, [{
    key: 'UNSAFE_componentWillMount',
    value: function UNSAFE_componentWillMount() {
      ++unique_id;
      this.setState({ label_id: id_prefix + unique_id });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var address_id = this.props.address ? this.props.address.address_id : null;
      var contact_id = this.props.contact ? this.props.contact.contact_id : null;
      var canAddContact = !this.props.disabled && this.props.canCreate && this.props.onAddContact;
      var canAddAddress = !this.props.disabled && this.props.canCreate && this.props.onAddAddress;
      var select_contact_style = canAddContact ? { width: 'calc(100% - 44px)', display: 'inline-block' } : {};
      var select_address_style = canAddAddress ? { width: 'calc(100% - 44px)', display: 'inline-block' } : {};
      var add_style = { marginLeft: '0.2rem', lineHeight: 0.65, verticalAlign: 'top', padding: '0.85em' };
      var addresses = this.props.addresses.length && !address_id ? [{ key: '', value: '' }].concat(this.props.addresses) : this.props.addresses;
      var contacts = this.props.contacts.length && !contact_id ? [{ key: '', value: '' }].concat(this.props.contacts) : this.props.contacts;
      var handleAddContact = function handleAddContact(e) {
        e.preventDefault();
        _this2.props.onAddContact();
      };
      var handleAddAddress = function handleAddAddress(e) {
        e.preventDefault();
        _this2.props.onAddAddress();
      };
      var tax_id = this.props.address ? this.props.address.tax_id : null;
      return React.createElement(
        'div',
        { className: this.props.className },
        React.createElement(
          'label',
          { htmlFor: this.state.label_id },
          this.props.label
        ),
        React.createElement(Select, { key: this.state.label_id + 'contactselect', style: select_contact_style, id: this.state.label_id, value: contact_id, options: contacts, change: this.props.onChangeContact, disabled: this.props.disabled }),
        canAddContact ? React.createElement(
          'a',
          { className: 'button hollow', style: add_style, onClick: handleAddContact },
          '+'
        ) : null,
        React.createElement(Select, { key: this.state.label_id + 'addressselect', style: select_address_style, value: address_id, options: addresses, change: this.props.onChangeAddress, disabled: this.props.disabled }),
        canAddAddress ? React.createElement(
          'a',
          { className: 'button hollow', style: add_style, onClick: handleAddAddress },
          '+'
        ) : null,
        this.props.address ? React.createElement(Address, _extends({ key: this.state.label_id + 'addressdisplay' }, this.props.address, { style: { paddingLeft: '5px' } })) : null,
        this.props.contact ? React.createElement(Contact, _extends({ key: this.state.label_id + 'contactdisplay' }, this.props.contact)) : null
      );
    }
  }]);

  return LabelledAddress;
}(React.Component);

export default LabelledAddress;