import axios from 'axios';
import ResourceModel from '../src/models/resource';

jest.mock('axios');

test('resource get collections', async () => {
  const sampleCollections = [
    {
      id: 'table1',
    },
    {
      id: 'table2',
    },
  ];
  axios.get.mockResolvedValue(sampleCollections);

  const sampleResource = new ResourceModel(1);
  const res = await sampleResource.getCollections();
  for (let i = 0; i < 2; i += 1) {
    expect(res[i].id).toEqual(sampleCollections[i].collectionId);
  }
});
