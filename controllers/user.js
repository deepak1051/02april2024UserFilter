import mongoose from 'mongoose';
import User from '../models/User.js';

export const getUsers = async (req, res) => {
  try {
    let page = parseInt(req.query.page) || 1;
    let pageSize = parseInt(req.query.limit) || 20;
    let searchTerm = req.query.q || '';
    let domain = req.query.domain || '';
    let available = req.query.available || 'All';
    let gender = req.query.gender || '';
    let query = User.find();

    if (searchTerm) {
      const regex = new RegExp(searchTerm, 'i');
      query = query.regex('first_name', regex);

      // searchTerm = searchTerm
      //   .split(' ')
      //   .map((term) => `${term}*`)
      //   .join(' ');

      // query.find({ $text: { $search: searchTerm } });
    }

    if (domain) {
      query.find({ domain: domain });
    }

    if (available !== 'All') {
      query.find({ available: available });
    }
    if (gender) {
      if (gender === 'Male' || gender === 'Female') {
        query.find({ gender: gender });
      } else {
        query.find({ gender: { $nin: ['Male', 'Female'] } });
      }
    }

    query.limit(pageSize).skip((page - 1) * pageSize);

    const users = await query;
    return res
      .status(200)
      .json({ data: users, page, pageSize, totalResults: users.length });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Please provide user id' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).json({ message: 'No user with that id' });

    const user = await User.findById(id);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { first_name, last_name, email, gender, avatar, domain, available } =
      req.body;

    if (!first_name || !last_name || !email || !gender || !avatar || !domain)
      return res.status(400).json({
        message: 'Please provide all fields',
        first_name,
        last_name,
        email,
        gender,
        avatar,
        domain,
        available,
      });

    const existUser = await User.findOne({ email });
    if (existUser)
      return res.status(400).json({ message: 'user already exist' });

    const user = await User.create(req.body);
    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) return res.status(400).json({ message: 'Please provide user id' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'No user with that id' });

    const user = await User.findByIdAndUpdate(id, re.body, {
      new: true,
    });

    return res.status(200).json({ data: user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).json({ message: 'Please provide user id' });

    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(400).json({ message: 'No user with that id' });

    await User.findByIdAndDelete(id);

    return res.status(400).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
