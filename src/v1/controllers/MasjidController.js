const Masjid = require('../model/MasjidSchema');
// const { MasjidSchema } = require('../../../helpers/validation_schema');

// @desc get all the masjid
// @route GET /api/v1/masjid/getAllMasjid
// @access Public
exports.getAllMasjid = async (req, res) => {
  try {
    const data = await Masjid.find({ }, {
      createdAt: 0, __v: 0,
    });

    return res.status(200).json({
      success: true,
      count:data?.length,
      message:"Masjid Found",
      data:data
    });
  } catch (error) {
    return res.status(500).json({ 
      success: false,
      count: 0 ,
      message: " No Masjid's Found" + error.message ,
      data: []
     });
  }
};

// @desc get all the masjid
// @route GET /api/v1/masjid/getMasjid
// @access Public
exports.getMasjid = async (req, res) => {
  try {
   
    if(!req.params.masjidName){
      return res.status(200).json({
        success: false,
        count: 0,
        message: "Add masjidName to the request please",
        data: []
      });
    }

    const regex = new RegExp(req.params.masjidName, 'i');

    const masjids = await Masjid.find({ $or: [{ masjidName: regex }, { address: regex }] }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (masjids.length > 0) {
      return res.status(200).json({
        success: true,
        count: masjids?.length,
        message:"Masjid Found",
        data: masjids
      });
    }

    return res.status(200).json({
      success: false,
      count: 0 ,
      message: " No Masjid's Found",
      data: []
    });
  } catch (error) {
    return res.status(500).json({ 
       success: false,
      count: 0 ,
      message: " No Masjid's Found" + error.message ,
      data: []
     });
  }
};

// @desc get all the masjid
// @route GET /api/v1/masjid/getMasjid
// @access Public
exports.getMasjidById = async (req, res) => {
  try {

    if(!req.params.id){
      return res.status(200).json({
        success: false,
        count: 0,
        message: "Add Id to the request please",
        data: []
      });
    }

    var ObjectID = require("mongodb").ObjectID
   

    if(!ObjectID.isValid(req.params.id)){

      return res.status(200).json({
        success: false,
        count: 0,
        message: "The Provided Id is invalid",
        data: []
      });

    }

    const masjid = await Masjid.findById(req.params.id, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });
    if(masjid){

      return res.status(200).json({
        success: true,
      count: masjid?.length,
      message:"Masjid Found",
      data: masjid
    });
   }
    else{

      return res.status(200).json({
        success: false,
        count: 0,
        message: "No Masjid Found for the given Id",
        data: []
      });
    }
      
  } catch (error) {
    
    return res.status(500).json({
       success: false,
      count: 0 ,
      message: " No Masjid's Found" + error?.message,
      data: []
    
    });

  }
};

