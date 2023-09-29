const mongoose = require("mongoose");
const FileSchema = new mongoose.Schema({
    fileName: { type: String, required: true },
    dataArray: { type: [Object], required: true },
})

const FileModel = mongoose.model("files", FileSchema);

module.exports = FileModel;