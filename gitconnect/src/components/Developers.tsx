'use client';

import { useEffect, useState } from "react";
import { client, databases } from './appwriteConfig';
import './styles/friend.css'

interface Developer {
  $id: string;
  name: string;
  email: string;
}

interface Document {
  $id: string;
  [key: string]: any; 
}

function DeveloperList() {
  const [developers, setDevelopers] = useState<Developer[]>([]); 

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    try {
      const response = await databases.listDocuments(
        '66eac406003a5b6dad9f',
        '66eac4130030e0607505'
      );

      const mappedDevelopers: Developer[] = response.documents.map((doc: Document) => ({
        $id: doc.$id,
        name: doc.name ?? 'Unnamed', 
        email: doc.email ?? 'No email', 
      }));

      setDevelopers(mappedDevelopers);
    } catch (error) {
      console.error('Failed to fetch developers:', error);
    }
  };

  return (
    <div className="profile-container">
      <h1 className="text-2xl font-bold mb-4 text-center">Know other Developers</h1>
      <h1 className="text-2xl font-bold mb-4 text-center">Developers List</h1>
      <div className="profile-cards">
        {developers.map((developer) => (
          <div key={developer.$id} className="profile-card">
            <h2 className="text-xl font-semibold mb-2">{developer.name}</h2>
            <p className="text-gray-700">{developer.email}</p>
            <a
              href={`mailto:${developer.email}`}
              className="contact-btn"
            >
              Contact
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeveloperList;
