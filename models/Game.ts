import mongoose, { Schema, model } from 'mongoose';

interface dataGame {
  move: Record<string, [number, number, string]>;
  result: 'win' | 'lose' | 'draw' | null;
  userId: mongoose.Types.ObjectId;
}

const gameSchema = new Schema<dataGame>(
  {
    move: {
      type: Map,
      of: [
        { type: Number, required: true },
        { type: Number, required: true },
        { type: String, enum: ['x', 'o'], required: true },
      ],
      default: {},
    },
    result: { type: String },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const Game = model<dataGame>('Game', gameSchema);

export default Game;
