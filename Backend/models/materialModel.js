import mongoose from 'mongoose';

const materialSchema  = mongoose.Schema(
  {
    materialName: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['Fertilizer', 'Pesticide', 'Seeds', 'Equipment'], 
    },
    diseaseUsage: [{
      type: String,
      enum: ['Fungal Infection', 'Bacterial Wilt'], 
    }],
    usageInstructions: {
      type: String,
      required: true,
    },
    unitType: {
      type: String,
      required: true,
      enum: ['kg', 'liters', 'packs'], 
    },
    pricePerUnit: {
      type: Number,
      required: true,
    },
    supplierName: {
      type: String,
      required: true,
    },
    supplierContact: {
      type: String,
      required: true,
    },
    image: {
       type: String 
    },
  },
  {
    timestamps: true,
  }
);

export const Material  = mongoose.model('Material ', materialSchema );