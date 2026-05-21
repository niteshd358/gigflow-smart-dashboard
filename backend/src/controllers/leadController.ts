import { Request, Response } from "express";

import Lead from "../models/Lead";

import asyncHandler from "../utils/asyncHandler";

export const createLead = asyncHandler(
  async (req: Request, res: Response) => {
    const { name, email, status, source } = req.body;

    const lead = await Lead.create({
      name,
      email,
      status,
      source,

      createdBy: req.user?._id,
    });

    res.status(201).json({
      message: "Lead created successfully",
      lead,
    });
  }
);




// MongoDB stores only: CreatedAt ==> But frontend needs user , email , role ==> .populate() fetches related user data

export const getLeads = async (req: Request,res: Response): Promise<void> => {
  try {
    const {
      status,
      source,
      search,
      sort,
      page = "1",
    } = req.query;

    const query: any = {};

    // FILTER BY STATUS
    if (status) {
      query.status = status;
    }

    // FILTER BY SOURCE
    if (source) {
      query.source = source;
    }

    // SEARCH BY NAME OR EMAIL
    if (search) {
      query.$or = [
        {
          name: {
            $regex: search,
            $options: "i",
          },
        },

        {
          email: {
            $regex: search,
            $options: "i",
          },
        },
      ];
    }

    // SORTING
    let sortOption = {};

    if (sort === "oldest") {
      sortOption = { createdAt: 1 };
    } else {
      sortOption = { createdAt: -1 };
    }

    // PAGINATION
    const pageNumber = parseInt(page as string);

    const limit = 10;

    const skip = (pageNumber - 1) * limit;

    // FETCH LEADS
    const leads = await Lead.find(query).populate("createdBy", "name email role").sort(sortOption).skip(skip).limit(limit);

    // TOTAL COUNT
    const totalLeads = await Lead.countDocuments(query);

    res.status(200).json({
      currentPage: pageNumber,
      totalPages: Math.ceil(totalLeads / limit),
      totalLeads,
      count: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error", error,
    });
  }
};




// get lead by id

export const getLeadById = async (req: Request,res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate("createdBy", "name email role");

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });

      return;
    }

    res.status(200).json(lead);
  } catch (error) {
    res.status(500).json({
      message: "Server error",

      error,
    });
  }
};

// UPDATE LEAD
export const updateLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);
    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }
    lead.name = req.body.name || lead.name;
    lead.email = req.body.email || lead.email;
    lead.status = req.body.status || lead.status;
    lead.source = req.body.source || lead.source;

    const updatedLead = await lead.save();

    res.status(200).json({
      message: "Lead updated successfully",updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server error",error,
    });
  }
}; 


// DELETE LEAD
export const deleteLead = async (req: Request,res: Response): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({
        message: "Lead not found",
      });
      return;
    }

    await lead.deleteOne();

    res.status(200).json({
      message: "Lead deleted successfully",
    });
  } 
  catch (error) {
    res.status(500).json({
      message: "Server error",
      error,
    });
  }
};


//get all leads
export const getAllLeads = async (req: Request,res: Response) => {
  try {
    const leads = await Lead.find()
      .populate("createdBy","name email role")
      .sort({createdAt: -1});

    res.status(200).json({
      total: leads.length,
      leads,
    });
  } catch (error) {
    res.status(500).json({
      message:
        "Failed to fetch all leads",
    });
  }
};
