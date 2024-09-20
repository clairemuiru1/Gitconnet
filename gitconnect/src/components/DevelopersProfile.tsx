'use client';

import React, { useEffect, useState } from 'react';
import { Databases } from 'appwrite';
import { client } from './appwriteConfig';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import './styles/profile.css';

const databases = new Databases(client);

interface Profile {
    $id: string;
    name: string;
    email: string;
    education: string;
    workExperience: string;
    githubUsername: string;
}

const DeveloperProfile: React.FC = () => {
    const [profiles, setProfiles] = useState<Profile[]>([]);
    
    useEffect(() => {
        fetchProfiles();
    }, []);

    const fetchProfiles = async () => {
        try {
            const response = await databases.listDocuments('66eac406003a5b6dad9f', '66eaffe1003468499692');
            const mappedProfiles: Profile[] = response.documents.map((doc: any) => ({
                $id: doc.$id,
                name: doc.name,
                email: doc.email,
                education: doc.education,
                workExperience: doc.workExperience,
                githubUsername: doc.githubUsername,
            }));
            setProfiles(mappedProfiles);
        } catch (error) {
            console.error('Error fetching profiles:', error);
        }
    };

    return (
        <div className="profile-container">
            <section>
                <h2>Profiles</h2>
                <div className="profile-cards">
                    {profiles.length > 0 ? (
                        profiles.map(profile => (
                            <div key={profile.$id} className="profile-card">
                                <h3>{profile.name}</h3>
                                <p><strong>Email:</strong> {profile.email}</p>
                                <p><strong>Education:</strong> {profile.education}</p>
                                <p><strong>Work Experience:</strong> {profile.workExperience}</p>
                                <a
                                    href={`https://github.com/${profile.githubUsername}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="github-btn"
                                >
                                    <FontAwesomeIcon icon={faGithub} />
                                    View Repository
                                </a>
                            </div>
                        ))
                    ) : (
                        <p>No profiles found.</p>
                    )}
                </div>
            </section>
        </div>
    );
};

export default DeveloperProfile;
