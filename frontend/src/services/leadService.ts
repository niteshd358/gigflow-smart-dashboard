import api from '../api/axios';



export const getLeads = async (queryString = "")  => {
    const response = await api.get(`/leads${queryString}`);
    return response.data;
};

export const createLead = async (data : any) => {
    const response = await api.post("/leads", data);
    return response.data;
};

export const deleteLead = async (id:string) => {
    const response = await api.delete(`/leads/${id}`);
    return response.data;
};

export const updateLead = async (id: string,data: any) => {
  const response = await api.put(`/leads/${id}`,data);

  return response.data;
};

export const getAllLeads = async () => {
    const response = await api.get("/leads/all");
    return response.data;
}