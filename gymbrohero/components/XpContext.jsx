import React, { createContext, useState, useContext, useEffect } from 'react';
import { fetchUsers, patchCompletedWorkout } from '../api';

const XpContext = createContext();

export const ExperienceProvider = ({ children, userId }) => {
  const [currentExperience, setCurrentExperience] = useState(0);
  const [levelUpVisible, setLevelUpVisible] = useState(false);

  useEffect(() => {
    if (userId) {
      fetchUsers(userId).then(user => {
        setCurrentExperience(user.experience);
      });
    }
  }, [userId]);

  const calculateExperienceForNextLevel = (currentExperience) => {
    const level = Math.floor(Math.sqrt(currentExperience / 100));
    return 100 * (level + 1) ** 2;
  };

  const addExperience = (amount) => {
    const newExperience = currentExperience + amount;
    const experienceForNextLevel = calculateExperienceForNextLevel(currentExperience);

    if (newExperience >= experienceForNextLevel) {
      setCurrentExperience(newExperience - experienceForNextLevel);
      setLevelUpVisible(true);
    } else {
      setCurrentExperience(newExperience);
    }
    patchCompletedWorkout(userId, newExperience);
  };

  const closeLevelUp = () => setLevelUpVisible(false);

  return (
    <XpContext.Provider
      value={{
        currentExperience,
        experienceForNextLevel: calculateExperienceForNextLevel(currentExperience),
        levelUpVisible,
        addExperience,
        closeLevelUp,
      }}
    >
      {children}
    </XpContext.Provider>
  );
};

export const useExperience = () => useContext(XpContext);
