"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut, Trash2, Mail, LayoutDashboard, ShoppingBag } from "lucide-react";

type Inquiry = {
  id: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: string;
  created_at: string;
};

type Quotation = {
  id: number;
  name: string;
  email: string;
  phone: string;
  product_id: number;
  quantity: number;
  custom_requirements?: string;
  status: string;
  created_at: string;
};

const STATUS_OPTIONS = ["New", "Contacted", "In Progress", "Closed"];

export default function AdminDashboard() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"inquiries" | "quotations">("inquiries");
  
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [quotations, setQuotations] = useState<Quotation[]>([]);
  const [loading, setLoading] = useState(true);

  const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
    return null;
  };

  const fetchDashboardData = async () => {
    setLoading(true);
    const token = getCookie("admin_token");
    if (!token) {
      router.push("/admin");
      return;
    }

    try {
      const headers = { Authorization: `Bearer ${token}` };
      const [resInq, resQuote] = await Promise.all([
        fetch("http://localhost:8000/inquiry", { headers }),
        fetch("http://localhost:8000/quotation", { headers }),
      ]);
      
      if (resInq.ok && resQuote.ok) {
        setInquiries(await resInq.json());
        setQuotations(await resQuote.json());
      } else {
        if (resInq.status === 401 || resQuote.status === 401) {
          handleLogout();
        }
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    document.cookie = "admin_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";
    router.push("/admin");
  };

  const updateStatus = async (type: "inquiry" | "quotation", id: number, newStatus: string) => {
    const token = getCookie("admin_token");
    try {
      const res = await fetch(`http://localhost:8000/${type}/${id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ status: newStatus }),
      });
      if (res.ok) {
        if (type === "inquiry") {
          setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
        } else {
          setQuotations(quotations.map(q => q.id === id ? { ...q, status: newStatus } : q));
        }
      }
    } catch (e) {
      console.error("Failed to update status");
    }
  };

  const deleteItem = async (type: "inquiry" | "quotation", id: number) => {
    if (!confirm("Are you sure you want to delete this?")) return;

    const token = getCookie("admin_token");
    try {
      const res = await fetch(`http://localhost:8000/${type}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      
      if (res.ok) {
        if (type === "inquiry") {
          setInquiries(inquiries.filter(i => i.id !== id));
        } else {
          setQuotations(quotations.filter(q => q.id !== id));
        }
      }
    } catch (e) {
      console.error("Failed to delete");
    }
  };

  const newCounts = {
    inquiries: inquiries.filter(i => i.status === "New").length,
    quotations: quotations.filter(q => q.status === "New").length,
  };

  const renderStatusBadge = (status: string) => {
    const colors: Record<string, string> = {
      "New": "bg-blue-100 text-blue-800",
      "Contacted": "bg-yellow-100 text-yellow-800",
      "In Progress": "bg-purple-100 text-purple-800",
      "Closed": "bg-gray-100 text-gray-800"
    };
    return (
      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${colors[status] || colors["New"]}`}>
        {status}
      </span>
    );
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">Loading Dashboard...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 w-full">
      {/* Sidebar / Topbar */}
      <nav className="bg-white shadow-sm border-b border-gray-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <LayoutDashboard className="h-6 w-6 text-gray-700" />
          <h1 className="text-xl font-bold font-playfair text-gray-900">Glass Decor Admin</h1>
        </div>
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Metric Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div 
            onClick={() => setActiveTab("inquiries")}
            className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition ${activeTab === "inquiries" ? 'border-gray-800 ring-1 ring-gray-800' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">General Inquiries</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{inquiries.length}</h3>
              </div>
              <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
                <Mail className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            {newCounts.inquiries > 0 && <p className="text-sm text-blue-600 mt-4 font-medium">{newCounts.inquiries} New</p>}
          </div>

          <div 
            onClick={() => setActiveTab("quotations")}
            className={`bg-white rounded-xl shadow-sm border p-6 cursor-pointer transition ${activeTab === "quotations" ? 'border-gray-800 ring-1 ring-gray-800' : 'border-gray-200 hover:border-gray-300'}`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Orders & Quotations</p>
                <h3 className="text-3xl font-bold text-gray-900 mt-2">{quotations.length}</h3>
              </div>
              <div className="h-12 w-12 bg-emerald-50 rounded-full flex items-center justify-center">
                <ShoppingBag className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
            {newCounts.quotations > 0 && <p className="text-sm text-emerald-600 mt-4 font-medium">{newCounts.quotations} New</p>}
          </div>
        </div>

        {/* Data Table */}
        <div className="bg-white shadow-sm border border-gray-200 rounded-xl overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200 bg-gray-50">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              {activeTab === "inquiries" ? "Customer Inquiries" : "Orders & Quotations"}
            </h3>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Contact</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Message/Reqs</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {activeTab === "inquiries" ? (
                  inquiries.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">No inquiries found.</td></tr>
                  ) : (
                    inquiries.map((inq) => (
                      <tr key={inq.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(inq.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{inq.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{inq.email}</div>
                          <div className="text-xs text-gray-400">{inq.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={inq.message}>
                          {inq.message}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderStatusBadge(inq.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-3">
                            <select 
                              value={inq.status}
                              onChange={(e) => updateStatus("inquiry", inq.id, e.target.value)}
                              className="block w-28 text-xs border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 bg-white"
                            >
                              {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <button onClick={() => deleteItem("inquiry", inq.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                ) : (
                  quotations.length === 0 ? (
                    <tr><td colSpan={6} className="px-6 py-10 text-center text-sm text-gray-500">No quotes/orders found.</td></tr>
                  ) : (
                    quotations.map((q) => (
                      <tr key={q.id} className="hover:bg-gray-50/50">
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(q.created_at).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{q.name}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          <div>{q.email}</div>
                          <div className="text-xs text-gray-400">{q.phone}</div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate" title={q.custom_requirements}>
                          <span className="font-semibold text-gray-700 block">Product ID: {q.product_id} (Qty: {q.quantity})</span>
                          {q.custom_requirements || <span className="text-gray-400 italic">No custom requirements</span>}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {renderStatusBadge(q.status)}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex items-center justify-end gap-3">
                            <select 
                              value={q.status}
                              onChange={(e) => updateStatus("quotation", q.id, e.target.value)}
                              className="block w-28 text-xs border-gray-300 rounded-md shadow-sm focus:ring-gray-500 focus:border-gray-500 bg-white"
                            >
                              {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                            </select>
                            <button onClick={() => deleteItem("quotation", q.id)} className="text-red-500 hover:text-red-700">
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
