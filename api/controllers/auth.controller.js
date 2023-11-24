import User from '../models/user.model.js'; // Assuming you have a User model defined
import bcryptjs from 'bcryptjs';
import { errorHandler } from '../utils/error.js';

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    const hashadPassword = bcryptjs.hashSync(password, 10);
    // Create a new instance of the User model with the provided data
    const newUser = new User({ username, email, password: hashadPassword });

    try {
        // Save the new user to the database
        await newUser.save();

        // Respond with a success message
        res.status(201).json('User created successfully!');
    } catch (error) {

        next(error);
        
    }
};
