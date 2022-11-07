import { 
  addFetch,
  deleteFetch,
  editFetch,
  fetchJSON } from './fetch.js';

const router = '/service';

const getServicesByCompanyId = async (companyId) =>
  await fetchJSON(`${router}/getAllServicesByCompanyId?companyId=${companyId}`);

const getServicesByServiceId = async (serviceId) =>
  await fetchJSON(`${router}/getAllServicesByServiceId?serviceId=${serviceId}`);

const addService = async (service) =>
  await addFetch(service, `${router}/add`);

const editService = async (service) => 
  await editFetch(service, `${router}/edit`);

const deleteService = async ({id}) => 
  await deleteFetch(`${router}/delete?serviceId=${id}`);

export {
  getServicesByCompanyId,
  getServicesByServiceId,
  addService,
  editService,
  deleteService
}
