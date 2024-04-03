import mongoose from 'mongoose';
import Team from '../models/Team.js';

export const createTeam = async (req, res) => {
  try {
    const { name, members } = req.body;

    if (!name)
      return res.status(400).json({ message: 'Please provide team name' });

    if (members.length < 1)
      return res
        .status(400)
        .json({ message: 'Please provide atleast 1 members' });

    const team = await Team.create({ name, members });
    return res.status(200).json({ data: team });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTeam = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Please provide team id' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'No team with that id' });

    const team = await Team.findById(id);
    return res.status(200).json({ data: team });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find();
    return res.status(200).json({ data: teams });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
