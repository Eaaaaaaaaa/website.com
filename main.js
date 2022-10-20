import FAUNA_DB_SECRET from './config.js';

var faunadb = window.faunadb,
  q = faunadb.query;

const client = new faunadb.Client({
  secret: FAUNA_DB_SECRET,
  domain: 'db.us.fauna.com',
  scheme: 'https',
});

function registerMail(form) {
  var formData = new FormData(form);

  let mail;
  let suggestion;
  for (var pair of formData.entries()) {
    if (pair[0] == 'text') {
      suggestion = pair[1];
    } else {
      mail = pair[1];
    }
  }

  addMail(mail, suggestion);
}

window.registerMail = registerMail;

const addMail = async (mail, suggestion) => {
  await client
    .query(
      q.Create(q.Collection('mail-list'), {
        data: { mail: mail, suggestion: suggestion },
      })
    )
    .catch((err) => console.log(err));
};
