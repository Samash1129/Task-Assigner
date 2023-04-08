import React from "react";

export default function UserPopup({ user, onClose }) {
    return (
        <div className="popup">
            <div className="popup-inner">
                <h2>User Details</h2>
                <p>Name: {user.name}</p>
                {/* <p>Email: {user.email}</p> */}
                <p>Department: {user.department}</p>
                <p>ERP: {user.erp}</p>
                <button onClick={onClose}>Close</button>
            </div>
        </div>
    );
}