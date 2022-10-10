const { Schema, model } = require('mongoose');

const EventSchema = new Schema(
  {

    eventName: {
      type: String,
      min: 5,
      max: 40,
      trim: true,
    },
    masjidId: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
    },
    eventPhotos: {
      type: [String],
    },
    eventProfilePhoto:{
      type: String,
    },
    timings: [
      {
        startDate: Date,
        endDate: Date,
        startTime: Number,
        endTime: Number,
      },
    ],
    guests: [
      {
        guestName: String,
        guestDesc: String,
      },
    ],
    location: {
      type: {
        type: String,
        enum: ['Point'],
      },
      coordinates: {
        type: [Number],
      },
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

EventSchema.index({ location: '2dsphere' });

module.exports = model('Event', EventSchema);
