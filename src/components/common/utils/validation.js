
export const required = value => (value || typeof value === 'number' ? undefined : 'Пусте поле! Введіть значення');

export const maxLength = max => value => 
  value.length > max ? `Допустима максимальна к-сть символів ${max} ` : undefined;