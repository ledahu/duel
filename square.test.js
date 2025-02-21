import { describe, it, expect } from "vitest";
import { Square } from "./socketStuff/classes/Square"; // Adjust path if necessary

describe("Rectangle Collision Detection", () => {
    
    it("should detect collision when squares overlap", () => {
        const rect1 = new Square({ id: 1, x: 0, y: 0, width: 5, height: 5 });
        const rect2 = new Square({ id: 2, x: 3, y: 3, width: 5, height: 5 });
        
        expect(rect1.isCollision(rect2)).toBe(true);
        expect(rect2.isCollision(rect1)).toBe(true); 
    });

    it("should not detect collision when squares are apart", () => {
        const rect1 = new Square({ id: 1, x: 0, y: 0, width: 5, height: 5 });
        const rect2 = new Square({ id: 2, x: 10, y: 10, width: 5, height: 5 });

        expect(rect1.isCollision(rect2)).toBe(false);
        expect(rect2.isCollision(rect1)).toBe(false);
    });
});
