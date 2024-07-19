import React, { useState } from 'react';
import { Box } from '@mui/material';

import SearchExercises from '../components/SearchExercises';
import Exercises from '../components/Exercises';
import HeroBanner from '../components/HeroBanner';
// import Exercises from '../components/Exercises';
// import SearchExercises from '../components/SearchExercises';
// import HeroBanner from '../components/HeroBanner';

const Home = () => {
  const [exercises, setExercises] = useState([]);
  const [bodyPart, setBodyPart] = useState('all');
  return (
    <>
      <HeroBanner />
      <SearchExercises setExercises={setExercises} bodyPart={bodyPart} setBodyPart={setBodyPart} />
      <Exercises setExercises={setExercises} exercises={exercises} bodyPart={bodyPart} />
    </>
  );
};

export default Home;
