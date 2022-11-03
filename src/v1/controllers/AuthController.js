const { signClientAccessToken, signClientRefreshToken } = require('../../../helpers/jwt_helper');
const { verifyClientRefreshToken } = require('../../../middleware/authMiddleware');
const axios = require('axios');


exports.ClientRefreshingToken = async (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    res.status(500).json('Please provide an refresh token');
  }
  try {
    const adminName = verifyClientRefreshToken(refreshToken);
    const accessToken = await signClientAccessToken(adminName);
    const refToken = await signClientRefreshToken(adminName);

    res.send({ accessToken, refreshToken: refToken });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.GetLocationDetailsFromIp = async (req, res) => {
  const { ip } = req.body;

  if (!ip) {
   return res.status(200).json('Please provide an ip address of the user');
  }
 
  let apiResponse ;
  let usersDetails = [];


  try {
    
    let url = ` http://www.geoplugin.net/json.gp?ip=${ip}`;
    
    axios({
      method:'get',
      url,
  })
  .then(function (response) {
 
    apiResponse = JSON.stringify(response.data);

     usersDetails.push({ city : response.data.geoplugin_city })
     usersDetails.push({ latitude : parseFloat(response.data.geoplugin_latitude) })
     usersDetails.push({ longitude : parseFloat(response.data.geoplugin_longitude) })

     return res.status(200).json({  
      success: true,
      count:0,
      message: 'Users Location details found',
      data:usersDetails 
    });
  })
  .catch(function (error) {
 
    let url = `http://api.ipapi.com/${ip}?access_key=${process.env.IPAPI_ACCESS_KEY}`;
   
    axios({
      method:'get',
      url,
   })
  .then(function (response) {

    apiResponse = JSON.stringify(response.data);

     usersDetails.push({ city : response.data.city })
     usersDetails.push({ latitude : response.data.latitude })
     usersDetails.push({ longitude : response.data.longitude })

     return res.status(200).json({  
      success: true,
      count:0,
      message: 'Users Location details found',
      data:usersDetails 
    });
  })
  .catch(function (error) {

        return res.status(500).json({
          success: false,
          count: 0 ,
          message: " Failed to Fetch user's location " + error.message, 
          data: []
          })
      });
  });

  } catch (err) {
    return res.status(500).json({

      success: false,
      count: 0 ,
      message: " Failed to Fetch user's location" + error.message, 
      data: []
      })
  }
};
