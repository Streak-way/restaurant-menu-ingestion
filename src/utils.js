// return latitute and longitude

export const getLocation = async () => {
  const { coords } = await new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
  return coords;
};
