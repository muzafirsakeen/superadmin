import React, { useState, useEffect } from "react";
import { Button, Table, Badge, Spinner } from "react-bootstrap";
import UserPanel from "./UserPanel";

const pages = [
  "Products List", "Marketing List", "Order List", "Media Plans",
  "Offer Pricing SKUs", "Clients", "Suppliers", "Customer Support",
  "Sales Reports", "Finance & Accounting"
];

function UserRoleTable() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showPanel, setShowPanel] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/users/");
      const data = await res.json();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users", error);
    } finally {
      setLoading(false);
    }
  };

  const openPanel = (user) => {
    setSelectedUser(user);
    setShowPanel(true);
  };

  const closePanel = () => {
    setSelectedUser(null);
    setShowPanel(false);
  };

  return (
    <div className="container-fluid p-3">
      <h3>Super Admin Dashboard</h3>
      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table bordered hover responsive>
          <thead>
            <tr>
              <th>Email</th>
              {pages.map(page => <th key={page}>{page}</th>)}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.email}>
                <td>{user.email}</td>
                {pages.map(page => {
                  const perm = user.permissions?.[page];
                  return (
                    <td key={page}>
                      {perm ? (
                        <>
                          {perm.view && <Badge bg="success" className="me-1">V</Badge>}
                          {perm.edit && <Badge bg="primary" className="me-1">E</Badge>}
                          {perm.create && <Badge bg="info" className="me-1">C</Badge>}
                          {perm.delete && <Badge bg="danger" className="me-1">D</Badge>}
                        </>
                      ) : (
                        <span className="text-muted">-</span>
                      )}
                    </td>
                  );
                })}
                <td>
                  <Button size="sm" onClick={() => openPanel(user)}>Edit</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {showPanel && (
        <UserPanel
          user={selectedUser}
          onClose={closePanel}
          onUpdated={fetchUsers}
        />
      )}
    </div>
  );
}

export default UserRoleTable;
