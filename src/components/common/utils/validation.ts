type ValidatorsType = (value: string) => undefined | string
export const required : ValidatorsType = value => (value || typeof value === 'number' ? undefined : 'Пусте поле! Введіть значення');

export const maxLength = (max: number): ValidatorsType => (value) => 
  value.length > max ? `Допустима максимальна к-сть символів ${max} ` : undefined;