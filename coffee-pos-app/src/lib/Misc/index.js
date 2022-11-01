export const formatThousand = (number) => {
  return new Intl.NumberFormat().format(number);
};
