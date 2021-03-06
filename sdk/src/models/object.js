import SDKInterface from '../interface';
import RelationModel from './relation';

/**
 * Object model represent a backend row (record).
 * Can use save method to sync attribute to backend and delete to delete it from backend.
 *
 * @extends SDKInterface
 */
export default class ObjectModel extends SDKInterface {
  /**
   * Constructor of the controller of resource.
   *
   * @param {number} resourceId must be an integer.
   * @param {string} collectionId
   * @param {object} properties
   */
  constructor(resourceId, collectionId, properties) {
    super();
    this.resourceId = resourceId;
    this.collectionId = collectionId;
    this.oldProperties = properties;
    this.properties = properties;
  }

  /**
   * Return the value of the specified attribute.
   * @param {string} attribute
   * @return {object}
   */
  get(attribute) {
    return this.properties[attribute];
  }

  /**
   * Update the value the attribute.
   * @param {string} attribute.
   * @param {object} newVal.
   */
  set(attribute, newVal) {
    this.properties[attribute] = newVal;
  }

  /**
   * Save the object to the database.
   */
  async save() {
    const {
      resourceId, collectionId, oldProperties, properties,
    } = this;
    let uri = `resource/${resourceId}`;
    uri += `/collection/${collectionId}`;
    uri += `/object?matcher=${JSON.stringify(oldProperties)}`;
    const res = await this.request(SDKInterface.HTTP_PUT, uri, { data: properties });
    return new ObjectModel(resourceId, collectionId, res.data);
  }

  /**
   * Delete the object from the database.
   */
  async destroy() {
    const {
      resourceId, collectionId, oldProperties,
    } = this;
    let uri = `resource/${resourceId}`;
    uri += `/collection/${collectionId}`;
    uri += `/object?matcher=${JSON.stringify(oldProperties)}`;
    await this.request(SDKInterface.HTTP_DELETE, uri);
    delete this.properties;

    return null;
  }

  /**
   * Return the relation to the specific collection.
   * @return {object}
   */
  async getRelation() {
    const {
      resourceId, collectionId, oldProperties,
    } = this;
    let uri = `resource/${resourceId}`;
    uri += `/collection/${collectionId}`;
    uri += `/object/relation?matcher=${JSON.stringify(oldProperties)}`;
    const res = await this.request(SDKInterface.HTTP_GET, uri);
    return new RelationModel(resourceId, collectionId, res.data);
  }
}
