import SDKInterface from './interface';
import ResourceModel from './models/resource';

/**
 * Use for getting all available resource model.
 *
 * @extends SDKInterface
 */
export class SDK extends SDKInterface {
  /**
   * Return the array of resource models.
   *
   * @returns {ResourceModel[]}
   */
  async getResources() {
    const res = await this.request(SDKInterface.HTTP_GET, 'resource/');
    return res.data.map(({ id }) => new ResourceModel(id));
  }
}

export default SDK;
