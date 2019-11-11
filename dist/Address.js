import React from 'react';

var Address = function Address(_ref) {
  var address_company = _ref.address_company,
      address_line_1 = _ref.address_line_1,
      address_line_2 = _ref.address_line_2,
      address_line_3 = _ref.address_line_3,
      address_line_4 = _ref.address_line_4,
      address_city = _ref.address_city,
      address_state = _ref.address_state,
      address_postal = _ref.address_postal,
      address_country = _ref.address_country,
      style = _ref.style;

  var address = [address_company, address_line_1, address_line_2, address_line_3, address_line_4, [address_city, address_state, address_country].filter(function (a) {
    return a;
  }).join(', '), address_postal].filter(function (a) {
    return a;
  });
  return React.createElement(
    'p',
    { style: style },
    address.map(function (a, idx) {
      return idx === a.length - 1 ? React.createElement(
        'span',
        { key: idx },
        a
      ) : React.createElement(
        'span',
        { key: idx },
        a,
        React.createElement('br', null)
      );
    })
  );
};

export default Address;