import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {connectedToDB} from '@utils/database';
import User from '@models/user';

export async function POST(req: NextRequest) {
  try {
    await connectedToDB();

    const { name, email, username,password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await User.create({
      name,
      username: username.toLowerCase().trim(),
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: 'User created successfully', user: { id: user._id, name, email,username } }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}