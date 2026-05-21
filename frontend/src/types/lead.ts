export interface Lead {
    _id: string;
    name: string;
    email: string;
    status: string;
    source: string;
    createdAt: string;
    createdBy: {
        _id: string;
        name: string;
        email: string;
        role: string;
    };
}

export interface LeadsResponse {
  currentPage: number;

  totalPages: number;

  totalLeads: number;

  count: number;

  leads: Lead[];
}