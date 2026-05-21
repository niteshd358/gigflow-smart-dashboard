import {useState} from 'react';

import {useQuery } from '@tanstack/react-query';

import LeadsTable from '../components/leads/LeadTable';

import { getLeads, getAllLeads } from '../services/leadService';

import CreateLeadModal from '../components/leads/CreateLeadModal';

import { CSVLink } from "react-csv";

import AnalyticsCards from "../components/leads/AnalyticsCards";

import { motion } from "framer-motion";




const DashboardPage = () => {

    //filter states
    const [search, setSearch] = useState('');
    const [status, setStatus] = useState('');
    const [source, setSource] = useState('');
    const [sort, setSort] = useState("latest");
    const [page, setPage] = useState(1);

    // ADD MODAL STATE
    const [isModalOpen, setIsModalOpen] = useState(false);

    //query string
    const queryString = `?search=${search}&status=${status}&source=${source}&sort=${sort}&page=${page}`;


    const { data, isLoading, isError} = useQuery({
        queryKey: [
            "leads",
            search,
            status,
            source,
            sort,
            page,
        ],
        queryFn: () => getLeads(queryString),
        placeholderData: (previousData) => previousData,
    });

    const { data: allLeadsData } = useQuery({
        queryKey: ["all-leads"],
        queryFn:  getAllLeads,
    });


    if (isLoading) {
        return (
            <div className="space-y-6">

                {/* HEADER */}
                <div className="h-10 w-64 bg-gray-200 rounded animate-pulse" />

                {/* CARDS */}                            
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="bg-white  p-6 rounded-2xl shadow-sm"
                        >
                            <div className="h-4 bg-gray-200 rounded w-24 animate-pulse mb-4" />
                            <div className="h-10 bg-gray-200 rounded w-16 animate-pulse" />
                        </div>
                    ))}
                </div>

                {/* TABLE */}
                <div className="bg-white  rounded-2xl p-6">
                    <div className="space-y-4">
                        {[1, 2, 3, 4, 5].map((row) => (
                            <div key={row} className="h-12 bg-gray-100 rounded animate-pulse"/>
                        ))}
                    </div>
                </div>
            </div>
        );
    }

    if(isError) {
        return(
            <div className="text-center py-10 text-red-500">
                Failed to load leads
            </div>
        );
    }

    return (


        <motion.div
            initial={{ opacity: 0 , y :20}}
            animate={{ opacity: 1, y:0 }}
            transition={{ duration: 0.4 }}
        >

            {/* HEADER */}
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-black dark:text-white text-3xl font-bold">
                        Leads Dashboard
                    </h1>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                        Manage your leads efficiently
                    </p>
                </div>

                {/* //ADD CREATE BUTTON */}
                <div className="flex gap-3">
                    <CSVLink
                        data={allLeadsData?.leads || []}
                        filename="gigflow-leads.csv"
                        className="inline-flex items-center bg-green-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-green-700 transition cursor-pointer"
                    >
                        Export CSV
                    </CSVLink>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-blue-600 text-white px-5 py-3 rounded-xl font-semibold hover:bg-blue-700 transition cursor-pointer"
                    >
                        + Create Lead
                    </button>

                </div>
            </div>


            {/* FILTER */}
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-sm mb-8">
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                    {/* SEARCH */}
                    <input 
                        type="text"
                        placeholder='Search leads...'
                        value={search}
                        onChange={(e) =>{
                            setSearch(e.target.value);
                            setPage(1);
                        }}
                        className='border p-3 rounded-lg dark:text-gray-300'
                    />

                    {/* STATUS */}
                    <select
                        value={status}
                        onChange={(e)=>{
                            setStatus(e.target.value);
                            setPage(1);
                        }}
                        className='border p-3 rounded-lg dark:text-gray-300'
                    >
                        <option value="">All Status</option>
                        <option value="new">New</option>
                        <option value="contacted">Contacted</option>
                        <option value="qualified">Qualified</option>
                        <option value="lost">Lost</option>

                    </select>


                    {/* SOURCE */}
                    <select 
                        value={source}
                        onChange={(e)=>{
                            setSource(e.target.value);
                            setPage(1);
                        }} 
                        className="border p-3 rounded-lg dark:text-gray-300"
                    >
                        <option value="">All sources</option>
                        <option value="website">Website</option>
                        <option value="instagram">Instagram</option>
                        <option value="referral">Refferal</option>
                        <option value="other">Other</option>
                    </select>

                    {/* SORT */}
                    <select 
                        value={sort}
                        onChange={(e)=>{
                            setSort(e.target.value);
                        }}
                        className="border p-3 rounded-lg dark:text-gray-300"
                    >
                        <option value="latest">Latest</option>
                        <option value="oldest">Oldest</option>
                    </select>


                    {/* RESET */}
                    <button
                        onClick={()=>{
                            setSearch("");
                            setStatus("");
                            setSource("");
                            setSort("latest");
                            setPage(1);
                        }} 
                        className="bg-gray-200 rounded-lg font-medium hover:bg-gray-300 transition cursor-pointer"
                    >
                        Reset
                    </button>

                </div>
            </div>

            {/* STATS */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-gray-500 dark:text-gray-300 text-sm">
                        Total Leads
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        {data?.totalLeads || 0}
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-gray-500 dark:text-gray-300 text-sm">
                        Qualified Leads
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        {
                            allLeadsData?.leads?.filter(
                                (lead:any) => lead.status === 'qualified'
                            ).length
                        }
                    </p>
                </div>

                <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-sm">
                    <h2 className="text-gray-500 dark:text-gray-300 text-sm">
                        Contacted Leads
                    </h2>
                    <p className="text-4xl font-bold mt-2">
                        {
                            allLeadsData?.leads?.filter(
                                (lead:any) => lead.status === 'contacted'
                            ).length
                        }
                    </p>
                </div>
            </div>

            {/* ANALYTICS */}
            <AnalyticsCards
                leads={
                    allLeadsData?.leads || []
                }
            />

            {/* LEADS TABLE */}

            <LeadsTable
                leads={data?.leads || []}
            />


            {/* PAGINATION */}
            <div className="flex items-center justify-center gap-4 mt-8">
                <button
                    disabled={page === 1}
                    onClick={()=>
                        setPage((prev) => prev - 1)
                    }
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    Previous
                </button>

                <span className="font-medium">
                    Page {data?.currentPage} of {data?.totalPages}
                </span>

                <button
                    disabled={page === data?.totalPages}
                    onClick={()=>
                        setPage((prev) => prev + 1)
                    }
                    className="px-4 py-2 bg-gray-200 rounded-lg disabled:opacity-50 cursor-pointer"
                >
                    Next
                </button>
            </div>

            <CreateLeadModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />

        </motion.div>
    );

};

export default DashboardPage;