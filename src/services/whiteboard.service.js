import httpClient from './httpClient';

class WhiteBoardService {
  getProjects(projects) {
    return httpClient.get('projects').then((response) => {
      projects.length = 0;
      for (let propName in response.data) {
        if (Object.prototype.hasOwnProperty.call(response.data, propName)) {
          projects.push({ name: propName, objectId: response.data[propName] });
        }
      }
    });
  }

  updateProject(projectId, shapes) {
    return httpClient
      .put('projects/' + projectId, { shapes: shapes })
      .then((response) => {
        console.log(response.data);
      })
      .catch((data) => {
        console.log(data);
      });
  }

  getProject(projectId) {
    return httpClient.get('projects/' + projectId);
  }

  createProject(projectName) {
    return httpClient.post('projects/' + projectName, {});
  }
}

export default new WhiteBoardService();
