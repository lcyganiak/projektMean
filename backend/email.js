import email from './path/to/emailjs/email';

const emailSend = email.server.connect({
  user: 'lukasz.cyganiak',
  passeord: 'rafal2009',
  host: 'poczta.interia.pl',
  ssl: 'true'
});
