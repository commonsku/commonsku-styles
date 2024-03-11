type Keys = 'th' | 'td';
export const styles: { [key in Keys]: React.CSSProperties } = {
  th: {
    color: 'var(--color-neutrals-10)',
    fontFamily: 'var(--font-family-bold)',
    fontSize: 16
  },
  td: {
    color: 'var(--color-neutrals-90)',
    fontFamily: 'var(--font-family-regular)',
    fontSize: 14,
    fontWeight: 'normal',
  }
};
