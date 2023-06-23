export default function thousandSeparator(number: number): string {
  const strNumber = number.toString();
  const parts = strNumber.split(".");
  const integerPart = parts[0];
  const decimalPart = parts[1] ? "." + parts[1] : "";

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    "."
  );

  return formattedIntegerPart + decimalPart;
}
