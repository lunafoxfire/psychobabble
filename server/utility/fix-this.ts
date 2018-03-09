/**
  *  Rather dumb function to bind 'this' on all methods of a class instance to itself.
  *  @param self - Reference to target object.
  *  @param targetClass - The target object's class.
  */
export function fixThis<T>(self: T, targetClass: { new(): T }) {
  let ctrlMethods = Object.getOwnPropertyNames(targetClass.prototype);
  ctrlMethods.forEach((method) => {
    self[method] = self[method].bind(self);
  });
}
