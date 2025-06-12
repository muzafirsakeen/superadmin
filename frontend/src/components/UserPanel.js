import React, { useState } from "react";
import { Offcanvas, Form, Button } from "react-bootstrap";

const pages = [
  "Products List", "Marketing List", "Order List", "Media Plans",
  "Offer Pricing SKUs", "Clients", "Suppliers", "Customer Support",
  "Sales Reports", "Finance & Accounting"
];

function UserPanel({ user, onClose, onUpdated }) {
  const [permissions, setPermissions] = useState(user.permissions || {});
  const [saving, setSaving] = useState(false);

  const togglePermission = (page, perm) => {
    setPermissions(prev => ({
      ...prev,
      [page]: {
        ...prev[page],
        [perm]: !prev[page]?.[perm]
      }
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      // Call API to update user permissions
      await fetch(`/api/users/${user.id}/permissions/`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ permissions }),
      });
      onUpdated();
      onClose();
    } catch (error) {
      console.error("Failed to update permissions", error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Offcanvas show={true} onHide={onClose} placement="end" backdrop={false}>
      <Offcanvas.Header closeButton>
        <Offcanvas.Title>Edit Permissions: {user.email}</Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        {pages.map(page => (
          <div key={page} className="mb-3">
            <strong>{page}</strong>
            <Form.Check
              inline
              label="View"
              type="checkbox"
              checked={permissions[page]?.view || false}
              onChange={() => togglePermission(page, "view")}
            />
            <Form.Check
              inline
              label="Edit"
              type="checkbox"
              checked={permissions[page]?.edit || false}
              onChange={() => togglePermission(page, "edit")}
            />
            <Form.Check
              inline
              label="Create"
              type="checkbox"
              checked={permissions[page]?.create || false}
              onChange={() => togglePermission(page, "create")}
            />
            <Form.Check
              inline
              label="Delete"
              type="checkbox"
              checked={permissions[page]?.delete || false}
              onChange={() => togglePermission(page, "delete")}
            />
          </div>
        ))}

        <Button disabled={saving} onClick={handleSave} variant="primary">
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </Offcanvas.Body>
    </Offcanvas>
  );
}

export default UserPanel;
