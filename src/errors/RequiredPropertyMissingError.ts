export class RequiredPropertyMissingError extends Error {
  constructor(propertyKey: string, source: string) {
    super(`Property ${propertyKey} (${source}) is required!`);

    Object.setPrototypeOf(this, new.target.prototype);
  }
}
