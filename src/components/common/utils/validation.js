
export const required = value => (value || typeof value === 'number' ? undefined : 'Required');

export const maxLength = max => value => 
  value.length > max ? `Допустима максимальна к-сть символів ${max} ` : undefined;