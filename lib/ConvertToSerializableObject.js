/** @format */

export function ConvertToSerializableObj(document) {
  for (const key of Object.keys(document)) {
    if (document[key].toJSON && document[key].toString) {
      document[key] = document[key].toString();
    }
  }
  return document;
}
