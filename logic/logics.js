// i know my code is nonsense but will update soon when the solution comes to head now nothing tangible
import { Dimensions } from "react-native";
import { useSharedValue, useFrameCallback } from "react-native-reanimated";

// Constants for physics
const GRAVITY = 0.98; // Gravity constant
const RADIUS = 20; // Radius of the bird (or circle)

// Function to calculate projectile motion
const calculateProjectileMotion = (vx, vy, ax, ay, dt) => {
  const newVx = vx + ax * dt;
  const newVy = vy + ay * dt + GRAVITY * dt;
  return { newVx, newVy };
};

/**
 * Initializes and updates the bird's position based on its velocity and angle.
 * @param {Object} offsetX - Shared value for the bird's X-axis position.
 * @param {Object} offsetY - Shared value for the bird's Y-axis position.
 * @param {Object} velocityX - Shared value for the bird's X-axis velocity.
 * @param {Object} velocityY - Shared value for the bird's Y-axis velocity.
 * @param {Object} pressed - Shared value to indicate if the bird is in motion.
 * @param {Function} onMove - Callback to update the bird's position.
 */
export const useBirdMovement = (
  offsetX,
  offsetY,
  velocityX,
  velocityY,
  pressed,
  onMove
) => {
  useFrameCallback((frameInfo) => {
    const { timeSincePreviousFrame: dt } = frameInfo;

    if (dt == null || pressed.value === false) return;

    const { newVx, newVy } = calculateProjectileMotion(
      velocityX.value,
      velocityY.value,
      0,
      GRAVITY,
      dt
    );
    velocityX.value = newVx;
    velocityY.value = newVy;

    offsetX.value += newVx * dt;
    offsetY.value += newVy * dt;

    if (onMove) {
      onMove({ x: offsetX.value, y: offsetY.value });
    }
  });
};

/**
 * Checks for collisions between a circle and a rectangle.
 * @param {number} cx - X position of the circle center.
 * @param {number} cy - Y position of the circle center.
 * @param {number} rx - X position of the rectangle top-left corner.
 * @param {number} ry - Y position of the rectangle top-left corner.
 * @param {number} rw - Width of the rectangle.
 * @param {number} rh - Height of the rectangle.
 * @returns {boolean} - Returns true if a collision is detected, otherwise false.
 */
function areaTest(cx, cy, rx, ry, rw, rh) {
  let testX = cx;
  let testY = cy;

  if (cx < rx) testX = rx;
  else if (cx > rx + rw) testX = rx + rw;
  if (cy < ry) testY = ry;
  else if (cy > ry + rh) testY = ry + rh;

  const distX = cx - testX;
  const distY = cy - testY;
  const distance = Math.sqrt(distX * distX + distY * distY);

  return distance <= RADIUS;
}

/**
 * Checks for collisions between the bird and obstacles.
 * @param {Object} birdPosition - The current position of the bird.
 * @param {Array} obstacles - Array of obstacle positions.
 * @returns {boolean} - Returns true if a collision is detected, otherwise false.
 */
export const checkCollisions = (birdPosition, obstacles) => {
  for (let obstacle of obstacles) {
    if (
      areaTest(birdPosition.x, birdPosition.y, obstacle.x, obstacle.y, 50, 50)
    ) {
      console.log("Collided");
      return true;
    }
  }
  return false;
};
