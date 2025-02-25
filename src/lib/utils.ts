import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function generateId(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let id = '';
  for (let i = 0; i < 5; i++) {
    id += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return id;
}

export function generateRandomName() {
  const adjectives = [
    'Sleepy', 'Dancing', 'Quirky', 'Bouncing', 'Giggling',
    'Mysterious', 'Cosmic', 'Fluffy', 'Wobbly', 'Jazzy'
  ];

  const nouns = [
    'Penguin', 'Unicorn', 'Potato', 'Banana', 'Raccoon',
    'Noodle', 'Pickle', 'Waffle', 'Dinosaur', 'Robot'
  ];

  const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];

  return `${randomAdjective} ${randomNoun}`;
};