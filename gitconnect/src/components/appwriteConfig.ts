import { Client, Databases, Account } from 'appwrite';
 
  const client = new Client()
  .setEndpoint('https://cloud.appwrite.io/v1')
  .setProject('66ea9ca0003b2551e1b5');

const databases = new Databases(client);
const account = new Account(client);

export { client, databases, account};      





