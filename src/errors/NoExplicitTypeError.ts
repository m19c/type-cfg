export class NoExplicitTypeError extends Error {
  constructor(typeName: string, propertyKey: string) {
    let errorMessage = `Please provide an explicit type for ${typeName}#${propertyKey} `;

    errorMessage += '!';
    super(errorMessage);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
