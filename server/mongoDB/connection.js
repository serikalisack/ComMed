import mongoose from 'mongoose';

const mongoDBConnect = async () => {
  try {
    await mongoose.connect(process.env.URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB - Connected');
  } catch (error) {
    console.error('❌ Error - MongoDB Connection:', error);
  }
};

export default mongoDBConnect;