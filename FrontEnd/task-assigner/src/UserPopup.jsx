import React from "react";

export default function UserPopup({ user, onClose }) {
    return (
        <div className="popup" onClick={onClose}>
            <div className="popup-inner">
                <h2>User Details</h2>
                <p>Name: {user.name}</p>
                <p>Email: {user.email}</p>
                <p>Contact Number: {user.contact_number}</p>
                <p>Age: {user.age}</p>
                <p>ERP: {user.erp}</p>
                <p>Department: {user.department}</p>
                <p>Roles: {user.roles}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}