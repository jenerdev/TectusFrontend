export function isValidUSPhone(input: string) {
  if (!input) return false;
  if (/[A-Za-z]/.test(input)) return false;

  const cleaned = input.trim().replace(/(?!^\+)\D/g, '');
  if (!/^\+?\d+$/.test(cleaned)) return false;

  let digits = cleaned;
  if (digits.startsWith('+')) digits = digits.slice(1);
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  else if (digits.length !== 10) return false;

  const area = digits.slice(0, 3);
  const exchange = digits.slice(3, 6);
  const line = digits.slice(6);

  if (!/^[2-9][0-9]{2}$/.test(area)) return false;
  if (!/^[2-9][0-9]{2}$/.test(exchange)) return false;
  if (/^[2-9]11$/.test(exchange)) return false;
  if (!/^\d{4}$/.test(line)) return false;

  return true;
}

// isValidUSPhone("(415)555-2671")     // true
// isValidUSPhone("415.555.2671")       // true
// isValidUSPhone("+1 212 555 0187")    // true
// isValidUSPhone("12125550187")        // true
// isValidUSPhone("012-555-1234")       // false (area cannot start with 0/1)
// isValidUSPhone("415-911-1234")       // false (exchange cannot be N11)
// isValidUSPhone("555-1234")           // false (not 10 digits)
