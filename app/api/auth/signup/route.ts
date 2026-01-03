import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import {connectedToDB} from '@utils/database';
import User from '@models/user';

// Generate default avatar URL
function getDefaultAvatarUrl(name: string, email: string): string {
  const initials = name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || email[0].toUpperCase();
  
  // Using UI Avatars service (free, no API key needed)
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=fff&size=200&bold=true`;
}

export async function POST(req: NextRequest) {
  try {
    await connectedToDB();

    const { name, email, username, password } = await req.json();

    if (!name || !email || !password) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    
    // Set default profile image
    const defaultImage = getDefaultAvatarUrl(name, email);

    const user = await User.create({
      name,
      username: username.toLowerCase().trim(),
      email,
      password: hashedPassword,
      image: defaultImage, // Add default image
    });

    return NextResponse.json({ 
      message: 'User created successfully', 
      user: { id: user._id, name, email, username, image: user.image } 
    }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Server error' }, { status: 500 });
  }
}