import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import NoDuesRequest from "../../components/NoDues";
import jsPDF from "jspdf";
import "jspdf-autotable";
import QRCode from "qrcode";



export default function Profile() {
  const navigate=useNavigate();
  
  const u = JSON.parse(localStorage.getItem("user"));
  const role = u?.role;
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    student_id: "",
    department: "",
    year: ""
  });

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


 const [qrImageUrl, setQrImageUrl] = useState("");

  useEffect(() => {
    
    if (u?.student_id) {
      QRCode.toDataURL(u)
        .then(url => setQrImageUrl(url))
        .catch(err => console.error(err));
    }
  }, [u?.id]);

  return (
    <div className="max-w-2xl py-4 px-15">
      
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
          <div className="flex flex-col items-start gap-2">
            <img src={qrImageUrl} alt="Student ID QR Code" className="w-32 h-32" />
            <a
              href={qrImageUrl}
              download={`StudentID-${u.student_id}.png`}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700"
            >
              Download QR Code
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

      <NoDuesRequest userId={u.id}/>

{/* No Dues Request Details Table */}
{noDues && (
  <div className="space-y-4 mb-6 mt-6">
    <h3 className="text-base font-medium text-gray-700 mb-2">No Dues Request Details</h3>
    
    <div className="overflow-x-auto">
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
    onClick={downloadNoDuesPDF}
    className={`px-4 py-2 text-white rounded text-sm transition ${
      noDues =="approved"? "bg-green-600 hover:bg-green-700" : "bg-gray-400 cursor-not-allowed"
    }`}
    disabled={!noDues}
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
<div className="space-y-4 mb-6">
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

    </div>
  );
}
