import React from 'react';
import { motion } from 'framer-motion';

const MedicinesTab = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Medicines</h2>
      <p>This is where you can find information about plant medicines and treatments.</p>
      {/* Add more content for the Medicines tab */}
    </motion.div>
  );
};

export default MedicinesTab;