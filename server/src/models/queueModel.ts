import mongoose from "mongoose";

const queueSchema = new mongoose.Schema({
    songId: {
        type: String,
        required: true,
        index: true
    },
    title: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        default: 'Unknown'
    },
    imageUrl: {
        type: String,
        default: ''
    },


    roomId: {
        type: String,
        required: true,
        index: true
    },
    position: {
        type: Number,
        required: true,
        default: 0,
        index: true
    },
    downloadUrl:{
        type:String,
        required:true,
    },
    // addedBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    isPlaying: {
        type: Boolean,
        default: false,
    },

}, {
    timestamps: true
});


// queueSchema.index({ roomId: 1, position: 1 });
// queueSchema.index({ roomId: 1, status: 1 });


// queueSchema.statics.getNextSong = async function(roomId) {
//   return this.findOne({ 
//     roomId, 
//     status: 'pending' 
//   }).sort({ position: 1 });
// };

// queueSchema.statics.reorderQueue = async function(roomId) {
//   const songs = await this.find({ roomId, status: 'pending' })
//     .sort({ position: 1 });

//   const updates = songs.map((song, index) => ({
//     updateOne: {
//       filter: { _id: song._id },
//       update: { position: index }
//     }
//   }));

//   if (updates.length > 0) {
//     await this.bulkWrite(updates);
//   }
// };

export const Queue = mongoose.model('Queue', queueSchema);

