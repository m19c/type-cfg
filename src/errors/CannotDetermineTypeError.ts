export class CannotDetermineTypeError extends Error {
  constructor(typeName: string, propertyKey: string) {
    let errorMessage = `Unable to determine type for ${typeName}#${propertyKey} `;

    errorMessage += '!';
    super(errorMessage);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
