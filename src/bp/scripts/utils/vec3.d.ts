import type { Vector3 } from "@minecraft/server";
/**
 * Utility class for 3D vector math, compatible with Minecraft's Vector3 interface.
 * Provides static and instance methods for common vector operations, including addition, subtraction, scaling, normalization, dot/cross products, and more.
 *
 * @example
 *
 * ```typescript
 * // Pure static methods
 * const example1 = Vec3.add({ x: 1, y: 2, z: 3 }, { x: 4, y: 5, z: 6 })
 * console.log(Vec3.stringify(example1)); // (5, 7, 9)
 *
 * // Easily combine multiple operations with method chain
 * const example2 = new Vec3()
 *   .add({ x: 3, y: 3, z: 3 })
 *   .add({ x: -3, y: 4, z: -1 })
 * console.log(example2.toString()); // (0, 7, 2)
 * ```
 */
export declare class Vec3 implements Vector3 {
    static readonly one: Readonly<{
        x: 1;
        y: 1;
        z: 1;
    }>;
    static readonly half: Readonly<{
        x: 0.5;
        y: 0.5;
        z: 0.5;
    }>;
    static readonly zero: Readonly<{
        x: 0;
        y: 0;
        z: 0;
    }>;
    static readonly up: Readonly<{
        x: 0;
        y: 1;
        z: 0;
    }>;
    static readonly down: Readonly<{
        x: 0;
        y: -1;
        z: 0;
    }>;
    static readonly left: Readonly<{
        x: -1;
        y: 0;
        z: 0;
    }>;
    static readonly right: Readonly<{
        x: 1;
        y: 0;
        z: 0;
    }>;
    static readonly forward: Readonly<{
        x: 0;
        y: 0;
        z: 1;
    }>;
    static readonly backward: Readonly<{
        x: 0;
        y: 0;
        z: -1;
    }>;
    /**
     * Checks if something is a valid Vector3 object.
     * @param value - The value to check.
     * @returns Whether `value` is a Vector3 object.
     */
    static isVector3(value: unknown): value is Vector3;
    /**
     * Creates a complete Vector3.
     *
     * It uses properties from the `primary` object first. Any missing properties
     * are then filled from the `fallback` object. If a property is missing from both,
     * it defaults to 0.
     *
     * @param primary - The partial vector whose properties take precedence.
     * @param fallback - The partial vector used to fill in any missing properties.
     * @returns A new, complete Vector3.
     */
    static create(primary?: Partial<Vector3>, fallback?: Partial<Vector3>): Vector3;
    /**
     * Creates a Vector3 from a partial object, filling missing components with 0.
     * @param value - Partial vector with optional x, y, z properties.
     * @returns A complete Vector3 object.
     */
    static fromPartial(value?: Partial<Vector3>): Vector3;
    /**
     * Clones a Vector3 object.
     * @returns Copy of `vec`.
     */
    static clone(vec: Vector3): Vector3;
    /**
     * Adds vecB to vecA.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The resulting vector.
     */
    static add(vecA: Vector3, vecB: Vector3): Vector3;
    /**
     * Subtracts vecB from vecA.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The resulting vector.
     */
    static sub(vecA: Vector3, vecB: Vector3): Vector3;
    /**
     * Scales a vector by a scalar or another vector.
     * @param vec - The vector to scale.
     * @param scalar - The scalar or vector to scale by.
     * @returns The scaled vector.
     */
    static scale(vec: Vector3, scalar: Vector3 | number): Vector3;
    /**
     * Divides a vector by a scalar or another vector.
     * @param vec - The vector to divide.
     * @param divisor - The scalar or vector to divide by.
     * @returns The divided vector.
     */
    static divide(vec: Vector3, divisor: Vector3 | number): Vector3;
    /**
     * Calculates the Euclidean distance between two vectors.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The distance.
     */
    static distance(vecA: Vector3, vecB: Vector3): number;
    /**
     * Calculates the squared distance between two vectors.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The squared distance.
     */
    static sqrDistance(vecA: Vector3, vecB: Vector3): number;
    /**
     * Normalizes a vector to length 1.
     * @param vec - The vector to normalize.
     * @returns The normalized vector.
     */
    static normalize(vec: Vector3): Vector3;
    /**
     * Linearly interpolates between two vectors.
     * @param vecA - The start vector.
     * @param vecB - The end vector.
     * @param t - The interpolation factor (0-1).
     * @returns The interpolated vector.
     */
    static lerp(vecA: Vector3, vecB: Vector3, t: number): Vector3;
    /**
     * Calculates the dot product of two vectors.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The dot product.
     */
    static dot(vecA: Vector3, vecB: Vector3): number;
    /**
     * Reflects a vector off a surface with the given normal.
     * @param vec - The vector to reflect.
     * @param normal - The normal vector.
     * @returns The reflected vector.
     */
    static reflect(vec: Vector3, normal: Vector3): Vector3;
    /**
     * Calculates the cross product of two vectors.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The cross product vector.
     */
    static cross(vecA: Vector3, vecB: Vector3): Vector3;
    /**
     * Calculates the length (magnitude) of a vector.
     * @param vec - The vector.
     * @returns The length.
     */
    static length(vec: Vector3): number;
    /**
     * Calculates the squared length of a vector.
     * @param vec - The vector.
     * @returns The squared length.
     */
    static sqrLength(vec: Vector3): number;
    /**
     * Calculates the angle between two vectors in radians.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The angle in radians.
     */
    static angle(vecA: Vector3, vecB: Vector3): number;
    /**
     * Calculates the midpoint between two vectors.
     * @param vecA - The first vector.
     * @param vecB - The second vector.
     * @returns The midpoint vector.
     */
    static midpoint(vecA: Vector3, vecB: Vector3): Vector3;
    /**
     * Clamps each component of a vector between min and max values.
     * @param vec - The vector to clamp.
     * @param min - The minimum value or vector.
     * @param max - The maximum value or vector.
     * @returns The clamped vector.
     */
    static clamp(vec: Vector3, min: Vector3 | number, max: Vector3 | number): Vector3;
    /**
     * Applies Math.floor to each component of a vector.
     * @param vec - The vector.
     * @returns The floored vector.
     */
    static floor(vec: Vector3): Vector3;
    /**
     * Applies Math.round to each component of a vector.
     * @param vec - The vector.
     * @returns The rounded vector.
     */
    static round(vec: Vector3): Vector3;
    /**
     * Applies Math.ceil to each component of a vector.
     * @param vec - The vector.
     * @returns The ceiled vector.
     */
    static ceil(vec: Vector3): Vector3;
    /**
     * Generates a random vector with each component in [min, max].
     * @param min - The minimum value (default 0).
     * @param max - The maximum value (default 1).
     * @returns The random vector.
     */
    static random(min?: number, max?: number): Vector3;
    /**
     * Generates a random unit vector direction.
     * @returns The random direction vector.
     */
    static randomDirection(): Vector3;
    /**
     * Generates a random location inside a sphere of given radius.
     * @param sphereRadius - The radius of the sphere.
     * @returns The random location vector.
     */
    static randomLocationInSphere(sphereRadius: number): Vector3;
    /**
     * Generates vectors evenly distributed on a circle on the XY plane.
     * @param radius - The circle radius.
     * @param numberOfPoints - The total number of points to generate on the circle's circumference.
     * @returns Array of vectors on the circle.
     */
    static generateOnCircle(radius: number, numberOfPoints: number): Vector3[];
    /**
     * Rotates a vector around an axis by a given angle in radians.
     * @param vec - The vector to rotate.
     * @param axis - The axis to rotate around.
     * @param radians - The angle in radians.
     * @returns The rotated vector.
     */
    static rotateRad(vec: Vector3, axis: Vector3, radians: number): Vector3;
    /**
     * Rotates a vector around an axis by a given angle in degrees.
     * @param vec - The vector to rotate.
     * @param axis - The axis to rotate around.
     * @param degrees - The angle in degrees.
     * @returns The rotated vector.
     */
    static rotateDeg(vec: Vector3, axis: Vector3, degrees: number): Vector3;
    /**
     * Changes the direction of a vector to match another vector's direction, preserving magnitude.
     * @param vec - The original vector.
     * @param dir - The direction vector.
     * @returns The vector with changed direction.
     */
    static changeDir(vec: Vector3, dir: Vector3): Vector3;
    /**
     * Gets a location relative to the head, based on view direction and movement.
     * @param headLocation - The head location vector.
     * @param viewDirection - The view direction vector.
     * @param move - The movement vector (partial).
     * @returns The new relative position vector.
     */
    static getRelativeToHead(headLocation: Vector3, viewDirection: Vector3, move: Partial<Vector3>): Vector3;
    /**
     * Converts a Vector3 object into a string.
     *
     * @param value - The Vector3 object.
     * @param format - Format of the string.
     * - `0`: "`(x, y, z)`"
     * - `1`: "`x y z`"
     * - `2`: "`x=x,y=y,z=z`"
     *
     * @returns String representation of the specified Vector3 object.
     */
    static stringify(value?: Partial<Vector3>, format?: 0 | 1 | 2): string;
    /** @deprecated Use `stringify()` with `format` arg set to `0` instead instead. */
    static toString<T extends Vector3>(vec: T): `(${T["x"]}, ${T["y"]}, ${T["z"]})`;
    /** @deprecated Use `stringify()` with `format` arg set to `1` instead instead. */
    static toString2<T extends Vector3>(vec: T): `${T["x"]} ${T["y"]} ${T["z"]}`;
    /** @deprecated Use `stringify()` with `format` arg set to `2` instead instead. */
    static toString3<T extends Vector3>(vec: T): `x=${T["x"]},y=${T["y"]},z=${T["z"]}`;
    private _vec;
    get vec(): Vector3;
    /** Gets the x component of this vector. */
    get x(): number;
    /** Sets the x component of this vector. */
    set x(value: number);
    /** Gets the y component of this vector. */
    get y(): number;
    /** Sets the y component of this vector. */
    set y(value: number);
    /** Gets the z component of this vector. */
    get z(): number;
    /** Sets the z component of this vector. */
    set z(value: number);
    /** Creates a new Vec3 instance. */
    constructor(primary?: Partial<Vector3>, fallback?: Partial<Vector3>);
    /**
     * Adds a vector to this vector.
     * @param vec - The vector to add.
     * @returns This Vec3 instance.
     */
    add(vec: Vector3): Vec3;
    /**
     * Subtracts a vector from this vector.
     * @param vec - The vector to subtract.
     * @returns This Vec3 instance.
     */
    sub(vec: Vector3): Vec3;
    /**
     * Scales this vector by a scalar or another vector.
     * @param scalar - The scalar or vector to scale by.
     * @returns This Vec3 instance.
     */
    scale(scalar: Vector3 | number): Vec3;
    /**
     * Divides this vector by a scalar or another vector.
     * @param divisor - The scalar or vector to divide by.
     * @returns This Vec3 instance.
     */
    divide(divisor: Vector3 | number): Vec3;
    /**
     * Normalizes this vector to length 1.
     * @returns This Vec3 instance.
     */
    normalize(): Vec3;
    /**
     * Linearly interpolates this vector towards another vector.
     * @param vec - The target vector.
     * @param t - The interpolation factor (0-1).
     * @returns This Vec3 instance.
     */
    lerp(vec: Vector3, t: number): Vec3;
    /**
     * Calculates the dot product with another vector.
     * @param vec - The other vector.
     * @returns The dot product.
     */
    dot(vec: Vector3): number;
    /**
     * Sets this vector to the cross product with another vector.
     * @param vec - The other vector.
     * @returns This Vec3 instance.
     */
    cross(vec: Vector3): Vec3;
    /**
     * Clamps each component of this vector between min and max values.
     * @param min - The minimum value or vector.
     * @param max - The maximum value or vector.
     * @returns This Vec3 instance.
     */
    clamp(min: Vector3 | number, max: Vector3 | number): Vec3;
    /**
     * Applies Math.floor to each component of this vector.
     * @returns This Vec3 instance.
     */
    floor(): Vec3;
    /**
     * Applies Math.round to each component of this vector.
     * @returns This Vec3 instance.
     */
    round(): Vec3;
    /**
     * Applies Math.ceil to each component of this vector.
     * @returns This Vec3 instance.
     */
    ceil(): Vec3;
    /**
     * Reflects this vector off a surface with the given normal.
     * @param normal - The normal vector.
     * @returns This Vec3 instance.
     */
    reflect(normal: Vector3): Vec3;
    /**
     * Sets this vector to the midpoint between this and another vector.
     * @param vec - The other vector.
     * @returns This Vec3 instance.
     */
    midpoint(vec: Vector3): Vec3;
    /**
     * Changes the direction of this vector to match another vector's direction, preserving magnitude.
     * @param dir - The direction vector.
     * @returns This Vec3 instance.
     */
    changeDir(dir: Vector3): Vec3;
    /**
     * Rotates this vector around an axis by a given angle in radians.
     * @param axis - The axis to rotate around.
     * @param radians - The angle in radians.
     * @returns This Vec3 instance.
     */
    rotateRad(axis: Vector3, radians: number): Vec3;
    /**
     * Rotates this vector around an axis by a given angle in degrees.
     * @param axis - The axis to rotate around.
     * @param degrees - The angle in degrees.
     * @returns This Vec3 instance.
     */
    rotateDeg(axis: Vector3, degrees: number): Vec3;
    /**
     * Converts this vector into a string.
     *
     * @param format - Format of the string.
     * - `0`: "`(x, y, z)`"
     * - `1`: "`x y z`"
     * - `2`: "`x=x,y=y,z=z`"
     *
     * @returns String representation of this vector.
     */
    toString(format?: 0 | 1 | 2): string;
    /** @deprecated Use `toString()` with `format` arg set to `1` instead. */
    toString2(): string;
    /** @deprecated Use `toString()` with `format` arg set to `2` instead. */
    toString3(): string;
}
//# sourceMappingURL=vec3.d.ts.map