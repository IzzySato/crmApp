const NodeCache = require('node-cache');

const myCache = new NodeCache({ stdTTL: process.env.STD_TTL || 300 });

const getValueByKey = async (key, dbFunc) => {
  if(myCache.has(key)) {
    return myCache.get(key);
  }
  try {
    const data = await dbFunc();
    myCache.set(key, data);
    return data;
  } catch (err) {
    console.log(err);
    return { success: false };
  };
};

module.exports = {
  getValueByKey
}