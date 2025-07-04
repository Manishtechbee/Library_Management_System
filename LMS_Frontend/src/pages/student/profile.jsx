import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NoDuesRequest from "../../components/NoDues";
import { FaDownload } from "react-icons/fa";

import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";
import { toast } from "react-toastify";



export default function Profile({darkMode}) {
  const navigate=useNavigate();
  const [complaintSubject, setComplaintSubject] = useState("");
const [complaintDescription, setComplaintDescription] = useState("");

  
  const u = JSON.parse(localStorage.getItem("user"));
  const role = u?.role;
  

useEffect(() => {
  const storedUser = JSON.parse(localStorage.getItem("user"));
  
  if (storedUser?.id) {
    fetch(`http://localhost:5000/api/student/${storedUser.id}`)
      .then(res => res.json())
      .then(data => setUser(data))
      .catch(err => console.error(err));
  }
}, []);

const [issueRequests, setIssueRequests] = useState([]);

useEffect(() => {
  if (u?.id) {
    fetch(`http://localhost:5000/api/${u.id}`)
      .then(res => res.json())
      .then(data => setIssueRequests(data))
      .catch(err => console.error(err));
  }
}, []);



const [noDues, setNoDues] = useState(null);

useEffect(() => {
  if (u?.id) {
    fetch(`http://localhost:5000/api/nodues/status/${u.id}`)
      .then(res => res.json())
      .then(data => setNoDues(data))
      .catch(err => console.error(err));
  }
}, []);

const downloadNoDuesPDF = () => {
  const doc = new jsPDF();

  doc.text("No Dues Request Details", 14, 20);

  const tableColumn = ["Student Name", "Student ID", "Department", "Year", "Semester", "Status"];
  const tableRows = [];

  tableRows.push([
    noDues.student_name,
    noDues.student_id,
    noDues.department,
    noDues.year,
    noDues.semester,
    noDues.status.charAt(0).toUpperCase() + noDues.status.slice(1)
  ]);

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 30,
  });

  doc.save("NoDuesRequest.pdf");
};
const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    student_id: "",
    department: "",
    year: ""
  });


 const [qrImageUrl, setQrImageUrl] = useState("");

  useEffect(() => {
  if (u?.id) {
    const qrData = JSON.stringify({
      name: user.name,
      email: user.email,
      student_id: user.student_id,
      department: user.department,
      year: user.year,
      id: u.id,
    });
    QRCode.toDataURL(qrData, {
      color: {
        dark: "#1f2937",  // Tailwind's gray-500
        light: "#ffffff", // Background remains white
      },
    })
      .then(url => setQrImageUrl(url))
      .catch(err => console.error(err));
  }
}, [u?.id,user]);


  return (
    <>
    
     {darkMode?(<><div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">

  {/* Left Profile Section */}
  <div className="w-full lg:w-1/3 space-y-6 bg-white dark:bg-gray-700 p-6 rounded-xl shadow">

    {/* Header */}
    <div className="flex items-center gap-4 mb-6">
      <img
        src={user.profileImage ? `http://localhost:5000${user.profileImage}` : `https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a7ce1&color=fff`}
        alt="Profile"
        className="w-16 h-16 rounded-full object-cover"
      />
      <div>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">{user.name}</h2>
        <p className="text-sm text-gray-500 dark:text-gray-400">{user.email}</p>
      </div>
    </div>

    {/* Personal Information */}
    <div className="space-y-4 mb-6">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Personal Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Name</label>
          <input
            name="name"
            value={user.name}
            disabled
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Phone Number</label>
          <input
            name="phone"
            value={user.phone}
            disabled
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm"
            type="text"
          />
        </div>
        <div className="sm:col-span-2">
          <label className="text-sm text-gray-600 dark:text-gray-400">Address</label>
          <input
            name="address"
            value={user.address}
            disabled
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm"
            type="text"
          />
        </div>
      </div>
    </div>

    {/* Academic Information */}
    <div className="space-y-4 mb-6">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Academic Information</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Student ID</label>
          <input
            value={user.student_id}
            disabled
            className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded text-sm"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Department</label>
          <input
            value={user.department}
            disabled
            className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded text-sm"
            type="text"
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Year</label>
          <input
            value={user.year}
            disabled
            className="w-full p-2 mt-1 bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-300 rounded text-sm"
            type="text"
          />
        </div>
      </div>
    </div>

    {/* QR Code */}
    <div>
      <div className="mt-6 space-y-2">
        <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Student ID QR Code</h3>
        {qrImageUrl ? (
          <div className="flex flex-wrap items-start gap-2">
            <img src={qrImageUrl} alt="Student ID QR Code" className="w-32 h-32" />
            <a
              href={qrImageUrl}
              download={`StudentID-${u.id}.png`}
              className="p-2 mt-auto mb-4 bg-[#303336] text-white rounded hover:bg-[#28292a] transition flex items-center justify-center"
            >
              <FaDownload className="w-3 h-3" />
            </a>
          </div>
        ) : (
          <p className="text-gray-500 dark:text-gray-400">Generating QR Code...</p>
        )}
      </div>
    </div>

    {/* Edit Button */}
    <div className="flex justify-end">
      <button
        onClick={() => navigate(`/dashboard/${role}/settings`)}
        className="px-5 py-2 bg-[#3a7ce1] text-white rounded text-sm hover:bg-[#285dad] transition"
      >
        Edit Details
      </button>
    </div>
  </div>

  {/* Right Section */}
  <div className="flex-1 space-y-6 bg-white dark:bg-gray-700 p-6 rounded-xl shadow">

    <NoDuesRequest userId={u.id} />

    {/* No Dues Request Table */}
    {noDues && (
      <div className="space-y-4 mb-6 mt-6">
        <div className="overflow-x-auto bg-white dark:bg-gray-700 p-6 rounded-xl shadow">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-left">
                <th className="p-2">Student Name</th>
                <th className="p-2">Student ID</th>
                <th className="p-2">Department</th>
                <th className="p-2">Year</th>
                <th className="p-2">Semester</th>
                <th className="p-2">Status</th>
                <th className="p-2">Download</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-t dark:border-gray-600">
                <td className="p-2">{noDues.student_name}</td>
                <td className="p-2">{noDues.student_id}</td>
                <td className="p-2">{noDues.department}</td>
                <td className="p-2">{noDues.year}</td>
                <td className="p-2">{noDues.semester}</td>
                <td className="p-2 capitalize">
                  {noDues.status === "pending" && <span className="text-yellow-600">Pending</span>}
                  {noDues.status === "approved" && <span className="text-green-600">Approved</span>}
                  {noDues.status === "rejected" && <span className="text-red-600">Rejected</span>}
                </td>
                <td className="p-2">
                  <button
                    onClick={noDues === "approved" ? downloadNoDuesPDF : undefined}
                    className={`px-4 py-2 text-white rounded text-sm transition ${
                      noDues === "approved" ? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
                    }`}
                    disabled={noDues !== "approved"}
                  >
                    Download as PDF
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    )}

    {/* Book Issue Requests */}
    <div className="bg-white dark:bg-[#1F2937] p-6 rounded-xl shadow">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">Book Issue Requests</h3>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-700 text-left">
              <th className="p-2">Book Title</th>
              <th className="p-2">Request Date</th>
              <th className="p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {issueRequests?.length === 0 ? (
              <tr>
                <td colSpan="3" className="p-2 text-gray-500 dark:text-gray-400">No issue requests found.</td>
              </tr>
            ) : (
              issueRequests.map((req, index) => (
                <tr key={index} className="border-t dark:border-gray-600">
                  <td className="p-2">{req.book_title}</td>
                  <td className="p-2">{new Date(req.request_date).toLocaleDateString()}</td>
                  <td className="p-2">
                    {req.status === "pending" && <span className="text-yellow-600">Pending</span>}
                    {req.status === "approved" && <span className="text-green-600">Approved</span>}
                    {req.status === "rejected" && <span className="text-red-600">Rejected</span>}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>

    {/* Complaint Form */}
    <div className="bg-white dark:bg-[#1F2937] p-6 rounded-xl shadow mt-6">
      <h3 className="text-base font-medium text-gray-700 dark:text-gray-300 mb-4">Submit a Complaint</h3>
      <form
        className="space-y-4"
        onSubmit={(e) => {
          e.preventDefault();
          if (!complaintSubject || !complaintDescription) {
            toast.error("Please fill all fields");
            return;
          }
          const complaintData = {
            user_id: u.id,
            subject: complaintSubject,
            description: complaintDescription,
          };
          fetch("http://localhost:5000/api/complaints/complaints/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(complaintData),
          })
            .then((res) => {
              if (!res.ok) throw new Error("Request failed");
              return res.json();
            })
            .then((data) => {
              if (data.success) {
                toast.success("Complaint submitted successfully!");
                setComplaintSubject("");
                setComplaintDescription("");
              } else {
                toast.error("Failed to submit complaint. Please try again.");
              }
            })
            .catch(() => {
              toast.error("Error occurred while submitting complaint.");
            });
        }}
      >
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Subject</label>
          <input
            type="text"
            value={complaintSubject || ""}
            onChange={(e) => setComplaintSubject(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm"
            placeholder="Enter complaint subject"
            required
          />
        </div>
        <div>
          <label className="text-sm text-gray-600 dark:text-gray-400">Description</label>
          <textarea
            value={complaintDescription || ""}
            onChange={(e) => setComplaintDescription(e.target.value)}
            className="w-full p-2 mt-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded text-sm"
            placeholder="Describe your complaint"
            rows="4"
            required
          />
        </div>
        <button
          type="submit"
          className="px-5 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
        >
          Submit Complaint
        </button>
      </form>
    </div>

  </div>
</div>
</>):(<div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
      
    <div className="w-full lg:w-1/3 space-y-6 bg-white p-6 rounded-xl shadow">
    
      
      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <img
          src={user.profileImage?`http://localhost:5000${user.profileImage}`:`https://ui-avatars.com/api/?name=${encodeURIComponent(user.name)}&background=3a7ce1&color=fff`}
          alt="Profile"
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold text-gray-800">{user.name}</h2>
          <p className="text-sm text-gray-500">{user.email}</p>
        </div>
      </div>

      {/* Personal Information */}
      <div className="space-y-4 mb-6">
        <h3 className="text-base font-medium text-gray-700 mb-2">Personal Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Name</label>
            <input
              name="name"
              value={user.name}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Phone Number</label>
            <input
              name="phone"
              value={user.phone}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
          <div className="sm:col-span-2">
            <label className="text-sm text-gray-600">Address</label>
            <input
              name="address"
              value={user.address}
              disabled
              className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
              type="text"
            />
          </div>
        </div>
      </div>

      {/* Academic Information */}
      <div className="space-y-4 mb-6">
        <h3 className="text-base font-medium text-gray-700 mb-2">Academic Information</h3>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Student ID</label>
            <input
              value={user.student_id}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Department</label>
            <input
              value={user.department}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
          <div>
            <label className="text-sm text-gray-600">Year</label>
            <input
              value={user.year}
              disabled
              className="w-full p-2 mt-1 bg-gray-50 text-gray-500 rounded text-sm"
              type="text"
            />
          </div>
        </div>
      </div>
     
     <div>
      {/* Your Existing Profile Content */}

      <div className="mt-6 space-y-2">
        <h3 className="text-base font-medium text-gray-700 mb-2">Student ID QR Code</h3>
        {qrImageUrl ? (
          <div className="flex flex-wrap items-start gap-2">
            <img src={qrImageUrl} alt="Student ID QR Code" className="w-32 h-32" />
            
        <a
  href={qrImageUrl}
  download={`StudentID-${u.id}.png`}
  className="p-2 mt-auto mb-4 bg-[#303336] text-white rounded hover:bg-[#28292a] transition flex items-center justify-center"
>
  <FaDownload className="w-3 h-3" />
</a>

      
          </div>
        ) : (
          <p className="text-gray-500">Generating QR Code...</p>
        )}
      </div>
    </div>


      {/* Save Button */}
      <div className="flex justify-end">
        <button
        onClick={() => navigate(`/dashboard/${role}/settings`)}
          className="px-5 py-2 bg-[#3a7ce1] text-white rounded text-sm hover:bg-[#285dad] transition"
        >
          Edit Details
        </button>
      </div>

      

    </div>
    <div className="flex-1 space-y-6 bg-white p-6 rounded-xl shadow">
        <NoDuesRequest userId={u.id}/>

{/* No Dues Request Details Table */}
{noDues && (
  <div className="space-y-4 mb-6 mt-6">
    
    <div className="overflow-x-auto bg-white p-6 rounded-xl shadow">
      <table className="min-w-full text-sm">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="p-2">Student Name</th>
            <th className="p-2">Student ID</th>
            <th className="p-2">Department</th>
            <th className="p-2">Year</th>
            <th className="p-2">Semester</th>
            <th className="p-2">Status</th>
            <th className="p-2">Download</th>
            
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-2">{noDues.student_name}</td>
            <td className="p-2">{noDues.student_id}</td>
            <td className="p-2">{noDues.department}</td>
            <td className="p-2">{noDues.year}</td>
            <td className="p-2">{noDues.semester}</td>
            <td className="p-2 capitalize">
              {noDues.status === "pending" && <span className="text-yellow-600">Pending</span>}
              {noDues.status === "approved" && <span className="text-green-600">Approved</span>}
              {noDues.status === "rejected" && <span className="text-red-600">Rejected</span>}
            </td>
            
            <td className="p-2">
            <button
     onClick={noDues === "approved" ? downloadNoDuesPDF : undefined}
    className={`px-4 py-2 text-white rounded text-sm transition ${
      noDues ==="approved"? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={noDues !== "approved"}
  >
    Download as PDF
  </button></td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
)}



{/* Book Issue Request Status Section */}
<div className="bg-white p-6 rounded-xl shadow">
  <h3 className="text-base font-medium text-gray-700 mb-2">Book Issue Requests</h3>
  
  <div className="overflow-x-auto">
    <table className="min-w-full text-sm">
      <thead>
        <tr className="bg-gray-100 text-left">
          <th className="p-2">Book Title</th>
          <th className="p-2">Request Date</th>
          <th className="p-2">Status</th>
        </tr>
      </thead>
      <tbody>
        {issueRequests?.length === 0 ? (
          <tr>
            <td colSpan="3" className="p-2 text-gray-500">No issue requests found.</td>
          </tr>
        ) : (
          issueRequests.map((req, index) => (
            <tr key={index} className="border-t">
              <td className="p-2">{req.book_title}</td>
              <td className="p-2">{new Date(req.request_date).toLocaleDateString()}</td>
              <td className="p-2">
                {req.status === "pending" && <span className="text-yellow-600">Pending</span>}
                {req.status === "approved" && <span className="text-green-600">Approved</span>}
                {req.status === "rejected" && <span className="text-red-600">Rejected</span>}
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
<div className="bg-white p-6 rounded-xl shadow mt-6">
  <h3 className="text-base font-medium text-gray-700 mb-4">Submit a Complaint</h3>

  <form
    className="space-y-4"
    onSubmit={(e) => {
      e.preventDefault();
      if (!complaintSubject || !complaintDescription) {
        toast.error("Please fill all fields");
        return;
      }
      const complaintData = {
        user_id: u.id,
        subject: complaintSubject,
        description: complaintDescription,
      };

      fetch("http://localhost:5000/api/complaints/complaints/add", {  // Corrected URL
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(complaintData),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Request failed");
          return res.json();
        })
        .then((data) => {
          if (data.success) {
            toast.success("Complaint submitted successfully!");
            setComplaintSubject("");
            setComplaintDescription("");
          } else {
            toast.error("Failed to submit complaint. Please try again.");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.error("Error occurred while submitting complaint.");
        });
    }}
  >
    <div>
      <label className="text-sm text-gray-600">Subject</label>
      <input
        type="text"
        value={complaintSubject || ""}
        onChange={(e) => setComplaintSubject(e.target.value)}
        className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
        placeholder="Enter complaint subject"
        required
      />
    </div>

    <div>
      <label className="text-sm text-gray-600">Description</label>
      <textarea
        value={complaintDescription || ""}
        onChange={(e) => setComplaintDescription(e.target.value)}
        className="w-full p-2 mt-1 bg-gray-100 rounded text-sm"
        placeholder="Describe your complaint"
        rows="4"
        required
      />
    </div>

    <button
      type="submit"
      className="px-5 py-2 bg-red-600 text-white rounded text-sm hover:bg-red-700 transition"
    >
      Submit Complaint
    </button>
  </form>
</div>

    </div>
    
  </div>)}
    </>
  );
}
