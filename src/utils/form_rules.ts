import config from 'src/config';

export default {
  required: (value: string) => !!value || 'Required',
  isEmail: (value: string | undefined | null) =>
    (value === undefined || value === null || value === '' || config.regex_email.test(value)) || 'Zadejte platný email',
};
