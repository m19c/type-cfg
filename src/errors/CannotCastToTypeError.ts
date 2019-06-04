export class CannotCastToTypeError extends Error {
  constructor(
    propertyKey: string,
    sourceKey: string,
    inputValue: string,
    type: string,
    previousError?: Error
  ) {
    let errorMessage = `Unable to cast ${propertyKey} (${sourceKey} - with the content: "${inputValue}") to ${type}`;

    if (previousError) {
      errorMessage += `: ${previousError.message}`;
    }

    errorMessage += '!';

    super(errorMessage);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
