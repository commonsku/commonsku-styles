import React from 'react';

const Address = ({ address_company, address_line_1, address_line_2, address_line_3, address_line_4, address_city, address_state, address_postal, address_country, style }) => {
  const address = [address_company, address_line_1, address_line_2, address_line_3, address_line_4, [address_city, address_state, address_country].filter(a => a).join(', '), address_postal].filter(a => a);
  return (
    <p style={style}>
      {address.map((a, idx) => (idx === a.length - 1) ? a : [a, <br />])}
    </p>
  );
};

export default Address;
