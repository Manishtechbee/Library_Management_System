import { useEffect, useState } from "react";
import { FaDownload, FaTrash, FaDatabase, FaSync, FaUndo } from "react-icons/fa";
import { toast } from "react-toastify";

export default function BackupControl() {
  const [backups, setBackups] = useState([]);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    fetchBackups();
  }, []);

  const fetchBackups = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/backups/list")
      .then(res => res.json())
      .then(data => setBackups(data))
      .catch(() => toast.error("Failed to load backups"))
      .finally(() => setLoading(false));
  };

  const triggerBackup = () => {
    const pwd = prompt("Enter Admin Password:");
    if (!pwd) return;

    setLoading(true);
    fetch("http://localhost:5000/api/backups/trigger", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password: pwd }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
          fetchBackups();
        } else {
          toast.error("Backup failed");
        }
      })
      .catch(() => toast.error("Backup failed"))
      .finally(() => setLoading(false));
  };

  const downloadBackup = (file) => {
    window.open(`http://localhost:5000/api/backups/download/${encodeURIComponent(file)}`, "_blank");
  };

  const restoreBackup = (file) => {
    const pwd = prompt("Enter Admin Password to Restore:");
    if (!pwd) return;

    setLoading(true);
    fetch("http://localhost:5000/api/backups/restore", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file, password: pwd }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.message) {
          toast.success(data.message);
        } else {
          toast.error("Restore failed");
        }
      })
      .catch(() => toast.error("Restore failed"))
      .finally(() => setLoading(false));
  };

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold text-[#1b365d] mb-4">Backup & Control</h2>

      {/* Backup Section */}
      <div className="bg-white p-4 rounded-lg shadow space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
            <FaDatabase /> Database Backups
          </h3>
          <button
            onClick={fetchBackups}
            className="flex items-center gap-1 text-[#3a7ce1] hover:underline"
          >
            <FaSync /> Refresh
          </button>
        </div>

        <button
          onClick={triggerBackup}
          disabled={loading}
          className="bg-[#3a7ce1] text-white px-4 py-2 rounded hover:bg-[#285dad] disabled:opacity-50"
        >
          {loading ? "Processing..." : "Create Backup"}
        </button>

        {backups.length === 0 ? (
          <p className="text-gray-500">No backups available.</p>
        ) : (
          <table className="min-w-full text-sm mt-4">
            <thead>
              <tr className="bg-gray-100 text-left">
                <th className="p-2">File</th>
                <th className="p-2">Size (MB)</th>
                <th className="p-2">Created</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {backups.map(backup => (
                <tr key={backup.file} className="border-t">
                  <td className="p-2">{backup.file}</td>
                  <td className="p-2">{backup.sizeMB}</td>
                  <td className="p-2">{new Date(backup.created).toLocaleString()}</td>
                  <td className="p-2 flex gap-2">
                    <button
                      onClick={() => downloadBackup(backup.file)}
                      className="text-[#3a7ce1] hover:underline flex items-center gap-1"
                    >
                      <FaDownload /> Download
                    </button>
                    <button
                      onClick={() => restoreBackup(backup.file)}
                      className="text-green-600 hover:underline flex items-center gap-1"
                    >
                      <FaUndo /> Restore
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
