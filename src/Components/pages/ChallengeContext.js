import React, { useState, useEffect } from 'react';

export const ChallengeContext = React.createContext();

export function ChallengeProvider({ children }) {
    const defaultChallenges = [
        {
            id: '1',
            title: 'Drink Water',
            description: 'Drink 8 glasses of water every day to stay hydrated.',
        },
        {
            id: '2',
            title: 'Turn off Lights',
            description: 'Make sure to turn off lights when you leave a room to save energy.',
        },
        {
            id: '3',
            title: 'Stand',
            description: 'Stand up every hour to stay active.',
        },
        {
            id: '4',
            title: 'Exercise',
            description: 'Exercise for 30 minutes every day to stay healthy.',
        },
        {
            id: '5',
            title: 'Stretch',
            description: 'Stretch for 10 minutes every day to stay flexible.',
        },
        {
            id: '6',
            title: 'Sleep',
            description: 'Get 8 hours of sleep every night to stay healthy.',
        },
    ];

    const [challenges, setChallenges] = useState(() => {
        const savedChallenges = localStorage.getItem('challenges');
        if (savedChallenges) {
            return JSON.parse(savedChallenges);
        }
        return defaultChallenges;
    });

    useEffect(() => {
        localStorage.setItem('challenges', JSON.stringify(challenges));
    }, [challenges]);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();
            const savedDate = new Date(localStorage.getItem('date'));
            if (now.getDate() !== savedDate.getDate()) {
                setChallenges(defaultChallenges);
                localStorage.setItem('date', now.toString());
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);

    return (
        <ChallengeContext.Provider value={{ challenges, setChallenges }}>
            {children}
        </ChallengeContext.Provider>
    );
}