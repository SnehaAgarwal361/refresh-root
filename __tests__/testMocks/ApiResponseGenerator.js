export function createApiResponseJson(requiredCount = 10) {
  const jsonObj = [];
  for (let i = 0; i < requiredCount; i += 1) {
    const property = {};
    property.application_name = 'Test Application';
    property.name = `Test property${i}`;
    property.group = 'API_CONTROL';
    property.value = i.toString();
    property.description = `Test property ${i} description`;
    property.version = 1;
    property.lastUpdated = {
      source: 'SUPPORT-UI',
      userId: 'tester',
    };
    jsonObj.push(property);
  }
  return jsonObj;
}