// @desc Search  masjids by Location
// @route POST  /api/v1/masjid/getNearMasjid
// @access Public
exports.getNearMasjid = async (req, res) => {
  const coordinates = [];

  try {
    if(!req.body.coordinates){
      return res.status(200).json({
        success: false,
        count: 0,
        message: "Add coordinates to the request please",
        data: []
      });
    }
    const distance = req.body.distanceType === 'Miles'
      ? req.body.distance * 1609 : req.body.distance * 1000;

    coordinates.push(req.body.coordinates[0]);
    coordinates.push(req.body.coordinates[1]);

    const masjid = await Masjid.find({
      location:
                       {
                         $near:
                          {
                            $maxDistance: distance,
                            $geometry:
                              {
                                type: 'Point', coordinates,
                              },

                          },
                       },
    }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (masjid.length > 0) {
      return res.status(200).json({
        success: true,
        count: masjid?.length,
        message:"Masjids Found",
        data: masjid
      });
    }
    return res.status(200).json({
      success: false,
      count: 0 ,
      message: " No Masjid's Found,try increasing the search distance",
      data: []
    });
  } catch (error) {
    return res.status(501).json({  
      success: false,
      count: 0 ,
      message: " No Masjid's Found" ,
      data: []
    
    });
  }
};

// @desc Search  masjids by Area co-ordinates
// @route POST  /api/v1/masjid/getAreaMasjids
// @access Public
exports.getAreaMasjids = async (req, res) => {
  try {
    
    if(!req.body.coordinates){
      return res.status(200).json({
        success: false,
        count: 0,
        message: "Add coordinates to the request please",
        data: []
      });
    }
    const masjid = await Masjid.find({
      location:
                {
                  $near:
                    {
                      $geometry:
                        {
                          type: 'Point', coordinates: req.body.coordinates,
                        },
                      $maxDistance: 50 * 100,
                    },
                },
    }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });
    
  
    if (masjid.length > 0) {
      return res.status(200).json({
        success: true,
        count: masjid?.length,
        message: "Masjid's Found",
        data: masjid
      });
    }

    return res.status(200).json({
      success: false,
      count: 0,
      message: " No Masjid's Found",
      data: []
    });
  } catch (error) {
    
    if (error.isJoi === true) {
      return res.status(422).json({ error: "The details doesn't match the pattern,Please check and try again" });
    }
    return res.status(501).json({ 
      success: false,
      count: 0 ,
      message: " No Masjid's Found" + error.message, 
      data: []
    });
  }
};

// @desc get all the masjid according to the address and city search
// @route GET /api/v1/masjid/getMasjid
// @access Public
exports.getMasjidByAreaSearch = async (req, res) => {
  try {
    const regex = new RegExp(req.params.address, 'i');

    const masjids = await Masjid.find({ address: regex }, {
      createdAt: 0, updatedAt: 0, __v: 0,
    });

    if (masjids.length > 0) {
      return res.status(200).json({
        success: true,
        count: masjids?.length,
        message:"Masjid Found",
        data: masjids
      });
    }

    return res.status(200).json({
      success: false,
      count: 0 ,
      message: " No Masjid's Found",
      data: []
    });
  } catch (error) {
    return res.status(500).json({ 
       success: false,
      count: 0 ,
      message: " No Masjid's Found" + error?.message ,
      data: []
    });
  }
};

// @desc Create  the masjids
// @route POST  /api/v1/masjid/addMasjid
// @access Public
exports.addMasjid = async (req, res) => {
  try {
    // const result = await MasjidSchema.validateAsync(req.body);

    const masjid = await Masjid.create(req.body);

    return res.status(201).json({
      success: true,
      message: 'Masjid is successfully Created.',
      data: masjid,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(501).json({ error: 'This Masjid already exists' });
    }

    if (error.isJoi === true) {
      return res.status(422).json({ error: "The details doesn't match the pattern,Please check and try again" });
    }
    return res.status(502).json({ error });
  }
};

// @desc update  the masjid
// @route PUT /api/v1/masjid/updateMasjid/:masjidId
// @access Public
exports.updateMasjid = async (req, res) => {
  try {
    // const result = await MasjidSchema.validateAsync(req.body);
    const options = { new: true };

    const updatedMasjid = await Masjid.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    }, options);

    if (updatedMasjid) {
      return res.status(200).json({
        success: true,
        data: updatedMasjid,
      });
    }

    return res.status(404).json({ message: 'The Masjid is not found' });
  } catch (error) {
    if (error.isJoi === true) {
      return res.status(422).json({ error: "The details doesn't match the pattern,Please check and try again" });
    }
    return res.status(501).json({ error: error.message });
  }
};

// @desc delete the masjid
// @route DELETE /api/v1/masjid/deleteMasjid/:Id
// @access Public
exports.deleteMasjid = async (req, res) => {
  try {
    await Masjid.findByIdAndRemove(req.params.id);

    res.status(200).json({
      success: true,
      data: 'The Masjid has been removed from the Database',
    });
  } catch (error) {
    res.status(501).json({ error: "Couldn't Find the Masjid" });
  }
};
