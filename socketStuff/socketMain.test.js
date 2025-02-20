import { describe, it, expect, beforeEach, vi } from 'vitest';
import User from './classes/User';
import UserData from './classes/UserData';
import { generateUniqueString, getLeaderBoard } from './socketMain.js';

// Mock du tableau global de users
let users;
beforeEach(() => {
    users = [];
});

describe('UserData Class', () => {
    it('should create a new UserData instance', () => {
        const settings = { X: 0, Y: 0 };
        const userData = new UserData('TestUser', settings);

        expect(userData.name).toBe('TestUser');
        expect(userData.locX).toBe(0);
        expect(userData.locY).toBe(0);
    });
});

describe('User Class', () => {
    it('should create a new User instance', () => {
        const userData = new UserData('Player1', { X: 0, Y: 0 });
        const user = new User('socket123', userData, 'ROOM1');

        expect(user.socketId).toBe('socket123');
        expect(user.userData.name).toBe('Player1');
        expect(user.userRoom).toBe('ROOM1');
    });
});

describe('LeaderBoard Function', () => {
    it('should return an empty leaderboard when no users', () => {
        expect(getLeaderBoard(users)).toEqual([]);
    });

    it('should return a leaderboard with user scores', () => {
        users.push(new User('socket1', new UserData('Alice', { X: 0, Y: 0 }), 'ROOM1'));
        users.push(new User('socket2', new UserData('Bob', { X: 0, Y: 0 }), 'ROOM1'));
        users[0].userData.score = 10;
        users[1].userData.score = 20;

        const leaderboard = getLeaderBoard(users);
        expect(leaderboard).toHaveLength(2);
        expect(leaderboard).toContainEqual({ name: 'Alice', score: 10 });
        expect(leaderboard).toContainEqual({ name: 'Bob', score: 20 });
    });
});

describe('Unique String Generator', () => {
    it('should generate a unique string of length 4', () => {
        const uniqueString = generateUniqueString();
        expect(uniqueString).toHaveLength(4);
        expect(typeof uniqueString).toBe('string');
    });

    it('should generate different strings on multiple calls', () => {
        const str1 = generateUniqueString();
        const str2 = generateUniqueString();
        expect(str1).not.toBe(str2);
    });
});
