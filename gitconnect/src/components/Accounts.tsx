import React, { useState } from 'react';
import { Databases } from 'appwrite';
import { client } from './appwriteConfig';
import './styles/account.css'; 

interface AccountDetails {
  name: string;
  email: string;
  education: string;
  workExperience: string;
  github: string;
}

const databases = new Databases(client);

const Account: React.FC = () => {
  const [accountCreated, setAccountCreated] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [account, setAccount] = useState<AccountDetails>({
    name: '',
    email: '',
    education: '',
    workExperience: '',
    github: '',
  });

  const [formValues, setFormValues] = useState<AccountDetails>({
    name: '',
    email: '',
    education: '',
    workExperience: '',
    github: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await databases.createDocument('66eac406003a5b6dad9f', '66ed2355002bcaa90c0b', 'unique()', formValues);
      setAccount(formValues);
      setAccountCreated(true);
    } catch (error) {
      console.error('Error creating account:', error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
    setFormValues(account); 
  };

  const handleSave = async () => {
    try {
      await databases.updateDocument('66eac406003a5b6dad9f', '66ed2355002bcaa90c0b', account.$id, formValues);
      setAccount(formValues);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating account:', error);
    }
  };

  return (
    <div className="account-container">
      {accountCreated && !isEditing ? (
        <div className="account-details">
          <h2>Account Details</h2>
          <p><strong>Name:</strong> {account.name}</p>
          <p><strong>Email:</strong> {account.email}</p>
          <p><strong>Education:</strong> {account.education}</p>
          <p><strong>Work Experience:</strong> {account.workExperience}</p>
          <p><strong>GitHub Username:</strong> {account.github}</p>
          <button className="edit-btn" onClick={handleEdit}>Edit</button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="account-form">
          <h2>{isEditing ? "Edit Account" : "Create Account"}</h2>
          <div className="form-group">
            <label>Name:</label>
            <input
              type="text"
              name="name"
              value={formValues.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Education:</label>
            <input
              type="text"
              name="education"
              value={formValues.education}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Work Experience:</label>
            <textarea
              name="workExperience"
              value={formValues.workExperience}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>GitHub Username:</label>
            <input
              type="text"
              name="github"
              value={formValues.github}
              onChange={handleInputChange}
              required
            />
          </div>
          <button className="submit-btn" type="submit">{isEditing ? "Save Changes" : "Create Account"}</button>
        </form>
      )}
    </div>
  );
};

export default Account;
