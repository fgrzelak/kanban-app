import mongoose from 'mongoose';
import Lane from '../models/lane';

const Schema = mongoose.Schema;

const noteSchema = new Schema({
  task: { type: 'String', required: true },
  id: { type: 'String', required: true, unique: true }
});

noteSchema.pre('remove', function (next) {
  Lane.findOneAndUpdate({ notes: { $in: [this._id] } }, { $pull: { notes: this._id } }, next);
});

export default mongoose.model('Note', noteSchema);
